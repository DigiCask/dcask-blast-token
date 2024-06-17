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

// npx hardhat verify --network mainnet PROXY_ADDRESS
