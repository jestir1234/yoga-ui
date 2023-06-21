import React from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-web-linear-gradient';

function Home() {
  return (
    <LinearGradient colors={['#c27089', '#8a5873', '#4d3f5f']} style={styles.linearGradient}>
      <Text>HOME</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    width: '100vw',
    minHeight: '90vh',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
});

export default Home;
