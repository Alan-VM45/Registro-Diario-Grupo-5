export const categories = [
    { name: 'Comida', symbol: '◒', color: '#C76B45', background: '#F8EAE2' },
    { name: 'Transporte', symbol: '↗', color: '#397A68', background: '#E4F0EB' },
    { name: 'Hogar', symbol: '⌂', color: '#7357C8', background: '#EEE9FA' },
    { name: 'Ocio', symbol: '✳', color: '#C15E62', background: '#F8E7E6' },
    { name: 'Salud', symbol: '+', color: '#34768A', background: '#E3F0F3' },
    { name: 'Otros', symbol: '•', color: '#66736E', background: '#E9EDE9' },
];

export function formatCurrency(value) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    }).format(value);
}