import React, { useContext } from "react";
import { CheckContext } from "../../../../helpers/check-context";
import styles from "./CheckItem.module.css";

const CheckItem = ({ isPaymentScreen, checkItemData, checkItemNum }) => {
  let currChItmDiv = styles.chItmDiv;
  let itemMod = null;

  const checkCtx = useContext(CheckContext);
  if (checkItemData.mods && checkItemData.mods.length > 0) {
    itemMod = (
      <div>
        {checkItemData.mods.map((mod) => {
          return <div key={checkItemData.mods.indexOf(mod)}>{mod}</div>;
        })}
      </div>
    );
  }

  if (checkItemData.sent === true) {
    if (checkItemNum % 2 === 0) {
      currChItmDiv = styles.sentChItm;
    } else {
      currChItmDiv = styles.sentChItmOdd;
    }
  } else if (
    checkCtx.checkItemClicked &&
    (checkCtx.checkItemClicked._id
      ? checkItemData._id === checkCtx.checkItemClicked._id
      : checkItemData.fid === checkCtx.checkItemClicked.fid)
  ) {
    currChItmDiv = styles.chItmDivClicked;
  }

  if (isPaymentScreen) {
    currChItmDiv = styles.chItmDiv;
  }

  function checkItemClickedHandler() {
    if (!checkItemData.sent && checkItemData.title !== "-") {
      checkCtx.setCheckItemClicked(checkItemData);
    }
  }

  return (
    <>
      <div className={currChItmDiv} onClick={checkItemClickedHandler}>
        <div className={styles.itmColumn}>{checkItemData.title}</div>
        <div className={styles.itmColumn2}>{checkItemData.quantity}</div>
        <div className={styles.itmColumn2}>${checkItemData.price}</div>
        <div className={styles.itmColumn3}>
          ${checkItemData.price * checkItemData.quantity}
        </div>
      </div>
      {itemMod}
    </>
  );
};

export default CheckItem;
