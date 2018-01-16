import Web3 from 'web3'

let getWeb3 = new Promise(function (resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    var provider = new Web3.providers.HttpProvider('https://core.tomocoin.io/')
    web3 = new Web3(provider)
    results = {
        web3: web3
    }
    resolve(results)
})

export default getWeb3
