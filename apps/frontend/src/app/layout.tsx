// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gnahri VRC Diary',
  description: 'VRC用の個人ブログ風日記',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-[#f4f4f4] text-gray-900">
        <div className="min-h-screen">
          {/* ヘッダー */}
          <header className="bg-white shadow-sm">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-xl font-bold tracking-tight">
                  Gnahri VRC Diary
                </div>
                <div className="text-xs text-gray-500">
                  VRChatで過ごした日々のログ
                </div>
              </div>
              <nav className="flex gap-4 text-sm">
                <a href="/" className="text-gray-700 hover:text-blue-600">
                  ホーム
                </a>
                <a
                  href="/entry/new"
                  className="text-blue-600 hover:text-blue-700"
                >
                  新しい日記
                </a>
              </nav>
            </div>
          </header>

          {/* コンテンツ */}
          <main className="max-w-5xl mx-auto px-4 py-6 flex gap-6">
            {/* メインカラム */}
            <div className="flex-1">{children}</div>

            {/* サイドバー */}
            <aside className="w-64 hidden md:block">
              <div className="bg-white rounded shadow-sm p-4 mb-4">
                <div className="text-sm font-semibold mb-2">
                  プロフィール
                </div>
                <div className="text-xs text-gray-600 leading-relaxed">
                  VRCで遊んだ日をゆるく記録するだけの個人ブログ。
                  <br />
                  行ったワールドや一緒にいた人をあとで眺めてニヤニヤする用途。
                </div>
              </div>

              <div className="bg-white rounded shadow-sm p-4">
                <div className="text-sm font-semibold mb-2">メモ</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>・ホラワの日にはタグ「ホラー」</li>
                  <li>・初対面多い日は「初対面」タグ</li>
                  <li>・作業会は「作業」タグ</li>
                </ul>
              </div>
            </aside>
          </main>

          {/* フッター */}
          <footer className="border-t border-gray-200 mt-4">
            <div className="max-w-5xl mx-auto px-4 py-3 text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Gnahri Diary
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
