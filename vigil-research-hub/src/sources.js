export const SOURCES = [
  { id: 'pubmed', name: 'PubMed', icon: 'ti-stethoscope', cat: 'free', desc: 'Клинична наука · NIH база', url: (q) => `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}` },
  { id: 'researchgate', name: 'ResearchGate', icon: 'ti-users', cat: 'free', desc: 'Pre-print статии', url: (q) => `https://www.researchgate.net/search?q=${encodeURIComponent(q)}` },
  { id: 'arxiv', name: 'arXiv', icon: 'ti-file-text', cat: 'free', desc: 'AI / сензорна наука', url: (q) => `https://arxiv.org/search/?query=${encodeURIComponent(q)}&searchtype=all` },
  { id: 'medrxiv', name: 'medRxiv', icon: 'ti-microscope', cat: 'free', desc: 'Медицински pre-print', url: (q) => `https://www.medrxiv.org/search/${encodeURIComponent(q)}` },
  { id: 'scholar', name: 'Google Scholar', icon: 'ti-school', cat: 'free', desc: 'Общо научно търсене', url: (q) => `https://scholar.google.com/scholar?q=${encodeURIComponent(q)}` },
  { id: 'sciencedirect', name: 'ScienceDirect', icon: 'ti-book', cat: 'uni', desc: 'Elsevier · университетски достъп', url: (q) => `https://www.sciencedirect.com/search?qs=${encodeURIComponent(q)}` },
  { id: 'scopus', name: 'Scopus', icon: 'ti-database', cat: 'uni', desc: 'Университетски достъп', url: (q) => `https://www.scopus.com/results/results.uri?query=${encodeURIComponent(q)}` },
  { id: 'fda', name: 'FDA 510(k)', icon: 'ti-shield-check', cat: 'reg', desc: 'Одобрени медицински AI устройства', url: (q) => `https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPMN/pmn.cfm?start_search=1&Devicename=${encodeURIComponent(q)}` },
  { id: 'eudamed', name: 'EUDAMED', icon: 'ti-flag', cat: 'reg', desc: 'EU CE MDR регистър', url: () => `https://ec.europa.eu/tools/eudamed/#/screen/search-device` },
  { id: 'trials', name: 'ClinicalTrials.gov', icon: 'ti-clipboard-list', cat: 'reg', desc: 'Активни клинични проучвания', url: (q) => `https://clinicaltrials.gov/search?term=${encodeURIComponent(q)}` },
  { id: 'patents', name: 'Google Patents', icon: 'ti-certificate', cat: 'market', desc: 'Конкурентни патенти', url: (q) => `https://patents.google.com/?q=${encodeURIComponent(q)}` },
  { id: 'crunchbase', name: 'Crunchbase', icon: 'ti-building', cat: 'market', desc: 'Funding и инвеститори', url: (q) => `https://www.crunchbase.com/textsearch?q=${encodeURIComponent(q)}` },
]

export const CAT_LABELS = { free: 'Безплатно', uni: 'Университетски', reg: 'Регулаторно', market: 'Пазар' }

export const CAT_BADGE_CLASS = { free: 'badge-free', uni: 'badge-uni', reg: 'badge-reg', market: 'badge-market' }

export const TOPICS = [
  'Инфаркт / сърдечни биомаркери',
  'Сънна апнея',
  'Падания / mmWave radar',
  'Gait анализ',
  'Епилепсия / припадъци',
  'Психоза / поведенчески биомаркери',
  'FDA SaMD одобрение',
  'CE MDR класификация',
  'Носими сензори',
  'Предиктивен AI здравеопазване',
]
