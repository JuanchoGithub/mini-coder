
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import LessonWizard from './views/LessonWizard';
import Manual from './views/Manual';
import Sandbox from './views/Sandbox';

// Basic fade-in animation for smoother route transitions feel
const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/:id" element={<LessonWizard />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
