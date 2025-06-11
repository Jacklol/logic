import React, { memo } from 'react'
import { View, Image, Text, StyleSheet, Platform } from 'react-native'

interface Props {
  course: {
    id: string
    name: string
    image: string
    bgColor: string
    tags: string[]
  }
}

const CourseCard = ({ course }: Props) => {
  return (
    <View style={styles.wrap}>
      <View style={[styles.wrapper, { backgroundColor: course.bgColor }]}>
        <Image source={{ uri: course.image }} style={styles.image} />

        <View style={styles.text}>
          <Text style={styles.name}>{course.name}</Text>
        </View>
      </View>
    </View>
  )
}

export default memo(CourseCard)

const CARD_WIDTH = 210
const CARD_HEIGHT = 210
const TEXT_HEIGHT = 48

const styles = StyleSheet.create({
  wrap: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#E5E8FE',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
      android: {
        elevation: 6,
        shadowColor: '#E5E8FE',
      },
    }),
  },
  wrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - TEXT_HEIGHT,
    resizeMode: 'cover',
  },
  text: {
    height: TEXT_HEIGHT,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
})
