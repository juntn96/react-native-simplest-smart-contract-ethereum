import React, { Component } from 'react'
import {
    View,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Clipboard
} from 'react-native'

import '../../global';
import PossessionContract from '../../build/contracts/Possession.json'
// import Web3 from 'web3'
import getWeb3 from '../utils/getWeb3'

const contract = require('truffle-contract')

class BuyButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bought: false,
            web3: null,
            loading: false,
            tx: null
        }
    }

    componentWillMount() {
        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    _onBuyPress = () => {
        this.setState({ loading: true })

        const web3 = this.state.web3
        const carId = this.props.item.id

        const possession = contract(PossessionContract)
        possession.setProvider(web3.currentProvider)
  
        web3.eth.getCoinbase( async (error, coinbase) => {
            if (error) {
                console.error(error)
            }

            console.log('coin base: ', coinbase)

            const possessionInstance = await possession.deployed()
            possessionInstance.buy(carId, { from: coinbase })
                .then((result) => {
                    console.log('result: ', result)
                    this._showAlert(result.tx)
                    this.setState({
                        bought: true,
                        loading: false,
                        tx: result.tx
                    })
                }).catch((error) => {
                    console.log('error: ', error)
                    this.setState({ loading: false })
                })
        })
    }

    _onShowTxPress = () => {
        const tx = this.state.tx
        this._showAlert(tx)
    }

    _showAlert = (tx) => {
        Alert.alert(
            'Success',
            'Tx Hash: ' + tx,
            [
                { text: 'Ok', style: 'cancel' },
                { text: 'Copy', onPress: () => { Clipboard.setString(tx) } }
            ]
        )
    }

    render() {

        const { bought, loading } = this.state

        return (
            <TouchableOpacity
                activeOpacity={0.75}
                disabled={loading}
                onPress={!bought ? this._onBuyPress : this._onShowTxPress}
                style={[styles.button, {
                    backgroundColor: !bought ? '#ff0000' : '#00cc00',
                }]}
            >
                {loading ?
                    <ActivityIndicator
                        color={'#FFF'}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    /> :
                    <Text
                        style={styles.text}
                    >
                        {!bought ? 'Buy Now' : 'Show Tx Hash'}
                    </Text>}
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