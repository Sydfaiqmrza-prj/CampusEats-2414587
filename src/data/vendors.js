const vendors = [
  {
    id: 'kafe-mallah-ali',
    name: 'Kafe Mahallah Ali',
    location: 'Mahallah Ali, Block C',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      { id: 'item-1', name: 'Nasi Lemak Ayam', description: 'Coconut rice, fried chicken, sambal, egg and peanuts', price: 7.5, category: 'Rice', available: true },
      { id: 'item-2', name: 'Mee Goreng Mamak', description: 'Fried yellow noodles with eggs and spices', price: 6.0, category: 'Noodles', available: true },
      { id: 'item-3', name: 'Teh Tarik', description: 'Malaysian pulled milk tea', price: 2.5, category: 'Drinks', available: false },
    ],
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isOpen: true,
    menu: [
      { id: 'item-4', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9.0, category: 'Rice', available: true },
      { id: 'item-5', name: 'Air Bandung', description: 'Rose syrup with milk', price: 3.0, category: 'Drinks', available: true },
    ],
  },
];

export default vendors;