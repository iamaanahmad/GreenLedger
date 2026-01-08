import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, Leaf, TrendingUp, Calendar } from 'lucide-react';
import { mockLoans } from '../data/mockLoans';
import { Loan } from '../types';

export default function Marketplace() {
  const [loans] = useState(mockLoans);
  const [filterGreenOnly, setFilterGreenOnly] = useState(false);
  const [minScore, setMinScore] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  
  const sectors = ['all', ...Array.from(new Set(loans.map(l => l.sector)))];
  
  const filteredLoans = loans.filter(loan => {
    if (filterGreenOnly && !loan.greenTag) return false;
    if (loan.greenScore < minScore) return false;
    if (selectedSector !== 'all' && loan.sector !== selectedSector) return false;
    if (searchTerm && !loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !loan.projectType.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Green Loan Marketplace</h1>
        <p className="text-gray-600 mt-1">Discover and invest in verified green loans</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search loans..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sectors.map(sector => (
                <option key={sector} value={sector}>
                  {sector === 'all' ? 'All Sectors' : sector}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Green Score</label>
            <input
              type="range"
              min="0"
              max="100"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 mt-1">{minScore}+</div>
          </div>
          
          <div className="flex items-end">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filterGreenOnly}
                onChange={(e) => setFilterGreenOnly(e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Verified Green Only</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredLoans.length} of {loans.length} loans
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLoans.map(loan => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </div>
      
      {filteredLoans.length === 0 && (
        <div className="text-center py-12">
          <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No loans match your filters</p>
        </div>
      )}
    </div>
  );
}

function LoanCard({ loan }: { loan: Loan }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{loan.borrower}</h3>
            <p className="text-sm text-gray-600">{loan.projectType}</p>
          </div>
          {loan.greenTag && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Leaf className="w-3 h-3 mr-1" />
              Verified
            </span>
          )}
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Loan Amount</span>
            <span className="font-semibold text-gray-900">
              {loan.currency} {(loan.amount / 1000000).toFixed(1)}M
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Interest Rate</span>
            <span className="font-semibold text-gray-900">{loan.interestRate}%</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Green Score</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${loan.greenScore}%` }}
                />
              </div>
              <span className="font-semibold text-gray-900">{loan.greenScore}</span>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
            <span>{(loan.esgMetrics.co2Reduction / 1000).toFixed(0)}k tons CO₂ reduction</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>Maturity: {new Date(loan.maturityDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        <Link
          to={`/loan/${loan.id}`}
          className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition-colors text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
