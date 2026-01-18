"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Building2, GraduationCap } from "lucide-react";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string[];
  logo?: string;
}

const workExperience: ExperienceItem[] = [
  {
    id: 1,
    company: "TechCorp Solutions",
    role: "Senior Full Stack Developer",
    period: "Jan 2022 - Present",
    description: [
      "Led development of microservices architecture serving 500K+ daily users",
      "Reduced API response time by 40% through optimization and caching strategies",
      "Mentored junior developers and conducted code reviews for team of 8",
    ],
  },
  {
    id: 2,
    company: "Digital Innovations Lab",
    role: "Full Stack Developer",
    period: "Jun 2020 - Dec 2021",
    description: [
      "Built and maintained React applications with TypeScript and Node.js backends",
      "Implemented CI/CD pipelines using GitHub Actions and Docker",
      "Collaborated with UX team to improve user engagement by 25%",
    ],
  },
  {
    id: 3,
    company: "StartUp Ventures",
    role: "Frontend Developer",
    period: "Aug 2018 - May 2020",
    description: [
      "Developed responsive web applications using React and modern JavaScript",
      "Integrated RESTful APIs and implemented state management with Redux",
      "Participated in agile development processes and daily standups",
    ],
  },
];

const education: ExperienceItem[] = [
  {
    id: 1,
    company: "National University of Singapore",
    role: "Bachelor of Computing in Computer Science",
    period: "2014 - 2018",
    description: [
      "Graduated with Honors (GPA: 3.8/4.0)",
      "Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems",
      "President of Coding Club, organized hackathons and tech talks",
    ],
  },
  {
    id: 2,
    company: "Singapore Polytechnic",
    role: "Diploma in Information Technology",
    period: "2011 - 2013",
    description: [
      "Completed with Merit, specialized in Software Development",
      "Final year project: E-commerce platform with payment integration",
      "Dean's List for academic excellence",
    ],
  },
];

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <div className="flex gap-4 p-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
          <Building2 className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="text-lg font-semibold">{item.company}</h3>
          <span className="text-sm text-muted-foreground">{item.period}</span>
        </div>
        <p className="text-primary/80 mt-1">{item.role}</p>
        <ul className="mt-3 space-y-2">
          {item.description.map((desc, idx) => (
            <li
              key={idx}
              className="text-sm text-foreground/80 flex items-start gap-2"
            >
              <span className="text-primary mt-1.5">•</span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section className="py-12">
      <div className="container">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <Tabs defaultValue="work" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-muted/50">
              <TabsTrigger
                value="work"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Work
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Education
              </TabsTrigger>
            </TabsList>
            <TabsContent value="work" className="p-2 md:p-4">
              <div className="divide-y divide-border/50">
                {workExperience.map((item) => (
                  <ExperienceCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="education" className="p-2 md:p-4">
              <div className="divide-y divide-border/50">
                {education.map((item) => (
                  <ExperienceCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
}
