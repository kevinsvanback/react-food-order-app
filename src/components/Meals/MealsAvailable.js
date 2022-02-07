import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './MealsAvailable.module.css';

const MealsAvailable = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch('https://mydummydb-3fbe5-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
      const data = await res.json();

      console.log(data);

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }

      setMeals(loadedMeals);
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsAvailable;