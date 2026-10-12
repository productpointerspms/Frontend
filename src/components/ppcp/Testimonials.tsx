import React from 'react';
import Image from "next/image";
import styles from "./coaching.module.css";

import idreesImg from "@/assets/images/idrees.jpg";
import oghenemineImg from "@/assets/images/oghenemine.png";

const Testimonials = () => {
  const reviews = [
    {
      name: "Idrees Adekanbi",
      role: "Product Manager",
      image: idreesImg.src,
      text: "Despite having extensive experience working with physical products and services, I found myself at a crossroads when trying to transition into digital products. I lacked clear direction and a structured path forward.\n\n That changed when I had the opportunity to participate in the Product Management Mentorship Program at ProductPointers, an experience that proved to be both transformative and impactful.The program was exceptionally well-structured, practical, and insightful. It delivered a comprehensive, end-to-end understanding of the product lifecycle, from ideation to prototyping, development, launch, continuous improvement etc. Each session was grounded in real-world application, making the learning both relevant and immediately actionable.\n\n‎A key highlight was the depth of knowledge shared by Coach Blessing and the facilitators, combined with a strong hands-on approach. The mentorship not only strengthened my technical and strategic thinking but also enhanced my ability to make informed product decisions with confidence.\n\n ‎I highly recommend ProductPointers to anyone looking to build or advance their career in product management. It’s a transformative experience that truly adds value.",
    },
    {
      name: "Oghenemine N. Nosakhare",
      role: "Product Manager",
      image: oghenemineImg.src,
      text: "Before I joined, I was honestly scared to start this journey as a new mom. It felt like I had learned so much, yet I still doubted myself, classic imposter syndrome. I really wanted an internship to apply what I’d learned, but instead, I found myself craving clarity, encouragement, and mentorship.\n\n Then I came across Coach Blessing, and her story deeply resonated with me. We connected on LinkedIn, and she welcomed me so warmly, even shared her contact, encouraged me, and reminded me that while it might be tough, I could do it. I joined her flexible mentorship program, and just a few weeks in, I received an internship offer.\n\n The progress has helped me grow tremendously, both personally and professionally. Through Coach Blessing guidance, I gained the courage and strategy to become more visible and intentional on LinkedIn after years of being inactive. Her mentorship transformed how I show up, helped me gain clarity on my path as a Product Manager, and guided me toward securing an internship. I now understand how to use LinkedIn effectively, think strategically, and stay consistent in my growth. Most importantly, I’m still learning and evolving every day.",
    },
    
  ];

  return (
    <section data-ppcp-section="Testimonials" className={`${styles.section} ${styles.testimonials}`} aria-labelledby="coaching-testimonials-title">
      <div className={styles.container}>
        <p className={styles.eyebrow}>FROM THE PEOPLE WHO DID THE WORK</p>
        <h2 id="coaching-testimonials-title" className={styles.heading}>See What the Experience Was Like From the Inside.</h2>
        <div className={styles.testimonialGrid}>
          {reviews.map((review, index) => (
            <figure key={review.name} className={`${styles.testimonialCard} ${index === 0 ? styles.highlightReview : styles.outlinedReview}`}>
              {index === 0 && <span className={styles.quoteLine} aria-hidden="true" />}
              <blockquote>{review.text.split(/\n\n/).map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph.trim()}</p>)}</blockquote>
              <figcaption><Image src={review.image} alt={review.name} width={40} height={40} /><div><strong>{review.name}</strong><span>{review.role}</span></div></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
