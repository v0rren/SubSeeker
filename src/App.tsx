// React core import
import React from 'react';

// Importing CSS styles for the App component
import './App.css';

// Importing the RecommendedSubRedditList component from the components folder
import { RecommendedSubRedditList } from "./components/RecommendedSubRedditList";

// Define the App component
function App() {
  return (
      // Rendering the RecommendedSubRedditList component inside the App component
      <RecommendedSubRedditList />
  );
}

// Export the App component as the default export
export default App;
