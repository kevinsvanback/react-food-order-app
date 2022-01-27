import Modal from '../UI/Modal';

import styles from './Cart.module.css';

const Cart = (props) => {
  const cartItem = [{ id: 'c1', name: 'Sushi', amount: 3, price: 14.49 }].map(item => <li>{item.name}</li>);

  return (
    <Modal onClick={props.onHideCart}>
      <ul className={styles['cart-items']}>
        {cartItem}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>$39.99</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;