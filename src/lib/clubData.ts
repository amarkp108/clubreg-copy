export interface Club {
  name: string;
  incharge: string;
}

export interface Domain {
  id: number;
  name: string;
  clubs: Club[];
}

export const domains: Domain[] = [
  {
    id: 1,
    name: "Fine Arts",
    clubs: [
      { name: "3-D Texture Art", incharge: "Ms Ruby" },
      { name: "Handmade Jewellery", incharge: "Ms Monita" },
      { name: "Anime Portrait", incharge: "Mr Maninder" },
      { name: "Miniature Painting", incharge: "Mr Nikhil" },
      { name: "Lumedecore & Funky Feet", incharge: "Dr Parveen" },
      { name: "Design Thinking and Innovation", incharge: "Ms Shruti Goyal" },
      { name: "Creative Painting", incharge: "Dr R K Singh" },
    ],
  },
  {
    id: 2,
    name: "Dance",
    clubs: [
      { name: "Classical Dance", incharge: "Ms Anuradha" },
      { name: "Contemporary: Hip Hop Dance", incharge: "Mr Amit" },
      { name: "Free Style & Folk Dance", incharge: "Mr Jassi" },
    ],
  },
  {
    id: 3,
    name: "Music",
    clubs: [
      { name: "Instrumental: Rhythm; Percussion", incharge: "Mr Ishwar" },
      { name: "Keyboard and Vocal", incharge: "Ms Priyanka" },
    ],
  },
  {
    id: 4,
    name: "Dramatics",
    clubs: [{ name: "Stage to Sensor", incharge: "Mr Anil" }],
  },
  {
    id: 5,
    name: "Sports",
    clubs: [
      { name: "Chess", incharge: "Mr Gautam" },
      { name: "Carrom", incharge: "Mr Satpal" },
      { name: "Table Tennis", incharge: "Ms Satpal / Ms Suman" },
    ],
  },
  {
    id: 6,
    name: "Skill Development",
    clubs: [
      { name: "Tech Ninjas", incharge: "Mr Sandeep & IT Team" },
      { name: "Sugar & Spice", incharge: "Ms Sangeeta Kapoor" },
      { name: "Health & Wellness", incharge: "Ms Ritika / Ms Seema Gupta" },
      { name: "Mass Media", incharge: "Ms Neha Juneja / Ms Pushpa" },
    ],
  },
  {
    id: 7,
    name: "Literary",
    clubs: [
      { name: "Literary Club", incharge: "Mr Dharmender / Ms Snehlata" },
      { name: "Comic Strip", incharge: "Ms Himanshi / Ms Anubhuti" },
      { name: "Namaste Germany!", incharge: "Ms Vanshika / Mr Prashant" },
      { name: "Namaste Japan!", incharge: "Mr Akhil / Mr Subhash" },
      { name: "Namaste France!", incharge: "Mr Manu" },
    ],
  },
  {
    id: 8,
    name: "Academic",
    clubs: [
      { name: "STEM", incharge: "Ms Gazal / Ms Kavita" },
      { name: "Logic Legends", incharge: "Mr Munish / Ms Anjali" },
      { name: "Maths Manthan", incharge: "Ms Sarabjeet / Ms Yashika" },
      { name: "Youth Parliament", incharge: "Mr Sanju / Mr Gaurav / Ms Deepa" },
    ],
  },
];
