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
  { cat: 'tools', name: 'Git', short: 'Git', color: '#f05033', level: 3 },
  { cat: 'tools', name: 'HMI', short: 'HMI', color: '#9bd36a', level: 3 },
  { cat: 'tools', name: 'Microsoft Office', short: 'Of', color: '#d83b01', level: 3 },
  { cat: 'tools', name: 'Docker', short: 'Dk', color: '#2496ed', level: null },
  { cat: 'tools', name: 'PostgreSQL', short: 'Pg', color: '#6c9bd2', level: null },
  { cat: 'tools', name: 'MySQL', short: 'My', color: '#f29111', level: null },
  { cat: 'tools', name: 'OpenCV', short: 'CV', color: '#5bd35b', level: null }
];

window.PROJECTS = [
  {
    id: 'gruppe',
    stack: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL', 'Leaflet', 'd3', 'WebSocket', 'Docker'],
    link: ''
  },
  {
    id: 'bolleye',
    stack: ['Python', 'Flask', 'OpenCV', 'MobileNet-SSD', 'Machine Learning'],
    link: ''
  },
  {
    id: 'mon',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'Flutter', 'Dart'],
    link: ''
  }
];

window.ACHIEVEMENTS = [
  { id: 'spring', kind: 'course', img: 'files/certs/springboot.png' },
  { id: 'python', kind: 'course', img: 'files/certs/python.png' },
  { id: 'makeathon', kind: 'event', img: 'files/certs/makeathon.png' },
  { id: 'telc', kind: 'lang', img: '' }
];
