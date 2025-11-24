import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
            <i className="fas fa-music text-white text-sm"></i>
          </div>
          <span className="text-xl font-bold tracking-tight text-white brand-font">
            K<span className="text-pink-500">-POP</span> ZONE
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-pink-500 transition-colors">首页</a>
          <a href="#" className="text-white hover:text-pink-500 transition-colors">活动</a>
          <a href="#" className="hover:text-pink-500 transition-colors">偶像新闻</a>
          <a href="#" className="hover:text-pink-500 transition-colors">排行榜</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors">
            <i className="fas fa-search"></i>
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/100/100?random=user" alt="User" />
          </div>
        </div>
      </div>
    </header>
  );
};