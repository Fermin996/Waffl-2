import React, {useEffect} from 'react'
import styles from './CheckView.module.css'
import CheckItem from './CheckItem/CheckItem'
import menu from '../../menu';

const CheckView = ({ 
    check, setCheck, setCheckItemClicked, checkItemClicked, setMultiCheck, 
    multiCheck, setCheckNum, checkNum, setCurrButtons, setSplitCheckOpen }) => {

  let checkTabs = null;  
  let checkTabStyle = styles.checkTab
  let checkCopy = check  

  useEffect(()=>{
    if(multiCheck){
        setCheck([...multiCheck[checkNum]])
    }    
  },[checkNum])      

  function tabClickedHandler(currentCheck){
    setCheckNum(multiCheck.indexOf(currentCheck))
    setCurrButtons(menu)
    setCheckItemClicked(false)
  }

  if(multiCheck){
      checkTabs = multiCheck.map((currCheck) => {
          if(checkNum === multiCheck.indexOf(currCheck)){
              checkTabStyle = styles.checkTabClicked
          }else{
              checkTabStyle = styles.checkTab
          }
          return <p className={checkTabStyle} onClick={()=>tabClickedHandler(currCheck)} > 
            Check {multiCheck.indexOf(currCheck)+1} 
        </p>
      })
  }  

  function sendButtonHandler(){
      
      if(check[0].title!=='-'){
        checkCopy.forEach(element => {
            element.sent=true
        });
  
        setCheck([...checkCopy])
      }  
      
  }  

  function addCheckHandler(){
    
      
    if(!multiCheck){
      setCheckNum(0)
      setMultiCheck([[...checkCopy], [{title:"-", quantity:0, price:0, total:0}]])
    }else if(multiCheck.length < 6){
        let multiCheckCopy = multiCheck
        multiCheckCopy.push([{title:"-", quantity:0, price:0, total:0}])
        setMultiCheck([...multiCheckCopy])
    }

  }

  function splitCheckHandler(){
      setSplitCheckOpen(true)

      if(!multiCheck){
        setCheckNum(0)
        setMultiCheck([[...check], [{title:"-", quantity:0, price:0, total:0}]])
      }
  }

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
            {check.map((checkItem) => {
                return <CheckItem 
                    check={check}
                    checkItemData={checkItem}
                    key={checkItem.id}
                    setCheckItemClicked={setCheckItemClicked}
                    checkItemClicked={checkItemClicked}
                />
            })}
        </div>
        <div className={styles.checkViewButtons}>
            <div onClick={sendButtonHandler}>Send</div>
            <div onClick={splitCheckHandler}>Split</div>
            <div>Print</div>
            <div>Pay</div>
        </div>
    </div>
  )
}

export default CheckView;