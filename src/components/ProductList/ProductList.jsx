import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function ProductList({ sortDirection }) {

  const [products, setProducts] = useState([]);
  const formProducts = useSelector((state) => state?.product?.products);
  const searchTerm = useSelector((state) => state.product.searchTerm);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // API fakestore
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error Products API', error);
      }
    };

    fetchProducts();
  }, []);

  const allProducts = [...formProducts, ...products];

  const filteredProducts = searchTerm
    ? allProducts.filter((product) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          product.title.toLowerCase().includes(searchLower) ||
          product.price.toString().startsWith(searchLower)
        );
      })
    : allProducts;

  const sortedProducts = filteredProducts.sort((a, b) => {
    return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
  });

  const addToCart = (product) => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  return (
    <div className="container mx-auto sm:px-10 lg:px-36 py-8"> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> 
        {sortedProducts.map(product => (
          <div key={product?.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-3 duration-300 ease-in-out">
            <Link href={`/products/${product.id}`}>
              <img src={product?.image} alt={product?.title} className="w-full h-48 object-cover object-center" /> 
            </Link>
            <div className="p-4">
              <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product?.category}</span>
              <h2 className="text-md font-semibold">{product?.title}</h2> 
              <p className="text-lg font-bold mt-1">${product?.price}</p> 
              <button 
                className="text-white bg-blue-500 hover:bg-blue-600 duration-300 ease-in-out rounded-full px-4 py-2 flex items-center justify-center mt-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                onClick={() => addToCart(product)}
              >
                <p>Añadir al carrito</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}