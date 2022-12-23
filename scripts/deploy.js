const { ethers } = require("hardhat");

async function main() {
    const contractFactory = await ethers.getContractFactory("StorageFactory");

    const deployedContract = await contractFactory.deploy();
    console.log("waiting for 2 block conformation");

    await deployedContract.deployTransaction.wait(2);

    console.log("contract successfully deployed at:", deployedContract.address);
}

main()
.then( () => process.exit(0))
.catch( error => {
  console.error(error);
  process.exit(1);
})