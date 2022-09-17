import React from "react";
import PropTypes from "prop-types";

const Categories = React.memo(function Categories({
  activeCategory,
  items,
  onClickCategory,
}) {
  const itemsContainer =
    items &&
    items.map((item, i) => {
      return (
        <li
          className={activeCategory === i ? "active" : ""}
          onClick={() => onClickCategory(i)}
          key={`${item}__${i}`}
        >
          {item}
        </li>
      );
    });

  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? "active" : ""}
          onClick={() => onClickCategory(null)}
        >
          All
        </li>
        {itemsContainer}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func,
};

Categories.defaultProps = {
  activeCategory: null,
  items: [],
};

export default Categories;
