import { createBrowserRouter, RouterProvider } from 'react-router';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { HomePage } from '@/app/pages/HomePage';
import { ProductListPage } from '@/app/pages/ProductListPage';
import { ProductDetailPage } from '@/app/pages/ProductDetailPage';
import { CartPage } from '@/app/pages/CartPage';
import { AccountPage } from '@/app/pages/AccountPage';
import { Toaster } from 'sonner';

// Layout wrapper component
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><HomePage /></Layout>,
  },
  {
    path: "/laptops/:category",
    element: <Layout><ProductListPage /></Layout>,
  },
  {
    path: "/accessories",
    element: <Layout><ProductListPage /></Layout>,
  },
  {
    path: "/product/:slug",
    element: <Layout><ProductDetailPage /></Layout>,
  },
  {
    path: "/cart",
    element: <Layout><CartPage /></Layout>,
  },
  {
    path: "/account",
    element: <Layout><AccountPage /></Layout>,
  },
]);

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
