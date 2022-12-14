import React from "react";

export default function QuizSettings(props) {

    function confirmSettings(event) {
        const {name, value} = event.target
        console.log(name)
        props.setGameSettings(prevSettings => ({...prevSettings, [name]: value }))
    }
    function fixString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).replace("_", " ")
    }
    return (
        <section className="settings">
            <div className="category-container">
                <label htmlFor="">Select Category:</label>
                <select 
                    name="category" 
                    id="catergory" 
                    onChange={confirmSettings}
                >
                    {
                        Object.keys(props.templateURL).map((element, idx)=> {
                            return <option key={`category-${idx}`} value={element}>{fixString(element)}</option>
                        })
                    }

                </select>
            </div>

            <div className="difficulty-container">
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select name="difficulty" id="difficulty" onChange={confirmSettings}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <button className="button">Start Game</button>
        </section>
    )
}