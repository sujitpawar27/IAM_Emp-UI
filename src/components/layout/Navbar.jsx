// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Navbar({ onMenuClick }) {
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   return (
//     <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
//       <div className="flex items-center justify-between h-14 px-4 lg:px-6">
//         {/* Left: Menu button + Breadcrumb */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={onMenuClick}
//             className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
//             aria-label="Toggle menu"
//           >
//             <svg
//               className="w-6 h-6 text-slate-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//           <div>
//             <h1 className="text-lg font-semibold text-slate-800">
//               Employee Management
//             </h1>
//             <p className="text-xs text-slate-500 hidden sm:block">
//               Manage your workforce
//             </p>
//           </div>
//         </div>

//         {/* Right: Search + User menu */}
//         <div className="flex items-center gap-2">
//           <div className="hidden md:flex items-center bg-slate-100/80 rounded-lg px-3 py-2 w-48 lg:w-64">
//             <svg
//               className="w-4 h-4 text-slate-400 mr-2 shrink-0"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//             <input
//               type="search"
//               placeholder="Search..."
//               className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
//             />
//           </div>

//           <div className="relative">
//             <button
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
//               aria-expanded={showUserMenu}
//               aria-haspopup="true"
//             >
//               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
//                 U
//               </div>
//               <span className="hidden sm:block text-sm font-medium text-slate-700">
//                 User
//               </span>
//               <svg
//                 className={`w-4 h-4 text-slate-500 transition-transform ${showUserMenu ? "rotate-180" : ""}`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {showUserMenu && (
//               <>
//                 <div
//                   className="fixed inset-0 z-40"
//                   onClick={() => setShowUserMenu(false)}
//                   aria-hidden="true"
//                 />
//                 <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-xl shadow-lg border border-slate-200 z-50">
//                   <Link
//                     to="/profile"
//                     className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
//                     onClick={() => setShowUserMenu(false)}
//                   >
//                     Profile
//                   </Link>
//                   <Link
//                     to="/settings"
//                     className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
//                     onClick={() => setShowUserMenu(false)}
//                   >
//                     Settings
//                   </Link>
//                   <hr className="my-2 border-slate-100" />
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                     onClick={() => setShowUserMenu(false)}
//                   >
//                     Sign out
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Tooltip } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function Navbar({ collapsed, setCollapse }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <Layout.Header className="navbar-component !px-4 lg:!px-6 !h-14 !leading-[3.5rem] bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          <Tooltip title={collapsed ? "Expand menu" : "Collapse menu"}>
            <span
              onClick={() => setCollapse((prev) => !prev)}
              className="text-xl cursor-pointer text-slate-700 hover:text-slate-900"
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </Tooltip>

          {/* Logo / Title */}
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-800">
              Employee Management
            </span>
            <span className="text-xs text-slate-500 hidden sm:block">
              Manage your workforce
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 transition"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <UserOutlined />
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-700">
                User
              </span>
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-slate-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm hover:bg-slate-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Settings
                  </Link>
                  <div className="border-t my-1" />
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout.Header>
  );
}
