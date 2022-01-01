import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";

const CampaignRequests = () => {
    const router = useRouter();
    const address = router.query.campaignAddress;
    console.log({ address });

    return (
        <>
            <h1>This is the Campaign Requests page</h1>
            <Button primary onClick={() => router.push("/campaigns/"+address+"/requests/new")}>Add Request</Button>
        </>
    )
}

export default CampaignRequests;