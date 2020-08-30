import React, {useState} from 'react';
import {Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Filter from "./../components/FilterIcon";
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

function FilteringAlg() {
  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    return (
        <React.Fragment>
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
        <View style={{flex: 1}}>
        <Filter />
        <TouchableOpacity style={[styles.filterbutton, {backgroundColor: this.state.filterbckgcolor} ]} onPress={ toggleModal }>
              
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={{flex: 1}}>
            <Text>Hello!</Text>

            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </Modal>
        </View>
        </React.Fragment>
        
      
    );
  }

export default FilteringAlg;

const styles = StyleSheet.create({
    normaltext: {
        fontSize: 11,
        color: '#fff',
        fontFamily: 'Poppins-Regular'
    }
})