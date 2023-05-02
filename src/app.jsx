import { useEffect } from "preact/hooks"
import "./app.css"
import Results from "./components/Results"
import ListOfOptions from "./components/ListOfOptions"
import { MAX_QUESTION } from "./constants"
import { useQuestion } from "./hooks/useQuestion"
import Lives from "./components/Lives"

export default function App() {
  const {
    lives,
    questionCount,
    currentQuestion,
    updateQuestion,
    checkAnswer,
    updateLives,
  } = useQuestion()

  useEffect(() => {
    updateQuestion()
  }, [])

  if (!currentQuestion) return "Loading"

  if (lives <= 0) {
    return (
      <>
        <h2>Se Acabaron las vidas : (</h2>
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
          <Lives />
        <ListOfOptions
          question={currentQuestion}
          checkAnswer={checkAnswer}
          updateQuestion={updateQuestion}
          updateError={updateLives}
        />
      </article>
    </div>
  )
}
