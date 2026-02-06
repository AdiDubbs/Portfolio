/**
 * Enhanced Search Engine for Conversational Portfolio Chatbot
 * Matches natural questions to extensive conversation nodes
 */

/**
 * Comprehensive search index mapping keywords to conversation nodes
 */
export const searchIndex = [
  // Main Overview Sections
  {
    id: 'start',
    category: 'overview',
    title: 'Main Menu',
    keywords: ['start', 'menu', 'home', 'main', 'help', 'begin'],
    description: 'Return to main navigation menu'
  },
  {
    id: 'resume_summary',
    category: 'overview',
    title: 'Resume Summary',
    keywords: ['resume', 'cv', 'summary', 'overview', 'about', 'profile', 'bio', 'background', 'who', 'introduction'],
    description: 'Professional profile and background overview'
  },

  // Projects - Main
  {
    id: 'projects_overview',
    category: 'projects',
    title: 'All Projects',
    keywords: ['projects', 'portfolio', 'work', 'built', 'made', 'created', 'developed', 'showcase', 'what', 'show'],
    description: 'Complete project portfolio'
  },

  // Drift Shield Project
  {
    id: 'drift_shield',
    category: 'projects',
    title: 'Drift Shield - Fraud Detection',
    keywords: ['drift', 'shield', 'fraud', 'detection', 'xgboost', 'conformal', 'prediction', 'monitoring', 'mlops', 'production', 'ml'],
    description: 'Production fraud detection with drift monitoring'
  },
  {
    id: 'drift_detection',
    category: 'projects',
    title: 'Drift Detection Method',
    keywords: ['drift', 'detection', 'psi', 'ks', 'kolmogorov', 'smirnov', 'statistical', 'monitoring', 'distribution'],
    description: 'How drift detection works using PSI and KS tests'
  },
  {
    id: 'drift_conformal',
    category: 'projects',
    title: 'Conformal Prediction',
    keywords: ['conformal', 'prediction', 'uncertainty', 'confidence', 'abstain', 'probabilistic', 'guarantee'],
    description: 'Uncertainty quantification with conformal prediction'
  },
  {
    id: 'drift_stack',
    category: 'projects',
    title: 'Drift Shield Tech Stack',
    keywords: ['drift', 'stack', 'fastapi', 'xgboost', 'docker', 'prometheus', 'grafana', 'technology'],
    description: 'Technical stack for Drift Shield'
  },
  {
    id: 'drift_deploy',
    category: 'projects',
    title: 'Drift Shield Deployment',
    keywords: ['drift', 'deployment', 'pointer', 'active', 'shadow', 'rollback', 'versioning', 'cicd'],
    description: 'Deployment strategy with pointer-based versioning'
  },
  {
    id: 'drift_monitoring',
    category: 'projects',
    title: 'Drift Shield Monitoring',
    keywords: ['drift', 'monitoring', 'observability', 'metrics', 'prometheus', 'grafana', 'alerts'],
    description: 'Monitoring and observability setup'
  },

  // Vitalis Project
  {
    id: 'vitalis',
    category: 'projects',
    title: 'Vitalis - Healthcare AI',
    keywords: ['vitalis', 'healthcare', 'medical', 'diagnostic', 'diagnosis', 'bayesian', 'vision', 'multimodal', 'clinical'],
    description: 'Multimodal Bayesian diagnostic engine'
  },
  {
    id: 'vitalis_vision',
    category: 'projects',
    title: 'Vitalis Vision Models',
    keywords: ['vitalis', 'vision', 'densenet', 'resnet', 'efficientnet', 'medical', 'imaging', 'xray', 'mri'],
    description: 'Computer vision models for medical imaging'
  },
  {
    id: 'vitalis_bayesian',
    category: 'projects',
    title: 'Vitalis Bayesian Reasoning',
    keywords: ['vitalis', 'bayesian', 'reasoning', 'inference', 'probabilistic', 'diagnosis', 'evidence'],
    description: 'Bayesian reasoning for differential diagnosis'
  },
  {
    id: 'vitalis_nlp',
    category: 'projects',
    title: 'Vitalis NLP Pipeline',
    keywords: ['vitalis', 'nlp', 'clinical', 'notes', 'text', 'extraction', 'negation', 'symptoms'],
    description: 'NLP for clinical text and lab reports'
  },
  {
    id: 'vitalis_stack',
    category: 'projects',
    title: 'Vitalis Tech Stack',
    keywords: ['vitalis', 'stack', 'flask', 'pytorch', 'react', 'mantine', 'technology'],
    description: 'Technical architecture for Vitalis'
  },

  // Concierge Project
  {
    id: 'concierge',
    category: 'projects',
    title: 'Concierge - AI Agent',
    keywords: ['concierge', 'agent', 'automation', 'playwright', 'llama', 'llm', 'shopping', 'amazon', 'ecommerce', 'agentic'],
    description: 'LLM-powered Amazon automation agent'
  },
  {
    id: 'concierge_llm',
    category: 'projects',
    title: 'Concierge LLM Reasoning',
    keywords: ['concierge', 'llm', 'reasoning', 'llama', 'groq', 'agent', 'decision', 'intent'],
    description: 'How LLM reasoning works for automation'
  },
  {
    id: 'concierge_security',
    category: 'projects',
    title: 'Concierge Security',
    keywords: ['concierge', 'security', 'guardrails', 'safety', 'otp', 'confirmation', 'authentication'],
    description: 'Security features and guardrails'
  },
  {
    id: 'concierge_architecture',
    category: 'projects',
    title: 'Concierge Architecture',
    keywords: ['concierge', 'architecture', 'fastapi', 'react', 'websocket', 'state', 'machine'],
    description: 'System architecture and design'
  },
  {
    id: 'concierge_stack',
    category: 'projects',
    title: 'Concierge Tech Stack',
    keywords: ['concierge', 'stack', 'fastapi', 'playwright', 'llama', 'react', 'technology'],
    description: 'Technical stack for Concierge'
  },

  // IntelliVision Project
  {
    id: 'intellivision',
    category: 'projects',
    title: 'IntelliVision Platform',
    keywords: ['intellivision', 'computer', 'vision', 'yolo', 'tracking', 'detr', 'video', 'analytics', 'aionos', 'internship'],
    description: 'Real-time computer vision platform'
  },
  {
    id: 'intellivision_tracking',
    category: 'projects',
    title: 'IntelliVision Tracking',
    keywords: ['intellivision', 'tracking', 'botsort', 'bytetrack', 'deepocsort', 'reid', 'multi', 'object'],
    description: 'Advanced object tracking algorithms'
  },
  {
    id: 'intellivision_depth',
    category: 'projects',
    title: 'IntelliVision Depth Estimation',
    keywords: ['intellivision', 'depth', 'midas', 'dpt', 'monocular', 'estimation', 'range'],
    description: 'Depth estimation for range-aware detection'
  },
  {
    id: 'intellivision_face',
    category: 'projects',
    title: 'IntelliVision Face Auth',
    keywords: ['intellivision', 'face', 'authentication', 'insightface', 'recognition', 'verification', 'qdrant'],
    description: 'Face authentication and verification'
  },
  {
    id: 'intellivision_role',
    category: 'projects',
    title: 'IntelliVision Role & Impact',
    keywords: ['intellivision', 'role', 'responsibilities', 'internship', 'impact', 'contribution', 'aionos'],
    description: 'Internship role and contributions'
  },
  {
    id: 'intellivision_stack',
    category: 'projects',
    title: 'IntelliVision Tech Stack',
    keywords: ['intellivision', 'stack', 'django', 'celery', 'pytorch', 'react', 'technology'],
    description: 'Technical stack for IntelliVision'
  },

  // Carbon Project
  {
    id: 'carbon',
    category: 'projects',
    title: 'Carbon Footprint Tracker',
    keywords: ['carbon', 'footprint', 'android', 'mobile', 'environmental', 'sustainability', 'app'],
    description: 'Android carbon footprint tracking app'
  },
  {
    id: 'carbon_calculation',
    category: 'projects',
    title: 'Carbon Calculation Method',
    keywords: ['carbon', 'calculation', 'emission', 'factors', 'epa', 'ipcc', 'co2'],
    description: 'How carbon footprint is calculated'
  },
  {
    id: 'carbon_stack',
    category: 'projects',
    title: 'Carbon Tech Stack',
    keywords: ['carbon', 'stack', 'android', 'firebase', 'java', 'technology'],
    description: 'Technical stack for Carbon app'
  },

  // Skills
  {
    id: 'skills_overview',
    category: 'skills',
    title: 'Technical Skills',
    keywords: ['skills', 'tech', 'stack', 'technologies', 'languages', 'frameworks', 'tools', 'abilities', 'expertise', 'capabilities'],
    description: 'Complete technical skill set'
  },
  {
    id: 'skills_computer_vision',
    category: 'skills',
    title: 'Computer Vision Expertise',
    keywords: ['computer', 'vision', 'cv', 'yolo', 'detection', 'tracking', 'opencv', 'pytorch', 'imaging'],
    description: 'Deep expertise in computer vision'
  },
  {
    id: 'skills_python',
    category: 'skills',
    title: 'Python Expertise',
    keywords: ['python', 'programming', 'coding', 'language', 'pytorch', 'scikit', 'pandas', 'numpy'],
    description: 'Python programming expertise'
  },
  {
    id: 'react_skill',
    category: 'skills',
    title: 'React & Frontend',
    keywords: ['react', 'frontend', 'ui', 'ux', 'javascript', 'typescript', 'vite', 'web', 'hooks'],
    description: 'React and frontend development'
  },
  {
    id: 'mlops',
    category: 'skills',
    title: 'MLOps Philosophy',
    keywords: ['mlops', 'deployment', 'docker', 'prometheus', 'grafana', 'monitoring', 'cicd', 'infrastructure', 'devops', 'production'],
    description: 'MLOps practices and philosophy'
  },
  {
    id: 'mlops_monitoring',
    category: 'skills',
    title: 'MLOps Monitoring',
    keywords: ['mlops', 'monitoring', 'observability', 'prometheus', 'grafana', 'metrics', 'logging'],
    description: 'Monitoring strategies for ML systems'
  },
  {
    id: 'mlops_deployment',
    category: 'skills',
    title: 'MLOps Deployment',
    keywords: ['mlops', 'deployment', 'cicd', 'rollback', 'canary', 'shadow', 'production'],
    description: 'Deployment strategies for ML models'
  },

  // Experience
  {
    id: 'experience_overview',
    category: 'experience',
    title: 'Work Experience',
    keywords: ['experience', 'work', 'jobs', 'internships', 'career', 'history', 'timeline', 'employment', 'aionos', 'rsystems'],
    description: 'Professional work experience'
  },

  // Education
  {
    id: 'education_overview',
    category: 'education',
    title: 'Education',
    keywords: ['education', 'university', 'college', 'degree', 'bachelor', 'madison', 'uw', 'wisconsin', 'school', 'study'],
    description: 'Academic background at UW-Madison'
  },
  {
    id: 'coursework_detail',
    category: 'education',
    title: 'Coursework Details',
    keywords: ['coursework', 'courses', 'classes', 'curriculum', 'subjects', 'machine', 'learning', 'algorithms', 'systems'],
    description: 'Detailed coursework and curriculum'
  },

  // Research
  {
    id: 'research_overview',
    category: 'research',
    title: 'Research Experience',
    keywords: ['research', 'lab', 'academic', 'span', 'madcse', 'neural', 'seeg', 'grading', 'science', 'study'],
    description: 'Research experience and contributions'
  },
  {
    id: 'research_grading',
    category: 'research',
    title: 'Automated Grading Research',
    keywords: ['research', 'grading', 'automated', 'llm', 'feedback', 'jupyter', 'cs220', 'madcse', 'education'],
    description: 'LLM-based automated grading system'
  },
  {
    id: 'research_neuroscience',
    category: 'research',
    title: 'Neuroscience Research',
    keywords: ['research', 'neuroscience', 'span', 'seeg', 'brain', 'neural', 'svm', 'speech', 'eeg'],
    description: 'Computational neuroscience research'
  },

  // Leadership & Advocacy
  {
    id: 'leadership',
    category: 'leadership',
    title: 'Leadership & Impact',
    keywords: ['leadership', 'volunteer', 'activism', 'environmental', 'social', 'impact', 'community', 'advocacy'],
    description: 'Leadership and community impact'
  },
  {
    id: 'tree_drives',
    category: 'leadership',
    title: 'Tree Plantation Drives',
    keywords: ['tree', 'plantation', 'environmental', 'green', 'climate', 'sustainability', 'planting', 'forest'],
    description: 'Environmental tree-plantation initiatives'
  },
  {
    id: 'social_work',
    category: 'leadership',
    title: 'Social Work',
    keywords: ['social', 'work', 'community', 'volunteer', 'children', 'education', 'outreach', 'support'],
    description: 'Social impact and community work'
  },
  {
    id: 'petition_work',
    category: 'leadership',
    title: 'Petition Campaigns',
    keywords: ['petition', 'campaign', 'activism', 'policy', 'advocacy', 'environmental', 'pollution', 'legal'],
    description: 'Environmental petition campaigns'
  }
];

