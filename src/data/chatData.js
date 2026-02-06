export const chatData = {
  start: {
    id: "start",
    text: "Hi! I'm Aditya's AI assistant. I can answer questions about his projects, technical skills, work experience, education, or advocacy work. What would you like to know?",
    options: [
      { label: "What are his best projects?", nextId: "projects_overview" },
      { label: "Tell me about his background", nextId: "resume_summary" },
      { label: "What technical skills does he have?", nextId: "skills_overview" },
      { label: "Where did he study?", nextId: "education_overview" },
      { label: "What research has he done?", nextId: "research_overview" },
      { label: "Tell me about his advocacy work", nextId: "leadership" },
    ],
  },

  resume_summary: {
    id: "resume_summary",
    text: "Aditya Dubey is a Computer Science undergraduate at UW-Madison (graduating May 2026) specializing in applied AI, computer vision, and full-stack development. His work focuses on multi-model perception pipelines, uncertainty-aware ML services, and agentic automation workflows.",
    sections: [
      {
        title: "Core Expertise",
        bullets: [
          "Computer Vision: Production pipelines with YOLO, RT-DETR, and tracking algorithms",
          "MLOps: Uncertainty quantification, drift detection, observability systems",
          "Full-stack ML: PyTorch models + FastAPI/Django backends + React frontends",
        ],
      },
      {
        title: "Featured Projects",
        bullets: [
          "Drift Shield: ML reliability loop with conformal prediction and automated lifecycle",
          "Vitalis: Multimodal Bayesian diagnostic engine fusing clinical data",
          "Concierge: Agentic commerce automation using Playwright + Llama 3.1",
          "IntelliVision: Multi-task CV platform with 8+ production pipelines (AionOS)",
        ],
      },
      {
        title: "Professional Experience",
        bullets: [
          "AionOS (2025): Built IntelliVision video analytics platform",
          "R Systems (2024): Sentiment analysis and churn prediction",
          "MadCSE Research: Automated grading with LLM integration",
          "SPAN Lab: Neural signal processing and SVM decoding",
        ],
      },
    ],
    options: [
      { label: "Tell me more about his projects", nextId: "projects_overview" },
      { label: "What's his technical stack?", nextId: "skills_overview" },
      { label: "What research has he done?", nextId: "research_overview" },
      { label: "What does he study?", nextId: "education_overview" },
      { label: "Back to start", nextId: "start" },
    ],
  },

  education_overview: {
    id: "education_overview",
    text: "Aditya is completing his Bachelor of Science in Computer Science at the University of Wisconsin-Madison (graduating May 2026), with a focus on Machine Learning, Big Data, and Systems.",
    sections: [
      {
        title: "University of Wisconsin-Madison",
        bullets: [
          "B.S. in Computer Science (May 2026)",
          "Focus Areas: Machine Learning, Big Data, Systems",
          "Coursework: Machine Learning, Big Data Systems, Operating Systems, Distributed Systems, Database Systems, Computer Vision, Algorithms",
          "Wisconsin AI Safety Initiative: Technical deep dives on reward specification, generalization, and interpretability",
        ],
      },
    ],
    options: [
      { label: "What coursework has he taken?", nextId: "coursework_detail" },
      { label: "Tell me about his research", nextId: "research_overview" },
      { label: "What's his work experience?", nextId: "experience_overview" },
      { label: "What are his technical skills?", nextId: "skills_overview" },
      { label: "Back to start", nextId: "start" },
    ],
  },

  coursework_detail: {
    id: "coursework_detail",
    text: "Aditya has completed rigorous coursework covering both theoretical foundations and practical systems implementation.",
    sections: [
      {
        title: "Core Courses",
        bullets: [
          "Machine Learning: Supervised/unsupervised learning, model evaluation",
          "Computer Vision: Image processing, object detection, neural networks",
          "Algorithms: Complexity analysis, graph algorithms, optimization",
        ],
      },
      {
        title: "Systems & Infrastructure",
        bullets: [
          "Big Data Systems: Distributed processing frameworks",
          "Distributed Systems: Consensus, fault tolerance, scalability",
          "Database Systems: SQL optimization, transactions, indexing",
          "Operating Systems: Process management, memory, concurrency",
        ],
      },
    ],
    options: [
      { label: "How does he apply this knowledge?", nextId: "projects_overview" },
      { label: "Tell me about his research", nextId: "research_overview" },
      { label: "Back to education", nextId: "education_overview" },
    ],
  },

  research_overview: {
    id: "research_overview",
    text: "Aditya has contributed to research in automated education systems and computational neuroscience, working across multiple specialized labs at UW-Madison.",
    sections: [
      {
        title: "MadCSE Research (Sep 2025 - Present)",
        bullets: [
          "Optimizing Python-based automated grading infrastructure for university courses",
          "Integrating LLM-based feedback via cloud APIs (Azure OpenAI)",
          "Focusing on system throughput, reliability, latency, and cost-efficiency",
        ],
      },
      {
        title: "SPAN Lab (Oct 2023 - May 2024)",
        bullets: [
          "Engineered MATLAB pipelines for SEEG neural signal preprocessing",
          "Implemented SVMs to decode neural activity patterns in speech perception",
          "High-gamma extraction and stimulus-locked epoching",
        ],
      },
    ],
    options: [
      { label: "Tell me more about the grading system", nextId: "research_grading" },
      { label: "What was the neuroscience research?", nextId: "research_neuroscience" },
      { label: "How does this relate to his projects?", nextId: "projects_overview" },
      { label: "What are his technical skills?", nextId: "skills_overview" },
      { label: "Back to start", nextId: "start" },
    ],
  },

  research_grading: {
    id: "research_grading",
    text: "The automated grading project optimizes Python infrastructure for university course grading with LLM integration for feedback.",
    sections: [
      {
        title: "System Focus",
        bullets: [
          "System throughput and reliability for large-scale course automation",
          "Azure OpenAI integration with emphasis on latency and cost-efficiency",
          "Responsible usage at scale for educational contexts",
        ],
      },
      {
        title: "Technical Stack",
        bullets: [
          "Python infrastructure optimization",
          "Cloud API integration (Azure OpenAI)",
          "Focus on systems reliability and performance",
        ],
      },
    ],
    options: [
      { label: "What about the neuroscience work?", nextId: "research_neuroscience" },
      { label: "Does he use LLMs elsewhere?", nextId: "concierge" },
      { label: "Back to research overview", nextId: "research_overview" },
    ],
  },

  research_neuroscience: {
    id: "research_neuroscience",
    text: "The SPAN Lab research focused on decoding speech-related neural activity from SEEG (intracranial EEG) recordings.",
    sections: [
      {
        title: "Signal Processing Pipeline",
        bullets: [
          "MATLAB pipelines for neural signal preprocessing",
          "High-gamma extraction correlated with neural activity",
          "Stimulus-locked epoching for time-aligned analysis",
        ],
      },
      {
        title: "Machine Learning Analysis",
        bullets: [
          "Support Vector Machines (SVM) for pattern decoding",
          "Neural activity patterns linked to speech perception",
          "Laboratory support including psychoacoustic experiments",
        ],
      },
    ],
    options: [
      { label: "Tell me about the grading research", nextId: "research_grading" },
      { label: "What ML skills does he have?", nextId: "skills_overview" },
      { label: "Back to research overview", nextId: "research_overview" },
    ],
  },

  projects_overview: {
    id: "projects_overview",
    text: "Aditya has built production-grade projects spanning fraud detection, healthcare diagnostics, agentic automation, and computer vision. Each demonstrates end-to-end ML engineering and systems design.",
    sections: [
      {
        title: "Featured Projects",
        bullets: [
          "Drift Shield (2026): ML reliability loop with conformal prediction",
          "Vitalis (2025): Multimodal Bayesian diagnostic engine",
          "Concierge (2025): Agentic Amazon automation with LLMs",
          "IntelliVision (2025): Multi-task CV platform at AionOS",
          "Carbon (2021): Android carbon footprint tracker (500+ downloads)",
        ],
      },
    ],
    options: [
      { label: "Tell me about Drift Shield", nextId: "drift_shield" },
      { label: "What is Vitalis?", nextId: "vitalis" },
      { label: "How does Concierge work?", nextId: "concierge" },
      { label: "Tell me about IntelliVision", nextId: "intellivision" },
      { label: "What's the Carbon app?", nextId: "carbon" },
      { label: "Back to start", nextId: "start" },
    ],
  },

  drift_shield: {
    id: "drift_shield",
    text: "Drift Shield (2026) is a production-grade ML reliability loop and fraud scoring microservice that automates the entire model lifecycle with uncertainty quantification and drift detection.",
    sections: [
      {
        title: "Core Capabilities",
        bullets: [
          "Automated model lifecycle management for fraud detection",
          "Uncertainty-aware outputs using conformal prediction sets",
          "Data drift detection via PSI and KS rolling windows",
          "Real-time model health monitoring and drift signals",
        ],
      },
      {
        title: "Deployment Strategy",
        bullets: [
          "Pointer-based deployment: Active/Shadow/Rollback models",
          "Zero-downtime updates with automated model promotion",
          "Evaluation gates for model quality assurance",
        ],
      },
      {
        title: "Observability Stack",
        bullets: [
          "Prometheus metrics for real-time monitoring",
          "Grafana dashboards tracking model health",
          "Drift signals, latency, and prediction distribution tracking",
        ],
      },
    ],
    options: [
      { label: "How does drift detection work?", nextId: "drift_detection" },
      { label: "What is conformal prediction?", nextId: "drift_conformal" },
      { label: "How is it deployed?", nextId: "drift_deploy" },
      { label: "What's the tech stack?", nextId: "drift_stack" },
      { label: "Show me other projects", nextId: "projects_overview" },
    ],
  },

  drift_detection: {
    id: "drift_detection",
    text: "Drift detection uses PSI (Population Stability Index) and KS (Kolmogorov-Smirnov) tests on rolling windows to identify when incoming data distributions diverge from training data.",
    sections: [
      {
        title: "Statistical Methods",
        bullets: [
          "PSI: Measures distribution shift for numerical features",
          "KS tests: Statistical tests for distribution differences",
          "Rolling windows: Compare recent batches against reference",
        ],
      },
      {
        title: "Automated Response",
        bullets: [
          "Drift triggers automatic model lifecycle actions",
          "Shadow deployment of new models when drift detected",
          "Continuous monitoring prevents silent performance degradation",
        ],
      },
    ],
    options: [
      { label: "Tell me about conformal prediction", nextId: "drift_conformal" },
      { label: "How is the model deployed?", nextId: "drift_deploy" },
      { label: "Back to Drift Shield", nextId: "drift_shield" },
    ],
  },

  drift_conformal: {
    id: "drift_conformal",
    text: "Conformal prediction provides uncertainty-aware outputs by generating prediction sets with probabilistic guarantees, allowing the system to abstain when confidence is low.",
    sections: [
      {
        title: "How It Works",
        bullets: [
          "Generates prediction sets instead of single predictions",
          "Provides coverage guarantees on output correctness",
          "Enables safe abstention when uncertainty is high",
        ],
      },
      {
        title: "Benefits for Production",
        bullets: [
          "Quantifies model uncertainty reliably",
          "Prevents overconfident predictions on edge cases",
          "Supports human-in-the-loop decision making",
        ],
      },
    ],
    options: [
      { label: "How is drift detected?", nextId: "drift_detection" },
      { label: "What's the deployment strategy?", nextId: "drift_deploy" },
      { label: "Back to Drift Shield", nextId: "drift_shield" },
    ],
  },

  drift_stack: {
    id: "drift_stack",
    text: "The technical stack prioritizes production reliability, real-time observability, and seamless model updates.",
    sections: [
      {
        title: "Technologies Used",
        bullets: [
          "FastAPI: High-performance Python API framework",
          "XGBoost: Gradient boosting for fraud detection",
          "Prometheus: Metrics collection and alerting",
          "Grafana: Real-time dashboards and visualization",
          "Conformal Prediction: Uncertainty quantification",
        ],
      },
      {
        title: "MLOps Practices",
        bullets: [
          "Pointer-based versioning for model management",
          "Automated drift detection and retraining triggers",
          "Full observability stack for production monitoring",
        ],
      },
    ],
    options: [
      { label: "How is deployment handled?", nextId: "drift_deploy" },
      { label: "Back to Drift Shield", nextId: "drift_shield" },
      { label: "Show me other projects", nextId: "projects_overview" },
    ],
  },

  drift_deploy: {
    id: "drift_deploy",
    text: "Deployment uses a pointer-based strategy (Active/Shadow/Rollback) to ensure zero-downtime model updates with automated quality gates.",
    sections: [
      {
        title: "Deployment Pointers",
        bullets: [
          "Active: Current production model serving predictions",
          "Shadow: Candidate model being evaluated in parallel",
          "Rollback: Previous stable model for emergency recovery",
        ],
      },
      {
        title: "Update Process",
        bullets: [
          "New models deployed as Shadow for evaluation",
          "Automated promotion after passing quality gates",
          "Zero-downtime transitions between model versions",
          "Immediate rollback capability if issues arise",
        ],
      },
    ],
    options: [
      { label: "How is it monitored?", nextId: "drift_stack" },
      { label: "Back to Drift Shield", nextId: "drift_shield" },
      { label: "Show me other projects", nextId: "projects_overview" },
    ],
  },

  vitalis: {
    id: "vitalis",
    text: "Vitalis (2025) is a diagnostic engine that fuses clinical notes, lab results, medical imaging, and ECG signals into ranked differential diagnoses using Bayesian reasoning.",
    sections: [
      {
        title: "Input Modalities",
        bullets: [
          "Medical imaging: X-ray and MRI analysis with PyTorch models",
          "Clinical notes: NLP symptom extraction with negation handling",
          "Lab results: Biomarker classification and interpretation",
          "ECG signals: Ischemia detection workflows",
        ],
      },
      {
        title: "Computer Vision Models",
        bullets: [
          "DenseNet121: Chest X-ray classification",
          "EfficientNet: Medical image analysis",
          "PyTorch inference pipelines for diagnostic imaging",
        ],
      },
      {
        title: "Bayesian Reasoning",
        bullets: [
          "Fuses evidence from multiple modalities",
          "Ranks differential diagnoses with confidence scores",
          "Incorporates medical knowledge and priors",
        ],
      },
    ],
    options: [
      { label: "Tell me about the vision models", nextId: "vitalis_vision" },
      { label: "How does Bayesian reasoning work?", nextId: "vitalis_bayesian" },
      { label: "What's the NLP pipeline?", nextId: "vitalis_nlp" },
      { label: "What's the tech stack?", nextId: "vitalis_stack" },
      { label: "Show me other projects", nextId: "projects_overview" },
    ],
  },

  vitalis_vision: {
    id: "vitalis_vision",
    text: "The computer vision pipeline uses PyTorch models including DenseNet121 and EfficientNet for medical imaging analysis.",
    sections: [
      {
        title: "Models Used",
        bullets: [
          "DenseNet121: Chest X-ray pathology detection",
          "EfficientNet: Medical image classification",
          "PyTorch: Model inference and pipeline orchestration",
        ],
      },
      {
        title: "Imaging Analysis",
        bullets: [
          "X-ray analysis for pulmonary conditions",
          "MRI processing for diagnostic support",
          "Integration with Bayesian reasoning engine",
        ],
      },
    ],
    options: [
      { label: "How does Bayesian reasoning work?", nextId: "vitalis_bayesian" },
      { label: "Tell me about the NLP pipeline", nextId: "vitalis_nlp" },
      { label: "Back to Vitalis", nextId: "vitalis" },
    ],
  },

  vitalis_bayesian: {
    id: "vitalis_bayesian",
    text: "Bayesian reasoning combines evidence from multiple modalities to produce ranked differential diagnoses with confidence scores.",
    sections: [
      {
        title: "Evidence Fusion",
        bullets: [
          "Combines clinical notes, imaging, labs, and ECG data",
          "Bayesian updating incorporates new evidence sequentially",
          "Ranks diagnoses by posterior probability",
        ],
      },
      {
        title: "Output",
        bullets: [
          "Ranked list of differential diagnoses",
          "Confidence scores for each diagnosis",
          "Evidence breakdown showing contributing factors",
        ],
      },
    ],
    options: [
      { label: "Tell me about vision models", nextId: "vitalis_vision" },
      { label: "How does NLP work?", nextId: "vitalis_nlp" },
      { label: "Back to Vitalis", nextId: "vitalis" },
    ],
  },

  vitalis_nlp: {
    id: "vitalis_nlp",
    text: "The NLP pipeline extracts structured symptom information from clinical notes with negation handling to avoid misinterpretation.",
    sections: [
      {
        title: "Clinical Text Processing",
        bullets: [
          "Symptom extraction from unstructured clinical notes",
          "Negation handling: 'no chest pain' vs 'chest pain'",
          "Structured output for Bayesian reasoning engine",
        ],
      },
      {
        title: "Integration",
        bullets: [
          "Feeds extracted symptoms into diagnostic reasoning",
          "Combines with imaging and lab results",
          "Supports evidence-based differential diagnosis",
        ],
      },
    ],
    options: [
      { label: "Tell me about vision models", nextId: "vitalis_vision" },
      { label: "How does Bayesian reasoning work?", nextId: "vitalis_bayesian" },
      { label: "Back to Vitalis", nextId: "vitalis" },
    ],
  },

  vitalis_stack: {
    id: "vitalis_stack",
    text: "Vitalis uses a full-stack architecture with Flask backend orchestration and React 19 for the clinician interface.",
    sections: [
      {
        title: "Technologies",
        bullets: [
          "PyTorch: Computer vision model inference",
          "Flask: Backend API and pipeline orchestration",
          "React 19: Modern frontend framework",
          "Mantine: UI component library",
          "Bayesian Inference: Diagnostic reasoning engine",
          "NLP: Clinical text processing",
        ],
      },
    ],
    options: [
      { label: "Tell me about the vision pipeline", nextId: "vitalis_vision" },
      { label: "How does NLP work?", nextId: "vitalis_nlp" },
      { label: "Back to Vitalis", nextId: "vitalis" },
      { label: "Show me other projects", nextId: "projects_overview" },
    ],
  },

  concierge: {
    id: "concierge",
    text: "Concierge (2025) is an agentic commerce engine that autonomously navigates Amazon.in using Playwright browser automation and Llama 3.1 for UI reasoning via Groq.",
    sections: [
      {
        title: "Core Capabilities",
        bullets: [
          "Autonomous navigation of Amazon.in checkout flows",
          "Playwright browser automation with real Chrome sessions",
          "Llama 3.1 via Groq for semantic UI action selection",
          "Hybrid selection: combines semantic reasoning with LLM fallback",
        ],
      },
      {
        title: "Safety Guardrails",
        bullets: [
          "OTP-aware handling for two-factor authentication",
          "Dry-run mode for testing without actual purchases",
          "Explicit confirmation gates for spend control",
          "Safe automation with user oversight",
        ],
      },
      {
        title: "Infrastructure",
        bullets: [
          "FastAPI backend for orchestration",
          "React dashboard for real-time automation progress",
          "Dynamic checkout flow handling",
        ],
      },
    ],
    options: [
      { label: "How does LLM reasoning work?", nextId: "concierge_llm" },
      { label: "What are the security features?", nextId: "concierge_security" },
      { label: "What's the tech stack?", nextId: "concierge_stack" },
      { label: "Show me other projects", nextId: "projects_overview" },
    ],
  },

  concierge_llm: {
    id: "concierge_llm",
    text: "Llama 3.1 via Groq provides semantic UI reasoning to translate user intents into precise browser actions for dynamic web pages.",
    sections: [
      {
        title: "Hybrid Selection Mechanism",
        bullets: [
          "Semantic UI action selection for common patterns",
          "LLM reasoning for dynamic checkout flows",
          "Adaptive navigation handling edge cases",
        ],
      },
      {
        title: "Groq Integration",
        bullets: [
          "Fast LLM inference via Groq API",
          "Llama 3.1 for natural language understanding",
          "Translates intents to Playwright actions",
        ],
      },
    ],
    options: [
      { label: "How are security guardrails implemented?", nextId: "concierge_security" },
      { label: "What's the tech stack?", nextId: "concierge_stack" },
      { label: "Back to Concierge", nextId: "concierge" },
    ],
  },

  concierge_security: {
    id: "concierge_security",
    text: "Multi-layered security prevents unauthorized actions and ensures safe automation with user oversight.",
    sections: [
      {
        title: "Safety Features",
        bullets: [
          "OTP-aware handling: Automated 2FA support",
          "Dry-run mode: Preview actions without execution",
          "Explicit confirmation gates: User approval before spend",
          "Spend control: Budget limits and approval thresholds",
        ],
      },
      {
        title: "Monitoring",
        bullets: [
          "Real-time progress tracking via React dashboard",
          "Automation logs for audit and debugging",
          "User oversight at critical decision points",
        ],
      },
    ],
    options: [
      { label: "How does LLM reasoning work?", nextId: "concierge_llm" },
      { label: "What's the tech stack?", nextId: "concierge_stack" },
      { label: "Back to Concierge", nextId: "concierge" },
    ],
  },

  concierge_stack: {
    id: "concierge_stack",
    text: "Modern stack built for reliable browser automation and real-time user interaction.",
    sections: [
      {
        title: "Technologies",
        bullets: [
          "Playwright: Cross-browser automation framework",
          "FastAPI: Python backend for orchestration",
          "LLM Agents: Llama 3.1 via Groq for reasoning",
          "React: Real-time dashboard and controls",
          "Vite: Fast frontend build tooling",
        ],
      },
    ],
    options: [
      { label: "How does LLM reasoning work?", nextId: "concierge_llm" },
      { label: "Back to Concierge", nextId: "concierge" },
      { label: "Show me other projects", nextId: "projects_overview" },
    ],
  },

  intellivision: {
    id: "intellivision",
    text: "IntelliVision is a multi-task computer vision platform built during Aditya's internship at AionOS (May-Aug 2025). It orchestrates 8+ production pipelines including ANPR, crowd analytics, infrastructure defect detection, and food-waste estimation.",
    sections: [
      {
        title: "Production Pipelines",
        bullets: [
          "ANPR (Automatic Number Plate Recognition)",
          "Crowd analytics and people counting",
          "Infrastructure defect detection",
          "Food-waste estimation for cafeterias",
          "8+ specialized computer vision pipelines",
        ],
      },
      {
        title: "Core Technologies",
        bullets: [
          "Unified model manager with automated versioning",
          "GPU-aware fallbacks for Ultralytics YOLO and RT-DETR",
          "OSNet Re-ID and MiDaS depth estimation",
          "Robust spatial tracking with zone-based logic",
        ],
      },
      {
        title: "Face Authentication",
        bullets: [
          "InsightFace for face detection and embedding",
          "Qdrant vector database for similarity search",
          "Real-time authentication workflows",
        ],
      },
    ],
    options: [
      { label: "How does tracking work?", nextId: "intellivision_tracking" },
      { label: "Tell me about depth estimation", nextId: "intellivision_depth" },
      { label: "How is face auth implemented?", nextId: "intellivision_face" },
      { label: "What was the architecture?", nextId: "intellivision_architecture" },
      { label: "Show me other projects", nextId: "projects_overview" },
    ],
  },

  intellivision_tracking: {
    id: "intellivision_tracking",
    text: "IntelliVision uses advanced tracking algorithms with Re-ID (re-identification) to maintain object identities across frames.",
    sections: [
      {
        title: "Tracking Algorithms",
        bullets: [
          "BoTSORT: Motion prediction with appearance matching",
          "ByteTrack: Low-threshold detections for occlusion handling",
          "DeepOCSort: Observation-centric tracking",
        ],
      },
      {
        title: "Re-Identification",
        bullets: [
          "OSNet Re-ID: Appearance embeddings for identity matching",
          "Spatial tracking with zone-based logic",
          "Robust performance in crowded scenes",
        ],
      },
    ],
    options: [
      { label: "How does depth estimation work?", nextId: "intellivision_depth" },
      { label: "Tell me about face authentication", nextId: "intellivision_face" },
      { label: "Back to IntelliVision", nextId: "intellivision" },
    ],
  },

  intellivision_depth: {
    id: "intellivision_depth",
    text: "MiDaS depth estimation enables spatial understanding for zone-based logic and improved tracking accuracy.",
    sections: [
      {
        title: "Depth Estimation",
        bullets: [
          "MiDaS: Monocular depth estimation from single camera",
          "Spatial understanding for 3D scene layout",
          "Zone-based logic for region-of-interest filtering",
        ],
      },
      {
        title: "Applications",
        bullets: [
          "Improved tracking with depth cues",
          "Virtual zone crossing detection",
          "Distance-aware analytics",
        ],
      },
    ],
    options: [
      { label: "How does tracking work?", nextId: "intellivision_tracking" },
      { label: "Tell me about face authentication", nextId: "intellivision_face" },
      { label: "Back to IntelliVision", nextId: "intellivision" },
    ],
  },

  intellivision_face: {
    id: "intellivision_face",
    text: "Face authentication uses InsightFace for embeddings and Qdrant for fast similarity search across large face databases.",
    sections: [
      {
        title: "Recognition Pipeline",
        bullets: [
          "InsightFace: State-of-the-art face detection and embedding",
          "Qdrant: Vector database for fast similarity search",
          "Real-time authentication with lifecycle tracking",
        ],
      },
      {
        title: "Integration",
        bullets: [
          "React + TypeScript dashboard for face registration",
          "Real-time verification workflows",
          "Scalable vector search for large databases",
        ],
      },
    ],
    options: [
      { label: "How does tracking work?", nextId: "intellivision_tracking" },
      { label: "What was the architecture?", nextId: "intellivision_architecture" },
      { label: "Back to IntelliVision", nextId: "intellivision" },
    ],
  },

  intellivision_architecture: {
    id: "intellivision_architecture",
    text: "IntelliVision is built on a scalable Django REST API with Celery for async processing and PostgreSQL for data persistence.",
    sections: [
      {
        title: "Backend Architecture",
        bullets: [
          "Django REST APIs: Endpoint design and data models",
          "Celery + Redis: High-throughput video analytics jobs",
          "PostgreSQL: Job metadata and results storage",
          "Resource-aware scheduling for GPU management",
        ],
      },
      {
        title: "Frontend Dashboard",
        bullets: [
          "React + TypeScript: Type-safe component architecture",
          "Vite + Tailwind: Fast builds and utility-first styling",
          "Real-time lifecycle tracking for jobs",
          "Face authentication workflows",
        ],
      },
      {
        title: "Model Management",
        bullets: [
          "Unified model manager with automated versioning",
          "GPU-aware fallbacks for compute efficiency",
          "Support for YOLO and RT-DETR architectures",
        ],
      },
    ],
    options: [
      { label: "How does tracking work?", nextId: "intellivision_tracking" },
      { label: "Back to IntelliVision", nextId: "intellivision" },
      { label: "Tell me about other work", nextId: "experience_overview" },
    ],
  },

  carbon: {
    id: "carbon",
    text: "Carbon (2021) is an Android application with emissions calculations and history tracking to estimate individual carbon footprints. It has garnered 500+ downloads across more than 8 countries.",
    sections: [
      {
        title: "Features",
        bullets: [
          "Emissions calculations based on lifestyle factors",
          "History tracking with timestamped records",
          "Profile management for multiple users",
          "500+ downloads across 8+ countries",
        ],
      },
      {
        title: "Technologies",
        bullets: [
          "Java: Native Android development",
          "Firebase Auth: User authentication",
          "Firebase Realtime Database: Cloud sync and storage",
          "PaperDB: Local offline persistence",
        ],
      },
    ],
    options: [
      { label: "Show me other projects", nextId: "projects_overview" },
      { label: "What are his mobile dev skills?", nextId: "skills_overview" },
      { label: "Back to start", nextId: "start" },
    ],
  },

  experience_overview: {
    id: "experience_overview",
    text: "Aditya has professional experience across computer vision engineering, data science, and ML research with a focus on production systems.",
    sections: [
      {
        title: "AionOS - Computer Vision Intern (May 2025 - Aug 2025)",
        bullets: [
          "Architected IntelliVision multi-task CV platform",
          "8+ production pipelines: ANPR, crowd analytics, defect detection",
          "Django REST + Celery + Redis for scalable video processing",
          "React + TypeScript dashboard with face authentication",
        ],
      },
      {
        title: "R Systems - Data Science Intern (Jun 2024 - Jul 2024)",
        bullets: [
          "Analyzed investment and telecom datasets for trend analysis",
          "Churn prediction with Scikit-Learn (Logistic Regression, Neural Networks)",
          "5-class sentiment classification with spaCy and BiLSTM (80%+ accuracy)",
        ],
      },
      {
        title: "MadCSE Research - Research Assistant (Sep 2025 - Present)",
        bullets: [
          "Optimizing Python grading infrastructure for university courses",
          "LLM integration via Azure OpenAI with focus on latency and cost",
        ],
      },
      {
        title: "SPAN Lab - Research Assistant (Oct 2023 - May 2024)",
        bullets: [
          "MATLAB pipelines for SEEG neural signal preprocessing",
          "SVM classification for speech perception decoding",
        ],
      },
    ],
    options: [
      { label: "Tell me about IntelliVision", nextId: "intellivision" },
      { label: "What research did you do?", nextId: "research_overview" },
      { label: "What projects have you built?", nextId: "projects_overview" },
      { label: "Back to start", nextId: "start" },
    ],
  },

  skills_overview: {
    id: "skills_overview",
    text: "Aditya has comprehensive technical skills across programming languages, AI/ML frameworks, computer vision, full-stack development, and data infrastructure.",
    sections: [
      {
        title: "Programming Languages",
        bullets: ["Python", "Java", "JavaScript", "C", "SQL", "MATLAB", "Kotlin"],
      },
      {
        title: "AI and Machine Learning",
        bullets: [
          "PyTorch, TensorFlow, XGBoost, Scikit-Learn, spaCy",
          "Bayesian Inference, Conformal Prediction",
          "DenseNet121, ResNet18, EfficientNet, MobileNetV2",
        ],
      },
      {
        title: "Computer Vision",
        bullets: [
          "OpenCV, YOLO, RT-DETR",
          "BoTSORT, ByteTrack, DeepOCSort",
          "OSNet, InsightFace, MiDaS, DPT",
        ],
      },
      {
        title: "Full-Stack Development",
        bullets: [
          "Backend: FastAPI, Django, Flask, Celery, WebSocket",
          "Frontend: React, Mantine, Vite, Three.js, HTML Canvas",
          "Automation: Playwright, Selenium",
        ],
      },
      {
        title: "Data and Infrastructure",
        bullets: [
          "Databases: PostgreSQL, MongoDB, Firebase, Qdrant, Redis",
          "MLOps: Docker, Prometheus, Grafana, Kafka, Spark",
          "Cloud: Cloudinary for media storage",
        ],
      },
    ],
    options: [
      { label: "What's his strongest area?", nextId: "skills_computer_vision" },
      { label: "Tell me about Python expertise", nextId: "skills_python" },
      { label: "What about full-stack skills?", nextId: "skills_fullstack" },
      { label: "Show me projects", nextId: "projects_overview" },
      { label: "Back to start", nextId: "start" },
    ],
  },

  skills_computer_vision: {
    id: "skills_computer_vision",
    text: "Computer vision is Aditya's core strength with production experience across detection, tracking, depth estimation, and face recognition.",
    sections: [
      {
        title: "Detection & Tracking",
        bullets: [
          "YOLO (Ultralytics), RT-DETR for object detection",
          "BoTSORT, ByteTrack, DeepOCSort for multi-object tracking",
          "OSNet Re-ID for appearance-based matching",
        ],
      },
      {
        title: "Specialized CV",
        bullets: [
          "MiDaS, DPT for monocular depth estimation",
          "InsightFace for face recognition and embedding",
          "Medical imaging: DenseNet121, EfficientNet for diagnostics",
        ],
      },
      {
        title: "Production Experience",
        bullets: [
          "IntelliVision: 8+ CV pipelines in production",
          "Vitalis: Medical imaging analysis",
          "Real-time video analytics with GPU optimization",
        ],
      },
    ],
    options: [
      { label: "Show me CV projects", nextId: "intellivision" },
      { label: "What other skills?", nextId: "skills_overview" },
      { label: "Back to start", nextId: "start" },
    ],
  },

  skills_python: {
    id: "skills_python",
    text: "Python is Aditya's primary language with deep expertise in ML frameworks, web backends, and systems programming.",
    sections: [
      {
        title: "ML & Data Science",
        bullets: [
          "PyTorch, TensorFlow for deep learning",
          "Scikit-Learn, XGBoost for classical ML",
          "spaCy for NLP, MATLAB for signal processing",
        ],
      },
      {
        title: "Backend Development",
        bullets: [
          "FastAPI, Django, Flask for API development",
          "Celery for distributed task processing",
          "WebSocket for real-time communication",
        ],
      },
      {
        title: "Production Systems",
        bullets: [
          "System reliability and optimization (MadCSE)",
          "High-throughput video processing (IntelliVision)",
          "MLOps infrastructure (Drift Shield)",
        ],
      },
    ],
    options: [
      { label: "Show me Python projects", nextId: "projects_overview" },
      { label: "What other skills?", nextId: "skills_overview" },
      { label: "Back to start", nextId: "start" },
    ],
  },

  skills_fullstack: {
    id: "skills_fullstack",
    text: "Aditya has production full-stack experience building React frontends with FastAPI/Django backends for ML applications.",
    sections: [
      {
        title: "Frontend",
        bullets: [
          "React with modern hooks and TypeScript",
          "Vite for fast development and builds",
          "Mantine, Tailwind for styling",
          "Real-time dashboards with WebSocket",
        ],
      },
      {
        title: "Backend",
        bullets: [
          "FastAPI for high-performance APIs",
          "Django REST Framework for data models",
          "Celery + Redis for async processing",
        ],
      },
      {
        title: "Production Apps",
        bullets: [
          "IntelliVision: React + Django platform",
          "Vitalis: React 19 + Flask diagnostic tool",
          "Concierge: React + FastAPI automation dashboard",
        ],
      },
    ],
    options: [
      { label: "Show me full-stack projects", nextId: "projects_overview" },
      { label: "What other skills?", nextId: "skills_overview" },
      { label: "Back to start", nextId: "start" },
    ],
  },

  leadership: {
    id: "leadership",
    text: "Aditya has significant environmental and social advocacy experience, including legal action on pollution, community campaigns, and recognition from The Diana Award.",
    sections: [
      {
        title: "Policy & Litigation",
        bullets: [
          "Filed PIL in Supreme Court of India on air pollution, catalyzing creation of CAQM",
          "Petitioned National Green Tribunal against single-use plastic by e-commerce giants",
          "Contributed to enforcement of Extended Producer Responsibility (EPR) regulations",
        ],
      },
      {
        title: "Community Campaigns",
        bullets: [
          "Led tree-plantation and seed-orb drives: 100,000+ trees planted",
          "Grassroots initiatives supporting street children and underprivileged communities",
          "Education access, resource drives, and local outreach programs",
        ],
      },
      {
        title: "Recognition & Media",
        bullets: [
          "The Diana Award recognition for social impact",
          "Featured in Vice, The Earth Day Network, Verve Magazine",
          "Wikipedia article documenting advocacy work",
        ],
      },
    ],
    options: [
      { label: "Tell me about the PIL", nextId: "leadership_pil" },
      { label: "What about tree-plantation?", nextId: "leadership_trees" },
      { label: "Social work details?", nextId: "leadership_social" },
      { label: "What recognition?", nextId: "leadership_recognition" },
      { label: "Back to start", nextId: "start" },
    ],
  },

  leadership_pil: {
    id: "leadership_pil",
    text: "Aditya filed a Public Interest Litigation (PIL) in the Supreme Court of India addressing severe air pollution, which contributed to the creation of the Commission for Air Quality Management (CAQM).",
    sections: [
      {
        title: "Air Pollution PIL",
        bullets: [
          "Supreme Court of India filing on air quality crisis",
          "Catalyzed creation of Commission for Air Quality Management",
          "Focused on enforcement and accountability measures",
        ],
      },
      {
        title: "E-commerce Plastic Petition",
        bullets: [
          "National Green Tribunal petition against excessive packaging",
          "Targeted e-commerce giants' single-use plastic practices",
          "Contributed to Extended Producer Responsibility (EPR) enforcement",
        ],
      },
    ],
    options: [
      { label: "What about tree-plantation?", nextId: "leadership_trees" },
      { label: "Tell me about social work", nextId: "leadership_social" },
      { label: "Back to advocacy", nextId: "leadership" },
    ],
  },

  leadership_trees: {
    id: "leadership_trees",
    text: "Tree-plantation initiatives led by Aditya resulted in 100,000+ trees planted through community engagement and innovative seed-orb distribution.",
    sections: [
      {
        title: "Plantation Drives",
        bullets: [
          "100,000+ trees planted through organized campaigns",
          "Seed-orb distribution for scalable urban greening",
          "Community engagement in climate action",
        ],
      },
      {
        title: "Impact",
        bullets: [
          "Large-scale environmental impact across regions",
          "Local community participation and education",
          "Sustainable approach with seed-orb methodology",
        ],
      },
    ],
    options: [
      { label: "What about the PIL?", nextId: "leadership_pil" },
      { label: "Tell me about social work", nextId: "leadership_social" },
      { label: "Back to advocacy", nextId: "leadership" },
    ],
  },

  leadership_social: {
    id: "leadership_social",
    text: "Grassroots social initiatives focused on supporting street children and underprivileged communities through education access and resource drives.",
    sections: [
      {
        title: "Community Support",
        bullets: [
          "Education access programs for street children",
          "Resource drives: essentials and supplies distribution",
          "Local outreach with community partnerships",
        ],
      },
      {
        title: "Approach",
        bullets: [
          "Grassroots initiatives with direct community impact",
          "Focus on education as pathway to opportunity",
          "Sustainable support through local partnerships",
        ],
      },
    ],
    options: [
      { label: "What about environmental work?", nextId: "leadership_trees" },
      { label: "What recognition has he received?", nextId: "leadership_recognition" },
      { label: "Back to advocacy", nextId: "leadership" },
    ],
  },

  leadership_recognition: {
    id: "leadership_recognition",
    text: "Aditya has been recognized by The Diana Award and featured in major media outlets for his environmental and social advocacy work.",
    sections: [
      {
        title: "Recognition",
        bullets: [
          "The Diana Award for social impact and advocacy",
          "Wikipedia article documenting advocacy work",
        ],
      },
      {
        title: "Media Coverage",
        bullets: [
          "Vice: Feature on e-commerce packaging petition",
          "The Earth Day Network: 'My Future My Voice' campaign",
          "Verve Magazine: 'Rebels with a Cause' feature",
        ],
      },
    ],
    options: [
      { label: "Tell me about the PIL", nextId: "leadership_pil" },
      { label: "What about social work?", nextId: "leadership_social" },
      { label: "Back to advocacy", nextId: "leadership" },
      { label: "Back to start", nextId: "start" },
    ],
  },
};
