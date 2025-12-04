"use client";

import { useState } from "react";
import Navigation from "./components/Navigation";
import DashboardPage from "./components/DashboardPage";
import LogsPage from "./components/LogsPage";
import AlertsPage from "./components/AlertsPage";
import IssuesPage from "./components/IssuesPage";
import SettingsPage from "./components/SettingsPage";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <DashboardPage />;
      case "Logs":
        return <LogsPage />;
      case "Alerts":
        return <AlertsPage />;
      case "Issues":
        return <IssuesPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}
