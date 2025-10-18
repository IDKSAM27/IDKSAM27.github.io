// components/Header.js
import Link from 'next/link';
import FunButton from './FunButton';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import HeaderButton from './HeaderButton';

const Header = () => {
  return (
    <header className="container mx-auto px-3 py-3 flex justify-between items-center">
      <Link href="/">
        <Logo />
      </Link>

      {/* Desktop Navigation (hidden on mobile) */}
      <nav className="hidden md:flex items-center space-x-2">
        <HeaderButton href="/#skills">Skills</HeaderButton>
        <HeaderButton href="/#projects">Projects</HeaderButton>
        <HeaderButton href="/blog">Blog</HeaderButton>
        <div className="ml-2"><FunButton /></div>
        <div className="ml-4"><ThemeToggle /></div>
      </nav>

      {/* THE FIX: Mobile Theme Toggle (only visible on mobile) */}
      <div className="md:hidden">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
