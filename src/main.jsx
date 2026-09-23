import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const STORAGE_KEY = 'musicedu-ai-state-ru-v4';

const criteria = [
  { key: 'context', label: 'Контекст / потребность', weight: 20 },
  { key: 'materials', label: 'Данные / материалы', weight: 20 },
  { key: 'expectedResult', label: 'Ожидаемый результат', weight: 15 },
  { key: 'successCriteria', label: 'Критерии успеха', weight: 15 },
  { key: 'constraints', label: 'Ограничения', weight: 10 },
  { key: 'targetUsers', label: 'Пользователи', weight: 10 },
  { key: 'contact', label: 'Контакт / обратная связь', weight: 10 },
];

const emptyTask = {
  title: '',
  context: '',
  targetUsers: '',
  materials: '',
  expectedResult: '',
  successCriteria: '',
  constraints: '',
  contact: '',
};

const demoTeams = [
  {
    id: 'team-1',
    name: 'MusicTech KZ',
    members: '3 студента',
    skills: 'Разработка, ИИ, музыкальное образование',
  },
  {
    id: 'team-2',
    name: 'Лаборатория домбры',
    members: '4 студента',
    skills: 'Геймификация, веб-разработка, казахская музыка, дизайн интерфейсов',
  },
  {
    id: 'team-3',
    name: 'Алем Саунд',
    members: '2 студента',
    skills: 'Музыкальная теория, прототипирование, образовательные продукты',
  },
];

