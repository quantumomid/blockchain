// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

beforeEach(() => {
    // Get list of all dummy accounts for our testing network from ganache
    web3.eth.getAccounts()
        .then(accounts => {
            console.log(accounts);
        });

});

describe("Inbox", () => {
    it("It deploys a contract", () => {
        
    })
})