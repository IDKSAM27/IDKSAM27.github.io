const Footer = ({ className = "" }) => {
  return (
    <footer className={`container mx-auto px-4 lg:px-32 py-6 text-center text-sm text-slate-500 dark:text-slate-400 ${className}`}>
      <p>&copy; {new Date().getFullYear()} Sampreet Patil. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
