import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

const SettingsPage = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

        return ( 
            <View style={styles.container}>
                <Text style={styles.title}> Cilësimet </Text>
                <View style={styles.DarkorLight}>
                    <Text style={styles.casualText}> Dark Mode </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#145f4c" }}
                        thumbColor={isEnabled ? "#2b2f3a" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    title: {
        marginTop: hp("10%"),
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30
    },
    DarkorLight: {
        margin: hp("2.5%"),
        width: wp("100%"),
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: wp("5%"),
        paddingRight: wp("7.5%"),
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    casualText: {
        fontFamily: "Poppins-Regular",
        fontSize: 20
    }
})

export default SettingsPage