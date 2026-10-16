import { StyleSheet, Text, View } from 'react-native';
import { categories, formatCurrency } from '../data';

export default function ExpenseRow({ expense, showDate = false }) {
  const category = categories.find((item) => item.name === expense.category) ?? categories[5];

  return (
    <View style={styles.row}>
      <View style={[styles.symbol, { backgroundColor: category.background }]}>
        <Text style={[styles.symbolText, { color: category.color }]}>{category.symbol}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{expense.title}</Text>
        <Text style={styles.meta}>
          {expense.category}{showDate ? `  ·  ${expense.date}` : `  ·  ${expense.time}`}
        </Text>
      </View>
      <Text style={styles.amount}>− {formatCurrency(expense.amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E4E9E4',
    gap: 12,
  },
  symbol: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    fontSize: 20,
    fontWeight: '700',
  },
  details: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: '#182721',
    fontSize: 14,
    fontWeight: '700',
  },
  meta: {
    color: '#78827D',
    fontSize: 12,
  },
  amount: {
    color: '#182721',
    fontSize: 13,
    fontWeight: '700',
  },
});