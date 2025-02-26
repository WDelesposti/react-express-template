const express = require("express");
const cors = require("cors");
const supabase = require("./supabaseClient");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/notifications", async (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  try {
    const { data, count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact" })
      .range(start, end)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const totalPages = Math.ceil(count / limit);
    res.json({ notifications: data, totalPages });
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/notifications/markAllRead", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ read: true })
      .match({ read: false });

    if (error) throw error;
    res.json({ message: "Todas as notificações foram marcadas como lidas" });
  } catch (error) {
    console.error("Erro ao marcar todas as notificações como lidas:", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/notifications/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);

    if (error) throw error;
    res.json({ message: "Notificação marcada como lida" });
  } catch (error) {
    console.error("Erro ao marcar a notificação como lida:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
