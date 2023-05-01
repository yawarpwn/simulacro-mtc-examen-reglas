export default function Option({
  alternativa,
  onInputChange,
  index,
  userResponse,
}) {
  const checked = userResponse === alternativa
  return (
    <div className="flex gap-2 items-center rounded-lg bg-white/5">
      <label
        className=" flex items-center ml-2 p-4"
        htmlFor={`alternativa-${index}`}
      >
        <div className="flex items-center gap-2">
          <input
            onChange={onInputChange}
            value={alternativa}
            id={`alternativa-${index}`}
            className="inline-block w-3 h-3"
            type="radio"
            checked={checked}
          />
          <span className="text-sm">{alternativa}</span>
        </div>
      </label>
    </div>
  )
}
