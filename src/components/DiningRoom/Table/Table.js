import React, { useContext } from "react";
import { TablesContext } from "../../../helpers/tables-context";
import { useNavigate } from "react-router-dom";
import styles from "../DiningRoom.module.css";
import { CheckContext } from "../../../helpers/check-context";
import { getCheckById, getChecksByTable } from "../../../api/checks";

const Table = ({ tableNum }) => {
  const navigate = useNavigate();
  const tablesCtx = useContext(TablesContext);
  const checkCtx = useContext(CheckContext);

  let tableIsOpen = tablesCtx.tables.find(
    (currTab) => currTab.number === tableNum
  );
  let isCurrUserTable = tablesCtx.tables.find(
    (tab) => tab.user === tablesCtx.currentUser && tab.number === tableNum
  );

  const callGetCheck = async (currUserTable) => {
    try {
      if (currUserTable.checks.length > 1) {
        let checksData = await getChecksByTable(currUserTable._id);
        checkCtx.setMultiCheck([...checksData]);
        checkCtx.setCheck(checksData[0]);
      } else {
        let checkData;
        checkData = await getCheckById(currUserTable.checks[0]);
        checkCtx.setCheck([...checkData.checkItems]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTableClicked = () => {
    tablesCtx.setTableNum(tableNum);
    navigate("/POS-view");
  };

  const handleActiveTableClicked = () => {
    if (isCurrUserTable) {
      tablesCtx.setTableNum(tableNum);
      tablesCtx.setCurrentTable(isCurrUserTable);
      tablesCtx.setTableId(tableIsOpen._id);
      checkCtx.setCheckId(isCurrUserTable.checks[0]);

      callGetCheck(isCurrUserTable);

      navigate("/POS-view");
    }
  };

  let inactiveTable = (
    <div
      className={styles.sec1Table}
      onClick={handleTableClicked}
      to="/user-view/table"
    >
      {tableNum}
    </div>
  );
  
  let activeTable = (
    <div
      onClick={handleActiveTableClicked}
      className={isCurrUserTable ? styles.currUserTable : styles.notUserTable}
    >
      {tableNum}
    </div>
  );

  return <>{tableIsOpen ? activeTable : inactiveTable}</>;
};

export default Table;
