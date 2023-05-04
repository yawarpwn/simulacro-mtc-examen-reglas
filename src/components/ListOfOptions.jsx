import Option from "./Option"
import confetti from "canvas-confetti"
import { useState } from "preact/hooks"
import { useQuestions } from "../store/questionsStore"

export default function ListOfOptions({
  updateCurrentQuestion,
  currentQuestion,
}) {
  const [userResponse, setUserResponse] = useState("")
  const incrementQuestionCount = useQuestions(
    (state) => state.incrementQuestionCount
  )
  const updateWrongQuestions = useQuestions(
    (state) => state.updateWrongQuestions
  )
  const updateShownQuestions = useQuestions(
    (state) => state.updateShownQuestions
  )
  const lives = useQuestions((state) => state.lives)
  const setLives = useQuestions((state) => state.setLives)

  const onInputChange = (event) => {
    setUserResponse(event.target.value)
  }

  const correctAnswer = currentQuestion.alternativas[currentQuestion.respuesta]

  const isCorret = userResponse === correctAnswer

  const handleWrongQuestions = (response) => {
    const wrongQuestionToUpdate = {
      hasImage: currentQuestion.hasImage,
      question: currentQuestion.pregunta,
      wrongAnswer: response,
      correctAnswer,
      index: currentQuestion.index,
    }
    updateWrongQuestions(wrongQuestionToUpdate)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isCorret) {
      setUserResponse("")
      confetti()
      updateCurrentQuestion()
      incrementQuestionCount()
    } else {
      setUserResponse("")
      updateCurrentQuestion()
      incrementQuestionCount()
      setLives(lives - 1)
      handleWrongQuestions(userResponse)
    }
    updateShownQuestions(currentQuestion.index)
  }


  const { alternativas } = currentQuestion

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
        <button disabled={!userResponse} className="h-12 mt-4">
          Siguiente
        </button>
      </form>
    </>
  )
}
