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
const Web3 = require('web3');

class BuyButton extends Component {

    state = {
        bought: false
    }

    _onPress = () => {
        this.setState({ bought: true })
        const web3 = new Web3(
            new Web3.providers.HttpProvider('https://core.tomocoin.io')
        );
        web3.eth.getBlock('latest').then(console.log)
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