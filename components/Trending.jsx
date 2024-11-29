import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Trending = ({posts}) => {
  return (
    <FlatList
    data={posts}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({item}) => (
      <View>
        <Text>{item.id}</Text>
      </View>
    )}
    horizontal
    />
  )
}

export default Trending