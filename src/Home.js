import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Picker,
  Linking,
  PlatformColor
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Font from "expo-font";
import Filter from "../components/FilterIcon";
import { SimpleLineIcons, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Modal from 'react-native-modal';
const config = require('./../config')


import firebase from 'firebase';
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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// console.disableYellowBox = true;

export default class Home extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      currentLongitude: 'unknown',
      currentLatitude: 'unknown',
      fontLoaded: false,
      NothingWasFound: 'none',
      nearmebckgcolor: 'rgba(13, 28, 46, .5)',
      filterbckgcolor: 'transparent',
      progress: 20,
      progressBackgroundColor: '',
      status: null,
      selectedValueofOptionsFiltroSipas: 'Filtrimi sipas rendit alfabetik iu mundëson të shihni bizneset në renditje nga A - Zh.',
      isModalVisible: false,
      selectionToExplain: 'Filtrimi sipas rendit alfabetik iu mundëson të shihni bizneset në renditje nga A - Zh.',
      loading: false,
      error: null,
      dataquery: [],
      Data: [] 
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
    console.log()
    this.setState({
      fontLoaded: true
    })
    var li = []
    firebase.database().ref().on('value', (snapshot) => {
      li = [];
      this.setState({
        dataquery: [],
        Data: []
      })
      snapshot.forEach((child) => {
        li.push({
          id: child.val().id,
          Emri: child.val().Emri,
          DangerColor: child.val().DangerColor,
          DangerScale: child.val().DangerScale,
          Location: child.val().Location,
          Logo: child.val().Logo,
          Point: child.val().Point,
          S: child.val().S,
          WeeklyScore: child.val().WeeklyScore,
          DailyScore: child.val().DailyScore,
          Obstructed: child.val().Obstructed
        })
      })
      this.setState({
        dataquery: li,
        Data: li,
      })
    })
  }
    

  renderItem = ({ item }) => {
    return ( 
      <React.Fragment>
      <TouchableOpacity style={styles.RetailViewClickableContainer} key={item.id} onPress={ ()=> { console.log("hwhhwh") }}>

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
        <TouchableOpacity style={styles.TakeMeThere} onPress={ () => Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=' + item.Emri + ', ' + item.Location) } >
          <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <MaterialCommunityIcons
                name="directions-fork"
                color="#2b2f3a"
                size={hp("3%")}
                style={{ backgroundColor: "transparent"}}
          />
          <Text style={styles.TakeMeThereText}> Më dërgo </Text>
          </View>
        </TouchableOpacity>
        
        </View>
        
          <ProgressBarAnimated
            backgroundColor={item.DangerColor}
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
        <Text style={styles.ObstructedBooleanText}> {item.Obstructed ? "Të dhënat për biznesin lartë, për momentin nuk janë të sakta për shkak të problemeve teknike fizike në vend!" : ""}</Text>
        
      </TouchableOpacity>
      <Modal>
        
      </Modal>
      </React.Fragment>
    )
  }

  searchFilterFunction = text => {
    const newData = this.state.Data.filter(item => {
      const itemData = `${item.Emri.toUpperCase()}`
    
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
      
    });
    this.setState({
      dataquery: newData
    })

    if (this.state.dataquery.length == 0) {
      this.setState({
        NothingWasFound: 'flex'
      })
    } else {
      this.setState({
        NothingWasFound: 'none'
      })
    }
  }
  
  FilterPressed = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  render() {
    const extractKey = ({ id }) => id
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
            {/* <View style={{ flex: 1 , position: 'absolute', top: hp("6%"), width: wp("100%"), justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Text style={styles.beforetext}> Para se me vendosë ku të shkosh, </Text>
              <Text style={styles.kqyrediltext}> K'qyr e Dil! </Text>
            </View> */}
            <View style={styles.actionsview}>
              <View style={styles.textinputsearch}>
              <AntDesign
                name="search1"
                color="#999"
                size={hp("2.5%")}
                style={{ backgroundColor: "transparent", marginRight: wp('1%')}}
              />
              <TextInput 
                style={{ fontFamily: 'Poppins-Regular', fontSize: 13, width: wp('60%'), height: hp('10%') }}
                placeholder={"Kërko këtu..."}
                onChangeText={text => this.searchFilterFunction(text)}
                value={this.state.text}
                clearButtonMode="always"
              />
              </View>
              
              <TouchableOpacity style={[styles.filterbutton, {backgroundColor: this.state.filterbckgcolor} ]} onPress={ this.FilterPressed }>
                <Filter />

                <Modal 
                isVisible={this.state.isModalVisible}
                animationIn={"slideInUp"}
                animationOut={"slideOutDown"}
                >
                  <View style={styles.modalView}>
                    <View style={styles.ModalHeader} >
                    
                      <Text style={styles.ModalTitleText}> Mjetet e filtrimit </Text>
                      <TouchableOpacity style={styles.closeBtn} onPress={() => {this.setState({isModalVisible: false})}}>
                        <AntDesign
                          name="close"
                          color="#333"
                          size={hp("2%")}
                          style={{ backgroundColor: "transparent", marginRight: wp('1%')}}
                        />
                        <Text style={styles.ModalCloseText}> Mbyll </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.ModalContent}>
                    <Text style={styles.ExplainText}>{this.state.selectionToExplain} </Text>  
                      <Text style={styles.FilteringText}> Filtro sipas: </Text>
                      <Picker
                        selectedValue={this.state.selectedValueofOptionsFiltroSipas}
                        style={{ padding: 0, margin: 0, position: 'relative', height: hp("5%"), width: wp("70%"), fontFamily: 'Poppins-Regular' }}
                        onValueChange={(itemValue, itemIndex) => this.setState({
                          selectedValueofOptionsFiltroSipas: itemValue,
                          selectionToExplain: itemValue
                        })
                      }
                      >
                      <Picker.Item label="Rendit alfabetik" value="Filtrimi sipas rendit alfabetik iu mundëson të shihni bizneset në renditje nga A - Zh." />
                      <Picker.Item label="Turmës" value="Filtroni sipas turmës (shkallës së rrezikshmërisë në kohë reale) në mënyrë që të shmangni ato." />
                      </Picker>
                      
                      <TouchableOpacity style={styles.FiltroTaniBtn} onPress={() => {
                        
                        if (this.state.selectedValueofOptionsFiltroSipas == 'Filtrimi sipas rendit alfabetik iu mundëson të shihni bizneset në renditje nga A - Zh.') {
                          console.warn(this.state.dataquery);
                          let Alpha = this.state.dataquery;
                          Alpha.sort((a, b) => {
                            return (a.Emri > b.Emri ? 1 : -1)
                          }) 
                        } else if (this.state.selectedValueofOptionsFiltroSipas == 'Filtroni sipas turmës (shkallës së rrezikshmërisë në kohë reale) në mënyrë që të shmangni ato.') {
                          let Dang = this.state.dataquery;
                          Dang.sort((a, b) => {
                            return (a.DangerScale > b.DangerScale ? 1 : -1)
                          })
                        }
                        this.setState({isModalVisible: false})
                      }}>
                      <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular', fontSize: wp("3%")}}> Filtro </Text>  
                      <AntDesign
                        name="rightcircleo"
                        color="#fff"
                        size={hp("2.5%")}
                        style={{ backgroundColor: 'transparent'}}
                      /> 
                      </TouchableOpacity>
      
                    </View>
                  </View>
                </Modal>

              </TouchableOpacity>
            </View>
              <View style={styles.whiteback}>
                <View style={{flex: 1, display: this.state.NothingWasFound, justifyContent: 'center', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="emoticon-sad-outline"
                    color="#2b2f3a"
                    size={hp("10%")}
                    style={{ backgroundColor: "transparent", marginBottom: wp('5s%')}}
                  />
                  <Text style={styles.nothingtext}>Asgjë nuk u gjet nga kërkimi juaj!</Text>
                  <Text style={styles.nothingtext}>Provoni ndryshe!</Text>
                </View>
                <FlatList 
                  data={this.state.dataquery} 
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  actionsview: {
    position: "absolute",
    top: hp("7.5%"),
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
    height: hp("80%"),
    top: hp("17.5%"),
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: hp("5%")
  },
  Logos: {
    height: hp("11.5%"),
    width: wp("20%"),
    padding: wp("5%"),
    borderRadius: 10,
    resizeMode: 'contain'
  },
  RetailsView: {
    marginBottom: hp("1%"),
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
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
    paddingLeft: wp('2%'),
    display: 'flex',
    flexDirection: 'row'
  },
  modalView: {
    flex: 1,
    position: 'absolute',
    height: hp("80%"),
    top: "7.5%",
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 5,
    padding: hp("5%")
  },
  ModalCloseText: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp("3%"),
    color: '#333'
  },
  closeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  ModalHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: hp("10%")
  },
  ModalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalTitleText: {
    color: '#222',
    fontSize: wp("4.5%"),
    fontFamily: 'Poppins-Medium'
  },
  FilteringText: {
    color: "#222",
    fontFamily: 'Poppins-Regular',
    fontSize: wp("4%")
  },
  FiltroTaniBtn: {
    height: hp("5%"),
    width: wp("75%"),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: wp("4%"),
    paddingRight: wp("4%"),
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0, .4)', 
    shadowOffset: { height: 1, width: 1 }, 
    shadowOpacity: 1, 
    shadowRadius: 1, 
    elevation: 2, 
    backgroundColor: '#145f4c',
    position: 'absolute',
    top: hp("50%")
  },
  ExplainText: { 
    color: '#222',
    fontFamily: 'Poppins-Medium',
    fontSize: wp("2.5%"),
    top: hp("45%"),
    position: 'absolute',
    justifyContent: 'flex-start',
    display: 'flex',
    alignContent: 'flex-start',
    width: wp("75%")
  },
  TakeMeThere: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp('80%')
  },
  TakeMeThereText: {
    fontFamily: 'Poppins-Light',
    fontSize: 11
  },
  nothingtext: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2b2f3a',
    marginTop: hp("1%")
  },
  ObstructedBooleanText: {
    fontFamily: 'Poppins-MediumItalic',
    padding: 10,
    fontSize: 9,
    color: '#C02F1D',
    justifyContent: 'center',
    textAlign: 'center'
  }
});