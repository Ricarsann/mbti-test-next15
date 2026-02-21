import type { PersonalityResult } from '@/src/types/personality';

/**
 * 获取人格类型的简短描述
 */
export function getTypeShortDescription(code: string): string {
  const descriptions: Record<string, string> = {
    INTJ: '战略家 - 富有想象力和战略性的思想家',
    INTP: '逻辑学家 - 创新的发明家，渴望知识',
    ENTJ: '指挥官 - 大胆、有想象力且意志强大的领导者',
    ENTP: '辩论家 - 聪慧、好奇，擅长辩论',
    INFJ: '提倡者 - 安静而神秘，富有启发性和理想主义',
    INFP: '调停者 - 诗意、善良，总是热心助人',
    ENFJ: '主人公 - 有魅力且鼓舞人心的领导者',
    ENFP: '竞选者 - 热情、富有创造力和社交能力',
    ISTJ: '物流师 - 实际且注重事实，可靠性强',
    ISFJ: '守卫者 - 尽职尽责的守护者，随时准备保护所爱之人',
    ESTJ: '总经理 - 出色的管理者，能够管理事物或人',
    ESFJ: '执政官 - 极有同情心、受欢迎且乐于助人',
    ISTP: '鉴赏家 - 大胆且实际的实验者',
    ISFP: '探险家 - 灵活且有魅力的艺术家',
    ESTP: '企业家 - 聪明、精力充沛，善于感知',
    ESFP: '表演者 - 自发的、精力充沛和热情的表演者',
  };

  return descriptions[code] || '未知类型';
}

/**
 * 获取维度倾向描述
 */
export function getDimensionTendency(
  dimension: 'EI' | 'SN' | 'TF' | 'JP',
  score: number
): {
  letter: string;
  name: string;
  percentage: number;
  isStrong: boolean;
} {
  const dimensionInfo = {
    EI: {
      positive: { letter: 'E', name: '外向' },
      negative: { letter: 'I', name: '内向' },
    },
    SN: {
      positive: { letter: 'S', name: '感觉' },
      negative: { letter: 'N', name: '直觉' },
    },
    TF: {
      positive: { letter: 'T', name: '思考' },
      negative: { letter: 'F', name: '情感' },
    },
    JP: {
      positive: { letter: 'J', name: '判断' },
      negative: { letter: 'P', name: '感知' },
    },
  };

  const isPositive = score >= 0;
  const info = isPositive
    ? dimensionInfo[dimension].positive
    : dimensionInfo[dimension].negative;

  const absScore = Math.abs(score);
  const maxScore = 16; // 每个维度最多 8 题，每题最多 ±2 分
  const percentage = Math.round((absScore / maxScore) * 100);
  const isStrong = percentage > 60; // 超过 60% 认为是强倾向

  return {
    letter: info.letter,
    name: info.name,
    percentage,
    isStrong,
  };
}

/**
 * 生成分享文本
 */
export function generateShareText(result: PersonalityResult, nickname?: string): string {
  const namePrefix = nickname ? `${nickname}的` : '我的';
  return `${namePrefix}MBTI人格类型是 ${result.type.code} - ${result.type.name}！${result.type.emoji}\n${result.type.description}`;
}

/**
 * 格式化百分比显示
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

/**
 * 获取倾向强度描述
 */
export function getStrengthLabel(percentage: number): string {
  if (percentage >= 80) return '非常强';
  if (percentage >= 60) return '较强';
  if (percentage >= 40) return '中等';
  if (percentage >= 20) return '较弱';
  return '微弱';
}

/**
 * 验证测试是否完成
 */
export function isTestComplete(answeredCount: number, totalQuestions: number): boolean {
  return answeredCount >= totalQuestions;
}

/**
 * 计算测试耗时（分钟）
 */
export function calculateTestDuration(startTime: number, endTime: number): number {
  return Math.round((endTime - startTime) / 1000 / 60);
}

