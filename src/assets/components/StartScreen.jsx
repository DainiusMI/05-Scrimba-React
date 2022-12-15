import React from "react";
import yellowBlob from "../../../public/yellow_blob.png"
import blueBlob from "../../../public/blue_blob.png"

export default function StartScreen(props) {
    const {setGameSettings, templateURL} = props
    function confirmSettings(event) {
        const {name, value} = event.target
 
        setGameSettings(prevSettings => {
            
            return {
                ...prevSettings, 
                [name]: value,
                url: name === "category" ? 
                    templateURL[value].replace("easy", prevSettings.difficulty) : 
                    prevSettings.url.replace(prevSettings.difficulty, value)
            }
        })
    }
    function format(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).replace("_", " ")
    }
    function startQuiz() {
        setGameSettings(prevSettings => ({...prevSettings, startGame: !prevSettings.startGame}))
    }
    return (
        <section className="start-screen">

            <img src={yellowBlob} alt="yellow-blob" className="top-blob" />
            
            <h2 className="heading">Quizzical</h2>
            <p className="description">This is a game of trivia. Select category and difficulty for your quiz.</p>


                <div className="settings">
                <div className="category-container">
                    <label htmlFor="">Select Category:</label>
                    <select 
                        name="category" 
                        id="catergory" 
                        onChange={confirmSettings}
                    >
                        {
                            Object.keys(templateURL).map((element, idx)=> {
                                return <option key={`category-${idx}`} value={element}>{format(element)}</option>
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

            </div>

            <button 
                className="button bg"
                onClick={startQuiz}
            >Start quiz</button>

            <img src={blueBlob} alt="blue-blob" className="bottom-blob" />
        </section>
    )
}   