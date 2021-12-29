import React, { useEffect } from "react";
import factory from "../ethereum/factory";

const CampaignIndex = () => {

    useEffect(() => {
        const getDeployedCampaigns = async () => {
            const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
            console.log(deployedCampaigns);
            return deployedCampaigns;
        }
        getDeployedCampaigns();

    }, []);

    return (
        <h1>Campaigns Index</h1>
    )
}

export default CampaignIndex;