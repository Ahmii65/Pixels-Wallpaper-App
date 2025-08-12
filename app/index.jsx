import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  heightPercentageToDP as hpp,
  widthPercentageToDP as wpp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../helpers/common";

const index = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor={"transparent"}
      />
      <Image
        source={require("../assets/images/welcome.png")}
        resizeMode="cover"
        style={styles.bgimage}
      />
      {/* Linear Gradient */}
      <Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
          style={styles.gradeint}
        />
        <View style={styles.contentContainer}>
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={styles.title}
          >
            Pixels
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).springify()}
            style={styles.punchLine}
          >
            Every Pixel Tells a Story
          </Animated.Text>
        </View>
        <Animated.View
          entering={FadeInDown.delay(600).springify()}
          style={styles.buttonContainer}
        >
          <Pressable
            style={styles.pressable}
            onPress={() => router.push("/homescreen")}
          >
            <Text style={styles.pressableText}>Start Exploring</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgimage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  gradeint: {
    width: wpp(100),
    height: hpp(65),
    position: "absolute",
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 13,
  },
  title: {
    fontSize: hpp(7),
    fontWeight: "800",
    color: " rgba(10, 10, 10, 0.8)",
  },
  punchLine: {
    fontSize: hpp(2),
    letterSpacing: 1,
    marginBottom: 20,
    fontWeight: "500",
  },
  buttonContainer: {
    alignItems: "center",
  },
  pressable: {
    backgroundColor: "rgba(10,10,10,0.7 )",
    padding: 15,
    marginBottom: 30,
    borderRadius: 15,
    width: "90%",
    borderCurve: "continuous",
  },
  pressableText: {
    color: "white",
    fontSize: hpp(3),
    letterSpacing: 1,
    fontWeight: "500",
    textAlign: "center",
  },
});
