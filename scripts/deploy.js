const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
    const contractFactory = await ethers.getContractFactory("StorageFactory");

    const deployedContract = await contractFactory.deploy();

    console.log("contract successfully deployed at:", deployedContract.address);

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for block confirmations...");
        await deployedContract.deployTransaction.wait(2);

        await verify(deployedContract.address, []);
    }
}

const verify = async (contractAddress, args) => {
    console.log("verifying contract...");

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Contract Already verified");
        } else {
            console.error(error);
        }
    }
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
