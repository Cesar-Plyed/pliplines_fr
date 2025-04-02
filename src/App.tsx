import { Suspense, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
// import { useWindowWidth } from "./utils/useWindowWidth";
import { AnimatePresence } from "motion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Menu from "./components/menuCards";
import NavBar from "./components/navBar";
import Sidebar from "./components/seidebar";
import Footer from "./components/footer";
import "./styles/app.scss";

const queryClient = new QueryClient();

// const Menu = lazy(() => import("./pages/menu"));
// const NavBar = lazy(() => import("./components/navBar"));
// const Sidebar = lazy(() => import("./components/seidebar"));
// const Footer = lazy(() => import("./components/footer"));

function App() {
  // const width = useWindowWidth();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handlePageClick = () => {
    if (isSidebarVisible) {
      setIsSidebarVisible(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full">
        <nav className="w-full h-16">
          <NavBar
            onButtonClick={toggleSidebar}
            isSideBarOpen={isSidebarVisible}
          />
        </nav>
        <Suspense
          fallback={
            <div className="w-full h-full grid place-content-center">
              <CircularProgress className="size-20" />
            </div>
          }
        >
          <main
            onClick={() => {
              handlePageClick();
            }}
          >
            <Menu />
          </main>
        </Suspense>
        <section>
          {isSidebarVisible && (
            <div className="fixed top-[42px] h-full w-[15%] border-t-[1px] border-[#9f9883]">
              <AnimatePresence initial={false}>
                <Sidebar children />
              </AnimatePresence>
            </div>
          )}
        </section>
        <footer className="w-full h-[80px]">
          <Footer></Footer>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
