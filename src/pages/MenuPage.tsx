import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CardMenu from "../components/templates/MenuCards";

const queryClient = new QueryClient();

function MenuPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="grid">
                <CardMenu />
            </div>
        </QueryClientProvider>
    );
}

export default MenuPage;
