import { MainLayout } from '../components/layouts/MainLayout';
import { FileText, AlertCircle, Check, HelpCircle } from 'lucide-react';

export default function Terms() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold m-0">Agreement to Terms</h2>
              </div>
              <p className="text-gray-300">
                By accessing or using Code Editor, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </div>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Check className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold">Acceptable Use</h2>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300 mb-4">You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Use the service for any illegal purpose</li>
                  <li>Share malicious code or harmful content</li>
                  <li>Attempt to breach our security measures</li>
                  <li>Violate any intellectual property rights</li>
                  <li>Interfere with other users' access to the service</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300">
                  Code Editor and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold">Changes to Terms</h2>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300 mb-4">
                  The service and its original content, features, and functionality are owned by Code Editor and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300">
                  We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </div>
            </section>

            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="text-sm text-gray-400">
                Last updated: March 1, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}