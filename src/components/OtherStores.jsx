import { create } from "zustand";
import { persist } from "zustand/middleware";
const useReviewStore = create(
  persist(
    (set) => ({
      reviewData: [],
      storedreview: false,
      storedProductId: null,
      setstoredreview: (data) => {
        set({ storedreview: data });
      },
      setReviewData: (data) => {
        set({ reviewData: data });
      },
      setStoredProductId: (data) => {
        set({ storedProductId: data });
      },
    }),
    {
      name: "review/feedback-storage",
      partialize: (state) => ({ reviewData: state.reviewData }),
    }
  )
);

export default useReviewStore;
