import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Table from "../components/common/Table";

const MOCK_EMPLOYEES = [
  { id: 1, name: "John Doe", role: "Developer", email: "john.doe@example.com", department: "IT" },
  { id: 2, name: "Jane Smith", role: "Designer", email: "jane.smith@example.com", department: "Design" },
  { id: 3, name: "Bob Wilson", role: "Manager", email: "bob.wilson@example.com", department: "Operations" },
  { id: 4, name: "Alice Brown", role: "Developer", email: "alice.brown@example.com", department: "IT" },
  { id: 5, name: "Charlie Davis", role: "HR Specialist", email: "charlie.davis@example.com", department: "HR" },
  { id: 6, name: "Diana Evans", role: "Analyst", email: "diana.evans@example.com", department: "Finance" },
  { id: 7, name: "Edward Foster", role: "Developer", email: "edward.foster@example.com", department: "IT" },
  { id: 8, name: "Fiona Green", role: "Marketing Lead", email: "fiona.green@example.com", department: "Marketing" },
];

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmployees(MOCK_EMPLOYEES);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const totalItems = employees.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedData = employees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
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

      {/* Table card */}
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
