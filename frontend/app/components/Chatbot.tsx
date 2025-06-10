"use client";

import { useEffect, useState } from "react";
import { auth, database } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, push } from "firebase/database";

interface Product {
  name: string;
  price: number;
}

interface Message {
  text: string;
  type: "user" | "bot";
  timestamp: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
    });

    const sessionStart = new Date().toLocaleString();
    setMessages([
      {
        text: `👋 Welcome! Session started at ${sessionStart}`,
        type: "bot",
        timestamp: sessionStart,
      },
    ]);

    return () => unsub();
  }, []);

  const storeMessage = (msg: Message) => {
    if (!uid) return;
    const dbRef = ref(database, `chats/${uid}`);
    push(dbRef, msg);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      type: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    storeMessage(userMessage);

    try {
      const res = await fetch(
        `https://chatbot-backend-70op.onrender.com//api/search?q=${input}`
      );
      const data: Product[] = await res.json();

      const botMessage: Message = {
        text:
          data.length > 0
            ? data.map((p: Product) => `👟 ${p.name} - ₹${p.price}`).join("\n")
            : "❌ No products found.",
        type: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      storeMessage(botMessage);
    } catch (err: unknown) {
      console.error(err);
      const errorMsg: Message = {
        text: "⚠️ Could not connect to server.",
        type: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      storeMessage(errorMsg);
    }

    setInput("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-4 rounded-xl shadow-md bg-white dark:bg-zinc-900 dark:text-white">
      <h2 className="text-xl font-bold mb-4">🛍️ Footwear Chatbot</h2>

      <div className="h-80 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg text-sm whitespace-pre-wrap ${
              msg.type === "user"
                ? "bg-blue-100 dark:bg-blue-800 text-right ml-auto w-fit"
                : "bg-gray-100 dark:bg-zinc-700 w-fit"
            }`}>
            <div>{msg.text}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {msg.timestamp}
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 border px-3 py-1 rounded-l-lg dark:bg-zinc-800 dark:border-zinc-600"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for shoes..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-1 rounded-r-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
}
