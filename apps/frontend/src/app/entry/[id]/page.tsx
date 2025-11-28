// src/app/entry/[id]/page.tsx
import { entriesApi } from '@/features/entries/api/entries.api';
import type { Entry } from '@/features/entries/types/entry';
import { MarkdownContent } from '@/components/molecules/MarkdownContent/MarkdownContent';

// params は Promise 前提にする
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EntryPage({ params }: PageProps) {
  //Promise を await してから id を取り出す
  const { id } = await params;

  const entry: Entry | undefined = await entriesApi.get(id);

  if (!entry) {
    return (
      <div className="bg-white rounded shadow-sm p-4">
        <div className="text-sm text-gray-500">
          この日記は見つかりませんでした。
        </div>
        <a
          href="/"
          className="text-sm text-blue-600 hover:underline mt-2 inline-block"
        >
          一覧に戻る
        </a>
      </div>
    );
  }

  return (
    <article className="bg-white rounded shadow-sm p-5 space-y-4">
      <header className="border-b border-gray-200 pb-3">
        <h1 className="text-xl font-bold mb-1">{entry.title}</h1>
        <div className="text-xs text-gray-500 flex flex-wrap gap-2">
          <span>{entry.date}</span>
          {entry.tags && (
            <span>
              {entry.tags.split(',').map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-100 px-2 py-[2px] rounded-full mr-1"
                >
                  #{tag.trim()}
                </span>
              ))}
            </span>
          )}
        </div>
        {entry.guests && (
          <div className="text-xs text-gray-500 mt-1">
            一緒にいた人: {entry.guests}
          </div>
        )}
      </header>

      <section>
        <h2 className="text-sm font-semibold mb-2 text-gray-700">本文</h2>
        <MarkdownContent content={entry.body} />
      </section>

      {entry.worlds && entry.worlds.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold mb-2 text-gray-700">
            行ったワールド
          </h2>
          <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
            {entry.worlds.map((w, i) => (
              <li key={i}>
                {w.url ? (
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {w.name}
                  </a>
                ) : (
                  w.name
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="pt-2 border-t border-gray-100 mt-2">
        <a href="/" className="text-xs text-blue-600 hover:underline">
          一覧に戻る
        </a>
      </footer>
    </article>
  );
}
