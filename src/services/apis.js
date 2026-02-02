const BASE_URL = "http://127.0.0.1:8000/users";

export const getEmployeesApi = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
};

export const createEmployeeApi = async (data) => {
  const res = await fetch(BASE_URL + "/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create employee");
  return res.json();
};

export const getDepartmentsApi = async () => {
  const res = await fetch("http://127.0.0.1:8000/departments");
  if (!res.ok) throw new Error("Failed to fetch departments");
  return res.json();
};

export const updateEmployeeApi = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  return res.json();
};

export const getEmployeeByIdApi = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch employee");
  return res.json();
};

export const deleteEmployeeApi = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employee");
};