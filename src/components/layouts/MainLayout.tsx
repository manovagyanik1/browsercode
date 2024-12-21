import { Link } from 'react-router-dom';
import { Code2, Github, Twitter } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Code2 className="w-8 h-8 text-blue-500" />
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">BrowserCode</span>
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-500 rounded-full">Beta</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link
                to="/code"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Launch Editor
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Code2 className="w-6 h-6 text-blue-500" />
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">BrowserCode</span>
                  <span className="px-1.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-500 rounded-full">Beta</span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm">
                The next generation browser-based code editor for seamless development and collaboration.
              </p>
            </div>
            
            {/* Rest of the footer content remains the same */}
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} BrowserCode. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}