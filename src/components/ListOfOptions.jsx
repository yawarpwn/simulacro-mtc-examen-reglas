import Option from "./Option"
import confetti from "canvas-confetti"
import { useState } from "preact/hooks"

export default function ListOfOptions({ question, checkAnswer, updateQuestion, updateError }) {
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
      setUserResponse('')
    } else {
      updateError(userResponse)
      updateQuestion()
      setUserResponse('')
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
        <button disabled={!userResponse} className="h-12 mt-4">Siguiente</button>
      </form>
    </>
  )
}
