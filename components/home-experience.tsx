"use client";

import Image from "next/image";
import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { type RefObject, useEffect, useRef } from "react";

const brandMoodboard = "/images/brand/moodboard.png";
const interiorCafe = "/images/brand/interior-cafe.png";
const brandSystem = "/images/brand/brand-system.png";
const workspaceMoment = "/images/brand/workspace-moment.png";
const exteriorCafe = "/images/brand/exterior-cafe.png";
const ritualVideo = "/video/coffee-ritual-preparation.mp4";

const navItems = [
  ["Ritual", "#ritual"],
  ["Collection", "#collection"],
  ["Space", "#space"],
  ["Journal", "#journal"],
];

const rituals = [
  {
    number: "01",
    title: "Grind as signal",
    copy: "Beans are weighed, ground, and opened slowly so the first aroma feels like a threshold.",
  },
  {
    number: "02",
    title: "Water as tempo",
    copy: "The pour stays quiet: circular, deliberate, tuned to sweetness rather than speed.",
  },
  {
    number: "03",
    title: "Light as service",
    copy: "Every cup arrives in warm shadow, with enough space around it to become a pause.",
  },
];

const signatures = [
  {
    name: "Luma Latte",
    tone: "Soft honey, velvet milk, espresso bloom",
    detail: "A quiet signature built for first light and late tables.",
    price: "24 SAR",
    image: "/images/products/luma-latte.png",
  },
  {
    name: "Ember Mocha",
    tone: "Dark chocolate, roasted cocoa, amber cream",
    detail: "Low sweetness, long finish, made for the after-dinner hour.",
    price: "26 SAR",
    image: "/images/products/ember-mocha.png",
  },
  {
    name: "Midnight Cold Brew",
    tone: "Slow steep, cacao edge, black cherry",
    detail: "Clear, dense, and served over a single large cube.",
    price: "23 SAR",
    image: "/images/products/midnight-cold-brew.png",
  },
];

const productItems = [
  {
    name: "Cloud Spanish",
    category: "Iced signature",
    image: "/images/products/cloud-spanish.png",
  },
  {
    name: "Golden Cortado",
    category: "Short coffee",
    image: "/images/products/golden-cortado.png",
  },
  {
    name: "Almond Croissant",
    category: "Bakery",
    image: "/images/products/almond-croissant.png",
  },
  {
    name: "Date Pecan Cake",
    category: "Dessert",
    image: "/images/products/date-pecan-cake.png",
  },
  {
    name: "Pistachio Roll",
    category: "Bakery",
    image: "/images/products/pistachio-roll.png",
  },
  {
    name: "Smoked Turkey Brioche",
    category: "Savory",
    image: "/images/products/smoked-turkey-brioche.png",
  },
  {
    name: "Honey Toast",
    category: "Dessert",
    image: "/images/products/honey-toast.png",
  },
];

const moments = [
  {
    label: "Door Entry",
    title: "Night Arrival",
    copy: "The exterior is not a signboard. It is a warm signal on a dark street.",
    image: exteriorCafe,
  },
  {
    label: "Quiet Work",
    title: "Table Light",
    copy: "A laptop, a cup, a notebook, and the sense that time has widened.",
    image: workspaceMoment,
  },
  {
    label: "Interior Pause",
    title: "Low Room",
    copy: "Shelves glow softly behind the bar while the room keeps its voice low.",
    image: interiorCafe,
  },
  {
    label: "Brand System",
    title: "Marks & Materials",
    copy: "Gold, warm cream, roasted brown, and restraint across every object.",
    image: brandSystem,
  },
];

