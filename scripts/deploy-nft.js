const hre = require("hardhat");

const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
// WhiteList address also constructor Value
const contractAddress = "0x56e06DD47711D8433D7160E28E6ad771a0fc7e2d";

const main = async () => {
    // Deployment of the contract with Address set as the contructor
    const CryptDevs = await hre.ethers.deployContract("CryptoDevs", [contractAddress]);

    await CryptDevs.waitForDeployment();

    console.log("The address of contracts is: ", CryptDevs.target);

    await sleep(30 * 1000); // Make it sleep for 30 seconds while indexes through contract

    // Verifies the contract on etherScan
    await hre.run("verify:verify", {
        address: CryptDevs.target,
        constructorArguments: [contractAddress],
      });

}

const runMain = async () => {
    try{
    await main();
    process.exit(0)
    } catch (error){
        console.log(error);
        process.exit(1)
    }
}


runMain()