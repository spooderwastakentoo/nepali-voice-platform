
export interface Statement {
  id: string;
  text: string;
  speaker: string;
  date: string;
  sources: { url: string; title: string }[];
  context: string;
  comments: Comment[];
}

export interface Promise {
  id: string;
  title: string;
  text: string;
  politician: string;
  party: string;
  date: string;
  category: string;
  status: 'fulfilled' | 'in-progress' | 'unfulfilled' | 'unknown';
  sources: { url: string; title: string }[];
  comments: Comment[];
}

export interface Politician {
  id: string;
  name: string;
  party: string;
  province: string;
  bio: string;
  statementIds: string[];
  promiseIds: string[];
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
  dislikes: number;
}

// Dummy Statements
export const statements: Statement[] = [
  {
    id: "s1",
    text: "We will build 10,000 kilometers of roads in the next five years.",
    speaker: "Ram Sharma",
    date: "2023-02-15",
    sources: [
      { url: "#", title: "National Daily News" },
      { url: "#", title: "Election Rally Speech Transcript" }
    ],
    context: "This statement was made during an election rally in Kathmandu. The speaker was addressing the issue of infrastructure development in rural areas.",
    comments: [
      {
        id: "c1s1",
        author: "Citizen123",
        text: "This seems impossible given our current budget constraints.",
        timestamp: "2023-03-01T14:30:00",
        likes: 24,
        dislikes: 5
      },
      {
        id: "c2s1",
        author: "NepalDev",
        text: "I hope they prioritize quality over quantity this time.",
        timestamp: "2023-03-05T09:15:00",
        likes: 37,
        dislikes: 2
      }
    ]
  },
  {
    id: "s2",
    text: "Inflation will be reduced to 5% by the end of this fiscal year.",
    speaker: "Sita Poudel",
    date: "2023-01-20",
    sources: [
      { url: "#", title: "Finance Ministry Press Release" },
      { url: "#", title: "Television Interview" }
    ],
    context: "This statement was made during a press conference following the budget announcement. The current inflation rate is around 12%.",
    comments: [
      {
        id: "c1s2",
        author: "EconomistNepal",
        text: "This target is overly optimistic given global economic trends.",
        timestamp: "2023-01-21T11:45:00",
        likes: 43,
        dislikes: 7
      }
    ]
  },
  {
    id: "s3",
    text: "Our party has created 500,000 jobs in the last term.",
    speaker: "Binod Thapa",
    date: "2023-04-10",
    sources: [
      { url: "#", title: "Party Achievements Report" },
      { url: "#", title: "Campaign Website" }
    ],
    context: "This claim was made during a television debate with opposition leaders. The official employment statistics show a more complex picture.",
    comments: [
      {
        id: "c1s3",
        author: "DataAnalyst",
        text: "Official statistics show only about 300,000 new jobs in that period.",
        timestamp: "2023-04-11T16:20:00",
        likes: 51,
        dislikes: 13
      },
      {
        id: "c2s3",
        author: "PoliticalScience101",
        text: "The definition of 'jobs created' needs to be clarified here.",
        timestamp: "2023-04-12T08:30:00",
        likes: 29,
        dislikes: 3
      }
    ]
  },
  {
    id: "s4",
    text: "Nepal will achieve energy self-sufficiency by 2025.",
    speaker: "Kumar Gurung",
    date: "2023-03-05",
    sources: [
      { url: "#", title: "Energy Ministry Strategy Document" },
      { url: "#", title: "International Conference Speech" }
    ],
    context: "This statement was made at an international energy conference. Nepal currently imports about 30% of its energy needs.",
    comments: [
      {
        id: "c1s4",
        author: "EnergyExpert",
        text: "Possible if the current hydropower projects are completed on schedule.",
        timestamp: "2023-03-07T10:15:00",
        likes: 33,
        dislikes: 4
      }
    ]
  },
  {
    id: "s5",
    text: "We will provide free healthcare for all children under 12 within the first 100 days.",
    speaker: "Anita KC",
    date: "2023-05-18",
    sources: [
      { url: "#", title: "Party Manifesto" },
      { url: "#", title: "Campaign Rally Speech" }
    ],
    context: "This promise was a key part of the election campaign. The current healthcare system provides subsidized but not free care for children.",
    comments: [
      {
        id: "c1s5",
        author: "HealthPolicy",
        text: "This would require a significant budget increase for the health ministry.",
        timestamp: "2023-05-20T14:40:00",
        likes: 27,
        dislikes: 6
      },
      {
        id: "c2s5",
        author: "DoctorNepal",
        text: "Our hospitals need better infrastructure before implementing this.",
        timestamp: "2023-05-21T09:05:00",
        likes: 48,
        dislikes: 5
      }
    ]
  }
];

