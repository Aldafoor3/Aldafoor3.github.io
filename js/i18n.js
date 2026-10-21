/* All visible text, one object per language. Every language has the same shape. */
(function () {
  const EMAIL = 'meftehikhalil78@gmail.com';

  window.I18N = {
    en: {
      meta: {
        title: 'Khalil Meftehi · Junior Software Engineer',
        description: 'Portfolio of Khalil Meftehi, junior software engineer in Bochum: Java, Spring Boot, Angular, Python and Flutter projects in a block world.'
      },
      nav: ['Home', 'About', 'Journey', 'Skills', 'Projects', 'Achievements', 'Contact'],
      ui: {
        language: 'Language', night: 'Night', day: 'Day', soundOn: 'Sound on', soundOff: 'Sound off',
        close: 'Close', hint: 'Scroll, use ← → or press 1–7 to travel',
        loading: 'Generating world',
        steps: ['Building terrain', 'Planting trees', 'Placing chests', 'Spawning player'],
        tip: 'Tip: click a place in the world to travel there',
        explorer: { title: 'Achievement unlocked!', text: 'World explorer: you visited every place' },
        noWebgl: 'Your browser cannot show the 3D world, but all content works.'
      },
      home: {
        greet: "Hi, I'm",
        role: 'Junior Software Engineer',
        tagline: 'I build full-stack apps with Java, Spring Boot and Angular, from the database to the screen.',
        meta: 'Bochum · ITQ · University of Duisburg-Essen',
        cvDe: 'CV (German)', cvEn: 'CV (English)', contact: 'Contact me'
      },
      about: {
        title: 'About me',
        bullets: [
          'Junior Software Engineer at ITQ since May 2023, working with Angular, C++, TypeScript and Python.',
          'Studying Applied Computer Science (Software Engineering) at the University of Duisburg-Essen.',
          'Main focus: Java and Spring Boot. Curious about Web3.',
          'Fast learner who enjoys hard problems, teamwork and shipping results that work.'
        ],
        infoTitle: 'Player stats',
        info: [['Based in', 'Bochum, Germany'], ['Studying', 'University of Duisburg-Essen'], ['Working at', 'ITQ'], ['Email', EMAIL]],
        langTitle: 'Languages',
        langs: [['Arabic', 'Native', 5], ['French', 'Fluent', 4], ['English', 'Fluent', 4], ['German', 'C1 · TELC Hochschule', 4]],
        hobbiesTitle: 'Hobbies',
        hobbies: ['Reading', 'Photography', 'Cooking', 'Gym', 'Music', 'Coding']
      },
      journey: {
        title: 'Journey',
        subtitle: 'Every step of the climb',
        items: [
          { tag: 'Work', title: 'Junior Software Engineer', org: 'ITQ', date: 'May 2023 – today', text: 'Building features in Angular, TypeScript, C++ and Python across varied projects.' },
          { tag: 'Study', title: 'B.Sc. Applied Computer Science – Software Engineering', org: 'University of Duisburg-Essen', date: '2021 – today', text: 'Focus on Java, Spring Boot and software engineering.' },
          { tag: 'School', title: 'Abitur (computer science track)', org: 'Gymnasium Chedli Atallah, Kairouan', date: '2018 – 2019', text: 'Computer science specialization.' }
        ]
      },
      skills: {
        title: 'Skills',
        subtitle: 'My inventory. Click an item.',
        cats: { lang: 'Languages', fw: 'Frameworks', tools: 'Tools & data' },
        level: 'Level', inProjects: 'Used in my projects', pick: 'Select an item to see details'
      },
      projects: {
        title: 'Projects',
        subtitle: "Open a chest to see what's inside",
        open: 'Open chest', features: 'What it does', stack: 'Built with',
        items: {
          gruppe: {
            name: 'Data Management System', sub: 'Gruppe-I', date: 'Apr – Jun 2023', context: 'Team project',
            short: 'A web platform to upload, view and edit open datasets (CSV, XML, JSON), with maps, charts and a community.',
            features: [
              'Register and log in with a two-factor code sent by email',
              'Upload, view, edit and download datasets in CSV, XML and JSON',
              'Charts with d3 and maps with Leaflet, including geodata (GeoJSON, UTM)',
              'Discussion forum, friend list and real-time chat over WebSocket (STOMP)',
              'Support tickets and a helper chatbot',
              'Runs with Docker Compose: PostgreSQL, Spring Boot API, Angular app on nginx'
            ]
          },
          bolleye: {
            name: 'AI Recognition App', sub: 'Bölleye · for a Böllhof machine', date: 'Feb – Mar 2024', context: 'Makeathon prototype, built in 4 days',
            short: 'A camera app that recognizes machine parts live and shows how to use them.',
            features: [
              'Streams the webcam to the browser in real time (Flask, MJPEG)',
              'Detects objects in every frame with a pre-trained MobileNet-SSD model (OpenCV DNN)',
              'Draws a box around detected parts above 50% confidence',
              'Working prototype presented after 4 days of teamwork'
            ]
          },
          mon: {
            name: 'Nursery Management System', sub: 'MON', date: 'Jul – Sep 2024', context: 'Full-stack: REST API + mobile app',
            short: 'Manages a nursery: children, groups, parents, staff, attendance, payments and schedules.',
            features: [
              'REST API with 11 modules: children, groups, parents, employees, managers, providers, attendance, leaves, payments, schedules, resources',
              'Secure login with Spring Security and JWT tokens',
              'MySQL database with Spring Data JPA',
              'Cross-platform Flutter app with login and registration (GetX, Dio)'
            ]
          }
        }
      },
      achievements: {
        title: 'Achievements',
        subtitle: 'Certificates and milestones',
        made: 'Achievement made!', view: 'View certificate',
        kinds: { course: 'Course certificate', event: 'Makeathon', lang: 'Language certificate' },
        items: {
          spring: 'Master Spring Boot 3 & Spring Framework 6 with Java',
          python: 'Complete Python Programming 2020: Beginner to Advanced',
          makeathon: 'Smart Green Island Makeathon',
          telc: 'German C1 · TELC Hochschule'
        }
      },
      contact: {
        title: 'Contact',
        subtitle: 'Have a job, a project or a question? Send me a message.',
        name: 'Name', email: 'Email', message: 'Message', send: 'Send',
        sending: 'Sending…', ok: 'Message sent. Thank you!', fail: 'Could not send. Please email me directly.',
        invalid: 'Please fill in every field.', or: 'Or find me here',
        footer: 'Built block by block by Khalil Meftehi'
      },
      chat: {
        title: 'Village guide', open: 'Ask the guide',
        placeholder: 'Ask about skills, projects, CV…', send: 'Send',
        hello: "Hmm! Hi, I'm the village guide. Ask me about Khalil's skills, projects, CV or how to reach him.",
        chips: [['Skills', 'skills'], ['Projects', 'projects'], ['CV', 'cv'], ['Contact', 'contact']],
        go: 'Take me there',
        fallback: 'Hmm… I only know about Khalil. Try: skills, projects, CV, studies or contact.',
        answers: {
          greet: 'Hmm! Hello, traveler. What do you want to know?',
          about: 'Khalil is a junior software engineer in Bochum. He works at ITQ and studies at the University of Duisburg-Essen.',
          skills: 'His strongest tools: Java and Spring Boot. He also works with Angular, TypeScript, Python, C++, SQL, Flutter and Docker.',
          projects: 'Three chests: Gruppe-I (data platform, Spring Boot + Angular), Bölleye (live AI object detection, Python + OpenCV) and MON (nursery management, Spring Boot + Flutter).',
          cv: 'Download his CV in German or English on the Home page.',
          contact: 'Use the form at the portal, or email ' + EMAIL + '.',
          study: 'B.Sc. Applied Computer Science (Software Engineering) at the University of Duisburg-Essen, since 2021.',
          work: 'Junior Software Engineer at ITQ since May 2023: Angular, TypeScript, C++ and Python.',
          languages: 'He speaks Arabic, French, English and German (C1).',
          gruppe: 'Gruppe-I: a data platform with 2FA login, maps, charts, a forum and real-time chat. Spring Boot + Angular + PostgreSQL.',
          bolleye: 'Bölleye: recognizes machine parts live through the camera, with OpenCV and MobileNet-SSD. Built in 4 days.',
          mon: 'MON: nursery management with Spring Boot, JWT and MySQL, plus a Flutter app.'
        }
      }
    },

    de: {
      meta: {
        title: 'Khalil Meftehi · Junior Software Engineer',
        description: 'Portfolio von Khalil Meftehi, Junior Software Engineer in Bochum: Projekte mit Java, Spring Boot, Angular, Python und Flutter in einer Blockwelt.'
      },
      nav: ['Start', 'Über mich', 'Werdegang', 'Fähigkeiten', 'Projekte', 'Erfolge', 'Kontakt'],
      ui: {
        language: 'Sprache', night: 'Nacht', day: 'Tag', soundOn: 'Ton an', soundOff: 'Ton aus',
        close: 'Schließen', hint: 'Scrollen, ← → oder 1–7 drücken zum Reisen',
        loading: 'Welt wird generiert',
        steps: ['Gelände wird gebaut', 'Bäume werden gepflanzt', 'Truhen werden platziert', 'Spieler erscheint'],
        tip: 'Tipp: Klicke auf einen Ort in der Welt, um dorthin zu reisen',
        explorer: { title: 'Erfolg erzielt!', text: 'Weltenbummler: Du hast jeden Ort besucht' },
        noWebgl: 'Dein Browser kann die 3D-Welt nicht anzeigen, aber alle Inhalte funktionieren.'
      },
      home: {
        greet: 'Hallo, ich bin',
        role: 'Junior Software Engineer',
        tagline: 'Ich entwickle Full-Stack-Anwendungen mit Java, Spring Boot und Angular, von der Datenbank bis zur Oberfläche.',
        meta: 'Bochum · ITQ · Universität Duisburg-Essen',
        cvDe: 'Lebenslauf (Deutsch)', cvEn: 'Lebenslauf (Englisch)', contact: 'Kontakt aufnehmen'
      },
      about: {
        title: 'Über mich',
        bullets: [
          'Junior Software Engineer bei ITQ seit Mai 2023, mit Angular, C++, TypeScript und Python.',
          'Studium der Angewandten Informatik (Software Engineering) an der Universität Duisburg-Essen.',
          'Schwerpunkt: Java und Spring Boot. Neugierig auf Web3.',
          'Lerne schnell und mag schwierige Probleme, Teamarbeit und Ergebnisse, die funktionieren.'
        ],
        infoTitle: 'Spielerwerte',
        info: [['Wohnort', 'Bochum, Deutschland'], ['Studium', 'Universität Duisburg-Essen'], ['Arbeit', 'ITQ'], ['E-Mail', EMAIL]],
        langTitle: 'Sprachen',
        langs: [['Arabisch', 'Muttersprache', 5], ['Französisch', 'Fließend', 4], ['Englisch', 'Fließend', 4], ['Deutsch', 'C1 · TELC Hochschule', 4]],
        hobbiesTitle: 'Hobbys',
        hobbies: ['Lesen', 'Fotografie', 'Kochen', 'Gym', 'Musik', 'Programmieren']
      },
      journey: {
        title: 'Werdegang',
        subtitle: 'Jede Stufe des Aufstiegs',
        items: [
          { tag: 'Arbeit', title: 'Junior Software Engineer', org: 'ITQ', date: 'Mai 2023 – heute', text: 'Entwicklung mit Angular, TypeScript, C++ und Python in vielseitigen Projekten.' },
          { tag: 'Studium', title: 'B.Sc. Angewandte Informatik – Software Engineering', org: 'Universität Duisburg-Essen', date: '2021 – heute', text: 'Schwerpunkt Java, Spring Boot und Softwaretechnik.' },
          { tag: 'Schule', title: 'Abitur (Schwerpunkt Informatik)', org: 'Gymnasium Chedli Atallah, Kairouan', date: '2018 – 2019', text: 'Schwerpunkt Informatikwissenschaften.' }
        ]
      },
      skills: {
        title: 'Fähigkeiten',
        subtitle: 'Mein Inventar. Klicke auf ein Item.',
        cats: { lang: 'Sprachen', fw: 'Frameworks', tools: 'Tools & Daten' },
        level: 'Level', inProjects: 'In meinen Projekten eingesetzt', pick: 'Wähle ein Item für Details'
      },
      projects: {
        title: 'Projekte',
        subtitle: 'Öffne eine Truhe, um zu sehen, was drin ist',
        open: 'Truhe öffnen', features: 'Funktionen', stack: 'Technologien',
        items: {
          gruppe: {
            name: 'Datenmanagement-System', sub: 'Gruppe-I', date: 'Apr. – Juni 2023', context: 'Teamprojekt',
            short: 'Eine Webplattform zum Hochladen, Ansehen und Bearbeiten offener Datensätze (CSV, XML, JSON), mit Karten, Diagrammen und Community.',
            features: [
              'Registrierung und Login mit Zwei-Faktor-Code per E-Mail',
              'Datensätze in CSV, XML und JSON hochladen, ansehen, bearbeiten und herunterladen',
              'Diagramme mit d3 und Karten mit Leaflet, inkl. Geodaten (GeoJSON, UTM)',
              'Diskussionsforum, Freundesliste und Echtzeit-Chat über WebSocket (STOMP)',
              'Support-Tickets und ein Hilfe-Chatbot',
              'Läuft mit Docker Compose: PostgreSQL, Spring-Boot-API, Angular-App auf nginx'
            ]
          },
          bolleye: {
            name: 'KI-Erkennungs-App', sub: 'Bölleye · für eine Böllhof-Maschine', date: 'Feb. – März 2024', context: 'Makeathon-Prototyp in 4 Tagen',
            short: 'Eine Kamera-App, die Maschinenteile live erkennt und Hinweise zur Nutzung gibt.',
            features: [
              'Überträgt die Webcam in Echtzeit in den Browser (Flask, MJPEG)',
              'Erkennt Objekte in jedem Bild mit einem vortrainierten MobileNet-SSD-Modell (OpenCV DNN)',
              'Markiert erkannte Teile ab 50 % Sicherheit mit einem Rahmen',
              'Funktionierender Prototyp nach 4 Tagen Teamarbeit präsentiert'
            ]
          },
          mon: {
            name: 'Kita-Verwaltungssystem', sub: 'MON', date: 'Juli – Sep. 2024', context: 'Full-Stack: REST-API + Mobile-App',
            short: 'Verwaltet eine Kita: Kinder, Gruppen, Eltern, Personal, Anwesenheit, Zahlungen und Dienstpläne.',
            features: [
              'REST-API mit 11 Bereichen: Kinder, Gruppen, Eltern, Mitarbeitende, Leitung, Anbieter, Anwesenheit, Urlaub, Zahlungen, Pläne, Ressourcen',
              'Sicherer Login mit Spring Security und JWT',
              'MySQL-Datenbank mit Spring Data JPA',
              'Plattformübergreifende Flutter-App mit Login und Registrierung (GetX, Dio)'
            ]
          }
        }
      },
      achievements: {
        title: 'Erfolge',
        subtitle: 'Zertifikate und Meilensteine',
        made: 'Erfolg erzielt!', view: 'Zertifikat ansehen',
        kinds: { course: 'Kurszertifikat', event: 'Makeathon', lang: 'Sprachzertifikat' },
        items: {
          spring: 'Master Spring Boot 3 & Spring Framework 6 with Java',
          python: 'Complete Python Programming 2020: Beginner to Advanced',
          makeathon: 'Smart Green Island Makeathon',
          telc: 'Deutsch C1 · TELC Hochschule'
        }
      },
      contact: {
        title: 'Kontakt',
        subtitle: 'Job, Projekt oder Frage? Schreib mir eine Nachricht.',
        name: 'Name', email: 'E-Mail', message: 'Nachricht', send: 'Senden',
        sending: 'Wird gesendet…', ok: 'Nachricht gesendet. Danke!', fail: 'Senden fehlgeschlagen. Bitte schreib mir direkt eine E-Mail.',
        invalid: 'Bitte fülle alle Felder aus.', or: 'Oder finde mich hier',
        footer: 'Block für Block gebaut von Khalil Meftehi'
      },
      chat: {
        title: 'Dorf-Guide', open: 'Frag den Guide',
        placeholder: 'Frag nach Skills, Projekten, Lebenslauf…', send: 'Senden',
        hello: 'Hmm! Hallo, ich bin der Dorf-Guide. Frag mich nach Khalils Skills, Projekten, Lebenslauf oder Kontakt.',
        chips: [['Skills', 'skills'], ['Projekte', 'projects'], ['Lebenslauf', 'cv'], ['Kontakt', 'contact']],
        go: 'Bring mich hin',
        fallback: 'Hmm… ich weiß nur etwas über Khalil. Versuch: Skills, Projekte, Lebenslauf, Studium oder Kontakt.',
        answers: {
          greet: 'Hmm! Hallo, Reisender. Was möchtest du wissen?',
          about: 'Khalil ist Junior Software Engineer in Bochum. Er arbeitet bei ITQ und studiert an der Universität Duisburg-Essen.',
          skills: 'Seine stärksten Werkzeuge: Java und Spring Boot. Außerdem Angular, TypeScript, Python, C++, SQL, Flutter und Docker.',
          projects: 'Drei Truhen: Gruppe-I (Datenplattform, Spring Boot + Angular), Bölleye (KI-Objekterkennung live, Python + OpenCV) und MON (Kita-Verwaltung, Spring Boot + Flutter).',
          cv: 'Den Lebenslauf gibt es auf Deutsch und Englisch auf der Startseite.',
          contact: 'Nutze das Formular am Portal oder schreib an ' + EMAIL + '.',
          study: 'B.Sc. Angewandte Informatik (Software Engineering) an der Universität Duisburg-Essen, seit 2021.',
          work: 'Junior Software Engineer bei ITQ seit Mai 2023: Angular, TypeScript, C++ und Python.',
          languages: 'Er spricht Arabisch, Französisch, Englisch und Deutsch (C1).',
          gruppe: 'Gruppe-I: Datenplattform mit 2FA-Login, Karten, Diagrammen, Forum und Echtzeit-Chat. Spring Boot + Angular + PostgreSQL.',
          bolleye: 'Bölleye: erkennt Maschinenteile live über die Kamera, mit OpenCV und MobileNet-SSD. In 4 Tagen gebaut.',
          mon: 'MON: Kita-Verwaltung mit Spring Boot, JWT und MySQL sowie einer Flutter-App.'
        }
      }
    },

    fr: {
      meta: {
        title: 'Khalil Meftehi · Ingénieur logiciel junior',
        description: "Portfolio de Khalil Meftehi, ingénieur logiciel junior à Bochum : projets Java, Spring Boot, Angular, Python et Flutter dans un monde en blocs."
      },
      nav: ['Accueil', 'À propos', 'Parcours', 'Compétences', 'Projets', 'Succès', 'Contact'],
      ui: {
        language: 'Langue', night: 'Nuit', day: 'Jour', soundOn: 'Son activé', soundOff: 'Son coupé',
        close: 'Fermer', hint: 'Fais défiler, utilise ← → ou appuie sur 1–7 pour voyager',
        loading: 'Génération du monde',
        steps: ['Construction du terrain', 'Plantation des arbres', 'Placement des coffres', 'Apparition du joueur'],
        tip: 'Astuce : clique sur un lieu du monde pour y aller',
        explorer: { title: 'Succès obtenu !', text: 'Explorateur : tu as visité tous les lieux' },
        noWebgl: "Ton navigateur ne peut pas afficher le monde 3D, mais tout le contenu fonctionne."
      },
      home: {
        greet: 'Salut, je suis',
        role: 'Ingénieur logiciel junior',
        tagline: "Je développe des applications full-stack avec Java, Spring Boot et Angular, de la base de données jusqu'à l'écran.",
        meta: 'Bochum · ITQ · Université de Duisbourg-Essen',
        cvDe: 'CV (allemand)', cvEn: 'CV (anglais)', contact: 'Me contacter'
      },
      about: {
        title: 'À propos',
        bullets: [
          'Ingénieur logiciel junior chez ITQ depuis mai 2023, avec Angular, C++, TypeScript et Python.',
          "Étudiant en informatique appliquée (génie logiciel) à l'Université de Duisbourg-Essen.",
          'Spécialité : Java et Spring Boot. Curieux du Web3.',
          "J'apprends vite et j'aime les problèmes difficiles, le travail en équipe et livrer des résultats qui marchent."
        ],
        infoTitle: 'Statistiques du joueur',
        info: [['Basé à', 'Bochum, Allemagne'], ['Études', 'Université de Duisbourg-Essen'], ['Travail', 'ITQ'], ['E-mail', EMAIL]],
        langTitle: 'Langues',
        langs: [['Arabe', 'Langue maternelle', 5], ['Français', 'Courant', 4], ['Anglais', 'Courant', 4], ['Allemand', 'C1 · TELC Hochschule', 4]],
        hobbiesTitle: 'Loisirs',
        hobbies: ['Lecture', 'Photographie', 'Cuisine', 'Musculation', 'Musique', 'Code']
      },
      journey: {
        title: 'Parcours',
        subtitle: "Chaque marche de l'ascension",
        items: [
          { tag: 'Travail', title: 'Ingénieur logiciel junior', org: 'ITQ', date: "mai 2023 – aujourd'hui", text: 'Développement en Angular, TypeScript, C++ et Python sur des projets variés.' },
          { tag: 'Études', title: 'Licence (B.Sc.) en informatique appliquée – génie logiciel', org: 'Université de Duisbourg-Essen', date: "2021 – aujourd'hui", text: 'Spécialité Java, Spring Boot et génie logiciel.' },
          { tag: 'Lycée', title: 'Baccalauréat (sciences de l\'informatique)', org: 'Lycée Chedli Atallah, Kairouan', date: '2018 – 2019', text: "Section sciences de l'informatique." }
        ]
      },
      skills: {
        title: 'Compétences',
        subtitle: 'Mon inventaire. Clique sur un objet.',
        cats: { lang: 'Langages', fw: 'Frameworks', tools: 'Outils & données' },
        level: 'Niveau', inProjects: 'Utilisé dans mes projets', pick: 'Choisis un objet pour voir les détails'
      },
      projects: {
        title: 'Projets',
        subtitle: "Ouvre un coffre pour voir ce qu'il contient",
        open: 'Ouvrir le coffre', features: 'Fonctionnalités', stack: 'Technologies',
        items: {
          gruppe: {
            name: 'Système de gestion de données', sub: 'Gruppe-I', date: 'avr. – juin 2023', context: "Projet d'équipe",
            short: 'Une plateforme web pour importer, consulter et modifier des jeux de données ouverts (CSV, XML, JSON), avec cartes, graphiques et communauté.',
            features: [
              'Inscription et connexion avec un code à deux facteurs envoyé par e-mail',
              'Importer, consulter, modifier et télécharger des données en CSV, XML et JSON',
              'Graphiques avec d3 et cartes avec Leaflet, y compris des géodonnées (GeoJSON, UTM)',
              "Forum de discussion, liste d'amis et chat en temps réel via WebSocket (STOMP)",
              "Tickets de support et un chatbot d'aide",
              'Déploiement avec Docker Compose : PostgreSQL, API Spring Boot, app Angular sur nginx'
            ]
          },
          bolleye: {
            name: 'Application de reconnaissance IA', sub: 'Bölleye · pour une machine Böllhof', date: 'févr. – mars 2024', context: 'Prototype de makeathon en 4 jours',
            short: "Une application caméra qui reconnaît les pièces d'une machine en direct et indique comment les utiliser.",
            features: [
              'Diffuse la webcam dans le navigateur en temps réel (Flask, MJPEG)',
              'Détecte les objets dans chaque image avec un modèle MobileNet-SSD pré-entraîné (OpenCV DNN)',
              'Encadre les pièces détectées à plus de 50 % de confiance',
              'Prototype fonctionnel présenté après 4 jours de travail en équipe'
            ]
          },
          mon: {
            name: 'Système de gestion de crèche', sub: 'MON', date: 'juil. – sept. 2024', context: 'Full-stack : API REST + application mobile',
            short: 'Gère une crèche : enfants, groupes, parents, personnel, présences, paiements et plannings.',
            features: [
              'API REST avec 11 modules : enfants, groupes, parents, employés, responsables, fournisseurs, présences, congés, paiements, plannings, ressources',
              'Connexion sécurisée avec Spring Security et JWT',
              'Base de données MySQL avec Spring Data JPA',
              'Application Flutter multiplateforme avec connexion et inscription (GetX, Dio)'
            ]
          }
        }
      },
      achievements: {
        title: 'Succès',
        subtitle: 'Certificats et étapes clés',
        made: 'Succès obtenu !', view: 'Voir le certificat',
        kinds: { course: 'Certificat de cours', event: 'Makeathon', lang: 'Certificat de langue' },
        items: {
          spring: 'Master Spring Boot 3 & Spring Framework 6 with Java',
          python: 'Complete Python Programming 2020: Beginner to Advanced',
          makeathon: 'Smart Green Island Makeathon',
          telc: 'Allemand C1 · TELC Hochschule'
        }
      },
      contact: {
        title: 'Contact',
        subtitle: 'Un poste, un projet ou une question ? Envoie-moi un message.',
        name: 'Nom', email: 'E-mail', message: 'Message', send: 'Envoyer',
        sending: 'Envoi…', ok: 'Message envoyé. Merci !', fail: "Échec de l'envoi. Écris-moi directement par e-mail.",
        invalid: 'Merci de remplir tous les champs.', or: 'Ou retrouve-moi ici',
        footer: 'Construit bloc par bloc par Khalil Meftehi'
      },
      chat: {
        title: 'Guide du village', open: 'Demander au guide',
        placeholder: 'Pose une question : compétences, projets, CV…', send: 'Envoyer',
        hello: 'Hmm ! Salut, je suis le guide du village. Demande-moi les compétences de Khalil, ses projets, son CV ou comment le contacter.',
        chips: [['Compétences', 'skills'], ['Projets', 'projects'], ['CV', 'cv'], ['Contact', 'contact']],
        go: 'Emmène-moi',
        fallback: 'Hmm… je ne connais que Khalil. Essaie : compétences, projets, CV, études ou contact.',
        answers: {
          greet: 'Hmm ! Bonjour, voyageur. Que veux-tu savoir ?',
          about: "Khalil est ingénieur logiciel junior à Bochum. Il travaille chez ITQ et étudie à l'Université de Duisbourg-Essen.",
          skills: 'Ses outils les plus forts : Java et Spring Boot. Il utilise aussi Angular, TypeScript, Python, C++, SQL, Flutter et Docker.',
          projects: "Trois coffres : Gruppe-I (plateforme de données, Spring Boot + Angular), Bölleye (détection d'objets IA en direct, Python + OpenCV) et MON (gestion de crèche, Spring Boot + Flutter).",
          cv: "Télécharge son CV en allemand ou en anglais depuis l'accueil.",
          contact: 'Utilise le formulaire près du portail ou écris à ' + EMAIL + '.',
          study: "Licence en informatique appliquée (génie logiciel) à l'Université de Duisbourg-Essen, depuis 2021.",
          work: 'Ingénieur logiciel junior chez ITQ depuis mai 2023 : Angular, TypeScript, C++ et Python.',
          languages: 'Il parle arabe, français, anglais et allemand (C1).',
          gruppe: 'Gruppe-I : plateforme de données avec connexion 2FA, cartes, graphiques, forum et chat en temps réel. Spring Boot + Angular + PostgreSQL.',
          bolleye: 'Bölleye : reconnaît des pièces de machine en direct par caméra, avec OpenCV et MobileNet-SSD. Construit en 4 jours.',
          mon: 'MON : gestion de crèche avec Spring Boot, JWT et MySQL, plus une application Flutter.'
        }
      }
    },

    ar: {
      meta: {
        title: 'Khalil Meftehi · مهندس برمجيات',
        description: 'ملف أعمال خليل المفتاحي، مهندس برمجيات مبتدئ في بوخوم: مشاريع Java وSpring Boot وAngular وPython وFlutter داخل عالم من المكعبات.'
      },
      nav: ['الرئيسية', 'من أنا', 'المسيرة', 'المهارات', 'المشاريع', 'الإنجازات', 'تواصل'],
      ui: {
        language: 'اللغة', night: 'ليل', day: 'نهار', soundOn: 'الصوت مفعّل', soundOff: 'الصوت مكتوم',
        close: 'إغلاق', hint: 'مرّر أو استخدم الأسهم أو اضغط 1–7 للتنقل',
        loading: 'جارٍ إنشاء العالم',
        steps: ['بناء التضاريس', 'زراعة الأشجار', 'وضع الصناديق', 'ظهور اللاعب'],
        tip: 'نصيحة: اضغط على أي مكان في العالم للانتقال إليه',
        explorer: { title: 'تم تحقيق إنجاز!', text: 'المستكشف: زرت كل الأماكن' },
        noWebgl: 'متصفحك لا يستطيع عرض العالم ثلاثي الأبعاد، لكن كل المحتوى يعمل.'
      },
      home: {
        greet: 'مرحبًا، أنا',
        role: 'مهندس برمجيات مبتدئ',
        tagline: 'أطوّر تطبيقات متكاملة (Full-Stack) باستخدام Java وSpring Boot وAngular، من قاعدة البيانات حتى الواجهة.',
        meta: 'بوخوم · ITQ · جامعة دويسبورغ-إسن',
        cvDe: 'السيرة الذاتية (بالألمانية)', cvEn: 'السيرة الذاتية (بالإنجليزية)', contact: 'تواصل معي'
      },
      about: {
        title: 'من أنا',
        bullets: [
          'مهندس برمجيات مبتدئ في شركة ITQ منذ مايو 2023، أعمل بـ Angular وC++ وTypeScript وPython.',
          'أدرس علوم الحاسوب التطبيقية (هندسة البرمجيات) في جامعة دويسبورغ-إسن.',
          'تركيزي الأساسي: Java وSpring Boot، ولدي فضول تجاه تقنيات Web3.',
          'أتعلّم بسرعة، وأحب المشكلات الصعبة والعمل الجماعي وتسليم نتائج تعمل فعلًا.'
        ],
        infoTitle: 'إحصائيات اللاعب',
        info: [['مقيم في', 'بوخوم، ألمانيا'], ['الدراسة', 'جامعة دويسبورغ-إسن'], ['العمل', 'ITQ'], ['البريد', EMAIL]],
        langTitle: 'اللغات',
        langs: [['العربية', 'اللغة الأم', 5], ['الفرنسية', 'بطلاقة', 4], ['الإنجليزية', 'بطلاقة', 4], ['الألمانية', 'C1 · TELC Hochschule', 4]],
        hobbiesTitle: 'الهوايات',
        hobbies: ['القراءة', 'التصوير', 'الطبخ', 'الرياضة', 'الموسيقى', 'البرمجة']
      },
      journey: {
        title: 'المسيرة',
        subtitle: 'كل درجة في طريق الصعود',
        items: [
          { tag: 'العمل', title: 'مهندس برمجيات مبتدئ', org: 'ITQ', date: 'مايو 2023 – الآن', text: 'تطوير بـ Angular وTypeScript وC++ وPython في مشاريع متنوعة.' },
          { tag: 'الدراسة', title: 'بكالوريوس علوم الحاسوب التطبيقية – هندسة البرمجيات', org: 'جامعة دويسبورغ-إسن', date: '2021 – الآن', text: 'تركيز على Java وSpring Boot وهندسة البرمجيات.' },
          { tag: 'الثانوية', title: 'البكالوريا (شعبة علوم الإعلامية)', org: 'معهد الشاذلي عطاء الله، القيروان', date: '2018 – 2019', text: 'شعبة علوم الإعلامية.' }
        ]
      },
      skills: {
        title: 'المهارات',
        subtitle: 'حقيبتي. اضغط على أي عنصر.',
        cats: { lang: 'لغات البرمجة', fw: 'أُطر العمل', tools: 'أدوات وبيانات' },
        level: 'المستوى', inProjects: 'استخدمته في مشاريعي', pick: 'اختر عنصرًا لرؤية التفاصيل'
      },
      projects: {
        title: 'المشاريع',
        subtitle: 'افتح صندوقًا لترى ما بداخله',
        open: 'افتح الصندوق', features: 'ماذا يفعل', stack: 'التقنيات',
        items: {
          gruppe: {
            name: 'نظام إدارة البيانات', sub: 'Gruppe-I', date: 'أبريل – يونيو 2023', context: 'مشروع جماعي',
            short: 'منصة ويب لرفع مجموعات البيانات المفتوحة (CSV وXML وJSON) وعرضها وتعديلها، مع خرائط ورسوم بيانية ومجتمع.',
            features: [
              'تسجيل ودخول برمز تحقق ثنائي يُرسل عبر البريد الإلكتروني',
              'رفع البيانات وعرضها وتعديلها وتنزيلها بصيغ CSV وXML وJSON',
              'رسوم بيانية بـ d3 وخرائط بـ Leaflet تشمل بيانات جغرافية (GeoJSON وUTM)',
              'منتدى نقاش وقائمة أصدقاء ودردشة فورية عبر WebSocket (STOMP)',
              'تذاكر دعم فني وروبوت دردشة للمساعدة',
              'يعمل عبر Docker Compose: قاعدة PostgreSQL وواجهة Spring Boot البرمجية وتطبيق Angular على nginx'
            ]
          },
          bolleye: {
            name: 'تطبيق التعرّف بالذكاء الاصطناعي', sub: 'Bölleye · لآلة Böllhof', date: 'فبراير – مارس 2024', context: 'نموذج أولي في ماكاثون خلال 4 أيام',
            short: 'تطبيق كاميرا يتعرّف على قطع الآلة مباشرة ويعرض طريقة استخدامها.',
            features: [
              'بث الكاميرا إلى المتصفح في الوقت الحقيقي (Flask وMJPEG)',
              'كشف الأجسام في كل إطار بنموذج MobileNet-SSD مدرَّب مسبقًا (OpenCV DNN)',
              'رسم إطار حول القطع المكتشفة بثقة تتجاوز 50٪',
              'عرض نموذج أولي يعمل بعد 4 أيام من العمل الجماعي'
            ]
          },
          mon: {
            name: 'نظام إدارة الحضانة', sub: 'MON', date: 'يوليو – سبتمبر 2024', context: 'مشروع متكامل: واجهة REST وتطبيق جوال',
            short: 'يدير حضانة أطفال: الأطفال والمجموعات والأولياء والموظفين والحضور والمدفوعات والجداول.',
            features: [
              'واجهة REST بـ 11 وحدة: الأطفال، المجموعات، الأولياء، الموظفون، المديرون، المزوّدون، الحضور، الإجازات، المدفوعات، الجداول، الموارد',
              'دخول آمن عبر Spring Security ورموز JWT',
              'قاعدة بيانات MySQL مع Spring Data JPA',
              'تطبيق Flutter متعدد المنصات مع تسجيل الدخول وإنشاء الحساب (GetX وDio)'
            ]
          }
        }
      },
      achievements: {
        title: 'الإنجازات',
        subtitle: 'شهادات ومحطات مهمة',
        made: 'تم تحقيق إنجاز!', view: 'عرض الشهادة',
        kinds: { course: 'شهادة دورة', event: 'ماكاثون', lang: 'شهادة لغة' },
        items: {
          spring: 'Master Spring Boot 3 & Spring Framework 6 with Java',
          python: 'Complete Python Programming 2020: Beginner to Advanced',
          makeathon: 'Smart Green Island Makeathon',
          telc: 'الألمانية C1 · TELC Hochschule'
        }
      },
      contact: {
        title: 'تواصل',
        subtitle: 'عندك وظيفة أو مشروع أو سؤال؟ أرسل لي رسالة.',
        name: 'الاسم', email: 'البريد الإلكتروني', message: 'الرسالة', send: 'إرسال',
        sending: 'جارٍ الإرسال…', ok: 'تم إرسال الرسالة. شكرًا لك!', fail: 'تعذّر الإرسال. راسلني مباشرة عبر البريد.',
        invalid: 'يرجى ملء جميع الحقول.', or: 'أو تجدني هنا',
        footer: 'بُني كتلةً كتلة بواسطة Khalil Meftehi'
      },
      chat: {
        title: 'دليل القرية', open: 'اسأل الدليل',
        placeholder: 'اسأل عن المهارات أو المشاريع أو السيرة…', send: 'إرسال',
        hello: 'همم! مرحبًا، أنا دليل القرية. اسألني عن مهارات خليل أو مشاريعه أو سيرته الذاتية أو كيف تتواصل معه.',
        chips: [['المهارات', 'skills'], ['المشاريع', 'projects'], ['السيرة الذاتية', 'cv'], ['تواصل', 'contact']],
        go: 'خذني إلى هناك',
        fallback: 'همم… لا أعرف إلا عن خليل. جرّب: المهارات، المشاريع، السيرة، الدراسة أو التواصل.',
        answers: {
          greet: 'همم! أهلًا أيها المسافر. ماذا تريد أن تعرف؟',
          about: 'خليل مهندس برمجيات مبتدئ في بوخوم، يعمل في ITQ ويدرس في جامعة دويسبورغ-إسن.',
          skills: 'أقوى أدواته: Java وSpring Boot. ويعمل أيضًا بـ Angular وTypeScript وPython وC++ وSQL وFlutter وDocker.',
          projects: 'ثلاثة صناديق: Gruppe-I (منصة بيانات، Spring Boot + Angular)، وBölleye (كشف أجسام بالذكاء الاصطناعي مباشرة، Python + OpenCV)، وMON (إدارة حضانة، Spring Boot + Flutter).',
          cv: 'حمّل سيرته الذاتية بالألمانية أو الإنجليزية من الصفحة الرئيسية.',
          contact: 'استخدم النموذج عند البوابة أو راسله على ' + EMAIL + '.',
          study: 'بكالوريوس علوم الحاسوب التطبيقية (هندسة البرمجيات) في جامعة دويسبورغ-إسن منذ 2021.',
          work: 'مهندس برمجيات مبتدئ في ITQ منذ مايو 2023: Angular وTypeScript وC++ وPython.',
          languages: 'يتحدث العربية والفرنسية والإنجليزية والألمانية (C1).',
          gruppe: 'Gruppe-I: منصة بيانات بدخول ثنائي التحقق وخرائط ورسوم بيانية ومنتدى ودردشة فورية. Spring Boot + Angular + PostgreSQL.',
          bolleye: 'Bölleye: يتعرّف على قطع الآلات مباشرة عبر الكاميرا باستخدام OpenCV وMobileNet-SSD. بُني في 4 أيام.',
          mon: 'MON: نظام إدارة حضانة بـ Spring Boot وJWT وMySQL مع تطبيق Flutter.'
        }
      }
    }
  };

  /* Chat intents: keywords from every language, so a German question works on the English page.
     `go` = section index to offer travel to. Order matters: specific intents first. */
  window.CHAT_INTENTS = [
    { id: 'gruppe', go: 4, words: ['gruppe', 'data management', 'datensatz', 'datenplattform', 'données'] },
    { id: 'bolleye', go: 4, words: ['bölleye', 'bolleye', 'böll', 'boll', 'opencv', 'detection', 'erkennung', 'détection', 'reconnaissance', 'ذكاء', 'ai', 'ki', 'ia'] },
    { id: 'mon', go: 4, words: ['nursery', 'kita', 'crèche', 'creche', 'flutter', 'حضانة', 'mon'] },
    { id: 'cv', go: 0, words: ['cv', 'resume', 'résumé', 'lebenslauf', 'download', 'السيرة', 'سيرة'] },
    { id: 'contact', go: 6, words: ['contact', 'kontakt', 'email', 'e-mail', 'mail', 'hire', 'reach', 'joindre', 'تواصل', 'اتصال', 'بريد'] },
    { id: 'skills', go: 3, words: ['skill', 'stack', 'tech', 'java', 'spring', 'angular', 'python', 'fähigkeit', 'kenntnis', 'compétence', 'competence', 'مهار', 'تقني'] },
    { id: 'projects', go: 4, words: ['project', 'projekt', 'projet', 'chest', 'truhe', 'coffre', 'مشروع', 'مشاريع', 'صندوق'] },
    { id: 'study', go: 2, words: ['study', 'studi', 'university', 'universität', 'uni', 'degree', 'school', 'schule', 'abitur', 'bachelor', 'étud', 'etud', 'université', 'école', 'diplôme', 'licence', 'bac', 'درس', 'دراس', 'جامع', 'شهادة'] },
    { id: 'work', go: 2, words: ['work', 'job', 'itq', 'arbeit', 'beruf', 'firma', 'experience', 'erfahrung', 'travail', 'travaille', 'expérience', 'emploi', 'entreprise', 'عمل', 'يعمل', 'خبرة', 'شركة'] },
    { id: 'languages', go: 1, words: ['language', 'sprache', 'langue', 'speak', 'sprichst', 'parle', 'لغة', 'لغات'] },
    { id: 'about', go: 1, words: ['who', 'about', 'wer', 'über', 'qui', 'propos', 'من هو', 'من أنت'] },
    { id: 'greet', go: null, words: ['hi', 'hello', 'hey', 'hallo', 'salut', 'bonjour', 'مرحبا', 'السلام', 'أهلا', 'اهلا'] }
  ];
})();
