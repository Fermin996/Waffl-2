import React, { useContext } from "react";
import { CheckContext } from "../../../../helpers/check-context";
import styles from "./MenuButtons.module.css";

const MenuButtons = ({ currentButtonData, onClick }) => {
  const checkCtx = useContext(CheckContext);

  let currStyle = styles.currentButton;

  if (
    checkCtx.checkItemClicked &&
    checkCtx.checkItemClicked.title === currentButtonData.title
  ) {
    currStyle = styles.currentButtonSelected;
  }

  return (
    <div className={currStyle} onClick={onClick}>
      {currentButtonData.title}
    </div>
  );
};

export default MenuButtons;
