import { ApolloProvider } from "./providers/ApolloProvider";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AppShell } from "@/app/AppShell/AppShell";
import CharactersPage from "@/ui/pages/CharactersPage";

export const AppRoot = () => (
  <ApolloProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<CharactersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
