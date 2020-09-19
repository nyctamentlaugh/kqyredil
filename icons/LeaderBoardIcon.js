import React from 'react';
import { View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function LeaderboardIcon() {
        return (
            <View>
                <AntDesign
                    name="Trophy"
                    size={25}
                />
            </View>   
        )
}