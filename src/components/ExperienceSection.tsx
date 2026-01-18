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
    company: "aliqua culpa laborum",
    role: "laborum Developer",
    period: "20XX - 20XX",
    description: [
      "Excepteur in magna ea.",
      "Eu eiusmod in duis et culpa do velit officia aute.",
      "Occaecat cupidatat esse cupidatat velit sunt.",
    ],
  },
  {
    id: 2,
    company: "Mindox Techno",
    role: "Intern",
    period: "Apr 2024 - Aug 2024",
    description: [
      "Elit officia ea non dolor qui laborum sunt nostrud.",
      "Cillum nostrud do quis ullamco veniam sint et veniam occaecat ipsum aliquip officia Lorem cillum do.",
      "Duis nostrud cupidatat irure dolore ipsum et nisi amet do tempor nisi reprehenderit fugiat.",
    ],
  },
  {
    id: 3,
    company: "Royal Pickering",
    role: "F&B Server",
    period: "2023 - 2023",
    description: [
      "Tempor consectetur ea cillum.",
      "Excepteur elit duis laboris velit eu elit enim aute ea amet Lorem consectetur duis fugiat velit.",
      "Officia consequat excepteur eiusmod cupidatat veniam aute.",
    ],
  },
];

const education: ExperienceItem[] = [
  {
    id: 1,
    company: "est veniam tempor of Singapore",
    role: "ipsum of proident in commodo",
    period: "20XX - 20XX",
    description: [
      "Graduated with Honors (GPA: 3.8/4.0)",
      "Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems",
      "President of Coding Club, organized hackathons and tech talks",
    ],
  },
  {
    id: 2,
    company: "Ngee Ann Polytechnic",
    role: "Diploma in Mechatronics & Robotics",
    period: "Apr 2025 - Apr 2027",
    description: [
      "Graduated with Honors (GPA: 3.8/4.0), Completed with Merit, specialized in Software Development",
      "Final year project: E-commerce platform with payment integration",
      "Dean's List for academic excellence",
    ],
  },
  {
    id: 3,
    company: "Institute of Technical Education",
    role: "Diploma in Mechatronics & Robotics",
    period: "Apr 2025 - Apr 2027",
    description: [
      "Graduated (raw GPA: 3.75/4.0), Completed with excepteur",
      "Final year project: Anim officia minim adipisicing anim tempor in proident quis aute.",
      "Director's List",
    ],
  },
  {
    id: 4,
    company: "Sembawang Secondary School",
    role: "O/N Level Certificate",
    period: "Jan 2019 - Dec 2022",
    description: [
      "Graduated ([raw GPA: 11] [net GPA: 9])",
      "SYF - Certificate of Accomplishment in 2021",
      "Band Major in Woodwind band - 2022 Section Leader in Woodwind band ",
      "2020 Head Librarian in Woodwind band - 2020 Cyber Wellness Leader - 2019 Upper Sec CCA Committee Leader",
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
