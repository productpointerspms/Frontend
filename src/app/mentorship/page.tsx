import Hero from "@/components/mentorship/Hero";
import MentorshipGuidance from "@/components/mentorship/MentorshipGuidance";
import SpecializedTracks from "@/components/mentorship/SpecializedTracks";
import HowItWorks from "@/components/mentorship/HowItWorks";
import MentorsGrid from "@/components/mentorship/MentorsGrid";
import SuccessStories from "@/components/mentorship/SuccessStories";
import Commitment from "@/components/mentorship/Commitment";


const MentorPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-montserrat">
      <Hero />
      <MentorshipGuidance />
      <SpecializedTracks />
      <HowItWorks />
      <MentorsGrid />
      <Commitment />
      <SuccessStories />
    </main>
  );
};

export default MentorPage;
