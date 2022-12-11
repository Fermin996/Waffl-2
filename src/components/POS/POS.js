import React, { useEffect, useState, useContext } from "react";
import menu from "../menu";
import CheckEdit from "./CheckEdit/CheckEdit";
import CheckView from "./CheckView/CheckView";
import styles from "./POS.module.css";
import { TablesContext } from "../../helpers/tables-context";
import { CheckContext } from "../../helpers/check-context";

const POS = () => {
  const [currButtons, setCurrButtons] = useState(menu);
  const [splitCheckOpen, setSplitCheckOpen] = useState(false);
  const [storedMulti, setStoredMulti] = useState(null);
  const [checkWasSplit, setCheckWasSplit] = useState(false);

  const checkCtx = useContext(CheckContext);
  const tablesCtx = useContext(TablesContext);

  let deleteEmptyCheckBtn = null;
  let splitItmStyle = null;
  let multiCheckCopy = checkCtx.multiCheck;
console.log(checkCtx.check)
console.log(checkCtx.multiCheck)
  function addSplitCheckHandler() {
    if (checkCtx.multiCheck.length < 6) {
      multiCheckCopy.push([
        { title: "-", quantity: 0, price: 0, total: 0, sent: false },
      ]);
      checkCtx.setMultiCheck([...multiCheckCopy]);
    }
  }

  function splitBackHandler() {
    setSplitCheckOpen(false);
  }

  function deleteEmptyCheckHandler(checkIndex) {
    if (multiCheckCopy.length === 2) {
      setSplitCheckOpen(false);
      checkCtx.setCheck([...multiCheckCopy[0]]);
      checkCtx.setMultiCheck(false);
    } else {
      multiCheckCopy.splice(checkIndex, 1);
      checkCtx.setMultiCheck([...multiCheckCopy]);
    }
  }

  function splitCheckItemHandler(item, index) {
    if (!checkCtx.checkItemClicked) {
      checkCtx.setCheckItemClicked(item);
      checkCtx.setCheckIndex(index);
    } else if (index === checkCtx.checkIndex) {
      checkCtx.setCheckItemClicked(false);
    } else {
      //if checkItem has been clicked
      // and this index is not the curr check index
      if (
        checkCtx.multiCheck[checkCtx.checkIndex].length === 1 &&
        checkCtx.multiCheck[checkCtx.checkIndex][0] !== "-"
      ) {
        // if this check has only one item left
        multiCheckCopy[index].push(checkCtx.checkItemClicked);
        multiCheckCopy[checkCtx.checkIndex] = [
          { title: "-", quantity: 0, price: 0, total: 0, sent: false },
        ];
      } else {
        //if this check is empty remove filler item
        if (multiCheckCopy[index][0].title === "-") {
          multiCheckCopy[index].pop();
        }

        multiCheckCopy[index].push(checkCtx.checkItemClicked);
        multiCheckCopy[checkCtx.checkIndex].splice(
          multiCheckCopy[checkCtx.checkIndex].indexOf(
            checkCtx.checkItemClicked
          ),
          1
        );
      }

      checkCtx.setMultiCheck([...multiCheckCopy]);
      checkCtx.setCheckItemClicked(false);
    }
  }

  let PosView = (
    <div className={styles.posDiv}>
      <div className={styles.checkView}>
        <CheckView
          setCurrButtons={setCurrButtons}
          setSplitCheckOpen={setSplitCheckOpen}
          setCheckWasSplit={setCheckWasSplit}
        />
      </div>
      <div className={styles.checkEdit}>
        <CheckEdit
          setCheckWasSplit={setCheckWasSplit}
          checkWasSplit={checkWasSplit}
          currButtons={currButtons}
          setCurrButtons={setCurrButtons}
        />
      </div>
    </div>
  );

  let addCheck = null;

  if (checkCtx.multiCheck.length === 6) {
    addCheck = null;
  } else if (splitCheckOpen && checkCtx.multiCheck.length % 2 !== 0) {
    addCheck = (
      <div className={styles.splitCheckAdd} onClick={addSplitCheckHandler}>
        <p>+ Add Check</p>
      </div>
    );
  } else if (checkCtx.multiCheck.length % 2 === 0) {
    addCheck = (
      <>
        <div className={styles.splitCheckAdd} onClick={addSplitCheckHandler}>
          <p>+ Add Check</p>
        </div>
        <div className={styles.splitCheckAdd} onClick={addSplitCheckHandler}>
          <p>+ Add Check</p>
        </div>
      </>
    );
  }

  if (splitCheckOpen) {
    PosView = (
      <>
        <div className={styles.splitCheckViewHeader}>
          <div className={styles.splitBackBtn} onClick={splitBackHandler}>
            Back
          </div>
        </div>
        <div className={styles.splitCheckView}>
          {checkCtx.multiCheck.map((currCheck) => {
            if (
              currCheck[0].title === "-" &&
              checkCtx.multiCheck.indexOf(currCheck) !== 0
            ) {
              deleteEmptyCheckBtn = (
                <div
                  onClick={() =>
                    deleteEmptyCheckHandler(
                      checkCtx.multiCheck.indexOf(currCheck)
                    )
                  }
                >
                  Delete
                </div>
              );
            }
            return (
              <div
                className={styles.splitCheck}
                onClick={
                  checkCtx.checkItemClicked
                    ? () =>
                        splitCheckItemHandler(
                          null,
                          checkCtx.multiCheck.indexOf(currCheck)
                        )
                    : null
                }
              > 
                <div className={styles.splitCheckHeader}>
                  Table {tablesCtx.tableNum}, check #{checkCtx.multiCheck.indexOf(currCheck)+1}
                </div>
                {deleteEmptyCheckBtn}
                {currCheck.map((checkItm) => {
                  if (
                    checkCtx.checkItemClicked &&
                    (!!checkCtx.checkItemClicked._id
                      ? checkCtx.checkItemClicked._id === checkItm._id
                      : checkCtx.checkItemClicked.fid === checkItm.fid)
                  ) {
                    splitItmStyle = styles.splitItmClicked;
                  } else {
                    splitItmStyle = styles.splitItmNotClicked;
                  }

                  return (
                    <p
                      className={splitItmStyle}
                      onClick={
                        checkCtx.checkItemClicked
                          ? null
                          : () =>
                              splitCheckItemHandler(
                                checkItm,
                                checkCtx.multiCheck.indexOf(currCheck)
                              )
                      }
                    >
                      {checkItm.title}
                    </p>
                  );
                })}
              </div>
            );
          })}

          {addCheck}
        </div>
      </>
    );
  }

  return <div>{PosView}</div>;
};

export default POS;
