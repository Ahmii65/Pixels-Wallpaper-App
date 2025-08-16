import { MasonryFlashList } from "@shopify/flash-list";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wpp } from "react-native-responsive-screen";
import { getColumnCount } from "../helpers/common";
import ImageCard from "./imageCard";

const ImagesGrid = ({ images, scrollRef, handleOnScroll, loading }) => {
  const column = getColumnCount();
  return (
    <View style={styles.mainContainer}>
      <MasonryFlashList
        data={images}
        scrollEventThrottle={5}
        onScroll={handleOnScroll}
        ref={scrollRef}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        numColumns={column}
        ListFooterComponent={
          <ActivityIndicator size="large" style={{ marginBottom: 10 }} />
        }
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
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: wpp(4),
  },
});
