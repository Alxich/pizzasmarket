import React from "react";
import PropTypes from "prop-types";

const SortPopUp = React.memo(function SortPopUp({
  items,
  activeSortType,
  onClickSortType,
}) {
  const [visiblePopUP, setvisiblePopUP] = React.useState(false);
  const sortRef = React.useRef(null);
  const activeLabel = items.find((obj) => obj.type === activeSortType).name;

  const onSelectPopUp = () => {
    setvisiblePopUP(!visiblePopUP);
  };

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(sortRef.current)) {
      setvisiblePopUP(false);
    }
  };

  const onSelectItem = (index) => {
    onClickSortType(index);
    setvisiblePopUP(false);
  };

  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
  }, []);

  const itemsContainer =
    items &&
    items.map((item, i) => {
      return (
        <li
          className={activeSortType === item.type ? "active" : ""}
          onClick={() => onSelectItem(item)}
          key={`${item.type}__${i}`}
        >
          {item.name}
        </li>
      );
    });

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={visiblePopUP ? "rotated" : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => onSelectPopUp()}>{activeLabel}</span>
      </div>
      {visiblePopUP && (
        <div className="sort__popup">
          <ul>{itemsContainer}</ul>
        </div>
      )}
    </div>
  );
});

SortPopUp.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeSortType: PropTypes.string.isRequired,
  onClickSortType: PropTypes.func.isRequired,
};

SortPopUp.defaultProps = {
  items: [],
  activeSortType: "",
};

export default SortPopUp;
