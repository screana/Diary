// src/app/entry/new/page.tsx
'use client';

import { useState } from 'react';
import { MarkdownContent } from '@/components/molecules/MarkdownContent/MarkdownContent';

type World = { name: string; url?: string };

export default function NewEntryPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [body, setBody] = useState('');

  const [worldsText, setWorldsText] = useState('');
  const [guests, setGuests] = useState('');
  const [tags, setTags] = useState('');

const handleSave = async () => {
  const worlds: World[] =
    worldsText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const [name, url] = line.split(',');
        return {
          name: name.trim(),
          url: url?.trim(),
        };
      }) ?? [];

  const payload = {
    date,
    title,
    body,
    worlds,
    guests,
    tags,
  };

  // Hono API に POST
  const res = await fetch('http://localhost:4000/entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  console.log('POST result:', json);
  alert('サーバーに送信しました！\nコンソールに結果を表示しました。');
};

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

      {/* 一緒にいた人 */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-700">
          一緒にいた人（カンマ区切り）
        </label>
        <input
          type="text"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          placeholder="Aさん,Bさん"
        />
      </div>

      {/* タグ */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-700">
          タグ（カンマ区切り）
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          placeholder="ホラー,作業,初対面"
        />
      </div>

      {/* 行ったワールド & 本文 2ペイン */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          {/* ワールド */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">
              行ったワールド（1行1ワールド / 「名前,URL」）
            </label>
            <textarea
              value={worldsText}
              onChange={(e) => setWorldsText(e.target.value)}
              className="border border-gray-300 rounded px-2 py-2 text-sm min-h-[120px]"
              placeholder={`例:\nRest and Sleep,https://vrchat.com/home/world/wrld_xxx\n作業ワールド,https://vrchat.com/home/world/wrld_yyy`}
            />
          </div>

          {/* 本文入力 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">
              本文（Markdown）
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="border border-gray-300 rounded px-2 py-2 text-sm min-h-[200px] font-mono"
              placeholder="# タイトル&#10;本文を書きます…"
            />
          </div>
        </div>

        {/* プレビュー */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">プレビュー</label>
          <div className="border border-gray-200 rounded px-2 py-2 min-h-[320px]">
            <MarkdownContent
              content={body || '（ここにプレビューが出ます）'}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        保存（※今はまだモック）
      </button>
    </div>
  );
}
