import React from 'react';
import { BookPage, PageType } from '../types';

interface PageRendererProps {
  page: BookPage;
  isActive: boolean;
}

const PageRenderer: React.FC<PageRendererProps> = ({ page, isActive }) => {
  // Base transition classes for fade-in effect
  const containerClasses = `
    absolute inset-0 w-full h-full p-[10%] transition-opacity duration-700 ease-in-out bg-paper
    ${isActive ? 'opacity-100 z-10 delay-200' : 'opacity-0 z-0 pointer-events-none'}
  `;

  // Specific styling requirements: 
  // Diphylleia font
  // 11.5pt size ~= 15.33px
  // 1.15 line height
  const baseTextStyle = "font-diphylleia text-[15.33px] leading-[1.15] text-stone-800";

  // Render Logic based on Page Type
  if (page.type === PageType.COVER) {
    return (
      <div className={`${containerClasses} flex items-center justify-center`}>
        <div className="border-4 border-double border-stone-800 h-full w-full p-8 flex flex-col items-center justify-center text-center">
           {/* Title Group */}
           <div className="flex flex-col gap-6 items-center mb-8">
             {page.subtitle && (
                <h2 className="text-[16px] font-diphylleia text-stone-600 tracking-widest uppercase">
                  {page.subtitle}
                </h2>
              )}
              <h1 className="text-[40px] font-diphylleia font-bold text-stone-900 tracking-wider leading-tight">
                {page.title}
              </h1>
           </div>

          {/* Decorative Line */}
          <div className="w-16 h-[2px] bg-stone-800 mb-12"></div>

          {/* Author */}
          <p className="text-[18px] font-diphylleia text-stone-800">
            {page.content}
          </p>
        </div>
      </div>
    );
  }

  if (page.type === PageType.DEDICATION) {
    return (
      <div className={`${containerClasses} flex items-center justify-center`}>
        <div className="text-center w-full">
          <p className="font-diphylleia text-[16px] text-stone-600 italic leading-loose">
            {page.content}
          </p>
        </div>
      </div>
    );
  }

  if (page.type === PageType.PROLOGUE || page.type === PageType.EPILOGUE || page.type === PageType.AUTHOR_NOTE) {
    return (
      <div className={containerClasses}>
        <div className="w-full h-full flex flex-col">
          {/* Header Area */}
          <div className="mb-10 border-b border-stone-300 pb-4">
             <span className="block text-[11px] font-sans tracking-[0.25em] text-stone-400 uppercase mb-3">
              {page.type === PageType.PROLOGUE ? 'Prologue' : page.type === PageType.EPILOGUE ? 'Epilogue' : 'Author\'s Note'}
            </span>
            {page.title && (
              <h2 className="text-[24px] font-diphylleia font-bold text-stone-800">
                {page.title}
              </h2>
            )}
          </div>
          
          {/* Content */}
          <div className={`whitespace-pre-line text-justify ${baseTextStyle} overflow-y-auto no-scrollbar pb-8`}>
            {page.content}
          </div>
        </div>
      </div>
    );
  }

  if (page.type === PageType.POEM) {
    return (
      <div className={`${containerClasses} flex items-center justify-center`}>
        <div className={`whitespace-pre-wrap text-center ${baseTextStyle} leading-loose`}>
          {page.content}
        </div>
      </div>
    );
  }

  // Body Content
  return (
    <div className={containerClasses}>
      <div className="w-full h-full flex flex-col">
        {/* Header Info */}
        <div className="flex items-center justify-center mb-10 shrink-0">
          <span className="font-diphylleia text-stone-400 text-sm border-b border-stone-200 pb-1 px-3">
            {page.chapterNumber ? `제 ${page.chapterNumber} 장` : '***'}
          </span>
        </div>
        
        {/* Main Text */}
        <div className={`whitespace-pre-line text-justify ${baseTextStyle} overflow-y-auto no-scrollbar pb-8 flex-grow`}>
          {page.content}
        </div>

        {/* Page Number (Decorative) */}
        <div className="absolute bottom-8 left-0 w-full flex justify-center pointer-events-none">
          <span className="text-[10px] text-stone-300 font-sans">
             - {page.id + 1} -
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageRenderer;