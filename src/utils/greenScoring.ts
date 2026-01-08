import { ESGMetrics } from '../types';

export const calculateGreenScore = (metrics: ESGMetrics): number => {
  let score = 0;
  
  // CO2 Reduction (0-30 points)
  const co2Score = Math.min(30, (metrics.co2Reduction / 100000) * 30);
  score += co2Score;
  
  // Renewable Energy (0-25 points)
  const renewableScore = (metrics.renewableEnergyPercent / 100) * 25;
  score += renewableScore;
  
  // Water Conservation (0-15 points)
  const waterScore = Math.min(15, (metrics.waterSaved / 50000) * 15);
  score += waterScore;
  
  // Certifications (0-20 points)
  const certScore = Math.min(20, metrics.certifications.length * 5);
  score += certScore;
  
  // Sustainability Goals (0-10 points)
  const goalScore = Math.min(10, metrics.sustainabilityGoals.length * 2);
  score += goalScore;
  
  return Math.round(score);
};

export const getScoreCategory = (score: number): { label: string; color: string } => {
  if (score >= 85) return { label: 'Excellent', color: 'text-green-600' };
  if (score >= 70) return { label: 'Good', color: 'text-green-500' };
  if (score >= 50) return { label: 'Fair', color: 'text-yellow-500' };
  if (score >= 30) return { label: 'Poor', color: 'text-orange-500' };
  return { label: 'Very Poor', color: 'text-red-500' };
};

export const getVerificationRequirements = (projectType: string): string[] => {
  const baseRequirements = [
    'Environmental Impact Assessment',
    'Carbon Footprint Analysis',
    'Sustainability Plan Document'
  ];
  
  const typeSpecific: Record<string, string[]> = {
    'Solar Energy': ['Solar Panel Specifications', 'Energy Output Projections'],
    'Wind Energy': ['Wind Turbine Certifications', 'Environmental Clearance'],
    'Green Building': ['LEED/BREEAM Certification', 'Energy Efficiency Report'],
    'Electric Vehicles': ['EV Fleet Details', 'Charging Infrastructure Plan'],
    'Waste Management': ['Waste Reduction Metrics', 'Recycling Process Documentation']
  };
  
  return [...baseRequirements, ...(typeSpecific[projectType] || [])];
};
