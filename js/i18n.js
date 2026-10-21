/* All visible text, one object per language. Every language has the same shape. */
(function () {
  const EMAIL = 'meftehikhalil78@gmail.com';

  window.I18N = {
    en: {
      meta: {
        title: 'Khalil Meftehi · Junior Software Engineer',
        description: 'Portfolio of Khalil Meftehi, junior software engineer in Bochum: Java, Spring Boot, Angular, Flutter and Python machine-learning projects in a block world.'
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
          "Bachelor project in machine learning: forecasting blood glucose with PyTorch and scikit-learn.",
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
        problem: "The problem", approach: "How it works", results: "Results", role: "My role", links: "Links",
        cols: ["Model", "RMSE (mg/dL)", "Clarke Zone A"], noLink: "Code available on request",
        items: {
          glucose: {
            name: "Blood Glucose Forecasting",
            sub: "Bachelor project · UDE",
            official: "Official title: Using Blood Sugar Forecasts to Optimize Insulin Doses",
            date: "Jun – Aug 2026",
            context: "Team of 2, with Abeer Yanek",
            short: "Machine-learning models that predict blood sugar 15 to 45 minutes ahead for people with type 1 diabetes, rated by clinical safety, not only by error.",
            problem: "People with type 1 diabetes dose insulin based on where their blood sugar is heading. A reliable short-term forecast gives them, or an insulin pump, time to act before a dangerous low or high. We benchmarked which models and input features work best.",
            features: ["Loaders for three datasets (OhioT1DM, Glucdict, BIG IDEAs) put every signal on the same 5-minute grid", "Leak-free preprocessing: missing meals and insulin count as \"no event\", sensor gaps are dropped, scaling is fit on training data only", "Sliding windows of 1 to 6 hours of history predict glucose 15, 30 and 45 minutes ahead", "Seven model families: LSTM, Seq2Seq autoencoder, TCN, Transformer, Random Forest, Gradient Boosting and CNN-LSTM", "Grid search, then identical final training for every model (150 epochs, early stopping, fixed seed)", "A clinically weighted loss punishes errors in the low and high ranges harder, based on an interview with a doctor", "Evaluation with RMSE, MAE and the Clarke Error Grid, plus leave-one-patient-out tests"],
            resultsIntro: "OhioT1DM, 12 patients, 30 minutes ahead (mean ± std across patients):",
            resultsMore: ["15 minutes ahead, the LSTM reaches 13.13 mg/dL RMSE with 96.5 % of predictions in Zone A (clinically accurate)", "A model trained only on other patients stays within 1 mg/dL of a personal LSTM (leave-one-patient-out, 30 min)", "Adding wearable signals such as heart rate or steps gave no consistent gain over glucose and clinical inputs", "Other datasets, LSTM RMSE: Glucdict 13.97 mg/dL (13 users, 30 min), BIG IDEAs 16.12 mg/dL (16 participants)"],
            role: "I built the shared pipeline: the OhioT1DM and Glucdict loaders, the LSTM, autoencoder, TCN, Transformer and Random Forest models, the Gradient Boosting port, the shared clinically weighted loss, the Clarke Error Grid evaluation, the grid search and the leave-one-patient-out experiments. Abeer built the BIG IDEAs pipeline and the CNN-LSTM.",
            captions: ["Clarke Error Grid, 30 minutes ahead, all 12 OhioT1DM patients: Random Forest (86.5 % Zone A) and LSTM (87.1 %)", "Feature ablation, 30-minute RMSE, OhioT1DM 2018 cohort (4 patients)"],
            note: "OhioT1DM, Glucdict and BIG IDEAs were used under their access terms. No patient data is published here."
          },
          generio: {
            name: "GENERIO: AI 3D Model Generator",
            sub: "Intelligent User Interfaces · University of Duisburg-Essen",
            date: "Jun – Jul 2026",
            context: "Solo course project",
            short: "A web app that turns a text prompt, a sketch or a photo into a 3D model you can rotate in the browser and download.",
            problem: "Making a 3D model usually takes modelling skills and special software. GENERIO lets anyone describe or draw an object and get a 3D model back, by wrapping a generative AI API in a simple interface.",
            features: ["Streamlit interface with five modes: prompt to model, sketch to model, sketch from prompt, image to model, and photo to sketch to model", "FastAPI backend holds all API logic, so the interface never talks to the AI service directly", "Two chained AI steps: text or sketch to a 2D image, then image to a 3D mesh", "Long jobs are polled until ready, and the access token is renewed automatically because it expires after about 5 minutes", "Photos become sketches with OpenCV edge detection (Canny) and can be refined on a drawing canvas", "Prompt-based editing changes an existing image instead of generating a new one", "Results show in an interactive 3D viewer and download as .glb files"],
            resultsMore: ["All five modes work end to end", "Images are ready in about 10 to 20 seconds, 3D models in about 3 to 7 minutes", "Verified a complete 19.5 MB binary glTF model from prompt to download", "Found and worked around 10 places where the API documentation did not match the live API (endpoints, field names, app values, token lifetime)"],
            role: "I built the whole app on my own: the FastAPI backend and its API integration, the Streamlit interface, the sketch canvas and the OpenCV photo-to-sketch step.",
            captions: ["Sketches and images generated in the app, the step before the 3D model"],
            linkNote: "Code on request (university GitLab)."
          },
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
          projects: "Five chests: Blood Glucose Forecasting (bachelor project, PyTorch), GENERIO (AI 3D models, FastAPI + Streamlit), Gruppe-I (data platform, Spring Boot + Angular), Bölleye (live AI object detection, Python + OpenCV) and MON (nursery management, Spring Boot + Flutter).",
          cv: 'Download his CV in German or English on the Home page.',
          contact: 'Use the form at the portal, or email ' + EMAIL + '.',
          study: 'B.Sc. Applied Computer Science (Software Engineering) at the University of Duisburg-Essen, since 2021.',
          work: 'Junior Software Engineer at ITQ since May 2023: Angular, TypeScript, C++ and Python.',
          languages: 'He speaks Arabic, French, English and German (C1).',
          gruppe: 'Gruppe-I: a data platform with 2FA login, maps, charts, a forum and real-time chat. Spring Boot + Angular + PostgreSQL.',
          bolleye: 'Bölleye: recognizes machine parts live through the camera, with OpenCV and MobileNet-SSD. Built in 4 days.',
          mon: 'MON: nursery management with Spring Boot, JWT and MySQL, plus a Flutter app.',
          glucose: "Blood Glucose Forecasting: his bachelor project with Abeer Yanek. Seven ML models predict blood sugar up to 45 minutes ahead. Best at 30 min: LSTM, 21.79 mg/dL RMSE, 87.1 % in Clarke Zone A.",
          generio: "GENERIO: his solo web app that turns a prompt, sketch or photo into a 3D model. FastAPI + Streamlit + OpenCV on top of a generative AI API."
        }
      }
    },

    de: {
      meta: {
        title: 'Khalil Meftehi · Junior Software Engineer',
        description: 'Portfolio von Khalil Meftehi, Junior Software Engineer in Bochum: Projekte mit Java, Spring Boot, Angular, Flutter und Machine Learning in Python in einer Blockwelt.'
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
          "Bachelorprojekt im Machine Learning: Blutzucker-Prognosen mit PyTorch und scikit-learn.",
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
        problem: "Das Problem", approach: "So funktioniert es", results: "Ergebnisse", role: "Meine Rolle", links: "Links",
        cols: ["Modell", "RMSE (mg/dL)", "Clarke-Zone A"], noLink: "Code auf Anfrage",
        items: {
          glucose: {
            name: "Blutzucker-Prognose",
            sub: "Bachelorprojekt · UDE",
            official: "Offizieller Titel: Using Blood Sugar Forecasts to Optimize Insulin Doses",
            date: "Jun – Aug 2026",
            context: "Zweierteam, mit Abeer Yanek",
            short: "Machine-Learning-Modelle, die den Blutzucker bei Typ-1-Diabetes 15 bis 45 Minuten im Voraus vorhersagen, bewertet nach klinischer Sicherheit, nicht nur nach dem Fehler.",
            problem: "Menschen mit Typ-1-Diabetes dosieren Insulin danach, wohin sich ihr Blutzucker entwickelt. Eine verlässliche Kurzzeitprognose gibt ihnen oder einer Insulinpumpe Zeit, vor einer gefährlichen Unter- oder Überzuckerung zu reagieren. Wir haben verglichen, welche Modelle und Eingabedaten am besten funktionieren.",
            features: ["Loader für drei Datensätze (OhioT1DM, Glucdict, BIG IDEAs) bringen alle Signale auf dasselbe 5-Minuten-Raster", "Vorverarbeitung ohne Datenleck: fehlende Mahlzeiten und Insulin zählen als „kein Ereignis“, Sensorlücken werden verworfen, die Skalierung wird nur auf Trainingsdaten gelernt", "Gleitende Fenster mit 1 bis 6 Stunden Verlauf sagen den Blutzucker 15, 30 und 45 Minuten voraus", "Sieben Modellfamilien: LSTM, Seq2Seq-Autoencoder, TCN, Transformer, Random Forest, Gradient Boosting und CNN-LSTM", "Grid Search, danach identisches finales Training für jedes Modell (150 Epochen, Early Stopping, fester Seed)", "Eine klinisch gewichtete Loss-Funktion bestraft Fehler im niedrigen und hohen Bereich stärker, basierend auf einem ärztlichen Interview", "Bewertung mit RMSE, MAE und dem Clarke Error Grid sowie Leave-one-patient-out-Tests"],
            resultsIntro: "OhioT1DM, 12 Patienten, 30 Minuten voraus (Mittelwert ± Standardabweichung über die Patienten):",
            resultsMore: ["15 Minuten voraus erreicht das LSTM 13,13 mg/dL RMSE, 96,5 % der Vorhersagen liegen in Zone A (klinisch genau)", "Ein Modell, das nur auf anderen Patienten trainiert wurde, liegt höchstens 1 mg/dL hinter einem persönlichen LSTM (Leave-one-patient-out, 30 min)", "Wearable-Signale wie Herzfrequenz oder Schritte brachten keinen durchgehenden Vorteil gegenüber Glukose und klinischen Daten", "Weitere Datensätze, LSTM-RMSE: Glucdict 13,97 mg/dL (13 Personen, 30 min), BIG IDEAs 16,12 mg/dL (16 Teilnehmende)"],
            role: "Ich habe die gemeinsame Pipeline gebaut: die Loader für OhioT1DM und Glucdict, die Modelle LSTM, Autoencoder, TCN, Transformer und Random Forest, die Portierung von Gradient Boosting, die gemeinsame klinisch gewichtete Loss-Funktion, die Auswertung mit dem Clarke Error Grid, die Grid Search und die Leave-one-patient-out-Experimente. Abeer hat die BIG-IDEAs-Pipeline und das CNN-LSTM gebaut.",
            captions: ["Clarke Error Grid, 30 Minuten voraus, alle 12 OhioT1DM-Patienten: Random Forest (86,5 % Zone A) und LSTM (87,1 %)", "Feature-Ablation, RMSE bei 30 Minuten, OhioT1DM-Kohorte 2018 (4 Patienten)"],
            note: "OhioT1DM, Glucdict und BIG IDEAs wurden gemäß ihren Nutzungsbedingungen verwendet. Hier werden keine Patientendaten veröffentlicht."
          },
          generio: {
            name: "GENERIO: KI-3D-Modellgenerator",
            sub: "Intelligent User Interfaces · Universität Duisburg-Essen",
            date: "Jun – Jul 2026",
            context: "Kursprojekt, allein umgesetzt",
            short: "Eine Web-App, die aus einem Text, einer Skizze oder einem Foto ein 3D-Modell macht, das man im Browser drehen und herunterladen kann.",
            problem: "Ein 3D-Modell zu erstellen braucht meist Modellier-Kenntnisse und spezielle Software. Mit GENERIO beschreibt oder zeichnet man ein Objekt und bekommt ein 3D-Modell zurück, weil die App eine generative KI-API hinter einer einfachen Oberfläche bündelt.",
            features: ["Streamlit-Oberfläche mit fünf Modi: Text zu Modell, Skizze zu Modell, Skizze aus Text, Bild zu Modell sowie Foto zu Skizze zu Modell", "Das FastAPI-Backend enthält die gesamte API-Logik, die Oberfläche spricht nie direkt mit dem KI-Dienst", "Zwei verkettete KI-Schritte: Text oder Skizze zu einem 2D-Bild, dann Bild zu einem 3D-Mesh", "Lange Jobs werden bis zur Fertigstellung abgefragt, das Zugriffstoken wird automatisch erneuert, da es nach etwa 5 Minuten abläuft", "Fotos werden per OpenCV-Kantenerkennung (Canny) zu Skizzen und lassen sich auf einer Zeichenfläche verfeinern", "Bearbeitung per Text ändert ein vorhandenes Bild, statt ein neues zu erzeugen", "Ergebnisse erscheinen in einem interaktiven 3D-Viewer und lassen sich als .glb herunterladen"],
            resultsMore: ["Alle fünf Modi funktionieren durchgängig", "Bilder sind nach etwa 10 bis 20 Sekunden fertig, 3D-Modelle nach etwa 3 bis 7 Minuten", "Ein vollständiges binäres glTF-Modell mit 19,5 MB vom Text bis zum Download geprüft", "10 Stellen gefunden und gelöst, an denen die API-Dokumentation nicht zur echten API passte (Endpunkte, Feldnamen, App-Werte, Token-Laufzeit)"],
            role: "Ich habe die ganze App allein gebaut: das FastAPI-Backend mit der API-Anbindung, die Streamlit-Oberfläche, die Zeichenfläche und den OpenCV-Schritt vom Foto zur Skizze.",
            captions: ["In der App erzeugte Skizzen und Bilder, der Schritt vor dem 3D-Modell"],
            linkNote: "Code auf Anfrage (GitLab der Universität)."
          },
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
          projects: "Fünf Truhen: Blutzucker-Prognose (Bachelorprojekt, PyTorch), GENERIO (KI-3D-Modelle, FastAPI + Streamlit), Gruppe-I (Datenplattform, Spring Boot + Angular), Bölleye (KI-Objekterkennung live, Python + OpenCV) und MON (Kita-Verwaltung, Spring Boot + Flutter).",
          cv: 'Den Lebenslauf gibt es auf Deutsch und Englisch auf der Startseite.',
          contact: 'Nutze das Formular am Portal oder schreib an ' + EMAIL + '.',
          study: 'B.Sc. Angewandte Informatik (Software Engineering) an der Universität Duisburg-Essen, seit 2021.',
          work: 'Junior Software Engineer bei ITQ seit Mai 2023: Angular, TypeScript, C++ und Python.',
          languages: 'Er spricht Arabisch, Französisch, Englisch und Deutsch (C1).',
          gruppe: 'Gruppe-I: Datenplattform mit 2FA-Login, Karten, Diagrammen, Forum und Echtzeit-Chat. Spring Boot + Angular + PostgreSQL.',
          bolleye: 'Bölleye: erkennt Maschinenteile live über die Kamera, mit OpenCV und MobileNet-SSD. In 4 Tagen gebaut.',
          mon: 'MON: Kita-Verwaltung mit Spring Boot, JWT und MySQL sowie einer Flutter-App.',
          glucose: "Blutzucker-Prognose: sein Bachelorprojekt mit Abeer Yanek. Sieben ML-Modelle sagen den Blutzucker bis zu 45 Minuten voraus. Bestes bei 30 min: LSTM, 21,79 mg/dL RMSE, 87,1 % in Clarke-Zone A.",
          generio: "GENERIO: seine allein gebaute Web-App, die aus Text, Skizze oder Foto ein 3D-Modell macht. FastAPI + Streamlit + OpenCV auf einer generativen KI-API."
        }
      }
    },

    fr: {
      meta: {
        title: 'Khalil Meftehi · Ingénieur logiciel junior',
        description: "Portfolio de Khalil Meftehi, ingénieur logiciel junior à Bochum : projets Java, Spring Boot, Angular, Flutter et machine learning en Python dans un monde en blocs."
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
          "Projet de licence en machine learning : prévision de la glycémie avec PyTorch et scikit-learn.",
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
        problem: "Le problème", approach: "Comment ça marche", results: "Résultats", role: "Mon rôle", links: "Liens",
        cols: ["Modèle", "RMSE (mg/dL)", "Zone A de Clarke"], noLink: "Code disponible sur demande",
        items: {
          glucose: {
            name: "Prévision de la glycémie",
            sub: "Projet de licence · UDE",
            official: "Titre officiel : Using Blood Sugar Forecasts to Optimize Insulin Doses",
            date: "juin – août 2026",
            context: "Équipe de 2, avec Abeer Yanek",
            short: "Des modèles de machine learning qui prédisent la glycémie 15 à 45 minutes à l'avance pour les personnes atteintes de diabète de type 1, évalués sur la sécurité clinique et pas seulement sur l'erreur.",
            problem: "Les personnes atteintes de diabète de type 1 dosent l'insuline selon l'évolution de leur glycémie. Une prévision fiable à court terme leur laisse, ou laisse à une pompe à insuline, le temps d'agir avant une hypo ou une hyper dangereuse. Nous avons comparé quels modèles et quelles données d'entrée fonctionnent le mieux.",
            features: ["Des loaders pour trois jeux de données (OhioT1DM, Glucdict, BIG IDEAs) placent tous les signaux sur la même grille de 5 minutes", "Prétraitement sans fuite : repas et insuline manquants comptent comme « aucun événement », les trous de capteur sont supprimés, la normalisation est apprise sur les données d'entraînement seulement", "Des fenêtres glissantes de 1 à 6 heures d'historique prédisent la glycémie à 15, 30 et 45 minutes", "Sept familles de modèles : LSTM, autoencodeur Seq2Seq, TCN, Transformer, Random Forest, Gradient Boosting et CNN-LSTM", "Recherche par grille, puis entraînement final identique pour chaque modèle (150 époques, arrêt anticipé, graine fixe)", "Une perte pondérée cliniquement pénalise plus fort les erreurs dans les zones basses et hautes, suite à un entretien avec un médecin", "Évaluation avec RMSE, MAE et la grille d'erreur de Clarke, plus des tests leave-one-patient-out"],
            resultsIntro: "OhioT1DM, 12 patients, 30 minutes à l'avance (moyenne ± écart-type entre patients) :",
            resultsMore: ["À 15 minutes, le LSTM atteint 13,13 mg/dL de RMSE avec 96,5 % des prédictions en zone A (cliniquement exactes)", "Un modèle entraîné uniquement sur d'autres patients reste à moins de 1 mg/dL d'un LSTM personnel (leave-one-patient-out, 30 min)", "Ajouter des signaux de montre connectée (fréquence cardiaque, pas) n'apporte pas de gain constant par rapport au glucose et aux données cliniques", "Autres jeux de données, RMSE du LSTM : Glucdict 13,97 mg/dL (13 personnes, 30 min), BIG IDEAs 16,12 mg/dL (16 participants)"],
            role: "J'ai construit le pipeline commun : les loaders OhioT1DM et Glucdict, les modèles LSTM, autoencodeur, TCN, Transformer et Random Forest, le portage du Gradient Boosting, la perte pondérée cliniquement partagée, l'évaluation par grille de Clarke, la recherche par grille et les expériences leave-one-patient-out. Abeer a construit le pipeline BIG IDEAs et le CNN-LSTM.",
            captions: ["Grille d'erreur de Clarke, 30 minutes à l'avance, les 12 patients OhioT1DM : Random Forest (86,5 % en zone A) et LSTM (87,1 %)", "Ablation des variables, RMSE à 30 minutes, cohorte OhioT1DM 2018 (4 patients)"],
            note: "OhioT1DM, Glucdict et BIG IDEAs ont été utilisés selon leurs conditions d'accès. Aucune donnée de patient n'est publiée ici."
          },
          generio: {
            name: "GENERIO : générateur de modèles 3D par IA",
            sub: "Intelligent User Interfaces · Université de Duisbourg-Essen",
            date: "juin – juil. 2026",
            context: "Projet de cours, réalisé seul",
            short: "Une application web qui transforme un texte, un croquis ou une photo en modèle 3D que l'on peut tourner dans le navigateur et télécharger.",
            problem: "Créer un modèle 3D demande en général des compétences de modélisation et un logiciel spécialisé. Avec GENERIO, on décrit ou on dessine un objet et on reçoit un modèle 3D, grâce à une API d'IA générative derrière une interface simple.",
            features: ["Interface Streamlit avec cinq modes : texte vers modèle, croquis vers modèle, croquis depuis un texte, image vers modèle, et photo vers croquis vers modèle", "Le backend FastAPI contient toute la logique d'API, l'interface ne parle jamais directement au service d'IA", "Deux étapes d'IA enchaînées : texte ou croquis vers une image 2D, puis image vers un maillage 3D", "Les tâches longues sont interrogées jusqu'à la fin et le jeton d'accès est renouvelé automatiquement, car il expire après environ 5 minutes", "Les photos deviennent des croquis grâce à la détection de contours OpenCV (Canny) et peuvent être retouchées sur une zone de dessin", "L'édition par texte modifie une image existante au lieu d'en générer une nouvelle", "Les résultats s'affichent dans une visionneuse 3D interactive et se téléchargent en .glb"],
            resultsMore: ["Les cinq modes fonctionnent de bout en bout", "Les images sont prêtes en 10 à 20 secondes environ, les modèles 3D en 3 à 7 minutes environ", "Un modèle glTF binaire complet de 19,5 Mo vérifié du texte jusqu'au téléchargement", "10 écarts trouvés et contournés entre la documentation de l'API et l'API réelle (endpoints, noms de champs, valeurs d'app, durée du jeton)"],
            role: "J'ai construit toute l'application seul : le backend FastAPI et l'intégration de l'API, l'interface Streamlit, la zone de dessin et l'étape OpenCV de la photo au croquis.",
            captions: ["Croquis et images générés dans l'application, l'étape avant le modèle 3D"],
            linkNote: "Code sur demande (GitLab de l'université)."
          },
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
          projects: "Cinq coffres : Prévision de la glycémie (projet de licence, PyTorch), GENERIO (modèles 3D par IA, FastAPI + Streamlit), Gruppe-I (plateforme de données, Spring Boot + Angular), Bölleye (détection d'objets IA en direct, Python + OpenCV) et MON (gestion de crèche, Spring Boot + Flutter).",
          cv: "Télécharge son CV en allemand ou en anglais depuis l'accueil.",
          contact: 'Utilise le formulaire près du portail ou écris à ' + EMAIL + '.',
          study: "Licence en informatique appliquée (génie logiciel) à l'Université de Duisbourg-Essen, depuis 2021.",
          work: 'Ingénieur logiciel junior chez ITQ depuis mai 2023 : Angular, TypeScript, C++ et Python.',
          languages: 'Il parle arabe, français, anglais et allemand (C1).',
          gruppe: 'Gruppe-I : plateforme de données avec connexion 2FA, cartes, graphiques, forum et chat en temps réel. Spring Boot + Angular + PostgreSQL.',
          bolleye: 'Bölleye : reconnaît des pièces de machine en direct par caméra, avec OpenCV et MobileNet-SSD. Construit en 4 jours.',
          mon: 'MON : gestion de crèche avec Spring Boot, JWT et MySQL, plus une application Flutter.',
          glucose: "Prévision de la glycémie : son projet de licence avec Abeer Yanek. Sept modèles de ML prédisent la glycémie jusqu'à 45 minutes. Meilleur à 30 min : LSTM, 21,79 mg/dL de RMSE, 87,1 % en zone A de Clarke.",
          generio: "GENERIO : son application web, réalisée seul, qui transforme un texte, un croquis ou une photo en modèle 3D. FastAPI + Streamlit + OpenCV sur une API d'IA générative."
        }
      }
    },

    ar: {
      meta: {
        title: 'Khalil Meftehi · مهندس برمجيات',
        description: 'ملف أعمال خليل المفتاحي، مهندس برمجيات مبتدئ في بوخوم: مشاريع Java وSpring Boot وAngular وFlutter والتعلّم الآلي بـ Python داخل عالم من المكعبات.'
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
          "مشروع البكالوريوس في التعلّم الآلي: التنبؤ بسكر الدم باستخدام PyTorch وscikit-learn.",
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
        problem: "المشكلة", approach: "كيف يعمل", results: "النتائج", role: "دوري", links: "روابط",
        cols: ["النموذج", "RMSE (mg/dL)", "منطقة Clarke A"], noLink: "الكود متاح عند الطلب",
        items: {
          glucose: {
            name: "التنبؤ بسكر الدم",
            sub: "مشروع البكالوريوس · UDE",
            official: "العنوان الرسمي: Using Blood Sugar Forecasts to Optimize Insulin Doses",
            date: "يونيو – أغسطس 2026",
            context: "فريق من شخصين، مع عبير يانك",
            short: "نماذج تعلّم آلي تتنبأ بسكر الدم قبل 15 إلى 45 دقيقة لمرضى السكري من النوع الأول، وتُقيَّم حسب السلامة السريرية وليس حسب الخطأ فقط.",
            problem: "يحدد مرضى السكري من النوع الأول جرعة الأنسولين حسب اتجاه سكر الدم. التنبؤ الموثوق على المدى القصير يمنحهم، أو يمنح مضخة الأنسولين، وقتًا للتصرف قبل هبوط أو ارتفاع خطير. قارنّا أي النماذج وأي بيانات الإدخال تعمل بشكل أفضل.",
            features: ["أدوات تحميل لثلاث مجموعات بيانات (OhioT1DM وGlucdict وBIG IDEAs) تضع كل الإشارات على نفس الشبكة الزمنية كل 5 دقائق", "معالجة مسبقة بلا تسرّب للبيانات: الوجبات والأنسولين المفقودة تُعدّ «لا حدث»، وفجوات الحساسات تُحذف، والتطبيع يُحسب من بيانات التدريب فقط", "نوافذ منزلقة من 1 إلى 6 ساعات من السجل تتنبأ بالسكر بعد 15 و30 و45 دقيقة", "سبع عائلات نماذج: LSTM وSeq2Seq Autoencoder وTCN وTransformer وRandom Forest وGradient Boosting وCNN-LSTM", "بحث شبكي عن المعاملات، ثم تدريب نهائي موحّد لكل نموذج (150 حقبة، إيقاف مبكر، بذرة ثابتة)", "دالة خسارة موزونة سريريًا تعاقب الأخطاء في النطاقين المنخفض والمرتفع بشدة أكبر، بناءً على مقابلة مع طبيب", "التقييم بـ RMSE وMAE وشبكة أخطاء Clarke، إضافة إلى اختبارات ترك مريض واحد خارج التدريب"],
            resultsIntro: "OhioT1DM، 12 مريضًا، قبل 30 دقيقة (المتوسط ± الانحراف المعياري بين المرضى):",
            resultsMore: ["قبل 15 دقيقة يصل LSTM إلى RMSE قدره 13.13 mg/dL، و96.5% من التنبؤات في المنطقة A (دقيقة سريريًا)", "نموذج مدرَّب على مرضى آخرين فقط يبقى ضمن 1 mg/dL من نموذج LSTM شخصي (ترك مريض واحد، 30 دقيقة)", "إضافة إشارات الأجهزة القابلة للارتداء مثل نبض القلب أو الخطوات لم تُعطِ تحسنًا ثابتًا مقارنة بالسكر والبيانات السريرية", "مجموعات بيانات أخرى، RMSE لنموذج LSTM: ‏Glucdict ‏13.97 mg/dL (13 مستخدمًا، 30 دقيقة)، ‏BIG IDEAs ‏16.12 mg/dL (16 مشاركًا)"],
            role: "بنيتُ خط المعالجة المشترك: أدوات تحميل OhioT1DM وGlucdict، ونماذج LSTM وAutoencoder وTCN وTransformer وRandom Forest، ونقل Gradient Boosting، ودالة الخسارة الموزونة سريريًا المشتركة، والتقييم بشبكة Clarke، والبحث الشبكي، وتجارب ترك مريض واحد. وبنت عبير خط معالجة BIG IDEAs ونموذج CNN-LSTM.",
            captions: ["شبكة أخطاء Clarke، قبل 30 دقيقة، كل مرضى OhioT1DM الـ12: ‏Random Forest (‏86.5% في المنطقة A) و‏LSTM (‏87.1%)", "دراسة حذف الميزات، RMSE عند 30 دقيقة، مجموعة OhioT1DM لعام 2018 (4 مرضى)"],
            note: "استُخدمت OhioT1DM وGlucdict وBIG IDEAs وفق شروط الوصول الخاصة بها. لا تُنشر هنا أي بيانات للمرضى."
          },
          generio: {
            name: "GENERIO: مولّد نماذج ثلاثية الأبعاد بالذكاء الاصطناعي",
            sub: "Intelligent User Interfaces · جامعة دويسبورغ-إسن",
            date: "يونيو – يوليو 2026",
            context: "مشروع مقرر، أنجزته وحدي",
            short: "تطبيق ويب يحوّل نصًا أو رسمًا أو صورة إلى نموذج ثلاثي الأبعاد يمكن تدويره في المتصفح وتنزيله.",
            problem: "صنع نموذج ثلاثي الأبعاد يحتاج عادة إلى مهارات نمذجة وبرامج خاصة. مع GENERIO تصف الشيء أو ترسمه فتحصل على نموذج ثلاثي الأبعاد، لأن التطبيق يضع واجهة برمجية لذكاء اصطناعي توليدي خلف واجهة بسيطة.",
            features: ["واجهة Streamlit بخمسة أوضاع: من نص إلى نموذج، من رسم إلى نموذج، رسم من نص، من صورة إلى نموذج، ومن صورة إلى رسم ثم إلى نموذج", "خادم FastAPI يحمل كل منطق الواجهة البرمجية، فلا تتصل الواجهة بخدمة الذكاء الاصطناعي مباشرة", "خطوتان متتاليتان للذكاء الاصطناعي: من نص أو رسم إلى صورة ثنائية الأبعاد، ثم من الصورة إلى مجسّم ثلاثي الأبعاد", "تُتابَع المهام الطويلة حتى تكتمل، ويُجدَّد رمز الوصول تلقائيًا لأنه ينتهي بعد نحو 5 دقائق", "تتحول الصور إلى رسوم عبر كشف الحواف في OpenCV (Canny) ويمكن تحسينها على لوحة رسم", "التعديل بالنص يغيّر صورة موجودة بدل توليد صورة جديدة", "تظهر النتائج في عارض ثلاثي الأبعاد تفاعلي وتُنزَّل كملفات glb"],
            resultsMore: ["الأوضاع الخمسة تعمل من البداية إلى النهاية", "الصور جاهزة خلال 10 إلى 20 ثانية تقريبًا، والنماذج ثلاثية الأبعاد خلال 3 إلى 7 دقائق تقريبًا", "تم التحقق من نموذج glTF ثنائي كامل بحجم 19.5 ميغابايت من النص حتى التنزيل", "اكتشاف وحل 10 مواضع لم تطابق فيها وثائق الواجهة البرمجية الواجهة الفعلية (نقاط النهاية، أسماء الحقول، قيم التطبيق، مدة الرمز)"],
            role: "بنيتُ التطبيق كاملًا وحدي: خادم FastAPI وربطه بالواجهة البرمجية، وواجهة Streamlit، ولوحة الرسم، وخطوة OpenCV من الصورة إلى الرسم.",
            captions: ["رسوم وصور مولَّدة داخل التطبيق، وهي الخطوة التي تسبق النموذج ثلاثي الأبعاد"],
            linkNote: "الكود متاح عند الطلب (GitLab الجامعة)."
          },
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
          projects: "خمسة صناديق: التنبؤ بسكر الدم (مشروع البكالوريوس، PyTorch)، وGENERIO (نماذج ثلاثية الأبعاد بالذكاء الاصطناعي، FastAPI + Streamlit)، وGruppe-I (منصة بيانات، Spring Boot + Angular)، وBölleye (كشف أجسام بالذكاء الاصطناعي مباشرة، Python + OpenCV)، وMON (إدارة حضانة، Spring Boot + Flutter).",
          cv: 'حمّل سيرته الذاتية بالألمانية أو الإنجليزية من الصفحة الرئيسية.',
          contact: 'استخدم النموذج عند البوابة أو راسله على ' + EMAIL + '.',
          study: 'بكالوريوس علوم الحاسوب التطبيقية (هندسة البرمجيات) في جامعة دويسبورغ-إسن منذ 2021.',
          work: 'مهندس برمجيات مبتدئ في ITQ منذ مايو 2023: Angular وTypeScript وC++ وPython.',
          languages: 'يتحدث العربية والفرنسية والإنجليزية والألمانية (C1).',
          gruppe: 'Gruppe-I: منصة بيانات بدخول ثنائي التحقق وخرائط ورسوم بيانية ومنتدى ودردشة فورية. Spring Boot + Angular + PostgreSQL.',
          bolleye: 'Bölleye: يتعرّف على قطع الآلات مباشرة عبر الكاميرا باستخدام OpenCV وMobileNet-SSD. بُني في 4 أيام.',
          mon: 'MON: نظام إدارة حضانة بـ Spring Boot وJWT وMySQL مع تطبيق Flutter.',
          glucose: "التنبؤ بسكر الدم: مشروع البكالوريوس مع عبير يانك. سبعة نماذج تعلّم آلي تتنبأ بالسكر حتى 45 دقيقة. الأفضل عند 30 دقيقة: LSTM بـ RMSE قدره 21.79 mg/dL و87.1% في منطقة Clarke A.",
          generio: "GENERIO: تطبيق ويب بناه وحده يحوّل نصًا أو رسمًا أو صورة إلى نموذج ثلاثي الأبعاد. FastAPI + Streamlit + OpenCV فوق واجهة ذكاء اصطناعي توليدي."
        }
      }
    }
  };

  /* Chat intents: keywords from every language, so a German question works on the English page.
     `go` = section index to offer travel to. Order matters: specific intents first. */
  window.CHAT_INTENTS = [
    { id: 'glucose', go: 4, words: ['glucose', 'glukose', 'glycémie', 'glycemie', 'blood sugar', 'blutzucker', 'diabet', 'insulin', 'bachelorprojekt', 'bachelor project', 'projet de licence', 'forecast', 'prognose', 'prévision', 'machine learning', 'lstm', 'pytorch', 'سكر', 'السكري', 'أنسولين'] },
    { id: 'generio', go: 4, words: ['generio', '3d', 'dreidimensional', 'sketch', 'skizze', 'croquis', 'fastapi', 'streamlit', 'generative', 'generativ', 'génératif', 'générative', 'ثلاثي', 'ثلاثية'] },
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
