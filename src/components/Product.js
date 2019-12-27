import React, { Component } from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
import PropTypes from 'prop-types'

export default class Product extends Component {
    render() {
        const { product, formatPrice } = this.props
        const {
            uuid: id,
            title,
            cover_image_url: img,
            retail_price: { value: price = 210 },
            // inCart = false
        } = product;

        return (
            <ProductWrapper className="my-3 col-9 col-md-6 col-lg-4">
                <div className="card">
                    <ProductConsumer>
                    {(value)=>(
                    <div className="p-5 img-container"
                        onClick={()=>
                            value.handleDetail(id)
                        }>
                            <Link to='/details'>
                                <img src={img} alt="product" className="card-img-top"/>
                            </Link>
                            <button className="cart-btn" onClick={()=>{
                            value.addToCart(product);
                            // value.openModal(id);
                        }}>
                            <i className="fas fa-cart-plus"></i>
                        </button>
                    </div>)}

                    </ProductConsumer>
                    {/* card footer */}
                    <div className="card-footer d-flex justify-content-between">
                        <p className="mb-0 align-self-center">
                            {title}
                        </p>
                        <h5 className="mb-0 text-blue font-italic">
                            {formatPrice(price)}
                        </h5>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}

Product.propTypes = {
    product:PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool
    }).isRequired
}

const ProductWrapper = styled.div`
.card{
    border-color:transparent;
    transition: all 0.5s linear;
}
.card-footer{
    background: transparent;
    border-top: transparent;
    transition: all 0.5s linear;
}
&:hover{
    .card{
        border:00.04rem solid rgba(0,0,0,0.2);
    box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
        background: rgba(247,247,247);
    }
}
.img-container{
    position: relative;
    overflow: hidden;
}
.card-img-top{
    transition: all 0.5s linear;
}
.img-container:hover .card-img-top{
    transform: scale(1.2);
}
.cart-btn{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 0.5s linear;
}
.img-container:hover .cart-btn{
    transform: translate(0,0);
}
.cart-btn:hover{
    color: var(--mainBlue);
    cursor: pointer;
}
`;
