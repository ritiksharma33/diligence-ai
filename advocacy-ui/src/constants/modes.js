export const AI_MODES = {
  
  LEGAL: {
    id: 'legal',
    label: 'Legal Risk Analyst',
    color: 'emerald',
    description: 'Extracts parties, deadlines, and assesses legal liability.'
  },

  SUMMARY: {
    id: 'summary',
    label: 'Quick Summarizer',
    color: 'blue',
    description: 'Condenses complex documents into 3 bullet points.'
  },
  COMPLIANCE: { id: 'compliance', label: 'Regulatory Audit', category: 'Engine' },
  
  // STRATEGY TOOLS
  STRATEGY: { id: 'strategy', label: 'Negotiation Playbook', category: 'Tool' },
  VAULT: { id: 'vault', label: 'Contract Repository', category: 'Tool' },
    MOM_TEST: {
    id: 'mom_test',
    label: 'Mom Test Mentor',
    color: 'amber',
    description: 'Validates startup ideas based on user pain points.'
  },
  // NUMEROLOGY: {
  //   id: 'numerology',
  //   label: 'Numerology Insights',
  //   color: 'purple',
  //   description: 'Provides personalized insights based on numerological analysis.'
  // }
};