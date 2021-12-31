import { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react'
import factory from "../../ethereum/factory";
import web3 from '../../ethereum/web3';

const NewCampaign = () => {
    const [ minimumContribution, setMinimumContribution ] = useState(0);
    const [ submissionError, setSubmissionError ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setSubmissionError("");
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(minimumContribution)   
                .send({ from: accounts[0] });
        } catch (error) {
            setSubmissionError(error.message);
        }
        setLoading(false);
    };  

    return (
        <>
            <h3>Create a New Campaign</h3>
            <Form onSubmit={handleSubmit} error={!!submissionError}>
                <Form.Field>
                    <Input 
                        placeholder="Minimum Contribution" 
                        label="wei" 
                        labelPosition="right" 
                        value={minimumContribution}
                        onChange={(event) => setMinimumContribution(event.target.value)}
                    />
                </Form.Field>
                <Message  
                    error
                    header="Oooops!"
                    content={submissionError}
                />
                <Button type='submit' primary loading={loading}>Create</Button>
            </Form>
        </>
    )
}

export default NewCampaign;