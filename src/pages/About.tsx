import { MainLayout } from '../components/layouts/MainLayout';
import { AboutContent } from '../components/sections/AboutContent';

export default function About() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">About Us</h1>
          <AboutContent />
        </div>
      </div>
    </MainLayout>
  );
}