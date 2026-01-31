import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/employees", label: "Employees", icon: "👥" },
  { path: "/reports", label: "Reports", icon: "📈" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar({ isOpen, onClose }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

<aside
  className={`
    fixed inset-y-0 left-0 z-50 h-screen
    bg-slate-900 text-white
    transition-all duration-300 ease-in-out
    lg:relative lg:z-auto
    ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 lg:translate-x-0"}
    ${isCollapsed ? "lg:w-20" : "lg:w-64"}
  `}
>

        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            {!isCollapsed && (
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                IAM Emp
              </span>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <span className="text-slate-400">{isCollapsed ? "→" : "←"}</span>
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive
                    ? "bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400"
                    : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                  }
                  ${isCollapsed ? "justify-center px-2" : ""}`
                }
              >
                <span className="text-xl shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <div className="p-3 border-t border-slate-700/50">
              <p className="text-xs text-slate-500">Employee Management v1.0</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
