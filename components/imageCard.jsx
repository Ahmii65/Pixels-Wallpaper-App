import { Image } from "expo-image";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wpp } from "react-native-responsive-screen";
import { getImageSize } from "../helpers/common";

const ImageCard = ({ item, index, column }) => {
  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };
  const isLastInRow = () => {
    return (index + 1) % column === 0;
  };
  return (
    <Pressable style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
      <Image
        style={[styles.images, getImageHeight()]}
        source={item?.webformatURL}
        transition={100}
      />
    </Pressable>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  images: {
    height: 300,
    width: "100%",
  },
  imageWrapper: {
    borderRadius: 18,
    backgroundColor: "#e5e5e5",
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wpp(2),
  },
  spacing: {
    marginRight: wpp(2),
  },
});
