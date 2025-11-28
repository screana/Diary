// src/features/entries/api/entries.api.ts
import type { Entry, EntrySummary } from '@/features/entries/types/entry';

const MOCK_ENTRIES: Entry[] = [
  {
    id: '1',
    date: '2025-11-28',
    title: '初めてこの日記を書いた',
    body: [
      '# きょうのVRC',
      '',
      '今日はテストでこの日記アプリを触ってみた。',
      '',
      '- Rest and Sleep でまったり',
      '- そのあとホラーワールドへ',
      '',
      '## 感想',
      '',
      'UI がそれっぽくなってきてちょっとテンション上がった。',
    ].join('\n'),
    worlds: [
      {
        name: 'Rest and Sleep',
        url: 'https://vrchat.com/home/world/wrld_rest_and_sleep',
      },
      {
        name: 'Some Horror World',
        url: 'https://vrchat.com/home/world/wrld_horror_example',
      },
    ],
    guests: 'Aさん,Bさん',
    tags: 'テスト,ホラー',
  },
  {
    id: '2',
    date: '2025-11-27',
    title: '作業ワールドでレポート書いた',
    body: [
      '# 作業ワールドで作業会',
      '',
      '作業ワールドでみんなでレポート。半分雑談だった。',
    ].join('\n'),
    worlds: [
      {
        name: '作業ワールド Example',
      },
    ],
    guests: 'Cさん',
    tags: '作業,雑談',
  },
];

export const entriesApi = {
  async list(): Promise<EntrySummary[]> {
    const sorted = [...MOCK_ENTRIES].sort((a, b) =>
      a.date < b.date ? 1 : -1,
    );
    return sorted.map(({ id, date, title, tags }) => ({
      id,
      date,
      title,
      tags,
    }));
  },

  async get(id: string): Promise<Entry | undefined> {
    console.log('[entriesApi.get] id =', id);
    const entry = MOCK_ENTRIES.find((e) => e.id === id);
    console.log('[entriesApi.get] entry =', entry);
    return entry;
  },
};
