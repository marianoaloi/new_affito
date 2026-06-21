import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { StateMaloi } from '../../types';

export interface Decision {
  stateMaloi?: StateMaloi;
  description?: string;
  updatedAt: number;
}

type DecisionsState = Record<number, Decision>;

const initialState: DecisionsState = {};

const decisionsSlice = createSlice({
  name: 'decisions',
  initialState,
  reducers: {
    recordStateUpdate(state, action: PayloadAction<{ id: number; stateMaloi: StateMaloi }>) {
      const { id, stateMaloi } = action.payload;
      state[id] = { ...state[id], stateMaloi, updatedAt: Date.now() };
    },
    recordDescriptionUpdate(
      state,
      action: PayloadAction<{ id: number; description: string }>
    ) {
      const { id, description } = action.payload;
      state[id] = { ...state[id], description, updatedAt: Date.now() };
    },
  },
});

export const { recordStateUpdate, recordDescriptionUpdate } = decisionsSlice.actions;
export default decisionsSlice.reducer;

export const selectDecision =
  (id: number) =>
  (state: RootState): Decision | undefined =>
    state.decisions[id];
