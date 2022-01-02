import { useState } from "react";
import { Table, Button, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import CampaignContract from "../ethereum/campaign";
import { useRouter } from "next/router";


const RequestsTableRow = ({ request, id, approversCount, address, submissionError, setSubmissionError }) => {
    const router = useRouter();
    const [ approveLoading, setApproveLoading ] = useState(false);
    const [ finaliseLoading, setFinaliseLoading ] = useState(false);

    console.log({id});
    const readyToFinalise = request.approvalCount > approversCount/2;

    const handleApprove = async () => {
        setSubmissionError("");
        setApproveLoading(true);
        const campaign = CampaignContract(address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(id).send({
                from: accounts[0]
            });
            router.reload();
        } catch (error) {
            setSubmissionError(error.message);
        }
        setApproveLoading(false);
    }

    const handleFinalise = async () => {
        setSubmissionError("");
        setFinaliseLoading(true);
        const campaign = CampaignContract(address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(id).send({
                from: accounts[0]
            });
            router.reload();
        } catch (error) {
            setSubmissionError(error.message);
        }
        setFinaliseLoading(false);
    }

    return (
        <>
            <Table.Row disabled={request.complete} positive={readyToFinalise && !request.complete}>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{request.description}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(request.value, "ether")}</Table.Cell>
                <Table.Cell>{request.recipient}</Table.Cell>
                <Table.Cell>{request.approvalCount}/{approversCount}</Table.Cell>
                <Table.Cell>
                    {
                        !request.complete && (
                            <Button color="green" basic onClick={handleApprove} loading={approveLoading}>
                                Approve
                            </Button>
                        )
                    }
                </Table.Cell>
                <Table.Cell>
                    { !request.complete && (
                        <Button color="teal" basic onClick={handleFinalise} loading={finaliseLoading}>
                            Finalise
                        </Button>
                        )
                    }
                </Table.Cell>
            </Table.Row>
        </>
    )
}

export default RequestsTableRow;