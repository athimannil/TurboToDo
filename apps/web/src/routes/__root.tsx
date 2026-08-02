import { Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-5xl px-5 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
