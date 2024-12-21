import { MainLayout } from '../components/layouts/MainLayout';
import { ContactContent } from '../components/sections/ContactContent';

export default function Contact() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white">Contact Us</h1>
            <p className="text-xl text-gray-300">
              Have questions about our browser-based IDE? We'd love to hear from you.
            </p>
          </div>
          <ContactContent />
        </div>
      </div>
    </MainLayout>
  );
}