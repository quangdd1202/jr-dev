import type { ConversationSender } from '@/components/ConversationChatItem';

export interface Message {
  id: string;
  sender: ConversationSender;
  content: string;
  createdAt: string; // ISO
}

export interface ConversationSummary {
  id: string; // slug-compatible id
  title: string;
  createdAt: string; // ISO
}

export interface Conversation extends ConversationSummary {
  messages: Message[];
}

// Simple seeded mock data
const now = new Date();

const minutesAgo = (min: number) =>
  new Date(now.getTime() - min * 60 * 1000).toISOString();
const daysAgo = (days: number) =>
  new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    title: 'Weather Dynamics',
    createdAt: minutesAgo(30),
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'Why does the weather not just stay the same?',
        createdAt: minutesAgo(1800), // ~30 hours ago
      },
      {
        id: 'm2',
        sender: 'assistant',
        content:
          "Great question! Weather constantly changes due to the atmosphere being a dynamic fluid driven by uneven heating from the Sun, Earth's rotation, and topography.",
        createdAt: minutesAgo(1785),
      },
      {
        id: 'm3',
        sender: 'user',
        content: 'What do you mean by uneven heating?',
        createdAt: minutesAgo(1770),
      },
      {
        id: 'm4',
        sender: 'assistant',
        content:
          'Different places get different amounts of sunlight (day/night, seasons, latitude). That creates temperature and pressure differences, moving air and moisture around.',
        createdAt: minutesAgo(1765),
      },
      {
        id: 'm5',
        sender: 'assistant',
        content:
          'Those differences drive circulation cells (Hadley/Ferrel/Polar), jet streams, and storm tracks — constantly mixing the atmosphere.',
        createdAt: minutesAgo(1760),
      },
      {
        id: 'm6',
        sender: 'user',
        content: 'Does the ocean affect this too?',
        createdAt: minutesAgo(1750),
      },
      {
        id: 'm7',
        sender: 'assistant',
        content:
          'Absolutely. Oceans store and transport heat. Phenomena like El Niño/La Niña shift rainfall and temperature patterns across the globe.',
        createdAt: minutesAgo(1745),
      },
      {
        id: 'm8',
        sender: 'user',
        content: 'Okay, and today specifically?',
        createdAt: minutesAgo(60),
      },
      {
        id: 'm9',
        sender: 'assistant',
        content:
          'Today a low-pressure system is moving east, pulling in moist air — expect scattered showers and a cooling trend this evening.',
        createdAt: minutesAgo(55),
      },
      {
        id: 'm10',
        sender: 'assistant',
        content:
          'The two main reasons why the weather does not stay the same are: Atmospheric Dynamics and Solar Influence...',
        createdAt: minutesAgo(54),
      },
      {
        id: 'm11',
        sender: 'assistant',
        content:
          'Solar radiation heats the Earth unevenly leading to pressure systems that drive weather patterns.',
        createdAt: minutesAgo(53),
      },
    ],
  },
  {
    id: '2',
    title: 'Greenhouse Effect Explainer',
    createdAt: minutesAgo(90),
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'Explain the greenhouse effect simply',
        createdAt: minutesAgo(90),
      },
      {
        id: 'm2',
        sender: 'assistant',
        content:
          'The greenhouse effect traps heat in the atmosphere via gases like CO2 and methane, warming the planet.',
        createdAt: minutesAgo(89),
      },
    ],
  },
  {
    id: '3',
    title: 'Movie Streaming Help',
    createdAt: daysAgo(2),
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'Why does my movie buffer at night?',
        createdAt: daysAgo(2),
      },
      {
        id: 'm2',
        sender: 'assistant',
        content:
          'Likely due to network congestion during peak hours. Try lowering quality or using Ethernet.',
        createdAt: daysAgo(2),
      },
    ],
  },
  {
    id: '4',
    title: 'Web Design Workflow',
    createdAt: daysAgo(5),
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'What is a good web design workflow?',
        createdAt: daysAgo(5),
      },
      {
        id: 'm2',
        sender: 'assistant',
        content:
          'Discover, define, design, develop, and deploy. Iterate with user feedback at each stage.',
        createdAt: daysAgo(5),
      },
    ],
  },
  {
    id: '5',
    title: 'Photo generation',
    createdAt: daysAgo(6),
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'Generate a photorealistic cat image',
        createdAt: daysAgo(6),
      },
      {
        id: 'm2',
        sender: 'assistant',
        content:
          'Using a diffusion model, specify lighting, lens, and composition for best results.',
        createdAt: daysAgo(6),
      },
    ],
  },
];

// Simulated network latency
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchConversations(): Promise<ConversationSummary[]> {
  await delay(300);
  // Sort desc by createdAt
  return [...MOCK_CONVERSATIONS]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .map(({ id, title, createdAt }) => ({ id, title, createdAt }));
}

export async function fetchConversationBySlug(
  slug: string,
): Promise<Conversation | null> {
  await delay(400);
  const conv = MOCK_CONVERSATIONS.find((c) => c.id === slug);
  return conv ? { ...conv } : null;
}
