import React from "react";

const PickWinner = ({ handlePickWinner }) => {
    return (
        <div className="pickWinnerContainer">
            <h4>Ready to pick a winner?</h4>
            <button onClick={handlePickWinner}>Pick Winner</button>
        </ div>
    )
}

export default PickWinner;