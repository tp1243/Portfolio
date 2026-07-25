import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { quickLinks, socialLinks, contactShort } from "../data/footerLinks";

gsap.registerPlugin(ScrollTrigger);

function FooterNavItem(props) {
  const link = props.link;

  function onClick(event) {
    event.preventDefault();
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <li>
      <a
        href={link.href}
        onClick={onClick}
        className="group inline-flex items-center gap-1.5 text-sm text-slate-300 transition-all duration-300 hover:text-cyan-200"
      >
        <span className="h-px w-0 bg-cyan-300 transition-all duration-300 group-hover:w-3"></span>
        <span>{link.name}</span>
      </a>
    </li>
  );
}

function SocialIcon(props) {
  const social = props.social;
  const Icon = social.icon;
  const isMail = social.url.indexOf("mailto:") === 0;
  const targetValue = isMail ? undefined : "_blank";
  const relValue = isMail ? undefined : "noopener noreferrer";

  return (
    <a
      href={social.url}
      target={targetValue}
      rel={relValue}
      aria-label={social.name}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/5 text-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-cyan-300/50"
    >
      <Icon size={18} />
    </a>
  );
}

export function Footer() {
  const footerRef = useRef(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (!footerRef.current) {
      return undefined;
    }

    const ctx = gsap.context(function () {
      const columns = footerRef.current.querySelectorAll("[data-footer-col]");
      const bottomBar = footerRef.current.querySelector("[data-footer-bottom]");

      gsap.fromTo(
        columns,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 88%",
          },
        }
      );

      gsap.fromTo(
        bottomBar,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );
    }, footerRef);

    return function () {
      ctx.revert();
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const mailHref = "mailto:" + contactShort.email;
  const telHref = "tel:" + contactShort.phone.replace(/\s+/g, "");

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/10 bg-slate-950/80 px-4 pt-16 pb-8 sm:px-6 lg:px-10"
    >
      <div className="pointer-events-none absolute left-[6%] top-10 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl"></div>
      <div className="pointer-events-none absolute right-[8%] bottom-10 h-44 w-44 rounded-full bg-emerald-300/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">

          <div data-footer-col className="text-center sm:text-left">
            <h3 className="font-display text-2xl text-white">Tushar Patil</h3>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400/20 sm:mx-0"></div>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-slate-400 sm:mx-0">
              Full Stack Developer building scalable, reliable web applications with
              clean, responsive user experiences.
            </p>
          </div>

          <div data-footer-col className="text-center sm:text-left">
            <h4 className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map(function (link) {
                return <FooterNavItem key={link.name} link={link} />;
              })}
            </ul>
          </div>

          <div data-footer-col className="text-center sm:text-left">
            <h4 className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Connect
            </h4>

            <div className="mt-4 flex justify-center gap-3 sm:justify-start">
              {socialLinks.map(function (social) {
                return <SocialIcon key={social.name} social={social} />;
              })}
            </div>

            <div className="mt-5 space-y-1.5 text-sm">
              <a
                href={mailHref}
                className="block text-slate-400 transition-colors duration-300 hover:text-cyan-200"
              >
                {contactShort.email}
              </a>
              <a
                href={telHref}
                className="block text-slate-400 transition-colors duration-300 hover:text-cyan-200"
              >
                {contactShort.phone}
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent"></div>

        <div
          data-footer-bottom
          className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        >
          <p className="text-xs text-slate-500 sm:text-sm">
            © {year} Tushar Patil. All rights reserved.
          </p>

          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 transition-all duration-300 hover:border-cyan-300/40 hover:text-cyan-200"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/5">
              <FiArrowUp size={12} />
            </span>
            <span>Back to top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}