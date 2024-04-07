import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Articles/Index";
import Layout from "./components/shared/Layout";
import App from "./App";
import ArticlesManagement from "./pages/Articles/ArticlesManagement";
import FeedManagement from "./pages/Feeds/FeedManagement";
import UsersManagement from "./pages/Users/UsersManagement";
import HistoryPage from "./pages/HistoryPage";
import Registration from "./pages/Users/UserCreate";
import UserEdit from "./pages/Users/Id/UserEdit";
import UserConsult from "./pages/Users/Id/UserConsult";
import FeedEdit from "./pages/Feeds/Id/FeedEdit";
import FeedCreate from "./pages/Feeds/FeedCreate";
import FeedConsult from "./pages/Feeds/Id/FeedConsult";
import EditArticle from "./pages/Articles/Id/EditArticle";
import ConsultArticle from "./pages/Articles/Id/ConsultArticle";
import ActivateAccount from "./pages/ActivateAccount";
import ResendActivation from "./pages/ResendActivation";
import ForgetPassword from "./pages/ForgetPassword";
import ConfirmResetPassword from "./pages/CofirmResetPassword";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/404Page";
import NewsArticle from "./pages/Articles/Id/ReadArticle";
import NoAuthPage from "./components/shared/NoAuthPage";
export const router = createBrowserRouter([
  {
    path: "*",
    element: <Layout>
      <NotFoundPage />
    </Layout>
  },
  {
    path: "/",
    element: <NoAuthPage><App /></NoAuthPage>,
  },
  {
    path: "/favorites",
    element: <Layout>
      <Index favorite />
    </Layout>,
  },
  {
    path: "/articles",
    children: [
      {
        path: "",
        element: <Layout>
          <Index />
        </Layout>,
      },
      {
        path: ":id/read",
        element: <Layout>
          <NewsArticle />
        </Layout>,
      }
    ]

  },
  {
    path: "/feeds",
    element: <Layout>
      <FeedManagement admin={false} />
    </Layout>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Layout>
      <Profile />,
    </Layout>
  },
  {
    path: "/activate/:uid/:token",
    element: <NoAuthPage><ActivateAccount /></NoAuthPage>,
  },
  {
    path: "/confirm-reset/:uid/:token",
    element: <NoAuthPage><ConfirmResetPassword /></NoAuthPage>,
  },
  {
    path: "/resend-activation/",
    element: <NoAuthPage><ResendActivation /></NoAuthPage>,
  },
  {
    path: "/forgot-password/",
    element:
      <NoAuthPage><ForgetPassword /></NoAuthPage>
  },
  {
    path: "/history",
    element: <Layout>
      <HistoryPage />
    </Layout>,
  },
  {
    path: "/management",
    children: [
      {
        path: "users/",
        children: [
          {
            path: "",
            element: <Layout adminOnly>
              <UsersManagement />
            </Layout>,
          },
          {
            path: "create/",
            element: <Layout adminOnly>
              <Registration />
            </Layout>,
          },
          {
            path: ":id/edit/",
            element: <Layout adminOnly>
              <UserEdit />
            </Layout>,
          },
          {
            path: ":id/consult/",
            element: <Layout adminOnly>
              <UserConsult />
            </Layout>,
          }
        ],
      },
      {
        path: "articles/",
        children: [
          {
            path: "",
            element: <Layout adminOnly>
              <ArticlesManagement />
            </Layout>,
          },
          {
            path: ":id/edit/",
            element: <Layout adminOnly>
              <EditArticle />
            </Layout>,
          },
          {
            path: ":id/consult/",
            element: <Layout adminOnly>
              <ConsultArticle />
            </Layout>,
          }
        ]
      },
      {
        path: "feeds/",
        children: [
          {
            path: "",
            element: <Layout adminOnly>
              <FeedManagement admin />
            </Layout>,
          },
          {
            path: "create/",
            element: <Layout adminOnly>
              <FeedCreate />
            </Layout>,
          },
          {
            path: ":id/edit/",
            element: <Layout adminOnly>
              <FeedEdit />
            </Layout>,
          },
          {
            path: ":id/consult/",
            element: <Layout adminOnly>
              <FeedConsult />
            </Layout>,
          },
        ],
      },

    ],

  }
]);