'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ChatHistoryItem from '@/components/ChatHistoryItem';
import {
  fetchConversations,
  type ConversationSummary,
} from '@/mocks/conversations';
import { usePathname } from 'next/navigation';

interface GroupedConversations {
  today: ConversationSummary[];
  previous7Days: ConversationSummary[];
}

function groupConversations(list: ConversationSummary[]): GroupedConversations {
  const today: ConversationSummary[] = [];
  const previous7Days: ConversationSummary[] = [];

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

  for (const c of list) {
    const t = new Date(c.createdAt).getTime();
    if (t >= startOfToday) {
      today.push(c);
    } else if (t >= sevenDaysAgo) {
      previous7Days.push(c);
    }
  }

  return { today, previous7Days };
}

const SidebarHistory: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ConversationSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  // Extract /c/[slug] from pathname, otherwise null
  const currentSlug = useMemo(() => {
    if (!pathname) return null;
    const match = pathname.match(/^\/c\/([^/]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchConversations();
        if (mounted) {
          setItems(data);
        }
      } catch (error) {
        if (mounted && error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const groups = useMemo(() => groupConversations(items), [items]);

  if (loading) {
    return (
      <div className="px-2">
        <div className="mt-4">
          <div className="px-2 pb-2 text-base font-bold">Today</div>
          <div className="flex flex-col gap-4">
            <div className="h-8 rounded bg-gray-100" />
            <div className="h-8 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-2">
        <div className="mt-4 text-sm text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="px-2">
      {/* Today */}
      {groups.today.length > 0 && (
        <div className="mt-4">
          <div className="px-2 pb-2 text-base font-bold">Today</div>
          <div className="flex flex-col gap-4">
            {groups.today.map((c) => (
              <ChatHistoryItem
                key={c.id}
                label={c.title}
                href={`/c/${c.id}`}
                active={c.id === currentSlug}
              />
            ))}
          </div>
        </div>
      )}

      {/* Previous 7 days */}
      {groups.previous7Days.length > 0 && (
        <div className="mt-6">
          <div className="px-2 pb-2 text-base font-bold">Previous 7 days</div>
          <div className="flex flex-col gap-4">
            {groups.previous7Days.map((c) => (
              <ChatHistoryItem
                key={c.id}
                label={c.title}
                href={`/c/${c.id}`}
                active={c.id === currentSlug}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarHistory;
