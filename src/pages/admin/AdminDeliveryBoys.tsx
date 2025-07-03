import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  Star,
  Truck,
  User,
  MoreVertical,
  Eye
} from 'lucide-react';
import { DeliveryBoy } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function AdminDeliveryBoys() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState<DeliveryBoy | null>(null);

  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>([
    {
      id: 'db1',
      name: 'Amit Kumar',
      phone: '+91 9876543210',
      email: 'amit@example.com',
      vehicleType: 'bike',
      vehicleNumber: 'DL01AB1234',
      isActive: true,
      isAvailable: true,
      rating: 4.8,
      totalDeliveries: 245,
      createdAt: '2024-01-15',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'db2',
      name: 'Raj Patel',
      phone: '+91 9876543211',
      email: 'raj@example.com',
      vehicleType: 'scooter',
      vehicleNumber: 'DL02CD5678',
      isActive: true,
      isAvailable: false,
      rating: 4.6,
      totalDeliveries: 189,
      createdAt: '2024-01-20',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'db3',
      name: 'Suresh Singh',
      phone: '+91 9876543212',
      vehicleType: 'bicycle',
      vehicleNumber: 'N/A',
      isActive: false,
      isAvailable: false,
      rating: 4.2,
      totalDeliveries: 67,
      createdAt: '2024-02-01'
    },
    {
      id: 'db4',
      name: 'Vikash Yadav',
      phone: '+91 9876543213',
      email: 'vikash@example.com',
      vehicleType: 'bike',
      vehicleNumber: 'DL03EF9012',
      isActive: true,
      isAvailable: true,
      rating: 4.9,
      totalDeliveries: 312,
      createdAt: '2024-01-10',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ]);

  const [newDeliveryBoy, setNewDeliveryBoy] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleType: 'bike' as 'bike' | 'bicycle' | 'scooter' | 'car',
    vehicleNumber: ''
  });

  const filteredDeliveryBoys = deliveryBoys.filter(boy => {
    const matchesSearch = boy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         boy.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && boy.isActive) ||
                         (filterStatus === 'inactive' && !boy.isActive) ||
                         (filterStatus === 'available' && boy.isAvailable) ||
                         (filterStatus === 'busy' && !boy.isAvailable);
    return matchesSearch && matchesFilter;
  });

  const handleAddDeliveryBoy = () => {
    const newBoy: DeliveryBoy = {
      id: `db${Date.now()}`,
      ...newDeliveryBoy,
      isActive: true,
      isAvailable: true,
      rating: 0,
      totalDeliveries: 0,
      createdAt: new Date().toISOString()
    };
    
    setDeliveryBoys([...deliveryBoys, newBoy]);
    setNewDeliveryBoy({
      name: '',
      phone: '',
      email: '',
      vehicleType: 'bike',
      vehicleNumber: ''
    });
    setShowAddModal(false);
  };

  const toggleStatus = (id: string) => {
    setDeliveryBoys(deliveryBoys.map(boy => 
      boy.id === id ? { ...boy, isActive: !boy.isActive } : boy
    ));
  };

  const toggleAvailability = (id: string) => {
    setDeliveryBoys(deliveryBoys.map(boy => 
      boy.id === id ? { ...boy, isAvailable: !boy.isAvailable } : boy
    ));
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'bike': return '🏍️';
      case 'scooter': return '🛵';
      case 'bicycle': return '🚲';
      case 'car': return '🚗';
      default: return '🚚';
    }
  };

  const getStatusColor = (isActive: boolean, isAvailable: boolean) => {
    if (!isActive) return 'bg-red-100 text-red-800';
    if (isAvailable) return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (isActive: boolean, isAvailable: boolean) => {
    if (!isActive) return 'Inactive';
    if (isAvailable) return 'Available';
    return 'Busy';
  };
 const {logout} = useAuth()
  return (
    <div className="space-y-6">
      {/* Header */}
       <button onClick={logout}>logout</button>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delivery Boys</h1>
          <p className="text-gray-600">Manage your delivery team</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Delivery Boy</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Delivery Boys</p>
              <p className="text-2xl font-bold text-gray-900">{deliveryBoys.length}</p>
            </div>
            <Truck className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {deliveryBoys.filter(boy => boy.isActive).length}
              </p>
            </div>
            <User className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {deliveryBoys.filter(boy => boy.isAvailable && boy.isActive).length}
              </p>
            </div>
            <MapPin className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {(deliveryBoys.reduce((sum, boy) => sum + boy.rating, 0) / deliveryBoys.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
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
                placeholder="Search delivery boys..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Boys List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Delivery Boy</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Contact</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Vehicle</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Performance</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDeliveryBoys.map((boy) => (
                <tr key={boy.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      {boy.avatar ? (
                        <img
                          src={boy.avatar}
                          alt={boy.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{boy.name}</p>
                        <p className="text-sm text-gray-500">ID: {boy.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{boy.phone}</span>
                      </div>
                      {boy.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{boy.email}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getVehicleIcon(boy.vehicleType)}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">{boy.vehicleType}</p>
                        <p className="text-xs text-gray-500">{boy.vehicleNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(boy.isActive, boy.isAvailable)}`}>
                        {getStatusText(boy.isActive, boy.isAvailable)}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleStatus(boy.id)}
                          className={`text-xs px-2 py-1 rounded ${boy.isActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                        >
                          {boy.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        {boy.isActive && (
                          <button
                            onClick={() => toggleAvailability(boy.id)}
                            className={`text-xs px-2 py-1 rounded ${boy.isAvailable ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                          >
                            {boy.isAvailable ? 'Set Busy' : 'Set Available'}
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{boy.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{boy.totalDeliveries} deliveries</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedDeliveryBoy(boy)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Delivery Boy Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Delivery Boy</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newDeliveryBoy.name}
                  onChange={(e) => setNewDeliveryBoy({ ...newDeliveryBoy, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={newDeliveryBoy.phone}
                  onChange={(e) => setNewDeliveryBoy({ ...newDeliveryBoy, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="+91 9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={newDeliveryBoy.email}
                  onChange={(e) => setNewDeliveryBoy({ ...newDeliveryBoy, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                <select
                  value={newDeliveryBoy.vehicleType}
                  onChange={(e) => setNewDeliveryBoy({ ...newDeliveryBoy, vehicleType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="bike">Bike</option>
                  <option value="scooter">Scooter</option>
                  <option value="bicycle">Bicycle</option>
                  <option value="car">Car</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number</label>
                <input
                  type="text"
                  value={newDeliveryBoy.vehicleNumber}
                  onChange={(e) => setNewDeliveryBoy({ ...newDeliveryBoy, vehicleNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="DL01AB1234"
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
                onClick={handleAddDeliveryBoy}
                className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Add Delivery Boy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}