const journalEntries = [
  {
    kicker: "Field Note",
    title: "The roast curve as a form of listening",
    date: "Private Demo / 01",
  },
  {
    kicker: "Materials",
    title: "Why warm stone changes the pace of a room",
    date: "Private Demo / 02",
  },
  {
    kicker: "Service",
    title: "A menu designed for pauses, not decisions",
    date: "Private Demo / 03",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

export function HomeExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.76, 0.2]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.45,
      smoothWheel: true,
      wheelMultiplier: 0.72,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const animationFrame = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cinema-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".image-drift").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.08, yPercent: -3 },
          {
            scale: 1,
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );
      });

      const match = gsap.matchMedia();
      match.add("(min-width: 768px)", () => {
        gsap.to(".slow-track", {
          xPercent: -42,
          ease: "none",
          scrollTrigger: {
            trigger: ".slow-section",
            start: "top top",
            end: "+=1600",
            scrub: 1.25,
            pin: true,
          },
        });
      });

      return () => match.revert();
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
      <SiteHeader />
      <IntroHero
        heroOpacity={heroOpacity}
        heroScale={heroScale}
        heroY={heroY}
        heroRef={heroRef}
      />
      <CoffeeRitual />
      <SignatureCollection />
      <TheSpace />
      <SlowMoments />
      <Journal />
      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#F2E9D8]/10 bg-[#11100E]/48 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[92rem] items-center justify-between px-5 md:h-20 md:px-8">
        <a
          className="brand-mark text-[#FAF7F2]"
          href="#hero"
          aria-label="LUMA ROAST home"
        >
          LUMA ROAST
        </a>
        <div className="hidden items-center gap-8 text-[0.68rem] uppercase tracking-[0.24em] text-[#B8B3AC] lg:flex">
          {navItems.map(([label, href]) => (
            <a className="nav-link" href={href} key={href}>
              {label}
            </a>
          ))}
        </div>
        <a className="reserve-link" href="#journal">
          Portfolio Demo
        </a>
      </nav>
    </header>
  );
}

