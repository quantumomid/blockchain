const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: "1000000" });

    await factory.methods.createCampaign("100").send({ from: accounts[0], gas: "1000000" });

    // Using array destructuring to save the first element of the returned array 
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    // create instance of campaign contract (no need for .deploy or .send as its already deployed)
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
});

describe("Campaigns", () => {
    it("Factory and Campaign deployed", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it("Campaign caller should be manager", async () => {
        const manager = await campaign.methods.manager().call();
        assert(accounts[0], manager);
    })

    it("Can contribute to campaign and get labelled as approver", async() => {
        await campaign.methods.contribute().send({ value: "200", from: accounts[1] });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    })

    it("Minimum contribution required", async () => {
        try {
            await campaign.methods.contribute().send({ value: "5", from: accounts[1] });
            // The above code should result in error as value is below threshold therefore below
            // code is for a check to purposefully fail the test if above didnt throw error
            assert(false);
        } catch (error) {
            assert(error);
        }
    })

    it("Manager can make payment request", async () => {
        await campaign.methods.createRequest("Buy raw materials", "100", accounts[1])
            .send({ from: accounts[0], gas: "1000000" });

        const request = await campaign.methods.requests(0).call();

        assert("Buy raw materials", request.description);
    })

    it("Requests are processed", async () => {
        await campaign.methods.contribute().send({ from: accounts[0], value: web3.utils.toWei("10", "ether") });

        await campaign.methods.createRequest("Hire engineer", web3.utils.toWei("5", "ether"), accounts[1])
            .send({ from: accounts[0], gas: "1000000" });

        await campaign.methods.approveRequest(0).send({ from: accounts[0], gas: "1000000" });

        await campaign.methods.finalizeRequest(0).send({ from: accounts[0], gas: "1000000" });
    
        // Convert into Ether first and then into number type from string type
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, "ether");
        balance = parseFloat(balance);

        console.log(balance);
        // Asserting with slightly less than 105 to allow for some leeway
        assert(balance > 104);
    })
});

// describe("", () => {
//     it("", () => {
    
//     })
// });