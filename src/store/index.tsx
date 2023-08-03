import { create } from "zustand";

// Students
export const useStudentsStore = create((set) => ({
  // State
  students: [],
  //   Actions
  setStudentsInfo: (info: any) => set(() => ({ students: info })),
}));

// User info
export const useUserStore = create((set) => ({
  // State
  user: {},
  //   Actions
  setUserInfo: (info: any) => set(() => ({ user: info })),
}));

// User Charges
export const useChargesStore = create((set) => ({
  // State
  charges: [],
  //   Actions
  setCharges: (info: any) => set(() => ({ charges: info })),
}));
