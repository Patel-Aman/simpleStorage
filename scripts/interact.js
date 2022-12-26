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

async function interact() {
    console.log("obtaining current favourite number...");
    let favNumber = await StorageFactory.favouriteNumber();

    console.log("current favorite number is:", favNumber.toString());

    console.log("updating Favorite number...");
    const tx = await StorageFactory.store(85);
    await tx.wait();

    favNumber = await StorageFactory.favouriteNumber();

    console.log("Favourite number is updated to:", favNumber.toString());

    console.log("---------------------");

    console.log("getting your details...");

    let details = await StorageFactory.seeDetails();
    console.log(
        `you are ${details.name} and your favourite number is ${details.FavNum}`
    );
}

interact()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
