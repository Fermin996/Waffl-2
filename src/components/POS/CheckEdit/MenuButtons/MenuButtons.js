import React from 'react'
import styles from './MenuButtons.module.css'

const MenuButtons = ({currentButtonData, checkItemClicked, onClick}) => {

  let currStyle = styles.currentButton

  
  if(checkItemClicked && checkItemClicked.title === currentButtonData.title){
    currStyle = styles.currentButtonSelected
  }


  return (
    <div className={currStyle} onClick={onClick}>
        {currentButtonData.title}
    </div>
  )
}

export default MenuButtons;