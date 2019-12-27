import React, { Component } from 'react'
import {detailProduct} from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
state = {
    pageSize: 6,
    pageIndex: 0,
    fetchedProducts: [],
    cart: new Map(),
    totals: {
        subTotal: 0,
        tax: 0,
        total: 0,
        items: 0,
        uniqueItems: 0,
    },

    detailProduct: detailProduct,

    modalOpen: false,
    modalProduct: detailProduct,

    // products: [],
    // cartSubTotal:0,
    // cartTax:0,
    // cartTotal:0
}
componentDidMount(){
    this.setProducts();
}

formatPrice = (price, count = 1) => {
    const formatArgs = [navigator.language, { style: 'currency', currency: 'EUR' }]
    const formattedPrice = (((price.toFixed(2) * 100)|0) * count / 100).toFixed(2)
    return new Intl.NumberFormat(...formatArgs).format(formattedPrice)
}

setProducts = async () => {
    const pageSize = this.state.pageSize
    const pageIndex = this.state.pageIndex
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

    // let tempProducts = [];
    // storeProducts.forEach(item =>{
    //     const singleItem = {...item};
    //     tempProducts = [...tempProducts, singleItem];
    // })

    this.setState(() =>{
        return {
            // products:tempProducts,
            fetchedProducts,
        };
    })
}
changePage = (pageIndex, pageSize) => {
    const newPageSize = pageSize || this.state.pageSize

    this.setState(
        () => ({ pageIndex, pageSize: newPageSize }),
        () => this.setProducts(),
    )
}

getItem = (id) => {
    // const product = this.state.products.find(item => item.id === id);
    // return product;
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

    this.setState(
        () => ({ cart }),
        () => this.addTotals(),
    )

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

increment = (product) => {
    const count = this.state.cart.get(product)
    const cart = this.state.cart.set(product, count + 1)

    this.setState(
        () => ({ cart }),
        () => this.addTotals(),
    )

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

    this.setState(
        () => ({ cart }),
        () => this.addTotals(),
    )

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
removeItem = (id) => {
    const cart = this.state.cart
    cart.delete(id)

    this.setState(
        () => ({ cart }),
        () => this.addTotals(),
    )

    // let tempProducts = [...this.state.products];
    // let tempCart = [...this.state.cart];
    // tempCart = tempCart.filter(item => item.id !== id);

    // const index = tempProducts.indexOf(this.getItem(id));
    // let removedProduct = tempProducts[index];
    // removedProduct.inCart = false;
    // removedProduct.count = 0;
    // removedProduct.total = 0;

    // this.setState(()=>{
    //     return {
    //         cart:[...tempCart],
    //         products:[...tempProducts]
    //     }
    // },
    // ()=>{
    //     this.addTotals();
    // })
}
clearCart = () => {
    const cart = this.state.cart
    cart.clear()

    this.setState(
        () => ({ cart }),
        () => this.addTotals(),
    )

    // this.setState(()=>{
    //     return {cart:[]};
    // },()=>{
    //     this.setProducts();
    //     this.addTotals();
    // });
}
addTotals = () => {
    const cartEntries = Array.from(this.state.cart.entries())

    const subTotal = cartEntries
        .map(([item, count]) => ((item.retail_price.value.toFixed(2) * 100)|0) * count)
        .reduce((acc, val) => acc + val, 0)
    const tax = subTotal * 0.21
    const total = subTotal + tax

    const items = cartEntries
        .map(([item, count]) => count)
        .reduce((acc, val) => acc + val, 0)
    const uniqueItems = cartEntries.length

    this.setState(() => ({ totals: {
        subTotal, tax, total,
        items, uniqueItems,
    } }))

    // let subTotal = 0;
    // this.state.cart.map(item =>(subTotal += item.total));

    // const tempTax = subTotal * 0.1;
    // const tax = parseFloat(tempTax.toFixed(2));
    // const total = subTotal + tax

    // this.setState(() => {
    //     return {
    //         cartSubTotal: subTotal,
    //         cartTax: tax,
    //         cartTotal: total,
    //     }
    // })
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
                formatPrice: this.formatPrice,
                changePage: this.changePage,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
