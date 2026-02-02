import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import { getEmployeeByIdApi } from "../services/apis";
import {
  createEmployee,
  updateEmployee,
} from "../store/slices/employeesSlice";
import { fetchDepartments } from "../store/slices/departmentsSlice";

/* -------------------- Constants -------------------- */

const ROLES = [
  { value: "Developer", label: "Developer" },
  { value: "Designer", label: "Designer" },
  { value: "Manager", label: "Manager" },
  { value: "Analyst", label: "Analyst" },
  { value: "HR Specialist", label: "HR Specialist" },
  { value: "Marketing Lead", label: "Marketing Lead" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* -------------------- Validation -------------------- */

function validateForm(values) {
  const errors = {};

  if (!values.name?.trim()) errors.name = "Name is required";
  else if (values.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters";

  if (!values.email?.trim()) errors.email = "Email is required";
  else if (!EMAIL_REGEX.test(values.email.trim()))
    errors.email = "Enter a valid email address";

  if (!values.role) errors.role = "Role is required";

  if (values.phone && !/^[\d\s\-+()]*$/.test(values.phone))
    errors.phone = "Invalid phone number";

  return errors;
}

/* -------------------- Component -------------------- */

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);

  const { list: departmentsRaw } = useSelector((state) => state.departments);

  const departments = departmentsRaw.map((d) => ({
    value: d.id ?? d.name,
    label: d.name,
  }));

  const [values, setValues] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* -------- Fetch departments -------- */

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  /* -------- Fetch employee on edit -------- */

  useEffect(() => {
    if (!isEditMode) return;

    const fetchEmployee = async () => {
      try {
        const employee = await getEmployeeByIdApi(id);
        setValues({
          name: employee.name || "",
          email: employee.email || "",
          role: employee.role || "",
          department: employee.department?.id ?? employee.department?.name ?? "",
          phone: employee.phone || "",
        });
      } catch (err) {
        alert("Failed to load employee");
        navigate("/employees");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id, isEditMode, navigate]);

  /* -------- Handlers -------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validateForm({ ...values, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      role: true,
      department: true,
      phone: true,
    });

    const formErrors = validateForm(values);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      role: values.role,
      department_id: Number(values.department),
    };

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        const result = await dispatch(
          updateEmployee({ id, data: payload })
        );
        if (updateEmployee.rejected.match(result)) {
          alert(result.payload || "Something went wrong. Please try again.");
          setIsSubmitting(false);
          return;
        }
      } else {
        const result = await dispatch(createEmployee(payload));
        if (createEmployee.rejected.match(result)) {
          alert(result.payload || "Something went wrong. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }
      navigate("/employees");
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading employee...</div>;
  }

  /* -------------------- UI -------------------- */

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          {isEditMode ? "Edit Employee" : "Add Employee"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {isEditMode
            ? "Update employee information"
            : "Fill in the details to add a new employee"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-slate-200 shadow-sm"
      >
        <div className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
              placeholder="Enter your name"
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              placeholder="e.g. example@example.com"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Select
              label="Role"
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.role && errors.role}
              options={ROLES}
              required
            />
            <Select
              label="Department"
              name="department"
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.department && errors.department}
              options={departments}
              required
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/employees")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEditMode
              ? "Update Employee"
              : "Add Employee"}
          </Button>
        </div>
      </form>
    </div>
  );
}
