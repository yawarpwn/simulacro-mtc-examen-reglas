import { useEffect } from "preact/hooks"
import "./app.css"
import Results from "./components/Results"
import ListOfOptions from "./components/ListOfOptions"
import { MAX_QUESTION } from "./constants"
import { useQuestions } from "./store/questionsStore"
import { shallow } from "zustand/shallow"
import { getQuestions } from "./services/getQuestions"

export default function App() {
  const {
    currentQuestion,
    endGame,
    updateCurrentQuestion,
    questionCount,
    shownQuestions,
    resetShownQuestions,
  } = useQuestions(
    (state) => ({
      currentQuestion: state.currentQuestion,
      descrementLives: state.descrementLives,
      updateCurrentQuestion: state.updateCurrentQuestion,
      questionCount: state.questionCount,
      endGame: state.endGame,
      shownQuestions: state.shownQuestions,
      updateShownQuestions: state.updateShownQuestions,
      resetShownQuestions: state.resetShownQuestions,
    }),
    shallow
  )

  const updateQuestion = () => {
    const questions = getQuestions()
    let availableQuestions = questions.filter(
      (question) => !shownQuestions.includes(question.index)
    )
    if (availableQuestions.length <= MAX_QUESTION) {
      resetShownQuestions()
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    const randomQuestion = availableQuestions[randomIndex]
    updateCurrentQuestion(randomQuestion)
  }

  useEffect(() => {
    updateQuestion()
  }, [])

  if (!currentQuestion) return "Loading"


  if (endGame) {
    return (
      <>
        <h2>Prueba otra vez : (</h2>
        <Results />
      </>
    )
  }

  if (questionCount >= MAX_QUESTION) {
    return (
      <div>
        <h2>MUy Bien Lo has Logrado : )</h2>
        <Results />
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto w-full flex flex-col gap-4 ">
      <article className="flex flex-col justify-center gap-4 w-full">
        <header>
          <h2 className="text-yellow-500">
            {currentQuestion.pregunta.replace(/\s{3,}/g, "  ..........  ")}
          </h2>
          {currentQuestion.image === 1 && (
            <div className="mt-2 flex justify-center">
              <img
                src={`https://sierdgtt.mtc.gob.pe/Content/img-data/img${currentQuestion.index}.jpg`}
              />
            </div>
          )}
        </header>
        <ListOfOptions
          updateCurrentQuestion={updateQuestion}
          currentQuestion={currentQuestion}
        />
      </article>
    </div>
  )
}
