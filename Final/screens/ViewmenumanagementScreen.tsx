// ViewMenu.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useMenu } from './MenuContext';

export default function ViewMenu({ navigation }: any) {
  const { menu } = useMenu();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VIEW MENU</Text>
      <Text style={styles.subtitle}>Sabores que cruzan mares</Text>

      {menu.length === 0 ? (
        <Text style={styles.empty}>No items yet. Add your first dish!</Text>
      ) : (
        <FlatList
          data={menu}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.course}>{item.course}</Text>
              <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
              {item.description ? (
                <Text style={styles.desc}>{item.description}</Text>
              ) : null}
            </View>
          )}
        />
      )}

      {/* ADD BUTTON */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddMenuItem')}
      >
        <Text style={styles.addButtonText}>+ Add New Dish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D6D6A0', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  subtitle: { fontSize: 20, fontStyle: 'italic', textAlign: 'center', marginBottom: 20, color: '#555' },
  empty: { textAlign: 'center', fontSize: 18, color: '#666', marginTop: 50 },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  course: { color: '#15803d', fontWeight: 'bold', marginTop: 4 },
  price: { fontSize: 16, color: '#333', marginTop: 5 },
  desc: { color: '#666', marginTop: 8, fontStyle: 'italic' },
  addButton: {
    backgroundColor: '#15803d',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});