import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import RequestsTable from "../../../../components/RequestsTable";
import CampaignContract from "../../../../ethereum/campaign";

export const getServerSideProps = async (context) => {
    // console.log({context});
    const address = context.query.campaignAddress;
    // console.log({address});
    const campaign = CampaignContract(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    // console.log({requestCount});
    const approversCount = await campaign.methods.approversCount().call();
    // console.log({ approversCount });

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
            requestCount,
            approversCount
        }
      };
}

const CampaignRequests = ({ address, requests, requestCount, approversCount }) => {
    const router = useRouter();
    // console.log({ address, requests, requestCount, approversCount });


    return (
        <>
            <h1>This is the Campaign Requests page</h1>
            <RequestsTable requests={requests} approversCount={approversCount} />
            <Button primary onClick={() => router.push("/campaigns/"+address+"/requests/new")}>Add Request</Button>
        </>
    )
}

export default CampaignRequests;