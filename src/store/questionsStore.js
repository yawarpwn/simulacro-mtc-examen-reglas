import { create } from "zustand"
import { TEST_DURATION } from "../constants"

const useQuestions = create((set) => ({
  lives: 5,
  currentQuestion: null,
  shownQuestions: [],
  wrongQuestions: [],
  questionCount: 1,
  duration: TEST_DURATION,
  incrementQuestionCount: () =>
    set((state) => ({ questionCount: state.questionCount + 1 })),
  descrementLives: () => set((state) => ({ lives: state.lives - 1 })),
  descrementDuration: () => set((state) => ({ duration: state.duration - 1 })),
  updateCurrentQuestion: (newQuestion) =>
    set(() => ({ currentQuestion: newQuestion })),

  updateWrongQuestions: (newWrongQuestion) =>
    set((state) => ({
      wrongQuestions: [...state.wrongQuestions, newWrongQuestion],
    })),

  updateShownQuestions: (newShownQuestion) =>
    set((state) => ({
      shownQuestions: [...state.shownQuestions, newShownQuestion],
    })),
  resetStates: () =>
    set(() => ({
      lives: 5,
      shownQuestions: [],
      wrongQuestions: [],
      questionCount: 1,
      duration: TEST_DURATION 
    })),
}))

export { useQuestions }
