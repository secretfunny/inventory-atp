import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import Inventaris from "./pages/Inventaris";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected layout wraps the dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="inventaris" element={<Inventaris />} />
          <Route path="pengajuan" element={<div>Pengajuan Page</div>} />
          <Route path="maintenance" element={<div>Maintenance Page</div>} />
          <Route path="incident" element={<div>Incident Report Page</div>} />
          <Route path="audit" element={<div>Audit Stock Opname Page</div>} />
          <Route path="laporan" element={<div>Laporan Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
          <Route path="inventaris" element={<Inventaris />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
