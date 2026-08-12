import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { Login } from './pages/Login';
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { ReportHazard } from './pages/employee/ReportHazard';
import { AiAnalysis } from './pages/employee/AiAnalysis';
import { MyReports } from './pages/employee/MyReports';
import { MyActions } from './pages/employee/MyActions';
import { AssignedActionDetail } from './pages/employee/AssignedActionDetail';
import { ManagerDashboard } from './pages/manager/ManagerDashboard';
import { HazardReports } from './pages/manager/HazardReports';
import { HazardDetail } from './pages/manager/HazardDetail';
import { CorrectiveActions } from './pages/manager/CorrectiveActions';
import { SafetyAnalytics } from './pages/manager/SafetyAnalytics';
import { Heatmap } from './pages/manager/Heatmap';
import { SafetyReports } from './pages/manager/SafetyReports';
import { NotificationCenter } from './pages/NotificationCenter';
import { Administration } from './pages/admin/Administration';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<AppLayout role="employee" />}>
            <Route path="/employee" element={<EmployeeDashboard />} />
            <Route path="/employee/report" element={<ReportHazard />} />
            <Route path="/employee/analysis/:id" element={<AiAnalysis />} />
            <Route path="/employee/reports" element={<MyReports />} />
            <Route path="/employee/actions" element={<MyActions />} />
            <Route
              path="/employee/actions/:id"
              element={<AssignedActionDetail />} />
            
            <Route
              path="/employee/notifications"
              element={<NotificationCenter audience="employee" />} />
            
          </Route>

          <Route element={<AppLayout role="manager" />}>
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/manager/hazards" element={<HazardReports />} />
            <Route path="/manager/hazards/:id" element={<HazardDetail />} />
            <Route path="/manager/actions" element={<CorrectiveActions />} />
            <Route path="/manager/analytics" element={<SafetyAnalytics />} />
            <Route path="/manager/heatmap" element={<Heatmap />} />
            <Route path="/manager/reports" element={<SafetyReports />} />
            <Route
              path="/manager/notifications"
              element={<NotificationCenter audience="manager" />} />
            
          </Route>

          <Route element={<AppLayout role="admin" />}>
            <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
            <Route path="/admin/:tab" element={<Administration />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>);

}