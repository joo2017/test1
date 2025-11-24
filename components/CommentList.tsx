import React from 'react';
import { Comment } from '../types';

interface CommentListProps {
  comments: Comment[];
  winnerId?: string;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, winnerId }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">
          回复 <span className="text-slate-500 text-sm font-normal">({comments.length})</span>
        </h3>
        
        <div className="flex gap-2 text-xs">
             <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">最新</span>
             <span className="px-2 py-1 rounded hover:bg-slate-800 text-slate-500 cursor-pointer">最高热度</span>
        </div>
      </div>

      {comments.map((comment) => {
        const isWinner = comment.id === winnerId;
        return (
          <div 
            key={comment.id} 
            className={`glass-panel rounded-lg p-4 transition-all duration-300 ${isWinner ? 'border-yellow-400 bg-yellow-400/10 transform scale-102 ring-2 ring-yellow-400/50' : 'hover:bg-slate-800/80'}`}
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 relative">
                <img 
                  src={comment.user.avatar} 
                  alt={comment.user.username} 
                  className={`w-10 h-10 rounded-full object-cover border-2 ${isWinner ? 'border-yellow-400' : 'border-slate-700'}`} 
                />
                {isWinner && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg">
                    <i className="fas fa-crown"></i>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${isWinner ? 'text-yellow-400' : 'text-slate-200'}`}>
                      {comment.user.username}
                    </span>
                    {comment.user.badge && (
                      <span className="px-1.5 py-0.5 bg-slate-700 text-slate-400 text-[10px] uppercase font-bold rounded">
                        {comment.user.badge}
                      </span>
                    )}
                    <span className="text-slate-500 text-xs">{comment.timestamp}</span>
                  </div>
                  
                  {/* Hype Meter */}
                  {comment.hypeScore !== undefined && (
                    <div className="flex items-center gap-2 bg-slate-800/80 rounded-full px-2 py-1 border border-slate-700/50">
                        <div className="h-1.5 w-12 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-pink-500" 
                                style={{ width: `${comment.hypeScore}%` }}
                            />
                        </div>
                        <span className={`text-xs font-bold ${comment.hypeScore > 80 ? 'text-pink-400' : 'text-slate-400'}`}>
                            {comment.hypeScore}
                        </span>
                    </div>
                  )}
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed break-words">
                  {comment.content}
                </p>

                {/* AI Reaction */}
                {comment.hypeReason && (
                   <div className="mt-2 text-xs flex items-start gap-2 text-slate-500 bg-slate-900/30 p-2 rounded-md inline-block">
                      <i className="fas fa-robot mt-0.5 text-pink-500"></i>
                      <span className="italic">{comment.hypeReason}</span>
                   </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};