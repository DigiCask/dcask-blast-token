require("@nomicfoundation/hardhat-verify");
require("@openzeppelin/hardhat-upgrades");

const { ethers, upgrades } = require("hardhat");

async function main() {
    const DCASKV1 = await ethers.getContractFactory("DCASK");
    const mintAddress = "0x9B3A5Dd074EFDFF896cFDBA677639D56eb375C69";
    const token = await upgrades.deployProxy(DCASKV1, [mintAddress], {
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
