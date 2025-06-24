import Head from 'next/head';
import Board from '../components/Board';

export default function Home() {
  return (
    <div className="min-h-screen bg-anthropic-light py-4">
      <Head>
        <title>Pook Bingo</title>
        <meta name="description" content="A personal game board of things I love about you" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <Board />
      </main>
    </div>
  );
} 