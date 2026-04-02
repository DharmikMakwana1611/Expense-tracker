import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  Sun, Moon, ChevronLeft, ChevronRight, Shield, Eye
} from "lucide-react";

const NAV = [
  { id: "dashboard",     label: "Dashboard",     icon: LayoutDashboard },
  { id: "transactions",  label: "Transactions",  icon: ArrowLeftRight  },
  { id: "insights",      label: "Insights",      icon: Lightbulb       },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const { activeTab, darkMode, currentUser, role } = state;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        relative flex flex-col h-full transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-60"}
        ${darkMode
          ? "bg-gray-900 border-r border-gray-800"
          : "bg-white border-r border-gray-200"}
      `}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`
          absolute -right-3 top-6 z-10 w-6 h-6 rounded-full flex items-center justify-center
          text-xs shadow-lg transition-all duration-200
          ${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}
        `}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          ₹
        </div>
        {!collapsed && (
          <span className={`font-bold text-lg tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
            FinTrack
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-1">
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => dispatch({ type: "SET_TAB", payload: id })}
              title={collapsed ? label : ""}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-150 group
                ${collapsed ? "justify-center" : ""}
                ${active
                  ? "bg-emerald-500 text-white shadow-sm"
                  : darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}
              `}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`px-2 py-3 space-y-2 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        {/* Role Switcher */}
        <div className={`${collapsed ? "flex justify-center" : "px-2"}`}>
          {collapsed ? (
            <button
              title={`Switch role (${role})`}
              onClick={() => dispatch({ type: "SET_ROLE", payload: role === "admin" ? "viewer" : "admin" })}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                ${role === "admin"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-blue-500/20 text-blue-400"}`}
            >
              {role === "admin" ? <Shield size={14} /> : <Eye size={14} />}
            </button>
          ) : (
            <div className="space-y-1.5">
              <p className={`text-xs font-medium uppercase tracking-wider ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                Role
              </p>
              <div className={`flex rounded-lg p-0.5 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                {["admin", "viewer"].map((r) => (
                  <button
                    key={r}
                    onClick={() => dispatch({ type: "SET_ROLE", payload: r })}
                    className={`
                      flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium
                      transition-all duration-150 capitalize
                      ${role === r
                        ? r === "admin"
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "bg-blue-500 text-white shadow-sm"
                        : darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"}
                    `}
                  >
                    {r === "admin" ? <Shield size={10} /> : <Eye size={10} />}
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch({ type: "TOGGLE_DARK" })}
          className={`
            w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all
            ${collapsed ? "justify-center" : ""}
            ${darkMode
              ? "text-gray-400 hover:text-yellow-400 hover:bg-gray-800"
              : "text-gray-500 hover:text-orange-500 hover:bg-gray-100"}
          `}
          title="Toggle theme"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        {/* User Card */}
        {!collapsed && (
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
              ${role === "admin" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"}
            `}>
              {currentUser.avatar}
            </div>
            <div className="min-w-0">
              <p className={`text-xs font-semibold truncate ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                {currentUser.name}
              </p>
              <p className={`text-xs capitalize ${role === "admin" ? "text-emerald-400" : "text-blue-400"}`}>
                {role}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
