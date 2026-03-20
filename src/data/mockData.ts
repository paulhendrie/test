export type Mood = "high" | "neutral" | "low";

export interface Note {
  id: string;
  content: string;
  date: string;
  type: "win" | "concern" | "note";
  mood?: Mood;
}

export interface Goal {
  id: string;
  content: string;
  status: "pending" | "completed" | "dropped";
  createdAt: string;
}

export interface WeekData {
  id: string;
  startDate: string;
  endDate: string;
  notes: Note[];
  goals: Goal[];
}

export const pastWeeks: WeekData[] = [
  {
    id: "week-3",
    startDate: "2026-02-23",
    endDate: "2026-03-01",
    notes: [
      { id: "n1", content: "Felt really drained on Wednesday after the big sync.", date: "2026-02-25", type: "concern", mood: "low" },
      { id: "n2", content: "Shipped the new landing page!", date: "2026-02-27", type: "win", mood: "high" },
    ],
    goals: [
      { id: "g1", content: "Read 2 chapters of Designing Data-Intensive Applications", status: "pending", createdAt: "2026-02-22" },
      { id: "g2", content: "Go to the gym 3 times", status: "completed", createdAt: "2026-02-22" },
    ]
  },
  {
    id: "week-2",
    startDate: "2026-03-02",
    endDate: "2026-03-08",
    notes: [
      { id: "n3", content: "Wednesday slump hit hard again. Need to stop scheduling meetings then.", date: "2026-03-04", type: "concern", mood: "low" },
      { id: "n4", content: "Great feedback from Sarah on the prototype.", date: "2026-03-06", type: "win", mood: "high" },
    ],
    goals: [
      { id: "g1", content: "Read 2 chapters of Designing Data-Intensive Applications", status: "pending", createdAt: "2026-02-22" },
      { id: "g3", content: "Finalize Q2 roadmap", status: "completed", createdAt: "2026-03-01" },
    ]
  },
  {
    id: "week-1",
    startDate: "2026-03-09",
    endDate: "2026-03-15",
    notes: [
      { id: "n5", content: "Another Wednesday, another energy crash. What is going on?", date: "2026-03-11", type: "concern", mood: "low" },
      { id: "n6", content: "Managed to focus for 4 hours straight on Friday.", date: "2026-03-13", type: "win", mood: "high" },
    ],
    goals: [
      { id: "g1", content: "Read 2 chapters of Designing Data-Intensive Applications", status: "pending", createdAt: "2026-02-22" },
      { id: "g4", content: "Publish blog post", status: "pending", createdAt: "2026-03-08" },
    ]
  }
];

export const currentWeek: WeekData = {
  id: "week-0",
  startDate: "2026-03-16",
  endDate: "2026-03-22",
  notes: [
    { id: "n7", content: "Started the week strong, cleared inbox zero.", date: "2026-03-16", type: "win", mood: "high" },
    { id: "n8", content: "Wednesday... exhausted again. Didn't get much done.", date: "2026-03-18", type: "concern", mood: "low" },
    { id: "n9", content: "Had a good chat with the mentor about career progression.", date: "2026-03-19", type: "note", mood: "neutral" },
    { id: "n10", content: "Feeling overwhelmed by the backlog.", date: "2026-03-20", type: "concern", mood: "low" },
  ],
  goals: [
    { id: "g1", content: "Read 2 chapters of Designing Data-Intensive Applications", status: "pending", createdAt: "2026-02-22" },
    { id: "g4", content: "Publish blog post", status: "pending", createdAt: "2026-03-08" },
    { id: "g5", content: "Prepare for performance review", status: "completed", createdAt: "2026-03-15" },
  ]
};
