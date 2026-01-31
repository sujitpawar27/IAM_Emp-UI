export default function Select({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  options = [],
  placeholder = "Select...",
  required,
  disabled,
  className = "",
  ...props
}) {
  const hasError = !!error;
  const selectId = props.id || name;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={`
          w-full px-3 py-2.5 rounded-lg border bg-white pr-10
          text-slate-800 appearance-none
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-0
          disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
          bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat
          [background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2364748b%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')]
          ${hasError
            ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
            : "border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/30 hover:border-slate-300"
          }
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hasError && (
        <p
          id={`${name}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-sm text-red-600"
        >
          <svg
            className="w-4 h-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
