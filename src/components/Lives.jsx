import { useQuestions } from "../store/questionsStore"
import { MAX_TRIES } from "../constants"
import { Heart } from "../icons/Heart"
import { useEffect } from "preact/hooks"

export default function Lives() {
  const lives = useQuestions((state) => state.lives)
  const finishGame = useQuestions(state => state.finishGame)

  useEffect(() => {
    if(lives === 0) {
      finishGame()
    }
  }, [lives])

  const hearts = Array.from({ length: MAX_TRIES }, (_, index) => (
    <Heart key={index} active={index < lives} />
  ))
  return (
    <div className="">
      <div className="hearts flex items-center">
        {hearts.map((_, index) => (
          <Heart key={index} live={index < lives} />
        ))}
      </div>
    </div>
  )
}
