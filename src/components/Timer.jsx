import { useState, useEffect } from "preact/hooks"
import { TIME } from "../constants"

export default function Timer({ duration = TIME, onTimeUp }) {
  const [time, setTime] = useState(duration)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time - 1)
    }, 1000)

    if (time === 0) {
      clearInterval(timer)
      onTimeUp()
      return
    }

    return () => clearInterval(timer)
  }, [time])


  return (
    <div className="text-red-500 font-bold text-lg">
      {`${minutes.toString().padStart(2, "0")} : ${seconds
        .toString()
        .padStart(2, "0")}`}
    </div>
  )
}
