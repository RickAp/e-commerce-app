import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm, sortProductsAsc, sortProductsDesc } from '@/store/store';

const Navbar = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

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
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
        <Link href="/">
          <img src='/logo.jpg' alt="Logo" className="h-12 w-12 hidden lg:flex" />
        </Link>
        <div className="lg:hidden start-0.5">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        <div className={`lg:flex ${isOpen ? 'flex mt-60 space-y-4 ' : 'hidden'} flex-col lg:flex-row lg:items-center`}>
          <form onSubmit={handleSubmitSearch} className="flex items-center mr-5">
            <input
              type="text"
              placeholder="Buscar productos"
              className="mr-2 border border-gray-300 p-1 rounded outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 duration-300 ease-in-out"
            >
              Buscar
            </button>
          </form>
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 mr-2 duration-300 ease-in-out"
            onClick={() => onSort('asc')}
          >
            Precio Ascendente
          </button>
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 mr-2 duration-300 ease-in-out"
            onClick={() => onSort('desc')}
          >
            Precio Descendente
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 duration-300 ease-in-out"
            onClick={() => dispatch(toggleForm())}
          >
            Añadir Producto
          </button>
        </div>

        <div className='relative'>
          <Link href="/cart">
            <img src='/car.jpg' alt="Carrito" className="h-8 w-8 lg:h-10 lg:w-10 mr-3" />
          </Link>
          {cartItemCount > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {cartItemCount}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;