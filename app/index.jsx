import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="font-3xl font-pblack">Aora!</Text>
      <StatusBar style="auto" />
    </View>
  );
}