import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Converter from "./converter";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Converter />
    </QueryClientProvider>
  );
}

export default App;
