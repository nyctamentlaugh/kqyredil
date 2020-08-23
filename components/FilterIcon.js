import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Filter = () => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Ionicons
                name="md-color-filter"
                color="#fff"
                size={hp("4%")}
                style={{ backgroundColor: 'transparent'}}
            /> 

            <Text style={styles.normaltext}> Filtro </Text>

        </View>
    )
};

export default Filter;

const styles = StyleSheet.create({
    normaltext: {
        fontSize: 11,
        color: '#fff',
        fontFamily: 'Poppins-Regular'
    }
  });
  