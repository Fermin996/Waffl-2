import React, {useState, useRef} from 'react'
import styles from './ItemEdit.module.css'
import menu from '../../../menu';

const ItemEdit = (
    {checkItemClicked, setCheckItemClicked, setCheck, 
    check, setCurrButtons, setMultiCheck, multiCheck, checkNum}) => {

    const inputRef = useRef()

    const [mod, setMod] = useState(null)

    let currentItem = checkItemClicked;
    let checkCopy = check;
    let foundItem = checkCopy.find(element => element.id === currentItem.id);
    let foundItemIndex = checkCopy.indexOf(foundItem)
    let multiCheckCopy = multiCheck    

    function quantHandler(operation){
        if(operation === "-" && currentItem.quantity > 1){
            foundItem.quantity--
        }else if(operation==="+"){
            foundItem.quantity++
        }
        setCheck([...checkCopy])
    }
    
    function cancelButtonHandler(){
        if(checkItemClicked && check.length > 1){
            checkCopy.splice(foundItemIndex, 1)
        }else if(checkItemClicked){
            checkCopy[0]={title:"-", quantity:0, price:0, total:0}
        }

        setCheck([...checkCopy])
            
        multiCheckCopy[checkNum] = [...checkCopy]
        setMultiCheck(multiCheckCopy)
        setCheckItemClicked(false)
        setCurrButtons(menu)
    }

    function doneButtonHandler(){
        setCheckItemClicked(false)
        setCurrButtons(menu)
    }


    function modSubmitHandler(e){
        e.preventDefault()
        let tempArr = [...foundItem.mods]
        tempArr.push(inputRef.current.value)
        foundItem.mods=tempArr
        setCheck([...checkCopy])
        setMod(null)
    }

    function modClickHandler(){
        setMod(
            <div className={styles.modBox}>
                <form className={styles.modForm} onSubmit={modSubmitHandler}>
                    <input className={styles.textBar} name="modInput" ref={inputRef}/>
                    <div className={styles.modFormBtns}>
                        <p className={styles.modCancel} onClick={()=>setMod(null)}>Cancel</p>
                        <input className={styles.modSubmit} type="submit" value="Submit" />
                    </div>                    
                </form>
            </div>
        )
    }

  return (
    <div className={styles.itemEditDiv}>
            {mod}
            <div className={styles.itemDetails}>
                <div className={styles.quantButton}>
                    <div className={styles.pmDiv} onClick={()=>quantHandler('-')}>
                        <p>-</p>
                    </div>
                    <div className={styles.quantDisplay}><p>{checkItemClicked.quantity}</p></div>
                    <div className={styles.pmDiv} onClick={()=>quantHandler('+')}>
                        <p>+</p>
                    </div>
                </div>
                <div className={styles.modDiv}>
                    <p className={styles.modDivP} onClick={modClickHandler}>Mods</p>
                </div>
                <div className={styles.dcBtns}>
                    <div className={styles.cancelButton}>
                        <p className={styles.cancelButtP} onClick={cancelButtonHandler} >Cancel</p>
                    </div>
                    <div className={styles.doneButton}>
                        <p className={styles.doneButtP} onClick={doneButtonHandler}>Done</p>
                    </div>
                </div>
                
            </div>
        </div>
  )
}

export default ItemEdit