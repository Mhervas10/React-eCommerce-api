import React from 'react';
import {Link} from 'react-router-dom'

const CartTotals = ({ value, formatPrice }) => {
    const { totals, clearCart } = value;
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="mt-2 text-right col-10 ml-sm-5 ml-md-auto col-sm-8 text-capitalize">
                        <Link to='/'>
                            <button className="px-5 mb-3 btn btn-outline-danger text-uppercase" type="button" onClick={()=>clearCart()}>
                                clear cart
                            </button>
                        </Link>
                        <h5>
                            <span className="text-title">subtotal: </span>
                            <strong>{formatPrice(totals.subTotal / 100)}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">tax: </span>
                            <strong>{formatPrice(totals.tax / 100)}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">total: </span>
                            <strong>{formatPrice(totals.total / 100)}</strong>
                        </h5>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CartTotals;
