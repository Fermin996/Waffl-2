import React, { useState, useContext } from "react";
import { clockIn } from "../../api/users";
import { useNavigate } from "react-router-dom";
import { TablesContext } from "../../helpers/tables-context";

import styles from "./PinPad.module.css";

const PinPad = ({ clockedEmployees, setClockedEmployees }) => {
  const navigate = useNavigate();

  const [currentNum, setCurrentNum] = useState(null);

  const tablesCtx = useContext(TablesContext);

  function pinDisplayHandler(number) {
    if (currentNum && currentNum.length > 4) {
      return;
    }

    if (currentNum !== null) {
      let numCont = [...currentNum];

      numCont.push(number);
      numCont.join("");
      setCurrentNum(numCont);
    } else {
      setCurrentNum(number);
    }
  }

  const handlePinEntered = async () => {
    let validUser = await clockIn(currentNum.join(""));

    if (validUser) {
      if (clockedEmployees.indexOf(validUser._id) === -1) {
        setClockedEmployees([validUser._id, ...clockedEmployees]);
      }

      tablesCtx.setCurrentUser(validUser._id);
      navigate("/user-view");
    }
  };

  return (
    <div className={styles.pinBack}>

      <h3>Enter Pin</h3>
      <div className={styles.pinNumDisplayDiv}>{currentNum}</div>

      <div className={styles.pinBox}>
        <div className={styles.pinRow}>
          <section onClick={() => pinDisplayHandler("1")}>
            <p className={styles.numberP}>1</p>
          </section>
          <section onClick={() => pinDisplayHandler("2")}>
            <p className={styles.numberP}>2</p>
          </section>
          <section onClick={() => pinDisplayHandler("3")}>
            <p className={styles.numberP}>3</p>
          </section>
        </div>
        <div className={styles.pinRow}>
          <section onClick={() => pinDisplayHandler("4")}>
            <p className={styles.numberP}>4</p>
          </section>
          <section onClick={() => pinDisplayHandler("5")}>
            <p className={styles.numberP}>5</p>
          </section>
          <section onClick={() => pinDisplayHandler("6")}>
            <p className={styles.numberP}>6</p>
          </section>
        </div>
        <div className={styles.pinRow}>
          <section onClick={() => pinDisplayHandler("7")}>
            <p className={styles.numberP}>7</p>
          </section>
          <section onClick={() => pinDisplayHandler("8")}>
            <p className={styles.numberP}>8</p>
          </section>
          <section onClick={() => pinDisplayHandler("9")}>
            <p className={styles.numberP}>9</p>
          </section>
        </div>
        <div className={styles.pinRow}>
          <section className={styles.clockInDiv} onClick={handlePinEntered}>
            <p className={styles.goP}>GO</p>
          </section>
          <section onClick={() => pinDisplayHandler("0")}>
            <p className={styles.numberP}>0</p>
          </section>
          <section
            className={styles.clockInDiv}
            onClick={() => setCurrentNum(null)}
          >
            <p className={styles.goP}>Clear</p>
          </section>
        </div>
        {/* <div className={styles.pinRow}>
                    <section className={styles.clockInDiv} onClick={handleClockInToggle}>
                        <p>
                            Clock in/out
                        </p>
                    </section>
                </div> */}
      </div>
    </div>
  );
};

export default PinPad;
