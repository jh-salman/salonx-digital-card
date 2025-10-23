import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useTheme } from "@/context/ThemeContext";
import Header from "@/components/card-screen/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateCard() {
  const { theme } = useTheme();
  const [cardColor, setCardColor] = useState("#ffffff");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addLogo, setAddLogo] = useState(false);
  const [whereMet, setWhereMet] = useState(false);

  const colorOptions = [
    "#FF5A5F",
    "#FCA311",
    "#FFB300",
    "#4CAF50",
    "#2196F3",
    "#7C3AED",
  ];

  return (
    <>
    <SafeAreaView 
     edges={["top", "left", "right"]} 
    className="flex-1 bg-lightTheme-background dark:bg-darkTheme-background">
    
     <Header />
    <ScrollView
      className="flex-1 bg-lightTheme-background dark:bg-darkTheme-background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: hp("10%") }}
    >
      {/* Header */}
      {/* <View
        style={{ paddingVertical: hp("2%"), paddingHorizontal: wp("5%") }}
        className="flex-row justify-between items-center"
      >
        <Text className="text-primary text-base">Cancel</Text>
        <Text
          style={{ fontSize: wp(5) }}
          className="font-semibold text-lightTheme-text dark:text-darkTheme-text"
        >
          Blinq ✏️
        </Text>
        <Text className="text-primary text-base font-semibold">Save</Text>
      </View> */}
      

      {/* Card Color */}
      <Text
        style={{ fontSize: wp(4) }}
        className="px-5 font-semibold text-lightTheme-text dark:text-darkTheme-text mt-2"
      >
        Card color
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: wp("4%"), marginVertical: hp("2%") }}
      >
        {colorOptions.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCardColor(c)}
            style={{
              backgroundColor: c,
              width: wp("10%"),
              height: wp("10%"),
              borderRadius: 50,
              borderWidth: cardColor === c ? 3 : 1,
              borderColor: cardColor === c ? "#7C3AED" : "#ccc",
              marginHorizontal: wp("2%"),
            }}
          />
        ))}
      </ScrollView>

      {/* Images & Layout */}
      <View className="px-5">
        <Text
          style={{ fontSize: wp(4) }}
          className="font-semibold text-lightTheme-text dark:text-darkTheme-text mb-3"
        >
          Images & layout
        </Text>

        <View className="flex-row justify-between mb-3">
          <TouchableOpacity className="flex-1 h-[100] border border-gray-300 dark:border-gray-700 rounded-xl justify-center items-center mr-2">
            <Text className="text-gray-500 dark:text-gray-300">+ Profile picture</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 h-[100] border border-gray-300 dark:border-gray-700 rounded-xl justify-center items-center ml-2">
            <Text className="text-gray-500 dark:text-gray-300">+ Company logo</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="border border-gray-400 dark:border-gray-600 rounded-xl py-3">
          <Text className="text-center text-lightTheme-text dark:text-darkTheme-text font-semibold">
            Change image layout
          </Text>
        </TouchableOpacity>
      </View>

      {/* Personal Details */}
      <View className="px-5 mt-6">
        <Text
          style={{ fontSize: wp(4) }}
          className="font-semibold text-lightTheme-text dark:text-darkTheme-text mb-3"
        >
          Personal details
        </Text>

        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name"
          placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
          className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 mb-3 text-lightTheme-text dark:text-darkTheme-text"
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
          placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
          className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 mb-3 text-lightTheme-text dark:text-darkTheme-text"
        />
      </View>

      {/* Social Links Grid */}
      <View className="px-5 mt-6">
        <Text
          style={{ fontSize: wp(4) }}
          className="font-semibold text-lightTheme-text dark:text-darkTheme-text mb-3"
        >
          Social Links
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {["Facebook", "LinkedIn", "Instagram", "YouTube", "GitHub", "Telegram"].map(
            (item) => (
              <TouchableOpacity
                key={item}
                style={{
                  width: wp("18%"),
                  height: wp("18%"),
                  marginBottom: hp("2%"),
                }}
                className="rounded-full bg-gray-100 dark:bg-gray-800 justify-center items-center"
              >
                <Text className="text-xs text-lightTheme-text dark:text-darkTheme-text">
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>

      {/* QR & Settings */}
      <View className="px-5 mt-6">
        <Text
          style={{ fontSize: wp(4) }}
          className="font-semibold text-lightTheme-text dark:text-darkTheme-text mb-3"
        >
          QR Code
        </Text>

        <View className="p-4 border border-gray-300 dark:border-gray-700 rounded-xl items-center justify-center mb-4">
          <Text className="text-gray-500 dark:text-gray-300">[QR Code Preview]</Text>
        </View>

        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lightTheme-text dark:text-darkTheme-text">
            Add logo in QR code
          </Text>
          <Switch value={addLogo} onValueChange={setAddLogo} />
        </View>

        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lightTheme-text dark:text-darkTheme-text">
            Add 'Where We Met' detail
          </Text>
          <Switch value={whereMet} onValueChange={setWhereMet} />
        </View>

        {/* Delete + Preview */}
        <TouchableOpacity className="border border-red-400 py-3 rounded-xl mt-3 mb-6">
          <Text className="text-center text-red-500 font-semibold">Delete Card</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-primary py-4 rounded-xl mb-8">
          <Text className="text-white text-center font-semibold text-base">
            Preview Card
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
    </>
  );
}