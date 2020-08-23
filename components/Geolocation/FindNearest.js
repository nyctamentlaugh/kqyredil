import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class FindNearest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 42.666389,
                longtitude: 21.19689,
                latitudeDelta: 0.9,
                longtitudeDelta: 0.5,
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Map Screen </Text>
            </View>
        )
    }
}

export default FindNearest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})