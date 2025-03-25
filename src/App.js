import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LiveTracking from "./pages/LiveTracking";
import Dashboard from "./components/home/Dashboard";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Notification from "./components/common/Notification";

const App = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [isCollapsed, setIsCollapsed] = useState(false);

  const showNotification = (message, severity = "info") => {
    setNotification({ open: true, message, severity });
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Router>
      {/* Layout manages sidebar collapsing */}
      <Layout isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
        <Routes>
          <Route
            path="/"
            element={<Dashboard showNotification={showNotification} />}
          />
          <Route
            path="/tracking"
            element={
              <LiveTracking
                showNotification={showNotification}
                isCollapsed={isCollapsed}
              />
            }
          />
          <Route
            path="/reports"
            element={<Reports showNotification={showNotification} />}
          />
          <Route
            path="/settings"
            element={<Settings showNotification={showNotification} />}
          />
        </Routes>
      </Layout>

      {/* Global notification system */}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Router>
  );
};

export default App;
