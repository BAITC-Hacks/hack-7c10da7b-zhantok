import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const STORAGE_KEY = 'musicedu-ai-state-ru-v8';

const criteria = [
  { key: 'contextNeed', label: 'Контекст и потребность', weight: 20 },
  { key: 'materials', label: 'Данные и материалы', weight: 20 },
  { key: 'expectedResult', label: 'Ожидаемый результат', weight: 15 },
  { key: 'successCriteria', label: 'Критерии успеха', weight: 15 },
  { key: 'constraints', label: 'Ограничения', weight: 10 },
  { key: 'targetUsers', label: 'Пользователи', weight: 10 },
  { key: 'contact', label: 'Связь с бизнесом', weight: 10 },
];

const emptyTask = {
  title: '',
  theme: 'Домбыра',
  context: '',
  need: '',
  targetUsers: '',
  materials: '',
  expectedResult: '',
  successCriteria: '',
  constraints: '',
  interactionFormat: '',
  contact: '',
};

const emptyProposal = {
  idea: 'Создать интерактивный прототип с заданиями по домбре, баллами и понятным прогрессом для ученика.',
  plan: '1. Уточнить сценарий урока. 2. Собрать карточки упражнений. 3. Сделать прототип интерфейса. 4. Проверить с преподавателем.',
  timeframe: '7 дней',
  prototypeLink: 'https://example.com/demo-prototype',
};

const demoTeams = [
  {
    id: 'team-1',
    name: 'MusicTech KZ',
    members: '3 студента',
    interests: 'Музыкальное образование, домбыра, мотивация учеников',
    skills: 'Разработка, ИИ, UX',
    technologies: 'React, JavaScript, CSS',
  },
  {
    id: 'team-2',
    name: 'Лаборатория домбры',
    members: '4 студента',
    interests: 'Казахская музыка, геймификация, практика домбры',
    skills: 'Геймификация, веб-разработка, дизайн интерфейсов',
    technologies: 'React, Vite, локальное хранилище',
  },
  {
    id: 'team-3',
    name: 'Алем Саунд',
    members: '2 студента',
    interests: 'Музыкальная теория, слух, образовательные продукты',
    skills: 'Музыкальная теория, прототипирование, методика обучения',
    technologies: 'JavaScript, HTML, CSS',
  },
  {
    id: 'team-4',
    name: 'РитмLab',
    members: '3 студента',
    interests: 'Ритм, игры, обучение через практику',
    skills: 'Игровые механики, интерфейсы, музыкальный ритм',
    technologies: 'React, Canvas-эскизы, CSS',
  },
  {
    id: 'team-5',
    name: 'Qobyz Code',
    members: '5 студентов',
    interests: 'Образовательные платформы, доступные инструменты для учителей',
    skills: 'Тестирование, фронтенд, исследование пользователей',
    technologies: 'Vite, React, JavaScript',
  },
];

