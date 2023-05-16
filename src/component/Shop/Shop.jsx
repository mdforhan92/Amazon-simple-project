import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import './Shop.css';
import Product from './../Product/Product';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';


// import { addToDb } from '../../utilities/fakedb';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const {totalProducts} = useLoaderData();

    //! pagination 

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);//item per page

    const totalPage = Math.ceil(totalProducts / itemsPerPage);
    
    const pageNumbers = [...Array(totalPage).keys()];

    const options = [5, 10, 20, 30];
    function handleSelectChange(event){
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }



    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    useEffect(() =>{
        async function fetchData(){
            const res = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await res.json();
            setProducts(data);
        }
        fetchData();
    }, [currentPage, itemsPerPage])


    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step 1: get id of the addedProduct
        for (const id in storedCart) {
            //step 2: get product from products by using id 
            const addedProduct = products.find(product => product._id === id)
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
        const exist = cart.find(pd => pd._id === product._id);
        if (!exist) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exist.quantity = exist.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exist];
        }

        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <>
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
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
         {/* Pagination  */}
         <div className='pagination-title'>
         <p>current Page: {currentPage} and items per page: {itemsPerPage} </p>
         </div>
         <div className='pagination'>
                {
                    pageNumbers.map(number => <button 
                        key={number}
                        className={currentPage === number ? 'selected' : '' }
                        onClick={() => setCurrentPage(number)}
                        >{number}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}> 
                {options.map(option => ( <option key={option} value={option}>{option}</option>))} </select>
         </div>
        </>
    );
};

export default Shop;