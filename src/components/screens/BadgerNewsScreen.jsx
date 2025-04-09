import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import BadgerNewsItemCard from "../BadgerNewsItemCard";
import { usePreferences } from "../context/PreferencesContext";
import CS571 from "@cs571/mobile-client";

function BadgerNewsScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { preferences, updateAllTags } = usePreferences();

  useEffect(() => {
    fetch("https://cs571api.cs.wisc.edu/rest/s25/hw8/articles", {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data);

          const allTags = new Set();
          data.forEach((article) => {
            if (article && Array.isArray(article.tags)) {
              article.tags.forEach((tag) => allTags.add(tag));
            }
          });

          updateAllTags([...allTags]);
        } else {
          console.error("api did not return array:", data);
          setArticles([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("error fetching articles:", err);
        setLoading(false);
        setArticles([]);
      });
  }, [updateAllTags]);

  const filteredArticles = articles.filter((article) => {
    if (
      !article ||
      !Array.isArray(article.tags) ||
      Object.keys(preferences).length === 0
      ){
      return true;
    }

    return article.tags.some((tag) => preferences[tag]);
  });

  const handleArticlePress = (fullArticleId, article) => {
    navigation.navigate("Article", { 
      fullArticleId,
      previewData: {
        title: article.title,
        img: article.img,
        author: article.author,
        posted: article.posted
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noArticlesText}>
          No articles match your preferences. Try updating your preferences.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BadgerNewsItemCard 
            article={item} 
            onPress={(fullArticleId) => handleArticlePress(fullArticleId, item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  noArticlesText: {
    fontSize: 18,
    textAlign: "center",
    color: "gray",
  },
});

export default BadgerNewsScreen;
