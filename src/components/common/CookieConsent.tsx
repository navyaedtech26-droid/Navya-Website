import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import Container from "@/components/common/Container";
import { useConsent } from "@/context/ConsentContext";
import { easeEntrance } from "@/lib/animations";
import { skipEnterAnimation } from "@/lib/hydration";

/**
 * Fixed cookie-consent banner. Visible until the visitor makes a choice;
 * "Accept" unlocks analytics, "Decline" keeps tracking off. The choice is
 * persisted via ConsentContext (localStorage).
 */
export default function CookieConsent() {
  const { consent, accept, decline } = useConsent();
  const [skipEnter] = useState(skipEnterAnimation);

  return (
    <AnimatePresence>
      {consent === null && (
        <motion.div
          initial={skipEnter ? false : { y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: easeEntrance }}
          className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <Container className="max-w-4xl">
            <div className="flex flex-col gap-5 rounded-2xl card-light p-5 shadow-card-hover sm:flex-row sm:items-center sm:gap-6 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30">
                  <Cookie size={18} strokeWidth={1.9} />
                </span>
                <p className="text-sm leading-relaxed text-faint">
                  We use cookies to analyze traffic and improve your experience.
                  See our{" "}
                  <Link
                    to="/privacy-policy"
                    data-cursor="hover"
                    className="font-medium text-primary underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for details.
                </p>
              </div>

              <div className="flex shrink-0 gap-3 sm:ml-auto">
                <button
                  onClick={decline}
                  data-cursor="hover"
                  className="rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-mist"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  data-cursor="hover"
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark"
                >
                  Accept
                </button>
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
