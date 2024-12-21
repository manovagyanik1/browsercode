import { Link } from 'react-router-dom';
import { Code2, Play, Zap, Users, Globe2, Terminal, Box } from 'lucide-react';
import { MainLayout } from '../components/layouts/MainLayout';

export default function Landing() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Code2 className="w-16 h-16 text-blue-500" />
              <span className="px-3 py-1 text-sm font-medium bg-blue-500/10 text-blue-500 rounded-full">Beta</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400">
              Code Directly in Your Browser
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10">
              A powerful, browser-based IDE designed for modern development. Write, run, and deploy code without leaving your browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/code"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors"
              >
                Try BrowserCode Now
              </Link>
              <a
                href="#features"
                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold text-lg transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Built for Modern Development
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Terminal className="w-8 h-8 text-blue-500" />}
              title="Browser-Native"
              description="Run your development environment entirely in the browser. No downloads, no setup, just code."
            />
            <FeatureCard
              icon={<Box className="w-8 h-8 text-blue-500" />}
              title="WebContainer Powered"
              description="Full Node.js environment running in your browser with filesystem, terminal, and npm support."
            />
            <FeatureCard
              icon={<Play className="w-8 h-8 text-blue-500" />}
              title="Hot Reload"
              description="See your changes instantly with our lightning-fast hot reload capability."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-blue-500" />}
              title="Interview Ready"
              description="Perfect for technical interviews with real-time code sharing and collaboration features."
            />
            <FeatureCard
              icon={<Globe2 className="w-8 h-8 text-blue-500" />}
              title="Cross-Platform"
              description="Work from any browser, on any device. Your development environment follows you everywhere."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-blue-500" />}
              title="Instant Setup"
              description="Zero configuration required. Start coding immediately with our pre-configured environment."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Start Coding?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join developers who are already using BrowserCode for interviews, learning, and development.
          </p>
          <Link
            to="/code"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors"
          >
            Launch Editor
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}