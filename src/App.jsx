import React from "react";
import Bubbles from "./assets/components/Bubbles";
import StartScreen from "./assets/components/StartScreen";
import "./assets/styles/css/App.css"
export default function App() {

  return (
    <main>
      <Bubbles position="top" color="yellow" />
      <StartScreen />
      <Bubbles position="bottom" color="blue" />
    </main>
  )
}