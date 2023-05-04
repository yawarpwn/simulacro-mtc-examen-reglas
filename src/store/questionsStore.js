import { create } from "zustand"
import { MAX_TRIES, TEST_DURATION } from "../constants"

const shownQuestionsFromLocalStorage = JSON.parse(
  localStorage.getItem("__SHOWN_QUESTIONS__")
)

const useQuestions = create((set) => ({
  lives: MAX_TRIES,
  currentQuestion: null,
  shownQuestions: shownQuestionsFromLocalStorage
    ? shownQuestionsFromLocalStorage
    : [],
  wrongQuestions: [],
  questionCount: 1,
  endGame: false,
  remainingTime: TEST_DURATION,
  setLives: (newLives) => set(() => ({lives: newLives})) ,
  setRemainingTime: (newTime) => set(() => ({ remainingTime: newTime })),
  finishGame: () => set(() => ({ endGame: true })),
  incrementQuestionCount: () =>
    set((state) => ({ questionCount: state.questionCount + 1 })),
  updateCurrentQuestion: (newQuestion) =>
    set(() => ({ currentQuestion: newQuestion })),

  updateWrongQuestions: (newWrongQuestion) =>
    set((state) => ({
      wrongQuestions: [...state.wrongQuestions, newWrongQuestion],
    })),
  resetShownQuestions: () => set(() => ({ shownQuestions: [] })),
  updateShownQuestions: (newShownQuestion) =>
    set((state) => ({
      shownQuestions: [...state.shownQuestions, newShownQuestion],
    })),
  resetStates: () =>
    set(() => ({
      lives: MAX_TRIES,
      shownQuestions: [],
      wrongQuestions: [],
      questionCount: 1,
      remainingTime: TEST_DURATION,
      endGame: false,
    })),
}))

export { useQuestions }
