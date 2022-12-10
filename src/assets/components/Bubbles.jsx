import React from "react";

export default function Bubbles(props) {
    const bubbleColor = {backgroundColor: props.color === "yellow" ? "#FFFAD1" : "#DEEBF8"};
    console.log(bubbleColor)
    return (
        <div className={`bubble-container ${props.position}`}>

            <div className="spin-right-1">
                <div 
                    className="bubble md" 
                    style={bubbleColor}
                />
            </div>

            <div 
                className="bubble bg" 
                style={bubbleColor}
            />

            <div className="spin-right-2">
                <div 
                    className="bubble sm" 
                    style={bubbleColor}
                />
            </div>

            <div className="spin-left">
                <div 
                    className="bubble md" 
                    style={bubbleColor}
                />
            </div>

        </div>
    )
}