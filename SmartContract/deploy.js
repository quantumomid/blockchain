// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
    process.env.ACCOUNT_WORDS,
    process.env.NETWORK_LINK,
);

const web3 = new Web3(provider);