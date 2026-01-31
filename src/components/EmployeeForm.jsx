import { useState } from "react";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Valid Data:", formData);

    setFormData({
      name: "",
      email: "",
      role: "",
      department: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Create Employee</h2>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />
        {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
      </div>

      <div>
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />
        {errors.department && (
          <p style={{ color: "red" }}>{errors.department}</p>
        )}
      </div>

      <button type="submit">Create</button>
    </form>
  );
};

export default EmployeeForm;
