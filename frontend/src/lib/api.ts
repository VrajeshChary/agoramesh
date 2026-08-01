import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = 'http://127.0.0.1:8000';

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  endpoint_url: string;
  trust_score: number;
  created_at: string;
  model?: string;
}

export interface Execution {
  id: string;
  agent_id: string;
  prompt: string;
  response: string;
  execution_time_ms: number;
  model: string;
  created_at: string;
}

export const fetchAgents = async (): Promise<Agent[]> => {
  const response = await fetch(`${API_BASE_URL}/agents/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchExecutions = async (): Promise<Execution[]> => {
  const response = await fetch(`${API_BASE_URL}/executions/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useAgents = () => {
  return useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgents,
  });
};

export const useExecutions = () => {
  return useQuery({
    queryKey: ['executions'],
    queryFn: fetchExecutions,
  });
};

export interface PaymentRequiredError {
  status: 402;
  data: {
    message: string;
    agent_id: string;
    price: number;
    currency: string;
    receiver: string;
  };
}

export const executeAgent = async (agentId: string, prompt: string) => {
  const response = await fetch(`${API_BASE_URL}/agents/${agentId}/execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (response.status === 402) {
    const data = await response.json();
    throw {
      status: 402,
      data
    } as PaymentRequiredError;
  }

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
