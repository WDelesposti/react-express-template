const supabase = require("./supabaseClient");

const notifications = [
  {
    message: "Alice Johnson sent you a friend request.",
    type: "Friend Request",
    read: false,
  },
  { message: "Bob Smith is logged.", type: "Login Alert", read: false },
  {
    message: "Charlie Brown posted a new status update.",
    type: "Post Update",
    read: false,
  },
  { message: "Alice Johnson liked your post.", type: "Like", read: false },
  { message: "Bob Smith commented your post.", type: "Comment", read: false },
  {
    message: "Jonathan Edward sent you a friend request.",
    type: "Friend Request",
    read: false,
  },
  {
    message: "Alice Johnson mentioned you in a post.",
    type: "Mention",
    read: false,
  },
  {
    message: "Bob Smith invited you to an event.",
    type: "Event Invite",
    read: false,
  },
  { message: "Charlie Brown is logged.", type: "Login Alert", read: false },
  {
    message: "Alice Johnson posted a new status update.",
    type: "Post Update",
    read: false,
  },
  { message: "Bob Smith liked your post.", type: "Like", read: false },
  {
    message: "Charlie Brown commented your post.",
    type: "Comment",
    read: false,
  },
  {
    message: "Jonathan Edward mentioned you in a post.",
    type: "Mention",
    read: false,
  },
  {
    message: "Charlie Brown invited you to an event.",
    type: "Event Invite",
    read: false,
  },
  {
    message: "Charlie Brown sent you a friend request.",
    type: "Friend Request",
    read: false,
  },
];

async function seed() {
  try {
    const { error: deleteError } = await supabase
      .from("notifications")
      .delete()
      .neq("id", 0);
    if (deleteError) {
      console.error("Erro ao limpar notificações:", deleteError);
    } else {
      console.log("Notificações anteriores apagadas com sucesso.");
    }

    const { error } = await supabase
      .from("notifications")
      .insert(notifications);

    if (error) {
      console.error("Erro ao inserir notificações:", error);
    } else {
      console.log("Notificações inseridas com sucesso.");
    }
  } catch (err) {
    console.error("Erro no script de seed:", err);
  } finally {
    process.exit(0);
  }
}

seed();
