import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { initDB, run, get } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" })); initDB();
app.use(express.static(path.join(__dirname, "public")));

// ====== CONFIG ======
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "troque-essa-chave-depois";
const DATA_PATH = path.join(__dirname, "data.json");

// ====== Helpers: DB simples em arquivo ======
function readDB() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify({ users: {} }, null, 2), "utf-8");
  }
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDB(db) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2), "utf-8");
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

// ====== Auth middleware ======
function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Sem token" });

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { email }
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

// ====== Default state (tem que bater com o front) ======
function defaultState() {
  const SKILL_IDS = [
    "foco","estudo","disciplina","organizacao","saude","energia","criatividade","social"
  ];
  const skills = {};
  for (const id of SKILL_IDS) skills[id] = { level: 1, xp: 0 };

  return {
    createdAt: Date.now(),
    skills,
    dailyEarned: {},
    questsByDay: {},
    log: []
  };
}

// ====== ROUTES ======

// Health
app.get("/health", (req, res) => res.json({ ok: true }));

// Register
app.post("/auth/register", async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");

    if (!email || !email.includes("@")) return res.status(400).json({ error: "Email inválido" });
    if (password.length < 4) return res.status(400).json({ error: "Senha muito curta (mín 4)" });

    const passwordHash = bcrypt.hashSync(password, 10);
    const now = Date.now();

    await run(
      `INSERT INTO users (email, password_hash, created_at, updated_at) VALUES (?,?,?,?)`,
      [email, passwordHash, now, now]
    );

    const user = await get(`SELECT id, email FROM users WHERE email = ?`, [email]);

    await run(
      `INSERT INTO states (user_id, state_json, updated_at) VALUES (?,?,?)`,
      [user.id, JSON.stringify(defaultState()), now]
    );

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
    res.json({ token, email });
  } catch (e) {
    if (String(e.message).includes("UNIQUE")) return res.status(409).json({ error: "Email já cadastrado" });
    console.error(e);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// Login
app.post("/auth/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");

    const user = await get(`SELECT id, email, password_hash FROM users WHERE email = ?`, [email]);
    if (!user) return res.status(401).json({ error: "Usuário ou senha inválidos" });

    const ok = bcrypt.compareSync(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Usuário ou senha inválidos" });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
    res.json({ token, email });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// Get state
app.get("/api/state", auth, async (req, res) => {
  try {
    const email = req.user.email;

    const user = await get(`SELECT id FROM users WHERE email = ?`, [email]);
    if (!user) return res.status(404).json({ error: "Conta não encontrada" });

    const row = await get(`SELECT state_json FROM states WHERE user_id = ?`, [user.id]);
    const state = row?.state_json ? JSON.parse(row.state_json) : defaultState();

    res.json({ state });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// Update state
app.put("/api/state", auth, async (req, res) => {
  try {
    const email = req.user.email;
    const incoming = req.body?.state;

    if (!incoming || typeof incoming !== "object") {
      return res.status(400).json({ error: "state inválido" });
    }

    const user = await get(`SELECT id FROM users WHERE email = ?`, [email]);
    if (!user) return res.status(404).json({ error: "Conta não encontrada" });

    const now = Date.now();

    await run(
      `UPDATE states SET state_json = ?, updated_at = ? WHERE user_id = ?`,
      [JSON.stringify(incoming), now, user.id]
    );

    await run(
      `UPDATE users SET updated_at = ? WHERE id = ?`,
      [now, user.id]
    );

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Erro no servidor" });
  }

// Salva do jeito que veio (simples). Se quiser, dá pra validar mais.

user.state = incoming;
user.updatedAt = Date.now();
db.users[email] = user;
writeDB(db);

  res.json({ ok: true });
});

// ====== Static: serve o index.html ======
// Coloque o index.html dentro de: server/public/index.html
const PUBLIC_DIR = path.join(__dirname, "public");
app.use(express.static(PUBLIC_DIR));

app.get("/", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "index.html")));
app.get("/login", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "login.html")));
app.get("/app", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "app.html")));

app.listen(PORT, () => {
  console.log(`Server ON: http://localhost:${PORT}`);
});