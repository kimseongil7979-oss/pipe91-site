export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  address: string;
  details: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'canceled';
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: '하수구' | '고압세척' | '누수탐지' | '변기/싱크대';
  location: string;
  date: string;
  issue: string;
  diagnosis: string;
  solution: string;
  duration: string;
  guarantee: string;
  beforeImg: string;
  afterImg: string;
  toolsUsed: string[];
}

