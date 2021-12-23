import "./App.css";
import React, { useEffect, useState } from "react";
import web3 from "./web3";
import lottery from "./lottery";

const App = () => {
    const [ manager, setManager ] = useState("");
    useEffect(() => {
      let isMounted = true;

      const setLotteryManager = async() =>{
        const lotterManager = await lottery.methods.manager().call();
        if (isMounted) setManager(lotterManager);
      }

      setLotteryManager();

      return () => {
        isMounted = false;
      }
    }, []);

    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Lottery contract! 🥳</h1>
        </header>
        <main>
          <h2>This contract is managed by {manager}.</h2>
        </main>
      </div>
    );

}
export default App;
