// All site text lives here. Edit this file to change what the site says.
// APPROVED: profile + about. DRAFT (pending approval): experience, projects.
// PLACEHOLDERS: project `href`s are unset; campus photo is unset; public/Sohum-Goel-Resume.pdf comes from `npm run update-resume`.

export const profile = {
  name: "Sohum Goel",
  role: "AI Engineer · CMU MS ECE ’27",
  tagline:
    "I build LLM agents, RAG pipelines, and ML services, plus the monitoring that tells you when they break.",
  email: "sohumg@andrew.cmu.edu",
  github: "https://github.com/SohumGoel",
  linkedin: "https://www.linkedin.com/in/sohumgoel",
  resume: "/Sohum-Goel-Resume.pdf",
  headshot: "/headshot.jpg",
};

// Wide photo under About. Drop your own shot in public/ (e.g. public/cmu.jpg) and set src; hidden while null.
export const campusPhoto: { src: string; alt: string; caption: string } | null = null;

export const about = [
  "I’m currently pursuing an MS in Electrical and Computer Engineering at Carnegie Mellon, after a CS degree at UC Davis. I like AI systems that hold up outside a notebook: retrieval you can trace back to a source, agents with guardrails, and models served under live traffic with alerts wired in.",
  "Lately I’ve been drawn to the physical side of AI, running models on-device and on robots, from YOLO on a Jetson to vSLAM mapping in ROS2.",
  "I’m looking for new-grad AI engineering and forward-deployed roles starting 2027.",
];

export type Job = {
  period: string;
  role: string;
  company: string;
  summary: string;
  tags: string[];
};

export const experience: Job[] = [
  {
    period: "2025",
    role: "AI Intern",
    company: "Tata Sons",
    summary:
      "Extended a multi-agent RAG research assistant and built an MSME analytics dashboard from scratch, which I presented to leadership.",
    tags: ["RAG", "Next.js", "FastAPI", "Grafana"],
  },
  {
    period: "2024 — 2025",
    role: "Data Engineer",
    company: "Kare PharmTech",
    summary:
      "Prototyped healthcare AI on synthetic data: a care-gap engine where an LLM explains why a patient missed a quality measure, and RAG over medical billing documents.",
    tags: ["LangChain", "FAISS", "FHIR", "Llama 3"],
  },
  {
    period: "2023",
    role: "Software Development Intern",
    company: "Rubix Data Sciences",
    summary:
      "Built a news scraping and summarization pipeline, benchmarked language models for it, and shipped it as a containerized API.",
    tags: ["Python", "Flask", "Docker", "NLTK"],
  },
  {
    period: "2022",
    role: "Software Development Intern",
    company: "Rightpoint",
    summary: "Cut Magento configuration and deployment time by 2+ hours with Docker and CI/CD.",
    tags: ["Docker", "Azure DevOps"],
  },
];

export type Project = {
  title: string;
  metric: string;
  context: string;
  summary: string;
  tags: string[];
  href?: string; // repo or demo link; the row is not clickable without one
  inProgress?: boolean;
};

export const projects: Project[] = [
  {
    title: "Movie Recommendation Platform",
    metric: "−67% cost per request in a live A/B test",
    context: "CMU 17-645 · team of 5",
    summary:
      "A live recommender for a simulated streaming service: ~1M Kafka events every 30 minutes, A/B-routed containers, automated retraining, and Grafana alerts. I owned data validation.",
    tags: ["PyTorch", "Kafka", "nginx", "Prometheus"],
  },
  {
    title: "MarketMind",
    metric: "+9% retrieval relevance",
    context: "CMU 11-766 · team of 2",
    summary:
      "Ticker in, BUY / HOLD / SELL call out, grounded in live prices, news, and SEC filings. I built the data agents, the RAG pipeline, and a multi-model LLM layer with failover.",
    tags: ["RAG", "FAISS", "litellm", "Streamlit"],
  },
  {
    title: "MCP Agent Security",
    metric: "100% on an 18-case red-team suite",
    context: "CMU 17-645",
    summary:
      "Hardened a tool-calling airline agent against prompt injection with a semantic guardrail and confirmation gates on payments, then cut guardrail latency ~4×.",
    tags: ["MCP", "Gemini", "Flask"],
  },
  {
    title: "Fault-Tolerant Distributed System",
    metric: "Zero downtime while replicas are killed live",
    context: "CMU 18-749 · team of 5",
    summary:
      "A replicated service that keeps serving clients through crashes, with heartbeat failure detection, checkpointing, and automatic recovery.",
    tags: ["Python", "TCP", "Replication"],
    inProgress: true,
  },
  {
    title: "Deep Learning Models",
    metric: ">80% accuracy across CNN, RNN, and GNN tasks",
    context: "UC Davis · led a team of 4",
    summary:
      "Image recognition, text generation, and graph embedding models, plus 5 CNNs that classify six facial expressions.",
    tags: ["PyTorch", "TensorFlow"],
  },
];
