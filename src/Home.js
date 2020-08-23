import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Font from "expo-font";
import Filter from "./../components/FilterIcon";
import DailyCasesNotification from "./../components/DailyCases";
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      nearmebckgcolor: 'rgba(13, 28, 46, .5)',
      filterbckgcolor: 'transparent',
      progress: 20,
      DangerColor: '#DEB16E',
      progressBackgroundColor: '',
      Data: [
        {
            "id": "1",
            "Logo": "https://i.imgur.com/3q73JWQ.png",
            "Emri": "Matcha Coffee & Eatery",
            "S": "40",
            "Location": "104 Fazli Grajqevci, Prishtinë",
            "DangerScale": 70,
            "DangerColor": "#E87E7E",
            "Point": "21.1597268, 42.6646601"
        },
        {
            "id": "2",
            "Logo": "https://i.imgur.com/7YlOJwR.png",
            "Emri": "Meridian Express",
            "S": "120",
            "Location": "Rruga B",
            "DangerScale": 49,
            "DangerColor": "#DEB16E",
            "Point": "21.1640393, 42.648713"
        },
        {
            "id": "3",
            "Logo": "https://i.imgur.com/76msq7M.jpg",
            "Emri": "Prince Coffe Shop",
            "S": "110",
            "Location": "Sheshi Zahir Pajaziti",
            "DangerScale": 17,
            "DangerColor": "#3DE781",
            "Point": "21.1539253, 42.6599287"
        },
        {
            "id": "4",
            "Logo": "https://i.imgur.com/3q73JWQ.png",
            "Emri": "Casa",
            "S": "40",
            "Location": "104 Fazli Grajqevci, Prishtinë",
            "DangerScale": 70,
            "DangerColor": "#E87E7E",
            "Point": "21.1597268, 42.6646601"
        },
        {
            "id": "5",
            "Logo": "https://i.imgur.com/7YlOJwR.png",
            "Emri": "Albi Market",
            "S": "120",
            "Location": "Rruga B",
            "DangerScale": 49,
            "DangerColor": "#DEB16E",
            "Point": "21.1640393, 42.648713"
        },
        {
            "id": "6",
            "Logo": "https://i.imgur.com/76msq7M.jpg",
            "Emri": "Journal",
            "S": "110",
            "Location": "Sheshi Zahir Pajaziti",
            "DangerScale": 17,
            "DangerColor": "#3DE781",
            "Point": "21.1539253, 42.6599287"
        }
    ]
    };
  }

  

  async componentDidMount() {
    await Font.loadAsync({
      "Poppins-Italic": require("./../assets/fonts/Poppins-Italic.ttf"),
      "Poppins-Light": require("./../assets/fonts/Poppins-Light.ttf"),
      "Poppins-LightItalic": require("./../assets/fonts/Poppins-LightItalic.ttf"),
      "Poppins-Medium": require("./../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-MediumItalic": require("./../assets/fonts/Poppins-MediumItalic.ttf"),
      "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-SemiBold": require("./../assets/fonts/Poppins-SemiBold.ttf"),
      "Poppins-SemiBoldItalic": require("./../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    });

    this.setState({ fontLoaded: true });
  }

  renderItem = ({ item }) => {
    return ( 
      <TouchableOpacity style={styles.RetailViewClickableContainer} key={item.id}>
        <View style={styles.RetailsView} >
        <View style={styles.ImageShadow}>
          <Image 
            source={{ uri: item.Logo }} style={styles.Logos}
          />
        </View>
        <View style={styles.OtherRetailData}>
          <Text style={styles.RetailName}>{ item.Emri }</Text>
          <View style={styles.RetailLocation}>
              <SimpleLineIcons
                name="location-pin"
                color="#000"
                size={hp("3%")}
                style={{ backgroundColor: "transparent"}}
              />
              <Text style={styles.LocationItself}> {item.Location} </Text>
          </View>
                            
        </View>
        </View>
          <ProgressBarAnimated
            backgroundColor={this.state.DangerColor}
            borderRadius={5}
            borderColor={'#999'}
            borderWidth={0.5}
            width={wp("75%")}
            value={item.DangerScale}
            height={hp('1%')}
          />
        <View style={styles.dangerScaleText}>
            <Text style={styles.DangerText}> Rrezikshmëria e përhapjes në këto momente: { item.DangerScale }% </Text>
        </View>
      </TouchableOpacity>
    )
  }
  

  render() {

    const extractKey = ({ id }) => id
    const FilterPressed = () => {
        this.setState({
            nearmebckgcolor: 'transparent',
            filterbckgcolor: 'rgba(13, 28, 46, .5)'
        })
    }

    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
          <React.Fragment>
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
            <DailyCasesNotification />
            <View style={{ flex: 1 , position: 'absolute', top: hp("15%"), width: wp("100%"), justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Text style={styles.beforetext}> Para se me vendosë ku të shkosh, </Text>
              <Text style={styles.kqyrediltext}> K'qyr e Dil! </Text>
            </View>
            <View style={styles.actionsview}>
              <View style={styles.textinputsearch}>
              <AntDesign
                name="search1"
                color="#999"
                size={hp("2.5%")}
                style={{ backgroundColor: "transparent", marginRight: wp('1%')}}
              />
              <TextInput 
                style={{ fontFamily: 'Poppins-Regular', fontSize: 13 }}
                placeholder={"Kërko këtu..."}
                onChangeText={(text) => this.searchData(text)}
                value={this.state.text}
              />
              </View>
              
              <TouchableOpacity style={[styles.filterbutton, {backgroundColor: this.state.filterbckgcolor} ]} onPress={ FilterPressed }>
                <Filter />
              </TouchableOpacity>
            </View>
              <View style={styles.whiteback}>
                <FlatList 
                  showsVerticaslScrollIndicator={false}
                  data={this.state.Data} 
                  renderItem={this.renderItem}
                  keyExtractor={extractKey}
                  key={this.state.Data.id}
                ></FlatList>
              </View>
          </React.Fragment>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    )
  }
}


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  actionsview: {
    position: "absolute",
    top: hp("28.5%"),
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: "90%",
  },
  filterbutton: {
    padding: "0.8%",
    width: "20%",
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .4)', 
    shadowOffset: { height: 1, width: 1 }, 
    shadowOpacity: 1, 
    shadowRadius: 1, 
    borderColor: 'transparent'
  },
  beforetext: {
    fontSize: 17.5,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    justifyContent: 'center'
  },
  kqyrediltext: {
    fontSize: 30,
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    justifyContent: 'center'
  },
  whiteback: {
    position:'absolute',
    height: hp("65%"),
    top: "40%",
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    padding: hp("5%")
  },
  Logos: {
    height: hp("11.5%"),
    width: wp("20%"),
    padding: wp("5%"),
    borderRadius: 10,
  },
  RetailsView: {
    marginBottom: hp("1%"),
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    // borderWidth: 1, see the borders of the view component
    // borderColor: '#999' just for testing
  },
  RetailName: {
    color: "#000",
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14
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
  OtherRetailData: {
    display: 'flex',
    flexDirection: 'column'
  },
  RetailLocation: {
    marginTop: hp("1%"),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  LocationItself: {
      fontSize: 12.5,
      fontFamily: 'Poppins-Light'
  },
  RetailViewClickableContainer: {
    marginBottom: hp("7.5%"),
    width: wp("80%")
  },
  dangerScaleText: {
    justifyContent: 'center',
    width: wp("80%"),
    alignItems: 'center',
  },
  DangerText: {
    fontFamily: 'Poppins-Light',
    fontSize: 10,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    width: wp('80%')
  },
  textinputsearch: {
    width: wp("70%"),
    height: hp('6%'),
    backgroundColor: "rgba(255,255,255, .9)",
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0, .4)', 
    shadowOffset: { height: 1, width: 1 }, 
    shadowOpacity: 1, 
    shadowRadius: 1, 
    elevation: 2, 
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: wp('2%'),
    display: 'flex',
    flexDirection: 'row'
  }
});
