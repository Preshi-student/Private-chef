// FilterByCourse.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useMenu } from './MenuContext';
import { Course, MenuItem } from './types';

const courses: Course[] = ['Hors Oeuvres', 'Cuisine', 'Soup', 'Appetiser'];

export default function FilterByCourse() {
  const { menu } = useMenu();
  const [selected, setSelected] = useState<Course | null>(null);

  // ONE LINE — NO BREAKS
  const filtered = selected ? menu.filter(i => i.course === selected) : menu;

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.card}>
      <Text style={styles.dish}>{item.dishName}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.price}>R{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, !selected && styles.active]}
          onPress={() => setSelected(null)}
        >
          <Text style={[styles.filterTxt, !selected && styles.activeTxt]}>All</Text>
        </TouchableOpacity>

        {courses.map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.filterBtn, selected === c && styles.active]}
            onPress={() => setSelected(c)}
          >
            <Text style={[styles.filterTxt, selected === c && styles.activeTxt]}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={i => i.id}
        ListEmptyComponent={<Text style={styles.empty}>No items in this course.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32', textAlign: 'center', marginBottom: 16 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20, gap: 8 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#C8E6C9' },
  active: { backgroundColor: '#4CAF50' },
  filterTxt: { color: '#2E7D32', fontWeight: '600' },
  activeTxt: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 10, elevation: 2 },
  dish: { fontWeight: 'bold', color: '#1B5E20', fontSize: 16 },
  desc: { color: '#2E7D32', fontSize: 13, marginTop: 2 },
  price: { color: '#4CAF50', fontWeight: 'bold', marginTop: 4 },
  empty: { textAlign: 'center', color: '#666', marginTop: 30, fontStyle: 'italic' },
});