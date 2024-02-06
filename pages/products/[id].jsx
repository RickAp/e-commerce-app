import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarCar from '@/components/NavBarCar/NavBarCar';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [randomProducts, setRandomProducts] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };

      fetchProduct();
    }

    const fetchRandomProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 3)); 
      } catch (error) {
        console.error('Error fetching random products:', error);
      }
    };

    fetchRandomProducts();
  }, [id]);

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

  if (!product) return <div>Loading...</div>;

  return (
    
    <div className="flex flex-col items-center my-8">
      <NavbarCar />
      <div className="bg-white shadow-lg rounded-lg md:max-w-2xl lg:max-w-4xl mx-4 mt-24">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="rounded-lg md:w-56 object-cover object-center" src={product.image} alt={product.title} />
          </div>
          <div className="p-8">
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{product.title}</h1>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <div className="mt-4">
              <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{product.category}</span>
            </div>
            <div className="mt-4 mb-2">
              <span className="text-xl font-bold">${product.price}</span>
            </div>
            <button 
              className="mt-4 bg-blue-500 hover:bg-blue-700 duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
              onClick={() => addToCart(product)}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[400px] mx-auto mt-10 ">
        <h2 className="text-2xl font-semibold my-5 text-center">Artículos Más Populares</h2>
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} className="mx-auto">
          {randomProducts.map((item) => (
            <div key={item.id} className="flex justify-center">
              <img src={item.image} alt={item.title} className="mx-auto h-[400px]" />
              <div className="mt-11 text-center">
                <h3 className="text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.category}</p>
                <p className="text-xl font-bold">${item.price}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductDetails;