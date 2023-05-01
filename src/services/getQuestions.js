import questions  from '../data/questions.json'

export function getQuestions () {
  const questionsMapped = questions.map(({ image, index, pregunta, respuesta, alternativa_a, alternativa_b, alternativa_c, alternativa_d}) => {
    return {
    pregunta,
    respuesta,
      alternativas: {
        a: alternativa_a,
        b: alternativa_b,
        c: alternativa_c,
        d: alternativa_d
      },
      index,
      hasImage: image === 1, 
      image
    }
  })

  return questionsMapped

}
