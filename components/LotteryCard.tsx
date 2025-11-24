import React, { useState, useEffect } from 'react';
import { DrawStatus, User, Comment } from '../types';

interface LotteryCardProps {
  status: DrawStatus;
  participants: Comment[];
  deadline: Date;
  onDraw: () => void;
  winner: Comment | null;
}

export const LotteryCard: React.FC<LotteryCardProps> = ({ status, participants, deadline, onDraw, winner }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [displayedWinner, setDisplayedWinner] = useState<string>('???');
  const [isRolling, setIsRolling] = useState(false);

  // Countdown Timer Logic
  useEffect(() => {
    // Stop the timer if the draw is calculating or has ended
    if (status === DrawStatus.ENDED || status === DrawStatus.CALCULATING) {
      if (status === DrawStatus.ENDED) {
        setTimeLeft('00:00:00');
      }
      return;
    }

    const timer = setInterval(() => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft('00:00:00');
        // If we want auto-draw, we could trigger it, but manual is safer for demo
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline, status]);

  // Rolling Logic
  useEffect(() => {
    if (status === DrawStatus.CALCULATING && participants.length > 0) {
      setIsRolling(true);
      const interval = setInterval(() => {
        const randomIdx = Math.floor(Math.random() * participants.length);
        setDisplayedWinner(participants[randomIdx].user.username);
      }, 50);

      // Stop rolling after 3 seconds (handled by parent changing status, but purely visual here)
      return () => clearInterval(interval);
    } else if (status === DrawStatus.ENDED && winner) {
      setIsRolling(false);
      setDisplayedWinner(winner.user.username);
    }
  }, [status, participants, winner]);


  return (
    <div className="sticky top-24 space-y-6">
      <div className="glass-panel rounded-xl p-6 border-pink-500/30 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-ticket-alt text-pink-500"></i> 幸运抽奖
        </h3>

        <div className="bg-slate-900/50 rounded-lg p-4 mb-4 text-center border border-slate-700">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
             {status === DrawStatus.ENDED ? '活动结束' : '剩余时间'}
          </p>
          <div className="text-3xl font-mono font-bold text-white tracking-widest neon-text">
            {status === DrawStatus.ENDED ? 'END' : (timeLeft || '--:--:--')}
          </div>
           <p className="text-xs text-slate-500 mt-2 border-t border-slate-700 pt-2">
            截止: {deadline.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm text-slate-300 mb-6 px-1">
          <span>参与人数:</span>
          <span className="font-bold text-white bg-slate-700 px-2 py-0.5 rounded-full">{participants.length}</span>
        </div>

        {status === DrawStatus.OPEN && (
          <div className="text-center p-4 border border-dashed border-slate-600 rounded-lg mb-4">
            <p className="text-slate-400 text-sm">在主题下回复即可自动参与抽奖！</p>
          </div>
        )}
        
        {status === DrawStatus.OPEN && (
             <button 
             onClick={onDraw}
             className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-pink-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             立即开奖
           </button>
        )}

        {status === DrawStatus.CALCULATING && (
          <div className="text-center py-6">
            <p className="text-pink-400 font-bold animate-bounce mb-2">正在抽取幸运儿...</p>
            <div className="text-2xl font-bold text-white truncate px-4 py-2 bg-slate-800 rounded border border-pink-500/50">
              {displayedWinner}
            </div>
          </div>
        )}

        {status === DrawStatus.ENDED && winner && (
          <div className="text-center py-4 bg-gradient-to-b from-slate-800/50 to-pink-900/20 rounded-lg border border-pink-500/30">
            <div className="w-16 h-16 rounded-full border-2 border-yellow-400 mx-auto mb-3 p-1">
               <img src={winner.user.avatar} alt="Winner" className="w-full h-full rounded-full object-cover" />
            </div>
            <p className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-1">
              <i className="fas fa-crown mr-1"></i> 中奖者
            </p>
            <p className="text-xl font-bold text-white mb-2">{winner.user.username}</p>
            <p className="text-xs text-slate-400">"{winner.content.substring(0, 30)}..."</p>
          </div>
        )}
      </div>

      <div className="glass-panel rounded-xl p-4">
        <h4 className="text-sm font-bold text-slate-300 mb-3">活动规则</h4>
        <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
          <li>每个账号仅限参与一次。</li>
          <li>账号必须在活动开始前创建。</li>
          <li>恶意刷屏将取消资格。</li>
          <li>结果将立即公布。</li>
        </ul>
      </div>
    </div>
  );
};