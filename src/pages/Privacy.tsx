import { MainLayout } from '../components/layouts/MainLayout';
import { PrivacyContent } from '../components/sections/PrivacyContent';

export default function Privacy() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
          <PrivacyContent />
        </div>
      </div>
    </MainLayout>
  );
}