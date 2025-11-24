import React from 'react';
import { Thread } from '../types';

interface ThreadPostProps {
  thread: Thread;
}

export const ThreadPost: React.FC<ThreadPostProps> = ({ thread }) => {
  return (
    <div className="glass-panel rounded-xl p-6 mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-bold rounded-full mb-3 border border-pink-500/30">
            官方活动
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            {thread.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400 text-sm">
            <span className="text-pink-400 font-semibold">{thread.author.username}</span>
            <span>•</span>
            <span>发布于 {thread.postedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <i className="fas fa-clock text-xs"></i> 
              截止: {thread.deadline.toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              <i className="fas fa-eye text-xs"></i> {thread.views.toLocaleString()}
            </span>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-pink-500 transition-colors">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>

      <div className="prose prose-invert max-w-none mb-6 text-slate-300">
        <p className="whitespace-pre-line">{thread.content}</p>
      </div>

      {thread.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {thread.images.map((img, idx) => (
            <div key={idx} className="relative aspect-video rounded-lg overflow-hidden group border border-slate-700">
              <img 
                src={img} 
                alt="Event Detail" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 border-t border-slate-700 pt-4 mt-6">
        <button className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors">
          <i className="far fa-heart"></i>
          <span>{thread.likes.toLocaleString()} 点赞</span>
        </button>
        <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
          <i className="fas fa-share"></i>
          <span>分享</span>
        </button>
      </div>
    </div>
  );
};