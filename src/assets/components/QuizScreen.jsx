import React from "react"
import QuestionField from "./QuestionField"


export default function QuizScreen() {
    //const [triviaData, setTrivitaData] = React.useState([])
    const [gameData, setGameData] = React.useState([])
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple")
            .then(res => res.json())
            //.then(data => setTrivitaData(data.results))
                .then(data => {
                    setGameData(data.results.map(item => {
                        return {
                            question: item.question,
                            answers: item.incorrect_answers.map(answer => {
                                return {
                                    value: answer, 
                                    isCorrect: false, 
                                    isHeld: false
                                }}).concat({
                                    value: item.correct_answer, 
                                    isCorrect: true, 
                                    isHeld: false
                                })
                        }
                    }))
                })
    }, [])

    const [gameState, setGameState] = React.useState({
        runCheck: false
    })

    const [correctCounter, setCorrectCounter] = React.useState({correct: 0})

    React.useEffect(() => {
        gameData.map(element => element.answers.map(answer => {
            if (answer.isHeld && answer.isCorrect) {
                setCorrectCounter(prevCount => {
                    return {
                        correct: prevCount.correct + 1
                    }
                })
            }
        }))

    }, [gameState])

    function handleAnswers(event) {
        const {value, position} = event.target.dataset;
        !gameState.runCheck && setGameData(prevState => prevState.map((prevData, idx) => {
            return idx != position ? prevData : {
                question: prevData.question,
                answers: prevData.answers.map(answer => answer.value === value ? { value: answer.value, isHeld: !answer.isHeld, isCorrect: answer.isCorrect } : !answer.isHeld ? answer : { value: answer.value, isHeld: !answer.isHeld, isCorrect: answer.isCorrect })
            }
        }))
    }


    function handleClassName(answer) {
        const {isHeld, isCorrect} = answer;
        let className = ""
        function selectedClass() {
            className = isHeld ? "selected option no-user-select" : "option no-user-select"
        }
        function checkedClass() {
            if (isHeld && isCorrect) {
                className = "option correct no-user-select"
            }
            else if (isHeld) {
                className = "option incorrect no-user-select"
            }
            else {
                className = "option no-user-select"
            }
        }
        gameState.runCheck ? checkedClass() : selectedClass()
        return className 
    }

    function runCheck() {
        setGameState(prevState => ({runCheck: true}))
    }
    gameState.runCheck && console.log("check answers")
    return (
        <section className="quiz-screen">
            {
                gameData.length && gameData.map((question, idx) => {       
                    return (
                        <QuestionField 
                            key={`question-${idx}`} 
                            id={idx} 
                            data={question}
                            handleAnswers={handleAnswers}
                            handleClassName={handleClassName}
                        />    
                    )
                } )

            }
            <button className="button" onClick={runCheck}>Check answers</button>
        </section>
    )
}