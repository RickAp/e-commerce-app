import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
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
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="flex justify-center my-8">
      <div className="bg-white shadow-lg rounded-lg md:max-w-2xl lg:max-w-4xl mx-4">
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
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;