import React from "react"
import QuestionField from "./QuestionField"


export default function QuizScreen() {

    const [triviaData, setTrivitaData] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => setTrivitaData(data.results))

    }, [])

    return (
        <section className="quiz-screen">
            {
            
                triviaData.length && triviaData.map((question, idx) => {
                    return (
                        <QuestionField key={`question-${idx}`} id={idx} trivia={question}/>    
                    )
                } )
            
            }
        </section>
    )
}