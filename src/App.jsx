import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/layout/Sidebar";
import DashboardPage from "./components/dashboard/DashboardPage";
import TransactionsPage from "./components/transactions/TransactionsPage";
import InsightsPage from "./components/insights/InsightsPage";

function AppContent() {
  const { state } = useApp();
  const { activeTab, darkMode } = state;

  const pages = {
    dashboard:    <DashboardPage />,
    transactions: <TransactionsPage />,
    insights:     <InsightsPage />,
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans ${darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {pages[activeTab] || <DashboardPage />}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
