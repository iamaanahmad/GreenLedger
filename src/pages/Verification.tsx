import { useState } from 'react';
import { Upload, CheckCircle, XCircle, Clock, FileText, Leaf } from 'lucide-react';
import { calculateGreenScore, getVerificationRequirements } from '../utils/greenScoring';
import { ESGMetrics, VerificationStep } from '../types';

export default function Verification() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const [borrower, setBorrower] = useState('');
  const [amount, setAmount] = useState('');
  const [esgMetrics, setESGMetrics] = useState<Partial<ESGMetrics>>({
    co2Reduction: 0,
    renewableEnergyPercent: 0,
    waterSaved: 0,
    certifications: [],
    sustainabilityGoals: [],
    impactDescription: ''
  });
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([]);
  const [greenScore, setGreenScore] = useState<number | null>(null);
  
  const projectTypes = ['Solar Energy', 'Wind Energy', 'Green Building', 'Electric Vehicles', 'Waste Management'];
  
  const handleCalculateScore = () => {
    if (esgMetrics.co2Reduction !== undefined &&
        esgMetrics.renewableEnergyPercent !== undefined &&
        esgMetrics.waterSaved !== undefined &&
        esgMetrics.certifications &&
        esgMetrics.sustainabilityGoals) {
      const score = calculateGreenScore(esgMetrics as ESGMetrics);
      setGreenScore(score);
    }
  };
  
  const handleStartVerification = () => {
    const steps: VerificationStep[] = [
      { id: '1', step: 'Document Completeness Check', status: 'completed', completedAt: new Date().toISOString() },
      { id: '2', step: 'ESG Metrics Validation', status: 'completed', completedAt: new Date().toISOString() },
      { id: '3', step: 'Third-Party Verification', status: 'completed', completedAt: new Date().toISOString() },
      { id: '4', step: 'Green Score Calculation', status: 'completed', completedAt: new Date().toISOString() },
      { id: '5', step: 'GreenTag Issuance', status: 'completed', completedAt: new Date().toISOString() }
    ];
    setVerificationSteps(steps);
    setStep(4);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Loan Verification Workflow</h1>
        <p className="text-gray-600 mt-1">Submit and verify green loan credentials</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {s}
              </div>
              {s < 4 && (
                <div className={`w-24 h-1 ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Loan Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Borrower Name</label>
                <input
                  type="text"
                  value={borrower}
                  onChange={(e) => setBorrower(e.target.value)}
                  placeholder="Enter borrower name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select project type</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              onClick={() => setStep(2)}
              disabled={!borrower || !amount || !projectType}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue to ESG Metrics
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">ESG Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CO₂ Reduction (tons/year)
                </label>
                <input
                  type="number"
                  value={esgMetrics.co2Reduction || ''}
                  onChange={(e) => setESGMetrics({...esgMetrics, co2Reduction: Number(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Renewable Energy %
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={esgMetrics.renewableEnergyPercent || ''}
                  onChange={(e) => setESGMetrics({...esgMetrics, renewableEnergyPercent: Number(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Water Saved (cubic meters/year)
                </label>
                <input
                  type="number"
                  value={esgMetrics.waterSaved || ''}
                  onChange={(e) => setESGMetrics({...esgMetrics, waterSaved: Number(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certifications (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="ISO 14001, LEED Gold"
                  onChange={(e) => setESGMetrics({...esgMetrics, certifications: e.target.value.split(',').map(s => s.trim())})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Impact Description
                </label>
                <textarea
                  value={esgMetrics.impactDescription || ''}
                  onChange={(e) => setESGMetrics({...esgMetrics, impactDescription: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  handleCalculateScore();
                  setStep(3);
                }}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
              >
                Calculate Green Score
              </button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Document Upload & Verification</h2>
            
            {greenScore !== null && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Calculated Green Score</p>
                    <p className="text-4xl font-bold text-green-600 mt-2">{greenScore}</p>
                  </div>
                  <Leaf className="w-16 h-16 text-green-500" />
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h3>
              <div className="space-y-3">
                {getVerificationRequirements(projectType).map((req, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700">{req}</span>
                    </div>
                    <button
                      onClick={() => setUploadedDocs([...uploadedDocs, req])}
                      disabled={uploadedDocs.includes(req)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:bg-green-50 disabled:text-green-700 disabled:border-green-200"
                    >
                      {uploadedDocs.includes(req) ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Uploaded</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Upload</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleStartVerification}
                disabled={uploadedDocs.length < getVerificationRequirements(projectType).length}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Start Verification Process
              </button>
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Verification Progress</h2>
            
            <div className="space-y-4">
              {verificationSteps.map((vstep) => (
                <div key={vstep.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {vstep.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {vstep.status === 'pending' && <Clock className="w-5 h-5 text-yellow-500" />}
                    {vstep.status === 'failed' && <XCircle className="w-5 h-5 text-red-500" />}
                    <span className="text-sm font-medium text-gray-900">{vstep.step}</span>
                  </div>
                  <span className={`text-sm ${
                    vstep.status === 'completed' ? 'text-green-600' :
                    vstep.status === 'pending' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {vstep.status}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900">Verification Complete!</h3>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                GreenTag has been issued for loan {borrower}. The loan is now verified and can be traded on the marketplace.
              </p>
              <div className="bg-white border border-green-300 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-2">GreenTag ID</p>
                <p className="text-sm font-mono text-gray-900">GT-{Date.now()}</p>
                <p className="text-xs text-gray-600 mt-3 mb-2">Green Score</p>
                <p className="text-2xl font-bold text-green-600">{greenScore}</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                setStep(1);
                setBorrower('');
                setAmount('');
                setProjectType('');
                setESGMetrics({});
                setUploadedDocs([]);
                setVerificationSteps([]);
                setGreenScore(null);
              }}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
            >
              Verify Another Loan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
