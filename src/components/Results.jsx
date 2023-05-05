import { useQuestions } from "../store/questionsStore"
import { BASE_IMAGE_URL } from "../constants"

export default function Results() {
  const wrongQuestions = useQuestions(state => state.wrongQuestions)
  return (
    <div className="flex max-w-xl w-full  flex-col gap-4">
      <h2 className="text-red-600 font-extrabold uppercase text-xl">
        Revisa tus errores
      </h2>
      <div className="flex flex-col gap-4">
        {wrongQuestions.map(
          (
            { correctAnswer, question,  wrongAnswer, hasImage, index },
            i
          ) => {
            return (
              <div className="text-left bg-black/20 p-4 rounded-lg backdrop-blur-md saturate-150 text-sm" key={i}>
                <p className="mb-4 text-yellow-400 text-center">{question}</p>
                {hasImage && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={`${BASE_IMAGE_URL}${index}.jpg`}
                    />
                  </div>
                )}
                <div className="mb-2 flex items-center gap-2">
                  <span className="bg-green-500 w-1 h-10 block"/>
                  <span className="ml-2">{correctAnswer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-500 w-1 h-10 block"></span>
                  <span className="ml-2">{wrongAnswer}</span>
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}
