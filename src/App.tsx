import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, FileText, ShoppingCart, BarChart3, Shield, Leaf } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import LoanDetails from './pages/LoanDetails';
import Verification from './pages/Verification';
import Marketplace from './pages/Marketplace';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';

function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/marketplace', icon: ShoppingCart, label: 'Marketplace' },
    { path: '/verification', icon: Shield, label: 'Verification' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/reports', icon: FileText, label: 'Reports' }
  ];
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">GreenLedger</span>
          </div>
          <div className="flex space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  location.pathname === path
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/loan/:id" element={<LoanDetails />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
