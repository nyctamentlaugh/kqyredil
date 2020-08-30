import React, { Component } from "react";
import { Text, View } from "react-native";
import * as geolib from "geolib";

class FindNearest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [
        {
          id: "1",
          Point: "27.1597268, 40.6646601"
        },
        {
          id: "2",
          Point: "11.1640393, 49.648713"
        },
        {
          id: "3",
          Point: "26.1539253, 42.6599287"
        },
        {
          id: "4",
          Point: "21.1597268, 44.6646601"
        },
        {
          id: "5",
          Point: "10.1640393, 43.648713"
        },
        {
          id: "6",
          Point: "26.1539253, 61.6599287"
        }
      ]
    };
  }

  render() {
    let DistancesFromUserLocation = [];
    this.state.Data.forEach((item) => {
      DistancesFromUserLocation.push(
        geolib.getPreciseDistance(
          { latitude: 30.1891168, longitude: 11.6226982 },
          item.Point
        )
      );
    });

    // sort distances
    DistancesFromUserLocation = DistancesFromUserLocation.sort();

    // Wrap in <Text/> for demo
    let distances = [];
    distances.push(DistancesFromUserLocation.map(item => {
        return item
    }))

    console.log(distances)
  }
}

export default FindNearest;
