import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-web-linear-gradient';
import { getWorkshops } from '@app/services/api';

function Explore() {
  const [workshops, setWorkshops] = useState();
  const fetchWorkshops = async () => {
    const resp = await getWorkshops();
    console.log('resp', resp)
  }

  useEffect(() => {
    fetchWorkshops();
  }, []);
  return (
    <LinearGradient colors={['#c27089', '#8a5873', '#4d3f5f']} style={styles.linearGradient}>
      <Text>EXPLORE</Text>
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

export default Explore;
