import React from 'react'
import styles from './CheckEdit.module.css'
import MenuButtons from './MenuButtons/MenuButtons'
import ItemEdit from './ItemEdit/ItemEdit'

const CheckEdit = (
  {check, setCheck, checkItemClicked, setCheckItemClicked, 
    currButtons, setCurrButtons, multiCheck, setMultiCheck, setCheckNum, checkNum}) => {

  let itemEdit = null;
  

  if(checkItemClicked && checkItemClicked.sent === false){
    itemEdit =(
      <ItemEdit 
        checkItemClicked={checkItemClicked} 
        setCheckItemClicked={setCheckItemClicked} 
        setCheck={setCheck}
        check={check}
        setCurrButtons={setCurrButtons}
        setMultiCheck={setMultiCheck}
        multiCheck={multiCheck}
        checkNum={checkNum}
        />
    )
  }

  function updateCheckOnButton(currItm){
    let currentArr = check;

    currItm.clicked = true
    currItm.id = Math.floor(Math.random()*1000)

    if( currentArr[0].title && currentArr[0].title === "-"){
        currentArr.pop()   
    }

    currentArr.push(currItm)
    setCheck([...currentArr])
    setCheckItemClicked(currItm)

    if(multiCheck){
      multiCheck[checkNum] = [...check]
    }

  }

  function menuButtonHandler(item){
    

    if(item.buttonType === "category"){
        setCurrButtons([...item.subItems])
    }else if(item.buttonType === "menu-item"){
        let itemCopy = Object.assign({}, item)
        updateCheckOnButton(itemCopy)
    }

  }  



  return (
    <>
        <div className={styles.checkEdit}>
            <div>
              <div className={styles.editBar}>
                  <div>Back</div>
                  <div>Exit</div>
                  <div>2:31PM</div>
              </div>
              <div className={styles.buttonsContainer}>
                  {currButtons.map((menuItem)=>{
                      return <MenuButtons 
                          key={currButtons.indexOf(menuItem)}
                          currentButtonData={menuItem} 
                          checkItemClicked={checkItemClicked}
                          onClick={()=>menuButtonHandler(menuItem)}                        
                          />
                  })}

              </div>
            </div>
            {itemEdit}
        </div>
    </>
  )
}

export default CheckEdit