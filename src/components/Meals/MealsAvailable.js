import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import styles from './MealsAvailable.module.css';

const fetchMeals = async () => {
  const res = await fetch('https://mydummydb-3fbe5-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
  const data = await res.json();

  console.log(data);
};

fetchMeals();

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const MealsAvailable = () => {
  const mealsList = DUMMY_MEALS.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsAvailable;