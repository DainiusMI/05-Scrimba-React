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

        const {value, position} = event.target.dataset;

        setGameData(prevState => prevState.map((prevData, idx) => {
            return idx != position ? prevData : {
                question: prevData.question,
                answers: prevData.answers.map(answer => answer.value === value ? { value: answer.value, isHeld: !answer.isHeld, isCorrect: answer.isCorrect } : !answer.isHeld ? answer : { value: answer.value, isHeld: !answer.isHeld, isCorrect: answer.isCorrect })
            }
        }))
    }

    
    const [gameState, setGameState] = React.useState({
        runCheck: false,
        correct: 0
    })
    function checkAnswers(answer) {
                
        const {isHeld, isCorrect} = answer;
        let className = ""
        function select() {
            className = isHeld ? "select option no-user-select" : "option no-user-select"
        }
        function check() {
            if (isHeld && isCorrect) {
                className = "option correct"
                setGameState(prevState => {
                    return {
                        ...prevState,
                        correct: prevState.correct + 1
                    }
                })
            }
            else if (isHeld) {
                className = "option incorrect"
            }
            else {
                className = "option"
            }
        }
        gameState.runCheck ? check() : select()
        return className 
        // if selected and correct apply correct if not check if it was selected if yes apply inccorect if not just option
        
        isHeld && isCorrect ? "option correct" : isHeld ? "option incorrect" : "option"
    }
    function runCheck() {
        setGameState(prevState => {
            return {
                ...prevState,
                runCheck: true
            }
        })
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
                            checkAnswers={checkAnswers}

                            setGameData={setGameData}
                        />    
                    )
                } )

            }
            <button 
                className="button"
                onClick={runCheck}
            >Check answers</button>
        </section>
    )
}