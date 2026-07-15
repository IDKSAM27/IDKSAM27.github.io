import Link from 'next/link';
import FunButton from './FunButton';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import HeaderButton from './HeaderButton';

const Header = ({ homeHref = "/" }) => {
  const homeBase = homeHref.endsWith("/") ? homeHref.slice(0, -1) : homeHref;
  const withHomeBase = (path) => homeBase === "" ? path : `${homeBase}${path}`;

  return (
    <header className="container mx-auto px-4 py-4 lg:px-32 flex justify-between items-center">
      <Link href={homeHref}>
        <Logo />
      </Link>

      {/* Desktop Navigation (hidden on mobile) */}
      <nav className="hidden md:flex items-center space-x-2">
        <HeaderButton href={withHomeBase("/#experience")}>Experience</HeaderButton>
        <HeaderButton href={withHomeBase("/#projects")}>Projects</HeaderButton>
        <HeaderButton href={withHomeBase("/blog")}>Blog</HeaderButton>
        <div className="ml-2"><FunButton /></div>
        <div className="ml-4"><ThemeToggle /></div>
      </nav>

      {/* Mobile Theme Toggle (only visible on mobile) */}
      <div className="md:hidden">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
