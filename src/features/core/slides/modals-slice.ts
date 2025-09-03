// store/modalSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Modal = {
  id: string;
  data?: any;
};

type ModalState = {
  modals: Modal[];
};

const initialState: ModalState = {
  modals: [],
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Modal>) {
      state.modals.push(action.payload);
    },
    closeModal(state, action: PayloadAction<Modal["id"]>) {
      state.modals = state.modals.filter((m) => m.id !== action.payload);
    },
    closeAllModals(state) {
      state.modals = [];
    },
  },
});

export const { openModal, closeModal, closeAllModals } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
