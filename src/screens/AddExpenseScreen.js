import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { categories } from '../data';

export default function AddExpenseScreen({ onSave }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Comida');
  const [error, setError] = useState('');

  function submitExpense() {
    const numericAmount = Number(amount);
    if (!title.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Completa el concepto y un importe mayor que cero.');
      return;
    }

    onSave({ title: title.trim(), amount: numericAmount, category: selectedCategory });
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>NUEVO MOVIMIENTO</Text>
      <Text style={styles.heading}>Anota un gasto.</Text>
      <Text style={styles.subtitle}>Un registro simple para tener tus cuentas claras.</Text>

      <View style={styles.amountPanel}>
        <Text style={styles.labelLight}>IMPORTE</Text>
        <View style={styles.amountLine}>
          <Text style={styles.currency}>$</Text>
          <TextInput
            accessibilityLabel="Importe del gasto"
            style={styles.amountInput}
            placeholder="0"
            placeholderTextColor="#B7C5BC"
            value={amount}
            onChangeText={(value) => {
              setAmount(value.replace(/[^0-9]/g, ''));
              setError('');
            }}
            keyboardType="number-pad"
            maxLength={9}
          />
        </View>
        <Text style={styles.currencyNote}>Pesos argentinos · ARS</Text>
      </View>

      <Text style={styles.label}>Concepto</Text>
      <TextInput
        accessibilityLabel="Concepto del gasto"
        style={styles.input}
        placeholder="Ej. Supermercado"
        placeholderTextColor="#929C96"
        value={title}
        onChangeText={(value) => {
          setTitle(value);
          setError('');
        }}
        maxLength={48}
        returnKeyType="done"
      />

      <Text style={[styles.label, styles.categoryLabel]}>Categoría</Text>
      <View style={styles.categoryGrid}>
        {categories.map((category) => {
          const active = selectedCategory === category.name;
          return (
            <Pressable
              key={category.name}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => setSelectedCategory(category.name)}
              style={[styles.category, active && styles.activeCategory, active && { borderColor: category.color }]}
            >
              <View style={[styles.categorySymbol, { backgroundColor: category.background }]}>
                <Text style={[styles.symbol, { color: category.color }]}>{category.symbol}</Text>
              </View>
              <Text style={[styles.categoryText, active && styles.activeCategoryText]}>{category.name}</Text>
            </Pressable>
          );
        })}
      </View>

      {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
      <Pressable accessibilityRole="button" style={styles.saveButton} onPress={submitExpense}>
        <Text style={styles.saveButtonText}>Guardar gasto</Text>
        <Text style={styles.saveButtonSymbol}>→</Text>
      </Pressable>
      <Text style={styles.footnote}>Los datos de esta versión son temporales y se reinician al cerrar la app.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 30,
  },
  eyebrow: {
    color: '#66736D',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heading: {
    marginTop: 7,
    color: '#182721',
    fontSize: 29,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 5,
    color: '#78827D',
    fontSize: 13,
  },
  amountPanel: {
    minHeight: 150,
    marginTop: 23,
    marginBottom: 23,
    padding: 18,
    borderRadius: 17,
    backgroundColor: '#203C34',
    justifyContent: 'center',
  },
  labelLight: {
    color: '#C3D3C8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  amountLine: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    marginRight: 7,
    color: '#D8F17F',
    fontSize: 27,
    fontWeight: '700',
  },
  amountInput: {
    minWidth: 120,
    padding: 0,
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
  },
  currencyNote: {
    marginTop: 2,
    color: '#C3D3C8',
    fontSize: 11,
  },
  label: {
    marginBottom: 8,
    color: '#34443C',
    fontSize: 12,
    fontWeight: '700',
  },
  input: {
    minHeight: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#DDE3DD',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    color: '#182721',
    fontSize: 14,
  },
  categoryLabel: {
    marginTop: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  category: {
    width: '31%',
    minHeight: 73,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E7E2',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  activeCategory: {
    backgroundColor: '#FFFFFF',
  },
  categorySymbol: {
    width: 27,
    height: 27,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 16,
    fontWeight: '800',
  },
  categoryText: {
    color: '#59665F',
    fontSize: 10,
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#182721',
    fontWeight: '800',
  },
  error: {
    marginTop: 14,
    color: '#B74242',
    fontSize: 12,
  },
  saveButton: {
    minHeight: 52,
    marginTop: 22,
    paddingHorizontal: 17,
    borderRadius: 13,
    backgroundColor: '#7052C8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  saveButtonSymbol: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  footnote: {
    marginTop: 12,
    color: '#78827D',
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
  },
});