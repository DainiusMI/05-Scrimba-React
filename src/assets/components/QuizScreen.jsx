import React from "react"
import QuestionField from "./QuestionField"


export default function QuizScreen() {
    const [triviaData, setTrivitaData] = React.useState([])
    const [gameData, setGameData] = React.useState([])
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple")
            .then(res => res.json())
            //.then(data => setTrivitaData(data.results))
            .then(data => {
                setGameData(data.results.map(item => {
                    return {
                        question: item.question,
                        answers: item.incorrect_answers.map(answer => {return {value: answer, isCorrect: false, isHeld: false}}).concat({value: item.correct_answer, isCorrect: true, isHeld: false})
                    }
                }))
            })
            /*
            setGameData(triviaData.map(item => {
                return {
                    question: item.question,
                    answers: item.incorrect_answers.map(answer => {return {value: answer, isCorrect: false, isHeld: false}}).concat({value: item.correct_answer, isCorrect: true, isHeld: false})
                }
            }))
            */
    }, [])



    function handleAnswers(event) {
        const questionIDX = event.target.name;
        const answerIDX = event.target.id[4]


        const value = event.target.value;
        const updtatedQuestion = {
            question: gameData[questionIDX].question,
            answers: gameData[questionIDX].answers.map(answer => answer.value === value ? { value: answer.value, isHeld: !answer.isHeld, isCorrect: answer.isCorrect } : answer)
        }
        //console.log(updtatedQuestion)
        setGameData(prevState => prevState.map((prevQuestion, idx) => {
            return idx == questionIDX ? {
                question: gameData[idx].question,
                answers: gameData[idx].answers.map(answer => answer.value === value ? { value: answer.value, isHeld: !answer.isHeld, isCorrect: answer.isCorrect } : answer)
            } : prevQuestion
        }))
        /*
                console.log(event.target)
        console.log(
            gameData[questionIDX].answers[answerIDX].isHeld
        )

        console.log(
            gameData.map(element => element.answers.map(answer => {
              return  answer.value === value ? { value: value, isHeld: !answer.isHeld, isCorrect: answer.isCorrect} : answer
            }))
        )
        */
        //console.log(gameData[questionIDX].answers[answerIDX])
    }

    return (
        <form className="quiz-screen">
            {
            
                gameData.length && gameData.map((question, idx) => {
                    
                    return (
                        <QuestionField 
                            key={`question-${idx}`} 
                            id={idx} 
                            data={question}
                            handleAnswers={handleAnswers}
                
                        />    
                    )
                } )

            }
            <button 
                className="button"
                onClick={handleAnswers}
            >Check answers</button>
        </form>
    )
}