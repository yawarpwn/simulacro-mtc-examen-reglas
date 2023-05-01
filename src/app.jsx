import { useEffect, useState } from "preact/hooks"
import confetti from "canvas-confetti"
import "./app.css"
import { getQuestions } from "./services/getQuestions"

function Option({ alternativa, onInputChange, index , userResponse }) {
  const checked = userResponse === alternativa
  return (
    <div className="flex gap-2 items-center rounded-lg bg-white/5">
      <label className="h-24 flex items-center ml-2 " htmlFor={`alternativa-${index}`}>
        <div className="flex items-center gap-2">
          <input
            onChange={onInputChange}
            value={alternativa}
            id={`alternativa-${index}`}
            className="inline-block"
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

  const onInputChange = (event) => {
    setUserResponse(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isCorrect = checkAnswer(userResponse)
    if(isCorrect) {
      confetti()
      updateQuestion()
    } else {
      alert('equivocado')
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
        <button>Siguiente</button>
      </form>
    </>
  )
}

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null)

  const updateQuestion = () => {
    const questions = getQuestions()
    const randomIndex = Math.floor(Math.random() * 200)

    setCurrentQuestion(questions[randomIndex])
  }

  const checkAnswer = (userResponse) => {
    return  userResponse === currentQuestion.alternativas[currentQuestion.respuesta]
  }

  useEffect(() => {
    updateQuestion()
  }, [])

  if (!currentQuestion) return "Loading"

  return (
    <div className="max-w-xl mx-auto w-full ">
      <header>
        <h3 className="text-xl font-bold">Neyda ❤️preguntas</h3>
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
        <ListOfOptions question={currentQuestion} checkAnswer={checkAnswer} updateQuestion={updateQuestion} />
      </article>
    </div>
  )
}
