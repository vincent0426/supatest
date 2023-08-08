import { ConnectionForm } from '@/components/ConnectionForm';
import GenerateCard from '@/components/GenerateCard';
import { GenerateForm } from '@/components/GenerateForm';
import { ModeToggle } from '@/components/ModeToggle';
import { SelectTable } from '@/components/SelectTable';

import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ModeToggle />
        <ConnectionForm />
      </div>
      <GenerateCard />
    </main>
  );
}
