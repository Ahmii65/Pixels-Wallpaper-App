import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import {
  heightPercentageToDP as hpp,
  widthPercentageToDP as wpp,
} from "react-native-responsive-screen";
import { data } from "../constants/data";
const Categories = ({ activeCategory, handleChangeCategory }) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatListContainer}
      data={data.categories}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => {
        const isActive = activeCategory === item;
        return (
          <Animated.View
            entering={FadeInRight.delay(index * 200)
              .duration(1000)
              .springify()
              .damping(14)}
          >
            <Pressable
              onPress={() => handleChangeCategory(isActive ? null : item)}
              style={[
                styles.container,
                { backgroundColor: isActive ? "rgba(10,10,10,0.8)" : "white" },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  { color: isActive ? "white" : "rgba(10,10,10,0.8)" },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          </Animated.View>
        );
      }}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  flatListContainer: {
    gap: 8,
    paddingHorizontal: wpp(4),
  },
  container: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 16,
  },
  text: {
    fontWeight: "500",
    fontSize: hpp(1.8),
  },
});
