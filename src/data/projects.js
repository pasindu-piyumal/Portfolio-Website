export const projects = [
  {
    id: 'brain-tumer-ai',
    title: 'BrainTumerAI',
    subtitle: 'Brain MRI Tumor Classification',
    category: 'Machine Learning',
    status: 'Deep Learning',
    visual: 'brain',
    description:
      'A CNN-based deep learning project for classifying brain MRI images into four categories.',
    details:
      'Developed a Convolutional Neural Network (CNN) model to classify brain MRI images into glioma, meningioma, pituitary tumor, and no tumor categories.',
    problem:
      'Classifying brain MRI images into different tumor categories is an image classification problem that requires effective feature extraction and pattern recognition.',
    approach:
      'Developed a CNN-based image classification pipeline using TensorFlow and Keras, with image processing, data analysis, model training, and evaluation.',
    future:
      'Explore transfer learning, improve model generalization, and develop an interactive interface for MRI image classification.',
    stack: [
      'Python',
      'TensorFlow',
      'Keras',
      'CNN',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'OpenCV',
      'Pillow',
      'Matplotlib',
      'Seaborn'
    ],
    github: 'https://github.com/pasindu-piyumal/BrainTumerAI'
  },

  {
    id: 'sl-flood-watch',
    title: 'SLFloodWatch',
    subtitle: 'Sri Lanka Flood Risk Prediction & Monitoring System',
    category: 'Machine Learning',
    status: 'Machine Learning & Web Development',
    visual: 'flood',
    description:
      'A web-based flood monitoring and prediction system for identifying flood risk levels across Sri Lanka.',
    details:
      'Developed a machine learning-powered flood risk monitoring system that analyzes environmental, weather, geographical, and historical flood-related features. The Django application provides dashboards, location monitoring, filtering, flood risk prediction, and real-time river level monitoring through the RiverWatch API.',
    problem:
      'Flood-related information from environmental conditions, geographical characteristics, historical events, and river levels needs to be analyzed to support flood risk monitoring.',
    approach:
      'Applied Random Forest machine learning techniques for flood risk classification and integrated the prediction functionality into a Django web application with SQLite, Chart.js dashboards, and RiverWatch API integration.',
    future:
      'Expand monitoring coverage, integrate additional real-time weather sources, and improve prediction capabilities using more historical and environmental data.',
    stack: [
      'Python',
      'Django',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Random Forest',
      'SQLite',
      'HTML',
      'CSS',
      'JavaScript',
      'Chart.js',
      'RiverWatch API',
      'Git',
      'GitHub'
    ],
    github: 'https://github.com/pasindu-piyumal/SLFloodWatch'
  },

  {
    id: 'student-result-management',
    title: 'Student Result Management System',
    subtitle: 'Academic Information Management Web Application',
    category: 'Web Development',
    status: 'Full-Stack Development',
    visual: 'student',
    description:
      'A Django-based web application for managing students, classes, subjects, academic results, and notices.',
    details:
      'Implemented a database-driven academic management application with functionality for managing student information, classes, subjects, examination results, and academic notices. Designed web pages and CRUD operations to support efficient academic information management.',
    problem:
      'Managing student records, academic results, classes, and subject information requires an organized system for storing, updating, and retrieving academic data.',
    approach:
      'Developed a Django web application with SQLite database integration, HTML, CSS, and JavaScript interfaces, and CRUD functionality for academic records.',
    future:
      'Introduce role-based access, student performance analytics, report generation, and additional academic management features.',
    stack: [
      'Python',
      'Django',
      'HTML',
      'CSS',
      'JavaScript',
      'SQLite',
      'Git',
      'GitHub'
    ],
    github: 'https://github.com/pasindu-piyumal/Student-Result-Management-System'
  },

  {
    id: 'sri-lanka-inflation-analysis',
    title: 'Sri Lanka Inflation & Cost of Living Analysis',
    subtitle: 'Power BI Dashboard | 2022–2026',
    category: 'Analytics',
    status: 'Data Analytics',
    visual: 'inflation',
    description:
      'An interactive Power BI dashboard analyzing inflation and cost-of-living trends in Sri Lanka from 2022 to 2026.',
    details:
      'Designed an interactive Power BI dashboard to explore inflation and consumer price trends in Sri Lanka. Performed data cleaning and preparation using Power Query, analyzed changes in inflation and consumer prices, and presented key findings through data visualizations and business-oriented insights.',
    problem:
      'Understanding inflation and changes in consumer prices requires organized historical data analysis and clear visual representations of economic trends.',
    approach:
      'Used Power Query for data cleaning and preparation, followed by interactive Power BI visualizations to analyze inflation patterns, consumer price changes, and cost-of-living trends.',
    future:
      'Incorporate additional economic indicators, develop more detailed comparisons, and introduce forecasting to explore potential future trends.',
    stack: [
      'Power BI',
      'Power Query',
      'Data Cleaning',
      'Data Visualization',
      'Data Analysis'
    ],
    github: null
  },

  {
    id: 'moodlens',
    title: 'MoodLens',
    subtitle: 'Student Social Media & Mood Analysis',
    category: 'Web Development',
    status: 'Web Application',
    visual: 'mood',
    description:
      'A web-based application exploring the relationship between students’ social media usage and their study mood.',
    details:
      'Developed a web application focused on studying the relationship between social media usage and students’ study mood. Implemented features including a Study Mood Analyzer, Pomodoro timer, and AI chatbot functionality.',
    problem:
      'Understanding the relationship between social media usage and students’ study mood can help explore factors that influence their study experience and productivity.',
    approach:
      'Developed a PHP-based web application with a MySQL database and interactive frontend using HTML5, CSS3, and JavaScript. Integrated study mood analysis, Pomodoro timer, and AI chatbot functionality.',
    future:
      'Expand mood analysis capabilities, introduce additional productivity insights, and improve the AI chatbot experience.',
    stack: [
      'PHP',
      'HTML5',
      'CSS3',
      'JavaScript',
      'MySQL',
      'Git',
      'GitHub',
      'XAMPP'
    ],
    github: 'https://github.com/pasindu-piyumal/MoodLens'
  }
]
