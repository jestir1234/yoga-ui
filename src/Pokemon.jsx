import React from 'react';
import { View, Text, Image } from 'react-native';
import pokemon from './pokemonStore';

function Pokemon() {
  const examplePokemon = pokemon[0];
  console.log('rendering');
  return (
    <View>
      <View>
        <View>
          <Text>{`#${examplePokemon.number}`}</Text>
        </View>
        <View>
          <Text>{`Name: ${examplePokemon.name}`}</Text>
        </View>
        <View>
          <Text>{`Type: ${examplePokemon.type}`}</Text>
        </View>
        <View>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: examplePokemon.photoUrl }}
          />
        </View>
      </View>
    </View>
  );
}
export default Pokemon;
