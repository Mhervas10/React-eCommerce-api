import React, { Component } from 'react';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import {ProductConsumer} from '../../context';
import CartList from "./CartList";
import CartTotals from './CartTotals';

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value =>{
                        const { cart, formatPrice } =value;
                        if(cart){
                            return(
                                <React.Fragment>
                                    <Title name="your" title="cart"></Title>
                                    <CartColumns></CartColumns>
                                    <CartList value={value}></CartList>
                                    <CartTotals value={value} formatPrice={formatPrice}></CartTotals>
                                </React.Fragment>
                            );
                        }
                        else{
                            return(
                            <EmptyCart>
                            </EmptyCart>);
                        }
                    }}
                </ProductConsumer>

            </section>
        )
    }
}
