import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import CampaignContract from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";

const NewCampaignRequest = () => {
    const router = useRouter();
    const address = router.query.campaignAddress;
    // console.log({ address });
    const [ formInputs, setFormInputs ] = useState({
        description: "",
        value: "",
        recipient: ""
    });
    const [ submissionError, setSubmissionError ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        setLoading(true);
        setSubmissionError("");
        const campaign = CampaignContract(address);
        const { description, value, recipient } = formInputs;
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                    description, 
                    web3.utils.toWei(value), 
                    recipient
                )
                .send({ 
                    from: accounts[0], 
                });
            router.push("/campaigns/" + address + "/requests");
        } catch (error) {
            setSubmissionError(error.message);
        }
        setLoading(false);
        setFormInputs({
            description: "",
            value: "",
            recipient: ""
        })
    }

    return (
        <>
            <Link href={"/campaigns/" + address + "/requests"}><a>Back</a></Link>
            <h1>Make a request</h1>
            <Form onSubmit={handleSubmit} error={!!submissionError}>
                <Form.Field>
                    <Input
                        name="description" 
                        placeholder="Description" 
                        value={formInputs.description}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        name="value" 
                        placeholder="Value"
                        label="ether" 
                        labelPosition="right"  
                        value={formInputs.value}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        name="recipient" 
                        placeholder="Recipient" 
                        value={formInputs.recipient}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Message  
                    error
                    header="Oooops!"
                    content={submissionError}
                />
                <Button type='submit' primary loading={loading}>Add New Request</Button>
            </Form>
        </>
    )
}

export default NewCampaignRequest;