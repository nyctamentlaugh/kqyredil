import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DailyCasesNotification = () => {
    return (
        <View style={styles.dailycasescontainer}>
              <View style={styles.dailycasesicon}>
              <AntDesign
                  name="warning"
                  color="#fff"
                  size={hp("4%")}
                  style={{ backgroundColor: "transparent", borderColor: '#fff', borderWidth: 0.5, margin: wp("0.5%"), padding: wp("1%")}}
              />
              </View>
              <View style={styles.dailycasesblockdisplay}>
                  <Text style={styles.subtitle}> TË DHËNAT DITORE</Text>
                  <Text style={styles.casestext}> 150 të shëruar & 175 raste me COVID-19 </Text>
              </View>
        </View>
    )
};

export default DailyCasesNotification;

const styles = StyleSheet.create({
    dailycasescontainer: {
        position: 'absolute',
        top: 0,
        paddingTop: hp('4%'),
        paddingBottom: hp("2%"),
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: wp('100%'),
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.09)'
      },
      dailycasesblockdisplay: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      },
      subtitle: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        fontSize: 12
      },
      casestext: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        fontSize: 15
      }
  });
  