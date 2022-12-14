import React from "react";
import Bubbles from "./assets/components/Bubbles";
import StartScreen from "./assets/components/StartScreen";
//import QuizSettings from "./assets/components/QuizSettings";
import GameplayScreen from "./assets/components/GameplayScreen";
import "./assets/styles/css/App.css"
import { useEffect } from "react";
export default function App() {
  const triviaURL = [
    {
      general: {
        easy:"https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple",
        medium: "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple",
        hard: "https://opentdb.com/api.php?amount=5&category=9&difficulty=hard&type=multiple"
      },
      mythology: {
        easy: "https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple",
        medium: "https://opentdb.com/api.php?amount=5&category=20&difficulty=medium&type=multiple",
        hard: "https://opentdb.com/api.php?amount=5&category=20&difficulty=hard&type=multiple"
      },
      sports: {
        easy: "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple",
        medium: "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple",
        hard: "https://opentdb.com/api.php?amount=5&category=21&difficulty=hard&type=multiple"
      },
      geography: {
        easy: "https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple",
        medium: "https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple",

      }
    }
  ]
  const templateURL = {
    general_knowladge: "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple",
    mythology: "https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple",
    sports: "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple",
    geography: "https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple",
    history: "https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple",
    animals: "https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple"
  }

  const [gemeSettings, setGameSettings] = React.useState({
    category: "general_knowladge",
    difficulty: "easy",
    url: "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple",
    startGame: false
  })

  useEffect(() => {
    setGameSettings
  }, [gemeSettings.startGame])

  console.log(gemeSettings)
  return (
    /*
      you will need to store state for quiz options here
    */
   
    <main>
      
      {
        gemeSettings.startGame ? 
          <GameplayScreen gemeSettings={gemeSettings}/>:
          <StartScreen setGameSettings={setGameSettings} templateURL={templateURL}/>
        
        
      }
    </main>
  )
}