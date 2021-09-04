import React from "react";
import { GlobalStyle } from "./GlobalStyle";
import { MainLayout } from "./layout/MainLayout";

export default function App() {
  return (
    <div className="root">
      <GlobalStyle></GlobalStyle>

      <MainLayout></MainLayout>
    </div>
  );
}
