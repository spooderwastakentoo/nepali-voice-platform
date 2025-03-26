
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    closeMenu();
    navigate('/auth');
  };

  const handleLogout = async () => {
    closeMenu();
    await signOut();
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary" onClick={closeMenu}>
          NepFacto
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:justify-between md:w-full">
          <div className="flex space-x-6">
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/statements" onClick={closeMenu}>Statements</NavLink>
            <NavLink to="/promises" onClick={closeMenu}>Promises</NavLink>
            <NavLink to="/politicians" onClick={closeMenu}>Politicians</NavLink>
            <NavLink to="/submit" onClick={closeMenu}>Submit</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          </div>
          
          <div>
            {user ? (
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                onClick={handleLogin}
              >
                <LogIn size={16} />
                <span>Login</span>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/statements" onClick={closeMenu}>Statements</NavLink>
            <NavLink to="/promises" onClick={closeMenu}>Promises</NavLink>
            <NavLink to="/politicians" onClick={closeMenu}>Politicians</NavLink>
            <NavLink to="/submit" onClick={closeMenu}>Submit</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
            <div className="border-t border-gray-200 pt-2 mt-2">
              {user ? (
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 w-full justify-start px-0"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 w-full justify-start px-0"
                  onClick={handleLogin}
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ to, children, onClick }: NavLinkProps) => {
  return (
    <Link 
      to={to} 
      className="text-gray-700 hover:text-primary font-medium transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
