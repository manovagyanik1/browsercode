import { MainLayout } from '../components/layouts/MainLayout';
import { TermsContent } from '../components/sections/TermsContent';

export default function Terms() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>
          <TermsContent />
        </div>
      </div>
    </MainLayout>
  );
}