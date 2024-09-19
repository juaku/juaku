// src/components/Post.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface PostProps {
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  description: string;
  location: string;
  timestamp: string;
}

const Post: React.FC<PostProps> = ({ user, image, description, location, timestamp }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.userInfo}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text>{user.name}</Text>
      </View>
      <Image source={{ uri: image }} style={styles.postImage} />
      <Text>{description}</Text>
      <Text>{location}</Text>
      <Text>{timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
});

export default Post;
