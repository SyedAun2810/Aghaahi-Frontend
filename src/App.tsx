import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Navigator from "./Navigator";
import ScrollToTop from "@Hooks/ScrollToTop";
import ApiClientProvider from "@Api/Client";

const App = () => {
    return (
        <ApiClientProvider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <BrowserRouter>
                <ScrollToTop />
                <Navigator />
            </BrowserRouter>
        </ApiClientProvider>
    );
};

export default App;
