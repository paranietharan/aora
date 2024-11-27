import React from 'react';
import { View, Text } from 'react-native';
import { Slot } from 'expo-router';

const TabsLayout = () => {
  return (
    <View className="flex-1">
      <Text className="text-3xl font-pblack">Tabs Layout</Text>
      <Slot />
    </View>
  );
};

export default TabsLayout;