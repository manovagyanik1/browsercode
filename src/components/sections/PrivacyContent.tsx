import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

export function PrivacyContent() {
  return (
    <div className="prose prose-invert max-w-none">
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold m-0">Browser-Based Security</h2>
        </div>
        <p className="text-gray-300">
          BrowserCode operates entirely within your browser, providing an unparalleled level of security and privacy. 
          Unlike traditional cloud-based IDEs, your code and data never leave your browser, eliminating common security risks 
          associated with server-side processing and storage.
        </p>
      </div>

      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Data Collection & Storage</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            We prioritize your privacy by minimizing data collection:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>No server-side storage of your code or projects</li>
            <li>No tracking or analytics beyond basic browser functionality</li>
            <li>No cookies except those essential for browser operation</li>
            <li>No personal data collection or storage</li>
            <li>No third-party access to your code or data</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Technical Security Measures</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            Our browser-based architecture implements several security measures:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Sandboxed execution environment using WebContainers</li>
            <li>Isolated runtime for each project</li>
            <li>Content Security Policy (CSP) enforcement</li>
            <li>Cross-Origin Resource Sharing (CORS) protection</li>
            <li>WebAssembly security boundaries</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileCheck className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Your Rights & Control</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            With BrowserCode, you maintain complete control over your data:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>All code remains in your browser's local storage</li>
            <li>No account required for basic usage</li>
            <li>Optional local file system integration</li>
            <li>Data cleared when you close the browser</li>
            <li>No persistent storage without explicit consent</li>
          </ul>
        </div>
      </section>

      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-sm text-gray-400">Last updated: March 1, 2024</p>
      </div>
    </div>
  );
}