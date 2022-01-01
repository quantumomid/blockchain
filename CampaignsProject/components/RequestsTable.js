import { Table } from "semantic-ui-react";
import RequestsTableRow from "./RequestTableRow";

const RequestsTable = ({ requests, approversCount }) => {

    const renderRows = () => {
        return requests.map((request, index) => {
            return <RequestsTableRow key={index} request={request} id={index} approversCount={approversCount} />
        })
    }

    return (
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
    )
}

export default RequestsTable;