import { createRoot } from "react-dom/client";
import "@/styles/globals.css";
import { AppRoot } from "@/app/index";

createRoot(document.getElementById("root")!).render(<AppRoot />);
