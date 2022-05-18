import React, {useState} from 'react'
import menu from '../menu';
import CheckEdit from './CheckEdit/CheckEdit';
import CheckView from './CheckView/CheckView';
import styles from './POS.module.css'

const POS = () => {

  const [multiCheck, setMultiCheck] = useState(false)
  const [check, setCheck] = useState([{title:"-", quantity:0, price:0, total:0}])
  const [currButtons, setCurrButtons] = useState(menu)
  const [checkItemClicked, setCheckItemClicked] = useState(false)
  const [checkNum, setCheckNum] = useState(0)
  const [splitCheckOpen, setSplitCheckOpen] = useState(false)

  let deleteEmptyCheckBtn = null;
  let splitItmStyle = null;
  let multiCheckCopy = multiCheck
  console.log(multiCheck)
  function addSplitCheckHandler(){

    if(multiCheck.length < 6){
      multiCheckCopy.push([{title:"-", quantity:0, price:0, total:0}])
      setMultiCheck([...multiCheckCopy])
    }

  }

  function splitBackHandler(){
    setSplitCheckOpen(false)
  }

  function deleteEmptyCheckHandler(checkIndex){
    if(multiCheckCopy.length === 2){
      console.log(multiCheck)
      setSplitCheckOpen(false)
      setCheck([...multiCheckCopy[0]])
      setMultiCheck(false)
    }else{
      multiCheckCopy.splice(checkIndex, 1)
      setMultiCheck([...multiCheckCopy])
    }
  }

  function splitCheckItemHandler(item, index){
    if(!checkItemClicked){
      setCheckItemClicked(item)
      setCheckNum(index)
    }else if(index === checkNum){
      setCheckItemClicked(false)
    }else{
      
      if(multiCheck[checkNum].length === 1 && multiCheck[checkNum][0] !== "-"){
        multiCheckCopy[index].push(checkItemClicked)
        multiCheckCopy[checkNum] = [{title:"-", quantity:0, price:0, total:0}]
      }else{

        if(multiCheckCopy[index][0].title === "-"){
          multiCheckCopy[index].pop()
        }

        multiCheckCopy[index].push(checkItemClicked)
        multiCheckCopy[checkNum].splice(multiCheckCopy[checkNum].indexOf(checkItemClicked), 1)
      }

      setMultiCheck([...multiCheckCopy])
      setCheckItemClicked(false)

    }

  }

  let PosView =(
    <div className={styles.posDiv}>
        <div className={styles.checkView}>
          <CheckView 
              multiCheck={multiCheck}
              setMultiCheck={setMultiCheck}
              check={check}
              setCheck={setCheck}
              setCheckItemClicked={setCheckItemClicked} 
              checkItemClicked={checkItemClicked}   
              checkNum={checkNum}
              setCheckNum={setCheckNum}
              setCurrButtons={setCurrButtons}
              setSplitCheckOpen={setSplitCheckOpen}
          />
        </div>
        <div className={styles.checkEdit}>
          <CheckEdit 
              check={check}    
              setCheck={setCheck}
              checkItemClicked={checkItemClicked}
              setCheckItemClicked={setCheckItemClicked}
              currButtons={currButtons}
              setCurrButtons={setCurrButtons}
              multiCheck={multiCheck}
              setMultiCheck={setMultiCheck}
              checkNum={checkNum}
              setCheckNum={setCheckNum}
          />
        </div>
    </div>
  )  
    
  let addCheck = null;
  
  if(multiCheck.length === 6){
    addCheck = null
  }else if(splitCheckOpen && multiCheck.length%2!==0){
    addCheck=(
      <div className={styles.splitCheck} onClick={addSplitCheckHandler}>
            <p>Add Check</p>
        </div>
    )
  }else if(multiCheck.length %2===0){
    addCheck=(
      <>
        <div className={styles.splitCheck} onClick={addSplitCheckHandler}>
          <p>Add Check</p>
        </div>
        <div className={styles.splitCheck} onClick={addSplitCheckHandler}>
          <p>Add Check</p>
        </div>
      </> 
    )
  }


  if(splitCheckOpen){
    PosView=(
      <>
        <div className={styles.splitHeader}>
          <div className={styles.splitBackBtn} onClick={splitBackHandler}>
            Back
          </div>
        </div>
        <div className={styles.splitCheckView}>
              
         {multiCheck.map((currCheck) => {
           if(currCheck[0].title === '-' && multiCheck.indexOf(currCheck) !== 0){
              deleteEmptyCheckBtn = <div onClick={()=>deleteEmptyCheckHandler(multiCheck.indexOf(currCheck))}> Delete </div>
           }
           return (
            <div className={styles.splitCheck}>
              {deleteEmptyCheckBtn}
              {currCheck.map((checkItm)=>{
                if(checkItemClicked && checkItemClicked.id === checkItm.id){
                  splitItmStyle = styles.splitItmClicked
                }else{
                  splitItmStyle = null;
                }
                return <p className={splitItmStyle} onClick={()=>splitCheckItemHandler(checkItm, multiCheck.indexOf(currCheck))}>
                 {checkItm.title}
                </p>
              })}
            </div>)
       })}

       {addCheck}
     </div>
     </>
   )
  }
    


  return (
    <div>
        {PosView}
    </div>
  )
}

export default POS;