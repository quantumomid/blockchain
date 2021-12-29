import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xF1A9D5fd3cf5FB537fEBd686DDB0636dF300d486",
);

export default instance;