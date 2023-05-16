import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {

    //if cart data is in database, you have to use async await
    const storeCart = getShoppingCart();
    const ids = Object.keys(storeCart);
    console.log(ids);
    const loadedProducts = await fetch('http://localhost:5000/productsByIds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ids)
    })
    const products = await loadedProducts.json();
    console.log('Products by id',products);
    

    const savedCart = [];


    for(const id in storeCart){
        const addedProduct = products.find(pd => pd._id === id);
        if(addedProduct){
            const quantity = storeCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }


    console.log(products);
    return savedCart;
}
export default cartProductsLoader;