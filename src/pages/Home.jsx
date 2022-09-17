import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Categories,
  SortPopUp,
  PizzaBlock,
  PizzaLoadingBlock,
} from "../components";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";

const categoryNames = ["Meat", "Vegetarian", "Grill", "Acute", "Closed"];

const sortItems = [
  { name: "Popular", type: "popular", order: "desc" },
  { name: "Price", type: "price", order: "desc" },
  { name: "Alphabet", type: "name", order: "asc" },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  const selectCategories = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [sortBy, category]);

  const handleAddPizzaToCart = (obj) => {
    dispatch({
      type: "ADD_PIZZA_CART",
      payload: obj,
    });
  };

  const itemsCn = items.map((item) => {
    return (
      <PizzaBlock
        onAddPizzaToCart={handleAddPizzaToCart}
        key={`${item.name}__${item.id}`}
        addedCount={cartItems[item.id] && cartItems[item.id].items.length}
        {...item}
      />
    );
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={selectCategories}
          items={categoryNames}
        />
        <SortPopUp
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>

      <h2 className="content__title">All pizzas</h2>

      <div className="content__items">
        {isLoaded
          ? itemsCn
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
