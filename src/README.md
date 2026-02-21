# MBTI 测试项目 - 文件结构说明

## 📁 目录结构

```
src/
├── data/                          # 静态数据文件
│   ├── personalityTypes.ts        # 16种MBTI人格类型的详细描述
│   └── questions.ts                # 32个测试问题（每个维度8题）
│
├── types/                          # TypeScript 类型定义
│   └── personality.ts              # MBTI相关的所有类型接口
│
├── lib/                            # 核心逻辑和工具函数
│   ├── personalityCalculator.ts   # MBTI评分算法
│   └── utils/
│       └── testHelpers.ts          # 测试相关的辅助函数
│
├── stores/                         # Zustand 状态管理
│   └── testStore.ts                # 测试状态管理 store
│
├── hooks/                          # 自定义 React Hooks
│   └── useTest.ts                  # 测试相关的 hooks
│
└── components/                     # React 组件（待创建）
    └── test/                       # 测试相关组件
```

## 🎯 核心文件说明

### 1. 数据层 (`src/data/`)

#### `personalityTypes.ts`
- **用途**: 存储16种MBTI人格类型的详细信息
- **内容**: 每个类型包含代码、名称、描述、特质、优势、职业建议、颜色和表情符号
- **示例**: INTJ - The Architect

#### `questions.ts`
- **用途**: 存储MBTI测试的所有问题
- **结构**: 32个问题，每个维度（E/I, S/N, T/F, J/P）8个问题
- **特性**: 支持反向计分（reverse 字段）

### 2. 类型定义 (`src/types/`)

#### `personality.ts`
定义了以下核心接口：
- `Question`: 测试问题接口
- `PersonalityType`: 人格类型接口
- `UserResponse`: 用户答案接口
- `PersonalityResult`: 测试结果接口（包含分数和百分比）
- `TestState`: 测试状态接口

### 3. 核心逻辑 (`src/lib/`)

#### `personalityCalculator.ts`
**主要函数**:
- `calculatePersonalityType()`: 计算MBTI类型的核心算法
  - 输入: 用户答案数组
  - 输出: PersonalityResult（包含类型和各维度得分）
  - 算法: 
    1. 将1-5量表转换为-2到+2的得分
    2. 处理反向题
    3. 计算各维度总分
    4. 确定四个字母代码
    5. 计算百分比

- `getDimensionDescription()`: 获取维度的文字描述

#### `utils/testHelpers.ts`
**辅助函数**:
- `getTypeShortDescription()`: 获取人格类型简短描述
- `getDimensionTendency()`: 获取维度倾向详情
- `generateShareText()`: 生成分享文本
- `formatPercentage()`: 格式化百分比
- `getStrengthLabel()`: 获取倾向强度标签
- `isTestComplete()`: 验证测试完成状态
- `calculateTestDuration()`: 计算测试耗时

### 4. 状态管理 (`src/stores/`)

#### `testStore.ts`
使用 Zustand 管理全局测试状态，包括：

**状态**:
- `nickname`: 用户昵称
- `currentQuestionIndex`: 当前问题索引
- `responses`: 用户答案数组
- `result`: 测试结果
- `isComplete`: 是否完成

**方法**:
- `setNickname()`: 设置昵称
- `answerQuestion()`: 回答问题
- `nextQuestion()`: 下一题
- `previousQuestion()`: 上一题
- `goToQuestion()`: 跳转到指定题目
- `completeTest()`: 完成测试并计算结果
- `resetTest()`: 重置测试
- `getProgress()`: 获取进度
- `canGoNext()` / `canGoPrevious()`: 导航状态
- `getCurrentQuestion()`: 获取当前问题
- `getResponseForCurrentQuestion()`: 获取当前答案

**特性**:
- ✅ 使用 localStorage 持久化存储
- ✅ 自动保存测试进度
- ✅ 刷新页面后可恢复状态

### 5. Hooks (`src/hooks/`)

#### `useTest.ts`
提供三个自定义 Hook:

1. **`useTest()`**: 完整的测试功能
   - 包含所有状态和方法
   - 适用于测试主界面

2. **`useTestProgress()`**: 仅进度相关
   - 优化性能，只订阅进度相关状态
   - 适用于进度条组件

3. **`useTestResult()`**: 仅结果相关
   - 适用于结果展示页面

## 🔧 使用方法

### 1. 在组件中使用 Hook

```tsx
'use client';

import { useTest } from '@/src/hooks/useTest';

export default function TestPage() {
  const {
    currentQuestion,
    currentResponse,
    progress,
    answerQuestion,
    nextQuestion,
  } = useTest();

  return (
    <div>
      <p>进度: {progress}%</p>
      <h2>{currentQuestion?.text}</h2>
      {/* 答案选项 */}
    </div>
  );
}
```

### 2. 直接使用 Store

```tsx
'use client';

import { useTestStore } from '@/src/stores/testStore';

export default function ProgressBar() {
  const progress = useTestStore((state) => state.getProgress());
  return <div className="w-full h-2 bg-gray-200">
    <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
  </div>;
}
```

### 3. 计算结果

```tsx
import { calculatePersonalityType } from '@/src/lib/personalityCalculator';

const responses = [/* 用户答案 */];
const result = calculatePersonalityType(responses);
console.log(result.type.code); // 例如: "INTJ"
```

## 📊 评分算法说明

### 量表转换
- 1分 (非常不同意) → -2
- 2分 (不同意) → -1
- 3分 (中立) → 0
- 4分 (同意) → +1
- 5分 (非常同意) → +2

### 反向题处理
带有 `reverse: true` 的题目，得分会反转

### 维度判定
- **E vs I**: 得分 ≥ 0 → E (外向), < 0 → I (内向)
- **S vs N**: 得分 ≥ 0 → S (感觉), < 0 → N (直觉)
- **T vs F**: 得分 ≥ 0 → T (思考), < 0 → F (情感)
- **J vs P**: 得分 ≥ 0 → J (判断), < 0 → P (感知)

### 百分比计算
每个维度最多8题，最大得分为 ±16
百分比 = (|得分| / 16) × 100

## 🚀 下一步开发

### 需要创建的组件
1. **WelcomeScreen**: 欢迎页面（输入昵称）
2. **QuestionnaireScreen**: 问卷界面
3. **ProgressBar**: 进度条
4. **QuestionCard**: 问题卡片
5. **AnswerOptions**: 答案选项（1-5量表）
6. **ResultsScreen**: 结果展示页面
7. **DimensionChart**: 维度图表
8. **ShareButtons**: 分享按钮

### 推荐的页面路由
```
/                         - 欢迎页
/test                     - 测试页面
/results                  - 结果页面
/types/[code]            - 各类型详情页
```

## 🎨 集成建议

1. **Next.js 15 App Router**
   - 使用 `'use client'` 指令标记客户端组件
   - 测试相关组件都需要客户端渲染

2. **Tailwind CSS**
   - 使用现有的主题颜色
   - 参考 16personalities.com 的设计风格

3. **国际化 (i18n)**
   - 问题文本可以使用 next-intl
   - 人格类型描述支持多语言

4. **性能优化**
   - 使用 Zustand 的选择器避免不必要的重渲染
   - 大型组件使用 React.lazy 懒加载

## 📝 注意事项

1. ✅ 所有核心逻辑已完成
2. ✅ 使用 `@/` 别名导入
3. ✅ 完整的 TypeScript 类型支持
4. ✅ 状态持久化到 localStorage
5. ⏳ UI 组件待开发
6. ⏳ 页面路由待创建

---

**版本**: 1.0.0  
**最后更新**: 2025-10-07

