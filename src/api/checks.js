const createCheck = async (user, startTime, shiftId, tableId, checkItems) => {
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/check/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user, startTime, shiftId, tableId, checkItems }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getCheckById = async (checkId) => {
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/check/" + checkId, {
      method: "GET",
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getChecksByTable = async (tableId) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL+"/check/table/" + tableId,
      {
        method: "GET",
      }
    );

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const updateCheck = async (checkItems, checkId) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL+"/check/update/" + checkId,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ checkItems }),
      }
    );

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const updateCheckStatus=async(checkId, tableId, status)=>{
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL+"/check/update-status/" + checkId,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ tableId, status }),
      }
    );

    return response.json();
  } catch (err) {
    console.log(err);
  }
}

const deleteCheck = async (checkId, tableId) => {
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/check/" + checkId, {
      method: "DELETE",
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  createCheck,
  updateCheck,
  updateCheckStatus,
  deleteCheck,
  getCheckById,
  getChecksByTable,
};
