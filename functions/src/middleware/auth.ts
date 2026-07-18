import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

const ADMIN_EMAILS = ['mariano@aloi.com.br'];

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const email = req.user?.email?.toLowerCase();
  if (req.user?.email_verified && email && ADMIN_EMAILS.includes(email)) {
    next();
    return;
  }
  res.status(403).json({ error: 'Not authorized to change state' });
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing authorization token' });
    return;
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
