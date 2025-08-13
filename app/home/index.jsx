import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  heightPercentageToDP as hpp,
  widthPercentageToDP as wpp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { apicall } from "../../api";
import Categories from "../../components/categories";
import ImagesGrid from "../../components/imagesGrid";

var page = 1;

const index = () => {
  const { top, bottom } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);
  const searchInputRef = useRef(null);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    clearSearh();
    setImages([]);
    page = 1;
    let params = {
      page,
    };
    if (category) params.category = category;
    fetchImages(params, false);
  };
  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = async (params = { page: 1 }, append = false) => {
    const res = await apicall(params);
    if (res.success && res?.data?.hits) {
      if (append) {
        setImages([images, ...res.data.hits]);
      } else {
        setImages([...res.data.hits]);
      }
    }
  };
  const handleSearch = (text) => {
    setSearch(text);
    if (text.length > 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, q: text }, false);
    }
    if (text == "") {
      (page = 1),
        searchInputRef?.current.clear(),
        setImages([]),
        setActiveCategory(null);
      fetchImages({ page }, false);
    }
  };
  const clearSearh = () => {
    setSearch("");
    searchInputRef?.current.clear();
  };
  const handleDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <View
      style={[
        styles.contsainer,
        {
          paddingTop,
          paddingBottom: Platform.OS === "android" ? bottom : null,
        },
      ]}
    >
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color="rgba(10,10,10,0.7)"
          />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={{ gap: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather name="search" size={24} color={"rgba(10,10,10,0.4)"} />
          </View>
          <TextInput
            placeholder="Search for Photos..."
            onChangeText={handleDebounce}
            style={styles.input}
            ref={searchInputRef}
          />
          {search && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => handleSearch("")}
            >
              <Ionicons name="close" size={24} color={"rgba(10,10,10,0.5)"} />
            </Pressable>
          )}
        </View>
        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        {images.length > 0 && <ImagesGrid images={images} />}
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  contsainer: {
    flex: 1,
    gap: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wpp(4),
    alignItems: "center",
  },
  title: {
    fontSize: hpp(4),
    color: "rgba(10,10,10,0.9)",
    fontWeight: "600",
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wpp(4),
    borderWidth: 1,
    borderColor: "#e5e5e5",
    padding: 6,
    borderRadius: 16,
    backgroundColor: "white",
  },
  searchIcon: {
    padding: 8,
  },
  input: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    fontSize: hpp(1.8),
  },
  closeIcon: {
    backgroundColor: "rgba(10,10,10,0.1 )",
    padding: 8,
    borderRadius: 10,
  },
});
