import { useEffect } from "preact/hooks"
import "./app.css"
import Results from "./components/Results"
import ListOfOptions from "./components/ListOfOptions"
import { MAX_QUESTION } from "./constants"
import { useQuestion } from "./hooks/useQuestion"

export default function App() {
  const {
    lives,
    questionCount,
    currentQuestion,
    resetGame,
    updateQuestion,
    checkAnswer,
    updateLives,
  } = useQuestion()

  useEffect(() => {
    updateQuestion()
  }, [])

  if (!currentQuestion) return "Loading"

  if (lives <= 0) {
    return <Results  />
  }

  if (questionCount >= MAX_QUESTION) {
    return (
      <div>
        <h2>MUy Bien Lo has Logrado : )</h2>
        <button onClick={resetGame}>Practicar otra vez</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto w-full flex flex-col gap-4 ">
      <article className="flex flex-col justify-center gap-4 w-full">
        <header>
          <h2 className="text-yellow-500">{currentQuestion.pregunta.replace(/\s{3,}/g,'  ..........  ')}</h2>
          {currentQuestion.image === 1 && (
            <div className="mt-2 flex justify-center">
              <img
                src={`https://sierdgtt.mtc.gob.pe/Content/img-data/img${currentQuestion.index}.jpg`}
              />
            </div>
          )}
        </header>
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
