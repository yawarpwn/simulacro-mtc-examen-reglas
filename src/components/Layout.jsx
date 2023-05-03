import Timer from "./Timer"
import Lives from "./Lives"
import ResetButton from './ResetButton'
import QuestionCount from "./QuestionCount"

export default function Layout({ children }) {

  return (
    <>
      <header className="fixed right-0 top-0 left-0 z-50  mx-auto bg-black/40 backdrop-blur-md ">
        <div className="flex justify-center  h-16 p-4">
          <div className="grid grid-cols-3 place-content-center place-items-center gap-x-4 text-sm">
            <QuestionCount />
            <div>
            <Lives />
            <Timer />
            </div>
            <ResetButton />
          </div>
        </div>
      </header>
      <main className="mt-16">{children}</main>
    </>
  )
}