/**
 * Normalize text for consistent matching
 */
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ');
};

/**
 * Calculate relevance score for a query against an index entry
 */
const calculateScore = (query, entry) => {
  const normalizedQuery = normalizeText(query);
  const words = normalizedQuery.split(' ').filter(w => w.length > 2);

  if (words.length === 0) return 0;

  let score = 0;
  const allSearchableText = [
    entry.title,
    entry.description,
    ...entry.keywords
  ].join(' ').toLowerCase();

  // Exact title match - highest priority
  if (normalizeText(entry.title).includes(normalizedQuery)) {
    score += 100;
  }

  // Exact keyword match - high priority
  for (const keyword of entry.keywords) {
    if (normalizedQuery.includes(keyword)) {
      score += 50;
    }
    // Partial keyword match
    if (keyword.includes(normalizedQuery) || normalizedQuery.includes(keyword)) {
      score += 25;
    }
  }

  // Word-level matches
  for (const word of words) {
    // Title contains word
    if (normalizeText(entry.title).includes(word)) {
      score += 15;
    }
    // Keywords contain word
    if (entry.keywords.some(k => k.includes(word))) {
      score += 10;
    }
    // Description contains word
    if (normalizeText(entry.description).includes(word)) {
      score += 5;
    }
  }

  // Category-aware boosting
  const categoryBoosts = {
    projects: ['project', 'built', 'made', 'created', 'work', 'portfolio', 'show', 'showcase'],
    skills: ['skill', 'know', 'language', 'framework', 'tech', 'technology', 'can', 'able'],
    experience: ['experience', 'work', 'job', 'intern', 'internship', 'career'],
    education: ['education', 'school', 'university', 'degree', 'study', 'coursework'],
    research: ['research', 'lab', 'academic', 'science', 'study'],
    leadership: ['leadership', 'volunteer', 'activism', 'impact', 'community']
  };

  const categoryWords = categoryBoosts[entry.category] || [];
  if (categoryWords.some(w => normalizedQuery.includes(w))) {
    score += 20;
  }

  // Question word handling
  if (/^(what|which|show|tell|how|where|when|who|does|is|can)/.test(normalizedQuery)) {
    // Questions get slight boost for overview pages
    if (entry.category === 'overview' || entry.title.includes('Overview')) {
      score += 10;
    }
  }

  return score;
};

