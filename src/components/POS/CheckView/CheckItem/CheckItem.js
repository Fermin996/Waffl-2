import React from 'react'
import styles from './CheckItem.module.css'

const CheckItem =({ setCheckItemClicked, checkItemData, checkItemClicked, check }) => {

  let currChItmDiv = styles.chItmDiv
  let itemMod = null;

  if(checkItemData.mods && checkItemData.mods.length > 0){
    itemMod=(
      <div>
        {checkItemData.mods.map((mod)=>{
          return <div key={checkItemData.mods.indexOf(mod)}>
            {mod}
          </div>
        })}
      </div>
    )
  }

  if(checkItemData.sent === true){
    currChItmDiv = styles.sentChItm
  }else if(checkItemClicked && checkItemData.id === checkItemClicked.id){
    currChItmDiv = styles.chItmDivClicked
  }

  function checkItemClickedHandler(){
    if(!checkItemData.sent && checkItemData.title !== "-"){
      setCheckItemClicked(checkItemData)
    }
  }

  return (
    <>
      <div className={currChItmDiv} onClick={checkItemClickedHandler} >
          <div className={styles.itmColumn}>{checkItemData.title}</div>
          <div className={styles.itmColumn2}>{checkItemData.quantity}</div>
          <div className={styles.itmColumn2}>{checkItemData.price}</div>
          <div className={styles.itmColumn3}>{checkItemData.price*checkItemData.quantity}</div>
      </div>
      {itemMod}
    </>
  )
}

export default CheckItem