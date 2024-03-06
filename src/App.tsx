import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
// min 3:45:00 https://www.youtube.com/watch?v=6a3Dz8gwjdg&t=2409s&ab_channel=JavaScriptMastery
import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers"; 
import { Home, ForgotPassword, Login, Register, CompanyListPage,  } from "./pages";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import { resources } from "./config/resources";
import Create from "./pages/company/create";
import Edit from "./pages/company/edit";



function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
              >
                <Routes>
                  <Route path="/forget-password" element={<ForgotPassword />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                  element ={<Authenticated
                    key="authenticated-layout"
                    fallback={<CatchAllNavigate to="/login" />}>
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>}
                  >
                    <Route index element={<Home />} />
                    <Route path="/companies" >
                      <Route index element={<CompanyListPage />} />
                      <Route path="new" element={<Create />} />
                      <Route path="edit/:id" element={<Edit />} />
                    </Route>
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
