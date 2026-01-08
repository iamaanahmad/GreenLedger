import { useState } from 'react';
import { Download, FileText, Calendar, Building2, Leaf, TrendingUp } from 'lucide-react';
import { mockLoans } from '../data/mockLoans';
import { format } from 'date-fns';

export default function Reports() {
  const [loans] = useState(mockLoans);
  const [reportType, setReportType] = useState<'esg' | 'portfolio' | 'compliance'>('esg');
  
  const generateReport = () => {
    alert('Report generation initiated. In production, this would generate a PDF report.');
  };
  
  const totalValue = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const greenLoans = loans.filter(l => l.greenTag !== null);
  const totalCO2 = loans.reduce((sum, loan) => sum + loan.esgMetrics.co2Reduction, 0);
  const avgScore = Math.round(loans.reduce((sum, loan) => sum + loan.greenScore, 0) / loans.length);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ESG Reporting</h1>
        <p className="text-gray-600 mt-1">Generate comprehensive reports for regulators and investors</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setReportType('esg')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              reportType === 'esg' ? 'border-primary bg-green-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Leaf className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold text-gray-900">ESG Impact Report</h3>
            <p className="text-sm text-gray-600 mt-1">Environmental metrics and sustainability goals</p>
          </button>
          
          <button
            onClick={() => setReportType('portfolio')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              reportType === 'portfolio' ? 'border-primary bg-green-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Building2 className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold text-gray-900">Portfolio Summary</h3>
            <p className="text-sm text-gray-600 mt-1">Comprehensive portfolio overview and analytics</p>
          </button>
          
          <button
            onClick={() => setReportType('compliance')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              reportType === 'compliance' ? 'border-primary bg-green-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <FileText className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold text-gray-900">Regulatory Compliance</h3>
            <p className="text-sm text-gray-600 mt-1">Compliance documentation for regulators</p>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Report Preview</h2>
          <button
            onClick={generateReport}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
        
        <div className="p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {reportType === 'esg' && 'ESG Impact Report'}
                  {reportType === 'portfolio' && 'Portfolio Summary Report'}
                  {reportType === 'compliance' && 'Regulatory Compliance Report'}
                </h1>
                <p className="text-gray-600 mt-2">Generated on {format(new Date(), 'MMMM dd, yyyy')}</p>
                <p className="text-sm text-gray-500 mt-1">GreenLedger Platform</p>
              </div>
              <Leaf className="w-16 h-16 text-primary" />
            </div>
            
            <div className="border-t border-b py-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Reporting Period</p>
                <p className="font-semibold text-gray-900">Q1 2026</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Report ID</p>
                <p className="font-semibold text-gray-900">RPT-2026-001</p>
              </div>
            </div>
          </div>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <p className="text-gray-700">
                This report provides a comprehensive overview of our green loan portfolio's environmental 
                impact and sustainability performance for Q1 2026. Our portfolio demonstrates strong 
                commitment to ESG principles with {Math.round((greenLoans.length / loans.length) * 100)}% 
                of loans carrying verified GreenTag certification.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Loans</p>
                  <p className="text-2xl font-bold text-gray-900">{loans.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Portfolio Value</p>
                  <p className="text-2xl font-bold text-gray-900">${(totalValue / 1000000).toFixed(1)}M</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Avg Score</p>
                  <p className="text-2xl font-bold text-gray-900">{avgScore}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">CO₂ Saved</p>
                  <p className="text-2xl font-bold text-gray-900">{(totalCO2 / 1000).toFixed(0)}k</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Environmental Impact</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Carbon Emissions Reduction</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    Portfolio loans prevent {(totalCO2 / 1000).toFixed(1)}k tons of CO₂ emissions annually, 
                    equivalent to removing approximately {Math.round(totalCO2 / 4600)} passenger vehicles 
                    from the road for one year.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Leaf className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Renewable Energy Generation</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    {loans.filter(l => l.projectType.includes('Energy')).length} loans support renewable 
                    energy projects with an average renewable energy percentage of{' '}
                    {Math.round(loans.reduce((sum, l) => sum + l.esgMetrics.renewableEnergyPercent, 0) / loans.length)}%.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Sustainability Goals Alignment</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    All portfolio loans align with UN Sustainable Development Goals, particularly SDG 7 
                    (Affordable and Clean Energy), SDG 11 (Sustainable Cities), and SDG 13 (Climate Action).
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Verified Green Loans</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Loan ID</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Borrower</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Score</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">CO₂ Reduction</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {greenLoans.map(loan => (
                    <tr key={loan.id}>
                      <td className="px-4 py-2 font-medium">{loan.id}</td>
                      <td className="px-4 py-2">{loan.borrower}</td>
                      <td className="px-4 py-2">{loan.greenScore}</td>
                      <td className="px-4 py-2">{(loan.esgMetrics.co2Reduction / 1000).toFixed(1)}k tons</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Statement</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-sm text-gray-700">
                This report has been prepared in accordance with the Task Force on Climate-related 
                Financial Disclosures (TCFD) recommendations and EU Taxonomy for Sustainable Activities. 
                All green loan verifications have been conducted by accredited third-party ESG verification 
                agencies. GreenTag certifications are immutable and auditable, ensuring transparency and 
                accountability in our ESG reporting.
              </p>
            </div>
          </section>
          
          <div className="border-t pt-6 text-center text-sm text-gray-600">
            <p>GreenLedger Platform | Confidential Report</p>
            <p className="mt-1">For questions, contact: esg-reporting@greenledger.io</p>
          </div>
        </div>
      </div>
    </div>
  );
}
