import { Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";

const RequestsTableRow = ({ request, id, approversCount }) => {
    console.log({id});
    return (
        <Table.Row>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{request.description}</Table.Cell>
            <Table.Cell>{web3.utils.fromWei(request.value, "ether")}</Table.Cell>
            <Table.Cell>{request.recipient}</Table.Cell>
            <Table.Cell>{request.approvalCount}/{approversCount}</Table.Cell>


        </Table.Row>
    )
}

export default RequestsTableRow;