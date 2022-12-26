const { assert } = require("chai");
const { ethers } = require("hardhat");

// describe("name", () => {})
describe("SimpleStorage", () => {
  let simpleStorage, storageFactory;
  beforeEach(async () => {
    storageFactory = await ethers.getContractFactory("StorageFactory");
    simpleStorage = await storageFactory.deploy();
  })

  it("Should start with a favourite number of 0", async () => {
    const currentValue = await simpleStorage.favouriteNumber();
    const expectedValue = "0"

    assert.equal(currentValue.toString(), expectedValue);
  })

  it("Should update when we call store", async () => {
    const expectedValue = "89";
    const tx = await simpleStorage.store(expectedValue);
    await tx.wait();

    const currentValue = await simpleStorage.favouriteNumber();
    assert.equal(currentValue.toString(), expectedValue);
  })

  it("Should add people when we call addPeople", async () => {
    const expectedName = "Rahul";
    const expectedNumber = "92";

    const tx = await simpleStorage.addPeople(expectedNumber, expectedName);
    await tx.wait();

    const currentPeople = await simpleStorage.seeDetails();
    assert.equal(currentPeople.name, expectedName);
    assert.equal(currentPeople.FavNum, expectedNumber);
  })
})