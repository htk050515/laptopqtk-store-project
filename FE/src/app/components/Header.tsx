import React, { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Search, Menu, X, Laptop, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Header: React.FC = () => {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/support" className="hover:underline">Support</Link>
            <Link to="/account" className="hover:underline">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Laptop className="w-8 h-8 text-primary" />
            <div>
              <div className="text-xl font-bold text-gray-900">LapTopQTK</div>
              <div className="text-xs text-gray-500">Laptops & Accessories</div>
            </div>
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for laptops, accessories..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/account"
              className="hidden md:flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-sm">Account</span>
            </Link>
            
            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
              <span className="hidden md:block text-sm">Cart</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar - mobile */}
        <div className="lg:hidden mt-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4">
          <ul className="hidden lg:flex items-center gap-8 py-3">
            <li>
              <Link to="/laptops/student-office" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Student & Office
              </Link>
            </li>
            <li>
              <Link to="/laptops/gaming" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Gaming Laptops
              </Link>
            </li>
            <li>
              <Link to="/laptops/business" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Business
              </Link>
            </li>
            <li>
              <Link to="/laptops/design-engineering" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Design & Engineering
              </Link>
            </li>
            <li>
              <Link to="/accessories" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Accessories
              </Link>
            </li>
            <li>
              <Link to="/deals" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                Deals
              </Link>
            </li>
          </ul>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <ul className="lg:hidden py-4 space-y-2">
              <li>
                <Link to="/laptops/student-office" className="block py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Student & Office
                </Link>
              </li>
              <li>
                <Link to="/laptops/gaming" className="block py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Gaming Laptops
                </Link>
              </li>
              <li>
                <Link to="/laptops/business" className="block py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/laptops/design-engineering" className="block py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Design & Engineering
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="block py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/deals" className="block py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                  Deals
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};