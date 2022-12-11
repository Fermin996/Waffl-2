
const clockIn = async(pin)=>{
    try{
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/user/clockIn", {
            method: "POST",
            headers:{
                Accept: "application/json",
                "Content-type":"application/json"
            },
            body: JSON.stringify({pin})
        })
        return response.json();
    }catch(err){
        console.log(err)
    }
}



export {clockIn}