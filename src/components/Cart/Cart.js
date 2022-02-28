import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);

  const dispatch = useDispatch();

  const totalAmount = `$${cartTotalAmount.toFixed(2)}`;
  const hasItems = cartItems.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItemToCart({ ...item, amount: 1 }));
  };

  const orderBtnHandler = () => {
    setIsOrdering(true);
  };

  const submitOrderHandler = async (userFormData) => {
    setIsSubmitting(true);
    // Future feature: add error handling for incorrect post
    await fetch('https://mydummydb-3fbe5-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userFormData,
        orderedItems: cartItems
      })
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    dispatch(cartActions.clearCart);
  };

  const cartItem = cartItems.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />);

  const cartBtns = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
      {hasItems && <button className={styles.button} onClick={orderBtnHandler}>Order</button>}
    </div>
  );

  const cartModalContent = (
    <>
      <ul className={styles['cart-items']}>
        {cartItem}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrdering && <Checkout onSubmit={submitOrderHandler} onHideCart={props.onHideCart} />}
      {!isOrdering && cartBtns}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const isSubmittedCartModalContent = (
    <>
      <p>Successfully sent order!</p>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
      </div>
    </>
  );


  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {isSubmitted && isSubmittedCartModalContent}
    </Modal>
  );
};

export default Cart;