import { useEffect, useState } from "preact/hooks"
import confetti from "canvas-confetti"
import "./app.css"
import { getQuestions } from "./services/getQuestions"
import Results from "./components/Results"
import ListOfOptions from "./components/ListOfOptions"
import { MAX_TRIES, MAX_QUESTION } from "./constants"

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [questionCount, setQuestionCount] = useState(0)
  const [shownQuestions, setShownQuestion] = useState([])
  const [wrongQuestions, setWrongQuestions] = useState([])
  const [countError, setCountError] = useState(0)

  const updateQuestion = () => {
    const questions = getQuestions()
    const randomIndex = Math.floor(Math.random() * 200)
    const newQuestion = questions[randomIndex]

    if (shownQuestions.includes(newQuestion)) {
      updateQuestion()
    } else {
      setShownQuestion([...shownQuestions, newQuestion])
      setCurrentQuestion(newQuestion)
      setQuestionCount(questionCount + 1)
    }
  }

  const updateError = (userResponse) => {
    setCountError(countError + 1)

    const correctAnswer =
      currentQuestion.alternativas[currentQuestion.respuesta]
    setWrongQuestions([
      ...wrongQuestions,
      {
        question: currentQuestion.pregunta,
        correctAnswer,
        incorrectAnswer: userResponse,
        hasImage: currentQuestion.image === 1,
        index: currentQuestion.index,
      },
    ])
  }

  const checkAnswer = (userResponse) => {
    return (
      userResponse === currentQuestion.alternativas[currentQuestion.respuesta]
    )
  }

  const resetGame = () => {
    updateQuestion()
    setCountError(0)
    setQuestionCount(1)
    setWrongQuestions([])
  }

  useEffect(() => {
    updateQuestion()
  }, [])

  if (!currentQuestion) return "Loading"

  if (countError >= MAX_TRIES) {
    return <Results wrongQuestions={wrongQuestions} resetGame={resetGame} />
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
      <header className="border-b border-b-indigo-700 p-4 grid grid-cols-2 gap-x-4">
        <div className="bg-green-500 text-white p-2 rounded-md uppercase">
          Pregunta: {questionCount + "/" + MAX_QUESTION}
        </div>
        <div className="bg-red-500 text-white p-2 rounded-md">
          Fallos: {countError}
        </div>
      </header>
      <article className="flex flex-col justify-center gap-4 w-full">
        <header>
          <h2 className="text-indigo-400">{currentQuestion.pregunta}</h2>
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
          updateError={updateError}
        />
      </article>
    </div>
  )
}
