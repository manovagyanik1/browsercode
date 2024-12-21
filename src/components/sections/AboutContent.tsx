import { Code2, Heart, Users, Shield, Zap, Globe2 } from 'lucide-react';

export function AboutContent() {
  return (
    <div className="prose prose-invert max-w-none">
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Code2 className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-semibold m-0">Our Vision</h2>
        </div>
        <p className="text-gray-300">
          BrowserCode represents the future of web development - a powerful, secure, and accessible IDE that runs entirely in your browser. 
          We're revolutionizing the way developers write, test, and deploy code by eliminating the need for complex local setups and 
          providing a seamless, browser-based development experience.
        </p>
      </div>

      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Browser-First Philosophy</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            Our browser-based approach offers unique advantages:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Enhanced security through browser sandboxing</li>
            <li>No installation or setup required</li>
            <li>Cross-platform compatibility</li>
            <li>Instant access to development tools</li>
            <li>Real-time collaboration capabilities</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Technology Stack</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            Built with cutting-edge web technologies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>WebAssembly for near-native performance</li>
            <li>WebContainers for isolated development environments</li>
            <li>Service Workers for offline capabilities</li>
            <li>Modern web APIs for seamless integration</li>
            <li>React and TypeScript for reliability</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Globe2 className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Global Impact</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            We're making development accessible worldwide:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Breaking down hardware barriers</li>
            <li>Enabling coding from any device</li>
            <li>Supporting remote collaboration</li>
            <li>Reducing environmental impact</li>
            <li>Democratizing development tools</li>
          </ul>
        </div>
      </section>

      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-gray-300">
          Join us in shaping the future of web development. BrowserCode is more than just an IDE - it's a movement towards 
          more accessible, secure, and efficient software development.
        </p>
      </div>
    </div>
  );
}