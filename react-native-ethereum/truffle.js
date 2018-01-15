var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    core: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://core.tomocoin.io")
      },
      network_id: 1,
      gas: 500000
    }
  }
};
