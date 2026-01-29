import React from 'react';
import { Package, User, MapPin, CreditCard, Heart } from 'lucide-react';

export const AccountPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">John Doe</h2>
                <p className="text-sm text-gray-600">john.doe@example.com</p>
              </div>
            </div>
            <button className="w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-12 h-12 text-primary" />
              <span className="text-3xl font-bold text-gray-900">5</span>
            </div>
            <h3 className="font-semibold text-gray-900">Orders</h3>
            <p className="text-sm text-gray-600">Track and manage orders</p>
          </div>

          {/* Wishlist */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-12 h-12 text-primary" />
              <span className="text-3xl font-bold text-gray-900">12</span>
            </div>
            <h3 className="font-semibold text-gray-900">Wishlist</h3>
            <p className="text-sm text-gray-600">View saved items</p>
          </div>

          {/* Addresses */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <MapPin className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Addresses</h3>
            <p className="text-sm text-gray-600 mb-4">Manage shipping addresses</p>
            <button className="text-primary hover:text-blue-700 font-medium text-sm">
              View Addresses
            </button>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <CreditCard className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Payment Methods</h3>
            <p className="text-sm text-gray-600 mb-4">Manage payment options</p>
            <button className="text-primary hover:text-blue-700 font-medium text-sm">
              Manage Payments
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>
          <div className="text-center py-8 text-gray-500">
            No orders yet. Start shopping to see your order history here.
          </div>
        </div>
      </div>
    </div>
  );
};
