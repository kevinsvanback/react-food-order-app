import foodImage from '../../assets/food.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>React Food Order App</h1>
        <HeaderCartButton />
      </header>
      <div className={styles['main-image']}>
        <img src={foodImage} alt="header-img" />
      </div>
    </>
  );
};

export default Header;