import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomTabs from '../components/BottomTabs';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import HomeScreen from '../screens/HomeScreen';

export default function AppNavigator() {
    const [activeScreen, setActiveScreen] = useState('home');
    const [expenses, setExpenses] = useState([]);
    const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0);

function saveExpense(expense) {
    const time = new Intl.DateTimeFormat('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date());

    setExpenses((currentExpenses) => [
        { ...expense, id: String(Date.now()), date: 'Hoy', time },
        ...currentExpenses,
    ]);
    setActiveScreen('expenses');
}

return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.screen}>
        {activeScreen === 'home' && (
            <HomeScreen
                expenses={expenses}
                totalSpent={totalSpent}
                onAddExpense={() => setActiveScreen('add')}
                onSeeExpenses={() => setActiveScreen('expenses')}
            />
        )}
            {activeScreen === 'expenses' && <ExpensesScreen expenses={expenses} />}
            {activeScreen === 'add' && <AddExpenseScreen onSave={saveExpense} />}
        </View>
        <BottomTabs activeScreen={activeScreen} onChange={setActiveScreen} />
    </SafeAreaView>
    </SafeAreaProvider>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F5F1',
    },
        screen: {
        flex: 1,
    },
});