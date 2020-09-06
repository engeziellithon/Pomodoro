import React from "react";
import FormattedTime from "../../components/FormattedTime";

import {
  ClockRingOne,
  ClockRingTwo,
  ClockRingThree,
  ClockTime,
} from "./styles";
import { View } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

interface ClockProps {
  time: number;
}

const Clock: React.FC<ClockProps> = ({ time }) => {
  let [fontsLoaded] = useFonts({
    "DS-Digital": require("../../assets/fonts/DS-Digital.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <ClockRingOne>
          <ClockRingTwo>
            <ClockRingThree>
              <ClockTime>
                <FormattedTime time={time} />
              </ClockTime>
            </ClockRingThree>
          </ClockRingTwo>
        </ClockRingOne>
      </View>
    );
  }
};

export default Clock;
