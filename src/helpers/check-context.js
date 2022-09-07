import { createContext } from "react";

export const CheckContext=createContext({
    check:[{title:"-", quantity:0, price:0, total:0}],
    multiCheck:false,
    checkItemClicked: {},
    checkIndex:0,
    checkId: null,
    setCheckItemClicked:()=>{},
    setCheckId:()=>{},
    setCheck:()=>{},
    setCheckIndex:()=>{},
    setMultiCheck: ()=>{}
})