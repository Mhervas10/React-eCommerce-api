import React from 'react';

const CartItem = ({item, value, count}) => {
    // const {id,title,img,price,total,count} = item
    const { increment,decrement,removeItem, formatPrice } = value
    const {
        // uuid: id,
        title,
        cover_image_url: img,
        retail_price: { value: price = 210 },
        // inCart = false
    } = item

    const decreaseStyles = count === 1 ? { pointerEvents: 'none', opacity: '0.5' } : {}

    return (
        <div className="my-2 text-center row text-capitalize">
            <div className="mx-auto col-10 col-lg-2">
                <img src={img} style={{width:'5rem',height:'5rem'}} className="img-fluid" alt="product"/>
            </div>
            <div className="mx-auto col-10 col-lg-2">
                <span className="d-lg-none">product : </span>
                {title}
            </div>
            <div className="mx-auto col-10 col-lg-2">
                <span className="d-lg-none">price : </span>
                {formatPrice(price)}
            </div>
            <div className="mx-auto my-2 col-10 col-lg-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="mx-1 btn btn-black" style={decreaseStyles} onClick={()=>decrement(item)}>-</span>
                        <span className="mx-1 btn btn-black">{count}</span>
                        <span className="mx-1 btn btn-black" onClick={()=>increment(item)}>+</span>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="mx-auto col-10 col-lg-2">
                <div className="cart-icon" onClick={()=>removeItem(item)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
            <div className="mx-auto col-10 col-lg-2">
                <strong>item total : {formatPrice(price, count)}</strong>
            </div>
        </div>
    );
}

export default CartItem;
