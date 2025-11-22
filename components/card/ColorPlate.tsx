import { ScrollView, StyleSheet, Text, View, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useContext, useState } from 'react'
import { useTheme } from '@/context/ThemeContext';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CardCreateContext } from '@/context/CardCreateContext';

const ColorPlate = () => {
  const {colors} = useTheme();
 


  const {selectedColor, setSelectedColor} = useContext(CardCreateContext);
 

  const colorOptions = [
    {id:"1", name: "red", value: "#FF0000" },
    {id:"2", name: "blue", value: "#0000FF" },
    {id:"3", name: "green", value: "#00FF00" },
    {id:"4", name: "yellow", value: "#FFFF00" },
    {id:"5", name: "purple", value: "#800080" },
    {id:"6", name: "orange", value: "#FFA500" },
    {id:"7", name: "brown", value: "#A52A2A" },
    {id:"8", name: "gray", value: "#808080" },
    {id:"9", name: "black", value: "#000000" },
    {id:"10", name: "white", value: "#FFFFFF" },
  ]

  return (
    <View style={styles.colorPlateContainer}>
       <View style={styles.colorPlateHeader}>
        <Text style={{color: colors.text, paddingHorizontal: wp(5), fontSize: wp(5), fontWeight: "bold"}}>Card Color</Text>
        <></>
       </View>
       <View style={styles.colorPlateContent}>
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {colorOptions.map((color) => (
          <TouchableOpacity 
            key={color.id} 
            onPress={() => setSelectedColor(color.value)} 
            style={[
              styles.colorOption, 
              {backgroundColor: color.value},
              selectedColor === color.value && {...styles.selectedColor, borderColor: colors.text}
            ]}
            
          />
        ))}
        <Text style={{color: colors.text}}>{selectedColor}</Text>
      </ScrollView>
       </View>
    </View>
  )
}

export default ColorPlate

const styles = StyleSheet.create({
  colorPlateContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: wp("100%"),
    paddingVertical: wp(3),
  },
  colorPlateContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp("90%"),
    paddingVertical: wp(3),
  },
  colorPlateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("100%"),
    paddingVertical: wp(3),
  },
  colorOption: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(5),
    marginRight: wp(8.5),
  },
  selectedColor: {
    borderWidth: 2,
    borderColor:"#000",
    // transform: [{ scale: 1.2 }]
  }
})