import {  Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ImageLayoutModal = ({isVisible, onClose}: {isVisible: boolean, onClose: () => void}) => {
  return (
    <>
    <Modal visible={isVisible} onBackdropPress={onClose} onBackButtonPress={onClose} animationIn="slideInUp" animationOut="slideOutDown" style={styles.modal} useNativeDriver>
       
    </Modal>
      
    </>
  )
}

export default ImageLayoutModal

const styles = StyleSheet.create({})