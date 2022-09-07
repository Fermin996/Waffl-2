const createCheck = async (user, startTime, shiftId, tableId, checkItems) => {
  try {
    const response = await fetch("http://localhost:5000/check/create", {
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
    const response = await fetch("http://localhost:5000/check/" + checkId, {
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
      "http://localhost:5000/check/table/" + tableId,
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
      "http://localhost:5000/check/update/" + checkId,
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

const deleteCheck = async (checkId, tableId) => {
  try {
    const response = await fetch("http://localhost:5000/check/" + checkId, {
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
  deleteCheck,
  getCheckById,
  getChecksByTable,
};
