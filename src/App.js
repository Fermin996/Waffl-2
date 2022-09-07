import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import POS from "./components/POS/POS";
import DiningRoom from "./components/DiningRoom/DiningRoom";
import PinPad from "./components/PinPad/PinPad";
import PaymentScreen from "./components/POS/CheckView/PaymentScreen/PaymentScreen";
import { TablesContext } from "./helpers/tables-context";
import { CheckContext } from "./helpers/check-context";
import { getOpenTables } from "./api/tables";

function App() {
  const [tableNum, setTableNum] = useState(false);
  const [clockedEmployees, setClockedEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [tables, setTables] = useState([]);
  const [checkItemClicked, setCheckItemClicked] = useState(false);
  const [checkIndex, setCheckIndex] = useState(0);
  const [paidChecks, setPaidChecks] = useState([]);
  const [multiCheck, setMultiCheck] = useState(false);
  const [checkId, setCheckId] = useState(null);
  const [tableId, setTableId] = useState(null);
  const [currentTable, setCurrentTable] = useState(null);
  const [check, setCheck] = useState([
    { title: "-", quantity: 0, price: 0, total: 0, sent: false },
  ]);

  const callGetOpenTables = async () => {
    let loadedTables;
    try {
      loadedTables = await getOpenTables();
    } catch (err) {
      console.log(err);
    }
    setTables([...loadedTables]);
  };

  useEffect(() => {
    callGetOpenTables();
  }, []);

  return (
    <TablesContext.Provider
      value={{
        tables: tables,
        currentTable: currentTable,
        tableNum: tableNum,
        currentUser: currentUser,
        tableId: tableId,
        setCurrentUser: setCurrentUser,
        setCurrentTable: setCurrentTable,
        setTableNum: setTableNum,
        setTableId: setTableId,
        setTables: setTables,
      }}
    >
      <CheckContext.Provider
        value={{
          checkId: checkId,
          check: check,
          multiCheck: multiCheck,
          paidChecks: paidChecks,
          checkItemClicked: checkItemClicked,
          checkIndex: checkIndex,
          setCheck: setCheck,
          setCheckId: setCheckId,
          setCheckItemClicked: setCheckItemClicked,
          setCheckIndex: setCheckIndex,
          setPaidChecks: setPaidChecks,
          setMultiCheck: setMultiCheck,
        }}
      >
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <PinPad
                  clockedEmployees={clockedEmployees}
                  setClockedEmployees={setClockedEmployees}
                />
              }
            />
            <Route path="/user-view" element={<DiningRoom />} />
            <Route path="/POS-view" element={<POS />} />
            <Route path="/payment-screen" element={<PaymentScreen />} />
          </Routes>
        </div>
      </CheckContext.Provider>
    </TablesContext.Provider>
  );
}

export default App;
