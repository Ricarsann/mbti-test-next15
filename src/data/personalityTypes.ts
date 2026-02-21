import type { PersonalityType } from '@/src/types/personality';

export const personalityTypes: PersonalityType[] = [
  {
    code: 'INTJ',
    name: 'The Architect',
    description: 'Independent, strategic, and ambitious. INTJs are natural leaders who can see the big picture and work methodically toward their goals.',
    traits: ['Strategic', 'Independent', 'Analytical', 'Confident', 'Determined'],
    strengths: ['Long-term planning', 'Complex problem solving', 'Independent work', 'Strategic thinking'],
    careers: ['Software Engineer', 'Scientist', 'Architect', 'Strategic Planner', 'Researcher'],
    color: '#4C1D95',
    emoji: '🏛️'
  },
  {
    code: 'INTP',
    name: 'The Logician',
    description: 'Innovative, curious, and intellectually playful. INTPs are driven by a desire to understand and explain complex ideas.',
    traits: ['Analytical', 'Curious', 'Flexible', 'Independent', 'Logical'],
    strengths: ['Theoretical thinking', 'Innovation', 'Adaptability', 'Problem analysis'],
    careers: ['Researcher', 'Programmer', 'Philosopher', 'Scientist', 'Writer'],
    color: '#7C2D12',
    emoji: '🔬'
  },
  {
    code: 'ENTJ',
    name: 'The Commander',
    description: 'Bold, imaginative, and strong-willed leaders. ENTJs are natural born leaders who can organize people and resources to achieve their vision.',
    traits: ['Confident', 'Strategic', 'Charismatic', 'Efficient', 'Strong-willed'],
    strengths: ['Leadership', 'Strategic planning', 'Decision making', 'Organization'],
    careers: ['CEO', 'Manager', 'Entrepreneur', 'Lawyer', 'Consultant'],
    color: '#991B1B',
    emoji: '👑'
  },
  {
    code: 'ENTP',
    name: 'The Debater',
    description: 'Smart, curious, and able to argue either side of an issue. ENTPs are inspired innovators who love intellectual challenges.',
    traits: ['Innovative', 'Enthusiastic', 'Curious', 'Versatile', 'Clever'],
    strengths: ['Innovation', 'Brainstorming', 'Networking', 'Adaptability'],
    careers: ['Inventor', 'Journalist', 'Entrepreneur', 'Consultant', 'Marketer'],
    color: '#DC2626',
    emoji: '💡'
  },
  {
    code: 'INFJ',
    name: 'The Advocate',
    description: 'Creative, insightful, and passionate about helping others. INFJs are idealists who want to make a positive impact on the world.',
    traits: ['Insightful', 'Idealistic', 'Organized', 'Passionate', 'Altruistic'],
    strengths: ['Empathy', 'Long-term vision', 'Creativity', 'Dedication'],
    careers: ['Counselor', 'Writer', 'Teacher', 'Psychologist', 'Social Worker'],
    color: '#059669',
    emoji: '🌟'
  },
  {
    code: 'INFP',
    name: 'The Mediator',
    description: 'Poetic, kind, and altruistic. INFPs are guided by their values and always looking for ways to help humanity.',
    traits: ['Idealistic', 'Empathetic', 'Creative', 'Passionate', 'Adaptable'],
    strengths: ['Creativity', 'Empathy', 'Authenticity', 'Flexibility'],
    careers: ['Artist', 'Writer', 'Counselor', 'Musician', 'Psychologist'],
    color: '#0D9488',
    emoji: '🎨'
  },
  {
    code: 'ENFJ',
    name: 'The Protagonist',
    description: 'Charismatic and inspiring leaders who are passionate about helping others reach their potential.',
    traits: ['Charismatic', 'Altruistic', 'Reliable', 'Natural leader', 'Tolerant'],
    strengths: ['Leadership', 'Communication', 'Empathy', 'Organization'],
    careers: ['Teacher', 'Counselor', 'Coach', 'Politician', 'HR Manager'],
    color: '#0891B2',
    emoji: '🤝'
  },
  {
    code: 'ENFP',
    name: 'The Campaigner',
    description: 'Enthusiastic, creative, and sociable free spirits who can find reason to smile in every situation.',
    traits: ['Enthusiastic', 'Creative', 'Sociable', 'Energetic', 'Independent'],
    strengths: ['Enthusiasm', 'Creativity', 'People skills', 'Adaptability'],
    careers: ['Journalist', 'Actor', 'Entrepreneur', 'Counselor', 'Teacher'],
    color: '#2563EB',
    emoji: '🎭'
  },
  {
    code: 'ISTJ',
    name: 'The Logistician',
    description: 'Practical and fact-minded, reliable and responsible. ISTJs are steady, productive contributors.',
    traits: ['Responsible', 'Organized', 'Practical', 'Fact-minded', 'Reliable'],
    strengths: ['Organization', 'Reliability', 'Attention to detail', 'Persistence'],
    careers: ['Accountant', 'Administrator', 'Engineer', 'Lawyer', 'Doctor'],
    color: '#7C3AED',
    emoji: '📊'
  },
  {
    code: 'ISFJ',
    name: 'The Protector',
    description: 'Warm-hearted and dedicated, always ready to protect loved ones. ISFJs are natural caregivers.',
    traits: ['Supportive', 'Reliable', 'Patient', 'Imaginative', 'Observant'],
    strengths: ['Supportiveness', 'Reliability', 'Observation', 'Practical skills'],
    careers: ['Nurse', 'Teacher', 'Administrator', 'Counselor', 'Social Worker'],
    color: '#9333EA',
    emoji: '🛡️'
  },
  {
    code: 'ESTJ',
    name: 'The Executive',
    description: 'Excellent administrators, unsurpassed at managing things or people. ESTJs are natural organizers.',
    traits: ['Organized', 'Practical', 'Realistic', 'Decisive', 'Quick to judge'],
    strengths: ['Leadership', 'Organization', 'Reliability', 'Efficiency'],
    careers: ['Manager', 'Administrator', 'Judge', 'Teacher', 'Banker'],
    color: '#C026D3',
    emoji: '📋'
  },
  {
    code: 'ESFJ',
    name: 'The Consul',
    description: 'Extraordinarily caring, social, and popular people, always eager to help others.',
    traits: ['Caring', 'Social', 'Popular', 'Dutiful', 'Sensitive'],
    strengths: ['People skills', 'Supportiveness', 'Reliability', 'Practical skills'],
    careers: ['Teacher', 'Nurse', 'Administrator', 'Counselor', 'Social Worker'],
    color: '#DB2777',
    emoji: '🤗'
  },
  {
    code: 'ISTP',
    name: 'The Virtuoso',
    description: 'Bold and practical experimenters, masters of all kinds of tools. ISTPs are natural troubleshooters.',
    traits: ['Practical', 'Factual', 'Realistic', 'Adaptable', 'Private'],
    strengths: ['Problem solving', 'Practicality', 'Adaptability', 'Technical skills'],
    careers: ['Mechanic', 'Engineer', 'Pilot', 'Paramedic', 'Detective'],
    color: '#E11D48',
    emoji: '🔧'
  },
  {
    code: 'ISFP',
    name: 'The Adventurer',
    description: 'Flexible and charming artists, always ready to explore new possibilities. ISFPs are gentle caretakers.',
    traits: ['Gentle', 'Caring', 'Realistic', 'Loyal', 'Flexible'],
    strengths: ['Creativity', 'Flexibility', 'Empathy', 'Practicality'],
    careers: ['Artist', 'Musician', 'Designer', 'Counselor', 'Teacher'],
    color: '#F59E0B',
    emoji: '🎪'
  },
  {
    code: 'ESTP',
    name: 'The Entrepreneur',
    description: 'Smart, energetic, and perceptive people who truly enjoy living on the edge.',
    traits: ['Energetic', 'Perceptive', 'Spontaneous', 'Practical', 'Resourceful'],
    strengths: ['Adaptability', 'Practicality', 'People skills', 'Spontaneity'],
    careers: ['Entrepreneur', 'Paramedic', 'Sales Rep', 'Detective', 'Actor'],
    color: '#EAB308',
    emoji: '🏄'
  },
  {
    code: 'ESFP',
    name: 'The Entertainer',
    description: 'Spontaneous, energetic, and enthusiastic people who love to entertain and inspire others.',
    traits: ['Spontaneous', 'Enthusiastic', 'Friendly', 'Accepting', 'Exuberant'],
    strengths: ['People skills', 'Enthusiasm', 'Spontaneity', 'Practicality'],
    careers: ['Actor', 'Musician', 'Teacher', 'Counselor', 'Social Worker'],
    color: '#84CC16',
    emoji: '🎉'
  }
];