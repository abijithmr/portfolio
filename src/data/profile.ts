// Hardcoded profile content. Edit this file to update what the site says.

export const profile = {
  name: "Abijith Rajeevan",
  firstName: "Abijith",
  lastName: "Rajeevan",
  role: "Software Engineer",
  githubUser: "abijithmr",
  tagline:
    "I build web software end to end: typed React front ends, Go and Node services, and Postgres underneath.",
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    college: "Sahrdaya College of Engineering and Technology (Autonomous)",
    university: "APJ Abdul Kalam Technological University (KTU)",
    location: "Kodakara, Kerala",
    graduation: 2027,
  },
  links: {
    github: "https://github.com/abijithmr",
    linkedin: "https://www.linkedin.com/in/abijithmr/",
    email: "abijithrajeevan28@gmail.com",
    // Drop the PDF at public/resume.pdf.
    resume: "/resume.pdf",
  },
  resumeFileName: "Abijith-Rajeevan-Resume.pdf",
} as const;

export const avatarUrl = `https://github.com/${profile.githubUser}.png`;

export interface StackGroup {
  title: string;
  items: string[];
}

export const techStack: StackGroup[] = [
  { title: "Languages", items: ["JavaScript", "TypeScript", "Python", "Go", "SQL"] },
  { title: "Front end", items: ["React", "Next.js", "CSS"] },
  { title: "Back end", items: ["Node.js", "REST APIs", "PostgreSQL", "Redis"] },
  { title: "Tools", items: ["Git", "Docker", "AWS", "CI/CD"] },
];
