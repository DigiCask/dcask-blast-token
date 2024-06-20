require("@nomicfoundation/hardhat-verify");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

const { ethers, upgrades } = require("hardhat");

async function main() {
    const DCASKV1 = await ethers.getContractFactory("DCASK");
    const token = await upgrades.deployProxy(DCASKV1, [process.env.MINT_ADDRESS], {
        kind: "uups",
    });

    await token.waitForDeployment();

    const proxy = await token.getAddress();
    const impl = await upgrades.erc1967.getImplementationAddress(proxy);

    console.log("DCASK proxy deployed to: ", proxy);
    console.log("DCASK implementation deployed to: ", impl);
}

main();

// DCASK proxy deployed to:  0x9306FC95b8becdC9166112Fd6cF86B39e2335f09
// DCASK implementation deployed to:  0x97a4cb7DeE1F20Eb3d537248747052a7D863019e
// npx hardhat run scripts/deploy-dcask-mainnet.js --network blast-mainnet 
// npx hardhat verify --network blast-mainnet PROXY_ADDRESS
