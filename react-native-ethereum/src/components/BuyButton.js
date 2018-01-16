import React, { Component } from 'react'
import {
    View,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
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
            loading: false
        }
    }

    componentWillMount() {
        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })
                console.log('web3: ', this.state.web3)
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }
    
    _onPress = async () => {

        if (this.state.loading) {
            return
        }

        this.setState({loading: true})

        const web3 = this.state.web3

        // this.setState({ bought: true })

        const carId = this.props.item.id

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

            possessionInstance.buy(carId, { from: coinbase }).then((result) => {
                console.log('result: ', result)

            }).catch((error) => {
                console.log('error: ', error)

            })
            this.setState({ bought: true })
            this.setState({loading: false})
        })
    }

    render() {

        const { bought, loading } = this.state

        return (
            <TouchableOpacity
                activeOpacity={0.75}
                disabled={bought}
                onPress={this._onPress}
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
                        {!bought ? 'Buy Now' : 'Bought'}
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