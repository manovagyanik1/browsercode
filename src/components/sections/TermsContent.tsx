import { FileText, AlertCircle, Check, HelpCircle } from 'lucide-react';

export function TermsContent() {
  return (
    <div className="prose prose-invert max-w-none">
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold m-0">Browser-Based Service Agreement</h2>
        </div>
        <p className="text-gray-300">
          By using BrowserCode, you agree to these terms which are specifically designed for our browser-based development environment. 
          Our service operates entirely within your browser, providing enhanced security and privacy compared to traditional cloud-based IDEs.
        </p>
      </div>

      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Check className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Service Usage</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">You agree to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Use the service for legal purposes only</li>
            <li>Not attempt to circumvent browser security measures</li>
            <li>Not distribute malicious code through our platform</li>
            <li>Respect intellectual property rights</li>
            <li>Not attempt to extract or modify our source code</li>
            <li>Not interfere with other users' browser sessions</li>
            <li>Take responsibility for your code and data</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Limitations</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            Given our browser-based nature:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>We cannot guarantee data persistence beyond your browser session</li>
            <li>Performance is dependent on your browser and device capabilities</li>
            <li>Some features may be limited by browser security policies</li>
            <li>We are not responsible for browser-specific issues</li>
            <li>Service availability depends on your internet connection</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Data & Privacy</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            Our browser-based approach means:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Your code remains in your browser</li>
            <li>No server-side storage of your projects</li>
            <li>You maintain full control over your data</li>
            <li>No tracking or analytics beyond basic functionality</li>
            <li>Your privacy is protected by browser security measures</li>
          </ul>
        </div>
      </section>

      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-sm text-gray-400">Last updated: March 1, 2024</p>
      </div>
    </div>
  );
}