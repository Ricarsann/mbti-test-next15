'use client';

import { useTestStore } from '@/src/stores/testStore';

/**
 * MBTI 测试自定义 Hook
 * 提供便捷的测试相关功能
 */
export function useTest() {
  const store = useTestStore();

  return {
    // 状态
    nickname: store.nickname,
    currentQuestionIndex: store.currentQuestionIndex,
    responses: store.responses,
    result: store.result,
    isComplete: store.isComplete,

    // 当前问题信息
    currentQuestion: store.getCurrentQuestion(),
    currentResponse: store.getResponseForCurrentQuestion(),
    progress: store.getProgress(),

    // 导航状态
    canGoNext: store.canGoNext(),
    canGoPrevious: store.canGoPrevious(),

    // 操作方法
    setNickname: store.setNickname,
    answerQuestion: store.answerQuestion,
    nextQuestion: store.nextQuestion,
    previousQuestion: store.previousQuestion,
    goToQuestion: store.goToQuestion,
    completeTest: store.completeTest,
    resetTest: store.resetTest,
  };
}

/**
 * 仅获取测试进度的 Hook
 */
export function useTestProgress() {
  const getProgress = useTestStore((state) => state.getProgress);
  const responses = useTestStore((state) => state.responses);
  const currentQuestionIndex = useTestStore((state) => state.currentQuestionIndex);

  return {
    progress: getProgress(),
    answeredCount: responses.length,
    currentIndex: currentQuestionIndex,
  };
}

/**
 * 仅获取测试结果的 Hook
 */
export function useTestResult() {
  const result = useTestStore((state) => state.result);
  const isComplete = useTestStore((state) => state.isComplete);
  const nickname = useTestStore((state) => state.nickname);

  return {
    result,
    isComplete,
    nickname,
  };
}

