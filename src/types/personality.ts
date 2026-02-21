/**
 * MBTI 测试问题接口
 */
export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  reverse?: boolean;
}

/**
 * MBTI 人格类型接口
 */
export interface PersonalityType {
  code: string;
  name: string;
  description: string;
  traits: string[];
  strengths: string[];
  careers: string[];
  color: string;
  emoji: string;
}

/**
 * 用户答案接口
 */
export interface UserResponse {
  questionId: number;
  value: number; // 1-5 量表：1=非常不同意, 2=不同意, 3=中立, 4=同意, 5=非常同意
}

/**
 * MBTI 测试结果接口
 */
export interface PersonalityResult {
  type: PersonalityType;
  scores: {
    EI: number; // 正值 = 外向(E), 负值 = 内向(I)
    SN: number; // 正值 = 感觉(S), 负值 = 直觉(N)
    TF: number; // 正值 = 思考(T), 负值 = 情感(F)
    JP: number; // 正值 = 判断(J), 负值 = 感知(P)
  };
  percentages: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
}

/**
 * 测试状态接口
 */
export interface TestState {
  nickname: string;
  currentQuestionIndex: number;
  responses: UserResponse[];
  isComplete: boolean;
  result: PersonalityResult | null;
}