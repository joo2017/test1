import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ThreadPost } from './components/ThreadPost';
import { CommentList } from './components/CommentList';
import { ReplyForm } from './components/ReplyForm';
import { LotteryCard } from './components/LotteryCard';
import { Confetti } from './components/Confetti';
import { WinnerModal } from './components/WinnerModal';
import { MOCK_THREAD, MOCK_COMMENTS } from './constants';
import { Comment, DrawStatus, User } from './types';
import { analyzeFanHype } from './services/geminiService';

// Mock Current User
const CURRENT_USER: User = {
  id: 'me',
  username: 'KPopFan_xyz',
  avatar: 'https://picsum.photos/id/669/100/100',
  badge: '新粉'
};

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [drawStatus, setDrawStatus] = useState<DrawStatus>(DrawStatus.OPEN);
  const [winner, setWinner] = useState<Comment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  // Handle new reply (Entry)
  const handleReplySubmit = async (content: string) => {
    setIsSubmitting(true);
    
    // 1. Get AI Analysis
    const analysis = await analyzeFanHype(content, CURRENT_USER.username);
    
    // 2. Create Comment Object
    const newComment: Comment = {
      id: `new-${Date.now()}`,
      user: CURRENT_USER,
      content,
      timestamp: '刚刚',
      hypeScore: analysis.score,
      hypeReason: analysis.reaction
    };

    // 3. Update State
    setComments(prev => [newComment, ...prev]);
    setIsSubmitting(false);
  };

  // Handle Lottery Draw
  const handleDraw = useCallback(() => {
    if (comments.length === 0) return;
    
    setDrawStatus(DrawStatus.CALCULATING);
    setShowWinnerModal(false);

    // Simulate "rolling" time
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * comments.length);
      const winningComment = comments[randomIndex];
      
      setWinner(winningComment);
      setDrawStatus(DrawStatus.ENDED);
      setShowWinnerModal(true); // Show modal when draw ends
      
      // Scroll to winner logic could go here
    }, 3000);
  }, [comments]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Header />
      
      {/* Celebration Effects */}
      {drawStatus === DrawStatus.ENDED && <Confetti />}
      {drawStatus === DrawStatus.ENDED && winner && showWinnerModal && (
        <WinnerModal winner={winner} onClose={() => setShowWinnerModal(false)} />
      )}
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
             <ThreadPost thread={MOCK_THREAD} />
             
             {/* Reply Section */}
             {drawStatus === DrawStatus.OPEN ? (
               <ReplyForm onSubmit={handleReplySubmit} isSubmitting={isSubmitting} />
             ) : (
                <div className="glass-panel rounded-xl p-6 mb-8 text-center border-l-4 border-slate-500">
                  <p className="text-slate-400">
                    {drawStatus === DrawStatus.ENDED 
                      ? "活动已结束。恭喜中奖者！" 
                      : "报名通道已关闭。"}
                  </p>
                </div>
             )}

             <CommentList comments={comments} winnerId={winner?.id} />
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 relative">
             <LotteryCard 
               status={drawStatus}
               participants={comments}
               deadline={MOCK_THREAD.deadline}
               onDraw={handleDraw}
               winner={winner}
             />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;