export interface FlowData {
  title: string;
  description: string;
}

export interface ProcessingStep {
  title: string;
  description: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  codeExample: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Technology {
  label: string;
  technology: string;
}

export interface DatabaseCardProps {
  name: string;
  logo: string;
  subtitle: string;
  description: string;
  cardType: 'faiss' | 'pinecone';
}

export interface ComparisonRow {
  feature: string;
  faiss: string;
  pinecone: string;
}

export interface ProsConsData {
  pros: string[];
  cons: string[];
}

export interface PerformanceMetric {
  value: string;
  description: string;
}

export interface UseCase {
  title: string;
  items: string[];
}