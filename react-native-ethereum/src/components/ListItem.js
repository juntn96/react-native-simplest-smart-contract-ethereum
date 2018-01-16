import React, { Component } from 'react'
import {
    View,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import BuyButton from './BuyButton'

class ListItem extends Component {
    
    render() {
        const { item } = this.props
        return (
            <View
                style={styles.container}
            >
                <Text> Car: {item.name} </Text>
                <Text> Type: {item.type} </Text>
                <Image
                    style={styles.image}
                    source={item.picture}
                />
                <BuyButton
                    item={item}
                 />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        borderBottomWidth: 0.5,
        borderBottomColor: '#996666',
        marginBottom: 5
    },
    image: {
        flex: 1,
        width: Dimensions.get('window').width,
        marginBottom: 2
    }
})

export default ListItem