import Web3 from "web3";

// Request permission for access to MetaMask:
window.ethereum.request({ method: "eth_requestAccounts" });

//I.e. get the provider present in the browser from metamask
// to create our version of web3 here
const web3 = new Web3(window.ethereum);

export default web3;