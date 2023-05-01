import { useEffect, useState } from "preact/hooks"
import confetti from "canvas-confetti"
import Notify from "simple-notify"
import "simple-notify/dist/simple-notify.min.css"
import "./app.css"
import { getQuestions } from "./services/getQuestions"

function Option({ alternativa, onInputChange, index, userResponse }) {
  const checked = userResponse === alternativa
  return (
    <div className="flex gap-2 items-center rounded-lg bg-white/5">
      <label
        className="h-24 flex items-center ml-2 "
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

function ListOfOptions({ question, checkAnswer, updateQuestion }) {
  const [userResponse, setUserResponse] = useState("")
  const [error, setError] = useState(null)

  function pushNotify() {
    new Notify({
      status: "error",
      title: "Te Equivocastes",
      text: "Prueba otra respuesta",
      effect: "slide",
      speed: 100,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 20,
      distance: 20,
      type: 1,
      position: "center",
    })
  }

  const onInputChange = (event) => {
    setUserResponse(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isCorrect = checkAnswer(userResponse)
    if (isCorrect) {
      confetti()
      setError(null)
      updateQuestion()
    } else {
      pushNotify()
      setError(true)
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
  const [count, setCount] = useState(0)

  const MAX_QUESTION = 10 

  const updateQuestion = () => {
    const questions = getQuestions()
    const randomIndex = Math.floor(Math.random() * 200)

    setCurrentQuestion(questions[randomIndex])
    setCount(count + 1)
  }

  const checkAnswer = (userResponse) => {
    return (
      userResponse === currentQuestion.alternativas[currentQuestion.respuesta]
    )
  }

  useEffect(() => {
    updateQuestion()
  }, [])

  if (!currentQuestion) return "Loading"

  if(count > MAX_QUESTION) {
    return "Se termino"
  }

  return (
    <div className="max-w-xl mx-auto w-full ">
      <header>
        <h3 className="text-xl font-bold">Pregunta {count + '/' + MAX_QUESTION}</h3>
      </header>
      <article className="flex flex-col justify-center">
        <header>
          <h2>{currentQuestion.pregunta}</h2>
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
        />
      </article>
    </div>
  )
}
