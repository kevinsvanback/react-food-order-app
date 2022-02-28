import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartItems = useSelector(state => state.cart.items);

  const numberOfCartItems = cartItems.reduce((currentNum, item) => { return currentNum + item.amount; }, 0);

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

  useEffect(() => {
    if (cartItems.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItems]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}><CartIcon /></span>
      <span>Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;