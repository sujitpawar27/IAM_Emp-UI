export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "px-4 py-2 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center";

  const variants = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm hover:shadow cursor-pointer",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow cursor-pointer",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
