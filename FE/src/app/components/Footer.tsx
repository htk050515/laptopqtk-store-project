import React from 'react';
import { Link } from 'react-router';
import { Laptop, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Laptop className="w-8 h-8 text-primary" />
              <div className="text-white font-bold text-lg">TechStore</div>
            </div>
            <p className="text-sm mb-4">
              Your trusted source for high-quality laptops and accessories. Genuine products, professional service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-primary transition-colors">Warranty Policy</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary transition-colors">Shipping Information</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary transition-colors">Returns & Exchanges</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/laptops/student-office" className="hover:text-primary transition-colors">Student Laptops</Link>
              </li>
              <li>
                <Link to="/laptops/gaming" className="hover:text-primary transition-colors">Gaming Laptops</Link>
              </li>
              <li>
                <Link to="/laptops/business" className="hover:text-primary transition-colors">Business Laptops</Link>
              </li>
              <li>
                <Link to="/laptops/design-engineering" className="hover:text-primary transition-colors">Workstations</Link>
              </li>
              <li>
                <Link to="/accessories" className="hover:text-primary transition-colors">Accessories</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>123 Tech Street, Silicon Valley, CA 94000</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:support@techstore.com" className="hover:text-primary transition-colors">support@techstore.com</a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm font-semibold text-white mb-2">Business Hours:</p>
              <p className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-sm">Sat: 10:00 AM - 4:00 PM</p>
              <p className="text-sm">Sun: Closed</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2026 TechStore. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};