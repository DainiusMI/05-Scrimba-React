import React from "react";
import { useEffect } from "react";

export default function QuestionField(props) {

    function cleanUp(string) {
        return string.replaceAll("&quot;", "\"").replaceAll("&#039;", "\'");
    }

    const question = cleanUp(props.data.question);

    let answers = props.data.answers;

    // rendered answers still placed in order
    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    return (
        <div className="question" id={props.id}>
            <p className="text no-user-select">{decodeHtml(question)}</p>
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
                                
                            >{decodeHtml(answer.value)}</li>
                        )
                    })
                }
            </ul>
            <hr />
        </div>
    )
}