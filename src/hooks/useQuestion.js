import { useContext, useEffect, useState } from "preact/hooks"
import { createContext } from "preact"
import { MAX_TRIES } from "../constants"
import { getQuestions } from "../services/getQuestions"

const QuestionContext = createContext()

export function QuestionProvider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [shownQuestions, setShownQuestion] = useState([])
  const [wrongQuestions, setWrongQuestions] = useState([])
  const [questionCount, setQuestionCount] = useState(0)
  const [lives, setLives] = useState(MAX_TRIES)

  const updateQuestion = () => {
    const questions = getQuestions()
    const randomIndex = Math.floor(Math.random() * 200)
    const newQuestion = questions[randomIndex]

    if (shownQuestions.includes(newQuestion)) {
      updateQuestion()
    } else {
      setShownQuestion([...shownQuestions, newQuestion])
      setCurrentQuestion(newQuestion)
      setQuestionCount(questionCount + 1)
    }
  }

  useEffect(() => {
    const game = {
      lives,
      questionCount,
      wrongQuestions,
      currentQuestion,
      shownQuestions,
    }
    localStorage.setItem("GAME", JSON.stringify(game))
  }, [lives, currentQuestion, wrongQuestions, shownQuestions])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('GAME'))
    console.log(data)
  }, [])

  const updateLives = (userResponse) => {
    setLives((prevLives) => prevLives - 1)

    const correctAnswer =
      currentQuestion.alternativas[currentQuestion.respuesta]
    setWrongQuestions([
      ...wrongQuestions,
      {
        question: currentQuestion.pregunta,
        correctAnswer,
        incorrectAnswer: userResponse,
        hasImage: currentQuestion.image === 1,
        index: currentQuestion.index,
      },
    ])
  }

  const checkAnswer = (userResponse) => {
    return (
      userResponse === currentQuestion.alternativas[currentQuestion.respuesta]
    )
  }

  const resetGame = () => {
    updateQuestion()
    setLives(MAX_TRIES)
    setQuestionCount(1)
    setShownQuestion([])
    setWrongQuestions([])
  }
  return (
    <QuestionContext.Provider
      value={{
        questionCount,
        setQuestionCount,
        lives,
        setLives,
        currentQuestion,
        setCurrentQuestion,
        wrongQuestions,
        setWrongQuestions,
        shownQuestions,
        setShownQuestion,
        resetGame,
        updateQuestion,
        checkAnswer,
        updateLives,
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}

export function useQuestion() {
  return useContext(QuestionContext)
}
