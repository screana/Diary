// src/app/page.tsx
import { entriesApi } from '@/features/entries/api/entries.api';
import type { EntrySummary } from '@/features/entries/types/entry';

export default async function Home() {
  const entries: EntrySummary[] = await entriesApi.list();

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-2">
        最新の日記
      </h1>

      {entries.length === 0 ? (
        <p className="text-sm text-gray-500">まだ日記がありません。</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`/entry/${entry.id}`}
                className="block bg-white rounded shadow-sm hover:shadow-md transition-shadow px-4 py-3"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-gray-500">{entry.date}</div>
                  {entry.tags && (
                    <div className="text-[10px] text-gray-500">
                      {entry.tags.split(',').map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-100 px-2 py-[2px] rounded-full mr-1"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="font-bold text-sm">{entry.title}</div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
