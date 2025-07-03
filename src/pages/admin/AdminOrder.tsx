import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Phone, 
  MessageCircle,
  Clock,
  CheckCircle,
  Truck,
  Package,
  AlertCircle,
  User,
  MapPin
} from 'lucide-react';
import { Order, DeliveryBoy } from '../../types';

export function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock delivery boys data
  const deliveryBoys: DeliveryBoy[] = [
    {
      id: 'db1',
      name: 'Amit Kumar',
      phone: '+91 9876543210',
      vehicleType: 'bike',
      vehicleNumber: 'DL01AB1234',
      isActive: true,
      isAvailable: true,
      rating: 4.8,
      totalDeliveries: 245,
      createdAt: '2024-01-15'
    },
    {
      id: 'db2',
      name: 'Raj Patel',
      phone: '+91 9876543211',
      vehicleType: 'scooter',
      vehicleNumber: 'DL02CD5678',
      isActive: true,
      isAvailable: true,
      rating: 4.6,
      totalDeliveries: 189,
      createdAt: '2024-01-20'
    }
  ];

  // Mock orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerId: 'cust1',
      customerName: 'Rahul Sharma',
      customerPhone: '+91 9876543210',
      items: [
        { product: { id: 'p1', name: 'Fresh Tomatoes', price: 40, image: '', category: 'vegetables', unit: 'per kg', inStock: true }, quantity: 2 },
        { product: { id: 'p2', name: 'Basmati Rice', price: 180, image: '', category: 'grains', unit: 'per kg', inStock: true }, quantity: 1 }
      ],
      total: 260,
      deliveryAddress: {
        id: 'addr1',
        type: 'home',
        name: 'Rahul Sharma',
        phone: '+91 9876543210',
        address: '123 Main Street, Village Center',
        pincode: '123456',
        isDefault: true
      },
      paymentMethod: 'upi',
      paymentStatus: 'completed',
      orderStatus: 'delivered',
      deliveryBoyId: 'db1',
      deliveryBoy: deliveryBoys[0],
      estimatedDeliveryTime: '2024-01-15T14:30:00Z',
      actualDeliveryTime: '2024-01-15T14:25:00Z',
      createdAt: '2024-01-15T12:00:00Z',
      updatedAt: '2024-01-15T14:25:00Z'
    },
    {
      id: 'ORD002',
      customerId: 'cust2',
      customerName: 'Priya Singh',
      customerPhone: '+91 9876543211',
      items: [
        { product: { id: 'p3', name: 'Fresh Milk', price: 55, image: '', category: 'dairy', unit: 'per liter', inStock: true }, quantity: 2 },
        { product: { id: 'p4', name: 'Wheat Flour', price: 45, image: '', category: 'grains', unit: 'per kg', inStock: true }, quantity: 1 }
      ],
      total: 155,
      deliveryAddress: {
        id: 'addr2',
        type: 'home',
        name: 'Priya Singh',
        phone: '+91 9876543211',
        address: '456 Garden Road, Village East',
        pincode: '123457',
        isDefault: true
      },
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      orderStatus: 'out_for_delivery',
      deliveryBoyId: 'db2',
      deliveryBoy: deliveryBoys[1],
      estimatedDeliveryTime: '2024-01-15T16:00:00Z',
      createdAt: '2024-01-15T14:30:00Z',
      updatedAt: '2024-01-15T15:00:00Z'
    },
    {
      id: 'ORD003',
      customerId: 'cust3',
      customerName: 'Suresh Gupta',
      customerPhone: '+91 9876543212',
      items: [
        { product: { id: 'p5', name: 'Fresh Apples', price: 120, image: '', category: 'fruits', unit: 'per kg', inStock: true }, quantity: 1 }
      ],
      total: 120,
      deliveryAddress: {
        id: 'addr3',
        type: 'work',
        name: 'Suresh Gupta',
        phone: '+91 9876543212',
        address: '789 Office Complex, Business District',
        pincode: '123458',
        isDefault: false
      },
      paymentMethod: 'upi',
      paymentStatus: 'completed',
      orderStatus: 'preparing',
      createdAt: '2024-01-15T15:00:00Z',
      updatedAt: '2024-01-15T15:00:00Z'
    }
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerPhone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || order.orderStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-indigo-100 text-indigo-800';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'preparing': return <Package className="w-4 h-4" />;
      case 'ready': return <Package className="w-4 h-4" />;
      case 'out_for_delivery': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string, deliveryBoyId?: string) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = {
          ...order,
          orderStatus: newStatus as any,
          updatedAt: new Date().toISOString()
        };
        
        if (deliveryBoyId) {
          const deliveryBoy = deliveryBoys.find(db => db.id === deliveryBoyId);
          updatedOrder.deliveryBoyId = deliveryBoyId;
          updatedOrder.deliveryBoy = deliveryBoy;
        }
        
        return updatedOrder;
      }
      return order;
    }));
  };

  const assignDeliveryBoy = (orderId: string, deliveryBoyId: string) => {
    updateOrderStatus(orderId, 'out_for_delivery', deliveryBoyId);
  };

  const getOrderStats = () => {
    const total = orders.length;
    const pending = orders.filter(o => o.orderStatus === 'pending').length;
    const preparing = orders.filter(o => ['confirmed', 'preparing', 'ready'].includes(o.orderStatus)).length;
    const outForDelivery = orders.filter(o => o.orderStatus === 'out_for_delivery').length;
    const delivered = orders.filter(o => o.orderStatus === 'delivered').length;
    
    return { total, pending, preparing, outForDelivery, delivered };
  };

  const stats = getOrderStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Preparing</p>
              <p className="text-2xl font-bold text-gray-900">{stats.preparing}</p>
            </div>
            <Package className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out for Delivery</p>
              <p className="text-2xl font-bold text-gray-900">{stats.outForDelivery}</p>
            </div>
            <Truck className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
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
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Order</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Items</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Total</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Delivery Boy</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{order.customerPhone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm text-gray-900">{order.items.length} items</p>
                      <p className="text-xs text-gray-500">
                        {order.items.map(item => item.product.name).join(', ')}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">₹{order.total}</p>
                      <p className="text-xs text-gray-500 capitalize">{order.paymentMethod}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                        {getStatusIcon(order.orderStatus)}
                        <span className="capitalize">{order.orderStatus.replace('_', ' ')}</span>
                      </span>
                      <div className="flex space-x-1">
                        {order.orderStatus === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          >
                            Confirm
                          </button>
                        )}
                        {order.orderStatus === 'confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                          >
                            Start Preparing
                          </button>
                        )}
                        {order.orderStatus === 'preparing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                          >
                            Mark Ready
                          </button>
                        )}
                        {order.orderStatus === 'out_for_delivery' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                          >
                            Mark Delivered
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {order.deliveryBoy ? (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{order.deliveryBoy.name}</p>
                          <p className="text-xs text-gray-500">{order.deliveryBoy.phone}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Not assigned</p>
                        {(order.orderStatus === 'ready' || order.orderStatus === 'confirmed') && (
                          <select
                            onChange={(e) => e.target.value && assignDeliveryBoy(order.id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                            defaultValue=""
                          >
                            <option value="">Assign Delivery Boy</option>
                            {deliveryBoys.filter(db => db.isAvailable).map(db => (
                              <option key={db.id} value={db.id}>{db.name}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Order Details - {selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedOrder.customerPhone}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Delivery Address</h4>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">{selectedOrder.deliveryAddress.name}</p>
                    <p className="text-gray-600">{selectedOrder.deliveryAddress.address}</p>
                    <p className="text-gray-600">Pincode: {selectedOrder.deliveryAddress.pincode}</p>
                    <p className="text-gray-600">{selectedOrder.deliveryAddress.phone}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600">{item.product.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item.product.price} × {item.quantity}</p>
                        <p className="text-sm text-gray-600">₹{item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="font-bold text-lg">₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Order Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Payment Method:</span>
                    <span className="capitalize">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedOrder.paymentStatus === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Order Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.orderStatus)}`}>
                      {selectedOrder.orderStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}