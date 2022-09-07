import React, { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { TablesContext } from "../../helpers/tables-context";
import Table from "./Table/Table";
import styles from "./DiningRoom.module.css";
import { CheckContext } from "../../helpers/check-context";
import { getOpenTables } from "../../api/tables";

const DiningRoom = () => {
  const navigate = useNavigate();

  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    })
  );

  const tablesCtx = useContext(TablesContext);
  const checkCtx = useContext(CheckContext);

  let tableNumArray = [
    31, 32, 33, 11, 12, 13, 14, 15, 21, 22, 23, 24, 1, 2, 3, 4, 5, 6,
  ];

  const callGetOpenTables = async () => {
    let loadedTables;
    try {
      loadedTables = await getOpenTables();
    } catch (err) {
      console.log(err);
    }

    tablesCtx.setTables([...loadedTables]);
  };

  useEffect(() => {
    callGetOpenTables();
  }, [checkCtx.check]);

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

  return (
    <>
      <div className={styles.uViewBar}>
        <div onClick={() => navigate("/")} className={styles.uViewClose}>
          Close
        </div>
        <div>{time}</div>
      </div>
      <div className={styles.dRoomBack}>
        <div className={styles.leftHalfRoom}>
          <div className={styles.dSection1}>
            {tableNumArray.slice(0, 3).map((table) => {
              return <Table key={table} tableNum={table} />;
            })}
          </div>
          <div className={styles.dSection2}>
            {tableNumArray.slice(3, 7).map((table) => {
              return <Table key={table} tableNum={table} />;
            })}
          </div>
        </div>
        <div className={styles.halfRoom}>
          <div className={styles.dSection3}>
            {tableNumArray.slice(7, 11).map((table) => {
              return <Table key={table} tableNum={table} />;
            })}
          </div>
          <div className={styles.barSection}>
            <div className={styles.barTops}>
              {tableNumArray.slice(12, 18).map((table) => {
                return <Table key={table} tableNum={table} />;
              })}
            </div>
            <section className={styles.barText}>Bar</section>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiningRoom;
