import { Thread, Comment } from './types';

const INITIAL_DEADLINE = new Date();
INITIAL_DEADLINE.setMinutes(INITIAL_DEADLINE.getMinutes() + 5); // 5 minutes from now for demo

export const MOCK_THREAD: Thread = {
  id: 'thread-1',
  title: '[活动] AESPA "Supernova" 亲笔签名专辑抽奖！🌟',
  author: {
    id: 'admin',
    username: 'KPop管理员',
    avatar: 'https://picsum.photos/id/64/100/100',
    badge: '官方'
  },
  content: `各位 MY 们大家好！👋
  
  为了庆祝 "Supernova" 的巨大成功，我们将向社区成员送出 3 张新专辑的亲笔签名版！
  
  📢 **如何参与：**
  只需回复本帖，说出专辑中你最喜欢的歌曲以及原因。
  
  ⏰ **截止时间：**
  倒计时结束后将自动进行抽奖。
  
  祝大家好运！Let's get to the next level! 🚀`,
  images: [
    'https://picsum.photos/id/119/800/450',
    'https://picsum.photos/id/180/800/450'
  ],
  views: 15420,
  likes: 2305,
  postedAt: '2 小时前',
  deadline: INITIAL_DEADLINE
};

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    user: { id: 'u1', username: 'KarinaLover99', avatar: 'https://picsum.photos/id/237/100/100' },
    content: '天哪 Supernova 简直是年度最佳歌曲 (SOTY)！编舞太疯狂了！🔥',
    timestamp: '1小时前',
    hypeScore: 92,
    hypeReason: '能量爆棚，饭圈术语运用得当！'
  },
  {
    id: 'c2',
    user: { id: 'u2', username: 'WinterMelon', avatar: 'https://picsum.photos/id/433/100/100' },
    content: 'Licorice 是我的最爱。太独特了。希望能中奖！',
    timestamp: '55分钟前',
    hypeScore: 78,
    hypeReason: '品味不错，但需要更多尖叫声。'
  },
  {
    id: 'c3',
    user: { id: 'u3', username: 'NaevisCalling', avatar: 'https://picsum.photos/id/129/100/100', badge: 'VIP' },
    content: 'SU-SU-SUPERNOVA! 💫 根本停不下来。',
    timestamp: '45分钟前',
    hypeScore: 88,
    hypeReason: '直接引用歌词，爱了。'
  },
  {
    id: 'c4',
    user: { id: 'u4', username: 'NingNingVocals', avatar: 'https://picsum.photos/id/65/100/100' },
    content: '拜托让我中奖吧，我从 Black Mamba 时期就是粉丝了 🐍',
    timestamp: '30分钟前',
    hypeScore: 85,
    hypeReason: '探测到情感攻势。'
  }
];