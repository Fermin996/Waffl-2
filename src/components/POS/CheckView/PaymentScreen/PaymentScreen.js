import React, {useState, useContext, useEffect} from 'react'
import styles from './PaymentScreen.module.css'
import CheckItem from '../CheckItem/CheckItem'
import { useNavigate } from 'react-router-dom'
import { CheckContext } from '../../../../helpers/check-context'
import { TablesContext } from '../../../../helpers/tables-context'


const PaymentScreen = () => {
    const navigate = useNavigate()

    const checkCtx = useContext(CheckContext)
    const tablesCtx = useContext(TablesContext)

    const [balance, setBalance] = useState(null)
    const [tenderedAmount, setTenderedAmount] = useState()
    
    let subTotal=0;
    let tax
    
    checkCtx.check.forEach(element => {
        console.log(element.price)
        console.log(element.quantity)
        subTotal+= element.price*element.quantity
    });

    console.log(subTotal)
    
    tax = subTotal*0.07
    
    useEffect(()=>{
        setBalance(subTotal+tax)
        setTenderedAmount(subTotal+tax  )
    },[])

    useEffect(()=>{
        console.log(balance)
        if(balance===0){
            let tablesCopy = tablesCtx.tables
            checkCtx.setPaidChecks([...checkCtx.paidChecks, tablesCtx.foundTable])
            tablesCopy.splice(tablesCopy.indexOf(tablesCtx.foundTable), 1)
            console.log(tablesCopy)
            tablesCtx.setTables([...tablesCopy])
            tablesCtx.setTable(null)
            checkCtx.setCheck([{title:"-", quantity:0, price:0, total:0, sent:false}])
            navigate('/')
        }
    },[balance])

    const tenderedHandler=(e)=>{
        setTenderedAmount(e.target.value)
    }

    function payAmountHandler(){
        setBalance(balance-tenderedAmount)
        setTenderedAmount(0)
    }
    console.log(tenderedAmount)
  return (
    <div className={styles.paymentScreen}>
        <div className={styles.itemScreen}>
            <div>
                <div className={styles.checkItemsHeader}>
                    <div className={styles.checkItemsLabel1}>Item</div>
                    <div className={styles.checkItemsLabel2}>Quantity</div>
                    <div className={styles.checkItemsLabel2}>Price</div>
                    <div className={styles.checkItemsLabel3}>Total</div>
                </div>
                {checkCtx.check.map((checkItem) => {
                    return <CheckItem 
                        isPaymentScreen={true}
                        checkItemData={checkItem}
                        key={checkItem.id}
                    />
                })}
            </div>
            <div className={styles.paymentDetails}>
                <div className={styles.detailsColumn}>
                    <div className={styles.detailsPcontainer}>
                        <p>SubTotal:</p>
                        <p className={styles.costP}>${subTotal}</p>
                    </div>
                    <div className={styles.detailsPcontainer}>
                        <p>Tax:</p>
                        <p className={styles.costP}>${tax}</p>
                    </div>
                </div>
                <div className={styles.detailsColumn}>
                    <div className={styles.detailsPcontainer}>
                        <p>Total:</p>
                        <p className={styles.costP}>${tax+subTotal}</p>
                    </div>
                    <div className={styles.detailsPcontainer}>
                        <p>Balance due:</p>
                        <p className={styles.costP}>${balance}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.payOptions}>
            <div>
                <div className={styles.detailsLabels}>
                    <p>
                        Balance Due
                    </p>
                    <p>
                        Amount Tendered
                    </p>
                </div>
                <div className={styles.tendered}>
                    <div>
                        ${balance}
                    </div>
                    <input value={tenderedAmount} type="text" onChange={tenderedHandler}/>
                </div>
              <div className={styles.balanceEdit}>
              </div>
            </div>
            <div className={styles.cashCredDiv}>
              <p onClick={payAmountHandler}>Cash</p>
              <p onClick={payAmountHandler}>Card</p>
            </div>
        </div>
    </div>
  )
}

export default PaymentScreen