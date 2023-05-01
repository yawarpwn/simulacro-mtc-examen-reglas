  import { useEffect, useState } from 'preact/hooks'
import './app.css'
import { getQuestions } from './services/getQuestions'

  function Alternative ({ index, alternativa, checked, handleInput }) {

        return (

            <div key={index} className={`flex items-center gap-2 `}>
              <input
                type='radio' id={`respuesta-${index}`} value={alternativa} onChange={handleInput}
                checked={checked}
              />
              <label htmlFor={`respuesta-${index}`}>{alternativa}</label>
            </div>
    )
  }

function Question ({  currentQuestion, nextQuestion }) {
  const { pregunta,  alternativas, respuesta, image, index } = currentQuestion
  const isImage = image === 1 

  const [userResponse, setUserResponse] = useState('')



      const corretAnswer = alternativas[respuesta] === userResponse
  const handleSubmit = (ev) => {
      ev.preventDefault()

      if(corretAnswer) {
        nextQuestion()
      } else {
        alert(`Respuesta era: ${alternativas[respuesta].slice(0, 1)}`)
        nextQuestion()
      }
  }

  const handleInput = (event) => {
    setUserResponse(event.target.value)
  }


  return (
    <>
      <h2 className='font-bold'>{pregunta}</h2>
      { isImage && <img className='min-h-[200px]' src={`https://sierdgtt.mtc.gob.pe/Content/img-data/img${index}.jpg`} />}
      <form onSubmit={handleSubmit} className='card-body'>
        {Object.values(alternativas).map((alternativa, index) => {
          return (
          <Alternative    key={index} alternativa={alternativa} checked={userResponse === alternativa} handleInput={handleInput} />
          )
        })}
        <div className='card-footer'>
          <button className='btn btn-primary'>Siguiente</button>
        </div>
      </form>
    </>
  )
}

export default function App () {
  const [currentQuestion, setCurrentQuestion] = useState(null)

    const pushQuestion = () => {
    const questions = getQuestions()
    const randomIndex = Math.floor(Math.random() * 200)

    setCurrentQuestion(questions[randomIndex])
    }

    const nextQuestion = () => {
      pushQuestion()
    }


  useEffect(() => {
      pushQuestion()
  }, [])


  return (
    <div className='max-w-md w-full mx-auto px-4'>
      <div className='card'>
        <h1 className='text-2xl mb-4 font-bold'>Neyda ❤️preguntas</h1>
        {currentQuestion
          ? <Question currentQuestion={currentQuestion} nextQuestion={nextQuestion}  />
          : 'loadingg'}
      </div>
    </div>
  )
}
