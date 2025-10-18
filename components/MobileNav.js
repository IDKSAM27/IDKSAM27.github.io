import Link from 'next/link';
import { FiGrid, FiCode, FiEdit3, FiSmile } from 'react-icons/fi';
import ScrollLink from './ScrollLink'; // Import our new component

const navItems = [
  { href: '#skills', icon: FiCode, label: 'Skills' },
  { href: '#projects', icon: FiGrid, label: 'Projects' },
  { href: '/blog', icon: FiEdit3, label: 'Blog' },
];

const MobileNavLink = ({ href, icon: Icon, label }) => {
  const isInternalLink = href.startsWith('#');

  const linkContent = (
    <>
      <Icon size={20} />
      <span className="mt-1 text-[10px] font-heading uppercase tracking-wider">
        {label}
      </span>
    </>
  );

  const className = "flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 hover:text-accent-light dark:hover:text-accent-dark transition-colors";

  return isInternalLink ? (
    <ScrollLink href={href} className={className}>
      {linkContent}
    </ScrollLink>
  ) : (
    <Link href={href} className={className}>
      {linkContent}
    </Link>
  );
};

const MobileNav = ({ project }) => { // Make sure you receive the project prop if needed, otherwise remove it
    // ... (rest of the component logic remains the same, mapping over navItems)
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-hero-1-light dark:bg-hero-1-dark border-t-2 border-black dark:border-white z-40">
            <div className="container mx-auto h-full">
                <div className="grid grid-cols-4 h-full">
                    {navItems.map((item) => (
                        <MobileNavLink key={item.label} {...item} />
                    ))}
                    <Link
                        href="https://fun.sampreetpatil.com"
                        className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                    >
                        <FiSmile size={20} />
                        <span className="mt-1 text-[10px] font-fun uppercase tracking-wider text-accent-light dark:text-accent-dark">
                            Fun Side
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default MobileNav;
