import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ExpenseRow from '../components/ExpenseRow';
import { categories, formatCurrency } from '../data';

const filters = ['Todos', ...categories.map((category) => category.name)];

export default function ExpensesScreen({ expenses }) {
        const [selectedCategory, setSelectedCategory] = useState('Todos');
        const filteredExpenses = selectedCategory === 'Todos'
            ? expenses
        : expenses.filter((expense) => expense.category === selectedCategory);
    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <FlatList
        style={styles.list}
        contentContainerStyle={styles.content}
        data={filteredExpenses}
        keyExtractor={(expense) => expense.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={(
            <View>
            <Text style={styles.eyebrow}>TU ACTIVIDAD</Text>
            <Text style={styles.heading}>Movimientos</Text>
            <Text style={styles.subtitle}>Tus gastos, ordenados en un solo lugar.</Text>
            <View style={styles.summary}>
                <Text style={styles.summaryLabel}>{selectedCategory === 'Todos' ? 'TOTAL REGISTRADO' : selectedCategory.toUpperCase()}</Text>
                <Text style={styles.summaryAmount}>{formatCurrency(total)}</Text>
                <Text style={styles.summaryCount}>{filteredExpenses.length} movimientos</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
                {filters.map((filter) => {
                const active = selectedCategory === filter;
                return (
                    <Pressable
                    key={filter}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    onPress={() => setSelectedCategory(filter)}
                    style={[styles.filter, active && styles.activeFilter]}
                    >
                    <Text style={[styles.filterText, active && styles.activeFilterText]}>{filter}</Text>
                    </Pressable>
                );
                })}
            </ScrollView>
            <Text style={styles.listHeading}>Este mes</Text>
            </View>
        )}
        renderItem={({ item }) => <ExpenseRow expense={item} showDate />}
        ListEmptyComponent={<Text style={styles.empty}>No hay movimientos en esta categoría.</Text>}
        />
    );
    }

    const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 22,
        paddingTop: 25,
        paddingBottom: 24,
        flexGrow: 1,
    },
    eyebrow: {
        color: '#66736D',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    heading: {
        marginTop: 6,
        color: '#182721',
        fontSize: 28,
        fontWeight: '800',
    },
    subtitle: {
        marginTop: 5,
        color: '#78827D',
        fontSize: 13,
    },
    summary: {
        marginTop: 22,
        marginBottom: 18,
        padding: 18,
        borderRadius: 16,
        backgroundColor: '#203C34',
    },
    summaryLabel: {
        color: '#C3D3C8',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    summaryAmount: {
        marginTop: 7,
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: '800',
    },
    summaryCount: {
        marginTop: 4,
        color: '#D1DDD4',
        fontSize: 11,
    },
    filters: {
        gap: 8,
        paddingBottom: 21,
    },
    filter: {
        minHeight: 34,
        paddingHorizontal: 13,
        borderWidth: 1,
        borderColor: '#DDE3DD',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeFilter: {
        borderColor: '#203C34',
        backgroundColor: '#203C34',
    },
    filterText: {
        color: '#52615A',
        fontSize: 11,
        fontWeight: '600',
    },
    activeFilterText: {
        color: '#FFFFFF',
    },
    listHeading: {
        marginBottom: 3,
        color: '#182721',
        fontSize: 15,
        fontWeight: '800',
    },
    empty: {
        paddingVertical: 24,
        color: '#78827D',
        fontSize: 13,
        textAlign: 'center',
    },
});