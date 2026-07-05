import { useState, useEffect } from 'react';

const COOLDOWN_MINUTES = 5;

const ConnectionRequestModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [cooldownTime, setCooldownTime] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const lastRequest = localStorage.getItem('lastConnectionRequest');
      if (lastRequest) {
        const timePassed = Date.now() - parseInt(lastRequest, 10);
        const cooldownMs = COOLDOWN_MINUTES * 60 * 1000;
        if (timePassed < cooldownMs) {
          setCooldownTime(Math.ceil((cooldownMs - timePassed) / 1000 / 60));
        } else {
          localStorage.removeItem('lastConnectionRequest');
          setCooldownTime(null);
        }
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check for bots
    if (e.target.botcheck && e.target.botcheck.checked) {
      setStatus('success'); // Silently succeed
      return;
    }

    setStatus('loading');

    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY_HERE");
    formData.append("subject", "New Tunnel Connection Request for Homelab");
    formData.append("name", name);
    formData.append("email", email);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        localStorage.setItem('lastConnectionRequest', Date.now().toString());
        setCooldownTime(COOLDOWN_MINUTES);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleCloseModal = () => {
    onClose();
    setTimeout(() => {
      setStatus('idle');
      setName('');
      setEmail('');
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">Request Sent!</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">I'll be notified and will try to get the server back up soon.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">Request Access</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium">
              {cooldownTime
                ? `You've already sent a request recently. Please try again in ${cooldownTime} minutes.`
                : "Enter your details below and I'll be notified that you're trying to connect."}
            </p>

            {status === 'error' && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                Something went wrong sending the request. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field for bot protection */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  disabled={!!cooldownTime || status === 'loading'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:border-accent-light dark:focus:border-accent-dark focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="email"
                  required
                  disabled={!!cooldownTime || status === 'loading'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:border-accent-light dark:focus:border-accent-dark focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>

              {!cooldownTime && (
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-heading text-lg rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-5 h-5 border-2 border-slate-400 border-t-current rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : 'Send Request'}
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectionRequestModal;
