// src/app/entry/new/page.tsx
'use client';

import { useState } from 'react';
import { MarkdownContent } from '@/components/molecules/MarkdownContent/MarkdownContent';

export default function NewEntryPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [body, setBody] = useState('');

  return (
    <div className="bg-white rounded shadow-sm p-5 space-y-5">
      <h1 className="text-lg font-bold">新しい日記を書く</h1>

      {/* 日付 */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-700">日付</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>

      {/* タイトル */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-700">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>

      {/* 本文 2ペイン */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* 入力 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">本文（Markdown）</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 text-sm min-h-[300px] font-mono"
            placeholder="# タイトル&#10;本文を書きます…"
          />
        </div>

        {/* プレビュー */}
        <div>
          <label className="text-sm text-gray-700">プレビュー</label>
          <div className="border border-gray-200 rounded px-2 py-2 min-h-[300px]">
            <MarkdownContent content={body || '（ここにプレビューが出ます）'} />
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          console.log('NEW ENTRY:', { date, title, body });
          alert('（今はまだ保存機能なし）\nConsole にデータを出しました！');
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        保存（※まだモック）
      </button>
    </div>
  );
}
