import { useEffect, useState } from "preact/hooks"
import confetti from "canvas-confetti"
import "simple-notify/dist/simple-notify.min.css"
import "./app.css"
import { getQuestions } from "./services/getQuestions"

function Result({ resetGame, wrongQuestions }) {
  console.log({ wrongQuestions })
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-red-500 font-extrabold uppercase text-xl">
        Fallaste !!!
      </h2>
      <div className="flex flex-col gap-4">
        {wrongQuestions.map(
          ({ correctAnswer, question, incorrectAnswer, hasImage, index }, i) => {
            return (
              <div className="text-left bg-white/5 p-4 rounded-lg" key={i}>

                <p className="mb-4">{question}</p>
                {hasImage && (
                  <div className="flex justify-center mb-4">
                  <img
                    src={`https://sierdgtt.mtc.gob.pe/Content/img-data/img${index}.jpg`}
                  />
                  </div>
                )}
                <p className="text-green-500">{correctAnswer}</p>
                <p className="text-red-700">{incorrectAnswer}</p>
              </div>
            )
          }
        )}
      </div>
      <button onClick={resetGame}>Intentar otra vez</button>
    </div>
  )
}

function Option({ alternativa, onInputChange, index, userResponse }) {
  const checked = userResponse === alternativa
  return (
    <div className="flex gap-2 items-center rounded-lg bg-white/5">
      <label
        className=" flex items-center ml-2 p-4"
        htmlFor={`alternativa-${index}`}
      >
        <div className="flex items-center gap-2">
          <input
            onChange={onInputChange}
            value={alternativa}
            id={`alternativa-${index}`}
            className="inline-block w-3 h-3"
            type="radio"
            checked={checked}
          />
          <span className="text-sm">{alternativa}</span>
        </div>
      </label>
    </div>
  )
}

function ListOfOptions({ question, checkAnswer, updateQuestion, updateError }) {
  const [userResponse, setUserResponse] = useState("")

  const onInputChange = (event) => {
    setUserResponse(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isCorrect = checkAnswer(userResponse)
    if (isCorrect) {
      confetti()
      updateQuestion()
    } else {
      updateError(userResponse)
      updateQuestion()
    }
  }

  const { alternativas } = question

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        {Object.values(alternativas).map((alternativa, i) => (
          <Option
            alternativa={alternativa}
            onInputChange={onInputChange}
            key={i}
            index={i}
            userResponse={userResponse}
          />
        ))}
        <button className="h-12 mt-4">Siguiente</button>
      </form>
    </>
  )
}

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [questionCount, setQuestionCount] = useState(0)
  const [shownQuestions, setShownQuestion] = useState([])
  const [wrongQuestions, setWrongQuestions] = useState([])
  const [countError, setCountError] = useState(0)

  const MAX_QUESTION = 10
  const MAX_TRIES = 5

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
        index: currentQuestion.index
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
  }

  useEffect(() => {
    updateQuestion()
  }, [])

  if (!currentQuestion) return "Loading"

  if (countError >= MAX_TRIES) {
    return <Result wrongQuestions={wrongQuestions} resetGame={resetGame} />
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
