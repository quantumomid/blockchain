import { useState } from "react";
import { Table, Message } from "semantic-ui-react";
import RequestsTableRow from "./RequestTableRow";

const RequestsTable = ({ requests, approversCount, address }) => {
    const [ submissionError, setSubmissionError ] = useState("");

    const renderRows = () => {
        return requests.map((request, index) => {
            return (
                <RequestsTableRow 
                    key={index} 
                    request={request} 
                    id={index} 
                    approversCount={approversCount} 
                    address={address} 
                    submissionError={submissionError} 
                    setSubmissionError={setSubmissionError}
                />)
        })
    }

    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Recipient</Table.HeaderCell>
                        <Table.HeaderCell>Approval Count</Table.HeaderCell>
                        <Table.HeaderCell>Approve</Table.HeaderCell>
                        <Table.HeaderCell>Finalise</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { renderRows() }
                </Table.Body>
            </Table>
            { submissionError && (
                <Message
                    error
                    header="Oooops!"
                    content={submissionError}
                />
            )}
        </>
    )
}

export default RequestsTable;