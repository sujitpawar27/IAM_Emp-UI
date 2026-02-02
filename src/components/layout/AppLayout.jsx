import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  DashboardOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const menuItems = [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: <NavLink to="/">Dashboard</NavLink>,
  },
  {
    key: "/employees",
    icon: <TeamOutlined />,
    label: <NavLink to="/employees">Employees</NavLink>,
  },
  {
    key: "/reports",
    icon: <BarChartOutlined />,
    label: <NavLink to="/reports">Reports</NavLink>,
  },
  {
    key: "/settings",
    icon: <SettingOutlined />,
    label: <NavLink to="/settings">Settings</NavLink>,
  },
];
const { Content } = Layout;

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  console.log("Collapsed", sidebarCollapsed);

  return (
    <Layout hasSider className="h-screen bg-slate-50">
      {/* ================= SIDEBAR ================= */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapse={(value) => setSidebarCollapsed(value)}
        menuItems={menuItems}
      />

      {/* ================= MAIN LAYOUT ================= */}
      <Layout className="relative">
        {/* NAVBAR */}
        <Navbar
          collapsed={sidebarCollapsed}
          setCollapse={setSidebarCollapsed}
        />

        {/* PAGE CONTENT */}
        <Content className="p-4 lg:p-6 overflow-auto bg-slate-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
