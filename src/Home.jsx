import React from 'react';
import { View, Text, FlatList } from 'react-native';
import pokemon from './pokemonStore';

function Home() {
  return (
    <View>
      <FlatList
        keyExtractor={(p) => p.number}
        data={pokemon}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
export default Home;
