import { MainLayout } from '../components/layouts/MainLayout';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

export default function Privacy() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold m-0">Your Privacy Matters</h2>
              </div>
              <p className="text-gray-300">
                At Code Editor, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information when you use our service.
              </p>
            </div>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold">Information We Collect</h2>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Account information (email, username)</li>
                  <li>Usage data and preferences</li>
                  <li>Code snippets and projects</li>
                  <li>Technical information (browser type, IP address)</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold">How We Protect Your Data</h2>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300 mb-4">
                  We implement various security measures to maintain the safety of your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security audits</li>
                  <li>Secure data storage</li>
                  <li>Access controls and authentication</li>
                  <li>Regular backups</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold">Your Rights</h2>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300 mb-4">
                  You have the following rights regarding your personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@codeeditor.dev" className="text-blue-400 hover:text-blue-300">
                  privacy@codeeditor.dev
                </a>
              </p>
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