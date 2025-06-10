import Chatbot from "./components/Chatbot";
import LoginButton from "./components/LoginButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <LoginButton/>
      <Chatbot />
    </main>
  );
}
