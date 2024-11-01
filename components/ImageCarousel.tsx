import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { useRef, useState } from "react";
import { CAROUSEL_IMAGE_HEIGHT } from "@/constants/variable";

const width = Dimensions.get("window").width;

const data = [
  { id: "1", title: "Slide 1" },
  { id: "2", title: "Slide 2" },
  { id: "3", title: "Slide 3" },
];

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const carouselRef = useRef(null);
  const scrollOffsetValue = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSnapToItem = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={images}
        vertical={false}
        loop={true}
        width={width}
        // width={430}
        height={CAROUSEL_IMAGE_HEIGHT}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={2000}
        autoPlay={true}
        defaultScrollOffsetValue={scrollOffsetValue}
        style={{ width: "100%" }}
        // onScrollBegin={() => {
        //   console.log("Scroll start");
        // }}
        // onScrollEnd={() => {
        //   console.log("Scroll end");
        // }}
        onSnapToItem={handleSnapToItem}
        renderItem={({ item }) => <Image style={styles.slide} source={{ uri: item }} />}
      />
      <View style={styles.imageCounter}>
        <Text style={styles.totalImage}>
          {currentIndex + 1} of {images.length} photos
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    height: CAROUSEL_IMAGE_HEIGHT,
    // width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageCounter: {
    position: "absolute",
    top: 10,
    left: 6,
  },
  totalImage: {
    color: "white",
    padding: 4,
    fontSize: 14,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default ImageCarousel;
