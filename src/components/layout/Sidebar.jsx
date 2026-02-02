import React from "react";
import { Layout, Menu, Divider, Input } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { SearchOutlined } from "@ant-design/icons";


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
      <div
  className="sidebar-top-logo flex items-center justify-center gap-2 py-2"
  style={{ textAlign: "center" }}
      >
        <FiUser className="text-lg" />
        {!collapsed && <span className="text-base font-medium">User</span>}
      </div>
        <Divider className="my-0" />

        <div className="px-3 py-3">
        {collapsed ? (
          <div className="flex justify-center">
            <SearchOutlined className="text-lg text-gray-500" />
          </div>
        ) : (
          <Input
            placeholder="Search menu..."
            prefix={<SearchOutlined />}
            allowClear
          />
        )}
      </div>
      <div className="sidebar-content flex flex-col h-full">

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
