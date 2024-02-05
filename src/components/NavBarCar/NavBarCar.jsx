import Link from 'next/link';
import { useState, useEffect } from 'react';

const NavbarCar = () => {

    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {

        const countCartItems = () => {
          const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          return cartItems.reduce((total, item) => total + item.quantity, 0);
        };
    
        const updateCartCount = () => {
          const count = countCartItems(); 
          setCartItemCount(count);
        };
    
        updateCartCount();
        window.addEventListener('storage', updateCartCount);
    
        return () => {
            window.removeEventListener('storage', updateCartCount);
        };
    }, []);
  
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10 top-0">
      <div className="container mx-auto sm:px-4 lg:px-8 py-4 flex justify-between items-center">
        <div className='ml-10'>
            <Link href="/">
            <img src='/logo.jpg' className="h-14 w-14" />
            </Link>
        </div>
        <div className='relative mr-10'>
            <Link href="/cart">
                <img src='/car.jpg' className="h-14 w-14" />
            </Link>
            {cartItemCount > 0 && (
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
              {cartItemCount}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarCar;