import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CodeEditor from './pages/CodeEditor';
import Landing from './pages/Landing';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import { FileSystemProvider } from './context/FileSystemContext';
import { PreviewProvider } from './context/PreviewContext';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/code" element={
          <FileSystemProvider>
            <PreviewProvider>
              <CodeEditor />
            </PreviewProvider>
          </FileSystemProvider>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}