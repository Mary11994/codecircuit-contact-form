// src/App.jsx
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import ContactForm from './components/ContactForm';
import './styles/variables.css';
import './styles/ContactForm.css';

// A small inner component to access theme context
function AppContent() {
  const { mode, toggle } = useTheme();

  return (
    <div className="App" data-theme={mode}>
      <header className="app-header">
        <h1>Contact Us</h1>
          {/* CTA in the header, aligned right */}
      <div className="header-cta">
       Fill the form for a <strong>free consultation</strong>
      </div>
        <button className="theme-toggle" onClick={toggle}>
          Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>

      <main className="app-main">
      <main>
        <ContactForm />
      </main>
      </main>


      <footer className="app-footer">
        &copy; {new Date().getFullYear()} KodeGeniusDigital
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}


