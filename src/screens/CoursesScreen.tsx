import React, { useEffect, useState, useMemo } from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'

import CourseCard from '../components/CourseCard'
import TagFilterModal from '../components/FilterModal'
import CustomButton from '../components/CustomButton'
import { useCourses } from '../hooks/useCourses'

export default function CoursesScreen() {
  const { courses, loading, error } = useCourses()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
  }, [])

  const uniqueTags = useMemo(() => {
    return Array.from(new Set(courses.flatMap((course) => course.tags))).sort()
  }, [courses])

  const filteredCourses = useMemo(() => {
    if (!selectedTag) return courses
    return courses.filter((course) => course.tags.includes(selectedTag))
  }, [courses, selectedTag])

  const handleOpenModal = () => setIsModalVisible(true)
  const handleCloseModal = () => setIsModalVisible(false)

  const renderItem: ListRenderItem<(typeof courses)[number]> = ({ item }) => (
    <CourseCard course={item} />
  )

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.buttonWrap}>
        <CustomButton label={selectedTag ?? 'Все темы'} onPress={handleOpenModal} />
      </View>

      <View style={styles.flatWrapper}>
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          style={styles.flatList}
        />
      </View>

      <TagFilterModal
        visible={isModalVisible}
        tags={uniqueTags}
        current={selectedTag}
        onSelect={setSelectedTag}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#7446EE',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonWrap: {
    marginTop: 20,
    alignItems: 'center',
  },
  flatWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  flatList: {
    height: 230,
  },
  listContent: {
    paddingHorizontal: 12,
  },
})
