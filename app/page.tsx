'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url(/bg.png)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-center text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          SupaTest
        </h1>
        <h2 className="text-center text-2xl font-semibold text-gray-500 mb-4">
          Generate fake data for your Supabase tables
        </h2>
        <div className="flex flex-col items-center justify-center">
          <Button
            variant='outline'
            onClick={() => router.push('/dashboard')}
            className="mt-8 px-5 py-2 rounded-full"
          >
            Get Started
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
