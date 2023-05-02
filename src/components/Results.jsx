import { useQuestion } from "../hooks/useQuestion"

export default function Results() {
  const { resetGame, wrongQuestions } = useQuestion()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-red-500 font-extrabold uppercase text-xl">
        Fallaste !!!
      </h2>
      <div className="flex flex-col gap-4">
        {wrongQuestions.map(
          (
            { correctAnswer, question, incorrectAnswer, hasImage, index },
            i
          ) => {
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
