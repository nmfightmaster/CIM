import { useState } from "react";
import "./App.css";
import Computer from "./components/Computer";
function App() {
  return (
    <div class="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
      <Computer name="CHAS5363" />
    </div>
  );
}

export default App;
