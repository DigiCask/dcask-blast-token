const { ethers, upgrades } = require("hardhat");
const { assert } = require("chai");

describe("DCASK", function () {
    it("deploys", async function () {
        const DCASKV1 = await ethers.getContractFactory("DCASK");
        const signers = await ethers.getSigners();
        const signerAddr = signers[0];
        const token = await upgrades.deployProxy(DCASKV1, [signerAddr.address], {
            kind: "uups",
        });

        await token.waitForDeployment();

        const proxy = await token.getAddress();
        const impl = await upgrades.erc1967.getImplementationAddress(proxy);

        console.log("DCASK proxy deployed to: ", proxy);
        console.log("DCASK implementation deployed to: ", impl);

        const DCASKV2 = await ethers.getContractFactory("DCASKV2");
        const tokenv2 = await upgrades.upgradeProxy(proxy, DCASKV2);

        console.log("DCASKV2 implementation deployed to: ", await tokenv2.getAddress());

        const v = await tokenv2.version();

        assert.equal(v, "v2");

        console.log("DCASKV2 version: ", v);
    });
});

// DCASK proxy deployed to:  0xC68828f7D800566639372E5ea50A81bA5344351f
// DCASK implementation deployed to:  0x40617f5df5d4942525210131563166f7A9b0e59c
// DCASKV2 implementation deployed to:  0xC68828f7D800566639372E5ea50A81bA5344351f
// npx hardhat verify 0xC68828f7D800566639372E5ea50A81bA5344351f --network blast-testnet
