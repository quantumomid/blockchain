import { useRouter } from "next/router";
import factory from "../../../ethereum/factory";

export const getStaticPaths = async () => {

    const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
    // console.log(deployedCampaigns);

    const campaignPaths = deployedCampaigns.map(campaignAddress => ({ params: { campaignAddress } }))

    return {
        paths: campaignPaths,
        fallback: true,
    }
}

export const getStaticProps = async ({ params }) => {
    // const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
    // console.log(deployedCampaigns);
    return {
        props: {
        //   campaigns: deployedCampaigns,
            param: params
        },
        revalidate: 1,
      };
}

const Campaign = ({ param }) => {
    console.log(param);
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