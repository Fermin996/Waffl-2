import React, { useContext, useEffect, useState } from "react";
import styles from "./CheckEdit.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import MenuButtons from "./MenuButtons/MenuButtons";
import menu from "../../menu";
import ItemEdit from "./ItemEdit/ItemEdit";
import { TablesContext } from "../../../helpers/tables-context";
import { CheckContext } from "../../../helpers/check-context";
import { deleteCheck } from "../../../api/checks";
import {
  deleteTable,
  compareAndUpdateMulti,
} from "../../../api/tables";

const CheckEdit = ({
  currButtons,
  setCurrButtons,
  setCheckWasSplit,
  checkWasSplit,
}) => {
  const navigate = useNavigate();
  let currTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });

  const [time, setTime] = useState(currTime);

  let itemEdit = null;

  const tablesCtx = useContext(TablesContext);
  const checkCtx = useContext(CheckContext);

  useEffect(() => {
    setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "numeric",
          minute: "numeric",
        })
      );
    }, 15000);
  }, []);

  if (checkCtx.checkItemClicked && checkCtx.checkItemClicked.sent === false) {
    itemEdit = <ItemEdit setCurrButtons={setCurrButtons} />;
  }

  function updateCheckOnButton(currItm) {
    let currentArr = checkCtx.check;

    currItm.clicked = true;
    currItm.fid = Math.floor(Math.random() * 1000);

    if (currentArr[0].title && currentArr[0].title === "-") {
      currentArr.pop();
    }

    currentArr.push(currItm);
    checkCtx.setCheck([...currentArr]);
    checkCtx.setCheckItemClicked(currItm);

    if (checkCtx.multiCheck) {
      let multiCopy = checkCtx.multiCheck;
      multiCopy[checkCtx.checkIndex] = [...checkCtx.check];
      checkCtx.setMultiCheck(multiCopy);
    }
  }

  function menuButtonHandler(item) {
    if (item.buttonType === "category") {
      setCurrButtons([...item.subItems]);
    } else if (item.buttonType === "menu-item") {
      let itemCopy = Object.assign({}, item);
      updateCheckOnButton(itemCopy);
    }
  }

  const removeUnsentItems = async (checkItems, checkIndex) => {
    for (let i = 0; i < checkItems.length; i++) {
      if (checkItems[i].sent === false) {
        checkItems.splice(i, 1);
        i--;
      }
    }

    if (checkItems.length === 0) {
      let currTableCopy = tablesCtx.currentTable;
      let currTablesCopy = tablesCtx.tables;
      try {
        await deleteCheck(
          tablesCtx.currentTable.checks[checkIndex],
          tablesCtx.tableId
        );

        let foundIndex = currTablesCopy.indexOf(currTableCopy);
        let multiCopy = checkCtx.multiCheck;

        currTableCopy.checks.splice(checkIndex, 1);
        currTablesCopy[foundIndex] = currTableCopy;

        tablesCtx.setCurrentTable(currTableCopy);
        tablesCtx.setTables(currTablesCopy);
        console.log(currTableCopy);

        if (checkCtx.multiCheck) {
          multiCopy.splice(checkIndex, 1);
          checkCtx.setMultiCheck([...multiCopy]);
        }

        deleteTableIfEmpty(currTableCopy);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteTableIfEmpty = async (currTbl) => {
    if (currTbl.checks.length === 0) {
      let tablesCopy = tablesCtx.tables;
      tablesCopy.splice(tablesCopy.indexOf(currTbl._id), 1);
      tablesCtx.setTables([...tablesCopy]);

      try {
        await deleteTable(currTbl._id);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const callCompareAndUpdateMulti = async () => {
    let newTableChecks;
    let tablesCopy = tablesCtx.tables;
    let tableIndex = tablesCtx.tables.indexOf(tablesCtx.currentTable);

    try {
      newTableChecks = await compareAndUpdateMulti(
        tablesCtx.currentTable._id,
        checkCtx.multiCheck,
        tablesCtx.currentUser,
        tablesCtx.tableNum
      );
      tablesCopy[tableIndex].checks = newTableChecks;
      tablesCtx.setTables([...tablesCopy]);
      setCheckWasSplit(false);
    } catch (err) {
      console.log(err);
    }
  };

  function handleExit() {
    if (checkCtx.multiCheck) {
      for (let y = checkCtx.multiCheck.length - 1; -1 < y; y--) {
        removeUnsentItems(checkCtx.multiCheck[y], y);
      }
    } else {
      removeUnsentItems(checkCtx.check, 0);
    }

    console.log(checkCtx.multiCheck);
    if (checkWasSplit && tablesCtx.currentTable.checks.length > 0) {
      callCompareAndUpdateMulti();
    }

    tablesCtx.setTableNum(null);
    tablesCtx.setCurrentTable(null);
    checkCtx.setCheck([
      { title: "-", quantity: 0, price: 0, total: 0, sent: false },
    ]);
    checkCtx.setCheckIndex(0);
    checkCtx.setCheckId(null);
    checkCtx.setMultiCheck(false);
    navigate("/user-view");
  }

  function handleBackClick() {
    checkCtx.setCheckItemClicked(false);
    setCurrButtons(menu);
  }

  if (!tablesCtx.tableNum) {
    return <div>loading</div>;
  }

  return (
    <>
      <div className={styles.checkEdit}>
        <div className={styles.editMenu}>
          <div className={styles.editBar}>
            <div className={styles.backBtn} onClick={handleBackClick}>
              Back
            </div>
            <div className={styles.exitBtn} onClick={handleExit}>
              Exit
            </div>
            <div className={styles.tableLabel}>Table #{tablesCtx.tableNum}</div>
            <div>{time}</div>
          </div>
          <div className={styles.buttonsContainer}>
            {currButtons.map((menuItem) => {
              return (
                <MenuButtons
                  key={currButtons.indexOf(menuItem)}
                  currentButtonData={menuItem}
                  onClick={() => menuButtonHandler(menuItem)}
                />
              );
            })}
          </div>
        </div>
        {itemEdit}
      </div>
    </>
  );
};

export default CheckEdit;
