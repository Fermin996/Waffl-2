import React, { useEffect, useContext } from "react";
import styles from "./CheckView.module.css";
import CheckItem from "./CheckItem/CheckItem";
import menu from "../../menu";
import { TablesContext } from "../../../helpers/tables-context";
import { CheckContext } from "../../../helpers/check-context";
import { useNavigate } from "react-router-dom";
import { getCheckById, updateCheck, createCheck } from "../../../api/checks";
import { createTable } from "../../../api/tables";

const CheckView = ({
  setCurrButtons,
  setSplitCheckOpen,
  setCheckWasSplit,
}) => {
  const navigate = useNavigate();

  const tablesCtx = useContext(TablesContext);
  const checkCtx = useContext(CheckContext);

  let checkTabs = null;
  let checkTabStyle = styles.checkTab;
  let checkCopy = checkCtx.check;
  let tablesCopy = tablesCtx.tables;

  useEffect(() => {
    if (checkCtx.multiCheck) {
      checkCtx.setCheck([...checkCtx.multiCheck[checkCtx.checkIndex]]);
    }
  }, [checkCtx.checkIndex]);

  function tabClickedHandler(currentCheck) {
    let currCheckIndex = checkCtx.multiCheck.indexOf(currentCheck);
    checkCtx.setCheckIndex(currCheckIndex);

    checkCtx.setCheckId(tablesCtx.currentTable.checks[currCheckIndex]);
    setCurrButtons(menu);
    checkCtx.setCheckItemClicked(false);
    checkCtx.setCheck(checkCtx.multiCheck[currCheckIndex]);
  }

  if (checkCtx.multiCheck) {
    checkTabs = checkCtx.multiCheck.map((check) => {
      if (checkCtx.checkIndex === checkCtx.multiCheck.indexOf(check)) {
        checkTabStyle = styles.checkTabClicked;
      } else {
        checkTabStyle = styles.checkTab;
      }

      return (
        <p
          key={checkCtx.multiCheck.indexOf(check)}
          className={checkTabStyle}
          onClick={() => tabClickedHandler(check)}
        >
          #{checkCtx.multiCheck.indexOf(check) + 1}
        </p>
      );
    });
  }

  const createTableAndCheck = async () => {
    const shiftId = "62ffe85bfeff47067ae18508";
    const date = new Date();
    const tableInit = await createTable(
      tablesCtx.currentUser,
      tablesCtx.tableNum,
      date,
      shiftId
    );

    const checkInit = await createCheck(
      tablesCtx.currentUser,
      date,
      shiftId,
      tableInit._id,
      checkCtx.check
    );

    checkCtx.setCheckId(checkInit._id);
    tablesCtx.setTableId(tableInit._id);

    tableInit.checks.push(checkInit._id);

    tablesCtx.setCurrentTable(tableInit);
    tablesCtx.setTables([...tablesCopy, tableInit]);
  };

  const sendButtonHandler = async () => {
    let sendCheckCopy = checkCtx.check;

    if (checkCtx.check.title !== "-") {
      sendCheckCopy.forEach((element) => {
        element.sent = true;
      });

      if (checkCtx.multiCheck) {
        let multiCopy = checkCtx.multiCheck;
        multiCopy[checkCtx.checkIndex] = sendCheckCopy;

        checkCtx.setMultiCheck([...multiCopy]);
      }

      if (!checkCtx.checkId && !tablesCtx.currentTable) {
        createTableAndCheck();
      } else if (!checkCtx.checkId) {
        let date = new Date();
        await createCheck(
          tablesCtx.currentUser,
          date,
          "62ffe85bfeff47067ae18508",
          tablesCtx.tableId,
          checkCtx.check
        );
      } else {
        await updateCheck(sendCheckCopy, checkCtx.checkId);
      }

      checkCtx.setCheck([...sendCheckCopy]);
      checkCtx.setCheckItemClicked(false);
    }
  };

  const callAddCheck = async () => {
    if (!checkCtx.multiCheck) {
      checkCtx.setMultiCheck([
        checkCtx.check,
        [{ title: "-", quantity: 0, price: 0, total: 0, sent: false }],
      ]);
    } else {
      checkCtx.setMultiCheck([
        ...checkCtx.multiCheck,
        [{ title: "-", quantity: 0, price: 0, total: 0, sent: false }],
      ]);
    }
  };

  function addCheckHandler() {
    if (tablesCtx.currentTable.checks.length < 6) {
      callAddCheck();
    }
  }

  function splitCheckHandler() {
    setSplitCheckOpen(true);
    setCheckWasSplit(true);

    if (!checkCtx.multiCheck) {
      checkCtx.setCheckIndex(0);
      checkCtx.setMultiCheck([
        [...checkCtx.check],
        [{ title: "-", quantity: 0, price: 0, total: 0 }],
      ]);
    }
  }

  function payHandler() {
    navigate("/payment-screen");
  }

  let checkItemCounter = 0;

  return (
    <div className={styles.checkView}>
      <div>
        <div className={styles.checkTabsDiv}>
          <p className={styles.addCheckButt} onClick={addCheckHandler}>
            Add Check
          </p>
          {checkTabs}
        </div>
        <div className={styles.checkItemsHeader}>
          <div className={styles.checkItemsLabel1}>Item</div>
          <div className={styles.checkItemsLabel2}>Quantity</div>
          <div className={styles.checkItemsLabel2}>Price</div>
          <div className={styles.checkItemsLabel3}>Total</div>
        </div>
        <div className={styles.checkViewSubDiv}>
          {checkCtx.check.map((checkItem) => {
            checkItemCounter++;
            return (
              <CheckItem
                checkItemNum={checkItemCounter}
                checkItemData={checkItem}
                key={checkItemCounter}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.checkViewButtons}>
        <div className={styles.sendBtn} onClick={sendButtonHandler}>
          Send
        </div>
        <div className={styles.splitBtn} onClick={splitCheckHandler}>
          Split
        </div>
        <div className={styles.payBtn} onClick={payHandler}>
          Pay
        </div>
      </div>
    </div>
  );
};

export default CheckView;
