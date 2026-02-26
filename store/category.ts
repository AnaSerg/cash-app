import { create } from 'zustand'

export  const useCategoriesStore = create((set) => ({
    categories: [],

    updateCategories: (updatedCategories) => set({
        categories: updatedCategories,
    }),
}))