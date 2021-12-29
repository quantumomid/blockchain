import React from "react";
import factory from "../ethereum/factory";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
    const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
    // console.log(deployedCampaigns);
    return {
        props: {
          campaigns: deployedCampaigns,
        },
        revalidate: 1,
      };
}

const CampaignIndex = ({ campaigns }) => {
    console.log(campaigns);
    const router = useRouter();
    const { isFallback } = router;
   
    if (isFallback) {
      return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Campaigns Index</h1>
            <h2>First campaign: {campaigns[0]}</h2>
        </>
    )
}

export default CampaignIndex;