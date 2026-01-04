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
    company: "[Company Name]",
    role: "[Your Role]",
    period: "[Start Date] - Present",
    description: [
      "[Describe your responsibilities and achievements here]",
      "[Add more bullet points as needed]",
    ],
  },
  {
    id: 2,
    company: "[Previous Company]",
    role: "[Previous Role]",
    period: "[Start Date] - [End Date]",
    description: [
      "[Describe your responsibilities and achievements here]",
      "[Add more bullet points as needed]",
    ],
  },
  {
    id: 3,
    company: "[Another Company]",
    role: "[Role Title]",
    period: "[Start Date] - [End Date]",
    description: ["[Describe your responsibilities and achievements here]"],
  },
];

const education: ExperienceItem[] = [
  {
    id: 1,
    company: "[University/School Name]",
    role: "[Degree/Program]",
    period: "[Start Year] - [End Year]",
    description: [
      "[Describe your studies, achievements, or relevant coursework]",
    ],
  },
  {
    id: 2,
    company: "[Previous Education]",
    role: "[Degree/Certificate]",
    period: "[Start Year] - [End Year]",
    description: ["[Add details about your education]"],
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
