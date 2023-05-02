import { create } from "zustand"

const useQuestions = create(() => ({
  lives: 5
}))

export { useQuestions }
