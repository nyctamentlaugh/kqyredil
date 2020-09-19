import React from 'react';
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen"

export default function AnimationHeader({ customStyles }) {
    return (
        <View style={customStyles}>
            <View style={{ backgroundColor: '#fff', height: 150, width: wp("110%") }}>
                <Svg
                    height="60%"
                    width={wp("100%")}
                    viewBox="0 0 1425 150"
                    style={{ position: 'absolute', bottom: 150}}
                >
                    <Path fill="#fff" fill-opacity="1" d="M0,96L120,80C240,64,480,32,720,37.3C960,43,1200,85,1320,106.7L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z" />
                </Svg>
            </View>
        </View>    
    )
}