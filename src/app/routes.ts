import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { GraphPage } from "./components/GraphPage";
import { ColorKeyPage } from "./components/ColorKeyPage";
import { VisionPage } from "./components/VisionPage";
import { HealthPage } from "./components/HealthPage";
import { SettingsPage } from "./components/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "graph", Component: GraphPage },
      { path: "color-key", Component: ColorKeyPage },
      { path: "vision", Component: VisionPage },
      { path: "health", Component: HealthPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);