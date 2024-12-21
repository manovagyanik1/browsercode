import { MainLayout } from '../components/layouts/MainLayout';
import { Code2, Heart, Users, Shield } from 'lucide-react';

export default function About() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">About Us</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-8">
              We're building the future of collaborative coding environments, making it easier for developers to write, share, and execute code directly in the browser.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-lg">
                <Code2 className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p className="text-gray-300">
                  To democratize coding by providing powerful development tools that are accessible to everyone, everywhere.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <Heart className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Our Values</h3>
                <p className="text-gray-300">
                  We believe in open collaboration, continuous innovation, and making development tools that developers love to use.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Why Choose Our Code Editor?</h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Built for Collaboration</h3>
                  <p className="text-gray-300">
                    Our platform is designed from the ground up to support real-time collaboration, making it perfect for pair programming and technical interviews.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Security First</h3>
                  <p className="text-gray-300">
                    We prioritize the security of your code and data, implementing industry-standard security measures to protect your work.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Our Technology</h2>
            <p className="text-gray-300 mb-8">
              Built with cutting-edge web technologies including React, TypeScript, and WebAssembly, our editor provides a native-like development experience right in your browser.
            </p>

            <div className="bg-gray-800 p-6 rounded-lg mb-12">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Real-time code execution</li>
                <li>Integrated terminal</li>
                <li>Hot reload support</li>
                <li>Multi-language support</li>
                <li>Collaborative editing</li>
                <li>Version control integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}