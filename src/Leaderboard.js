import React from 'react';
import { View, Share, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen"
import { LinearGradient } from "expo-linear-gradient"

const config = require('./../config')

import firebase from 'firebase'
const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId
};

import AnimationHeader from './../components/AnimationHeader'
import files from './../assets/FileBase64'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default class Leaderboard extends React.Component {
    constructor() {
        super();
        this.state = {
            Retails: [],
            TopThreeRetails: [],
            numberOf: 1,
            color: ['#FF9E00', '#1AC54A', '#71A8EF'],
            Winner: "hell"
        }
    }

    getTopThree = () => {
        let Alpha = this.state.Retails;
        Alpha.sort((a, b) => {
            return (a.Score < b.Score ? 1 : -1) 
        })
        this.setState({
            TopThreeRetails: Alpha.slice(0, 3)
        }) 
    }

    componentDidMount() {
        var ToPush = []
        firebase.database().ref().on('value', (snapshot) => {
            ToPush = [];
            this.setState({
                Data: [],
            })
            snapshot.forEach((child) => {
                ToPush.push({
                id: child.val().id,
                Emri: child.val().Emri,
                DangerColor: child.val().DangerColor,
                DangerScale: child.val().DangerScale,
                Location: child.val().Location,
                Logo: child.val().Logo,
                Point: child.val().Point,
                S: child.val().S,
                Score: child.val().Score
                })
            })
            this.setState({
                Retails: ToPush,
            })
            let Alpha = ToPush;
            Alpha.sort((a, b) => {
                return (a.Score < b.Score ? 1 : -1) 
            })
            let TopThreeFin = Alpha.slice(0, 3)
            
            this.setState({
                TopThreeRetails: TopThreeFin,
                Winner: TopThreeFin[0]
            }) 
            console.log(TopThreeFin[0].DangerScale)
            
        })
        
    }

    Share = async () => {
      try {
        const result = await Share.share({
          message: "Fituesi i K'qyr e Dil për këtë javë: " + this.state.Winner.Emri + ". " + this.state.Winner.Emri + " ka mirëmbajtur shkallën më të ulët të rrezikshmërisë gjatë kësaj jave. Ky postim u shpërnda direkt nga aplikacioni K'qyr e Dil! " ,
          title: "Fituesi i K'qyr e Dil për këtë javë: " + this.state.Winner.Emri + ". " + this.state.Winner.Emri + " ka mirëmbajtur shkallën më të ulët të rrezikshmërisë gjatë kësaj jave. Ky postim u shpërnda direkt nga aplikacioni K'qyr e Dil! " ,
          url: files.image1
        });
        
      } catch (error) {
        alert("Rezultati i mësipërm nuk u shpërnda. Provoni përsëri!")
      }
    }

    renderItem = ({ item, index }) => {
      return ( 
          <TouchableOpacity style={{
            display: 'flex',
            width: wp("80%"),
            height: hp("8%"),
            padding: wp("2%"),
            backgroundColor: this.state.color[index],
            borderRadius: 10,
            marginTop: wp("6%"),
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: 'rgba(0,0,0, .4)', 
            shadowOffset: { height: 1, width: 1 }, 
            shadowOpacity: 1, 
            shadowRadius: 1, 
            elevation: 2, 
          }} key={item.id}>
          <View style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
          }}>
              <Text style={{
                display: 'flex',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 22.5,
                width: wp("7.5%"),
                justifyContent: 'center',
                alignSelf: 'center',
                color: "#fff",
                textAlign: 'center',
                textAlignVertical: 'center'
              }}>{index + 1}</Text>
          <View style={styles.RetailsView} >
            <Image 
              source={{ uri: item.Logo }} style={styles.Logos}
            />
          <View style={styles.OtherRetailData}>
            <Text style={styles.RetailName}>{ item.Emri }</Text>
            
          </View>
          </View>
          <Text style={styles.RetailScore}>{ item.Score }</Text>
          </View>
          
        </TouchableOpacity>
      ) 
      }

    render() {
        const extractKey = ({ id }) => id
        return( 
            <View style={styles.container}>
              <LinearGradient
              colors={[
                "#145f4c",
                "rgba(26, 135, 107, 0.5365)",
                "rgba(61, 231, 188, 0)",
              ]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: hp("100%"),
              }}
            />
            <FontAwesome5
              name="award"
              color="#ff9e00"
              size={hp("5%")}
              style={{ backgroundColor: "transparent", position: 'relative', top: hp("20%")}}
            />
            <TouchableOpacity style={styles.ShareBtn} onPress={this.Share}>
            <AntDesign
              name="sharealt"
              color="#fff"
              size={hp("4%")}
              style={{ backgroundColor: "transparent"}}
            />
            </TouchableOpacity>
            <Text style={{
              fontSize: 30,
              fontFamily: 'Poppins-SemiBold',
              textAlign: 'center',
              textAlignVertical: 'center',
              color: '#fff',
              position: 'relative',
              top: hp("20%")
            }}>TOP BIZNESET E JAVËS</Text>
            <Text style={{
              fontSize: 25,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
              textAlignVertical: 'center',
              color: '#fff',
              position: 'relative',
              top: hp("20%")
            }}>Fituesi: </Text>
            <View style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 4,
                height: 4,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              zIndex: 9999
            }}>
              <View style={{
                height: 25,
                width: 25,
                backgroundColor: '#ff9e00',
                position: 'absolute',
                top: hp("20%"),
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 100,
                zIndex: 99999,
                alignContent: 'center',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}><Text style={{
                color: '#000',
                fontFamily: "Poppins-SemiBold",
                fontSize: 17.5,
                textAlign: 'center'
              }}>1</Text></View>
            <Image 
              source={{ uri: this.state.Winner.Logo}} style={styles.WinnerLogo}
            />
            </View>          
                <View style={styles.whiteback}>
                <AnimationHeader customStyles={styles.SVGAnimation} />
                  <FlatList 
                    data={this.state.TopThreeRetails} 
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                    key={this.state.TopThreeRetails.id}
                    scrollEnabled={false}
                  ></FlatList>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      whiteback: {
        position:'relative',
        height: hp("75%"),
        top: hp("24%"),
        backgroundColor: "#fff",
        width: "100%",
        padding: hp("5%"),
        paddingTop: 0,
        alignContent: 'center'
      },
      Logos: {
        height: 40,
        width: 40,
        padding: wp("2.5%"),
        borderRadius: 100,
        marginRight: wp("2%")
      },
      RetailsView: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      RetailName: {
        color: "#fff",
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        alignSelf: 'flex-start'
      },
      RetailScore: {
        color: "#fff",
        fontFamily: 'Poppins-SemiBold',
        fontSize: 17.5,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
      },
      ImageShadow: {
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0, .4)', 
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1, 
        shadowRadius: 1, 
        elevation: 2, 
        height: hp("11.5%"),
        width: wp("20%"),
        marginRight: wp("2.5%")
      },
      SVGAnimation: {
        position: 'absolute',
        width: wp("100%"),
        margin: 0,
        padding: 0,
      },
      OtherRetailData: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
      },
      WinnerLogo: {
        height: 150,
        width: 150,
        borderRadius: 100,
        top: hp("21.5%"),
        zIndex: 9999,
        position: 'relative',
      },
      ShareBtn: {
        position: 'absolute', 
        top: hp("6%"), 
        alignSelf: 'flex-end', 
        right: wp("7.5%")
      }
})