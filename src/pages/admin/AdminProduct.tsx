import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  Leaf,
  Shirt,
  Sparkles,
  UtensilsCrossed,
  ArrowLeft
} from 'lucide-react';
import { Product } from '../../types';
import { products as initialProducts } from '../../data/products';

export function AdminProducts() {
  const { category } = useParams();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState(category || 'all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    category: category || 'vegetables',
    unit: '',
    description: ''
  });

  const categories = [
    { id: 'all', name: 'All Products', icon: Package, color: 'text-gray-600' },
    { id: 'vegetables', name: 'Vegetables & Grocery', icon: Leaf, color: 'text-green-600' },
    { id: 'fruits', name: 'Fruits', icon: Leaf, color: 'text-green-600' },
    { id: 'dairy', name: 'Dairy', icon: Leaf, color: 'text-blue-600' },
    { id: 'grains', name: 'Grains', icon: Leaf, color: 'text-yellow-600' },
    { id: 'spices', name: 'Spices', icon: Leaf, color: 'text-red-600' },
    { id: 'household', name: 'Household', icon: Leaf, color: 'text-purple-600' },
    { id: 'fashion', name: 'Fashion', icon: Shirt, color: 'text-pink-600' },
    { id: 'beauty', name: 'Beauty', icon: Sparkles, color: 'text-purple-600' },
    { id: 'food', name: 'Food & Beverages', icon: UtensilsCrossed, color: 'text-orange-600' }
  ];

  const getCategoryData = () => {
    switch (category) {
      case 'grocery':
        return {
          title: 'Vegetables & Grocery',
          description: 'Fresh vegetables, fruits, dairy, grains, and household items',
          categories: ['vegetables', 'fruits', 'dairy', 'grains', 'spices', 'household'],
          color: 'emerald'
        };
      case 'fashion':
        return {
          title: 'Fashion',
          description: 'Clothing, accessories, and footwear',
          categories: ['fashion'],
          color: 'pink'
        };
      case 'beauty':
        return {
          title: 'Beauty',
          description: 'Skincare, makeup, haircare, and personal care products',
          categories: ['beauty'],
          color: 'purple'
        };
      case 'food':
        return {
          title: 'Food & Beverages',
          description: 'Ready-to-eat food, snacks, and beverages',
          categories: ['food'],
          color: 'orange'
        };
      default:
        return {
          title: 'All Products',
          description: 'Manage all your products across categories',
          categories: [],
          color: 'gray'
        };
    }
  };

  const categoryData = getCategoryData();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (category && category !== 'all') {
      if (category === 'grocery') {
        matchesCategory = ['vegetables', 'fruits', 'dairy', 'grains', 'spices', 'household'].includes(product.category);
      } else {
        matchesCategory = product.category === category;
      }
    } else if (filterCategory !== 'all') {
      matchesCategory = product.category === filterCategory;
    }
    
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    const product: Product = {
      id: `p${Date.now()}`,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : undefined,
      image: newProduct.image || 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: newProduct.category,
      unit: newProduct.unit,
      inStock: true,
      description: newProduct.description,
      createdAt: new Date().toISOString()
    };
    
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      price: '',
      originalPrice: '',
      image: '',
      category: category || 'vegetables',
      unit: '',
      description: ''
    });
    setShowAddModal(false);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const getProductStats = () => {
    const total = filteredProducts.length;
    const inStock = filteredProducts.filter(p => p.inStock).length;
    const outOfStock = total - inStock;
    const totalValue = filteredProducts.reduce((sum, p) => sum + p.price, 0);
    
    return { total, inStock, outOfStock, totalValue };
  };

  const stats = getProductStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {category && (
            <button
              onClick={() => navigate('/admin/products')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{categoryData.title}</h1>
            <p className="text-gray-600">{categoryData.description}</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className={`bg-${categoryData.color}-500 hover:bg-${categoryData.color}-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors`}
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Category Navigation */}
      {!category && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/products/grocery')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
            >
              <Leaf className="w-8 h-8 text-emerald-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Vegetables & Grocery</span>
              <span className="text-xs text-gray-500">
                {products.filter(p => ['vegetables', 'fruits', 'dairy', 'grains', 'spices', 'household'].includes(p.category)).length} items
              </span>
            </button>
            <button
              onClick={() => navigate('/admin/products/fashion')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors"
            >
              <Shirt className="w-8 h-8 text-pink-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Fashion</span>
              <span className="text-xs text-gray-500">
                {products.filter(p => p.category === 'fashion').length} items
              </span>
            </button>
            <button
              onClick={() => navigate('/admin/products/beauty')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <Sparkles className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Beauty</span>
              <span className="text-xs text-gray-500">
                {products.filter(p => p.category === 'beauty').length} items
              </span>
            </button>
            <button
              onClick={() => navigate('/admin/products/food')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              <UtensilsCrossed className="w-8 h-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Food & Beverages</span>
              <span className="text-xs text-gray-500">0 items</span>
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Stock</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inStock}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold">✓</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-bold">✗</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.totalValue.toLocaleString()}</p>
            </div>
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <span className="text-emerald-600 font-bold">₹</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          {!category && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
              {product.originalPrice && (
                <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-gray-600 mb-2 capitalize">{product.category} • {product.unit}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>View</span>
                </button>
                <button className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Product</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter product name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                  <input
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="dairy">Dairy</option>
                  <option value="grains">Grains</option>
                  <option value="spices">Spices</option>
                  <option value="household">Household</option>
                  <option value="fashion">Fashion</option>
                  <option value="beauty">Beauty</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <input
                  type="text"
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="per kg, per piece, per liter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Product description"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}