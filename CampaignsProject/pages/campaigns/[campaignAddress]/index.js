import { useRouter } from "next/router";
import factory from "../../../ethereum/factory";
import CampaignContract from "../../../ethereum/campaign";
import { Card } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";

export const getStaticPaths = async () => {

    const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(deployedCampaigns);

    const campaignPaths = deployedCampaigns.map(campaignAddress => ({ params: { campaignAddress } }))

    return {
        paths: campaignPaths,
        fallback: true,
    }
}

export const getStaticProps = async ({ params }) => {
    // console.log({params});
    const deployedCampaign = CampaignContract(params.campaignAddress);
    // console.log(deployedCampaign);
    const summary = await deployedCampaign.methods.getSummary().call();
    // console.log(summary);

    return {
        props: {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],

        },
        revalidate: 1,
      };
}

const Campaign = ({ minimumContribution, balance, requestsCount, approversCount, manager }) => {
    console.log({ minimumContribution, balance, requestsCount, approversCount, manager });
    const router = useRouter();
    const { isFallback } = router;
   
    if (isFallback) {
      return <div>Loading...</div>;
    }

    const renderCards = () => {
        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description: "Manager created this campaign and can request for withdrawing funds from campaign",
                style: { overflowWrap: "break-word" }
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution (wei)",
                description: "Contribute at least this much wei in order to become a contributor of this campaign ",
            },
            {
                header: requestsCount,
                meta: "Number of requests",
                description: "Requests are attempts to withdraw money from the campaign contract fund by the manager. Approvers, i.e. contributors, must approve a request. ",
            },
            {
                header: approversCount,
                meta: "Number of approvers",
                description: "The number of people who have thus far conributed funds to the campaign.",
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign Balance (Ether)",
                description: "Amount of money the campaign current has to spend.",
            }
        ]
        return <Card.Group items={items} />;
    }

    return (
        <section>
            <h1>This is the Campaign page</h1>  
            {renderCards()}
        </section>
    )
}

export default Campaign;