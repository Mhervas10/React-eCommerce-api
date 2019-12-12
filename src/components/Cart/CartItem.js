import React from 'react';

const CartItem = ({item, value, count}) => {
    // const {id,title,img,price,total,count} = item
    const {increment,decrement,removeItem} = value
    const {
        uuid: id,
        title,
        cover_image_url: img,
        retail_price: { value: price = 210 },
        // inCart = false
    } = item

    const decreaseStyles = count === 1 ? { pointerEvents: 'none', opacity: '0.5' } : {}

    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} style={{width:'5rem',height:'5rem'}} className="img-fluid" alt="product"/>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product : </span>
                {title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price : </span>
                {price}
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1" style={decreaseStyles} onClick={()=>decrement(item)}>-</span>
                        <span className="btn btn-black mx-1">{count}</span>
                        <span className="btn btn-black mx-1" onClick={()=>increment(item)}>+</span>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={()=>removeItem(item)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong>item total : {price * count}€</strong>
            </div>
        </div>
    );
}

export default CartItem;
