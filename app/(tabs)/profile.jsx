import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user?.$id));

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLogged(false);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="p-6 space-y-6">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-2xl font-semibold">
            {user?.username || 'User'}
          </Text>
          <TouchableOpacity onPress={logout}>
            <Image 
              source={icons.logout}
              className="w-6 h-6"
              style={{ tintColor: '#FFF' }}
            />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View className="w-24 h-24 rounded-lg border-2 border-secondary flex items-center justify-center">
          <Image
            source={{ uri: user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}` }}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode="cover"
          />
        </View>

        {/* User Info */}
        <InfoBox
          title={user?.username || 'User'}
          containerStyles="mt-5"
          titleStyles="text-lg text-white"
        />

        <InfoBox
          title={user?.email || 'email'}
          containerStyles="mt-3"
          titleStyles="text-lg text-gray-300"
        />

        <InfoBox
          title={user?.accountId || 'account id'}
          containerStyles="mt-3"
          titleStyles="text-lg text-gray-300"
        />

        {/* Stats */}
        <View className="mt-5 flex-row">
          <InfoBox            
            title={posts?.length || 0}
            subtitle="Posts"
            titleStyles="text-xl text-white"
            containerStyles="mr-10"
          />
          <InfoBox
            title={user?.followers || 0}
            subtitle="Followers"
            titleStyles="text-xl text-white"
          />
        </View>
      </View>

      {/* Posts List */}
      {posts && posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item?.$id}
          renderItem={({ item }) => (
            <VideoCard
              title={item?.title || 'Untitled'}
              thumbnail={item?.thumbnail}
              video={item?.video}
              creator={item?.users?.username || 'Anonymous'}
              avatar={item?.users?.avatar || `https://ui-avatars.com/api/?name=${item?.users?.username}`}
            />
          )}
          className="px-6"
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <EmptyState
          title="No Videos Found"
          subtitle="You haven't uploaded any videos yet"
          containerStyles="mt-6 px-6"
          titleStyles="text-xl text-gray-300"
          subtitleStyles="text-gray-400"
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;