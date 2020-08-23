import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { SimpleLineIcons } from '@expo/vector-icons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Datas from "./../data.json";


const Retails = () => {
  const barWidth = Dimensions.get('screen').width - 30;
  const progressCustomStyles = {
    backgroundColor: 'red', 
    borderRadius: 0,
    borderColor: 'orange',
  };
    return (
        <ScrollView style={styles.whiteback}>
              {Datas.map((item, i) => {
                  return (
                    <TouchableOpacity key={i}>
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
                        <ProgressBarAnimated
                            width={barWidth}
                            value={this.state.progress}
                            backgroundColorOnComplete="#6CC644"
                        />
                        </View>
                    </TouchableOpacity>
                  )
              })}
        </ScrollView>
    )
}

export default Retails;

const styles = StyleSheet.create({
  whiteback: {
    flex: 1,
    height: hp("50%"),
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
    marginBottom: hp("7.5%"),
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
  }
})