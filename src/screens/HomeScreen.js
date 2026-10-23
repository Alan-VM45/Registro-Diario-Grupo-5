import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ExpenseRow from '../components/ExpenseRow';
import { categories, formatCurrency } from '../data';

const monthName = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' })
    .format(new Date())
    .toUpperCase();
const monthAbbreviation = new Intl.DateTimeFormat('es-AR', { month: 'short' })
    .format(new Date())
    .toUpperCase();

export default function HomeScreen({ expenses, totalSpent, onAddExpense, onSeeExpenses }) {
    const categoryTotals = categories
        .map((category) => ({
        ...category,
        total: expenses
            .filter((expense) => expense.category === category.name)
            .reduce((sum, expense) => sum + expense.amount, 0),
        }))
        .filter((category) => category.total > 0)
        .sort((first, second) => second.total - first.total)
        .slice(0, 3);

    return (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
            <View style={styles.brand}>
            <View style={styles.brandMark}><Text style={styles.brandLetter}>E</Text></View>
            <Text style={styles.brandName}>ExpenseTracker</Text>
            </View>
            <Text style={styles.month}>{monthName}</Text>
        </View>

        <Text style={styles.eyebrow}>TU RESUMEN PERSONAL</Text>
        <Text style={styles.heading}>Tus gastos,</Text>
        <Text style={styles.headingAccent}>bajo control.</Text>

        <View style={styles.budgetCard}>
            <View style={styles.cardTop}>
            <Text style={styles.cardLabel}>GASTOS REGISTRADOS</Text>
            <View style={styles.periodTag}><Text style={styles.periodText}>{monthAbbreviation}</Text></View>
            </View>
            <Text style={styles.total}>{formatCurrency(totalSpent)}</Text>
            <Text style={styles.budgetNote}>
                {expenses.length === 1 ? '1 gasto cargado' : `${expenses.length} gastos cargados`}
            </Text>
        </View>

        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Por categoría</Text>
            <Text style={styles.sectionNote}>Este mes</Text>
        </View>
        {categoryTotals.length > 0 ? categoryTotals.map((category) => {
            const categoryProgress = totalSpent === 0 ? 0 : category.total / totalSpent;
            return (
            <View key={category.name} style={styles.categoryRow}>
                <View style={[styles.categoryMark, { backgroundColor: category.background }]}>
                <Text style={{ color: category.color, fontWeight: '700' }}>{category.symbol}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <View style={styles.categoryTrack}>
                <View style={[styles.categoryFill, { width: `${categoryProgress * 100}%`, backgroundColor: category.color }]} />
                </View>
                <Text style={styles.categoryAmount}>{formatCurrency(category.total)}</Text>
            </View>
            );
        }) : <Text style={styles.emptyText}>Todavía no hay gastos para mostrar.</Text>}

        <View style={[styles.sectionHeader, styles.recentHeader]}>
            <Text style={styles.sectionTitle}>Movimientos recientes</Text>
            <Pressable accessibilityRole="button" onPress={onSeeExpenses}>
            <Text style={styles.link}>Ver todos</Text>
            </Pressable>
        </View>
        {expenses.length === 0 ? (
            <Text style={styles.emptyText}>Todavía no cargaste gastos.</Text>
        ) : expenses.slice(0, 3).map((expense) => (
            <ExpenseRow key={expense.id} expense={expense} />
        ))}

        <Pressable accessibilityRole="button" style={styles.addButton} onPress={onAddExpense}>
            <Text style={styles.addButtonSymbol}>＋</Text>
            <Text style={styles.addButtonText}>Registrar un gasto</Text>
        </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 22,
        paddingTop: 12,
        paddingBottom: 28,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    brand: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
    },
    brandMark: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#7052C8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandLetter: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
    brandName: {
        color: '#182721',
        fontSize: 14,
        fontWeight: '800',
    },
    month: {
        color: '#75817A',
        fontSize: 10,
        fontWeight: '700',
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
        fontSize: 30,
        fontWeight: '800',
        lineHeight: 34,
    },
    headingAccent: {
        marginBottom: 20,
        color: '#7052C8',
        fontSize: 30,
        fontWeight: '800',
        lineHeight: 34,
    },
    budgetCard: {
        padding: 20,
        borderRadius: 18,
        backgroundColor: '#203C34',
        marginBottom: 25,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLabel: {
        color: '#C3D3C8',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    periodTag: {
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 7,
        backgroundColor: '#345449',
    },
    periodText: {
        color: '#E2F184',
        fontSize: 10,
        fontWeight: '800',
    },
    total: {
        marginTop: 12,
        marginBottom: 18,
        color: '#FFFFFF',
        fontSize: 31,
        fontWeight: '800',
    },
    budgetNote: {
        marginTop: 11,
        color: '#D1DDD4',
        fontSize: 10,
    },
    sectionHeader: {
        marginBottom: 7,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        color: '#182721',
        fontSize: 16,
        fontWeight: '800',
    },
    sectionNote: {
        color: '#78827D',
        fontSize: 11,
    },
    categoryRow: {
        minHeight: 44,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    categoryMark: {
        width: 25,
        height: 25,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryName: {
        width: 75,
        color: '#394740',
        fontSize: 11,
        fontWeight: '600',
    },
    categoryTrack: {
        height: 5,
        flex: 1,
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#E4E9E4',
    },
    categoryFill: {
        height: '100%',
        borderRadius: 4,
    },
    categoryAmount: {
        minWidth: 66,
        color: '#394740',
        fontSize: 10,
        textAlign: 'right',
        fontWeight: '700',
    },
    emptyText: {
        paddingVertical: 12,
        color: '#78827D',
        fontSize: 13,
    },
    recentHeader: {
        marginTop: 23,
    },
    link: {
        color: '#7052C8',
        fontSize: 12,
        fontWeight: '700',
    },
    addButton: {
        minHeight: 48,
        marginTop: 18,
        borderWidth: 1,
        borderColor: '#D9DFD9',
        borderRadius: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    addButtonSymbol: {
        color: '#7052C8',
        fontSize: 20,
        fontWeight: '600',
    },
    addButtonText: {
        color: '#34443C',
        fontSize: 13,
        fontWeight: '700',
    },
});