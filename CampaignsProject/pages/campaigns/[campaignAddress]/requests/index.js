import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import CampaignContract from "../../../../ethereum/campaign";
import factory from "../../../../ethereum/factory";

// export const getStaticPaths = async () => {

//     const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
//     console.log({deployedCampaigns});

//     const campaignPaths = deployedCampaigns.map(campaignAddress => ({ params: { campaignAddress } }))

//     return {
//         paths: campaignPaths,
//         fallback: true,
//     }
// }

// export const getStaticProps = async ({ params }) => {
//     console.log({params});
//     // const deployedCampaign = CampaignContract(params.campaignAddress);
//     // console.log(deployedCampaign);
//     // const summary = await deployedCampaign.methods.getSummary().call();
//     // console.log(summary);

//     return {
//         props: {

//         },
//         revalidate: 1,
//       };
// }

export const getServerSideProps = async (context) => {
    // console.log({context});
    const address = context.query.campaignAddress;
    // console.log({address});
    const campaign = CampaignContract(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    // console.log({requestCount});

    const requests = await Promise.all(
        Array(parseInt(requestCount)).fill().map((element, index) => {
            return campaign.methods.requests(index).call();
        })
    );
    console.log({requests});

    return {
        props: {
            address,
            requests: JSON.parse(JSON.stringify(requests)) ,
            requestCount
        }
      };
}

const CampaignRequests = ({ address, requests, requestCount }) => {
    // const router = useRouter();
    // const address = router.query.campaignAddress;
    console.log({ address, requests, requestCount });
    // const campaign = CampaignContract(address);


    return (
        <>
            <h1>This is the Campaign Requests page</h1>
            <Button primary onClick={() => router.push("/campaigns/"+address+"/requests/new")}>Add Request</Button>
        </>
    )
}

export default CampaignRequests;