const demoChallenges = [
  {
    id: 'demo-1',
    title: 'Помощник для регулярной практики домбры',
    theme: 'Домбыра',
    context: 'Начинающие ученики домбры часто теряют мотивацию между уроками и нерегулярно выполняют домашние упражнения.',
    need: 'Нужен понятный способ поддерживать регулярную практику и показывать ученику маленький прогресс каждый день.',
    targetUsers: 'Ученики домбры 10-16 лет, преподаватели музыкальных школ и родители, которые помогают с домашней практикой.',
    materials: 'Учебные упражнения по домбре, ритмические схемы, короткие аудиопримеры, заметки преподавателя и демо-журнал практики.',
    expectedResult: 'Веб-прототип помощника, который превращает домашнюю практику в короткие задания с прогрессом и подсказками.',
    successCriteria: 'Ученик выполняет минимум три занятия в неделю, видит понятный прогресс, а преподаватель может оценить регулярность практики.',
    constraints: 'Прототип должен работать в браузере, использовать только синтетические данные и не требовать регистрации учеников.',
    interactionFormat: 'Команда показывает прототип бизнесу, получает ручную обратную связь и дорабатывает карточки упражнений.',
    contact: 'Преподаватель домбры вручную проверяет предложения команд и дает обратную связь один раз в неделю.',
    published: true,
  },
  {
    id: 'demo-2',
    title: 'ИИ-тренер по музыкальной теории',
    theme: 'Музыкальная теория',
    context: 'Ученикам сложно связывать ноты, интервалы и базовые термины музыкальной теории с реальными упражнениями.',
    need: 'Нужен тренажер, который объясняет простые темы понятным языком и помогает преподавателю быстро готовить вопросы.',
    targetUsers: 'Начинающие ученики музыкальной школы, которые изучают домбру, фортепиано или сольфеджио.',
    materials: 'Список базовых тем, примеры вопросов, простые нотные фрагменты и объяснения преподавателя.',
    expectedResult: 'Интерактивный тренажер с короткими вопросами, объяснениями ответов и возможностью редактировать задания.',
    successCriteria: 'После двух тренировок ученик правильно отвечает минимум на 8 из 10 базовых вопросов.',
    constraints: 'Не использовать реальные персональные данные учеников и не подключать внешний ИИ в прототипе.',
    interactionFormat: 'Преподаватель проверяет набор вопросов перед демонстрацией ученикам.',
    contact: 'Методист музыкальной школы проверяет качество вопросов перед использованием на занятии.',
    published: true,
  },
  {
    id: 'demo-3',
    title: 'Игра для развития чувства ритма',
    theme: 'Ритм',
    context: 'Ученики понимают мелодию, но часто сбиваются в ритме при игре на домбре или фортепиано.',
    need: 'Нужен игровой формат, который делает повторение ритма коротким, понятным и мотивирующим.',
    targetUsers: 'Дети 8-14 лет, которые только начинают изучать музыкальный инструмент.',
    materials: 'Набор ритмических рисунков, хлопки, счет вслух, простые упражнения преподавателя.',
    expectedResult: 'Игровой прототип, где ученик повторяет ритм, получает баллы и открывает новые уровни сложности.',
    successCriteria: 'Ученик проходит три ритмических уровня и демонстрирует более стабильный счет на уроке.',
    constraints: 'Без распознавания звука; оценка в демо может быть кнопочной или визуальной.',
    interactionFormat: 'Команда демонстрирует игру преподавателю и получает ручную оценку удобства.',
    contact: 'Преподаватель вручную подтверждает, подходит ли игра для уроков.',
    published: true,
  },
  {
    id: 'demo-4',
    title: 'Помощник для начинающих пианистов',
    theme: 'Фортепиано',
    context: 'Начинающие пианисты забывают последовательность упражнений и не понимают, что практиковать дома в первую очередь.',
    need: 'Нужен простой план домашней практики, чтобы ученик видел очередность заданий и не терялся после урока.',
    targetUsers: 'Ученики первого года обучения на фортепиано и их преподаватели.',
    materials: 'Домашние задания, список гамм, короткие методические заметки и синтетические записи прогресса.',
    expectedResult: 'Прототип личного плана практики с небольшими ежедневными заданиями и отметками выполнения.',
    successCriteria: 'Ученик понимает план занятия и выполняет упражнения без дополнительных объяснений родителей.',
    constraints: 'Без сложной авторизации, без календаря и без хранения реальных файлов.',
    interactionFormat: 'Преподаватель вручную редактирует задания и проверяет предложенный порядок практики.',
    contact: 'Преподаватель фортепиано проверяет карточки заданий и принимает предложения команд вручную.',
    published: true,
  },
  {
    id: 'demo-5',
    title: 'Тренажёр развития музыкального слуха',
    theme: 'Музыкальный слух',
    context: 'Ученикам нужно больше коротких упражнений на распознавание высоты звука, направления мелодии и простых интервалов.',
    need: 'Нужен доступный тренажер, который помогает ученику регулярно повторять слуховые упражнения между уроками.',
    targetUsers: 'Начинающие музыканты, которые изучают домбру, вокал или фортепиано.',
    materials: 'Синтетические примеры упражнений, список интервалов и базовые рекомендации преподавателя.',
    expectedResult: 'Веб-тренажер с карточками для слухового анализа и простыми объяснениями после ответа.',
    successCriteria: 'Ученик регулярно выполняет задания и улучшает точность ответов по сравнению с первой попыткой.',
    constraints: 'В прототипе не реализуется распознавание высоты звука и автоматический анализ живого исполнения.',
    interactionFormat: 'Команда показывает сценарий преподавателю, а преподаватель вручную оценивает педагогическую пользу.',
    contact: 'Бизнес-заказчик и преподаватель музыки совместно принимают или отклоняют предложения команд.',
    published: true,
  },
];

