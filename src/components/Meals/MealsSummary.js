import styles from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={styles.summary}>
      <h2>Order Food To Your Door</h2>
      <p>Add food to your cart and proceed to fill out your contact information</p>
    </section>
  );
};

export default MealsSummary;