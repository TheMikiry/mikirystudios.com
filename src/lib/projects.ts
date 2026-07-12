export type Project = {
  slug: string;
  title: string;
  year: string;
  studio: string;
  role: string;
  status: "released" | "announced";
  kind: "Feature Film" | "Series" | "Game";
  description: string;
  shots: number;
};

// Placeholder data for development. Replace with real credits + artwork.
export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    year: "2024",
    studio: "Studio A",
    role: "Character Rigger",
    status: "released",
    kind: "Feature Film",
    description:
      "Placeholder description — summary of the project and the specific rigging/TD contributions.",
    shots: 4,
  },
  {
    slug: "project-two",
    title: "Project Two",
    year: "2023",
    studio: "Studio B",
    role: "Rigging TD",
    status: "released",
    kind: "Series",
    description:
      "Placeholder description — summary of the project and the specific rigging/TD contributions.",
    shots: 3,
  },
  {
    slug: "project-three",
    title: "Project Three",
    year: "2022",
    studio: "Studio C",
    role: "Character TD",
    status: "released",
    kind: "Game",
    description:
      "Placeholder description — summary of the project and the specific rigging/TD contributions.",
    shots: 5,
  },
  {
    slug: "project-four",
    title: "Untitled Feature",
    year: "2027",
    studio: "Studio D",
    role: "Character Rigger",
    status: "announced",
    kind: "Feature Film",
    description: "Placeholder — announced project, details under wraps.",
    shots: 0,
  },
];

export const credits: {
  year: string;
  studio: string;
  project: string;
  role: string;
}[] = [
  { year: "2024", studio: "Studio A", project: "Project One", role: "Character Rigger" },
  { year: "2023", studio: "Studio B", project: "Project Two", role: "Rigging TD" },
  { year: "2022", studio: "Studio C", project: "Project Three", role: "Character TD" },
  { year: "2020", studio: "Studio E", project: "Project Zero", role: "Junior Rigger" },
];
