import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderBtnHandler = () => {
    setIsOrdering(true);
  };

  const cartItem = cartCtx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />);
  const cartBtns = <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
    {hasItems && <button className={styles.button} onClick={orderBtnHandler}>Order</button>}
  </div>;

  return (
    <Modal onClick={props.onHideCart}>
      <ul className={styles['cart-items']}>
        {cartItem}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrdering && <Checkout />}
      {!isOrdering && cartBtns}
    </Modal>
  );
};

export default Cart;