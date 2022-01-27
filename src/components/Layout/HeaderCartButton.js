import { useContext } from 'react';

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((currentNum, item) => { return currentNum + item.amount; }, 0);
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}><CartIcon /></span>
      <span>Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;