const demoProposals = [
  {
    id: 'proposal-1',
    challengeId: 'demo-1',
    teamId: 'team-1',
    teamName: 'MusicTech KZ',
    members: '3 студента',
    interests: 'Музыкальное образование, домбыра, мотивация учеников',
    skills: 'Разработка, ИИ, UX',
    technologies: 'React, JavaScript, CSS',
    idea: 'Создать веб-прототип с ежедневными заданиями по домбре, визуальным прогрессом, баллами и подсказками преподавателя.',
    plan: 'Сначала собрать упражнения, затем сделать карточки практики, после этого показать прототип преподавателю.',
    timeframe: '7 дней',
    prototypeLink: 'https://example.com/musicedu-dombyra',
    status: 'Ожидает решения',
  },
  {
    id: 'proposal-2',
    challengeId: 'demo-2',
    teamId: 'team-3',
    teamName: 'Алем Саунд',
    members: '2 студента',
    interests: 'Музыкальная теория, слух, образовательные продукты',
    skills: 'Музыкальная теория, прототипирование, методика обучения',
    technologies: 'JavaScript, HTML, CSS',
    idea: 'Сделать тренажер с короткими вопросами по теории и понятными объяснениями после ответа.',
    plan: 'Подготовить темы, собрать демо-вопросы, сделать экран тренировки и экран результата.',
    timeframe: '5 дней',
    prototypeLink: 'https://example.com/theory-trainer',
    status: 'Ожидает решения',
  },
  {
    id: 'proposal-3',
    challengeId: 'demo-3',
    teamId: 'team-2',
    teamName: 'Лаборатория домбры',
    members: '4 студента',
    interests: 'Казахская музыка, геймификация, практика домбры',
    skills: 'Геймификация, веб-разработка, дизайн интерфейсов',
    technologies: 'React, Vite, локальное хранилище',
    idea: 'Разработать игру с ритмическими уровнями, карточками упражнений и простым механизмом начисления очков.',
    plan: 'Сделать три уровня, добавить баллы, подготовить демо-ритмы и провести ручную проверку с преподавателем.',
    timeframe: '10 дней',
    prototypeLink: 'https://example.com/rhythm-game',
    status: 'Ожидает решения',
  },
  {
    id: 'proposal-4',
    challengeId: 'demo-4',
    teamId: 'team-5',
    teamName: 'Qobyz Code',
    members: '5 студентов',
    interests: 'Образовательные платформы, доступные инструменты для учителей',
    skills: 'Тестирование, фронтенд, исследование пользователей',
    technologies: 'Vite, React, JavaScript',
    idea: 'Создать личный план практики для начинающего пианиста с ежедневными заданиями и отметками выполнения.',
    plan: 'Описать сценарий, собрать карточки упражнений, сделать прототип плана и проверить навигацию.',
    timeframe: '8 дней',
    prototypeLink: 'https://example.com/piano-plan',
    status: 'Принято',
  },
  {
    id: 'proposal-5',
    challengeId: 'demo-5',
    teamId: 'team-4',
    teamName: 'РитмLab',
    members: '3 студента',
    interests: 'Ритм, игры, обучение через практику',
    skills: 'Игровые механики, интерфейсы, музыкальный ритм',
    technologies: 'React, Canvas-эскизы, CSS',
    idea: 'Сделать карточный тренажер для музыкального слуха с короткими заданиями и объяснениями.',
    plan: 'Собрать упражнения, сделать экран карточки, добавить результат и подготовить демонстрационный набор.',
    timeframe: '6 дней',
    prototypeLink: 'https://example.com/ear-training',
    status: 'Отклонено',
  },
];

function normalizeText(text) {
  return String(text || '').trim().replace(/\s+/g, ' ');
}

function fieldScore(text, weight) {
  const length = normalizeText(text).length;
  if (length === 0) return 0;
  if (length < 60) return Math.round(weight * 0.4);
  if (length < 120) return Math.round(weight * 0.6);
  if (length < 180) return Math.round(weight * 0.8);
  return weight;
}

function needsImprovement(text) {
  return normalizeText(text).length < 70;
}

function getCriterionText(task, key) {
  if (key === 'contextNeed') return `${task.context || ''} ${task.need || ''}`;
  return task[key] || '';
}

function calculateScore(task) {
  const breakdown = criteria.map((criterion) => ({
    ...criterion,
    earned: fieldScore(getCriterionText(task, criterion.key), criterion.weight),
  }));

  return {
    total: breakdown.reduce((sum, item) => sum + item.earned, 0),
    breakdown,
  };
}

function getLevel(score) {
  if (score >= 90) return 'Приоритетная задача';
  if (score >= 70) return 'Готово';
  if (score >= 40) return 'В работе';
  return 'Черновик';
}

function levelClass(score) {
  if (score >= 90) return 'priority';
  if (score >= 70) return 'ready';
  if (score >= 40) return 'working';
  return 'draft';
}

function statusClass(status) {
  if (status === 'Принято') return 'accepted';
  if (status === 'Отклонено') return 'rejected';
  return 'pending';
}

function initialState() {
  return {
    challenges: demoChallenges,
    proposals: demoProposals,
    teams: demoTeams,
  };
}

function inferTheme(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  if (text.includes('ритм')) return 'Ритм';
  if (text.includes('теори')) return 'Музыкальная теория';
  if (text.includes('пиан') || text.includes('фортепиано')) return 'Фортепиано';
  if (text.includes('слух')) return 'Музыкальный слух';
  return 'Домбыра';
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.challenges && saved?.proposals && saved?.teams) return saved;
  } catch {
    return null;
  }

  return initialState();
}

function isValidTaskCard(card) {
  return Boolean(card && typeof card === 'object' && 'title' in card && 'context' in card);
}

function getMissingInfo(task) {
  const missing = [];
  const score = calculateScore(task);

  if ((score.breakdown.find((item) => item.key === 'contextNeed')?.earned || 0) < 20) {
    missing.push('Уточните контекст и потребность');
  }
  if ((score.breakdown.find((item) => item.key === 'materials')?.earned || 0) < 20) {
    missing.push('Укажите доступные материалы');
  }
  if ((score.breakdown.find((item) => item.key === 'expectedResult')?.earned || 0) < 15) {
    missing.push('Опишите ожидаемый результат');
  }
  if ((score.breakdown.find((item) => item.key === 'successCriteria')?.earned || 0) < 15) {
    missing.push('Добавьте критерии успеха');
  }
  if ((score.breakdown.find((item) => item.key === 'constraints')?.earned || 0) < 10) {
    missing.push('Уточните ограничения');
  }
  if ((score.breakdown.find((item) => item.key === 'targetUsers')?.earned || 0) < 10) {
    missing.push('Опишите пользователей');
  }
  if ((score.breakdown.find((item) => item.key === 'contact')?.earned || 0) < 10) {
    missing.push('Укажите формат обратной связи');
  }
  if (needsImprovement(task.interactionFormat)) {
    missing.push('Укажите формат взаимодействия');
  }

  return missing;
}

