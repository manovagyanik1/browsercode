import { Mail, MessageSquare, Send, Clock, MapPin } from 'lucide-react';

export function ContactContent() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">General Inquiries</h3>
              <p className="text-gray-300">
                Questions about our browser-based IDE?
                <br />
                <a href="mailto:hello@browsercode.dev" className="text-blue-400 hover:text-blue-300">
                  hello@browsercode.dev
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MessageSquare className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Technical Support</h3>
              <p className="text-gray-300">
                Need help with the IDE?
                <br />
                <a href="mailto:support@browsercode.dev" className="text-blue-400 hover:text-blue-300">
                  support@browsercode.dev
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Response Time</h3>
              <p className="text-gray-300">
                We typically respond within 24 hours during business days.
                <br />
                Monday - Friday, 9:00 AM - 6:00 PM EST
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Location</h3>
              <p className="text-gray-300">
                We're a distributed team working across multiple time zones to provide 24/7 service reliability.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-6 text-white">Send Us a Message</h3>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}