// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");
require('dotenv').config();

const provider = new HDWalletProvider(
    process.env.ACCOUNT_WORDS,
    process.env.NETWORK_LINK,
);

const web3 = new Web3(provider);

// function to allow us to use the async-await syntax
const deploy = async () => {
    // Getting all of the accounts associated with our metamask address
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying from account", accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ["What's up mate?"] })
        .send({ gas: "1000000", from: accounts[0] });
    
    console.log("Address the contract was deployed to: ", result.options.address);

    //Below is to prevent a hanging deployment
    provider.engine.stop();
};

deploy();