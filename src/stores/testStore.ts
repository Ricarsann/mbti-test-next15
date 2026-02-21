'use client';

import { questions } from '@/src/data/questions';
import { calculatePersonalityType } from '@/src/lib/personalityCalculator';
import type { PersonalityResult, UserResponse } from '@/src/types/personality';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * MBTI 测试状态接口
 */
interface TestState {
  // 基本信息
  nickname: string;
  setNickname: (nickname: string) => void;

  // 测试进度
  currentQuestionIndex: number;
  responses: UserResponse[];

  // 测试结果
  result: PersonalityResult | null;
  isComplete: boolean;

  // 操作方法
  answerQuestion: (questionId: number, value: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  completeTest: () => void;
  resetTest: () => void;

  // 辅助方法
  getProgress: () => number;
  canGoNext: () => boolean;
  canGoPrevious: () => boolean;
  getCurrentQuestion: () => typeof questions[number] | null;
  getResponseForCurrentQuestion: () => number | null;
}

/**
 * MBTI 测试状态管理 Store
 * 使用 Zustand 进行状态管理，并持久化到 localStorage
 */
export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      // 初始状态
      nickname: '',
      currentQuestionIndex: 0,
      responses: [],
      result: null,
      isComplete: false,

      // 设置昵称
      setNickname: (nickname: string) => {
        set({ nickname });
      },

      // 回答问题
      answerQuestion: (questionId: number, value: number) => {
        set((state) => {
          const existingIndex = state.responses.findIndex(
            (r) => r.questionId === questionId
          );

          let newResponses: UserResponse[];
          if (existingIndex >= 0) {
            // 更新已有答案
            newResponses = [...state.responses];
            newResponses[existingIndex] = { questionId, value };
          } else {
            // 添加新答案
            newResponses = [...state.responses, { questionId, value }];
          }

          return { responses: newResponses };
        });
      },

      // 下一题
      nextQuestion: () => {
        set((state) => {
          const nextIndex = state.currentQuestionIndex + 1;
          if (nextIndex < questions.length) {
            return { currentQuestionIndex: nextIndex };
          }
          return state;
        });
      },

      // 上一题
      previousQuestion: () => {
        set((state) => {
          const prevIndex = state.currentQuestionIndex - 1;
          if (prevIndex >= 0) {
            return { currentQuestionIndex: prevIndex };
          }
          return state;
        });
      },

      // 跳转到指定问题
      goToQuestion: (index: number) => {
        if (index >= 0 && index < questions.length) {
          set({ currentQuestionIndex: index });
        }
      },

      // 完成测试
      completeTest: () => {
        const { responses } = get();

        if (responses.length < questions.length) {
          console.warn('未完成所有问题');
          return;
        }

        const result = calculatePersonalityType(responses);
        set({ result, isComplete: true });
      },

      // 重置测试
      resetTest: () => {
        set({
          nickname: '',
          currentQuestionIndex: 0,
          responses: [],
          result: null,
          isComplete: false,
        });
      },

      // 获取进度百分比
      getProgress: () => {
        const { responses } = get();
        return Math.round((responses.length / questions.length) * 100);
      },

      // 是否可以下一题
      canGoNext: () => {
        const { currentQuestionIndex } = get();
        return currentQuestionIndex < questions.length - 1;
      },

      // 是否可以上一题
      canGoPrevious: () => {
        const { currentQuestionIndex } = get();
        return currentQuestionIndex > 0;
      },

      // 获取当前问题
      getCurrentQuestion: () => {
        const { currentQuestionIndex } = get();
        return questions[currentQuestionIndex] || null;
      },

      // 获取当前问题的答案
      getResponseForCurrentQuestion: () => {
        const { currentQuestionIndex, responses } = get();
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) return null;

        const response = responses.find((r) => r.questionId === currentQuestion.id);
        return response?.value ?? null;
      },
    }),
    {
      name: 'mbti-test-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // 只持久化必要的状态
      partialize: (state) => ({
        nickname: state.nickname,
        currentQuestionIndex: state.currentQuestionIndex,
        responses: state.responses,
        result: state.result,
        isComplete: state.isComplete,
      }),
    }
  )
);

