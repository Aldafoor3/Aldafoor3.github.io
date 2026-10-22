/* Language-neutral portfolio data. Text for each language lives in i18n.js. */
window.PROFILE = {
  name: 'Khalil Meftehi',
  email: 'meftehikhalil78@gmail.com',
  github: 'https://github.com/Aldafoor3',
  linkedin: 'https://www.linkedin.com/in/khalilmeftehi-bb72b3192/',
  photo: 'files/photo.png',
  cv: {
    de: 'files/Khalil-Meftehi-CV-DE.pdf',
    en: 'files/Khalil-Meftehi-CV-EN.pdf'
  },
  // web3forms public access key (safe to expose, it only allows sending to the owner's inbox)
  formKey: 'd3f14c7a-cba2-4714-a310-ba0a32eb5276'
};

/* Sections in travel order. `icon` is a block texture name from world.js. */
window.SECTIONS = [
  { id: 'home', icon: 'grass' },
  { id: 'about', icon: 'planks' },
  { id: 'journey', icon: 'cobble' },
  { id: 'skills', icon: 'diamondOre' },
  { id: 'projects', icon: 'chestFront' },
  { id: 'achievements', icon: 'gold' },
  { id: 'contact', icon: 'portalIcon' }
];

/* level: 1-5 from the CV, null = used in projects but not rated in the CV */
window.SKILLS = [
  { cat: 'lang', name: 'Java', short: 'Jv', color: '#e76f00', level: 4 },
  { cat: 'lang', name: 'Pascal', short: 'Pas', color: '#8a6dd8', level: 4 },
  { cat: 'lang', name: 'SQL', short: 'SQL', color: '#3d8bd9', level: 3 },
  { cat: 'lang', name: 'Python', short: 'Py', color: '#f2c94c', level: 2 },
  { cat: 'lang', name: 'C++', short: 'C++', color: '#5c8dbc', level: 2 },
  { cat: 'lang', name: 'TypeScript', short: 'TS', color: '#3178c6', level: 2 },
  { cat: 'lang', name: 'Dart', short: 'Dt', color: '#2bb7f6', level: null },
  { cat: 'fw', name: 'Spring Boot', short: 'Sb', color: '#6db33f', level: 3 },
  { cat: 'fw', name: 'Angular', short: 'Ng', color: '#dd0031', level: 2 },
  { cat: 'fw', name: 'React', short: 'Re', color: '#61dafb', level: 1 },
  { cat: 'fw', name: 'Flutter', short: 'Fl', color: '#47c5fb', level: null },
  { cat: 'fw', name: 'Flask', short: 'Fk', color: '#d0d0d0', level: null },
  { cat: 'fw', name: 'FastAPI', short: 'Fa', color: '#05998b', level: null },
  { cat: 'fw', name: 'Streamlit', short: 'St', color: '#ff4b4b', level: null },
  { cat: 'fw', name: 'PyTorch', short: 'Pt', color: '#ee4c2c', level: null },
  { cat: 'fw', name: 'scikit-learn', short: 'Sk', color: '#f7931e', level: null },
  { cat: 'tools', name: 'Git', short: 'Git', color: '#f05033', level: 3 },
  { cat: 'tools', name: 'HMI', short: 'HMI', color: '#9bd36a', level: 3 },
  { cat: 'tools', name: 'Microsoft Office', short: 'Of', color: '#d83b01', level: 3 },
  { cat: 'tools', name: 'Docker', short: 'Dk', color: '#2496ed', level: null },
  { cat: 'tools', name: 'PostgreSQL', short: 'Pg', color: '#6c9bd2', level: null },
  { cat: 'tools', name: 'MySQL', short: 'My', color: '#f29111', level: null },
  { cat: 'tools', name: 'OpenCV', short: 'CV', color: '#5bd35b', level: null },
  { cat: 'tools', name: 'pandas / NumPy', short: 'Pd', color: '#8f7ce8', level: null }
];

/* Projects with `results`/`figures` open as a case study. Numbers come from the project's result logs. */
window.PROJECTS = [
  {
    id: 'glucose',
    stack: ['Python', 'PyTorch', 'scikit-learn', 'pandas', 'NumPy', 'LSTM', 'Transformer', 'TCN', 'matplotlib'],
    link: '',
    // OhioT1DM, 12 patients, 30-min horizon, clinically weighted final run: [model, RMSE mg/dL, Clarke Zone A]
    results: [
      ['LSTM', '21.79 ± 3.62', '87.1 %'],
      ['Autoencoder', '21.96 ± 4.00', '87.2 %'],
      ['Transformer', '23.46 ± 4.50', '84.1 %'],
      ['Random Forest', '23.53 ± 6.33', '86.5 %'],
      ['TCN', '28.86 ± 17.10', '78.9 %']
    ],
    figures: [
      { src: 'files/projects/glucose-clarke.webp', w: 1200, h: 654 },
      { src: 'files/projects/glucose-ablation.webp', w: 1200, h: 453 }
    ]
  },
  {
    id: 'generio',
    stack: ['Python', 'FastAPI', 'Streamlit', 'OpenCV', 'REST API', 'Generative AI', 'model-viewer'],
    link: '',
    figures: [
      { src: 'files/projects/generio-examples.webp', w: 1630, h: 400 }
    ]
  },
  {
    id: 'gruppe',
    stack: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL', 'Leaflet', 'd3', 'WebSocket', 'Docker'],
    link: 'https://github.com/Aldafoor3/gruppe-i'
  },
  {
    id: 'bolleye',
    stack: ['Python', 'Flask', 'OpenCV', 'MobileNet-SSD', 'Machine Learning'],
    link: 'https://github.com/Aldafoor3/B-lleye'
  },
  {
    id: 'mon',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'Flutter', 'Dart'],
    link: 'https://github.com/Aldafoor3/MON'
  }
];

window.ACHIEVEMENTS = [
  { id: 'spring', kind: 'course', img: 'files/certs/springboot.png' },
  { id: 'python', kind: 'course', img: 'files/certs/python.png' },
  { id: 'makeathon', kind: 'event', img: 'files/certs/makeathon.png' },
  { id: 'telc', kind: 'lang', img: '' }
];
