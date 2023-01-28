import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatsPage from "./pages/ChatsPage";
import ProtectedRoute from "./util/ProtectedRoute";
import NotificationsPage from "./pages/NotificationsPage";
import CallsPage from "./pages/CallsPage";
import ChatGroupsPage from "./pages/ChatGroupsPage";
import DashboardLayout from "./components/DashboardLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/" element={<DashboardLayout />}>
          <Route
            path="chats"
            element={
              <ProtectedRoute>
                <ChatsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="calls"
            element={
              <ProtectedRoute>
                <CallsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="groups"
            element={
              <ProtectedRoute>
                <ChatGroupsPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
