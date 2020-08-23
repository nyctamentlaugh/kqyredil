import React from 'react';
import images from './assets';

class Data extends React.Component {
    render() {
        const datas = [
            {
                "Logo": "matchalogo.png",
                "Emri": "Matcha",
                "S": "40"
            },
            {
                "Logo": "meridianlogo.png",
                "Emri": "Meridian",
                "S": "120"
            }
        ]
        return (
            <Text> Test</Text>
            // datas.map((item) => (
            //     <View>
            //       <Image 
            //         source={require(images[item.Logo])}
            //       />
            //       <Text>{item.Emri}</Text>
            //       <Text>{item.S}</Text>
            //     </View>
            //   ))
        
        )
    }
}
    
export default Data;
