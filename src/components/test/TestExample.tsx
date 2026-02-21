'use client';

import { useTest } from '@/src/hooks/useTest';
import { formatPercentage, getStrengthLabel } from '@/src/lib/utils/testHelpers';

/**
 * 测试示例组件
 * 展示如何使用 MBTI 测试功能
 */
export default function TestExample() {
  const {
    nickname,
    currentQuestion,
    currentResponse,
    progress,
    canGoNext,
    canGoPrevious,
    result,
    isComplete,
    setNickname,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    completeTest,
    resetTest,
  } = useTest();

  // 如果测试完成，显示结果
  if (isComplete && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{result.type.emoji}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {result.type.code}
            </h1>
            <h2 className="text-2xl text-gray-600 mb-4">{result.type.name}</h2>
            <p className="text-gray-700">{result.type.description}</p>
          </div>

          {/* 维度得分 */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold mb-4">你的维度倾向：</h3>

            {/* E vs I */}
            <div>
              <div className="flex justify-between mb-2">
                <span>外向 (E)</span>
                <span>内向 (I)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: formatPercentage(result.percentages.E) }}
                />
              </div>
              <div className="text-sm text-gray-600 mt-1 text-center">
                {result.scores.EI >= 0 ? 'E' : 'I'}: {formatPercentage(
                  result.scores.EI >= 0 ? result.percentages.E : result.percentages.I
                )} - {getStrengthLabel(
                  result.scores.EI >= 0 ? result.percentages.E : result.percentages.I
                )}
              </div>
            </div>

            {/* S vs N */}
            <div>
              <div className="flex justify-between mb-2">
                <span>感觉 (S)</span>
                <span>直觉 (N)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: formatPercentage(result.percentages.S) }}
                />
              </div>
              <div className="text-sm text-gray-600 mt-1 text-center">
                {result.scores.SN >= 0 ? 'S' : 'N'}: {formatPercentage(
                  result.scores.SN >= 0 ? result.percentages.S : result.percentages.N
                )} - {getStrengthLabel(
                  result.scores.SN >= 0 ? result.percentages.S : result.percentages.N
                )}
              </div>
            </div>

            {/* T vs F */}
            <div>
              <div className="flex justify-between mb-2">
                <span>思考 (T)</span>
                <span>情感 (F)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width: formatPercentage(result.percentages.T) }}
                />
              </div>
              <div className="text-sm text-gray-600 mt-1 text-center">
                {result.scores.TF >= 0 ? 'T' : 'F'}: {formatPercentage(
                  result.scores.TF >= 0 ? result.percentages.T : result.percentages.F
                )} - {getStrengthLabel(
                  result.scores.TF >= 0 ? result.percentages.T : result.percentages.F
                )}
              </div>
            </div>

            {/* J vs P */}
            <div>
              <div className="flex justify-between mb-2">
                <span>判断 (J)</span>
                <span>感知 (P)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all"
                  style={{ width: formatPercentage(result.percentages.J) }}
                />
              </div>
              <div className="text-sm text-gray-600 mt-1 text-center">
                {result.scores.JP >= 0 ? 'J' : 'P'}: {formatPercentage(
                  result.scores.JP >= 0 ? result.percentages.J : result.percentages.P
                )} - {getStrengthLabel(
                  result.scores.JP >= 0 ? result.percentages.J : result.percentages.P
                )}
              </div>
            </div>
          </div>

          {/* 特质 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">主要特质：</h3>
            <div className="flex flex-wrap gap-2">
              {result.type.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* 优势 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">你的优势：</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {result.type.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>

          {/* 职业建议 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">适合的职业：</h3>
            <div className="flex flex-wrap gap-2">
              {result.type.careers.map((career) => (
                <span
                  key={career}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={resetTest}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            重新测试
          </button>
        </div>
      </div>
    );
  }

  // 如果没有昵称，显示欢迎页
  if (!nickname) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-4">MBTI 人格测试</h1>
          <p className="text-gray-600 text-center mb-8">
            通过 32 个简单问题，了解你的人格类型
          </p>
          <input
            type="text"
            placeholder="输入你的昵称"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value.trim();
                if (value) setNickname(value);
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector('input') as HTMLInputElement;
              const value = input.value.trim();
              if (value) setNickname(value);
            }}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            开始测试
          </button>
        </div>
      </div>
    );
  }

  // 显示测试问题
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>进度: {progress}%</span>
            <span>问题 {currentQuestion ? currentQuestion.id : 0} / 32</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 问题卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-semibold text-center mb-8">
            {currentQuestion?.text}
          </h2>

          {/* 答案选项 */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => {
                  if (currentQuestion) {
                    answerQuestion(currentQuestion.id, value);
                  }
                }}
                className={`w-full py-4 px-6 rounded-lg border-2 transition-all ${currentResponse === value
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {['非常不同意', '不同意', '中立', '同意', '非常同意'][value - 1]}
                  </span>
                  <span className="text-lg font-medium">{value}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="flex gap-4">
          <button
            onClick={previousQuestion}
            disabled={!canGoPrevious}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一题
          </button>

          {progress === 100 ? (
            <button
              onClick={completeTest}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              查看结果
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              disabled={!canGoNext}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一题
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

