import { useRouter } from "next/router";
import factory from "../../../ethereum/factory";
import CampaignContract from "../../../ethereum/campaign";

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

    return (
        <h1>This is the Campaign page</h1>
    )
}

export default Campaign;