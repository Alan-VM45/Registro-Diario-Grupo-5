import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import BottomTabs from './src/components/BottomTabs';
import { initialExpenses } from './src/data';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import ExpensesScreen from './src/screens/ExpensesScreen';
import HomeScreen from './src/screens/HomeScreen';

const monthlyBudget = 320000;

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [expenses, setExpenses] = useState(initialExpenses);
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
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        {activeScreen === 'home' && (
          <HomeScreen
            expenses={expenses}
            totalSpent={totalSpent}
            monthlyBudget={monthlyBudget}
            onAddExpense={() => setActiveScreen('add')}
            onSeeExpenses={() => setActiveScreen('expenses')}
          />
        )}
        {activeScreen === 'expenses' && <ExpensesScreen expenses={expenses} />}
        {activeScreen === 'add' && <AddExpenseScreen onSave={saveExpense} />}
      </View>
      <BottomTabs activeScreen={activeScreen} onChange={setActiveScreen} />
    </SafeAreaView>
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
