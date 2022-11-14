require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-truffle5");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  //defaultNetwork: "ganache",
  defaultNetwork: "isolated_server",
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
    },
    ganache: {
      url: "http://localhost:7545",
      chainId: 1337,
      web3ClientVersion: "Ganache/v7.4.1/EthereumJS TestRPC/v7.4.1/ethereum-js",
      protocolVersion: 0x3f,
      accounts: [
        "c95690aed4461afd835b17492ff889af72267a8bdf7d781e305576cd8f7eb182",
        "05751249685e856287c2b2b9346e70a70e1d750bc69a35cef740f409ad0264ad",
        "f1ee4681e482b71c738e9b7bbd289965fd92c1a4b94aec37cc2f8e3f7854f490",
        "41feb031ae70d06e1c9cc7f44dcd9435723d8fc9be8dc812653db14979214425",
        "1c0599ea9b194aac2e4b771ff13d3c710e008446d2a2cd9b5e0b39861d04e1cf",
        "b768c6d1badbf3defc65c9e92b443d769fc982237138c43844816df882315bd3",
      ],
      zilliqaNetwork: false,
      miningState: true
    },
    devnet: {
      url: "https://evmdev-l2api.dev.z7a.xyz",
      accounts: [
        "d96e9eb5b782a80ea153c937fa83e5948485fbfc8b7e7c069d7b914dbc350aba",
        "db11cfa086b92497c8ed5a4cc6edb3a5bfe3a640c43ffb9fc6aa0873c56f2ee3",
        "410b0e0a86625a10c554f8248a77c7198917bd9135c15bb28922684826bb9f14",
        "589417286a3213dceb37f8f89bd164c3505a4cec9200c61f7c6db13a30a71b45"
      ],
      chainId: 33101,
      zilliqaNetwork: true,
      web3ClientVersion: "Zilliqa/v8.2",
      protocolVersion: 0x41,
      miningState: false
    },
    isolated_server: {
      url: "http://localhost:5555/",
      accounts: [
        "db11cfa086b92497c8ed5a4cc6edb3a5bfe3a640c43ffb9fc6aa0873c56f2ee3",
        "e53d1c3edaffc7a7bab5418eb836cf75819a82872b4a1a0f1c7fcf5c3e020b89",
        "d96e9eb5b782a80ea153c937fa83e5948485fbfc8b7e7c069d7b914dbc350aba",
        "e7f59a4beb997a02a13e0d5e025b39a6f0adc64d37bb1e6a849a4863b4680411",
        "589417286a3213dceb37f8f89bd164c3505a4cec9200c61f7c6db13a30a71b45",
        "5430365143ce0154b682301d0ab731897221906a7054bbf5bd83c7663a6cbc40",
        "1080d2cca18ace8225354ac021f9977404cee46f1d12e9981af8c36322eac1a4",
        "254d9924fc1dcdca44ce92d80255c6a0bb690f867abde80e626fbfef4d357004",
        "410b0e0a86625a10c554f8248a77c7198917bd9135c15bb28922684826bb9f14",
      ],
      chainId: 0x8001,
      web3ClientVersion: "Zilliqa/v8.2",
      protocolVersion: 0x41,
      zilliqaNetwork: true,
      miningState: false
    }
  },
  mocha: {
    timeout: 70000
  }
};

task("test")
  .addFlag("debug", "Print debugging logs")
  .setAction(async (taskArgs, hre, runSuper) => {
    hre.debugMode = taskArgs.debug ?? false;
    hre.logDebug = hre.debugMode ? console.log.bind(console) : function () {};
    return runSuper();
  });
