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

    it("Cannot enter with insufficient ether value", async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0], 
                value: 0
            });
            // This will fail the test intentionally if error wasnt thrown 
            // from code above (because error should be thrown)
            assert(false);
        } catch (error) {
            // To confirm an error was thrown
            assert(error);
        }
    });

    it("Only the manager should be able to pick the pickWinner", async () => {
        try {
            // We can just check by trying to use the pickWinner with any account other than
            // accounts[0] which was used to initialise the lottery contract (see before each)
            // and thus the manager is accounts[0]
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
        } catch (error) {
            assert(error);
        }
    });

    it("Sends money to winner and resets after", async() => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("1", "ether")
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({ from: accounts[0] });

        const finalBalance = await web3.eth.getBalance(accounts[0]);

        // Note for the check below we expect an ALMOST 1 ether difference
        // "Almost" because we also pay GAS each time we change the contract
        // i.e. because we are making a transaction!
        const difference = finalBalance - initialBalance;

        //To check the exact balance and also therefore amount spent on gas:
        // console.log(difference);

        // i.e. instead of asserting an exact difference of 1 ether
        // we will check for 0.8 to account for the GAS spent!
        assert(difference > web3.utils.toWei("0.8", "ether"));
    });
});