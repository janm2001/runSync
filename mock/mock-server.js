import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const seed = JSON.parse(readFileSync(join(__dirname, "db.json"), "utf-8"));

// In-memory state (mutations lost on restart)
const db = {
  users: [...seed.users],
  athletes: [...seed.athletes],
  groups: [...seed.groups],
  trainings: [...seed.trainings],
  PersonalBests: [...seed.PersonalBests],
  runningTimes: [...seed.runningTimes],
};

let nextTrainingId = Math.max(...db.trainings.map((t) => Number(t.id))) + 1;
let nextAthleteId = Math.max(...db.athletes.map((a) => Number(a.id))) + 1;

const app = express();
app.use(express.json());

// --- Auth ---
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// --- Trainings ---
app.get("/api/trainings", (_req, res) => {
  res.json(db.trainings);
});

app.post("/api/trainings", (req, res) => {
  const training = { ...req.body, id: nextTrainingId++ };
  db.trainings.push(training);
  res.status(201).json(training);
});

app.put("/api/trainings/:id", (req, res) => {
  const id = req.params.id;
  const idx = db.trainings.findIndex((t) => String(t.id) === id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  db.trainings[idx] = { ...db.trainings[idx], ...req.body };
  res.json(db.trainings[idx]);
});

app.delete("/api/trainings/:id", (req, res) => {
  const id = req.params.id;
  const idx = db.trainings.findIndex((t) => String(t.id) === id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  db.trainings.splice(idx, 1);
  res.status(204).end();
});

// --- Athletes ---
app.get("/api/athletes", (req, res) => {
  const { page, pageSize, sortBy, sortOrder, filterGroup } = req.query;

  // If no page param, return flat array (used by Attendances.tsx)
  if (!page) {
    return res.json(db.athletes);
  }

  // Paginated response (used by ManageClients.tsx)
  let filtered = [...db.athletes];

  if (filterGroup) {
    filtered = filtered.filter((a) => a.group === filterGroup);
  }

  const sort = sortBy || "name";
  const order = sortOrder === "desc" ? -1 : 1;
  filtered.sort((a, b) => {
    const aVal = a[sort] ?? "";
    const bVal = b[sort] ?? "";
    if (aVal < bVal) return -1 * order;
    if (aVal > bVal) return 1 * order;
    return 0;
  });

  const size = parseInt(pageSize) || 10;
  const currentPage = parseInt(page) || 1;
  const start = (currentPage - 1) * size;
  const paged = filtered.slice(start, start + size);

  res.json({
    athletes: paged,
    pagination: {
      currentPage,
      pageSize: size,
      totalCount: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
    },
  });
});

app.post("/api/athletes", (req, res) => {
  const athlete = {
    id: nextAthleteId++,
    performance: 0,
    improvement: "0%",
    lastRun: "N/A",
    personalBests: { "5K": "N/A", "10K": "N/A", halfMarathon: "N/A" },
    daysSinceJoining: 0,
    isActiveAthlete: true,
    ...req.body,
  };
  db.athletes.push(athlete);
  res.status(201).json(athlete);
});

// --- Groups ---
app.get("/api/groups", (_req, res) => {
  res.json(db.groups);
});

// --- Pace calculator ---
app.post("/api/pace", (req, res) => {
  const { distance, duration } = req.body;
  const pace = distance > 0 ? (duration / distance).toFixed(2) : "0";
  res.set("Content-Type", "text/xml");
  res.send(
    `<CalculateResponse><CalculateResult>${pace}</CalculateResult></CalculateResponse>`
  );
});

// --- Running times ---
app.get("/api/runningtimes/data", (_req, res) => {
  res.json(db.runningTimes);
});

// --- Personal Bests (no /api prefix — matches hardcoded URL) ---
app.get("/PersonalBests", (_req, res) => {
  res.json(db.PersonalBests);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
