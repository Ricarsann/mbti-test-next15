import { personalityTypes } from '@/src/data/personalityTypes';
import { questions } from '@/src/data/questions';
import type { PersonalityResult, UserResponse } from '@/src/types/personality';

/**
 * 计算 MBTI 人格类型
 * 基于用户的答案计算四个维度的得分，并返回对应的人格类型
 * 
 * @param responses 用户的答案数组
 * @returns PersonalityResult 包含人格类型和各维度得分
 */
export function calculatePersonalityType(responses: UserResponse[]): PersonalityResult {
  // 初始化各维度得分
  const dimensionScores = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };

  // 计算每个维度的原始得分
  responses.forEach((response) => {
    const question = questions.find((q) => q.id === response.questionId);
    if (!question) return;

    // 将 1-5 量表转换为 -2 到 +2 的得分
    // 1 = -2, 2 = -1, 3 = 0, 4 = 1, 5 = 2
    let score = response.value - 3;

    // 如果是反向题，反转得分
    if (question.reverse) {
      score = -score;
    }

    // 累加到对应维度
    dimensionScores[question.dimension] += score;
  });

  // 确定每个维度的类型字母
  const typeCode =
    (dimensionScores.EI >= 0 ? 'E' : 'I') +
    (dimensionScores.SN >= 0 ? 'S' : 'N') +
    (dimensionScores.TF >= 0 ? 'T' : 'F') +
    (dimensionScores.JP >= 0 ? 'J' : 'P');

  // 查找对应的人格类型
  const personalityType = personalityTypes.find((type) => type.code === typeCode);

  if (!personalityType) {
    throw new Error(`找不到人格类型: ${typeCode}`);
  }

  // 计算百分比（每个维度最多 8 个问题，最大得分为 ±16）
  const maxScore = 16;
  const percentages = calculatePercentages(dimensionScores, maxScore);

  return {
    type: personalityType,
    scores: dimensionScores,
    percentages,
  };
}

/**
 * 计算各维度的百分比
 * 
 * @param scores 原始得分
 * @param maxScore 单个维度的最大得分
 * @returns 各个维度的百分比对象
 */
function calculatePercentages(
  scores: { EI: number; SN: number; TF: number; JP: number },
  maxScore: number
): {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
} {
  const calculatePair = (score: number) => {
    const absScore = Math.abs(score);
    const percentage = Math.round((absScore / maxScore) * 100);

    if (score >= 0) {
      return { first: 50 + percentage / 2, second: 50 - percentage / 2 };
    } else {
      return { first: 50 - percentage / 2, second: 50 + percentage / 2 };
    }
  };

  const ei = calculatePair(scores.EI);
  const sn = calculatePair(scores.SN);
  const tf = calculatePair(scores.TF);
  const jp = calculatePair(scores.JP);

  return {
    E: ei.first,
    I: ei.second,
    S: sn.first,
    N: sn.second,
    T: tf.first,
    F: tf.second,
    J: jp.first,
    P: jp.second,
  };
}

/**
 * 获取维度描述
 * 
 * @param dimension 维度代码
 * @param score 得分
 * @returns 维度描述字符串
 */
export function getDimensionDescription(dimension: keyof typeof dimensionDescriptions, score: number): string {
  const isPositive = score >= 0;
  return dimensionDescriptions[dimension][isPositive ? 'positive' : 'negative'];
}

const dimensionDescriptions = {
  EI: {
    positive: '外向型 (Extraverted) - 从与他人互动中获得能量',
    negative: '内向型 (Introverted) - 从独处和内省中获得能量',
  },
  SN: {
    positive: '感觉型 (Sensing) - 关注具体事实和细节',
    negative: '直觉型 (Intuitive) - 关注整体模式和可能性',
  },
  TF: {
    positive: '思考型 (Thinking) - 基于逻辑和客观分析做决定',
    negative: '情感型 (Feeling) - 基于价值观和他人感受做决定',
  },
  JP: {
    positive: '判断型 (Judging) - 喜欢有组织和计划的生活方式',
    negative: '感知型 (Perceiving) - 喜欢灵活和自发的生活方式',
  },
};

