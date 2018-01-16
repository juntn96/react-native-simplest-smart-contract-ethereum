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
