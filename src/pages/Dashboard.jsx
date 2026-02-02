import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Table from "../components/common/Table";
import { fetchEmployees, deleteEmployee } from "../store/slices/employeesSlice";
import { useState } from "react";

/* -------------------- Component -------------------- */

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list: employees, loading, error } = useSelector(
    (state) => state.employees
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  /* -------- Fetch employees -------- */

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  /* -------- Pagination -------- */

  const totalItems = employees.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const paginatedData = employees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /* -------- Handlers -------- */

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    const result = await dispatch(deleteEmployee(id));
    if (deleteEmployee.rejected.match(result)) {
      alert(result.payload || "Failed to delete employee");
    }
  };

  /* -------- Table config -------- */

  const columns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "email", label: "Email" },
    {
      key: "department",
      label: "Department",
      render: (value) => value?.name ?? "—",
    },
  ];

  /* -------------------- UI -------------------- */

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
          <p className="mt-1 text-sm text-slate-500">
            View and manage your organization&apos;s employees
          </p>
        </div>

        <Link to="/employee">
          <Button>Add Employee</Button>
        </Link>
      </div>

      <Table
        columns={columns}
        data={paginatedData}
        loading={loading}
        emptyMessage="No employees found. Add your first employee to get started."
        rowActions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <Link to={`/employee/${row.id}`}>
              <Button variant="secondary" className="!py-1.5 !px-3 !text-sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="danger"
              className="!py-1.5 !px-3 !text-sm"
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </Button>
          </div>
        )}
        pagination={
          totalItems > 0
            ? {
                currentPage,
                totalPages,
                pageSize,
                totalItems,
                onPageChange: setCurrentPage,
                onPageSizeChange: (size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                },
                pageSizeOptions: PAGE_SIZE_OPTIONS,
              }
            : undefined
        }
      />
    </div>
  );
}
