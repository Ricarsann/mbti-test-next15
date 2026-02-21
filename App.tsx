import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionnaireScreen } from './components/QuestionnaireScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { questions } from './data/questions';
import { calculatePersonalityType } from './utils/personalityCalculator';
import { UserResponse, PersonalityResult } from './types/personality';

type AppState = 'welcome' | 'questionnaire' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [nickname, setNickname] = useState('');
  const [result, setResult] = useState<PersonalityResult | null>(null);

  const handleStart = (userNickname: string) => {
    setNickname(userNickname);
    setAppState('questionnaire');
  };

  const handleQuestionnaireComplete = (responses: UserResponse[]) => {
    const personalityResult = calculatePersonalityType(responses);
    setResult(personalityResult);
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('welcome');
    setNickname('');
    setResult(null);
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundAnimation />
      
      {appState === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      
      {appState === 'questionnaire' && (
        <QuestionnaireScreen 
          questions={questions}
          onComplete={handleQuestionnaireComplete}
          nickname={nickname}
        />
      )}
      
      {appState === 'results' && result && (
        <ResultsScreen 
          result={result}
          nickname={nickname}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;