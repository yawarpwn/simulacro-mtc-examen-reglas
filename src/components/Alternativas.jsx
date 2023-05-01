
export default function Alternativas({ question }) {
  const { alternativas } = question
  return (
    <>
      <form className="flex flex-col gap-2">
        {Object.values(alternativas).map((alternativa, i) => {
          return (
            <div
              className="flex gap-2 items-center rounded-lg bg-white/5"
              key={i}
            >
              <label className="h-24 flex items-center ml-2 ">
                <div className="flex items-center gap-2">
                <input className="inline-block" type="radio" />
                <span className="text-sm">{alternativa}</span>
                </div>
              </label>
            </div>
          )
        })}
      </form>
      <footer>
        <button>Siguiente</button>
      </footer>
    </>
  )
}
