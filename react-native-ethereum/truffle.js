var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    kovan: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://kovan.infura.io/")
      },
      network_id: '*'
    },
    core: {
      // get 20 ETH to test here
      // http://faucet.visc.network/
      // ref: https://medium.com/vischub/s%E1%BB%AD-d%E1%BB%A5ng-metamask-k%E1%BA%BFt-n%E1%BB%91i-v%E1%BB%9Bi-vietnam-ethereum-testnet-77512c6d7387
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://core.tomocoin.io/")
      },
      network_id: '*',
      gas: 1000000
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/")
      },
      network_id: '*',
      gas: 500000
    },
  }
};
