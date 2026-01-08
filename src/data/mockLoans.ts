import { Loan } from '../types';

export const mockLoans: Loan[] = [
  {
    id: 'LN-2026-001',
    borrower: 'SolarTech Industries',
    amount: 5000000,
    currency: 'USD',
    projectType: 'Solar Energy',
    sector: 'Renewable Energy',
    maturityDate: '2031-12-31',
    interestRate: 4.5,
    greenScore: 92,
    greenTag: {
      id: 'GT-001',
      loanId: 'LN-2026-001',
      score: 92,
      issuedDate: '2026-01-05',
      verifiedBy: 'ESG Verification Corp',
      expiryDate: '2027-01-05',
      immutable: true
    },
    verificationStatus: 'verified',
    esgMetrics: {
      co2Reduction: 85000,
      renewableEnergyPercent: 100,
      waterSaved: 12000,
      certifications: ['ISO 14001', 'Solar Energy Certification', 'Carbon Neutral'],
      sustainabilityGoals: ['Net Zero by 2030', 'Community Solar Access', 'Job Creation'],
      impactDescription: 'Large-scale solar farm providing clean energy to 15,000 homes'
    },
    documents: [
      { id: 'DOC-001', name: 'Environmental Impact Assessment.pdf', type: 'PDF', uploadDate: '2026-01-02', verified: true },
      { id: 'DOC-002', name: 'Solar Panel Specifications.pdf', type: 'PDF', uploadDate: '2026-01-02', verified: true },
      { id: 'DOC-003', name: 'Carbon Footprint Analysis.xlsx', type: 'Excel', uploadDate: '2026-01-03', verified: true }
    ],
    createdAt: '2026-01-01',
    updatedAt: '2026-01-05'
  },
  {
    id: 'LN-2026-002',
    borrower: 'GreenBuild Construction',
    amount: 3500000,
    currency: 'EUR',
    projectType: 'Green Building',
    sector: 'Real Estate',
    maturityDate: '2030-06-30',
    interestRate: 5.2,
    greenScore: 78,
    greenTag: {
      id: 'GT-002',
      loanId: 'LN-2026-002',
      score: 78,
      issuedDate: '2026-01-06',
      verifiedBy: 'ESG Verification Corp',
      expiryDate: '2027-01-06',
      immutable: true
    },
    verificationStatus: 'verified',
    esgMetrics: {
      co2Reduction: 45000,
      renewableEnergyPercent: 65,
      waterSaved: 28000,
      certifications: ['LEED Gold', 'BREEAM Excellent'],
      sustainabilityGoals: ['Energy Efficiency', 'Water Conservation', 'Sustainable Materials'],
      impactDescription: 'LEED Gold certified office complex with advanced energy systems'
    },
    documents: [
      { id: 'DOC-004', name: 'LEED Certification.pdf', type: 'PDF', uploadDate: '2026-01-03', verified: true },
      { id: 'DOC-005', name: 'Energy Efficiency Report.pdf', type: 'PDF', uploadDate: '2026-01-04', verified: true }
    ],
    createdAt: '2026-01-02',
    updatedAt: '2026-01-06'
  },
  {
    id: 'LN-2026-003',
    borrower: 'WindPower Solutions',
    amount: 8000000,
    currency: 'GBP',
    projectType: 'Wind Energy',
    sector: 'Renewable Energy',
    maturityDate: '2033-12-31',
    interestRate: 4.8,
    greenScore: 88,
    greenTag: null,
    verificationStatus: 'in-review',
    esgMetrics: {
      co2Reduction: 120000,
      renewableEnergyPercent: 100,
      waterSaved: 5000,
      certifications: ['ISO 14001', 'Wind Energy Certification'],
      sustainabilityGoals: ['Clean Energy Generation', 'Biodiversity Protection'],
      impactDescription: 'Offshore wind farm generating 50MW of clean energy'
    },
    documents: [
      { id: 'DOC-006', name: 'Environmental Clearance.pdf', type: 'PDF', uploadDate: '2026-01-05', verified: false },
      { id: 'DOC-007', name: 'Wind Turbine Certifications.pdf', type: 'PDF', uploadDate: '2026-01-06', verified: true }
    ],
    createdAt: '2026-01-04',
    updatedAt: '2026-01-07'
  },
  {
    id: 'LN-2026-004',
    borrower: 'EcoTransport Ltd',
    amount: 2000000,
    currency: 'USD',
    projectType: 'Electric Vehicles',
    sector: 'Transportation',
    maturityDate: '2029-03-31',
    interestRate: 5.5,
    greenScore: 72,
    greenTag: {
      id: 'GT-003',
      loanId: 'LN-2026-004',
      score: 72,
      issuedDate: '2026-01-07',
      verifiedBy: 'ESG Verification Corp',
      expiryDate: '2027-01-07',
      immutable: true
    },
    verificationStatus: 'verified',
    esgMetrics: {
      co2Reduction: 35000,
      renewableEnergyPercent: 80,
      waterSaved: 2000,
      certifications: ['ISO 14001'],
      sustainabilityGoals: ['Zero Emission Fleet', 'Urban Air Quality'],
      impactDescription: 'Electric bus fleet for urban public transportation'
    },
    documents: [
      { id: 'DOC-008', name: 'EV Fleet Details.pdf', type: 'PDF', uploadDate: '2026-01-05', verified: true },
      { id: 'DOC-009', name: 'Charging Infrastructure Plan.pdf', type: 'PDF', uploadDate: '2026-01-06', verified: true }
    ],
    createdAt: '2026-01-05',
    updatedAt: '2026-01-07'
  },
  {
    id: 'LN-2026-005',
    borrower: 'RecycleMax Corp',
    amount: 1500000,
    currency: 'USD',
    projectType: 'Waste Management',
    sector: 'Environmental Services',
    maturityDate: '2028-12-31',
    interestRate: 6.0,
    greenScore: 65,
    greenTag: null,
    verificationStatus: 'pending',
    esgMetrics: {
      co2Reduction: 22000,
      renewableEnergyPercent: 40,
      waterSaved: 18000,
      certifications: ['ISO 14001'],
      sustainabilityGoals: ['Circular Economy', 'Waste Reduction'],
      impactDescription: 'Advanced recycling facility processing 50,000 tons annually'
    },
    documents: [
      { id: 'DOC-010', name: 'Waste Reduction Metrics.xlsx', type: 'Excel', uploadDate: '2026-01-07', verified: false }
    ],
    createdAt: '2026-01-06',
    updatedAt: '2026-01-07'
  }
];
