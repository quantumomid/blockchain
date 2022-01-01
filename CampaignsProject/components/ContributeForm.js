import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import CampaignContract from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const ContributeForm = ({ address }) => {
    const router = useRouter();
    const [ value, setValue ] = useState("");
    const [ submissionError, setSubmissionError ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setSubmissionError("");
        const campaign = CampaignContract(address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({ 
                from: accounts[0], 
                value: web3.utils.toWei(value, "ether") 
            });
            router.reload();
        } catch (error) {
            setSubmissionError(error.message);
        }
        setLoading(false);
        setValue("");
    }

    return (
        <Form onSubmit={handleSubmit} error={!!submissionError}>
            <Form.Field>
                <Input 
                    placeholder="Amount to contribute" 
                    label="ether" 
                    labelPosition="right" 
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </Form.Field>
            <Message  
                error
                header="Oooops!"
                content={submissionError}
            />
            <Button type='submit' primary loading={loading}>Contribute</Button>
        </Form>
    )
}

export default ContributeForm;