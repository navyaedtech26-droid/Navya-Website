import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Facebook, Link2, Linkedin, Twitter } from "lucide-react";

interface ArticleAsideProps {
  /** Absolute, canonical URL of the article (for share targets). */
  url: string;
  title: string;
  tags: string[];
}

/**
 * Sticky right-hand rail for the article reading view. Holds share links, the
 * post's topics, and a conversion CTA so the editorial two-column layout fills
 * the width on wide screens instead of leaving a large empty band. On mobile it
 * simply stacks underneath the article body.
 */
export default function ArticleAside({ url, title, tags }: ArticleAsideProps) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const shares = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
      icon: Twitter,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      icon: Linkedin,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      icon: Facebook,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure context / permissions) — fail quietly.
    }
  };

  const iconBtn =
    "flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-faint ring-1 ring-line transition-colors hover:text-heading hover:ring-primary/30";

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="space-y-8">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Share
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {shares.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                data-cursor="hover"
                className={iconBtn}
              >
                <s.icon size={18} />
              </a>
            ))}
            <button
              type="button"
              onClick={copyLink}
              aria-label={copied ? "Link copied" : "Copy link"}
              data-cursor="hover"
              className={iconBtn}
            >
              {copied ? (
                <Check size={18} className="text-primary" />
              ) : (
                <Link2 size={18} />
              )}
            </button>
          </div>
        </div>

        {tags.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">
              Topics
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  data-cursor="hover"
                  className="rounded-full bg-mist px-3 py-1 text-xs text-faint ring-1 ring-line transition-colors hover:text-primary"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="card-light rounded-2xl p-5">
          <p className="font-display text-base font-semibold text-heading">
            Have a project in mind?
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-faint">
            Let's build something fast, modern, and made to grow your business.
          </p>
          <Link
            to="/contact"
            data-cursor="hover"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark"
          >
            Let's talk
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