function generateQuestions() {
  return [
    'Кто является целевой аудиторией?',
    'Какие учебные материалы или данные доступны?',
    'Какой результат должна обеспечить разработка?',
    'Какие есть ограничения?',
  ];
}

function generateTaskCard(draft, answers) {
  return {
    title: draft.title || 'Практическая задача по домбре',
    theme: inferTheme(draft.title, draft.description),
    context: draft.description,
    need: '',
    targetUsers: answers[0] || '',
    materials: answers[1] || '',
    expectedResult: answers[2] || '',
    successCriteria: '',
    constraints: answers[3] || '',
    interactionFormat: '',
    contact: '',
  };
}

function improveTask(task) {
  return {
    ...task,
    title: task.title || 'Помощник для регулярной практики домбры',
    theme: task.theme || 'Домбыра',
    context: needsImprovement(task.context)
      ? 'Демо-предложение ИИ: начинающим ученикам домбры нужен понятный цифровой помощник, который поддерживает регулярную домашнюю практику между уроками и помогает преподавателю видеть прогресс.'
      : task.context,
    need: needsImprovement(task.need)
      ? 'Демо-предложение ИИ: повысить регулярность домашних занятий и дать ученику понятные маленькие шаги для самостоятельной практики.'
      : task.need,
    targetUsers: needsImprovement(task.targetUsers)
      ? 'Демо-предложение ИИ: ученики домбры 10-16 лет, преподаватели музыкальных школ и родители, которые помогают контролировать домашнюю практику.'
      : task.targetUsers,
    materials: needsImprovement(task.materials)
      ? 'Демо-предложение ИИ: упражнения по домбре, ритмические схемы, короткие аудиопримеры, заметки преподавателя и синтетический журнал занятий.'
      : task.materials,
    expectedResult: needsImprovement(task.expectedResult)
      ? 'Демо-предложение ИИ: веб-прототип с карточками упражнений, баллами, прогрессом и подсказками для регулярной домашней практики.'
      : task.expectedResult,
    successCriteria: needsImprovement(task.successCriteria)
      ? 'Демо-предложение ИИ: ученик выполняет минимум три занятия в неделю, понимает следующее упражнение и показывает более стабильный прогресс на уроке.'
      : task.successCriteria,
    constraints: needsImprovement(task.constraints)
      ? 'Демо-предложение ИИ: только браузерный прототип, без реальных персональных данных, без внешнего ИИ и без автоматического назначения команд.'
      : task.constraints,
    interactionFormat: needsImprovement(task.interactionFormat)
      ? 'Демо-предложение ИИ: команда показывает прототип бизнесу, получает ручную обратную связь и дорабатывает карточку задачи.'
      : task.interactionFormat,
    contact: needsImprovement(task.contact)
      ? 'Демо: преподаватель отвечает вручную.'
      : task.contact,
  };
}

