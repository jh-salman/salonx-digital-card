import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const createCard = () => {
  return (
    <View>
      {/* header section  */}
      <View>
        <Text>Header Section</Text>
        left side Cancel Button
        middle side Card Title field, default is 'Salonx'
        right side Save Button
      </View>


      {/* Color Palette section */}
      <View>
        <Text>Card Color</Text>
        horizontal scrollable color palette
        first random color selected palatte circle highlighted
        8 colors are selected and highlighted all clickable + ei color icons a use hbe selected and highlighted clickable
      </View>
      {/* Image and Layout section */}

      <View>
        <Text>Image and Layout</Text>
        default banner image with salonx logo in middle also card color in the background ( from Color Palette section)

        + Profile Picture upload button +Company Logo upload button + Banner Image upload button

        //Change Image Layout button clickable and modal will open from the bottom of the screen full screen modal with horizontal scrollable all layout card for selection and confirm layout button in the bottom of the modal
      </View>



      {/* personal information section */}
      <View>
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
      </View>


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
        

      </View>

      {/* QR Code section */}
      <View>
        Generate QR Code SVG Image and display it in the center of the screen
      </View>


      {/* add logo in QR Code Premium features  */}
      <View>
        <Text>Add Logo in QR Code Premium features</Text>
      </View>

     <View>
       <Text>Settings Section</Text>
       1. ADD 'Where We Met' detail toggle button
       2. Remove SALONX Branding toggle button premium features
     </View>



     delete card button
     <View>
      <Text>Delete Card Button</Text>
     </View>

     <View>
      Preview Card Button fixed in bottom of the screen
     </View>
    </View>
  )
}

export default createCard

const styles = StyleSheet.create({})