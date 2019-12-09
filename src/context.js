import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
state = {
    fetchedProducts: [],
    products: [],
    detailProduct: detailProduct,
    cart: new Map(),
    modalOpen:false,
    modalProduct: detailProduct,
    cartSubTotal:0,
    cartTax:0,
    cartTotal:0
}
componentDidMount(){
    this.setProducts();
}
setProducts = async () => {
    // TODO: Fetch products from API

    const pageSize = 6
    const pageIndex = 0
    const pageOffset = pageIndex * pageSize

    const url = `https://api.musement.com/api/v3/venues/164/activities?limit=${pageSize}&offset=${pageOffset}`

    let fetchedProducts = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'accept-language': 'it',
            'x-musement-currency': 'EUR',
            'x-musement-version': '3.4.0',
        }
    })

    fetchedProducts = await fetchedProducts.json()

    // TODO: Save fetched products into `products`

    let tempProducts = [];
    storeProducts.forEach(item =>{
        const singleItem = {...item};
        tempProducts = [...tempProducts, singleItem];
    })

    this.setState(() =>{
        return {
            products:tempProducts,
            fetchedProducts,
        };
    })
}

getItem = (id) => {
    const product = this.state.products.find(item => item.id === id);
    return product;
}

handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(()=>{
        return {detailProduct:product}
    })
}

addToCart = (product) => {
    const count = this.state.cart.get(product)
    const cart = this.state.cart.set(product, count ? count + 1 : 1)

    this.setState(() => ({ cart }))

    // let tempProducts = [...this.state.products];
    // const index = tempProducts.indexOf(this.getItem(id));
    // const product = tempProducts[index];
    // product.inCart = true;
    // product.count = 1;
    // const price = product.price;
    // product.total = price;

    // this.setState(
    //     () => ({ products: tempProducts, cart: [...this.state.cart, product] }),
    //     () => this.addTotals(),
    // )

// this.setState(()=>{
//     return{ products: tempProducts, cart:[...this.state.cart, product] };
// },
// ()=>{
//     this.addTotals();
// })
}
openModal = id =>{
    const product = this.getItem(id);
    this.setState(()=>{
        return{modalProduct:product,modalOpen:true}
    })
}
closeModal = () =>{
    this.setState(()=>{
        return {modalOpen:false}
    })
}
increment = (product) =>{
    const count = this.state.cart.get(product)
    const cart = this.state.cart.set(product, count + 1)

    this.setState(() => ({ cart }))

    // let tempCart = [...this.state.cart];
    // const selectedProduct = tempCart.find(item=>item.id === id)

    // const index = tempCart.indexOf(selectedProduct);
    // const product = tempCart[index];

    // product.count = product.count + 1;
    // product.total = product.count * product.price;

    // this.setState(()=>{return{cart:[...tempCart]}},()=>{this.addTotals()})

}
decrement = (product) => {
    const count = this.state.cart.get(product)
    const cart = this.state.cart.set(product, count - 1)

    this.setState(() => ({ cart }))

    if (count < 1) {
        this.removeItem(product)
    }


    // let tempCart = [...this.state.cart];
    // const selectedProduct = tempCart.find(item=>item.id === id)

    // const index = tempCart.indexOf(selectedProduct);
    // const product = tempCart[index];

    // product.count = product.count -1;
    // if(product.count === 0){
    //     this.removeItem(id)
    // }else{
    //     product.total = product.count * product.price;
    //     this.setState(()=>{return{cart:[...tempCart]}},()=>{this.addTotals()});
    // }

}
removeItem = (id)=>{
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

tempCart = tempCart.filter(item => item.id !== id)
;
const index = tempProducts.indexOf(this.getItem(id));
let removedProduct = tempProducts[index];
removedProduct.inCart = false;
removedProduct.count = 0;
removedProduct.total = 0;

this.setState(()=>{
    return{
        cart:[...tempCart],
        products:[...tempProducts]
    }
},
()=>{
    this.addTotals();
})
}
clearCart = ()=>{
    this.setState(()=>{
        return {cart:[]};
    },()=>{
        this.setProducts();
        this.addTotals();
    });
}
addTotals = () =>{
    let subTotal = 0;
    this.state.cart.map(item =>(subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax
    this.setState(()=>{
        return{
            cartSubTotal:subTotal,
            cartTax:tax,
            cartTotal:total
        }
    })
}
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
