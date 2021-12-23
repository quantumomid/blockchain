# Smart Contract Intro (with new Updates)

- Use solidity and node.js to create a small contract, compile it with the solidity compiler and deploy to an Etherium network.

## Updates:

Inbox.sol:

- New `constructor` keyword 
- New `memory` keyword to specify the data location of the variables 
- Removing the `public` keyword from the constructor
- SPDX identifier at the top of the contract to address compilation warnings


compile.js:
- Adding expected JSON formatted input, specifying the language, sources, and outputSelection
- Updating the export to provide the expected JSON formatted output

Inbox.test.js:
- Updating the import to destructure the abi (formerly the interface) and the evm (bytecode)
- Change code accordingly with above bullet point (compare with Inbox.test.js from SmartContract if need be)

deploy.js: Same as Inbox.test.js above!