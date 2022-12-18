import { useEffect, useState } from "react";
import { RotatingTriangles } from "react-loader-spinner";
import { API } from "../../api";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`${API}meals.json`);
        if (!data.ok) throw new Error("Something went wrong!");
        const results = await data.json();
        const loadMeals = [];
        for (let key in results) {
          loadMeals.push({
            id: key,
            name: results[key].name,
            description: results[key].description,
            price: results[key].price,
          });
        }
        setMeals(loadMeals);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    })();
  }, []);

  if (isLoading)
    return (
      <section className={classes.MealsLoading}>
        <RotatingTriangles
          visible={true}
          height="80"
          width="80"
          ariaLabel="rotating-triangels-loading"
          wrapperClass="rotating-triangels-wrapper"
        />
      </section>
    );

  if (error)
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );

  const mealsLists = meals.map((meal) => <MealItem key={meal.id} {...meal} />);

  return (
    <section className={classes.meals}>
      <Card>{!isLoading && <ul>{mealsLists}</ul>}</Card>
    </section>
  );
};

export default AvailableMeals;
