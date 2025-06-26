import { Product } from '../types';

export const products: Product[] = [
  // Vegetables
  {
    id: 'v1',
    name: 'Fresh Tomatoes',
    price: 40,
    originalPrice: 50,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
    description: 'Fresh local tomatoes, perfect for cooking'
  },
  {
    id: 'v2',
    name: 'Green Onions',
    price: 25,
    image: 'https://images.pexels.com/photos/928251/pexels-photo-928251.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'vegetables',
    unit: 'per bunch',
    inStock: true,
    description: 'Fresh green onions from local farms'
  },
  {
    id: 'v3',
    name: 'Fresh Potatoes',
    price: 30,
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
    description: 'High quality potatoes for all your cooking needs'
  },
  {
    id: 'v4',
    name: 'Fresh Carrots',
    price: 45,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
    description: 'Sweet and crunchy carrots, rich in vitamins'
  },
  
  // Fruits
  {
    id: 'f1',
    name: 'Fresh Apples',
    price: 120,
    originalPrice: 140,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'fruits',
    unit: 'per kg',
    inStock: true,
    description: 'Crisp and sweet apples, perfect for snacking'
  },
  {
    id: 'f2',
    name: 'Ripe Bananas',
    price: 60,
    image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'fruits',
    unit: 'per dozen',
    inStock: true,
    description: 'Sweet and ripe bananas, rich in potassium'
  },
  {
    id: 'f3',
    name: 'Fresh Oranges',
    price: 80,
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'fruits',
    unit: 'per kg',
    inStock: true,
    description: 'Juicy oranges packed with vitamin C'
  },
  
  // Dairy
  {
    id: 'd1',
    name: 'Fresh Milk',
    price: 55,
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'dairy',
    unit: 'per liter',
    inStock: true,
    description: 'Pure and fresh milk from local dairy farms'
  },
  {
    id: 'd2', 
    name: 'Farm Eggs',
    price: 6,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'dairy',
    unit: 'per piece',
    inStock: true,
    description: 'Fresh farm eggs, rich in protein'
  },
  
  // Grains
  {
    id: 'g1',
    name: 'Basmati Rice',
    price: 180,
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'grains',
    unit: 'per kg',
    inStock: true,
    description: 'Premium quality basmati rice'
  },
  {
    id: 'g2',
    name: 'Wheat Flour',
    price: 45,
    image: 'https://images.pexels.com/photos/1117386/pexels-photo-1117386.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'grains',
    unit: 'per kg',
    inStock: true,
    description: 'Fresh ground wheat flour for rotis and bread'
  },
  
  // Spices
  {
    id: 's1',
    name: 'Turmeric Powder',
    price: 120,
    image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'spices',
    unit: 'per 100g',
    inStock: true,
    description: 'Pure turmeric powder with natural color'
  },
  {
    id: 's2',
    name: 'Red Chili Powder',
    price: 150,
    image: 'https://images.pexels.com/photos/1340113/pexels-photo-1340113.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'spices',
    unit: 'per 100g',
    inStock: true,
    description: 'Spicy red chili powder for authentic taste'
  },
  
  // Household
  {
    id: 'h1',
    name: 'Dish Soap',
    price: 85,
    image: 'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'household',
    unit: 'per bottle',
    inStock: true,
    description: 'Effective dish cleaning soap'
  },
  {
    id: 'h2',
    name: 'Toilet Paper',
    price: 120,
    image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'household',
    unit: 'per pack',
    inStock: true,
    description: 'Soft and absorbent toilet paper'
  }
];