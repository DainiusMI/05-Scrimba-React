import React from "react";
import { useEffect } from "react";

export default function QuestionField(props) {
    function cleanUp(string) {
        return string.replaceAll("&quot;", "\"").replaceAll("&#039;", "\'");
    }
    const question = cleanUp(props.data.question);
    //const answers = props.data.answers
    let answers =  props.data.answers;
    useEffect(() => {
        answers = answers.sort((a, b) => 0.5 - Math.random())
        console.log("effect")
    }, [])

    return (
        <div className="question" id={props.id}>
            <p className="text">{question}</p>
            <ul className="answers">
                {
                    answers.map((answer, idx) => {
                        return (
                            <li 
                                key={idx} 
                                className={answer.isHeld ? "selected option" : "option" }                                
                            >
                                
                                <label 
                                    className="label" 
                                    htmlFor={`q${props.id}-a${idx}`}
                                >{cleanUp(answer.value)}</label>

                                <input 
                                    className="input"
                                    type="radio" 
                                    id={`q${props.id}-a${idx}`} 
                                    name={props.id}
                                    value={answer.value}
                                    onClick={props.handleAnswers}
                                    //checked={console.log(`q${props.id}-a${idx}`)}
                                />
                            </li>
                        )
                    })
                }
            </ul>
            <hr />
        </div>
    )
}