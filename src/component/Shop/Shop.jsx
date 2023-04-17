import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import './Shop.css';
import Product from './../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';


// import { addToDb } from '../../utilities/fakedb';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step 1: get id of the addedProduct
        for (const id in storedCart) {
            //step 2: get product from products by using id 
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                //step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //step 4: add the addedProduct to the saved cart
                savedCart.push(addedProduct);
            }
        }
        //step 5: set the cart
        setCart(savedCart);
    }, [products])

    const handlerAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart , then set quantity = 1
        //if exist update quantity by 1
        const exist = cart.find(pd => pd.id === product.id);
        if (!exist) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exist.quantity = exist.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exist];
        }

        setCart(newCart);
        addToDb(product.id)
    }

    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handlerAddToCart={handlerAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart 
                    cart={cart}
                    handleClearCart={handleClearCart}
                    >
                    <Link className='proceed-link' to="/orders">
                    <button className='btn-proceed'>Review Order</button>
                    </Link>
                    </Cart>
            </div>
        </div>
    );
};

export default Shop;