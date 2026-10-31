import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Star } from "lucide-react";
import { findCourse } from "@/components/courses/catalog";
import CourseActions from "@/components/courses/CourseActions";
import { buildMetadata } from "@/lib/seo";
import styles from "./detail.module.css";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = findCourse(slug);
  return course ? buildMetadata({ title: course.title, description: course.description, path: `/courses/${slug}`, image: "/images/courses/course-laptop.webp" }) : {};
}

const modules = [
  { title: "Product Discovery & User Research", lessons: ["Understanding customer needs", "Interviews and surveys", "Synthesizing research insights"] },
  { title: "Product Lifecycle & Strategy", lessons: ["The product lifecycle", "Defining a product vision", "Building a product strategy", "Measuring product outcomes"] },
  { title: "Stakeholder Alignment & Roadmap Prioritization", lessons: ["Aligning stakeholders", "Prioritizing your roadmap"] },
  { title: "Applying Your Skills: Product Case Study", lessons: ["Framing the problem", "Developing recommendations", "Presenting your product decisions"] },
];
const objectives = ["Navigate the end-to-end product lifecycle with modern industry frameworks", "Define a clear product vision and align diverse stakeholder groups", "Apply actionable PM frameworks used by product leaders at top tech companies", "Lead roadmap prioritization and execution with confidence", "Run user research and discovery to validate ideas before you build", "Present product decisions clearly in a portfolio-ready case study"];

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = findCourse(slug);
  if (!course) notFound();
  const fundamentals = course.category === "Product Management";
  const courseObjectives = fundamentals ? objectives : [
    `Understand the core principles of ${course.category}`, `Apply ${course.category} concepts to practical product decisions`,
    "Evaluate real-world product challenges", "Develop a structured approach to problem solving", "Communicate recommendations to stakeholders", "Apply your learning in a product case study",
  ];
  const contactHref = { pathname: "/contact", query: { course: course.title } };
  return <div className={styles.page}>
    <Link href="/courses#course-catalog" className={styles.back}><ArrowLeft size={22} aria-hidden="true" />Back to Courses</Link>
    <div className={styles.layout}>
      <article className={styles.content}>
        <h1>{course.title}</h1>
        <div className={styles.cover}><Image src="/images/courses/course-laptop.webp" alt="Laptop displaying product management course material" fill priority sizes="(max-width: 900px) 100vw, 52vw" /></div>
        <p className={styles.rating}><Star size={16} aria-hidden="true" />4.8 · 120 learners <span>· Sample rating</span></p>
        <ul className={styles.badges}><li>{course.level}</li><li>12 lessons</li><li>Shareable certificate</li></ul>
        <section className={styles.section} aria-labelledby="description-title"><h2 id="description-title">Description</h2><p>Access practical Product Management masterclasses and recorded courses designed by ProductPointers to help you build specific skills, deepen your knowledge and learn at your own pace. {fundamentals ? "Build a strong Product Management foundation across four skills every PM needs, each practiced on a real case study." : course.description}</p></section>
        <section className={styles.section} aria-labelledby="objectives-title"><h2 id="objectives-title">Learning Objectives</h2><ul className={styles.objectives}>{courseObjectives.map(objective => <li key={objective}><Check size={20} aria-hidden="true" /><span>{objective}</span></li>)}</ul></section>
        <section className={styles.section} aria-labelledby="syllabus-title"><h2 id="syllabus-title">Syllabus: 4 modules, 12 lessons</h2><div className={styles.modules}>{modules.map((module, index) => <details key={module.title}><summary><span>MODULE {index + 1} · {module.lessons.length} LESSONS</span><h3>{fundamentals ? module.title : [`Introduction to ${course.category}`, "Core Concepts & Practical Frameworks", "Applying Your Skills", "Product Case Study"][index]}</h3></summary><ol>{(fundamentals ? module.lessons : module.lessons.map((_, lesson) => `${["Foundations", "Concepts and frameworks", "Practical application", "Case study"][index]} · Lesson ${lesson + 1}`)).map(lesson => <li key={lesson}>{lesson}</li>)}</ol></details>)}</div><p className={styles.preview}>Catalog preview · Course content and learner statistics are sample data. Contact the team to confirm availability and enrollment details.</p></section>
      </article>
      <aside className={styles.sidebar} aria-label="Course enrollment">
        <div className={styles.actions}><CourseActions title={course.title} /></div>
        <div className={styles.purchase}><p className={styles.price}>₦{course.price.toLocaleString("en-NG")}</p><p className={styles.payment}>One-time payment</p><Link href={contactHref} className={styles.enroll}>Enroll now</Link><p className={styles.policy}>Contact the team to confirm payment options and refund terms.</p><div className={styles.includes}><h2>This course includes</h2><ul><li>{course.duration.toLowerCase()}, self-paced</li><li>12 lessons with case studies</li><li>Certificate, shareable on LinkedIn</li></ul></div></div>
      </aside>
    </div>
  </div>;
}
