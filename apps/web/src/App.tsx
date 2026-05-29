import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter } from "react-router";

import { AppContent } from "@/layouts/AppContent/AppContent";

import { lorecraftAntdTheme } from "./styles/theme";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={lorecraftAntdTheme} wave={{ disabled: true }}>
        <AntdApp>
          <AppContent />
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
