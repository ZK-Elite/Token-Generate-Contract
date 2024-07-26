require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      gasPrice: 300000000,
      chainId: 11155111,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      gasPrice: 100000000,
      chainId: 5,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/be7c518afb7844039a2ae1af79fd898e',
      gasPrice: 300000000,
      chainId: 1,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: "3AD4CAKVJSNGS1KGWKUDXAM9JJ4HFVUUN2",
  },
  sourcify: {
    enabled: true
  }
};
