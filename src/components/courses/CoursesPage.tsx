"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown, Search, UserRound, X } from "lucide-react";
import styles from "./courses.module.css";

type Course = { id: number; title: string; category: string; duration: string; level: string; format: string; description: string; price: number; instructor: string };
// Preview catalog; replace with the published course API when available.
const courses: Course[] = [
  { id: 1, title: "Product Management Fundamentals", category: "Product Management", duration: "3 Weeks", level: "Beginner", format: "Recorded course", description: "Build a core foundation in product lifecycle, vision setting, stakeholder alignment, and modern PM frameworks.", price: 75000, instructor: "Alex Rivera" },
  { id: 2, title: "Product Discovery & User Research", category: "Product Discovery", duration: "4 Weeks", level: "Intermediate", format: "Recorded course", description: "Uncover real customer pain points through structured continuous discovery, user interviews, and rapid prototyping.", price: 75000, instructor: "Alex Rivera" },
  { id: 3, title: "Product Analytics & Growth Loop", category: "Metrics & Analytics", duration: "3 Weeks", level: "Intermediate", format: "Recorded course", description: "Learn to track key retention metrics, design impactful A/B experiments, and model high-velocity growth channels.", price: 75000, instructor: "Sarah Jenkins" },
  { id: 4, title: "Technical PM Strategy & APIs", category: "Technical PM", duration: "5 Weeks", level: "Advanced", format: "Recorded course", description: "Master system design basics, database relations, API documentation, and bridge communication with engineering.", price: 85000, instructor: "Marcus Chen" },
  { id: 5, title: "User Experience Design for PMs", category: "UX Design", duration: "3 Weeks", level: "Beginner", format: "Recorded course", description: "Adopt core design systems, wireframe intuitive user journeys, and establish tight feedback loops with design partners.", price: 75000, instructor: "Emma Watson" },
  { id: 6, title: "Product Strategy & Stakeholder Management", category: "Leadership", duration: "4 Weeks", level: "Advanced", format: "Recorded course", description: "Formulate winning product roadmaps, manage complicated executive relationships, and lead highly-productive teams.", price: 95000, instructor: "David Miller" },
  { id: 7, title: "Product Management Fundamentals", category: "Product Management", duration: "3 Weeks", level: "Beginner", format: "Recorded course", description: "Build a core foundation in product lifecycle, vision setting, stakeholder alignment, and modern PM frameworks.", price: 75000, instructor: "Alex Rivera" },
  { id: 8, title: "AI for Product Managers: Building LLM-Powered Products", category: "AI & Strategy", duration: "4 Weeks", level: "Intermediate", format: "Masterclass", description: "Identify AI opportunities, evaluate model feasibility, and prototype generative AI features.", price: 75000, instructor: "Alex Rivera" },
];
const featured: Course = { id: 9, title: "AI for Product Managers: Building LLM-Powered Products", category: "AI & Strategy", duration: "4 Weeks", level: "Intermediate", format: "Masterclass", description: "Master how to identify high-value AI opportunities, evaluate model feasibility, prototype generative AI features, and lead cross-functional machine learning teams confidently.", price: 75000, instructor: "Alex Rivera" };
const filterOptions = [
  { label: "Categories", values: ["Product Management", "Product Discovery", "Metrics & Analytics", "Technical PM", "UX Design", "Leadership", "AI & Strategy"] },
  { label: "Level", values: ["Beginner", "Intermediate", "Advanced"] },
  { label: "Formats", values: ["Recorded course", "Masterclass"] },
  { label: "Durations", values: ["3 Weeks", "4 Weeks", "5 Weeks"] },
  { label: "Prices", values: ["Free", "Paid"] },
  { label: "Sort by", values: ["Price: Low to high", "Price: High to low", "Title: A to Z"] },
];
const resources = [
  { title: "How to Conduct a Product Teardown | Product Management for Beginners", video: "FWWueWdw7es" },
  { title: "Vibe Coding with Bolt: Build & Prototype Apps Fast (PM Masterclass)", video: "NCqpMe2HhWc" },
  { title: "How to Land Remote Jobs on Upwork Using Video Proposals in 2026 | A Step by Step Guide", video: "fuHdmGevE7Y" },
];
const money = (price: number) => `₦${price.toLocaleString("en-NG")}`;

