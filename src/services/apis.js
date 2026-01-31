const BASE_URL = "http://127.0.0.1:8000/users";

export const getEmployeesApi = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createEmployeeApi = async (data) => {
    const res = await fetch(BASE_URL + "/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
};

