import React from "react";

const EnterLotteryForm = ({ handleSubmit, ether, setEther }) => (
    <form onSubmit={handleSubmit}>
        <h4>Enter the lottery here</h4>
        <div className="etherInputContainer">
        <label htmlFor="etherAmount">Amount of ether:</label>
        <input id="etherAmount" type="text" name="etherAmount" value={ether} onChange={(e) => setEther(e.target.value)}/>
        </div>
        <input type="submit" value="submit"/>
    </form>
)

export default EnterLotteryForm;