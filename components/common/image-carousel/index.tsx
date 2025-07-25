import { Image } from "expo-image";
import { memo, useCallback, useMemo, useState } from "react";
import { FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";

import theme from "@/constants/theme";

import { generateImageKey, getOptimalImageDimensions, isValidImageUri } from "@/lib/helpers/image";

export interface ImageCarouselProps {
  images: string[];
  aspectRatio?: number;
  margin?: number;
}

interface ImageItemProps {
  uri: string;
  width: number;
  aspectRatio: number;
  index: number;
}

function ImageItem({ uri, width, aspectRatio, index }: ImageItemProps) {
  if (!isValidImageUri(uri)) {
    return null;
  }

  return (
    <Image
      source={{ uri }}
      style={[styles.image, { width, aspectRatio }]}
      resizeMode="cover"
      cachePolicy="memory-disk"
      priority="high"
      placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
    />
  );
}

const ImageItemMemo = memo(ImageItem);

function ImageCarouselComponent({ images, aspectRatio = 1, margin = 56 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const dimensions = useMemo(() => getOptimalImageDimensions(aspectRatio, margin), [aspectRatio, margin]);

  const filteredImages = useMemo(() => images.filter(isValidImageUri), [images]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(scrollX / dimensions.width);
      setCurrentIndex(newIndex);
    },
    [dimensions.width],
  );

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item, index }) => <ImageItemMemo uri={item} width={dimensions.width} aspectRatio={aspectRatio} index={index} />,
    [dimensions.width, aspectRatio],
  );

  const keyExtractor = useCallback((item: string, index: number) => generateImageKey(item, index), []);

  const getItemLayout = useCallback(
    (data: ArrayLike<string> | null | undefined, index: number) => ({
      length: dimensions.width,
      offset: dimensions.width * index,
      index,
    }),
    [dimensions.width],
  );

  if (filteredImages.length === 0) {
    return null;
  }

  if (filteredImages.length === 1) {
    // Single image, no carousel needed
    return <ImageItemMemo uri={filteredImages[0]} width={dimensions.width} aspectRatio={aspectRatio} index={0} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        data={filteredImages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
        updateCellsBatchingPeriod={50}
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {filteredImages.map((_, index) => (
          <View key={index} style={[styles.dot, index === currentIndex ? styles.activeDot : styles.inactiveDot]} />
        ))}
      </View>
    </View>
  );
}

export default memo(ImageCarouselComponent);

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  scrollView: {
    borderRadius: 8,
  },
  scrollContent: {
    alignItems: "center",
  },
  image: {
    borderRadius: 8,
    marginRight: 0,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
  },
  inactiveDot: {
    backgroundColor: theme.colors.neutral200,
  },
});
