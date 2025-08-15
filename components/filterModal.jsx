import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { capitalize, startCase } from "lodash";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  heightPercentageToDP as hpp,
  widthPercentageToDP as wpp,
} from "react-native-responsive-screen";
import { CommonFilterModal } from "../components/sectionView";
import { data } from "../constants/data";
import SectionView from "./sectionView";

const FilterModal = ({
  filterModalRef,
  filters,
  setFilters,
  onClose,
  onApply,
  onReset,
}) => {
  const snapPoints = useMemo(() => ["90%"], []);
  return (
    <BottomSheetModal
      ref={filterModalRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={customBackDrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName];
            let sectionData = data.filters[sectionName];
            let title = capitalize(sectionName);
            title = startCase(title);
            return (
              <View key={index}>
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filters,
                    setFilters,
                    filterName: sectionName,
                  })}
                />
              </View>
            );
          })}
          {/* Buttons */}

          <View style={styles.ButtonsContainer}>
            <Pressable style={styles.Reset} onPress={onReset}>
              <Text style={styles.resetText}>Reset</Text>
            </Pressable>
            <Pressable style={styles.Apply} onPress={onApply}>
              <Text style={styles.applyText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const sections = {
  order: (props) => <CommonFilterModal {...props} />,
  orientation: (props) => <CommonFilterModal {...props} />,
  image_type: (props) => <CommonFilterModal {...props} />,
  colors: (props) => <CommonFilterModal {...props} />,
};

const customBackDrop = ({ animatedIndex, style }) => {
  const animatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });
  const containerStyle = [
    StyleSheet.absoluteFill,
    animatedStyle,
    style,
    styles.overlay,
  ];
  return (
    <Animated.View style={containerStyle}>
      <BlurView tint="dark" intensity={30} style={StyleSheet.absoluteFill} />
    </Animated.View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5 )",
  },
  content: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 15,
  },
  filterText: {
    fontSize: hpp(4),
    fontWeight: "600",
    marginBottom: 5,
    color: "rgba(10,10,10,0.8)",
  },
  ButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: hpp(2),
    paddingHorizontal: wpp(2),
    alignItems: "center",
    gap: 10,
  },
  Reset: {
    flex: 1,
    borderWidth: 1,
    padding: 13,
    backgroundColor: "rgba(10,10,10,0.1)",
    width: "50%",
    alignItems: "center",
    borderRadius: 12,
    borderColor: "#e5e5e5e1",
    borderCurve: "continuous",
    justifyContent: "center",
  },
  resetText: {
    fontSize: hpp(2),
  },
  Apply: {
    flex: 1,
    borderWidth: 1,
    padding: 13,
    borderColor: "#e5e5e5",
    width: "50%",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "rgba(10,10,10,0.6)",
    borderCurve: "continuous",
    justifyContent: "center",
  },
  applyText: {
    fontSize: hpp(2),
    color: "white",
  },
});
