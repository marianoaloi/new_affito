# General
## Autenticazione Necessaria
Nel canto superiore destro deve avere la possibilità di fare login. Dopo logado deve presentare la foto dela persona nel botano. 

informacione del projeto frondend per acessare il firebase autentication.
```
const googleProvider = new GoogleAuthProvider();
const firebaseConfig = {
  apiKey: "AIzaSyAokzUuGqYXFc4YfJj66vC3aVPsQ7P2ixE",
  authDomain: "affitiudine.firebaseapp.com",
  projectId: "affitiudine",
  storageBucket: "affitiudine.firebasestorage.app",
  messagingSenderId: "211362755894",
  appId: "1:211362755894:web:d077df940d9cdfbbb5af97"
};
```
# Tabella Page
Con il dato recuperato deve presentare il dato tabulato con le colune :


| Title | Price | energy_class | surfaceValue | rent | contractValue |
| ----- | ----- | ------------ | ------------ | ---- | ------------- |
|       |       |              |              |      |               |

# Mappa Page

TODO

# Analisi Page

TODO

# Senza Scelta Page

TODO

# Senza Autenticazioni Page
Quando non c`e una persona autenticata una pagina iniciale con apenas un resumo del atuale database deve essere presentada. Questo dado è della chiamata all count without autentication