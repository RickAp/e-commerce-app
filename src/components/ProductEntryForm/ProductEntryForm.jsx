import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, toggleForm, addProduct } from '@/store/store';
import toast from 'react-hot-toast';

const ProductEntryForm = ({ onSave }) => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
  });

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product?.title && product?.price && product?.image && product?.category) {
        const id = Math.max(0, ...products.map(p => p.id)) + 1;
        dispatch(addProduct({ ...product, id }));
        dispatch(toggleForm());
        setProduct({ title: '', price: '', image: '', category: '' });
    } else {
        toast.error('Los campos son obligatorios');
    }
  };

  const closeModal = () => {
    dispatch(toggleForm());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
                <div className="flex justify-between items-center pb-3">
                    <p className="text-2xl font-bold">Agregar Nuevo Producto</p>
                    <div className="cursor-pointer z-50" onClick={closeModal}>
                        <svg className="fill-current text-black mt-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                            <path d="M15 3.41L13.59 2 9 6.59 4.41 2 3 3.41 7.59 8 3 12.59 4.41 14 9 9.41 13.59 14 15 12.59 10.41 8z"/>
                        </svg>
                    </div>
                </div>
            
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                            Categoria
                        </label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            value={product?.category}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Nombre del Producto
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={product?.title}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Precio
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            value={product?.price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            URL de Imagen
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="text"
                            value={product?.image}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Guardar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default ProductEntryForm;

