import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, DollarSign, Leaf, Award } from 'lucide-react';
import { mockLoans } from '../data/mockLoans';

export default function Analytics() {
  const [loans] = useState(mockLoans);
  
  const sectorData = loans.reduce((acc, loan) => {
    const existing = acc.find(item => item.sector === loan.sector);
    if (existing) {
      existing.count += 1;
      existing.value += loan.amount;
    } else {
      acc.push({ sector: loan.sector, count: 1, value: loan.amount });
    }
    return acc;
  }, [] as Array<{ sector: string; count: number; value: number }>);
  
  const scoreDistribution = [
    { range: '0-30', count: loans.filter(l => l.greenScore < 30).length },
    { range: '30-50', count: loans.filter(l => l.greenScore >= 30 && l.greenScore < 50).length },
    { range: '50-70', count: loans.filter(l => l.greenScore >= 50 && l.greenScore < 70).length },
    { range: '70-85', count: loans.filter(l => l.greenScore >= 70 && l.greenScore < 85).length },
    { range: '85-100', count: loans.filter(l => l.greenScore >= 85).length }
  ];
  
  const yieldVsScore = loans.map(loan => ({
    score: loan.greenScore,
    yield: loan.interestRate,
    name: loan.borrower,
    amount: loan.amount / 1000000
  }));
  
  const co2Data = loans.map(loan => ({
    name: loan.borrower.substring(0, 15),
    co2: loan.esgMetrics.co2Reduction / 1000
  }));
  
  const COLORS = ['#10b981', '#059669', '#34d399', '#6ee7b7', '#a7f3d0'];
  
  const totalValue = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const avgScore = Math.round(loans.reduce((sum, loan) => sum + loan.greenScore, 0) / loans.length);
  const totalCO2 = loans.reduce((sum, loan) => sum + loan.esgMetrics.co2Reduction, 0);
  const greenLoans = loans.filter(l => l.greenTag !== null).length;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ESG Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Portfolio performance and environmental impact metrics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          icon={<DollarSign className="w-6 h-6" />}
          title="Total Portfolio"
          value={`$${(totalValue / 1000000).toFixed(1)}M`}
          color="bg-blue-500"
        />
        <MetricCard
          icon={<Award className="w-6 h-6" />}
          title="Avg Green Score"
          value={avgScore.toString()}
          color="bg-purple-500"
        />
        <MetricCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="CO₂ Reduction"
          value={`${(totalCO2 / 1000).toFixed(0)}k tons`}
          color="bg-emerald-500"
        />
        <MetricCard
          icon={<Leaf className="w-6 h-6" />}
          title="Verified Green"
          value={`${greenLoans}/${loans.length}`}
          color="bg-green-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Green Score Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio by Sector</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorData}
                dataKey="count"
                nameKey="sector"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {sectorData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">CO₂ Reduction by Loan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={co2Data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis label={{ value: 'CO₂ (k tons)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="co2" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Yield vs Green Score</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="score" name="Green Score" />
              <YAxis dataKey="yield" name="Interest Rate %" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Loans" data={yieldVsScore} fill="#10b981" />
            </ScatterChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-600 mt-2">
            Higher green scores typically correlate with lower interest rates, reflecting reduced risk and premium pricing.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Portfolio Health</h3>
            <p className="text-sm text-gray-700">
              {Math.round((greenLoans / loans.length) * 100)}% of loans are verified green, 
              demonstrating strong ESG commitment and reduced regulatory risk.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Environmental Impact</h3>
            <p className="text-sm text-gray-700">
              Portfolio prevents {(totalCO2 / 1000).toFixed(0)}k tons of CO₂ annually, 
              equivalent to removing {Math.round(totalCO2 / 4600)} cars from the road.
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Risk-Return Profile</h3>
            <p className="text-sm text-gray-700">
              Average green score of {avgScore} indicates strong sustainability credentials, 
              enabling competitive pricing and market differentiation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

function MetricCard({ icon, title, value, color }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className={`${color} text-white p-3 rounded-lg w-fit mb-4`}>
        {icon}
      </div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
