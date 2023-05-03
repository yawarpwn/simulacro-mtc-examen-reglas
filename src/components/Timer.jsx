import { useEffect } from "preact/hooks"
import { useQuestions } from "../store/questionsStore"

export default function Timer({ onTimeUp }) {
  const duration = useQuestions((state) => state.duration)
  const descrementDuration = useQuestions((state) => state.descrementDuration)

  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60

  useEffect(() => {
    const timer = setInterval(() => {
      descrementDuration()
    }, 1000)

    if (duration === 0) {
      clearInterval(timer)
      onTimeUp()
      return
    }

    return () => clearInterval(timer)
  }, [duration])

  return (
    <div className="text-red-500 font-bold text-lg">
      {`${minutes.toString().padStart(2, "0")} : ${seconds
        .toString()
        .padStart(2, "0")}`}
    </div>
  )
}
