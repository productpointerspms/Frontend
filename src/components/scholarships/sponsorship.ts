import type { SponsorshipTier } from "./SponsorshipTierCard";

export const sponsorshipTiers: SponsorshipTier[] = [
  { name: "Supporter", description: "Contribute towards a partial scholarship for one learner on a ProductPointers program.", coverage: "Partial coverage", recognition: "Named in scholarship communications" },
  { name: "Champion", description: "Fund a full scholarship place for one learner covering their entire program access and materials.", coverage: "Full program access", recognition: "Named on scholarship award + community recognition", featured: true },
  { name: "Partner", description: "Fund multiple scholarship places or establish a named scholarship under your organisation’s brand.", coverage: "Multiple learners or named scholarship", recognition: "Featured sponsor + co-branded scholarship" },
];
