const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Contract", () => {
    it("Contract has been deployed :)", () => {
        //Existence of address acts as a marker to show that the 
        //contract/transaction was indeed deployed to somewhere!
        assert.ok(lottery.options.address);
    });

    // Below we make use of a conversion tool from the utils library in web3
    // to convert our ether to wei 
    it("Allows one account to enter with appropiate ether", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.02", "ether")
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        //Check that the only player is the only account used to enter
        assert.equal(accounts[0], players[0]);

        //Confirm that there is indeed only one player in the lottery contract
        assert.equal(1, players.length);
    });

    it("Allows multiple accounts to enter the contract with appropiate ether", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.02", "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei("0.02", "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei("0.02", "ether")
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        //Confirm the entered accounts are present among the players 
        // in the contract
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);

        //Confirm that there are three players in the lottery contract
        assert.equal(3, players.length);
    });
});