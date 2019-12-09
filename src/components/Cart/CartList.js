import React from 'react';
import CartItem from './CartItem'

const CartList = ({value}) => {
    const {cart} = value

    return (
        <div className="container-fluid">
            {Array.from(cart.entries()).map(([item, count], index)=>{
                return <CartItem key={index} item={item} value={value} count={count}></CartItem>
            })}
        </div>
    );
}

export default CartList;
