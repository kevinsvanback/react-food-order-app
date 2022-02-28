import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import styles from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const dispatch = useDispatch();

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid
    });

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode
    });

    dispatch(cartActions.clearCart);
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <div className={`${styles.control} ${formInputValidity.name ? '' : styles.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a name.</p>}
      </div>
      <div className={`${styles.control} ${formInputValidity.street ? '' : styles.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a street.</p>}
      </div>
      <div className={`${styles.control} ${formInputValidity.postalCode ? '' : styles.invalid}`}>
        <label htmlFor='postalCode'>Postal Code</label>
        <input type='text' id='postalCode' ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && <p>Please enter a postal code.</p>}
      </div>
      <div className={`${styles.control} ${formInputValidity.city ? '' : styles.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a city.</p>}

      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onHideCart}>Cancel</button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;