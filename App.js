import React, { useState, useEffect, useCallback } from 'react';
import { BOOK_CONTENT, TOTAL_PAGES } from './constants.js';
import PageRenderer from './components/PageRenderer.js';
import ProgressBar from './components/ProgressBar.js';
import { ChevronLeft, ChevronRight, BookOpen } from './components/Icons.js';

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = useCallback(() => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault(); // Prevent scroll on space
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage]);

  return React.createElement('div', { className: "relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-stone-200/50" },
    
    // Header / Top Navigation
    React.createElement('header', { className: "absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-40 pointer-events-none" },
      React.createElement('div', { 
        className: "pointer-events-auto flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer",
        onClick: () => setCurrentPage(0)
      },
        React.createElement(BookOpen, { className: "w-5 h-5" }),
        React.createElement('span', { className: "font-diphylleia font-bold hidden md:inline" }, "나의 수필")
      ),
      React.createElement('div', { className: "text-stone-400 text-sm font-mono" },
        `${currentPage + 1} / ${TOTAL_PAGES}`
      )
    ),

    // Main Content Area - A5 Ratio Constraint
    React.createElement('main', { 
      className: "relative shadow-2xl bg-paper overflow-hidden",
      style: {
        height: 'min(90vh, 1000px)',
        aspectRatio: '148 / 210', // A5 Ratio
      }
    },
      // Book Binding Effect (Left Side)
      React.createElement('div', { className: "absolute left-0 top-0 bottom-0 w-[2%] bg-gradient-to-r from-stone-300/50 to-transparent z-30 pointer-events-none" }),
      React.createElement('div', { className: "absolute left-0 top-0 bottom-0 w-[1px] bg-stone-300 z-30 pointer-events-none" }),
      
      // Paper Texture Overlay
      React.createElement('div', { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 pointer-events-none z-20 mix-blend-multiply" }),

      // Pages
      React.createElement('div', { className: "relative w-full h-full" },
        BOOK_CONTENT.map((page) => 
          React.createElement(PageRenderer, {
            key: page.id,
            page: page,
            isActive: page.id === currentPage
          })
        )
      )
    ),

    // Side Navigation Areas (Click to navigate)
    React.createElement('div', {
      className: "absolute inset-y-0 left-0 w-16 md:w-32 z-30 cursor-pointer hover:bg-stone-900/5 transition-colors flex items-center justify-center group",
      onClick: prevPage,
      title: "Previous Page"
    },
      React.createElement(ChevronLeft, { className: `w-8 h-8 text-stone-400 group-hover:text-stone-800 transition-all ${currentPage === 0 ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'}` })
    ),
    React.createElement('div', {
      className: "absolute inset-y-0 right-0 w-16 md:w-32 z-30 cursor-pointer hover:bg-stone-900/5 transition-colors flex items-center justify-center group",
      onClick: nextPage,
      title: "Next Page"
    },
      React.createElement(ChevronRight, { className: `w-8 h-8 text-stone-400 group-hover:text-stone-800 transition-all ${currentPage === TOTAL_PAGES - 1 ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'}` })
    ),

    // Progress Bar
    React.createElement(ProgressBar, { current: currentPage, total: TOTAL_PAGES })
  );
};

export default App;