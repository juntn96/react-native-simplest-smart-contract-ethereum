import Web3 from 'web3'

const getWeb3 = new Promise(function (resolve, reject) {
    // replace with your testnet
    const httpProvider = 'https://core.tomocoin.io/'
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    const provider = new Web3.providers.HttpProvider(httpProvider)
    web3 = new Web3(provider)
    results = {
        web3: web3
    }
    resolve(results)
})

export default getWeb3
