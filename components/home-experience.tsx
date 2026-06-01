"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

const ritualSteps = [
  {
    count: "01",
    title: "Weigh",
    text: "Every roast begins with measured intention: origin, density, humidity, and the quiet discipline of repeatable craft.",
  },
  {
    count: "02",
    title: "Bloom",
    text: "A patient first pour unlocks aromatics before the cup opens into honeyed fruit, cacao, and roasted warmth.",
  },
  {
    count: "03",
    title: "Arrive",
    text: "The final sip is never hurried. It is a small room of attention, held in porcelain and light.",
  },
];

const signatures = [
  {
    name: "Nocturne",
    origin: "Guatemala / Washed",
    profile: "Dark cherry, brown sugar, soft cocoa",
    roast: "Velvet medium",
  },
  {
    name: "Dawn Ledger",
    origin: "Ethiopia / Natural",
    profile: "Apricot, bergamot, vanilla cream",
    roast: "Luminous light",
  },
  {
    name: "Stillwater",
    origin: "Colombia / Honey",
    profile: "Golden raisin, almond, cane syrup",
    roast: "Balanced medium",
  },
];

const journal = [
  "How water temperature reshapes sweetness",
  "A field note from our ceramicist",
  "The roast curve as a form of listening",
];

const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function HomeExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.28]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    gsap.registerPlugin(ScrollTrigger);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const animationFrame = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-line").forEach((line) => {
        gsap.fromTo(
          line,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: line,
              start: "top 86%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".ritual-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
            },
          },
        );
      });

      gsap.to(".slow-track", {
        xPercent: -38,
        ease: "none",
        scrollTrigger: {
          trigger: ".slow-section",
          start: "top top",
          end: "+=1200",
          scrub: 1,
          pin: true,
        },
      });
    }, rootRef);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className="min-h-screen overflow-hidden bg-[#11100E] text-[#F2E9D8]"
    >
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#F2E9D8]/10 bg-[#11100E]/45 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a className="brand-mark" href="#hero" aria-label="LUMA ROAST home">
            LUMA ROAST
          </a>
          <div className="hidden items-center gap-7 text-xs uppercase tracking-[0.24em] text-[#B8B3AC] md:flex">
            <a href="#ritual">Ritual</a>
            <a href="#collection">Coffee</a>
            <a href="#space">Space</a>
            <a href="#visit">Visit</a>
          </div>
          <a className="reserve-link" href="#visit">
            Reserve
          </a>
        </nav>
      </header>

      <section
        id="hero"
        ref={heroRef}
        className="relative flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <Image
            src="/images/luma-roast-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#11100E_0%,rgba(17,16,14,0.78)_31%,rgba(17,16,14,0.24)_64%,rgba(17,16,14,0.82)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(200,162,110,0.24),transparent_30%),linear-gradient(0deg,#11100E_0%,transparent_34%)]" />
        </motion.div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[minmax(0,0.98fr)_minmax(280px,0.52fr)] md:items-end">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">Specialty coffee / Riyadh</p>
            <h1 className="mt-5 max-w-5xl text-balance font-serif text-[clamp(4.6rem,11vw,10rem)] leading-[0.82] text-[#FAF7F2]">
              LUMA ROAST
            </h1>
            <p className="mt-7 max-w-xl text-xl leading-8 text-[#F2E9D8]/82 md:text-2xl">
              A slower way to arrive.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.85 }}
            className="hero-note"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A26E]">
              Tonight&apos;s pour
            </span>
            <strong>Nocturne</strong>
            <p>Dark cherry, brown sugar, soft cocoa. Brewed as a slow V60.</p>
          </motion.aside>
        </div>
      </section>

      <section id="ritual" className="section-shell bg-[#FAF7F2] text-[#11100E]">
        <div className="section-heading">
          <p className="eyebrow text-[#4A3324]">Coffee Ritual</p>
          <div className="overflow-hidden">
            <h2 className="reveal-line">The cup begins before the cup.</h2>
          </div>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {ritualSteps.map((step) => (
            <article className="ritual-card" key={step.count}>
              <span>{step.count}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="collection"
        className="section-shell border-y border-[#F2E9D8]/10 bg-[#11100E]"
      >
        <div className="section-heading">
          <p className="eyebrow">Signature Collection</p>
          <div className="overflow-hidden">
            <h2 className="reveal-line">Roasts with a long finish.</h2>
          </div>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {signatures.map((coffee) => (
            <motion.article
              key={coffee.name}
              className="coffee-card"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="bean-orbit" aria-hidden="true">
                <span />
              </div>
              <p>{coffee.origin}</p>
              <h3>{coffee.name}</h3>
              <dl>
                <div>
                  <dt>Profile</dt>
                  <dd>{coffee.profile}</dd>
                </div>
                <div>
                  <dt>Roast</dt>
                  <dd>{coffee.roast}</dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="space" className="grid min-h-screen bg-[#F2E9D8] text-[#11100E] lg:grid-cols-2">
        <div className="relative min-h-[58vh] overflow-hidden lg:min-h-screen">
          <Image
            src="/images/luma-roast-hero.png"
            alt="A cinematic LUMA ROAST coffee setting with a cup and roasted beans"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[64%_50%]"
          />
        </div>
        <div className="flex items-center px-5 py-20 md:px-14 lg:px-20">
          <div className="max-w-xl">
            <p className="eyebrow text-[#4A3324]">The Space</p>
            <h2 className="mt-5 font-serif text-[clamp(3rem,6vw,6.7rem)] leading-[0.9]">
              Low light. Warm stone. Nothing rushed.
            </h2>
            <p className="mt-8 text-lg leading-8 text-[#4A3324]">
              LUMA ROAST is designed as a pause between places: a room of
              quiet materials, hand-thrown ceramics, and coffee served with the
              calm of a well-kept ritual.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-[#4A3324]/20 pt-6">
              <Metric value="38" label="Seats" />
              <Metric value="06" label="Origins" />
              <Metric value="12" label="Slow pours" />
            </div>
          </div>
        </div>
      </section>

      <section className="slow-section relative min-h-screen overflow-hidden bg-[#4A3324] py-24 text-[#FAF7F2]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow text-[#C8A26E]">Slow Moments</p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(3.2rem,7vw,7.5rem)] leading-[0.9]">
            Stay with the small things.
          </h2>
        </div>
        <div className="slow-track mt-14 flex w-[190vw] gap-5 pl-5 md:pl-8">
          {["Steam", "Grind", "Pour", "Silence", "Finish"].map((moment, index) => (
            <article className="moment-panel" key={moment}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{moment}</h3>
              <p>
                {moment === "Silence"
                  ? "A held breath before the first sip."
                  : "A tactile interval where flavor gathers its shape."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell bg-[#FAF7F2] text-[#11100E]">
        <div className="section-heading">
          <p className="eyebrow text-[#4A3324]">Journal</p>
          <div className="overflow-hidden">
            <h2 className="reveal-line">Notes from the roast room.</h2>
          </div>
        </div>
        <div className="mt-10 divide-y divide-[#4A3324]/18 border-y border-[#4A3324]/18">
          {journal.map((entry, index) => (
            <a className="journal-row" href="#visit" key={entry}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{entry}</strong>
              <em>Read</em>
            </a>
          ))}
        </div>
      </section>

      <section
        id="visit"
        className="section-shell bg-[#11100E] text-[#F2E9D8]"
      >
        <div className="visit-grid">
          <div>
            <p className="eyebrow">Visit</p>
            <h2 className="mt-5 font-serif text-[clamp(3.4rem,7vw,7.8rem)] leading-[0.88]">
              Come by when the day asks to slow down.
            </h2>
          </div>
          <div className="visit-panel">
            <p>King Fahd Road, Riyadh</p>
            <p>Sun to Thu / 7:00 - 23:00</p>
            <p>Fri to Sat / 8:00 - 00:00</p>
            <a href="mailto:hello@lumaroast.example">hello@lumaroast.example</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#F2E9D8]/10 bg-[#11100E] px-5 py-10 text-[#B8B3AC] md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="brand-mark text-[#FAF7F2]">LUMA ROAST</p>
            <p className="mt-2 text-sm">A slower way to arrive.</p>
          </div>
          <p className="text-xs uppercase tracking-[0.22em]">
            Roast / Pour / Stay
          </p>
        </div>
      </footer>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <strong className="block font-serif text-4xl text-[#11100E]">{value}</strong>
      <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-[#4A3324]">
        {label}
      </span>
    </div>
  );
}
