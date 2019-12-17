import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from '../context';

export default class ProductList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="products"></Title>
                        <div className="row">
                            <ProductConsumer>
                                {value => value.fetchedProducts.map((product, index) =>{
                                    return <Product key={index} product={product} formatPrice={value.formatPrice} />
                                })}
                            </ProductConsumer>
                            <ProductConsumer>
                                {({ changePage, pageIndex }) => <button onClick={() => changePage(--pageIndex)}>Prev Page</button>}
                            </ProductConsumer>
                            <ProductConsumer>
                                {({ changePage, pageIndex, pageSize }) => {
                                    return <input type="number" min="6" max="72" step="6" value={pageSize}
                                        onChange={(event) => changePage(pageIndex, event.target.value)} />
                                }}
                            </ProductConsumer>
                            <ProductConsumer>
                                {({ changePage, pageIndex }) => <button onClick={() => changePage(++pageIndex)}>Next Page</button>}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            //    <Product></Product>

        )
    }
}