function IntroHero({
  heroOpacity,
  heroScale,
  heroY,
  heroRef,
}: {
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
  heroY: MotionValue<string>;
  heroRef: RefObject<HTMLElement | null>;
}) {
  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-10 pt-28 md:px-8 md:pb-14"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <Image
          src={exteriorCafe}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#11100E_0%,rgba(17,16,14,0.7)_34%,rgba(17,16,14,0.18)_68%,rgba(17,16,14,0.84)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#11100E_0%,rgba(17,16,14,0.7)_12%,transparent_42%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[92rem] gap-10 md:grid-cols-[minmax(0,1fr)_22rem] md:items-end">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl"
        >
          <p className="eyebrow">Private portfolio demo / Global specialty coffee</p>
          <h1 className="mt-5 text-balance font-serif text-[clamp(4.6rem,13vw,13.2rem)] leading-[0.78] tracking-normal text-[#FAF7F2]">
            LUMA ROAST
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-2xl leading-9 text-[#F2E9D8]/86 md:text-4xl md:leading-[1.12]">
            A slower way to arrive.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hero-side-note"
        >
          <span>Brand Essence</span>
          <p>
            Not just coffee. A cinematic pause shaped by dark materials, warm
            light, precise service, and a room that lets the morning arrive
            slowly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CoffeeRitual() {
  return (
    <section id="ritual" className="section-shell bg-[#11100E]">
      <SectionIntro
        eyebrow="Coffee Ritual"
        title="The ritual is measured in light, not minutes."
        copy="LUMA ROAST treats coffee as atmosphere: the grind, the pour, the quiet between the first aroma and the first sip."
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {rituals.map((item) => (
            <article className="ritual-card cinema-reveal" key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <div className="cinema-reveal grid gap-5 md:grid-cols-[1fr_0.74fr]">
          <ImagePanel
            image={workspaceMoment}
            alt="A quiet LUMA ROAST workspace table with coffee, laptop, and warm interior light"
            label="Workspace moment"
            className="min-h-[32rem] md:min-h-[42rem]"
          />
          <div className="grid gap-5">
            <VideoFrame
              label="Source Video 01"
              title="Coffee ritual / macro preparation"
              src={ritualVideo}
            />
            <MaterialPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

function SignatureCollection() {
  return (
    <section
      id="collection"
      className="section-shell border-y border-[#F2E9D8]/10 bg-[#F2E9D8] text-[#11100E]"
    >
      <SectionIntro
        eyebrow="Signature Collection"
        title="A restrained menu with a long, warm finish."
        copy="The collection avoids excess. Each drink has a clear architecture: espresso, texture, finish, and a final note that stays."
        light
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {signatures.map((drink, index) => (
          <motion.article
            className="signature-card"
            key={drink.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.75, delay: index * 0.08 }}
            whileHover={{ y: -8 }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div className="signature-image">
              <Image
                src={drink.image}
                alt={`${drink.name} specialty coffee from the LUMA ROAST signature collection`}
                fill
                sizes="(min-width: 1024px) 31vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <h3>{drink.name}</h3>
            <p>{drink.tone}</p>
            <div className="mt-auto border-t border-[#4A3324]/18 pt-5">
              <small>{drink.detail}</small>
              <strong>{drink.price}</strong>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="product-showcase mt-6">
        {productItems.map((item) => (
          <ProductTile item={item} key={item.name} />
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <VideoFrame
          label="Product Film"
          title="Coffee beans moving through light"
          src={ritualVideo}
          light
          wide
        />
        <ImagePanel
          image={brandMoodboard}
          alt="LUMA ROAST brand moodboard with menu, logo, textures, drinks, and applications"
          label="Brand moodboard"
          className="min-h-[24rem]"
          light
        />
      </div>
    </section>
  );
}

function TheSpace() {
  return (
    <section
      id="space"
      className="grid min-h-screen bg-[#11100E] text-[#F2E9D8] lg:grid-cols-[1.08fr_0.92fr]"
    >
      <div className="relative min-h-[62vh] overflow-hidden lg:min-h-screen">
        <div className="image-drift absolute inset-0">
          <Image
            src={interiorCafe}
            alt="A warm cinematic LUMA ROAST cafe interior with low light and a central coffee bar"
            fill
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(17,16,14,0.12)_50%,#11100E_100%)]" />
      </div>
      <div className="flex items-center px-5 py-20 md:px-14 lg:px-20">
        <div className="max-w-2xl">
          <p className="eyebrow">The Space</p>
          <h2 className="cinema-reveal mt-5 text-balance font-serif text-[clamp(3.2rem,7vw,7.6rem)] leading-[0.88]">
            Low light. Warm stone. A room that lowers its voice.
          </h2>
          <p className="cinema-reveal mt-8 max-w-xl text-lg leading-8 text-[#F2E9D8]/74">
            The cafe is composed like a long exposure: illuminated shelves,
            deep walnut, quiet seating, and a bar that becomes the center of
            gravity without asking for attention.
          </p>
          <div className="cinema-reveal mt-10 grid grid-cols-3 gap-3 border-t border-[#F2E9D8]/14 pt-7">
            <Metric value="38" label="Seats" />
            <Metric value="06" label="Origins" />
            <Metric value="04" label="Video scenes" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SlowMoments() {
  return (
    <section className="slow-section relative min-h-screen overflow-hidden bg-[#4A3324] py-20 text-[#FAF7F2] md:py-24">
      <div className="mx-auto max-w-[92rem] px-5 md:px-8">
        <p className="eyebrow text-[#C8A26E]">Slow Moments</p>
        <h2 className="cinema-reveal mt-5 max-w-4xl text-balance font-serif text-[clamp(3.2rem,8vw,8.5rem)] leading-[0.86]">
          The brand lives in the intervals.
        </h2>
      </div>

      <div className="slow-track mt-12 grid gap-5 px-5 md:flex md:w-[210vw] md:px-8">
        {moments.map((moment) => (
          <article className="moment-panel" key={moment.title}>
            <div className="relative min-h-[20rem] overflow-hidden md:min-h-[31rem]">
              <Image
                src={moment.image}
                alt=""
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,16,14,0.82)_0%,transparent_58%)]" />
            </div>
            <div className="moment-copy">
              <span>{moment.label}</span>
              <h3>{moment.title}</h3>
              <p>{moment.copy}</p>
            </div>
          </article>
        ))}
        <article className="moment-panel">
          <VideoFrame
            label="Motion Study"
            title="Grinding, weighing, and first bloom"
            src={ritualVideo}
          />
        </article>
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section id="journal" className="section-shell bg-[#FAF7F2] text-[#11100E]">
      <SectionIntro
        eyebrow="Journal"
        title="Notes for the private portfolio version."
        copy="This first demo frames LUMA ROAST as an editorial system: brand, space, service, and future motion content in one cinematic language."
        light
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <ImagePanel
          image={brandSystem}
          alt="LUMA ROAST brand system with logo, palette, typography, and packaging references"
          label="Brand system"
          className="min-h-[34rem]"
          light
        />
        <div className="divide-y divide-[#4A3324]/18 border-y border-[#4A3324]/18">
          {journalEntries.map((entry, index) => (
            <a className="journal-row" href="#hero" key={entry.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <em>{entry.kicker}</em>
                <strong>{entry.title}</strong>
              </div>
              <small>{entry.date}</small>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#11100E] px-5 py-16 text-[#F2E9D8] md:px-8">
      <div className="mx-auto grid max-w-[92rem] gap-12 border-t border-[#F2E9D8]/12 pt-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow">LUMA ROAST</p>
          <h2 className="mt-4 max-w-4xl font-serif text-[clamp(3.5rem,8vw,8rem)] leading-[0.84] text-[#FAF7F2]">
            A slower way to arrive.
          </h2>
        </div>
        <div className="footer-meta">
          <p>Private portfolio demo</p>
          <p>Specialty Coffee & Slow Mornings</p>
          <p>Riyadh / Global Concept</p>
        </div>
      </div>
    </footer>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  light?: boolean;
}) {
  return (
    <div className="section-intro">
      <p className={`eyebrow ${light ? "text-[#4A3324]" : ""}`}>{eyebrow}</p>
      <div>
        <h2 className="cinema-reveal text-balance font-serif">{title}</h2>
        <p className="cinema-reveal">{copy}</p>
      </div>
    </div>
  );
}

function ImagePanel({
  image,
  alt,
  label,
  className = "",
  light = false,
}: {
  image: string;
  alt: string;
  label: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <figure
      className={`image-panel ${light ? "image-panel-light" : ""} ${className}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover object-center"
      />
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function ProductTile({
  item,
}: {
  item: { name: string; category: string; image: string };
}) {
  return (
    <motion.article
      className="product-tile"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7 }}
    >
      <div className="product-image">
        <Image
          src={item.image}
          alt={`${item.name} product image for LUMA ROAST`}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover object-center"
        />
      </div>
      <div>
        <span>{item.category}</span>
        <strong>{item.name}</strong>
      </div>
    </motion.article>
  );
}

function VideoFrame({
  label,
  title,
  src,
  wide = false,
  light = false,
}: {
  label: string;
  title: string;
  src?: string;
  wide?: boolean;
  light?: boolean;
}) {
  return (
    <div
      className={`video-frame ${wide ? "video-frame-wide" : ""} ${
        light ? "video-frame-light" : ""
      }`}
    >
      {src ? (
        <video
          aria-label={title}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src={src}
        />
      ) : null}
      <span>{label}</span>
      <div aria-hidden="true" className="play-mark" />
      <strong>{title}</strong>
    </div>
  );
}

function MaterialPanel() {
  return (
    <div className="material-panel">
      <span>Material Language</span>
      <div className="swatches" aria-hidden="true">
        {["#11100E", "#4A3324", "#F2E9D8", "#C8A26E", "#B8B3AC", "#FAF7F2"].map(
          (color) => (
            <i style={{ backgroundColor: color }} key={color} />
          ),
        )}
      </div>
      <p>
        Espresso black, roasted brown, warm cream, muted gold, steam gray, and
        milk white carry the entire system.
      </p>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <strong className="block font-serif text-4xl font-normal text-[#FAF7F2]">
        {value}
      </strong>
      <span className="mt-2 block text-[0.68rem] uppercase tracking-[0.18em] text-[#C8A26E]">
        {label}
      </span>
    </div>
  );
}
