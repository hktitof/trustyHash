export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div>
            <p>&copy; 2023 TrustyHash. All rights reserved.</p>
          </div>
          <div className="space-x-4">
            <a href="#" className="hover:text-gray-400">
              About
            </a>
            <a href="#" className="hover:text-gray-400">
              Contact
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    );
  }