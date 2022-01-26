import React from "react";
import factory from "../ethereum/factory";
import { useRouter } from "next/router";
import { Card, Button } from 'semantic-ui-react'
import Link from "next/link";

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
    // console.log(campaigns);
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
                description: (
                    <Link href={"/campaigns/"+campaignAddress}><a>View Campaign</a></Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items} />
    }

    return (
        <div>
            <h1>Campaigns Index</h1>
            <Button
                floated="right" 
                content="Create Campaign"
                icon="add circle"
                // primary
                secondary
                onClick={() => router.push("/campaigns/new")}
            />
            {renderCampaigns()}
        </div>
    )
}

export default CampaignIndex;