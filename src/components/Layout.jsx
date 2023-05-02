import { MAX_QUESTION, MAX_TRIES } from "../constants"
import { useQuestion } from "../hooks/useQuestion"
import { Heart } from "../icons/Heart"

export default function Layout({ children }) {
  const { questionCount, lives, resetGame } = useQuestion()
  const hearts = Array.from({ length: MAX_TRIES }, (_, index) => (
    <Heart key={index} active={index < lives} />
  ))

  return (
    <>
      <header className="fixed right-0 top-0 left-0 z-50  mx-auto bg-black/40 backdrop-blur-md ">
        <div className="flex justify-center  h-16 p-4">
          <div className="grid grid-cols-3 place-content-center place-items-center gap-x-4 text-sm">
            <button>
              <span>{questionCount + "/" + MAX_QUESTION}</span>
            </button>
            <div className="flex items-center">
              {hearts.map((_, index) => (
                <Heart key={index} live={index < lives} />
              ))}
            </div>
            <button className="" onClick={resetGame}>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                  />
                </svg>
                <span>Reset</span>
              </div>
            </button>
          </div>
        </div>
      </header>
      <main className="mt-16">{children}</main>
    </>
  )
}
