import { router } from "expo-router";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Index() {
  return (
    <View className="bg-lightTheme-background dark:bg-darkTheme-background flex-1 justify-between items-center px-6 py-12">
      
      {/* Top Welcome Section */}
      <View className="flex-1 justify-center items-center">
        <Text 
          style={{ fontSize: wp(5) }} 
          className="font-bold text-lightTheme-text dark:text-darkTheme-text mb-2 text-center"
        >
          Welcome to SalonX Digital Card
        </Text>
        <Text 
          style={{ fontSize: wp(3.5) }} 
          className="text-gray-500 dark:text-gray-400 text-center"
        >
          Your digital card, simplified.
        </Text>
      </View>

      {/* Bottom Button Section */}
      <View className="w-full mb-4">
        <TouchableOpacity 
          onPress={() => router.push("/card")}
          style={{
            paddingVertical: hp('1.8%'),
          }}
          className="bg-primary rounded-xl mb-3"
        >
          <Text 
            style={{ fontSize: wp(4) }} 
            className="text-center text-white font-semibold"
          >
            Create a Card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push("/signup")}
          style={{
            paddingVertical: hp('1.8%'),
          }}
          className="border-2 border-primary rounded-xl bg-lightTheme-card dark:bg-darkTheme-card"
        >
          <Text 
            style={{ fontSize: wp(4) }} 
            className="text-center text-primary font-semibold"
          >
            Create an Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
