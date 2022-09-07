const createTable = async(user, table, startTime, shiftId, number)=>{
    try{
        const response = await fetch("http://localhost:5000/table/create",{
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-type":"application/json"
            },
            body: JSON.stringify({user, table, startTime, shiftId, number})
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}

const getOpenTables = async()=>{
    try{
        const response = await fetch("http://localhost:5000/table/open", {
            method: "GET"
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}

const getTable = async(tableId)=>{
    try{
        const response = await fetch('http://localhost:5000/table/current-table/'+tableId, {
            method: "GET"
        })

        return response.json()
    }catch(err){
        console.log(err)
    }
}

const compareAndUpdateMulti = async(tableId, multiCheck, user, tableNum)=>{
    try{
        const response = await fetch("http://localhost:5000/table/update-checks/"+tableId, {
            method: "PATCH",
            headers:{
                Accept: "application/json",
                "Content-type":"application/json"
            },
            body:JSON.stringify({multiCheck, user, tableNum})
        })

        return await response.json()
    }catch(err){
        console.log(err)
    }

}

const deleteTable = async(tableId)=>{
    try{
        const response = await fetch("http://localhost:5000/table/"+tableId, {
            method: "DELETE"
        })

        return response.json()
    }catch(err){
        console.log(err)
    }
}


export {createTable, getOpenTables, getTable, deleteTable, compareAndUpdateMulti}