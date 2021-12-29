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
});

// describe("", () => {
//     it("", () => {
    
//     })
// });