// Dummy Promises
export const promises: Promise[] = [
  {
    id: "p1",
    title: "Universal Free Education",
    text: "We will implement truly free education for all students up to grade 12, including textbooks, uniforms, and meal programs.",
    politician: "Ram Sharma",
    party: "Nepal Progressive Party",
    date: "2023-01-10",
    category: "Education",
    status: "in-progress",
    sources: [
      { url: "#", title: "Party Manifesto 2023" },
      { url: "#", title: "Education Ministry Announcement" }
    ],
    comments: [
      {
        id: "c1p1",
        author: "TeacherNepal",
        text: "Budget allocation for this is still insufficient according to our analysis.",
        timestamp: "2023-01-15T13:20:00",
        likes: 31,
        dislikes: 7
      },
      {
        id: "c2p1",
        author: "EducationPolicy",
        text: "The first phase has been implemented in 3 provinces so far.",
        timestamp: "2023-03-22T10:45:00",
        likes: 42,
        dislikes: 3
      }
    ]
  },
  {
    id: "p2",
    title: "Clean Drinking Water Access",
    text: "Our government will ensure 95% of households have access to clean drinking water within three years.",
    politician: "Sita Poudel",
    party: "National Democratic Alliance",
    date: "2022-11-05",
    category: "Infrastructure",
    status: "in-progress",
    sources: [
      { url: "#", title: "Water Supply Commission Report" },
      { url: "#", title: "Rural Development Strategy" }
    ],
    comments: [
      {
        id: "c1p2",
        author: "WaterEngineer",
        text: "The current implementation rate suggests this will take 5 years, not 3.",
        timestamp: "2022-12-10T09:30:00",
        likes: 23,
        dislikes: 5
      }
    ]
  },
  {
    id: "p3",
    title: "Double Agricultural Exports",
    text: "We will double Nepal's agricultural exports within four years through modernization and subsidy programs.",
    politician: "Binod Thapa",
    party: "Farmers Alliance",
    date: "2023-02-28",
    category: "Economy",
    status: "unfulfilled",
    sources: [
      { url: "#", title: "Economic Vision 2026" },
      { url: "#", title: "Trade Ministry Statement" }
    ],
    comments: [
      {
        id: "c1p3",
        author: "AgroEconomist",
        text: "No significant increase in exports has been recorded yet.",
        timestamp: "2023-04-17T15:10:00",
        likes: 39,
        dislikes: 12
      },
      {
        id: "c2p3",
        author: "FarmerAssociation",
        text: "The promised subsidies have not been distributed in most districts.",
        timestamp: "2023-05-03T11:25:00",
        likes: 56,
        dislikes: 4
      }
    ]
  },
  {
    id: "p4",
    title: "Digital Government Services",
    text: "All government services will be available online within two years, reducing corruption and improving efficiency.",
    politician: "Kumar Gurung",
    party: "Nepal Progressive Party",
    date: "2022-10-15",
    category: "Governance",
    status: "in-progress",
    sources: [
      { url: "#", title: "Digital Nepal Framework" },
      { url: "#", title: "IT Ministry Roadmap" }
    ],
    comments: [
      {
        id: "c1p4",
        author: "TechNepal",
        text: "About 30% of services are now online, but rural access remains a challenge.",
        timestamp: "2023-03-11T14:50:00",
        likes: 27,
        dislikes: 6
      }
    ]
  },
  {
    id: "p5",
    title: "Zero Carbon Emissions by 2040",
    text: "Nepal will achieve carbon neutrality by 2040 through renewable energy transition and forest conservation.",
    politician: "Anita KC",
    party: "Green Nepal Party",
    date: "2023-04-22",
    category: "Environment",
    status: "unknown",
    sources: [
      { url: "#", title: "Climate Action Plan" },
      { url: "#", title: "UN Climate Summit Address" }
    ],
    comments: [
      {
        id: "c1p5",
        author: "ClimateScientist",
        text: "This is ambitious but achievable if hydropower development continues.",
        timestamp: "2023-04-25T16:35:00",
        likes: 45,
        dislikes: 8
      },
      {
        id: "c2p5",
        author: "ForestryExpert",
        text: "The reforestation targets are not being met according to latest satellite data.",
        timestamp: "2023-05-10T08:55:00",
        likes: 37,
        dislikes: 11
      }
    ]
  }
];

