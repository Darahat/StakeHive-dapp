require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */
const { PRIVATE_KEY, SEPOLIA_RPC_URL } = process.env;

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    localhost: {
      url: "http://127.0.0.1:8545", // Fixed typo (replaced . with :)
    }
  },
  paths: { // Moved outside of networks
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  }
};