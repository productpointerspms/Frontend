import { buildMetadata } from "@/lib/seo";
import CoursesPage from "@/components/courses/CoursesPage";

export const metadata = buildMetadata({
  title: "Courses",
  description: "Practical Product Management masterclasses and recorded courses. Build specific skills and learn at your own pace with ProductPointers.",
  path: "/courses",
});

export default function Page() {
  return <CoursesPage />;
}
