import React, { useCallback } from 'react'
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native'

interface Props {
  visible: boolean
  tags: string[]
  current: string | null
  onSelect: (tag: string | null) => void
  onClose: () => void
}

const FilterModal = ({ visible, tags, current, onSelect, onClose }: Props) => {
  const handleSelect = useCallback(
    (tag: string | null) => {
      onSelect(tag)
      onClose()
    },
    [onSelect, onClose],
  )

  const renderItem = useCallback(
    ({ item }: { item: string | null }) => {
      const selected = current === item

      return (
        <TouchableOpacity
          activeOpacity={0.75}
          style={[styles.btn, selected && styles.btnActive]}
          onPress={() => handleSelect(item)}
        >
          <Text style={[styles.btnText, selected && styles.btnTextActive]}>
            {item ?? 'Все темы'}
          </Text>
        </TouchableOpacity>
      )
    },
    [current, handleSelect],
  )

  const keyExtractor = useCallback((tag: string | null, index: number) => {
    return `${tag ?? 'all'}-${index}`
  }, [])

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.wrap}>
        <View style={styles.textWrap}>
          <Text style={styles.header}>Выбор темы</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.closeTxt}>✕</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={[null, ...tags]}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listPad}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Modal>
  )
}

export default React.memo(FilterModal)

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  textWrap: {
    marginTop: 12,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E2640',
  },
  button: {
    position: 'absolute',
    right: 0,
    padding: 6,
  },
  closeTxt: {
    fontSize: 26,
    color: '#9BB0D4',
  },
  listPad: {
    paddingBottom: 24,
  },
  btn: {
    height: 56,
    width: '100%',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C7D6F9',
    backgroundColor: '#FFFFFF',
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  btnActive: {
    backgroundColor: '#5EBE6E',
    borderColor: '#5EBE6E',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#43506C',
    textAlign: 'left',
  },
  btnTextActive: {
    color: '#FFFFFF',
  },
})
