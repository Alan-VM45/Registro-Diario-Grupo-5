import { Pressable, StyleSheet, Text, View } from 'react-native';

const tabs = [
  { id: 'home', label: 'Resumen', symbol: '⌂' },
  { id: 'expenses', label: 'Movimientos', symbol: '≡' },
  { id: 'add', label: 'Agregar', symbol: '+' },
];

export default function BottomTabs({ activeScreen, onChange }) {
  return (
    <View style={styles.bar}>
      {tabs.map((tab) => {
        const active = activeScreen === tab.id;
        const isAdd = tab.id === 'add';

        return (
          <Pressable
            key={tab.id}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={tab.label}
            onPress={() => onChange(tab.id)}
            style={styles.tab}
          >
            <View style={[styles.icon, isAdd && styles.addIcon, active && !isAdd && styles.activeIcon]}>
              <Text style={[styles.symbol, isAdd && styles.addSymbol, active && !isAdd && styles.activeSymbol]}>
                {tab.symbol}
              </Text>
            </View>
            <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    minHeight: 78,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E3E8E3',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 9,
    paddingBottom: 12,
  },
  tab: {
    minWidth: 86,
    alignItems: 'center',
    gap: 3,
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: {
    borderRadius: 10,
    backgroundColor: '#E5EFDA',
  },
  addIcon: {
    width: 34,
    height: 34,
    marginTop: -7,
    borderRadius: 12,
    backgroundColor: '#7052C8',
  },
  symbol: {
    color: '#78827D',
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700',
  },
  activeSymbol: {
    color: '#244A3D',
  },
  addSymbol: {
    color: '#FFFFFF',
    fontSize: 26,
    lineHeight: 30,
  },
  label: {
    color: '#7A847F',
    fontSize: 10,
    fontWeight: '600',
  },
  activeLabel: {
    color: '#244A3D',
  },
});