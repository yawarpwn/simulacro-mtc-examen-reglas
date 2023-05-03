import { MAX_QUESTION } from "../constants"
import { useQuestions } from "../store/questionsStore"
export default function QuestionCount() {
  const questionCount = useQuestions(state => state.questionCount)
  return <span>{questionCount + "/" + MAX_QUESTION}</span>
}
