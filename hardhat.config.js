require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.24",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        "blast-testnet": {
            url: "https://sepolia.blast.io",
            accounts: [process.env.PRIVATE_KEY],
        },
        "blast-mainnet": {
            url: "https://rpc.blast.io",
            accounts: [process.env.PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: process.env.BLAST_API_KEY,
        customChains: [
            {
                network: "blast-testnet",
                chainId: 168587773,
                urls: {
                    apiURL: "https://api-sepolia.blastscan.io/api",
                    browserURL: "https://sepolia.blastexplorer.io/",
                },
            },
            {
                network: "blast-mainnet",
                chainId: 81457,
                urls: {
                    apiURL: "https://api.blastscan.io/api",
                    browserURL: "https://blastscan.io/",
                },
            },
        ],
        enabled: true,
    },
};
