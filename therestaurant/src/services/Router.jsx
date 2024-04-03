import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { Home } from "../pages/Home";
import { BookTable } from "../pages/BookTable";
import { Contact } from "../pages/Contact";
import { NotFound } from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "booktable", element: <BookTable /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
