import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

interface Props {
  label: string
  onPress: () => void
}

const CustomButton = ({ label, onPress }: Props) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.wrap}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.chervWrap}>
      <Text style={styles.cherv}>^</Text>
    </View>
  </TouchableOpacity>
)

export default React.memo(CustomButton)

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#00000033',
    borderRadius: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  chervWrap: {
    width: 22,
    height: 22,
    marginLeft: 8,
    borderRadius: 11,
    backgroundColor: '#00000033',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cherv: {
    fontSize: 25,
    color: '#FFFFFF',
    transform: [{ rotate: '180deg' }],
  },
})
