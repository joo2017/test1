import React from 'react';
import { Comment } from '../types';

interface WinnerModalProps {
  winner: Comment;
  onClose: () => void;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-slate-900 border border-pink-500/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-pink-500/20 transform animate-float">
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/30 rounded-full blur-[100px] -z-10" />

        <div className="text-center">
          <div className="mb-6 relative inline-block">
             <i className="fas fa-crown text-5xl text-yellow-400 absolute -top-8 -right-8 animate-bounce"></i>
             <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 mx-auto">
                <img 
                  src={winner.user.avatar} 
                  alt={winner.user.username} 
                  className="w-full h-full rounded-full object-cover border-4 border-slate-900" 
                />
             </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 neon-text">恭喜中奖!</h2>
          <p className="text-pink-400 font-bold text-xl mb-6">@{winner.user.username}</p>

          <div className="bg-slate-800/80 rounded-lg p-4 mb-8 text-left border border-slate-700">
            <i className="fas fa-quote-left text-slate-500 text-sm mb-2 block"></i>
            <p className="text-slate-200 text-sm leading-relaxed">{winner.content}</p>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            太棒了！🎉
          </button>
        </div>
      </div>
    </div>
  );
};