import React from "react";
import { Layout, Menu, Divider } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";

export default function Sidebar({ collapsed, onCollapse, menuItems }) {
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      trigger={null}
      width="var(--sidebarOpenWidth)"
      collapsedWidth="var(--sidebarClosedWidth)"
      className="sidebar-component"
    >
      {/* ================= TOP USER SECTION ================= */}
      <div
        className="sidebar-top-logo flex items-center justify-center gap-2 py-4"
        style={{ textAlign: "center" }}
      >
        <FiUser className="text-lg" />
        {!collapsed && <span className="text-base font-medium">User</span>}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="sidebar-content flex flex-col h-full">
        <div className="p-2">{/* <ClientSelector /> */}</div>

        <Divider className="my-0" />

        {/* ================= MENU ================= */}
        <Menu
          theme="light"
          mode="inline"
          selectable={false}
          inlineIndent={12}
          inlineCollapsed={collapsed}
          style={{
            background: "var(--sidebarBackground)",
            color: "var(--sidebarTextColor)",
            border: "none",
            fontSize: "15px",
            fontWeight: 500,
          }}
          items={menuItems}
        />
      </div>
    </Layout.Sider>
  );
}