export default function CoursesPage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [tab, setTab] = useState("all");
  const [limit, setLimit] = useState(6);
  const [selected, setSelected] = useState<Course | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const matches = (course: Course) => {
    const text = `${course.title} ${course.category} ${course.description}`.toLowerCase();
    return text.includes(query.toLowerCase().trim()) &&
      (!filters.Categories || course.category === filters.Categories) &&
      (!filters.Level || course.level === filters.Level) &&
      (!filters.Formats || course.format === filters.Formats) &&
      (!filters.Durations || course.duration === filters.Durations) &&
      (!filters.Prices || (filters.Prices === "Free" ? course.price === 0 : course.price > 0));
  };
  const filtered = useMemo(() => {
    const list = courses.filter(course => {
      const text = `${course.title} ${course.category} ${course.description}`.toLowerCase();
      return text.includes(query.toLowerCase().trim()) && (!filters.Categories || course.category === filters.Categories) && (!filters.Level || course.level === filters.Level) && (!filters.Formats || course.format === filters.Formats) && (!filters.Durations || course.duration === filters.Durations) && (!filters.Prices || (filters.Prices === "Free" ? course.price === 0 : course.price > 0));
    });
    if (filters["Sort by"] === "Price: Low to high") list.sort((a, b) => a.price - b.price);
    if (filters["Sort by"] === "Price: High to low") list.sort((a, b) => b.price - a.price);
    if (filters["Sort by"] === "Title: A to Z") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [query, filters]);
  function openCourse(course: Course) { setSelected(course); dialog.current?.showModal(); }
  function reset() { setFilters({}); setQuery(""); setInput(""); setLimit(6); }

  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image src="/images/courses/hr.png" alt="" fill priority sizes="100vw" className={styles.heroImage} />
      <div className={styles.heroContent}>
        <span className={styles.eyebrow}>PRODUCTPOINTERS COURSES</span>
        <h1>Learn Product Management. On Your Own Terms.</h1>
        <p>Access practical Product Management masterclasses and recorded courses designed by ProductPointers to help you build specific skills, deepen your knowledge and learn at your own pace.</p>
        <form className={styles.search} onSubmit={event => { event.preventDefault(); setQuery(input); setLimit(6); document.getElementById("course-catalog")?.scrollIntoView({ behavior: "smooth" }); }} role="search">
          <Search size={22} aria-hidden="true" />
          <input aria-label="Search courses" value={input} onChange={event => setInput(event.target.value)} placeholder="Search courses by topic, skill or title (e.g. Analytics, strategy, AI)" />
          <button type="submit">Search</button>
        </form>
      </div>
    </section>

    <section id="course-catalog" className={styles.catalog} aria-label="Course catalog">
      <div className={styles.toolbar}>
        <div className={styles.filters}>{filterOptions.map(({ label, values }) => <div className={styles.selectWrap} key={label}>
          <select aria-label={label} value={filters[label] || ""} onChange={event => { setFilters(previous => ({ ...previous, [label]: event.target.value })); setLimit(6); }}>
            <option value="">{label}</option>{values.map(value => <option key={value}>{value}</option>)}
          </select><ChevronDown size={19} aria-hidden="true" />
        </div>)}</div>
        <div className={styles.tabs} aria-label="Course view">{["all", "mine"].map(value => <button key={value} aria-pressed={tab === value} className={tab === value ? styles.activeTab : ""} onClick={() => setTab(value)}>{value === "all" ? "All Courses" : "My Courses"}</button>)}</div>
      </div>
      <details className={styles.mobileFilters}>
        <summary>Filter courses <ChevronDown size={16} aria-hidden="true" /></summary>
        <div>{filterOptions.map(({ label, values }) => <label key={label}>{label}<select value={filters[label] || ""} onChange={event => { setFilters(previous => ({ ...previous, [label]: event.target.value })); setLimit(6); }}><option value="">All</option>{values.map(value => <option key={value}>{value}</option>)}</select></label>)}</div>
      </details>
      {(query || Object.values(filters).some(Boolean)) && <div className={styles.filterSummary}><span>Results{query ? ` for “${query}”` : " with selected filters"}</span><button onClick={reset}>Clear filters <X size={14} /></button></div>}
      {tab === "mine" ? <div className={styles.empty}><BookOpen size={36} /><h2>Your learning journey starts here</h2><p>Sign in to access your enrolled courses and continue learning.</p><Link href="/login" className={styles.primary}>Sign In <ArrowRight size={18} /></Link></div> : <>
        {matches(featured) && <article className={styles.featured}>
          <div className={styles.featuredImage}><Image src="/images/courses/course-laptop.webp" alt="Laptop displaying AI product management learning material" fill sizes="(max-width: 760px) 90vw, 40vw" /><span>Featured Course</span></div>
          <div className={styles.featuredBody}><p className={styles.featuredMeta}><strong>AI &amp; Strategy</strong> · Intermediate · 4 Weeks</p><h2>{featured.title}</h2><p className={styles.featuredDescription}>{featured.description}</p><div className={styles.featuredInstructor}><span><UserRound size={17} /> Instructor: Alex Rivera</span><span><BookOpen size={17} /> Includes: Case Studies &amp; Templates</span></div><div className={styles.featuredFooter}><strong>{money(featured.price)}</strong><button onClick={() => openCourse(featured)}>View Course <ArrowRight size={22} /></button></div></div>
        </article>}
        <div className={styles.sectionHeading}><h2>Explore our Courses</h2><p>Practical Product Management learning designed to help<br className={styles.desktopBreak} /> you build specific skills and apply what you learn.</p></div>
        <div className={styles.grid}>{filtered.slice(0, limit).map(course => <article key={course.id} className={styles.card}>
          <div className={styles.cardImage}><Image src="/images/courses/course-laptop.webp" alt="Product Management course on a laptop" fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw" /><span>Popular</span></div>
          <div className={styles.cardBody}><div className={styles.cardMeta}><span>{course.category}</span><span>{course.duration}</span></div><h3>{course.title}</h3><p>{course.description}</p><div className={styles.cardInstructor}><span><UserRound size={16} /> Instructor: {course.instructor}</span><strong>{course.level}</strong></div><div className={styles.cardFooter}><div><span>Price</span><strong>{money(course.price)}</strong></div><button onClick={() => openCourse(course)} aria-label={`View ${course.title}`}>View Course <ArrowRight size={22} /></button></div></div>
        </article>)}</div>
        {filtered.length === 0 ? <div className={styles.empty}><Search size={32} /><h3>No courses found</h3><p>Try another search or clear your filters to explore the catalog.</p><button className={styles.primary} onClick={reset}>Clear filters</button></div> : <div className={styles.loadMore} aria-live="polite"><p>Showing {Math.min(limit, filtered.length)} of {filtered.length} courses</p>{limit < filtered.length && <button onClick={() => setLimit(previous => previous + 6)}>Load more Courses <ChevronDown size={20} /></button>}</div>}
      </>}
    </section>

    <section className={styles.resources}><span className={styles.resourceEyebrow}>RESOURCES</span><h2>Get Access to Free Product Resources</h2><div className={styles.resourceGrid}>{resources.map((resource, index) => <a key={resource.video} href={`https://www.youtube.com/watch?v=${resource.video}`} target="_blank" rel="noopener noreferrer" className={styles.resourceCard}><div className={styles.resourceImage}><Image src={`/images/courses/resource-${index + 1}.webp`} alt={resource.title} fill sizes="(max-width: 600px) 90vw, 30vw" /></div><h3>{resource.title}</h3></a>)}</div><div className={styles.channel}><a href="https://www.youtube.com/@The-GlobalPM" target="_blank" rel="noopener noreferrer" className={styles.primary}>View Channel <ArrowRight size={18} /></a></div></section>
    <section className={styles.programBanner}><div className={styles.ringOne} /><div className={styles.ringTwo} /><div className={styles.ringThree} /><div><span className={styles.bannerEyebrow}>NOT SURE WHERE TO START?</span><h2>Looking for a More Structured Learning Path?</h2><p>Courses can help you build specific skills. If you’re looking for a structured Product Management journey with guided learning, practical experience and mentorship, explore our programs.</p></div><Link href="/#upcoming-programs">Explore Programs <ArrowRight size={22} /></Link></section>

    <dialog ref={dialog} className={styles.dialog} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-labelledby="course-dialog-title">
      {selected && <><button className={styles.closeDialog} onClick={() => dialog.current?.close()} aria-label="Close course details"><X /></button><span className={styles.resourceEyebrow}>{selected.category}</span><h2 id="course-dialog-title">{selected.title}</h2><p>{selected.description}</p><div className={styles.dialogMeta}><span>{selected.level} · {selected.duration} · {selected.format}</span><span>Instructor: {selected.instructor}</span><strong>{money(selected.price)}</strong></div><p className={styles.previewNote}>This course is a catalog preview. Contact our team for availability and enrollment details.</p><Link href="/contact" className={styles.primary} onClick={() => dialog.current?.close()}>Enquire about this course <ArrowRight size={18} /></Link></>}
    </dialog>
  </div>;
}
