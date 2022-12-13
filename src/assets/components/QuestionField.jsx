import React from "react";
import { useEffect } from "react";

export default function QuestionField(props) {

    function cleanUp(string) {
        return string.replaceAll("&quot;", "\"").replaceAll("&#039;", "\'");
    }

    const question = cleanUp(props.data.question);

    let answers = props.data.answers;
    useEffect(() => {
        answers = answers.sort((a, b) => 0.5 - Math.random())
    }, [])

    // rendered answers still placed in order
    

    return (
        <div className="question" id={props.id}>
            <p className="text no-user-select">{question}</p>
            <ul className="answers">
                {
                    answers.map((answer, idx) => {
                        return (
                            <li 
                                key={idx} 
                                // modify this to check
                                //className={answer.isHeld ? "selected option no-user-select" : "option no-user-select" }  
                                className={props.handleClassName(answer)}  

                                id={`q${props.id}-a${idx}`} 
                                data-value={answer.value}
                                data-position={props.id}
                                onClick={props.handleAnswers}
                                
                            >{cleanUp(answer.value)}</li>
                        )
                    })
                }
            </ul>
            <hr />
        </div>
    )
}