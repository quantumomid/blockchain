// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { abi, evm } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
    // Get list of all dummy accounts for our testing network from ganache
    accounts = await web3.eth.getAccounts();

    // Deploy the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ["Salaam there!"] })
        .send({ from: accounts[0], gas: "1000000" })
});

describe("Inbox", () => {
    it("It deploys a contract", () => {
        // console.log(accounts);
        // console.log(inbox);
        assert.ok(inbox.options.address);
    })

    it("It has a default message", async () => {
        // Call the .message() method on the Inbox contract to get the message
        // use .call() because here we are NOT modifying the contract
        const message = await inbox.methods.message().call();
        assert.equal(message, "Salaam there!");
    })

    it("Message changes as expected", async () => {
        const newMessage = "Wa alaikum mus Salaam!";
        // Now we are MODIFYING the contract i.e. therefore will be sending a 
        // transaction and hence we use the .send() method 
        await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
        // Retireve message and check if it did indeed change
        const message = await inbox.methods.message().call();
        assert.equal(message, newMessage);
    })
})