import React from "react";
import factory from "../ethereum/factory";
import { useRouter } from "next/router";
import { Card } from 'semantic-ui-react'

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

    // Function to prep the campaigns in right format to use with Semantic UI's Card component
    const renderCampaigns = () => {
        const items = campaigns.map(campaignAddress => {
            return {
                header: campaignAddress,
                description: <a>View Campaign</a>,
                fluid: true
            };
        });

        return <Card.Group items={items} />
    }

    return (
        <>
          <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
            />
            <h1>Campaigns Index</h1>
            <h2>{renderCampaigns()}</h2>
        </>
    )
}

export default CampaignIndex;