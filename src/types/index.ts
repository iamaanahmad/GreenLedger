export interface Loan {
  id: string;
  borrower: string;
  amount: number;
  currency: string;
  projectType: string;
  sector: string;
  maturityDate: string;
  interestRate: number;
  greenScore: number;
  greenTag: GreenTag | null;
  verificationStatus: VerificationStatus;
  esgMetrics: ESGMetrics;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface ESGMetrics {
  co2Reduction: number;
  renewableEnergyPercent: number;
  waterSaved: number;
  certifications: string[];
  sustainabilityGoals: string[];
  impactDescription: string;
}

export interface GreenTag {
  id: string;
  loanId: string;
  score: number;
  issuedDate: string;
  verifiedBy: string;
  expiryDate: string;
  immutable: boolean;
}

export type VerificationStatus = 'pending' | 'in-review' | 'verified' | 'rejected';

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  verified: boolean;
}

export interface PortfolioMetrics {
  totalLoans: number;
  totalValue: number;
  greenLoans: number;
  greenValue: number;
  averageGreenScore: number;
  totalCO2Reduction: number;
  greenPercentage: number;
}

export interface VerificationStep {
  id: string;
  step: string;
  status: 'pending' | 'completed' | 'failed';
  completedAt?: string;
  notes?: string;
}

export interface AuditLog {
  id: string;
  loanId: string;
  action: string;
  timestamp: string;
  user: string;
  details: string;
}
