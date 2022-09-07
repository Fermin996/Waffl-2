import React, { useState, useRef, useContext } from "react";
import styles from "./ItemEdit.module.css";
import menu from "../../../menu";
import { TablesContext } from "../../../../helpers/tables-context";
import { CheckContext } from "../../../../helpers/check-context";

const ItemEdit = ({ setCurrButtons }) => {
  const inputRef = useRef();
  const tablesCtx = useContext(TablesContext);
  const checkCtx = useContext(CheckContext);

  const [mod, setMod] = useState(null);

  let currentItem = checkCtx.checkItemClicked;
  let checkCopy = checkCtx.check;
  let foundItem = checkCopy.find((element) => element.fid === currentItem.fid);
  let foundItemIndex = checkCopy.indexOf(foundItem);
  let multiCheckCopy = checkCtx.multiCheck;

  function quantHandler(operation) {
    if (operation === "-" && currentItem.quantity > 1) {
      foundItem.quantity--;
    } else if (operation === "+") {
      foundItem.quantity++;
    }
    checkCtx.setCheck([...checkCopy]);
  }

  function cancelButtonHandler() {
    console.log(tablesCtx);
    if (checkCtx.checkItemClicked && checkCtx.check.length > 1) {
      checkCopy.splice(foundItemIndex, 1);
    } else if (checkCtx.checkItemClicked) {
      checkCopy[0] = { title: "-", quantity: 0, price: 0, total: 0 };
    }

    checkCtx.setCheck([...checkCopy]);

    if (checkCtx.multiCheck) {
      multiCheckCopy[checkCtx.checkIndex] = [...checkCopy];
      checkCtx.setMultiCheck(multiCheckCopy);
    }

    checkCtx.setCheckItemClicked(false);
    setCurrButtons(menu);
  }

  function doneButtonHandler() {
    checkCtx.setCheckItemClicked(false);
    setCurrButtons(menu);
  }

  function modSubmitHandler(e) {
    e.preventDefault();
    let tempArr = [...foundItem.mods];
    tempArr.push(inputRef.current.value);
    foundItem.mods = tempArr;
    checkCtx.setCheck([...checkCopy]);
    setMod(null);
  }

  function modClickHandler() {
    setMod(
      <div className={styles.modBox}>
        <form className={styles.modForm} onSubmit={modSubmitHandler}>
          <input className={styles.textBar} name="modInput" ref={inputRef} />
          <div className={styles.modFormBtns}>
            <p className={styles.modCancel} onClick={() => setMod(null)}>
              Cancel
            </p>
            <input className={styles.modSubmit} type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.itemEditDiv}>
      {mod}
      <div className={styles.itemDetails}>
        <div className={styles.quantButton}>
          <div className={styles.pmDiv} onClick={() => quantHandler("-")}>
            <p className={styles.quantStyle}>-</p>
          </div>
          <div className={styles.quantDisplay}>
            <p>{checkCtx.checkItemClicked.quantity}</p>
          </div>
          <div className={styles.pmDiv} onClick={() => quantHandler("+")}>
            <p className={styles.quantStyle}>+</p>
          </div>
        </div>
        <div className={styles.modDiv}>
          <p className={styles.modDivP} onClick={modClickHandler}>
            Mods
          </p>
        </div>
        <div className={styles.dcBtns}>
          <div className={styles.cancelButton}>
            <p className={styles.cancelButtP} onClick={cancelButtonHandler}>
              Cancel
            </p>
          </div>
          <div className={styles.doneButton}>
            <p className={styles.doneButtP} onClick={doneButtonHandler}>
              Done
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemEdit;
