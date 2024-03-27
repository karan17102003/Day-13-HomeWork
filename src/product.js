import React, { useState } from 'react';

const Products = [
  { id: 1, name: 'Product-1', price: 100 },
  { id: 2, name: 'Product-2', price: 200 },
  { id: 3, name: 'Product-3', price: 300 },
];

const TextForm = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart([...cart, { ...product, quantity: 1 }]);
  const removeFromCart = (productId) => setCart(cart.filter((item) => item.id !== productId));
  const incQuantity = (productId) =>
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  const decQuantity = (productId) =>
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    const getTotalAmount = () => {
      return cart.reduce((total, item) => {
        const product = Products.find((product) => product.id === item.id);
        return total + product.price * item.quantity;
      }, 0);
    };
  return (
    <div style={{ display: 'flex' , justifyContent:'center',gap:'4rem' , marginTop:'100px'}}>
      <div style={{
        backgroundColor:'lightgreen' ,
        padding:'20px',
        border:'5px solid black'
      }}>
        {Products.map((product) => (
          <div key={product.id}>
            <span style={{padding:'20px'}}>
              {product.name} - ${product.price}
            </span>
            <button style={{margin:'10px'}} onClick={() => addToCart(product)}>+</button>
            <span>{(cart.find((item) => item.id === product.id) || {}).quantity || 0}</span>
            <button style={{margin:'10px'}} onClick={() => removeFromCart(product.id)}>-</button>
          </div>
        ))}
      </div>
      <div style={{
        backgroundColor:'lightgreen' ,
        padding:'20px',
        border:'5px solid black'
      }}>
        {cart.length === 0 ? (
          <div>No Product added to the cart</div>
        ) : (
          <div style={{
            display:'flex',
            flexDirection:'column',
            gap:'1rem'
          }}>
            {cart.map((item) => (
              <div key={item.id}>
                <span>
                  {item.name} x {item.quantity} = ${item.price * item.quantity}
                </span>
              </div>
            ))}
            <div style={{
              padding:'10px 0px',
              backgroundColor:'pink',
              margin:'20px 0px'
            }}>Total Amount= ${getTotalAmount()}</div>
          </div>
        )}
      </div>
    </div>
  );
};






export default TextForm;