import Link from 'next/link';
import Header from '../Header';
import Footer from '../Footer';
import Seo from '../Seo';
import DizzyAvatar from './DizzyAvatar';

const errorConfig = {
  401: {
    title: "Who Goes There?",
    message: "You're either not logged in, or your access credentials have expired. Identify yourself or return to the landing pad.",
    actionText: "Initiate Login / Home",
    showRefresh: false
  },
  403: {
    title: "Access Denied",
    message: "Nice try, hacker! But you don't have clearance for this level. Turn back before my circuits completely lock up.",
    actionText: "Retreat to Home",
    showRefresh: false
  },
  404: {
    title: "Lost in the Grid",
    message: "My eyes are spinning, and so is our router. The page you're looking for doesn't exist, but you still do. Let's get you back to safe ground.",
    actionText: "Back to Safe Zone",
    showRefresh: false
  },
  500: {
    title: "Core Meltdown",
    message: "Server exploded. Okay, not literally, but something went terribly wrong on our end. My wires are crossed and circuits are fried.",
    actionText: "Return Home",
    showRefresh: true,
    refreshText: "Reboot System"
  },
  502: {
    title: "Bad Gateway",
    message: "The upstream servers are having a standoff and refusing to speak to each other. Meanwhile, I'm just here looking dizzy.",
    actionText: "Go to Main Base",
    showRefresh: true,
    refreshText: "Retry Handshake"
  },
  503: {
    title: "Under Maintenance",
    message: "We're currently tuning the engines. Stand back or you might get splashed with digital oil. We'll be back online in a heartbeat.",
    actionText: "Return Home",
    showRefresh: true,
    refreshText: "Check Engine"
  },
  504: {
    title: "Gateway Timeout",
    message: "The server took too long to respond. It's probably slacking off. Try refreshing or come back when it's done napping.",
    actionText: "Back to Dashboard",
    showRefresh: true,
    refreshText: "Ping Server"
  },
  fallback: {
    title: "Anomaly Detected",
    message: "An unexpected error occurred. Even my avatar is confused. Let's head back to dry land and start over.",
    actionText: "Flee to Safety",
    showRefresh: true,
    refreshText: "Retry Protocol"
  }
};

const ErrorLayout = ({ statusCode }) => {
  const config = errorConfig[statusCode] || errorConfig.fallback;

  return (
    <div className="relative min-h-screen flex flex-col bg-hero-1-light dark:bg-hero-1-dark text-text-light dark:text-text-dark transition-colors duration-300">
      <Seo title={`${statusCode || 'Error'} | Sampreet Patil`} description={config.message} />

      {/* Decorative background overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Radial gradient glow based on theme */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-hero-2-light/30 dark:bg-hero-2-dark/10 blur-[120px] transition-colors" />
      </div>

      <Header />

      <main className="flex-grow flex items-start lg:items-center justify-center pt-2 pb-16 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-center">
          
          {/* Avatar side - shown first on mobile */}
          <div className="lg:col-span-5 flex justify-center order-first lg:order-last">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Backlight effect */}
              <div className="absolute inset-0 bg-accent-light/10 dark:bg-accent-dark/5 blur-2xl lg:blur-3xl rounded-full" />
              <div className="relative transition-transform duration-700">
                <DizzyAvatar />
              </div>
            </div>
          </div>

          {/* Text/Details side */}
          <div className="lg:col-span-7 space-y-4 lg:space-y-8 text-center lg:text-left">
            <div>
              {/* Huge outline text for status code */}
              <h1 className="text-7xl sm:text-9xl font-heading tracking-tighter leading-none text-outline select-none mb-2 lg:mb-4">
                {statusCode || 'ERR'}
              </h1>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading tracking-tight text-text-light dark:text-text-dark">
                {config.title}
              </h2>
            </div>

            <p className="text-base sm:text-xl font-medium leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0">
              {config.message}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2 lg:pt-4">
              <Link
                href="/"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-heading text-lg lg:text-xl rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl"
              >
                <div className="absolute inset-0 bg-accent-light dark:bg-accent-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">{config.actionText}</span>
                <div className="relative z-10 w-6 h-6 rounded-full border border-current flex items-center justify-center group-hover:-translate-x-1 transition-transform duration-300">
                  <span className="text-xs">←</span>
                </div>
              </Link>

              {config.showRefresh && (
                <button
                  onClick={() => window.location.reload()}
                  className="group px-8 py-4 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-heading text-lg lg:text-xl rounded-full transition-transform hover:scale-105 active:scale-95 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 shadow-md"
                >
                  {config.refreshText || 'Refresh'}
                </button>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ErrorLayout;
