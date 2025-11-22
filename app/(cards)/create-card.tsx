import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/components/card/Header'
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import ColorPlate from '@/components/card/ColorPlate';
import ImageAndLayout from '@/components/card/ImageAndLayout';
import PersonalDetails from '@/components/card/PersonalDetails';
import SocialMedia from '@/components/card/SocialMedia';
import QR from '@/components/card/QR';
import Settings from '@/components/card/Settings';
import PreviewCard from '@/components/card/PreviewCard';
import { navigate } from 'expo-router/build/global-state/routing';






const createCard = () => {
  const {colors} = useTheme();
  return (
   <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
     <View style={[styles.container, ]}> 
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ColorPlate />
        {/* Image and Layout section */}
        <ImageAndLayout />
        <PersonalDetails />
        <SocialMedia />
        <QR />
        <Settings />
        
        
      </ScrollView>
      <PreviewCard onPress={() => {navigate("/(cards)/preview-card")}} /> 


      {/* Color Palette section */}
      {/* <View>
        <Text>Card Color</Text>
        horizontal scrollable color palette
        first random color selected palatte circle highlighted
        8 colors are selected and highlighted all clickable + ei color icons a use hbe selected and highlighted clickable
      </View> */}
      {/* Image and Layout section */}
{/* 
      <View>
        <Text>Image and Layout</Text>
        default banner image with salonx logo in middle also card color in the background ( from Color Palette section)

        + Profile Picture upload button +Company Logo upload button + Banner Image upload button

        //Change Image Layout button clickable and modal will open from the bottom of the screen full screen modal with horizontal scrollable all layout card for selection and confirm layout button in the bottom of the modal
      </View> */}



      {/* personal information section */}
      {/* <View>
        <Text>Personal Information Section</Text>
        1. first name field
        2. last name field
         clickable buttons to toggle the visibility of the middle name field
        + Middle name + Prefix
        +Suffix +Pronoun +Preferred +Maiden name

        job title field
        Department field
        Company field
        Headline field
        *Accreditation add edit and delete button
      </View> */}

{/* 
      social media section
      <View>
        <Text>Social Media Section</Text>
        //in 3 coloums
        +Phone 
        +Email
        +link
        +address
        +company website
        +LinkedIn
        +Instagram
        +Calendly
        +X
        +facebook
        +threads
        +SnapChat
        +TikTok
        +Youtube 
        +Github
        +Yelp 
        +Venmo 
        +Paypal 
        +CashApp 
        +Discord 
        +Signal 
        +Skype 
        +Telegram 
        +Twitch 
        +WhatsApp
        

      </View> */}

      {/* QR Code section
      <View>
        Generate QR Code SVG Image and display it in the center of the screen
      </View> */}


      {/* add logo in QR Code Premium features  */}
      {/* <View>
        <Text>Add Logo in QR Code Premium features</Text>
      </View> */}
{/* 
     <View>
       <Text>Settings Section</Text>
       1. ADD 'Where We Met' detail toggle button
       2. Remove SALONX Branding toggle button premium features
     </View> */}


{/* 
     delete card button
     <View>
      <Text>Delete Card Button</Text>
     </View> */}

     {/* <View>
      Preview Card Button fixed in bottom of the screen
     </View> */}
    </View>
   </SafeAreaView>
  )
}

export default createCard

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    
  }
})