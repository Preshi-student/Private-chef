// ViewMenu.tsx  ←←←← FILE NAME MUST BE EXACT
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useMenu } from './MenuContext';
import { Course } from './types';

const courses: Course[] = ['Hors Oeuvres', 'Soup', 'Appetiser', 'Cuisine'];

export default function ViewMenu() {
  const { menu } = useMenu();
  const [filter, setFilter] = useState<Course | 'All'>('All');
  const filtered = filter === 'All' ? menu : menu.filter(i => i.course === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>
      <View style={styles.filterRow}>
        <TouchableOpacity style={[styles.filterBtn, filter === 'All' && styles.active]} onPress={() => setFilter('All')}>
          <Text style={[styles.filterText, filter === 'All' && styles.activeText]}>All</Text>
        </TouchableOpacity>
        {courses.map(c => (
          <TouchableOpacity key={c} style={[styles.filterBtn, filter === c && styles.active]} onPress={() => setFilter(c)}>
            <Text style={[styles.filterText, filter === c && styles.activeText]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.circle, { backgroundColor: getColor(item.course) }]} />
            <View style={styles.info}>
              <Text style={styles.dish}>{item.dishName}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items in {filter}</Text>}
      />
    </View>
  );
}

const getColor = (c: Course) => ({ 'Hors Oeuvres': '#81C784', Soup: '#4CAF50', Appetiser: '#43A047', Cuisine: '#66BB6A' }[c]);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2E7D32', textAlign: 'center', marginBottom: 16 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#ddd', margin: 4 },
  active: { backgroundColor: '#4CAF50' },
  filterText: { fontSize: 14 },
  activeText: { color: '#fff', fontWeight: 'bold' },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, elevation: 2 },
  circle: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  info: { flex: 1 },
  dish: { fontWeight: 'bold', color: '#1B5E20' },
  desc: { color: '#2E7D32', fontSize: 13 },
  price: { color: '#4CAF50', fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40 },
});