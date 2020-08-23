import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Favorite = () => {
    return (
        <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons
        name="md-heart"
        color="#fff"
        size={hp("5%")}
        style={{ backgroundColor: "transparent" }}
      />
  
      <Text style={styles.normaltext}> Të preferuarat </Text>
    </View>
    )
};

export default Favorite;

const styles = StyleSheet.create({
    normaltext: {
        fontSize: 11,
        color: '#fff',
        fontFamily: 'Poppins-Regular'
    }
  });
  