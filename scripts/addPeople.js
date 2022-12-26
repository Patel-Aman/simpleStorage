require("dotenv").config();
const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/StorageFactory.sol/StorageFactory.json");

// provider
const provider = new ethers.providers.AlchemyProvider(
    (network = "goerli"),
    process.env.API_KEY
);

// signer
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// contract
const StorageFactory = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    contract.abi,
    signer
);

const addPeople = async (name, favNum) => {
    console.log("adding your details...");
    const tx = await StorageFactory.addPeople(favNum, name);

    await tx.wait();

    console.log("Updated successfully.")

    console.log("---------------------");

    console.log("getting your details...");

    let details = await StorageFactory.seeDetails();
    console.log(
        `you are ${details.name} and your favourite number is ${details.FavNum.toString()}`
    );
};

addPeople("Aman", 920)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
