import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        // data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="m-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-medium text-small text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-sm text-gray-100">
                  Paranietharan
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                source={images.logoSmall}
                className="w-9 h-10"
                resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular">Latest Videos</Text>

              <Trending posts={[{ id: 1}, { id: 2}] ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;