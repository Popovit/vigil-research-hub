export const SOURCES = [
  { id: 'pubmed', name: 'PubMed', icon: 'ti-stethoscope', cat: 'free', desc: 'Clinical science · NIH database', url: (q) => `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}` },
  { id: 'researchgate', name: 'ResearchGate', icon: 'ti-users', cat: 'free', desc: 'Pre-print articles', url: (q) => `https://www.researchgate.net/search?q=${encodeURIComponent(q)}` },
  { id: 'arxiv', name: 'arXiv', icon: 'ti-file-text', cat: 'free', desc: 'AI / sensor science', url: (q) => `https://arxiv.org/search/?query=${encodeURIComponent(q)}&searchtype=all` },
  { id: 'medrxiv', name: 'medRxiv', icon: 'ti-microscope', cat: 'free', desc: 'Medical pre-print', url: (q) => `https://www.medrxiv.org/search/${encodeURIComponent(q)}` },
  { id: 'scholar', name: 'Google Scholar', icon: 'ti-school', cat: 'free', desc: 'General academic search', url: (q) => `https://scholar.google.com/scholar?q=${encodeURIComponent(q)}` },
  { id: 'sciencedirect', name: 'ScienceDirect', icon: 'ti-book', cat: 'uni', desc: 'Elsevier · university access', url: (q) => `https://www.sciencedirect.com/search?qs=${encodeURIComponent(q)}` },
  { id: 'scopus', name: 'Scopus', icon: 'ti-database', cat: 'uni', desc: 'University access', url: (q) => `https://www.scopus.com/results/results.uri?query=${encodeURIComponent(q)}` },
  { id: 'fda', name: 'FDA 510(k)', icon: 'ti-shield-check', cat: 'reg', desc: 'Approved medical AI devices', url: (q) => `https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPMN/pmn.cfm?start_search=1&Devicename=${encodeURIComponent(q)}` },
  { id: 'eudamed', name: 'EUDAMED', icon: 'ti-flag', cat: 'reg', desc: 'EU CE MDR registry', url: () => `https://ec.europa.eu/tools/eudamed/#/screen/search-device` },
  { id: 'trials', name: 'ClinicalTrials.gov', icon: 'ti-clipboard-list', cat: 'reg', desc: 'Active clinical trials', url: (q) => `https://clinicaltrials.gov/search?term=${encodeURIComponent(q)}` },
  { id: 'patents', name: 'Google Patents', icon: 'ti-certificate', cat: 'market', desc: 'Competitor patents', url: (q) => `https://patents.google.com/?q=${encodeURIComponent(q)}` },
  { id: 'crunchbase', name: 'Crunchbase', icon: 'ti-building', cat: 'market', desc: 'Funding and investors', url: (q) => `https://www.crunchbase.com/textsearch?q=${encodeURIComponent(q)}` },
]

export const CAT_LABELS = { free: 'Free', uni: 'University', reg: 'Regulatory', market: 'Market' }

export const CAT_BADGE_CLASS = { free: 'badge-free', uni: 'badge-uni', reg: 'badge-reg', market: 'badge-market' }

export const TOPICS = [
  'Heart attack / cardiac biomarkers',
  'Sleep apnea',
  'Falls / mmWave radar',
  'Gait analysis',
  'Epilepsy / seizures',
  'Psychosis / behavioral biomarkers',
  'FDA SaMD clearance',
  'CE MDR classification',
  'Wearable sensors',
  'Predictive AI healthcare',
]
