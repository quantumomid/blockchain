import "./App.css";
import React, { useEffect, useState } from "react";
import web3 from "./web3";
import lottery from "./lottery";
import EnterLotteryForm from "./EnterLotteryForm";

const App = () => {
    const [ manager, setManager ] = useState("");
    const [ players, setPlayers ] = useState([]);
    const [ balance, setBalance ] = useState("");
    const [ ether, setEther ] = useState("");

    useEffect(() => {
      let isMounted = true;

      const fetchLotteryDetails = async() =>{
        // Unlike when working with tests in node.js we dont need to provide the from
        // property to specify where the request is coming from as the default account 
        // from metamask is being used here (note: this is only true for call() method)
        const lotterManager = await lottery.methods.manager().call();
        const lotteryPlayers = await lottery.methods.getPlayers().call();
        const lotteryBalance = await web3.eth.getBalance(lottery.options.address);

        if (isMounted) {
          setManager(lotterManager);
          setPlayers(lotteryPlayers);      
          setBalance(lotteryBalance);
        };
      }

      fetchLotteryDetails();

      return () => {
        isMounted = false;
      }
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();
      console.log("Attempting to enter lottery with account " + accounts[0] +" and amount " + ether);
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(ether, "ether")
      });
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Lottery contract! 🥳</h1>
        </header>
        <main>
          <h2>This contract is managed by {manager}.</h2>
          <h3>At present, there are { players.length } participants in the contract, who are competing to win {web3.utils.fromWei(balance, "ether")} ether! </h3>

          <EnterLotteryForm handleSubmit={handleSubmit} ether={ether} setEther={setEther} />
        </main>
      </div>
    );

}

export default App;