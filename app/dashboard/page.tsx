import { ConnectionButton } from '@/components/ConnectionButton';
import GenerateCard from '@/components/GenerateCard';
import { ModeToggle } from '@/components/ModeToggle';
import { Toaster } from 'sonner';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col px-24 py-20">
      <Toaster />
      <div className='self-end mb-4 flex items-center space-x-4'>
        <ModeToggle />
        <ConnectionButton />
      </div>
      <div className='self-center mb-4'>
        <h1 className="flex justify-center text-5xl font-bold mb-4">
          <span className="text-primary">SupaTest</span>
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <GenerateCard />
      </div>
    </main>
  );
}