import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

class Intro extends React.Component {
    componentDidMount() {
        setTimeout(() => { this.props.navigation.navigate('Home')}, 3000); 
    };

    render() {
        return(
            <View style={styles.view}>
                <Image 
                    source = {require('./../assets/Logo.jpg')}
                    style={styles.image}
                />
            </View>
        )
    }
    // RENDER >> CONTENT
}


export default Intro;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#2b2f3a",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 275,
        width: 275,
        borderWidth: 0
    }
})