/**
 * Search the index and return ranked results
 */
export const search = (query) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const results = searchIndex
    .map(entry => ({
      ...entry,
      score: calculateScore(query, entry)
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return results;
};

/**
 * Get quick action suggestions based on query patterns
 */
export const getQuickActions = (query) => {
  const normalized = normalizeText(query);

  // Direct project queries
  if (/drift/.test(normalized)) {
    return [{ id: 'drift_shield', label: 'Drift Shield', nextId: 'drift_shield' }];
  }
  if (/vitalis|healthcare|medical/.test(normalized)) {
    return [{ id: 'vitalis', label: 'Vitalis Healthcare', nextId: 'vitalis' }];
  }
  if (/concierge|agent|automation/.test(normalized)) {
    return [{ id: 'concierge', label: 'Concierge Agent', nextId: 'concierge' }];
  }
  if (/intellivision|video|tracking/.test(normalized)) {
    return [{ id: 'intellivision', label: 'IntelliVision', nextId: 'intellivision' }];
  }

  // Category queries
  if (/^(what|show|tell).*projects?/.test(normalized)) {
    return [{ id: 'projects_overview', label: 'View All Projects', nextId: 'projects_overview' }];
  }
  if (/^(what|show|tell).*(skills?|tech|stack)/.test(normalized)) {
    return [{ id: 'skills_overview', label: 'Technical Skills', nextId: 'skills_overview' }];
  }
  if (/^(what|show|tell).*(experience|work|job)/.test(normalized)) {
    return [{ id: 'experience_overview', label: 'Work Experience', nextId: 'experience_overview' }];
  }
  if (/^(where|what).*(school|university|college|education)/.test(normalized)) {
    return [{ id: 'education_overview', label: 'Education', nextId: 'education_overview' }];
  }
  if (/research/.test(normalized)) {
    return [{ id: 'research_overview', label: 'Research', nextId: 'research_overview' }];
  }

  // Best/favorite patterns
  if (/best|favorite|top|main|flagship/.test(normalized)) {
    return [
      { id: 'drift_shield', label: 'Drift Shield', nextId: 'drift_shield' },
      { id: 'vitalis', label: 'Vitalis', nextId: 'vitalis' },
      { id: 'concierge', label: 'Concierge', nextId: 'concierge' }
    ];
  }

  return [];
};

/**
 * Get default suggestions for empty search
 */
export const getDefaultSuggestions = () => {
  return [
    { id: 'projects_overview', label: 'View Projects', nextId: 'projects_overview' },
    { id: 'resume_summary', label: 'Resume Summary', nextId: 'resume_summary' },
    { id: 'skills_overview', label: 'Technical Skills', nextId: 'skills_overview' },
    { id: 'experience_overview', label: 'Work Experience', nextId: 'experience_overview' },
    { id: 'education_overview', label: 'Education', nextId: 'education_overview' },
    { id: 'research_overview', label: 'Research', nextId: 'research_overview' }
  ];
};
