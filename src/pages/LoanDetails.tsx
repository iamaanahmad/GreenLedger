import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Leaf, TrendingUp, Calendar, DollarSign, FileText, CheckCircle, Award } from 'lucide-react';
import { mockLoans } from '../data/mockLoans';
import { getScoreCategory } from '../utils/greenScoring';

export default function LoanDetails() {
  const { id } = useParams<{ id: string }>();
  const [loan] = useState(mockLoans.find(l => l.id === id));
  
  if (!loan) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loan not found</p>
        <Link to="/" className="text-primary hover:text-secondary mt-4 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }
  
  const scoreCategory = getScoreCategory(loan.greenScore);
  
  return (
    <div className="space-y-6">
      <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Link>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{loan.borrower}</h1>
            <p className="text-gray-600 mt-1">{loan.projectType} • {loan.sector}</p>
          </div>
          {loan.greenTag && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">GreenTag Verified</span>
              </div>
              <p className="text-xs text-gray-600">ID: {loan.greenTag.id}</p>
              <p className="text-xs text-gray-600">Verified by: {loan.greenTag.verifiedBy}</p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600">Loan Amount</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {loan.currency} {(loan.amount / 1000000).toFixed(1)}M
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-600">Green Score</span>
            </div>
            <p className={`text-2xl font-bold ${scoreCategory.color}`}>
              {loan.greenScore}
            </p>
            <p className="text-xs text-gray-600 mt-1">{scoreCategory.label}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Interest Rate</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{loan.interestRate}%</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-600">Maturity Date</span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {new Date(loan.maturityDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Environmental Impact</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">CO₂ Reduction (tons/year)</span>
                <span className="font-semibold text-gray-900">
                  {loan.esgMetrics.co2Reduction.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${Math.min(100, (loan.esgMetrics.co2Reduction / 100000) * 100)}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Renewable Energy %</span>
                <span className="font-semibold text-gray-900">
                  {loan.esgMetrics.renewableEnergyPercent}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${loan.esgMetrics.renewableEnergyPercent}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Water Saved (m³/year)</span>
                <span className="font-semibold text-gray-900">
                  {loan.esgMetrics.waterSaved.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-cyan-500 h-2 rounded-full"
                  style={{ width: `${Math.min(100, (loan.esgMetrics.waterSaved / 50000) * 100)}%` }}
                />
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-700">{loan.esgMetrics.impactDescription}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications & Goals</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {loan.esgMetrics.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Sustainability Goals</h3>
              <ul className="space-y-2">
                {loan.esgMetrics.sustainabilityGoals.map((goal, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Leaf className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loan.documents.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-600">
                    Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {doc.verified && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {loan.greenTag && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">GreenTag Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600">Tag ID</p>
              <p className="font-mono text-sm font-semibold text-gray-900 mt-1">{loan.greenTag.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Issued Date</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {new Date(loan.greenTag.issuedDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Expiry Date</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {new Date(loan.greenTag.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg border border-green-300">
            <p className="text-xs text-gray-600 mb-1">Immutable Verification</p>
            <p className="text-sm text-gray-700">
              This GreenTag is cryptographically secured and cannot be modified. All verification 
              steps are permanently recorded in the audit trail, ensuring transparency and accountability.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
