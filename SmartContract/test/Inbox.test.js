// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
beforeEach(async () => {
    // Get list of all dummy accounts for our testing network from ganache
    accounts = await web3.eth.getAccounts();

    // Deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ["Salaam there!"] })
        .send({ from: accounts[0], gas: "1000000" })
});

describe("Inbox", () => {
    it("It deploys a contract", () => {
        console.log(accounts);
        console.log(inbox);

    })
})