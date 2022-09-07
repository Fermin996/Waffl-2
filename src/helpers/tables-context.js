import { createContext } from "react";

export const TablesContext=createContext({
    tables:[],
    currentTable: false,
    currentUser:null,
    tableId: null,
    tableNum:null,
    setTableNum:()=>{},
    setTableId:()=>{},
    setCurrentUser: ()=>{},
    setTables: ()=>{},
    setCurrentTable: ()=>{}
})