pragma solidity ^0.4.17;

// Factory contract to store and create new compaigns
contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        // Also explicitly pass senders address otherwise in the Campaign contract
        // constructor it will have taken the CampaignFactory's address as manager 
        // instead of user initialising the new Campaign!
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    // Function to allow contributors/approvers to approve a request by its index
    // in the requests array 
    function approveRequest(uint index) public {
        //Find specific request and save as STORAGE variable so any modifications are changing
        // original reference!
        Request storage request = requests[index];

        // Check if the approver is indeed a contributor i.e. they exist in the approvers mapping
        require(approvers[msg.sender]);
        //Also same approver cannot vote more than once on the same request
        require(!request.approvals[msg.sender]);

        // Now that above checks have passed we can increment the approvalsCount by 1 and also 
        //indicate for future that current sender has voted already
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    // Function to allow the manager to finalise a request made and send money to the vendor
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        //Ensure the request hasnt already been finalised!
        require(!request.complete);
        //Check that majority i.e. more than 50% of contributors/approvers have approved this request
        require(request.approvalCount > (approversCount / 2));
        
        request.complete = true;
        request.recipient.transfer(request.value);
    }
}