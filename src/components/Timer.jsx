import { useEffect} from "preact/hooks"
import { useQuestions } from "../store/questionsStore"
import { shallow } from "zustand/shallow"

export default function Timer() {
  const finishGame = useQuestions(state => state.finishGame)
  const lives = useQuestions(state => state.lives)
  const [remainingTime, setRemainingTime] = useQuestions(state => [state.remainingTime,  state.setRemainingTime], shallow)

  useEffect(() => {
    const timer = setInterval(() => {
      if(remainingTime === 0 || lives === 0) {
        clearInterval(timer)
        finishGame()
        return
      }
      setRemainingTime(remainingTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [remainingTime])

  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

  const formatTime = `${minutes.toString().padStart(2, '0')}: ${seconds.toString().padStart(2, '0')}` 

  return <div className="text-red-500 font-bold" onClick={finishGame}>{formatTime}</div>
}
