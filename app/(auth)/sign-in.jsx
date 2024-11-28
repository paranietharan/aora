import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { router, Link } from 'expo-router';
import { signIn, getCurrentUser } from '../../lib/appwrite'

import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {

  const { setIsLogged, setUser } = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // const submit = async () => {
  //   console.log("submitting", form);

  //   if (form.email === "" || form.password === "") {
  //     Alert.alert("Error", "Please fill in all fields");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     console.log("trying to sign in");
  //     await signIn(form.email, form.password);
  //     setUser(result);
  //     setIsLogged(true);

  //     Alert.alert("Success", "User signed in successfully");
  //     router.replace("/home");
  //   } catch (error) {
  //     Alert.alert("Error", error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("trying to sign in");
      const session = await signIn(form.email, form.password);

      if (session) {
        // Get user data after successful session creation
        const userData = await getCurrentUser();

        if (userData) {
          setUser(userData);
          setIsLogged(true);
          Alert.alert("Success", "User signed in successfully", [
            {
              text: "OK",
              onPress: () => router.replace("/home")
            }
          ]);
        } else {
          throw new Error("Failed to get user data");
        }
      }
    } catch (error) {
      console.error("Sign in error:", error);
      Alert.alert("Error", error.message || "Failed to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ justifyContent: 'center' }} className="w-full px-4 my-6">
        <View className="min-h-[85vh] flex justify-center">

          <Image source={images.logo} className="w-24 h-24" resizeMode='contain' />
          <Text className="text-2xl text-white text-psemibold mt-10 font-psemibold">Log into aora</Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            containerStyles="mt-7"
            handlePress={() => submit()}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-white text-sm">Don't have an account?</Text>
            <Link href="/sign-up" className="text-secondary text-sm font-pbold">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;