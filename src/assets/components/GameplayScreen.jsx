import React from "react"
import QuestionField from "./QuestionField"
import yellowBlob from "../../../public/yellow_blob.png"
import blueBlob from "../../../public/blue_blob.png"

export default function GameplayScreen(props) {

    const [runTest, setRunTest] = React.useState(false)
    const [newGame, setNewGame] = React.useState(false)
    const [counter, setCounter] = React.useState({correct: 0})

    const [gameData, setGameData] = React.useState([])
    React.useEffect(() => {
        fetch(props.gemeSettings.url)
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
        console.log("click")
        const {value, position} = event.target.dataset;
        !runTest && setGameData(prevState => prevState.map((prevData, idx) => {
            return idx != position ? prevData : {
                question: prevData.question,
                answers: prevData.answers.map(answer => answer.value === value ? 
                    { value: answer.value, isHeld: !answer.isHeld, isCorrect: answer.isCorrect } : 
                    !answer.isHeld ? 
                        answer : 
                        { value: answer.value, isHeld: !answer.isHeld, isCorrect: answer.isCorrect })
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

        setRunTest(false)
        setNewGame(!newGame);
    }

    function selectButton() {
        if (runTest === true) {
            return (
                <div className="row">
                    <p>You score <span>{counter.correct}</span>/5 correct answers</p>
                    <button 
                        className="button sm" 
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

    function backToStartScreen() {
        props.setGameSettings(prevStettings => {
            return {
                ...prevStettings,
                startGame: false
            }
        })
    }
    
    return (
        <section className="gameplay-screen">

            <img src={yellowBlob} alt="yellow-blob" className="top-blob" />

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
            <button 
                className="button button-back"
                onClick={backToStartScreen}
            ><i className="fa-solid fa-gear"></i></button>

            <img src={blueBlob} alt="blue-blob" className="bottom-blob" />

        </section>
    )
}