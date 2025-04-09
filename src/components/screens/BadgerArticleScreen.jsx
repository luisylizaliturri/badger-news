import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Animated,
  Linking,
  Pressable,
  Image,
} from "react-native";
import CS571 from "@cs571/mobile-client";

function BadgerArticleScreen({ route }) {
  const { fullArticleId, previewData } = route.params;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (previewData && previewData.img) {
      const previewImageUrl = `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/${previewData.img}`;
      setImageURL(previewImageUrl);
    }
  }, [previewData]);

  useEffect(() => {
    fadeAnim.setValue(0);

    setLoading(true);
    setError(null);

    fetch(
      `https://cs571api.cs.wisc.edu/rest/s25/hw8/article?id=${fullArticleId}`,
      {
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API responded with status ${res.status}`);
        }
        return res.json();
      })
      .then((article) => {
        if (!article) {
          throw new Error("No data received from API");
        }
        const imageUrl = article.img
          ? `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/${article.img}`
          : null;
        setArticle(article);
        setLoading(false);
        setImageURL(imageUrl);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      })
      .catch((err) => {
        console.error("error fetching article:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [fullArticleId, fadeAnim]);

  const openArticleURL = () => {
    if (article && article.url) {
      Linking.openURL(article.url);
    }
  };

  const displayTitle = article
    ? article.title
    : previewData
    ? previewData.title
    : null;
  const displayAuthor = article
    ? article.author
    : previewData
    ? previewData.author
    : null;
  const displayPosted = article
    ? article.posted
    : previewData
    ? previewData.posted
    : null;

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load article: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {imageURL && (
        <Image
          source={{ uri: imageURL }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {displayTitle && <Text style={styles.title}>{displayTitle}</Text>}

      {displayAuthor && displayPosted && (
        <Text style={styles.metadata}>
          By {displayAuthor} | {displayPosted}
        </Text>
      )}

      {article && article.url && (
        <Pressable onPress={openArticleURL}>
          <Text style={styles.linkText}>Read full article here.</Text>
        </Pressable>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading article content...</Text>
        </View>
      ) : (
        <Animated.View
          style={[
            styles.articleContent,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {article && Array.isArray(article.body) ? (
            article.body.map((paragraph, i) => (
              <Text key={i} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))
          ) : (
            <Text style={styles.paragraph}>No content available</Text>
          )}
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  articleContainer: {
    marginBottom: 20,
  },
  articleContent: {
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  metadata: {
    fontSize: 14,
    color: "gray",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  linkText: {
    color: "blue",
    fontSize: 16,
  },
});

export default BadgerArticleScreen;
