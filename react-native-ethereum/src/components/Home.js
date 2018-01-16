import React, { Component } from 'react'
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import { cars } from '../api/cars'

import ListItem from './ListItem'

class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // const contract = require('truffle-contract')
        // const possession = contract(cars)
        // console.log('pos: ', possession)
    }

    _keyExtractor = item => item.id

    _renderItem = ({ item }) => {
        return (
            <ListItem
                item={item} />
        )
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <FlatList
                    data={cars}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Home