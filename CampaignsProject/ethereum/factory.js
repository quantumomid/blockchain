import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x2c34CE2E2f34408ee13FcEA3Ac5C741340187Cba",
);

export default instance;