// Dummy Politicians
export const politicians: Politician[] = [
  {
    id: "pol1",
    name: "Ram Sharma",
    party: "Nepal Progressive Party",
    province: "Bagmati",
    bio: "Ram Sharma has been in politics for 15 years and previously served as the Minister of Infrastructure. He focuses on development projects and education reform.",
    statementIds: ["s1"],
    promiseIds: ["p1"]
  },
  {
    id: "pol2",
    name: "Sita Poudel",
    party: "National Democratic Alliance",
    province: "Gandaki",
    bio: "Sita Poudel is an economist turned politician who has been a member of parliament for two terms. She specializes in financial policy and rural development.",
    statementIds: ["s2"],
    promiseIds: ["p2"]
  },
  {
    id: "pol3",
    name: "Binod Thapa",
    party: "Farmers Alliance",
    province: "Province 1",
    bio: "Binod Thapa has a background in agriculture and represents the interests of farmers. He has been advocating for agricultural modernization and better subsidies.",
    statementIds: ["s3"],
    promiseIds: ["p3"]
  },
  {
    id: "pol4",
    name: "Kumar Gurung",
    party: "Nepal Progressive Party",
    province: "Karnali",
    bio: "Kumar Gurung has a background in public administration and information technology. He has been leading initiatives for government digitalization and transparency.",
    statementIds: ["s4"],
    promiseIds: ["p4"]
  },
  {
    id: "pol5",
    name: "Anita KC",
    party: "Green Nepal Party",
    province: "Lumbini",
    bio: "Anita KC is an environmental activist who entered politics to push for stronger climate action. She has been advocating for renewable energy and conservation policies.",
    statementIds: ["s5"],
    promiseIds: ["p5"]
  }
];

// Helper functions
export const getStatementById = (id: string): Statement | undefined => {
  return statements.find(statement => statement.id === id);
};

export const getPromiseById = (id: string): Promise | undefined => {
  return promises.find(promise => promise.id === id);
};

export const getPoliticianById = (id: string): Politician | undefined => {
  return politicians.find(politician => politician.id === id);
};

export const getStatementsByPolitician = (politicianId: string): Statement[] => {
  const politician = getPoliticianById(politicianId);
  if (!politician) return [];
  return statements.filter(statement => politician.statementIds.includes(statement.id));
};

export const getPromisesByPolitician = (politicianId: string): Promise[] => {
  const politician = getPoliticianById(politicianId);
  if (!politician) return [];
  return promises.filter(promise => politician.promiseIds.includes(promise.id));
};
