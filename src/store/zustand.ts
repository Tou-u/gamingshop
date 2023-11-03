import { create } from "zustand";

type FilterStore = {
  option: "default" | "lower" | "higher";
  orderByLower: () => void;
  orderByHigher: () => void;
  resetFilter: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  option: "default",
  orderByLower: () => set((state) => ({ option: "lower" })),
  orderByHigher: () => set((state) => ({ option: "higher" })),
  resetFilter: () => set((state) => ({ option: "default" })),
}));
