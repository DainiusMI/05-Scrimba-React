import React from "react";
import StartScreen from "./assets/components/StartScreen";
import GameplayScreen from "./assets/components/GameplayScreen";
import "./assets/styles/css/App.css"
export default function App() {

  const templateURL = {
    any_category: "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple",
    general_knowladge: "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple",
    mythology: "https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple",
    sports: "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple",
    geography: "https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple",
    history: "https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple",
    animals: "https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple",
    vehicles: "https://opentdb.com/api.php?amount=5&category=28&difficulty=easy&type=multiple"
  }

  const [gemeSettings, setGameSettings] = React.useState({
    category: "any_category",
    difficulty: "easy",
    url: "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple",
    startGame: false
  })



  return (  
    <main>
      {
        gemeSettings.startGame ? 
          <GameplayScreen gemeSettings={gemeSettings} setGameSettings={setGameSettings} />:
          <StartScreen setGameSettings={setGameSettings} templateURL={templateURL} />
      }
    </main>
  )
}