const demoChallenges = [
  {
    id: 'demo-1',
    title: 'Помощник для регулярной практики домбры',
    context: 'Начинающие ученики домбры часто теряют мотивацию между уроками и нерегулярно выполняют домашние упражнения.',
    targetUsers: 'Ученики домбры 10-16 лет, преподаватели музыкальных школ и родители, которые помогают с домашней практикой.',
    materials: 'Учебные упражнения по домбре, ритмические схемы, короткие аудиопримеры, заметки преподавателя и демо-журнал практики.',
    expectedResult: 'Веб-прототип помощника, который превращает домашнюю практику в короткие задания с прогрессом и подсказками.',
    successCriteria: 'Ученик выполняет минимум три занятия в неделю, видит понятный прогресс, а преподаватель может оценить регулярность практики.',
    constraints: 'Прототип должен работать в браузере, использовать только синтетические данные и не требовать регистрации учеников.',
    contact: 'Преподаватель домбры вручную проверяет предложения команд и дает обратную связь один раз в неделю.',
    published: true,
  },
  {
    id: 'demo-2',
    title: 'ИИ-тренер по музыкальной теории',
    context: 'Ученикам сложно связывать ноты, интервалы и базовые термины музыкальной теории с реальными упражнениями.',
    targetUsers: 'Начинающие ученики музыкальной школы, которые изучают домбру, фортепиано или сольфеджио.',
    materials: 'Список базовых тем, примеры вопросов, простые нотные фрагменты и объяснения преподавателя.',
    expectedResult: 'Интерактивный тренажер с короткими вопросами, объяснениями ответов и возможностью редактировать задания.',
    successCriteria: 'После двух тренировок ученик правильно отвечает минимум на 8 из 10 базовых вопросов.',
    constraints: 'Не использовать реальные персональные данные учеников и не подключать внешний ИИ в прототипе.',
    contact: 'Методист музыкальной школы проверяет качество вопросов перед использованием на занятии.',
    published: true,
  },
  {
    id: 'demo-3',
    title: 'Игра для развития чувства ритма',
    context: 'Ученики понимают мелодию, но часто сбиваются в ритме при игре на домбре или фортепиано.',
    targetUsers: 'Дети 8-14 лет, которые только начинают изучать музыкальный инструмент.',
    materials: 'Набор ритмических рисунков, хлопки, счет вслух, простые упражнения преподавателя.',
    expectedResult: 'Игровой прототип, где ученик повторяет ритм, получает баллы и открывает новые уровни сложности.',
    successCriteria: 'Ученик проходит три ритмических уровня и демонстрирует более стабильный счет на уроке.',
    constraints: 'Без распознавания звука; оценка в демо может быть кнопочной или визуальной.',
    contact: 'Преподаватель вручную подтверждает, подходит ли игра для уроков.',
    published: true,
  },
  {
    id: 'demo-4',
    title: 'Помощник для начинающих пианистов',
    context: 'Начинающие пианисты забывают последовательность упражнений и не понимают, что практиковать дома в первую очередь.',
    targetUsers: 'Ученики первого года обучения на фортепиано и их преподаватели.',
    materials: 'Домашние задания, список гамм, короткие методические заметки и синтетические записи прогресса.',
    expectedResult: 'Прототип личного плана практики с небольшими ежедневными заданиями и отметками выполнения.',
    successCriteria: 'Ученик понимает план занятия и выполняет упражнения без дополнительных объяснений родителей.',
    constraints: 'Без сложной авторизации, без календаря и без хранения реальных файлов.',
    contact: 'Преподаватель фортепиано проверяет карточки заданий и принимает предложения команд вручную.',
    published: true,
  },
  {
    id: 'demo-5',
    title: 'Тренажёр развития музыкального слуха',
    context: 'Ученикам нужно больше коротких упражнений на распознавание высоты звука, направления мелодии и простых интервалов.',
    targetUsers: 'Начинающие музыканты, которые изучают домбру, вокал или фортепиано.',
    materials: 'Синтетические примеры упражнений, список интервалов и базовые рекомендации преподавателя.',
    expectedResult: 'Веб-тренажер с карточками для слухового анализа и простыми объяснениями после ответа.',
    successCriteria: 'Ученик регулярно выполняет задания и улучшает точность ответов по сравнению с первой попыткой.',
    constraints: 'В прототипе не реализуется распознавание высоты звука и автоматический анализ живого исполнения.',
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
    skills: 'Разработка, ИИ, музыкальное образование',
    text: 'Мы предлагаем создать веб-прототип с ежедневными заданиями по домбре, визуальным прогрессом, баллами и подсказками преподавателя.',
    status: 'Ожидает решения',
  },
  {
    id: 'proposal-2',
    challengeId: 'demo-3',
    teamId: 'team-2',
    teamName: 'Лаборатория домбры',
    members: '4 студента',
    skills: 'Геймификация, веб-разработка, казахская музыка, дизайн интерфейсов',
    text: 'Команда разработает игру с ритмическими уровнями, карточками упражнений и простым механизмом начисления очков.',
    status: 'Ожидает решения',
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

function calculateScore(task) {
  const breakdown = criteria.map((criterion) => ({
    ...criterion,
    earned: fieldScore(task[criterion.key] || '', criterion.weight),
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

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.challenges && saved?.proposals) return saved;
  } catch {
    return null;
  }

  return {
    challenges: demoChallenges,
    proposals: demoProposals,
  };
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
    context: draft.description,
    targetUsers: answers[0] || '',
    materials: answers[1] || '',
    expectedResult: answers[2] || '',
    successCriteria: 'Демо-черновик: критерии успеха нужно уточнить перед публикацией.',
    constraints: answers[3] || '',
    contact: '',
  };
}

function improveTask(task) {
  return {
    ...task,
    title: task.title || 'Помощник для регулярной практики домбры',
    context: needsImprovement(task.context)
      ? 'Демо-предложение ИИ: начинающим ученикам домбры нужен понятный цифровой помощник, который поддерживает регулярную домашнюю практику между уроками и помогает преподавателю видеть прогресс.'
      : task.context,
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
  const [proposalText, setProposalText] = useState('Предлагаем создать интерактивный прототип с заданиями по домбре, баллами и понятным прогрессом для ученика.');
  const [message, setMessage] = useState('');

  const publishedChallenges = useMemo(
    () =>
      state.challenges
        .filter((challenge) => challenge.published)
        .map((challenge) => ({ ...challenge, score: calculateScore(challenge).total }))
        .sort((a, b) => b.score - a.score),
    [state.challenges]
  );

  const selectedChallenge = publishedChallenges.find((challenge) => challenge.id === selectedChallengeId) || publishedChallenges[0];
  const selectedTeam = demoTeams.find((team) => team.id === selectedTeamId) || demoTeams[0];
  const currentScore = calculateScore(task);

  function save(nextState) {
    setState(nextState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function navigate(nextScreen) {
    setMessage('');
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
      setMessage('Ответьте минимум на 3 уточняющих вопроса, чтобы создать карточку задачи.');
      return;
    }
    setTask(generateTaskCard(draft, answers));
    setMessage('');
    setScreen('task-card');
  }

  function updateTask(field, value) {
    setTask((current) => ({ ...current, [field]: value }));
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
    const newChallenge = {
      ...task,
      id: `challenge-${Date.now()}`,
      published: true,
    };
    save({ ...state, challenges: [...state.challenges, newChallenge] });
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
    if (!proposalText.trim()) {
      setMessage('Введите предложение по решению.');
      return;
    }

    const newProposal = {
      id: `proposal-${Date.now()}`,
      challengeId: selectedChallenge.id,
      teamId: selectedTeam.id,
      teamName: teamName.trim(),
      members: selectedTeam.members,
      skills: selectedTeam.skills,
      text: proposalText.trim(),
      status: 'Ожидает решения',
    };

    save({ ...state, proposals: [...state.proposals, newProposal] });
    setMessage('');
    setProposalText('');
    setScreen('proposals');
  }

  function decideProposal(id, status) {
    setMessage('');
    save({
      ...state,
      proposals: state.proposals.map((proposal) =>
        proposal.id === id ? { ...proposal, status } : proposal
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

      {screen === 'home' && (
        <main>
          <section className="hero">
            <div className="heroText">
              <p className="eyebrow">HackAlem AI · музыкальное образование</p>
              <h1>MusicEdu AI</h1>
              <p>ИИ-платформа для создания и улучшения практических задач в музыкальном образовании</p>
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
          <section className="page howItWorks">
            <SectionTitle label="Демо за 5 минут" title="Как это работает" />
            <div className="stepsGrid">
              {[
                'Создайте практическую задачу',
                'Ответьте на вопросы ИИ',
                'Улучшите карточку и повысьте готовность',
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
                ['context', 'Контекст / проблема'],
                ['targetUsers', 'Целевая аудитория'],
                ['materials', 'Данные / материалы'],
                ['expectedResult', 'Ожидаемый результат'],
                ['successCriteria', 'Критерии успеха'],
                ['constraints', 'Ограничения'],
                ['contact', 'Контакт / обратная связь'],
              ].map(([field, label]) => (
                <label key={field}>
                  {label}
                  {field === 'title' ? (
                    <input value={task[field]} onChange={(event) => updateTask(field, event.target.value)} />
                  ) : (
                    <textarea rows="3" value={task[field]} onChange={(event) => updateTask(field, event.target.value)} />
                  )}
                </label>
              ))}
            </div>
          </section>
          <aside className="scorePanel">
            <Score score={currentScore.total} breakdown={currentScore.breakdown} />
            <div className="actions stack">
              <button className="secondary" onClick={() => setTask(improveTask(task))}>Улучшить задачу с помощью ИИ</button>
              <button className="primary" onClick={publishTask}>Опубликовать задачу</button>
            </div>
            <p className="note">Низкий рейтинг не блокирует публикацию. Он показывает, насколько задача понятна для студенческой команды.</p>
          </aside>
        </main>
      )}

      {screen === 'catalog' && (
        <main className="page">
          <SectionTitle label="Публичный раздел" title="Каталог практических задач" />
          <div className="catalog">
            {publishedChallenges.map((challenge) => {
              const score = calculateScore(challenge);
              return (
                <article className="challengeCard" key={challenge.id}>
                  <div className="cardHeader">
                    <h3>{challenge.title || 'Задача без названия'}</h3>
                    <span className={`badge ${levelClass(score.total)}`}>{score.total} / 100 · {getLevel(score.total)}</span>
                  </div>
                  <p>{challenge.context || 'Описание пока не заполнено.'}</p>
                  <p><strong>Целевая аудитория:</strong> {challenge.targetUsers || 'Пока не указана.'}</p>
                  <button className="linkButton" onClick={() => setSelectedChallengeId(challenge.id)}>Подробнее</button>
                  {selectedChallengeId === challenge.id && (
                    <div className="detailsGrid">
                      <p><strong>Данные / материалы:</strong> {challenge.materials || 'Пока не указаны.'}</p>
                      <p><strong>Ожидаемый результат:</strong> {challenge.expectedResult || 'Пока не указан.'}</p>
                      <p><strong>Критерии успеха:</strong> {challenge.successCriteria || 'Пока не указаны.'}</p>
                      <p><strong>Ограничения:</strong> {challenge.constraints || 'Пока не указаны.'}</p>
                      <p><strong>Контакт / обратная связь:</strong> {challenge.contact || 'Пока не указано.'}</p>
                      <StudentProposal
                        selectedTeamId={selectedTeamId}
                        setSelectedTeamId={setSelectedTeamId}
                        teamName={teamName}
                        setTeamName={setTeamName}
                        proposalText={proposalText}
                        setProposalText={setProposalText}
                        submitProposal={submitProposal}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </main>
      )}

      {screen === 'proposals' && (
        <main className="page">
          <SectionTitle label="Решение бизнеса" title="Предложения команд" />
          <div className="catalog">
            {state.proposals.map((proposal) => {
              const challenge = state.challenges.find((item) => item.id === proposal.challengeId);
              return (
                <article className="challengeCard" key={proposal.id}>
                  <div className="cardHeader">
                    <h3>{proposal.teamName}</h3>
                    <span className={`status ${statusClass(proposal.status)}`}>{proposal.status}</span>
                  </div>
                  <p><strong>Задача:</strong> {challenge?.title || 'Задача не найдена'}</p>
                  <p><strong>Участники:</strong> {proposal.members}</p>
                  <p><strong>Навыки:</strong> {proposal.skills}</p>
                  <p>{proposal.text}</p>
                  <div className="actions">
                    <button className="primary" onClick={() => decideProposal(proposal.id, 'Принято')}>Принять</button>
                    <button className="secondary" onClick={() => decideProposal(proposal.id, 'Отклонено')}>Отклонить</button>
                  </div>
                  <p className="note">Команды нельзя назначать автоматически. Бизнес вручную принимает или отклоняет предложение.</p>
                </article>
              );
            })}
          </div>
        </main>
      )}
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

function Score({ score, breakdown }) {
  return (
    <div>
      <div className="scoreHero">
        <span>{score}</span>
        <div>
          <strong>Рейтинг готовности: {score} / 100</strong>
          <p>{getLevel(score)}</p>
        </div>
      </div>
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
    </div>
  );
}

function StudentProposal({
  selectedTeamId,
  setSelectedTeamId,
  teamName,
  setTeamName,
  proposalText,
  setProposalText,
  submitProposal,
}) {
  const team = demoTeams.find((item) => item.id === selectedTeamId) || demoTeams[0];

  function selectTeam(id) {
    const nextTeam = demoTeams.find((item) => item.id === id) || demoTeams[0];
    setSelectedTeamId(id);
    setTeamName(nextTeam.name);
  }

  return (
    <form className="proposalBox" onSubmit={submitProposal}>
      <h4>Отправить предложение</h4>
      <label>
        Демонстрационная команда
        <select value={selectedTeamId} onChange={(event) => selectTeam(event.target.value)}>
          {demoTeams.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </label>
      <div className="teamInfo">
        <p><strong>Участники:</strong> {team.members}</p>
        <p><strong>Навыки:</strong> {team.skills}</p>
      </div>
      <label>
        Название команды
        <input value={teamName} onChange={(event) => setTeamName(event.target.value)} />
      </label>
      <label>
        Предложение по решению
        <textarea
          rows="4"
          value={proposalText}
          onChange={(event) => setProposalText(event.target.value)}
          placeholder="Опишите, какое решение команда предлагает разработать..."
        />
      </label>
      <button className="primary" type="submit">Отправить предложение</button>
    </form>
  );
}

createRoot(document.getElementById('root')).render(<App />);
