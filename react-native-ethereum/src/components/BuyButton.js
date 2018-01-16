import React, { Component } from 'react'
import {
    View,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import '../../global';
import PossessionContract from '../../build/contracts/Possession.json'
import Web3 from 'web3'

const contract = require('truffle-contract')
// const web3 = new Web3(
//     new Web3.providers.HttpProvider('https://core.tomocoin.io/')
// );
// var provider = new Web3.providers.HttpProvider('https://core.tomocoin.io/')
// var web3 = new Web3(provider)

class BuyButton extends Component {

    state = {
        bought: false
    }

    _onPress = async () => {

        this.setState({ bought: true })

        const carId = this.props.item.id

        const provider = await new Web3.providers.HttpProvider('https://core.tomocoin.io/')

        console.log('prod: ', provider)

        const web3 = await new Web3(provider)
        // console.log('web3: ', web3)

        const possession = contract(PossessionContract)
        possession.setProvider(web3.currentProvider)

        var possessionInstance

        console.log('provider: ', web3.currentProvider)

        console.log(possession)
        web3.eth.getCoinbase(async (error, coinbase) => {
            if (error) {
                console.error(error)
            }

            console.log('coin base: ', coinbase)

            possessionInstance = await possession.deployed()

            console.log('instance: ', possessionInstance)

            const result = await possessionInstance.buy(carId, { from: coinbase })
            console.log('result: ', result)
            this.setState({ bought: false })
        })
    }

    render() {

        const { bought } = this.state

        return (
            <TouchableOpacity
                activeOpacity={0.75}
                disabled={bought}
                onPress={this._onPress}
                style={[styles.button, {
                    backgroundColor: !bought ? '#ff0000' : '#00cc00',
                }]}
            >
                <Text
                    style={styles.text}
                >
                    {!bought ? 'Buy Now' : 'Bought'}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 120,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        fontSize: 16,
        color: '#FFF'
    }
})

export default BuyButton