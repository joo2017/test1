import React, { useState } from 'react';

interface ReplyFormProps {
  onSubmit: (content: string) => void;
  isSubmitting: boolean;
}

export const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit, isSubmitting }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <div className="glass-panel rounded-xl p-6 mb-8 border-l-4 border-l-pink-500">
      <h3 className="text-lg font-bold text-white mb-4">发布回复并参与</h3>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            placeholder="分享你的激动心情！（这相当于你的入场券）"
            className="w-full h-24 bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none placeholder-slate-500"
          />
          {isSubmitting && (
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <div className="flex items-center gap-2 text-pink-400 font-medium">
                <i className="fas fa-spinner fa-spin"></i>
                <span>正在分析应援指数...</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end items-center gap-4">
          <span className="text-xs text-slate-500">
            <i className="fas fa-robot mr-1"></i> AI 应援指数已启用
          </span>
          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            回复
          </button>
        </div>
      </form>
    </div>
  );
};