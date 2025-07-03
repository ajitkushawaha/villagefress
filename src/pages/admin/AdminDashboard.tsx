import React from 'react';
import {
    Package,
    ShoppingCart,
    Users,
    Truck,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle,
    AlertCircle,
    DollarSign
} from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        {
            title: 'Total Products',
            value: '1,234',
            change: '+12%',
            trend: 'up',
            icon: Package,
            color: 'bg-blue-500'
        },
        {
            title: 'Total Orders',
            value: '856',
            change: '+8%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'bg-emerald-500'
        },
        {
            title: 'Active Customers',
            value: '2,341',
            change: '+15%',
            trend: 'up',
            icon: Users,
            color: 'bg-purple-500'
        },
        {
            title: 'Delivery Boys',
            value: '24',
            change: '+2',
            trend: 'up',
            icon: Truck,
            color: 'bg-orange-500'
        },
        {
            title: 'Revenue Today',
            value: '₹45,678',
            change: '+23%',
            trend: 'up',
            icon: DollarSign,
            color: 'bg-green-500'
        },
        {
            title: 'Pending Orders',
            value: '12',
            change: '-5%',
            trend: 'down',
            icon: Clock,
            color: 'bg-yellow-500'
        }
    ];

    const recentOrders = [
        {
            id: 'ORD001',
            customer: 'Rahul Sharma',
            items: 5,
            total: '₹1,250',
            status: 'delivered',
            time: '2 hours ago',
            deliveryBoy: 'Amit Kumar'
        },
        {
            id: 'ORD002',
            customer: 'Priya Singh',
            items: 3,
            total: '₹850',
            status: 'out_for_delivery',
            time: '30 min ago',
            deliveryBoy: 'Raj Patel'
        },
        {
            id: 'ORD003',
            customer: 'Suresh Gupta',
            items: 8,
            total: '₹2,100',
            status: 'preparing',
            time: '15 min ago',
            deliveryBoy: 'Pending'
        },
        {
            id: 'ORD004',
            customer: 'Anita Verma',
            items: 2,
            total: '₹450',
            status: 'confirmed',
            time: '5 min ago',
            deliveryBoy: 'Pending'
        }
    ];

    const topProducts = [
        { name: 'Fresh Tomatoes', sold: 145, revenue: '₹5,800' },
        { name: 'Basmati Rice', sold: 89, revenue: '₹16,020' },
        { name: 'Cotton Kurta', sold: 67, revenue: '₹87,033' },
        { name: 'Face Wash', sold: 54, revenue: '₹8,046' },
        { name: 'Fresh Milk', sold: 234, revenue: '₹12,870' }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'out_for_delivery': return 'bg-blue-100 text-blue-800';
            case 'preparing': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered': return <CheckCircle className="w-4 h-4" />;
            case 'out_for_delivery': return <Truck className="w-4 h-4" />;
            case 'preparing': return <Clock className="w-4 h-4" />;
            case 'confirmed': return <AlertCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
                </div>
                <div className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleString()}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                    <div className={`flex items-center space-x-1 mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        <TrendIcon className="w-4 h-4" />
                                        <span className="text-sm font-medium">{stat.change}</span>
                                    </div>
                                </div>
                                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                            <button className="text-emerald-600 font-medium text-sm hover:text-emerald-700">
                                View All
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{order.id}</p>
                                            <p className="text-sm text-gray-600">{order.customer}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">{order.total}</p>
                                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span className="capitalize">{order.status.replace('_', ' ')}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <span className="text-emerald-600 font-bold text-sm">{index + 1}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-600">{product.sold} sold</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">{product.revenue}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                        <Package className="w-8 h-8 text-emerald-600 mb-2" />
                        <span className="text-sm font-medium text-gray-900">Add Product</span>
                    </button>
                    <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                        <Truck className="w-8 h-8 text-emerald-600 mb-2" />
                        <span className="text-sm font-medium text-gray-900">Add Delivery Boy</span>
                    </button>
                    <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                        <ShoppingCart className="w-8 h-8 text-emerald-600 mb-2" />
                        <span className="text-sm font-medium text-gray-900">View Orders</span>
                    </button>
                    <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                        <Users className="w-8 h-8 text-emerald-600 mb-2" />
                        <span className="text-sm font-medium text-gray-900">Manage Customers</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default AdminDashboard