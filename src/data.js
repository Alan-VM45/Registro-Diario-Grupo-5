export const categories = [
    { name: 'Comida', symbol: '◒', color: '#C76B45', background: '#F8EAE2' },
    { name: 'Transporte', symbol: '↗', color: '#397A68', background: '#E4F0EB' },
    { name: 'Hogar', symbol: '⌂', color: '#7357C8', background: '#EEE9FA' },
    { name: 'Ocio', symbol: '✳', color: '#C15E62', background: '#F8E7E6' },
    { name: 'Salud', symbol: '+', color: '#34768A', background: '#E3F0F3' },
    { name: 'Otros', symbol: '•', color: '#66736E', background: '#E9EDE9' },
];

export const initialExpenses = [
    { id: '1', title: 'Almuerzo', category: 'Comida', amount: 8500, date: 'Hoy', time: '13:24' },
    { id: '2', title: 'Viaje a la facultad', category: 'Transporte', amount: 2200, date: 'Hoy', time: '09:15' },
    { id: '3', title: 'Supermercado', category: 'Hogar', amount: 32450, date: 'Ayer', time: '18:42' },
    { id: '4', title: 'Café con leche', category: 'Comida', amount: 3900, date: '14 oct.', time: '16:10' },
    { id: '5', title: 'Entrada de cine', category: 'Ocio', amount: 6800, date: '13 oct.', time: '21:05' },
];

export function formatCurrency(value) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    }).format(value);
}