require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("./models/Event");

const sampleEvents = [
  { title: "AI/ML Workshop", description: "Build a real-time image classifier using TensorFlow and Python.", date: new Date("2026-03-15"), venue: "Lab 301", category: "workshop", maxParticipants: 60 },
  { title: "24-Hour Hackathon", description: "Solve real-world problems in teams. Prizes worth Rs 1 Lakh!", date: new Date("2026-03-16"), venue: "Main Auditorium", category: "hackathon", maxParticipants: 200 },
  { title: "Cybersecurity CTF", description: "Capture The Flag challenge - test your security skills.", date: new Date("2026-03-16"), venue: "Cyber Lab", category: "competition", maxParticipants: 100 },
  { title: "Cloud Computing Seminar", description: "Learn about AWS, Azure, and GCP from industry experts.", date: new Date("2026-03-15"), venue: "Seminar Hall A", category: "seminar", maxParticipants: 150 },
  { title: "Web Dev Bootcamp", description: "Full-stack development crash course with React and Node.js.", date: new Date("2026-03-17"), venue: "Lab 201", category: "workshop", maxParticipants: 50 },
  { title: "Tech Cultural Night", description: "Music, art and performances celebrating technology and creativity.", date: new Date("2026-03-17"), venue: "Open Air Theatre", category: "cultural", maxParticipants: 500 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    await Event.deleteMany({});
    console.log("Cleared existing events");
    const created = await Event.insertMany(sampleEvents);
    console.log(`Inserted ${created.length} events successfully!`);
    created.forEach((e) => console.log(`  - ${e.title} (${e.category})`));
    await mongoose.disconnect();
    console.log("\nDone! Refresh the app to see events.");
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
}

seed();