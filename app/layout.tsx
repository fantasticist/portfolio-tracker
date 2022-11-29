import '@/styles/dist.css';
import React from 'react';
import AddressBar from '@/ui/AddressBar';
import { Sidebar } from '@/ui/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark">
      <head>
        <title>Portfolio Tracker</title>
      </head>
      <body className="overflow-y-scroll bg-zinc-900 text-white">
        <div className="grid grid-cols-[1fr,minmax(auto,240px),min(800px,100%),1fr] gap-x-8 py-8">
          <div className="col-start-2">
            <Sidebar />
          </div>

          <div className="col-start-3 space-y-6">
            <AddressBar />

            <div className="rounded-xl border border-zinc-800 bg-black p-8">
              {children}
            </div>
          </div>

          <div className="col-start-3 col-end-4 mt-28 flex items-center justify-center">
            <div className="text-sm text-zinc-600">
              Created by the <b>Next.js</b>
              {' team at '}
              <a href="https://vercel.com">
                <b>Vercel</b>
              </a>
              {'. '}
              <a
                className="underline decoration-dotted underline-offset-4"
                href="https://github.com/vercel/next.js/examples/with-turbopack"
              >
                View the code
              </a>
              {' or '}
              <a
                className="underline decoration-dotted underline-offset-4"
                href="https://vercel.com/templates/next.js"
              >
                deploy your own
              </a>
              {'.'}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
