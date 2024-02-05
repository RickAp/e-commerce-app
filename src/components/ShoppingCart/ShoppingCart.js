import React, { useEffect, useState } from 'react';
import NavbarCar from '../NavBarCar/NavBarCar';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, []);

    const removeFromCart = (productToRemove) => {
        const updatedCartItems = cartItems.filter(product => product.id !== productToRemove.id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className='mx-5'>
            <NavbarCar />
            <div className="container mx-auto sm:px-10 lg:px-36 py-8 mt-20">
                <h2 className="text-2xl font-bold mb-4 text-center">Carrito de Compras</h2>
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center mb-4 mt-11">
                            <div className="flex items-center">
                                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                                <div>
                                    <p>{item.title}</p>
                                    <p>${item.price} x {item.quantity}</p>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 duration-300 ease-in-out">
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <div className="text-right font-bold mt-4">
                        Total: ${calculateTotal()}
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default ShoppingCart;