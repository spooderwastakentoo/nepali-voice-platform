
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-primary">
              NepFacto
            </Link>
            <p className="text-sm text-gray-600 mt-2">
              Empowering Nepali citizens with political transparency.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
            <FooterLink to="/statements">Statements</FooterLink>
            <FooterLink to="/promises">Promises</FooterLink>
            <FooterLink to="/politicians">Politicians</FooterLink>
            <FooterLink to="/submit">Submit</FooterLink>
            <FooterLink to="/about">About</FooterLink>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
          &copy; {currentYear} NepFacto. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink = ({ to, children }: FooterLinkProps) => {
  return (
    <Link 
      to={to} 
      className="text-gray-600 hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
};

export default Footer;
