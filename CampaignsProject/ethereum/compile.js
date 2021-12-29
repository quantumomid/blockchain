const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
// Remove/delete build folder if already exists
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
// Read source code from the file
const source = fs.readFileSync(campaignPath, "utf8");
// Compile using the solidity compiler and pull out the contracts property
const output = solc.compile(source, 1).contracts;

// (re-)Create the build folder if build folder doesnt exist already
fs.ensureDirSync(buildPath);

// console.log(output);

// Write compiled contract code into build folder
for (let contract in output){
    // Write a JSON file in build folder
    fs.outputJsonSync(path.resolve(buildPath, contract.replace(":", "") +".json"), output[contract]);
}
