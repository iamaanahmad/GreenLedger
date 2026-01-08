import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Leaf, DollarSign, Award, ArrowRight } from 'lucide-react';
import { mockLoans } from '../data/mockLoans';
import { PortfolioMetrics } from '../types';

export default function Dashboard() {
  const [loans] = useState(mockLoans);
  
  const metrics: PortfolioMetrics = {
    totalLoans: loans.length,
    totalValue: loans.reduce((sum, loan) => sum + loan.amount, 0),
    greenLoans: loans.filter(l => l.greenTag !== null).length,
    greenValue: loans.filter(l => l.greenTag !== null).reduce((sum, loan) => sum + loan.amount, 0),
    averageGreenScore: Math.round(loans.reduce((sum, loan) => sum + loan.greenScore, 0) / loans.length),
    totalCO2Reduction: loans.reduce((sum, loan) => sum + loan.esgMetrics.co2Reduction, 0),
    greenPercentage: Math.round((loans.filter(l => l.greenTag !== null).length / loans.length) * 100)
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Overview</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your green loan portfolio</p>
        </div>
        <Link
          to="/verification"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors flex items-center space-x-2"
        >
          <span>New Loan Verification</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<DollarSign className="w-6 h-6" />}
          title="Total Portfolio Value"
          value={`$${(metrics.totalValue / 1000000).toFixed(1)}M`}
          subtitle={`${metrics.totalLoans} loans`}
          color="bg-blue-500"
        />
        <MetricCard
          icon={<Leaf className="w-6 h-6" />}
          title="Green Loans"
          value={`${metrics.greenPercentage}%`}
          subtitle={`${metrics.greenLoans} verified loans`}
          color="bg-green-500"
        />
        <MetricCard
          icon={<Award className="w-6 h-6" />}
          title="Avg Green Score"
          value={metrics.averageGreenScore.toString()}
          subtitle="Portfolio average"
          color="bg-purple-500"
        />
        <MetricCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="CO₂ Reduction"
          value={`${(metrics.totalCO2Reduction / 1000).toFixed(0)}k`}
          subtitle="tons annually"
          color="bg-emerald-500"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Recent Loans</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Borrower</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Green Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{loan.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{loan.borrower}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{loan.projectType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {loan.currency} {(loan.amount / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${loan.greenScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{loan.greenScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {loan.greenTag ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Leaf className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {loan.verificationStatus}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/loan/${loan.id}`}
                      className="text-primary hover:text-secondary text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

function MetricCard({ icon, title, value, subtitle, color }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div className={`${color} text-white p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
