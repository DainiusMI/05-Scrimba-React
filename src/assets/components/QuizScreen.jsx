import React from "react"
import QuestionField from "./QuestionField"


export default function QuizScreen() {

    const [runTest, setRunTest] = React.useState(false)
    const [newGame, setNewGame] = React.useState(false)
    const [counter, setCounter] = React.useState({correct: 0})

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
                                }).sort((a, b) => 0.5 - Math.random())
                        }
                    }))
                })

    }, [newGame])


    // handle counter both count and reset
    React.useEffect(() => {
        runTest && gameData.map(element => element.answers.map(answer => {
            if (answer.isHeld && answer.isCorrect) {
                setCounter(prevCount => {
                    return {
                        correct: prevCount.correct + 1
                    }
                })
            }
        }))
        !runTest && setCounter({correct: 0})

    }, [runTest])
    
    function handleAnswers(event) {
        const {value, position} = event.target.dataset;
        !runTest && setGameData(prevState => prevState.map((prevData, idx) => {
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
        function evaluatedClass() {
            if (isCorrect) {
                className = "option correct no-user-select"
            }
            else if (isHeld && !isCorrect) {
                className = "option incorrect no-user-select"
            }
            else {
                className = "option no-user-select"
            }
        }
        runTest ? evaluatedClass() : selectedClass()
        return className 
    }
    function checkAnswers() {
        setRunTest(true)
    }
    function resetGame() {
        //console.log("restart clicked")
        setRunTest(false)
        setNewGame(!newGame);
    }
    console.log(counter.correct)
    function selectButton() {
        if (runTest === true) {
            return (
                <div className="row">
                    <p>You score <span>{counter.correct}</span>/5 correct answers</p>
                    <button 
                        className="button" 
                        onClick={resetGame}
                    >Play again</button>
                </div>
            )
        }
        else 
            return (<button 
                        className="button" 
                        onClick={checkAnswers}
                    >Check answers</button>)
    }
    const placeButton = selectButton()

    
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
            {placeButton}
        </section>
    )
}