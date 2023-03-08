function setDishes(name, price, quantity) {
//when quantity 0 ignore
  if (quantity === 0) {
    return;
  }

  //Check if the dish exists
  const DishExists = dishes.find(dish => dish.name === name);

  //Update quantity of existing dishes
  if (DishExists) {
    DishExists.quantity += quantity;
  } else {
    //Add to dishes array if does not exist
    const newDish = { name, price, quantity };
    dishes.push(newDish);
  }
}