function App() {
  const [screen, setScreen] = useState('home');
  const [state, setState] = useState(loadState);
  const [draft, setDraft] = useState({
    title: 'Помощник для регулярной практики домбры',
    description: 'Хочу помочь ученикам домбры больше заниматься дома.',
  });
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [task, setTask] = useState(emptyTask);
  const [selectedChallengeId, setSelectedChallengeId] = useState('demo-1');
  const [selectedTeamId, setSelectedTeamId] = useState('team-1');
  const [teamName, setTeamName] = useState('MusicTech KZ');
  const [proposal, setProposal] = useState(emptyProposal);
  const [topicFilter, setTopicFilter] = useState('Все темы');
  const [levelFilter, setLevelFilter] = useState('Все уровни');
  const [publishConfirmed, setPublishConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  const [scoreChange, setScoreChange] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const publishedChallenges = useMemo(
    () =>
      state.challenges
        .filter((challenge) => challenge.published)
        .map((challenge) => ({ ...challenge, score: calculateScore(challenge).total }))
        .sort((a, b) => b.score - a.score),
    [state.challenges]
  );

  const topics = useMemo(
    () => ['Все темы', ...Array.from(new Set(publishedChallenges.map((challenge) => challenge.theme || 'Другое')))],
    [publishedChallenges]
  );

  const filteredChallenges = useMemo(
    () =>
      publishedChallenges.filter((challenge) => {
        const topicMatches = topicFilter === 'Все темы' || (challenge.theme || 'Другое') === topicFilter;
        const levelMatches = levelFilter === 'Все уровни' || getLevel(challenge.score) === levelFilter;
        return topicMatches && levelMatches;
      }),
    [publishedChallenges, topicFilter, levelFilter]
  );

  const selectedChallenge = publishedChallenges.find((challenge) => challenge.id === selectedChallengeId) || publishedChallenges[0];
  const selectedTeam = state.teams.find((team) => team.id === selectedTeamId) || state.teams[0];
  const currentScore = calculateScore(task);

  function save(nextState) {
    setState(nextState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function restoreDemoState(nextScreen = 'home') {
    const restored = initialState();
    save(restored);
    setDraft({
      title: 'Помощник для регулярной практики домбры',
      description: 'Хочу помочь ученикам домбры больше заниматься дома.',
    });
    setQuestions([]);
    setAnswers({});
    setTask(emptyTask);
    setSelectedChallengeId('demo-1');
    setSelectedTeamId('team-1');
    setTeamName('MusicTech KZ');
    setProposal(emptyProposal);
    setTopicFilter('Все темы');
    setLevelFilter('Все уровни');
    setPublishConfirmed(false);
    setScoreChange(null);
    setShowResetConfirm(false);
    setMessage('Демонстрационные данные восстановлены.');
    setScreen(nextScreen);
  }

  function startDemo() {
    restoreDemoState('create');
  }

  function navigate(nextScreen) {
    setMessage('');
    setShowResetConfirm(false);
    setScreen(nextScreen);
  }

  function goToCatalog(challengeId) {
    if (challengeId) setSelectedChallengeId(challengeId);
    navigate('catalog');
  }

  function analyzeWithAI() {
    if (!draft.title.trim()) {
      setMessage('Введите название задачи.');
      return;
    }
    if (!draft.description.trim()) {
      setMessage('Введите описание проблемы.');
      return;
    }
    setQuestions(generateQuestions());
    setAnswers({});
    setMessage('');
    setScreen('questions');
  }

  function createTaskCard() {
    const answeredCount = questions.filter((_, index) => normalizeText(answers[index]).length > 0).length;
    if (answeredCount < 3) {
      setMessage('Ответьте на все обязательные вопросы.');
      return;
    }
    const generatedCard = generateTaskCard(draft, answers);
    if (!isValidTaskCard(generatedCard)) {
      setMessage('Не удалось сформировать карточку. Проверьте ответы и попробуйте снова.');
      return;
    }
    setTask(generatedCard);
    setPublishConfirmed(false);
    setScoreChange(null);
    setMessage('');
    setScreen('task-card');
  }

  function updateTask(field, value) {
    setTask((current) => ({ ...current, [field]: value }));
    setPublishConfirmed(false);
    setScoreChange(null);
  }

  function improveCurrentTask() {
    const before = currentScore.total;
    const improved = improveTask(task);
    const after = calculateScore(improved).total;
    setTask(improved);
    setPublishConfirmed(false);
    setScoreChange({ before, after, diff: after - before });
  }

  function publishTask() {
    if (!task.title.trim()) {
      setMessage('Перед публикацией укажите название задачи.');
      return;
    }
    if (!task.context.trim()) {
      setMessage('Перед публикацией заполните контекст или проблему.');
      return;
    }
    if (!publishConfirmed) {
      setMessage('Подтвердите карточку перед публикацией.');
      return;
    }
    const newChallenge = {
      ...task,
      id: `challenge-${Date.now()}`,
      published: true,
    };
    save({ ...state, challenges: [...state.challenges, newChallenge] });
    setPublishConfirmed(false);
    goToCatalog(newChallenge.id);
  }

  function submitProposal(event) {
    event.preventDefault();
    if (!selectedChallenge) {
      setMessage('Откройте задачу в каталоге перед отправкой предложения.');
      return;
    }
    if (!teamName.trim()) {
      setMessage('Введите название команды.');
      return;
    }
    if (!proposal.idea.trim()) {
      setMessage('Введите идею решения.');
      return;
    }
    if (!proposal.plan.trim()) {
      setMessage('Введите план реализации.');
      return;
    }
    if (!proposal.timeframe.trim()) {
      setMessage('Введите предполагаемый срок.');
      return;
    }

    const newProposal = {
      id: `proposal-${Date.now()}`,
      challengeId: selectedChallenge.id,
      teamId: selectedTeam.id,
      teamName: teamName.trim(),
      members: selectedTeam.members,
      interests: selectedTeam.interests,
      skills: selectedTeam.skills,
      technologies: selectedTeam.technologies,
      idea: proposal.idea.trim(),
      plan: proposal.plan.trim(),
      timeframe: proposal.timeframe.trim(),
      prototypeLink: proposal.prototypeLink.trim(),
      status: 'Ожидает решения',
    };

    save({ ...state, proposals: [...state.proposals, newProposal] });
    setMessage('');
    setProposal(emptyProposal);
    setScreen('proposals');
  }

  function decideProposal(id, status) {
    setMessage('');
    save({
      ...state,
      proposals: state.proposals.map((item) =>
        item.id === id ? { ...item, status } : item
      ),
    });
  }

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => navigate('home')}>MusicEdu AI</button>
        <nav>
          <button onClick={() => navigate('home')}>Главная</button>
          <button onClick={() => navigate('create')}>Создать задачу</button>
          <button onClick={() => navigate('catalog')}>Каталог</button>
          <button onClick={() => navigate('proposals')}>Предложения</button>
        </nav>
      </header>

      {message && <div className="message" role="alert">{message}</div>}

      {showResetConfirm && (
        <div className="resetOverlay" role="dialog" aria-modal="true">
          <div className="resetDialog">
            <h3>Сбросить данные демонстрации?</h3>
            <p>Будут восстановлены исходные задачи, команды и предложения. Это действие удобно перед живым показом.</p>
            <div className="actions">
              <button className="primary" onClick={() => restoreDemoState('home')}>Да, сбросить</button>
              <button className="secondary" onClick={() => setShowResetConfirm(false)}>Отмена</button>
            </div>
          </div>
        </div>
      )}

      {screen === 'home' && (
        <main>
          <section className="hero">
            <div className="heroText">
              <p className="eyebrow">HackAlem AI · музыкальное образование</p>
              <h1>MusicEdu AI</h1>
              <p>ИИ-платформа для превращения бизнес-задач в готовые практические задания для студентов.</p>
              <div className="actions">
                <button className="primary" onClick={() => navigate('create')}>Создать задачу</button>
                <button className="secondary" onClick={() => navigate('catalog')}>Каталог задач</button>
              </div>
              <div className="featureGrid">
                <span>Музыкальное образование</span>
                <span>ИИ-помощник</span>
                <span>Практические задания</span>
              </div>
            </div>
            <div className="instrumentPanel" aria-label="Визуальный блок с домброй">
              <div className="strings" />
              <div className="soundHole" />
              <div className="frets">
                <span />
                <span />
                <span />
                <span />
              </div>
              <p>Домбра, практика, задания для студентов и ручной выбор команды.</p>
            </div>
          </section>
          <section className="page demoScenario">
            <SectionTitle label="Готово для презентации" title="Демонстрационный сценарий" />
            <div className="demoFlow">
              {[
                'Черновик задачи',
                'Вопросы ИИ',
                'Карточка задачи',
                'Рейтинг готовности',
                'Публикация',
                'Отклики команд',
                'Решение бизнеса',
              ].map((step, index) => (
                <div className="demoStep" key={step}>
                  <span>{index + 1}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
            <div className="actions">
              <button className="primary" onClick={startDemo}>Запустить демо</button>
              <button className="secondary" onClick={() => setShowResetConfirm(true)}>Сбросить демонстрационные данные</button>
            </div>
          </section>
          <section className="page howItWorks">
            <SectionTitle label="Демо за 5 минут" title="Как это работает" />
            <div className="stepsGrid">
              {[
                'Создайте задачу',
                'Ответьте на вопросы ИИ',
                'Улучшите карточку',
                'Получите рейтинг',
                'Опубликуйте задачу',
                'Получите предложения команд',
                'Выберите команду вручную',
              ].map((step, index) => (
                <div className="stepCard" key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="page principles">
            <SectionTitle label="Доверие" title="Принципы платформы" />
            <div className="principleGrid">
              {[
                'ИИ не выдумывает факты',
                'Бизнес подтверждает карточку перед публикацией',
                'Низкий рейтинг не скрывает задачу',
                'Все команды могут откликаться',
                'Бизнес самостоятельно выбирает команду',
                'ИИ не назначает исполнителей автоматически',
              ].map((item) => <span key={item}>{item}</span>)}
            </div>
          </section>
        </main>
      )}

      {screen === 'create' && (
        <main className="page">
          <SectionTitle label="Бизнес" title="Создание практической задачи" />
          <div className="panel">
            <label>
              Название задачи
              <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            </label>
            <label>
              Описание проблемы
              <textarea
                rows="6"
                value={draft.description}
                onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                placeholder="Хочу помочь ученикам домбры больше заниматься дома."
              />
            </label>
            <button className="primary" onClick={analyzeWithAI}>Проанализировать с ИИ</button>
          </div>
        </main>
      )}

      {screen === 'questions' && (
        <main className="page">
          <SectionTitle label="ИИ-помощник" title="Уточняющие вопросы ИИ" />
          <div className="panel">
            {questions.map((question, index) => (
              <label key={question}>
                {question}
                <textarea
                  rows="3"
                  value={answers[index] || ''}
                  onChange={(event) => setAnswers({ ...answers, [index]: event.target.value })}
                  placeholder="Введите короткий ответ..."
                />
              </label>
            ))}
            <button className="primary" onClick={createTaskCard}>Создать карточку задачи</button>
          </div>
        </main>
      )}

      {screen === 'task-card' && (
        <main className="page twoColumn">
          <section>
            <SectionTitle label="Редактируемая карточка" title="Карточка практической задачи" />
            <div className="panel formGrid">
              {[
                ['title', 'Название'],
                ['theme', 'Тема'],
                ['context', 'Контекст / проблема'],
                ['need', 'Потребность'],
                ['targetUsers', 'Пользователи'],
                ['materials', 'Данные / материалы'],
                ['expectedResult', 'Ожидаемый результат'],
                ['successCriteria', 'Критерии успеха'],
                ['constraints', 'Ограничения'],
                ['interactionFormat', 'Формат взаимодействия'],
                ['contact', 'Контакт / обратная связь'],
              ].map(([field, label]) => (
                <label key={field}>
                  {label}
                  {field === 'title' || field === 'theme' ? (
                    <input value={task[field]} onChange={(event) => updateTask(field, event.target.value)} />
                  ) : (
                    <textarea rows="3" value={task[field]} onChange={(event) => updateTask(field, event.target.value)} />
                  )}
                </label>
              ))}
            </div>
          </section>
          <aside className="scorePanel">
            <Score
              breakdown={currentScore.breakdown}
              missingInfo={getMissingInfo(task)}
              score={currentScore.total}
              scoreChange={scoreChange}
            />
            <label className="confirmBox">
              <input
                checked={publishConfirmed}
                onChange={(event) => setPublishConfirmed(event.target.checked)}
                type="checkbox"
              />
              Я проверил данные карточки и подтверждаю их
            </label>
            <div className="actions stack">
              <button className="secondary" onClick={improveCurrentTask}>Улучшить задачу с помощью ИИ</button>
              <button className="primary" onClick={publishTask}>Подтвердить и опубликовать</button>
            </div>
            <p className="note">Низкий рейтинг не блокирует публикацию. Он показывает, насколько задача понятна для студенческой команды.</p>
          </aside>
        </main>
      )}

      {screen === 'catalog' && (
        <main className="page">
          <SectionTitle label="Публичный раздел" title="Каталог практических задач" />
          <div className="filters panel">
            <label>
              Тема
              <select value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)}>
                {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
              </select>
            </label>
            <label>
              Уровень готовности
              <select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)}>
                {['Все уровни', 'Черновик', 'В работе', 'Готово', 'Приоритетная задача'].map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="catalog">
            {publishedChallenges.length === 0 && <p className="emptyState">Пока нет опубликованных задач.</p>}
            {filteredChallenges.map((challenge) => {
              const score = calculateScore(challenge);
              return (
                <article className="challengeCard" key={challenge.id}>
                  <div className="cardHeader">
                    <h3>{challenge.title || 'Задача без названия'}</h3>
                    <span className={`badge ${levelClass(score.total)}`}>{score.total} / 100 — {getLevel(score.total)}</span>
                  </div>
                  <p><strong>Тема:</strong> {challenge.theme || 'Другое'}</p>
                  <p>{challenge.context || 'Описание пока не заполнено.'}</p>
                  <p><strong>Пользователи:</strong> {challenge.targetUsers || 'Пока не указаны.'}</p>
                  <button className="linkButton" onClick={() => setSelectedChallengeId(challenge.id)}>Подробнее</button>
                  {selectedChallengeId === challenge.id && (
                    <div className="detailsGrid">
                      <p><strong>Потребность:</strong> {challenge.need || 'Пока не указана.'}</p>
                      <p><strong>Данные / материалы:</strong> {challenge.materials || 'Пока не указаны.'}</p>
                      <p><strong>Ожидаемый результат:</strong> {challenge.expectedResult || 'Пока не указан.'}</p>
                      <p><strong>Критерии успеха:</strong> {challenge.successCriteria || 'Пока не указаны.'}</p>
                      <p><strong>Ограничения:</strong> {challenge.constraints || 'Пока не указаны.'}</p>
                      <p><strong>Формат взаимодействия:</strong> {challenge.interactionFormat || 'Пока не указан.'}</p>
                      <p><strong>Контакт / обратная связь:</strong> {challenge.contact || 'Пока не указано.'}</p>
                      <div className="ratingReason">
                        <h4>Почему задача получила такой рейтинг?</h4>
                        <ScoreBreakdown breakdown={score.breakdown} />
                      </div>
                      <StudentProposal
                        proposal={proposal}
                        selectedTeamId={selectedTeamId}
                        setProposal={setProposal}
                        setSelectedTeamId={setSelectedTeamId}
                        setTeamName={setTeamName}
                        submitProposal={submitProposal}
                        teams={state.teams}
                        teamName={teamName}
                      />
                    </div>
                  )}
                </article>
              );
            })}
            {publishedChallenges.length > 0 && filteredChallenges.length === 0 && (
              <p className="emptyState">По выбранным фильтрам задач не найдено.</p>
            )}
          </div>
        </main>
      )}

      {screen === 'proposals' && (
        <main className="page">
          <SectionTitle label="Решение бизнеса" title="Предложения команд" />
          <div className="catalog">
            {state.proposals.length === 0 && <p className="emptyState">Пока нет предложений команд.</p>}
            {state.proposals.map((item) => {
              const challenge = state.challenges.find((challenge) => challenge.id === item.challengeId);
              return (
                <article className="challengeCard" key={item.id}>
                  <div className="cardHeader">
                    <h3>{item.teamName}</h3>
                    <span className={`status ${statusClass(item.status)}`}>{item.status}</span>
                  </div>
                  <p><strong>Задача:</strong> {challenge?.title || 'Задача не найдена'}</p>
                  <p><strong>Участники:</strong> {item.members}</p>
                  <p><strong>Интересы:</strong> {item.interests}</p>
                  <p><strong>Навыки:</strong> {item.skills}</p>
                  <p><strong>Технологии:</strong> {item.technologies}</p>
                  <p><strong>Идея решения:</strong> {item.idea}</p>
                  <p><strong>План реализации:</strong> {item.plan}</p>
                  <p><strong>Предполагаемый срок:</strong> {item.timeframe}</p>
                  <p><strong>Ссылка на прототип:</strong> {item.prototypeLink || 'Не указана'}</p>
                  <div className="actions">
                    <button className="primary" onClick={() => decideProposal(item.id, 'Принято')}>Принять</button>
                    <button className="secondary" onClick={() => decideProposal(item.id, 'Отклонено')}>Отклонить</button>
                  </div>
                  {item.status === 'Принято' && (
                    <p className="progressPoints">Команда выбрана. Баллы за прогресс: +10</p>
                  )}
                  {item.status === 'Отклонено' && (
                    <p className="rejectedNote">Отклик отклонён</p>
                  )}
                  <p className="note">Команды нельзя назначать автоматически. Бизнес вручную принимает или отклоняет предложение.</p>
                </article>
              );
            })}
          </div>
        </main>
      )}
      <footer className="footer">
        <strong>MusicEdu AI</strong>
        <span>AI Sana Hackathon MVP</span>
        <span>Музыкальное образование • Практические задачи • ИИ</span>
      </footer>
    </div>
  );
}

function SectionTitle({ label, title }) {
  return (
    <div className="sectionTitle">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
    </div>
  );
}

function Score({ score, breakdown, missingInfo = [], scoreChange = null }) {
  return (
    <div>
      <div className="scoreHero">
        <span>{score} / 100</span>
        <div>
          <strong>Рейтинг готовности: {score} / 100</strong>
          <p>{getLevel(score)}</p>
          <p>Насколько задача готова к работе со студентами</p>
        </div>
      </div>
      <p className="scoreExplanation">Чем выше рейтинг, тем полнее и понятнее задача для студенческих команд.</p>
      {scoreChange && (
        <div className="scoreChange">
          <span>Было: {scoreChange.before} / 100</span>
          <strong>→</strong>
          <span>Стало: {scoreChange.after} / 100</span>
          <b>{scoreChange.diff >= 0 ? '+' : ''}{scoreChange.diff} баллов</b>
        </div>
      )}
      <div className="progress" aria-label="Прогресс рейтинга готовности">
        <span style={{ width: `${score}%` }} />
      </div>
      <div className="breakdown">
        {breakdown.map((item) => (
          <div key={item.key}>
            <span>{item.label}</span>
            <strong>{item.earned} / {item.weight}</strong>
          </div>
        ))}
        <div className="totalScore">
          <span>Итого</span>
          <strong>{score} / 100</strong>
        </div>
      </div>
      <div className="missingInfo">
        <strong>Чтобы повысить рейтинг:</strong>
        {missingInfo.length > 0 ? (
          <ul>
            {missingInfo.map((item) => <li key={item}>{item}</li>)}
          </ul>
        ) : (
          <p>Ключевая информация заполнена.</p>
        )}
      </div>
    </div>
  );
}

function ScoreBreakdown({ breakdown }) {
  return (
    <div className="miniBreakdown">
      {breakdown.map((item) => (
        <div key={item.key}>
          <span>{item.label}</span>
          <strong>{item.earned} / {item.weight}</strong>
        </div>
      ))}
    </div>
  );
}

function StudentProposal({
  proposal,
  selectedTeamId,
  setProposal,
  setSelectedTeamId,
  setTeamName,
  submitProposal,
  teams,
  teamName,
}) {
  const team = teams.find((item) => item.id === selectedTeamId) || teams[0];

  function selectTeam(id) {
    const nextTeam = teams.find((item) => item.id === id) || teams[0];
    setSelectedTeamId(id);
    setTeamName(nextTeam.name);
  }

  function updateProposal(field, value) {
    setProposal((current) => ({ ...current, [field]: value }));
  }

  return (
    <form className="proposalBox" onSubmit={submitProposal}>
      <h4>Отправить предложение</h4>
      <label>
        Демонстрационная команда
        <select value={selectedTeamId} onChange={(event) => selectTeam(event.target.value)}>
          {teams.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </label>
      <div className="teamInfo">
        <p><strong>Участники:</strong> {team.members}</p>
        <p><strong>Интересы:</strong> {team.interests}</p>
        <p><strong>Навыки:</strong> {team.skills}</p>
        <p><strong>Технологии:</strong> {team.technologies}</p>
      </div>
      <label>
        Название команды
        <input value={teamName} onChange={(event) => setTeamName(event.target.value)} />
      </label>
      <label>
        Идея решения
        <textarea
          rows="3"
          value={proposal.idea}
          onChange={(event) => updateProposal('idea', event.target.value)}
          placeholder="Опишите основную идею решения..."
        />
      </label>
      <label>
        План реализации
        <textarea
          rows="4"
          value={proposal.plan}
          onChange={(event) => updateProposal('plan', event.target.value)}
          placeholder="Опишите этапы реализации..."
        />
      </label>
      <label>
        Предполагаемый срок
        <input
          value={proposal.timeframe}
          onChange={(event) => updateProposal('timeframe', event.target.value)}
          placeholder="Например: 7 дней"
        />
      </label>
      <label>
        Ссылка на прототип
        <input
          value={proposal.prototypeLink}
          onChange={(event) => updateProposal('prototypeLink', event.target.value)}
          placeholder="https://example.com/prototype"
        />
      </label>
      <button className="primary" type="submit">Отправить предложение</button>
    </form>
  );
}

createRoot(document.getElementById('root')).render(<App />);
