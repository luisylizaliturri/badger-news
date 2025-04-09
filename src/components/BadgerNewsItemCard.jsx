import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

function BadgerNewsItemCard({ article, onPress }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const imageUrl =
      article && article.img
        ? `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/${article.img}`
        : null;
    setImageURL(imageUrl);
  }, [article]);

  const handleArticlePress = () => {
    if (article && article.fullArticleId) {
      onPress(article.fullArticleId);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  if (!article) return null;

  return (
    <Pressable onPress={handleArticlePress}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {imageURL ? (
            <>
              <Image
                source={{ uri: imageURL }}
                style={styles.image}
                resizeMode="cover"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>No image available</Text>
            </View>
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {article.title || "Untitled Article"}
          </Text>
          <View style={styles.tagsContainer}>
            {article.tags && article.tags.length > 0 ? (
              article.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))
            ) : (
              <View style={styles.tag}>
                <Text style={styles.tagText}>No tags</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: "relative",
    height: 200,
  },
  image: {
    width: "100%",
    height: 200,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  tag: {
    backgroundColor: "lightblue",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: "white",
  },
});

export default BadgerNewsItemCard;
