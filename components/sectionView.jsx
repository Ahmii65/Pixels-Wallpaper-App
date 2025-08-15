import { capitalize } from "lodash";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hpp } from "react-native-responsive-screen";

const SectionView = ({ title, content }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

export const CommonFilterModal = ({
  data,
  filterName,
  filters,
  setFilters,
}) => {
  const onSelect = (item) => {
    setFilters({ ...filters, [filterName]: item });
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filters && filters[filterName] == item;
          const backgroundColor = isActive ? "rgba(10,10,10,0.7)" : "white";
          const color = isActive ? "white" : "rgba(10,10,10,0.7)";
          return (
            <Pressable
              key={index}
              onPress={() => onSelect(item)}
              style={[styles.outlineButtons, { backgroundColor }]}
            >
              <Text style={[ { color }]}>
                {capitalize(item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};


export default SectionView;

const styles = StyleSheet.create({
  titleContainer: {
    gap: 14,
  },
  title: {
    fontSize: hpp(2.4),
    fontWeight: "400",
  },
  outlineButtons: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
    paddingHorizontal: 14,
    borderColor: "#e5e5e5",
    borderCurve: "continuous",
  },
  flexRowWrap: {
    gap: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },

});
