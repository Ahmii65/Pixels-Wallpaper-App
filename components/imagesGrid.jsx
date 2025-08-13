import { MasonryFlashList } from "@shopify/flash-list";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wpp } from "react-native-responsive-screen";
import { getColumnCount } from "../helpers/common";
import ImageCard from "./imageCard";

const ImagesGrid = ({ images }) => {
  const column = getColumnCount();
  return (
    <View style={styles.mainContainer}>
      <MasonryFlashList
        data={images}
        contentContainerStyle={styles.contentContainer}
        numColumns={column}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} column={column} />
        )}
        estimatedItemSize={200}
        initialNumToRender={1000}
      />
    </View>
  );
};

export default ImagesGrid;

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 3,
    width: wpp(100),
  },
  contentContainer: {
    paddingHorizontal: wpp(4),
  },
});
