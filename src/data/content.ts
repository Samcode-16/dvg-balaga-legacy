export interface Event {
  id: string;
  title: { en: string; kn: string };
  description: { en: string; kn: string };
  date: string;
  endDate?: string;
  location: string;
  type: 'upanyasa' | 'award' | 'seminar' | 'camp' | 'release';
  chiefGuest?: string;
  president?: string;
  photo?: string;
  gallery?: string[];
}

export interface Publication {
  id: string;
  title: { en: string; kn: string };
  author: string;
  description: { en: string; kn: string };
  year: number;
  price?: number;
  type: 'translation' | 'original' | 'children' | 'commentary';
  coverPlaceholder: string;
}

export interface AwardEntry {
  id: string;
  year: number;
  recipient: string;
  recipientKn: string;
  citation: { en: string; kn: string };
  president?: string;
  chiefGuest?: string;
  photo?: string;
  gallery?: string[];
}

export const events: Event[] = [
  {
    id: 'mankuthimmana-saptaha-2016',
    title: {
      en: '5-Day Upanyasa on Mankuthimmana Kagga',
      kn: 'ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗ ಕುರಿತು ೫ ದಿನಗಳ ಉಪನ್ಯಾಸ',
    },
    description: {
      en: 'A grand 5-day discourse on DVG\'s Mankuthimmana Kagga by Vidwan G S Natesh at Nadabrahma Sangeetha Sabha, Mysuru. The programme drew a huge gathering with the hall overflowing with attendees.',
      kn: 'ಮೈಸೂರಿನ ನಾದಬ್ರಹ್ಮ ಸಂಗೀತ ಸಭೆಯಲ್ಲಿ ವಿದ್ವಾನ್ ಜಿ.ಎಸ್. ನಟೇಶ ಅವಸರು ನೀಡಿದ ಡಿ.ವಿ.ಜಿ ಅವರ ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗ ಕುರಿತ ೫ ದಿನಗಳ ಭವ್ಯ ಉಪನ್ಯಾಸ. ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಅಪಾರ ಸಂಖ್ಯೆಯ ಸಾಹಿತ್ಯಾಸಕ್ತರು ಬಂದಿದ್ದರು.',
    },
    date: '2014',
    location: 'Nadabrahma Sangeetha Sabha, Mysuru',
    type: 'upanyasa',
  },
  {
    id: 'dvg-award-2024',
    title: {
      en: 'DVG Prashasti 2024 — Sri Satyesh Bellur',
      kn: 'ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿ ೨೦೨೪ — ಶ್ರೀ ಸತ್ಯೇಶ ಬೆಳ್ಳೂರು',
    },
    description: {
      en: 'The DVG Award for 2024 was conferred on Sri Satyesh Bellur, a poet and corporate trainer who wrote \'Navyajeevi\' as muktaka sahitya. Dr. Gururaja Karajagi presided over the meeting along with Sri K C Shivappa. The autobiography \'Saakshi\' of Dr. Karajagi was also released during the occasion.',
      kn: '೨೦೨೪ ರ ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿಯನ್ನು ಕವಿ ಮತ್ತು ಕಾರ್ಪೊರೇಟ್ ತರಬೇತುದಾರ ಶ್ರೀ ಸತ್ಯೇಶ ಬೆಳ್ಳೂರು ಅವರಿಗೆ ನೀಡಲಾಯಿತು. ಅವರು \'ನವ್ಯಜೀವಿ\' ಎಂಬ ಮುಕ್ತಕ ಸಾಹಿತ್ಯವನ್ನು ಬರೆದಿದ್ದಾರೆ. ಡಾ. ಗುರುರಾಜ ಕಾರಜಗಿ ಅವಸರು ಅಧ್ಯಕ್ಷತೆ ವಹಿಸಿದ್ದರು.',
    },
    date: '2024',
    location: 'TBD',
    type: 'award',
    president: 'Dr. Gururaja Karajagi',
    chiefGuest: 'Sri K C Shivappa',
  },
  {
    id: 'geetha-shankara-2025',
    title: {
      en: 'Geetha Shankara — Adishankara Stotras Programme',
      kn: 'ಗೀತ ಶಂಕರ — ಆದಿಶಂಕರ ಸ್ತೋತ್ರ ಕಾರ್ಯಕ್ರಮ',
    },
    description: {
      en: 'A programme on Adishankara Stotras conducted in May 2025 at Nadabrahma Sangeetha Sabha, Mysuru. Vidwan Dr. R S Nandakumar rendered the programme. Conducted jointly by Brahmavidya Foundation and DVG Balaga Prathisthana.',
      kn: 'ಮೇ ೨೦೨೫ ರಲ್ಲಿ ಮೈಸೂರಿನ ನಾದಬ್ರಹ್ಮ ಸಂಗೀತ ಸಭೆಯಲ್ಲಿ ಆದಿಶಂಕರ ಸ್ತೋತ್ರಗಳ ಕಾರ್ಯಕ್ರಮ. ವಿದ್ವಾನ ಡಾ. ಆರ್.ಎಸ್. ನಂದಕುಮಾರ್ ಅವರು ಕಾರ್ಯಕ್ರಮ ನಡೆಸಿಕೊಟ್ಟರು.',
    },
    date: 'May 2025',
    location: 'Nadabrahma Sangeetha Sabha, Mysuru',
    type: 'seminar',
  },
  {
    id: 'dvg-sahitya-seminar-2026',
    title: {
      en: 'Seminar on DVG\'s Literature',
      kn: 'ಡಿ.ವಿ.ಜಿ ಸಾಹಿತ್ಯ ಕುರಿತು ವಿಚಾರ ಸಂಕಿರಣ',
    },
    description: {
      en: 'A seminar on DVG\'s literature conducted in November 2026. Shatavadhani Dr. R Ganesh, Sri B N Shashikiran, Sri Suryaprakash Pandith, and Sri Sandeep Balakrishna delivered lectures on DVG\'s literature.',
      kn: 'ನವೆಂಬರ್ ೨೦೨೬ ರಲ್ಲಿ ಡಿ.ವಿ.ಜಿ ಸಾಹಿತ್ಯ ಕುರಿತ ವಿಚಾರ ಸಂಕಿರಣ. ಶತಾವಧಾನಿ ಡಾ. ಆರ್. ಗಣೇಶ, ಶ್ರೀ ಬಿ.ಎನ್. ಶಶಿಕಿರಣ, ಶ್ರೀ ಸೂರ್ಯಪ್ರಕಾಶ ಪಂಡಿತ, ಮತ್ತು ಶ್ರೀ ಸಂದೀಪ ಬಾಲಕೃಷ್ಣ ಅವರು ಉಪನ್ಯಾಸ ನೀಡಿದರು.',
    },
    date: 'November 2026',
    location: 'TBD',
    type: 'seminar',
  },
];

export const publications: Publication[] = [
  {
    id: 'sanskrti',
    title: {
      en: 'Sanskrti — English Translation by Prof. L S Sheshagiri Rao',
      kn: 'ಸಂಸ್ಕೃತಿ — ಪ್ರೊ. ಎಲ್.ಎಸ್. ಶೇಷಗಿರಿ ರಾವ್ ಅವರ ಇಂಗ್ಲಿಷ್ ಅನುವಾದ',
    },
    author: 'DVG (translated by Prof. L S Sheshagiri Rao)',
    description: {
      en: 'An English translation of DVG\'s \'Sanskrti\', originally translated by Prof. L S Sheshagiri Rao. The manuscript was brought to DVG Balaga by Sri A Narasimha Bhat, the 2018 DVG Award recipient, who also offered his award money towards publication. Released by Sri S Divakar in 2018.',
      kn: 'ಡಿ.ವಿ.ಜಿ ಅವರ \'ಸಂಸ್ಕೃತಿ\' ಯ ಇಂಗ್ಲಿಷ್ ಅನುವಾದ. ಪ್ರೊ. ಎಲ್.ಎಸ್. ಶೇಷಗಿರಿ ರಾವ್ ಅವರು ಅನುವಾದಿಸಿದ್ದರು. ೨೦೧೮ ರ ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿ ಪುರಸ್ಕೃತ ಶ್ರೀ ಎ. ನರಸಿಂಹ ಭಟ್ ಅವರು ಹಸ್ತಪ್ರತಿಯನ್ನು ತಂದಿದ್ದರು.',
    },
    year: 2018,
    price: 350,
    type: 'translation',
    coverPlaceholder: '[Book Cover Placeholder — Sanskrti]',
  },
  {
    id: 'it-yinda-meti',
    title: {
      en: 'It Yinda Meti — From IT to Agriculture',
      kn: 'ಐಟಿ ಯಿಂದ ಮೇಟಿ',
    },
    author: 'Vasanth Kaje',
    description: {
      en: 'The inspiring story of Vasanth Kaje, a software engineer who returned to agriculture. Published through crowdfunding by DVG Balaga Prathisthana, this book paved the way for many future publications.',
      kn: 'ಸಾಫ್ಟ್‌ವೇರ್ ಎಂಜಿನಿಯರ್‌ನಿಂದ ಕೃಷಿಗೆ ಮರಳಿದ ವಸಂತ ಕಜೆ ಅವರ ಸ್ಫೂರ್ತಿದಾಯಕ ಕಥೆ. ಜನಸಂಗ್ರಹ ನಿಧಿ ಮೂಲಕ ಪ್ರಕಟಿಸಲಾಗಿದೆ.',
    },
    year: 2017,
    price: 200,
    type: 'original',
    coverPlaceholder: '[Book Cover Placeholder — It Yinda Meti]',
  },
  {
    id: 'mankuthimmana-kagga-artha',
    title: {
      en: 'Mankuthimmana Kagga — Artha & Vyakhyana (2 Volumes)',
      kn: 'ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗ — ಅರ್ಥ ಮತ್ತು ವ್ಯಾಖ್ಯಾನ (೨ ಸಂಪುಟಗಳು)',
    },
    author: 'TaNaShi (Commentary), Jay Salian & Roopashree (Illustrations)',
    description: {
      en: 'A comprehensive commentary and interpretation of DVG\'s Mankuthimmana Kagga in 2 volumes by TaNaShi of DVG Balaga. Features illustrations in Kagga by Sri Jay Salian and Smt. Roopashree of Bengaluru.',
      kn: 'ಡಿ.ವಿ.ಜಿ ಬಳಗದ ತಾನಾಶಿ ಅವರಿಂದ ಡಿ.ವಿ.ಜಿ ಅವರ ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗದ ವ್ಯಾಪಕ ವ್ಯಾಖ್ಯಾನ. ೨ ಸಂಪುಟಗಳಲ್ಲಿ.',
    },
    year: 2019,
    price: 600,
    type: 'commentary',
    coverPlaceholder: '[Book Cover Placeholder — Mankuthimmana Kagga Commentary]',
  },
  {
    id: 'dvg-illustrated-children',
    title: {
      en: 'DVG — An Illustrated Book for Children',
      kn: 'ಡಿ.ವಿ.ಜಿ — ಮಕ್ಕಳಿಗಾಗಿ ಚಿತ್ರ ಪುಸ್ತಕ',
    },
    author: 'Satyesh Bellur (Story), Gujjarappa (Illustrations)',
    description: {
      en: 'An illustrated book on DVG created through Sri Satyesh Bellur\'s efforts. He wrote the story and collaborated with Artist Sri Gujjarappa to create this illustrative book. Released by Dr. Gururaja Karajagi in Bengaluru.',
      kn: 'ಶ್ರೀ ಸತ್ಯೇಶ ಬೆಳ್ಳೂರು ಅವರ ಪ್ರಯತ್ನದಿಂದ ಡಿ.ವಿ.ಜಿ ಕುರಿತ ಚಿತ್ರ ಪುಸ್ತಕ. ಕಲಾವಿದ ಶ್ರೀ ಗುಜ್ಜಾರಪ್ಪ ಅವರೊಂದಿಗೆ ಸಹಕಾರ.',
    },
    year: 2024,
    price: 250,
    type: 'children',
    coverPlaceholder: '[Book Cover Placeholder — DVG Illustrated]',
  },
];

export const awards: AwardEntry[] = [
  {
    id: 'award-2013',
    year: 2013,
    recipient: 'Vidwan Dr. N Ranganatha Sharma',
    recipientKn: 'ವಿದ್ವಾನ್ ಡಾ. ಎನ್. ರಂಗನಾಥ ಶರ್ಮ',
    citation: {
      en: 'A great Sanskrit scholar and close associate of DVG. The first ever DVG Prashasti recipient.',
      kn: 'ಮಹಾನ್ ಸಂಸ್ಕೃತ ವಿದ್ವಾಂಸರು ಮತ್ತು ಡಿ.ವಿ.ಜಿ ಅವರ ಆಪ್ತ ಸಹಚರರು. ಮೊದಲ ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿ ಪುರಸ್ಕೃತರು.',
    },
    president: 'Dr. T V Venkatachalashastry',
  },
  {
    id: 'award-2014',
    year: 2014,
    recipient: 'Dr. S R Ramaswamy',
    recipientKn: 'ಡಾ. ಎಸ್.ಆರ್. ರಾಮಸ್ವಾಮಿ',
    citation: {
      en: 'A close associate of DVG. The function was graced by noted novelist Dr. S L Bhyrappa and Sri Surya Prakash Pandith as chief guest.',
      kn: 'ಡಿ.ವಿ.ಜಿ ಅವರ ಆಪ್ತ ಸಹಚರರು. ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಪ್ರಸಿದ್ಧ ಕಾದಂಬರಿಕಾರ ಡಾ. ಎಸ್.ಎಲ್. ಭೈರಪ್ಪ ಅವರು ಉಪಸ್ಥಿತರಿದ್ದರು.',
    },
    chiefGuest: 'Dr. S L Bhyrappa, Sri Surya Prakash Pandith',
  },
  {
    id: 'award-2017',
    year: 2017,
    recipient: 'Sri Kumara Nijaguna Swamiji',
    recipientKn: 'ಶ್ರೀ ಕುಮಾರ ನಿಜಗುಣ ಸ್ವಾಮೀಜಿ',
    citation: {
      en: 'Author of \'Bolu Basavana Bonthe\'. The award was presided over by Sri M S Mahabaleswara, then MD & CEO of Karnataka Bank.',
      kn: '\'ಬೋಳು ಬಸವನ ಬೊಂತೆ\' ಕೃತಿಯ ಲೇಖಕರು. ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್‌ನ ಅಂದಿನ ಎಮ್‌ಡಿ ಮತ್ತು ಸಿಇಓ ಶ್ರೀ ಎಂ.ಎಸ್. ಮಹಾಬಲೇಶ್ವರ ಅವರು ಅಧ್ಯಕ್ಷತೆ ವಹಿಸಿದ್ದರು.',
    },
    president: 'Sri M S Mahabaleswara',
  },
  {
    id: 'award-2018',
    year: 2018,
    recipient: 'Sri A Narasimha Bhat',
    recipientKn: 'ಶ್ರೀ ಎ. ನರಸಿಂಹ ಭಟ್',
    citation: {
      en: 'Translator of Mankuthimmana Kagga and Marulamuniyana Kagga to English. He also brought the manuscript of DVG\'s \'Sanskrti\' translated by Prof. L S Sheshagiri Rao.',
      kn: 'ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗ ಮತ್ತು ಮರುಳಮುನಿಯನ ಕಗ್ಗವನ್ನು ಇಂಗ್ಲಿಷ್‌ಗೆ ಅನುವಾದಿಸಿದವರು.',
    },
  },
  {
    id: 'award-2019',
    year: 2019,
    recipient: 'Late D R Venkataramanan & Smt. Saraswathi Venkataramanan',
    recipientKn: 'ದಿವಂಗತ ಡಿ.ಆರ್. ವೆಂಕಟರಮಣನ್ ಮತ್ತು ಶ್ರೀಮತಿ ಸರಸ್ವತಿ ವೆಂಕಟರಮಣನ್',
    citation: {
      en: 'Noted litterateur, disciple of DVG, and author of \'Virakta Rashtraka DVG\' and \'Kaggakondu Kaipidi\'. The award was jointly conferred on his wife Saraswathi Venkataramanan.',
      kn: 'ಖ್ಯಾತ ಸಾಹಿತಿ, ಡಿ.ವಿ.ಜಿ ಶಿಷ್ಯರು, \'ವಿರಕ್ತ ರಾಷ್ಟ್ರಕ ಡಿ.ವಿ.ಜಿ\' ಮತ್ತು \'ಕಗ್ಗಕೊಂದು ಕೈಪಿಡಿ\' ಕೃತಿಗಳ ಲೇಖಕರು.',
    },
  },
  {
    id: 'award-2020',
    year: 2020,
    recipient: 'Shatavadhani Dr. R Ganesh',
    recipientKn: 'ಶತಾವಧಾನಿ ಡಾ. ಆರ್. ಗಣೇಶ',
    citation: {
      en: 'Noted Sanskrit scholar. Dr. H R Vishwas presided over the meeting.',
      kn: 'ಪ್ರಖ್ಯಾತ ಸಂಸ್ಕೃತ ವಿದ್ವಾಂಸರು. ಡಾ. ಎಚ್.ಆರ್. ವಿಶ್ವಾಸ ಅವರು ಸಭೆಯ ಅಧ್ಯಕ್ಷತೆ ವಹಿಸಿದ್ದರು.',
    },
    president: 'Dr. H R Vishwas',
  },
  {
    id: 'award-2022',
    year: 2022,
    recipient: 'Dr. Gururaja Karajagi',
    recipientKn: 'ಡಾ. ಗುರುರಾಜ ಕಾರಜಗಿ',
    citation: {
      en: 'Felicitated with DVG award. The then VC of Mysuru University Dr. Hemanthkumar graced the occasion.',
      kn: 'ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿಯಿಂದ ಸನ್ಮಾನಿಸಲಾಯಿತು. ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯದ ಅಂದಿನ ಕುಲಪತಿ ಡಾ. ಹೇಮಂತ್‌ಕುಮಾರ್ ಅವರು ಉಪಸ್ಥಿತರಿದ್ದರು.',
    },
    chiefGuest: 'Dr. Hemanthkumar (VC, Mysuru University)',
  },
  {
    id: 'award-2023',
    year: 2023,
    recipient: 'Sri K C Shivappa',
    recipientKn: 'ಶ್ರೀ ಕೆ.ಸಿ. ಶಿವಪ್ಪ',
    citation: {
      en: 'Known for Muddurama. Dr. Gururaja Karajagi presided over the function.',
      kn: 'ಮುದ್ದುರಾಮ ಖ್ಯಾತಿಯ. ಡಾ. ಗುರುರಾಜ ಕಾರಜಗಿ ಅವರು ಅಧ್ಯಕ್ಷತೆ ವಹಿಸಿದ್ದರು.',
    },
    president: 'Dr. Gururaja Karajagi',
  },
  {
    id: 'award-2024',
    year: 2024,
    recipient: 'Sri Satyesh Bellur',
    recipientKn: 'ಶ್ರೀ ಸತ್ಯೇಶ ಬೆಳ್ಳೂರು',
    citation: {
      en: 'A poet and corporate trainer who wrote \'Navyajeevi\' as muktaka sahitya. Dr. Gururaja Karajagi presided over the meeting along with Sri K C Shivappa.',
      kn: 'ಕವಿ ಮತ್ತು ಕಾರ್ಪೊರೇಟ್ ತರಬೇತುದಾರ. \'ನವ್ಯಜೀವಿ\' ಎಂಬ ಮುಕ್ತಕ ಸಾಹಿತ್ಯವನ್ನು ಬರೆದಿದ್ದಾರೆ.',
    },
    president: 'Dr. Gururaja Karajagi',
    chiefGuest: 'Sri K C Shivappa',
  },
  {
    id: 'award-2025',
    year: 2025,
    recipient: 'Sri T N Shivakumar (TaNaShi)',
    recipientKn: 'ಶ್ರೀ ಟಿ.ಎನ್. ಶಿವಕುಮಾರ (ತಾನಾಶಿ)',
    citation: {
      en: 'Popularly known as TaNaShi, conferred with the DVG Award. Famous musician Dr. R S Nandakumar was the Chief Guest.',
      kn: 'ತಾನಾಶಿ ಎಂದು ಪ್ರಸಿದ್ಧರಾದವರು. ಖ್ಯಾತ ಸಂಗೀತಗಾರ ಡಾ. ಆರ್.ಎಸ್. ನಂದಕುಮಾರ್ ಮುಖ್ಯ ಅತಿಥಿಯಾಗಿದ್ದರು.',
    },
    chiefGuest: 'Dr. R S Nandakumar',
  },
];

export const heroContent = {
  en: {
    title: 'DVG Balaga Prathisthana',
    subtitle: 'Preserving the Literary Legacy of D.V. Gundappa',
    description: 'A literary trust dedicated to studying, celebrating, and propagating the works of Dewan Veera Venkata Gundappa (DVG) — philosopher, poet, journalist, and author of the timeless Mankuthimmana Kagga.',
    cta: 'Explore Our Journey',
    ctaSecondary: 'View Awards',
  },
  kn: {
    title: 'ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ',
    subtitle: 'ಡಿ.ವಿ. ಗುಂಡಪ್ಪನವರ ಸಾಹಿತ್ಯ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆ',
    description: 'ದಿವಾನ ವೀರ ವೆಂಕಟ ಗುಂಡಪ್ಪ (ಡಿ.ವಿ.ಜಿ) — ತತ್ವಜ್ಞಾನಿ, ಕವಿ, ಪತ್ರಕರ್ತ, ಮತ್ತು ಕಾಲಾತೀತ ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗದ ಕರ್ತೃ — ಅವರ ಕೃತಿಗಳನ್ನು ಅಧ್ಯಯನ, ಆಚರಣೆ ಮತ್ತು ಪ್ರಸಾರ ಮಾಡಲು ಸಮರ್ಪಿತ ಸಾಹಿತ್ಯ ಟ್ರಸ್ಟ್.',
    cta: 'ನಮ್ಮ ಪಯಣ ಅನ್ವೇಷಿಸಿ',
    ctaSecondary: 'ಪ್ರಶಸ್ತಿಗಳನ್ನು ನೋಡಿ',
  },
};

export const aboutContent = {
  en: {
    foundingTitle: 'Our Founding Story',
    founding: 'DVG Balaga Prathisthana, Mysuru is a literary organisation started by literature enthusiast Mr. Kanakaraju C. The DVG Balaga was started on March 17, 2009 at Kushalanagar, Kodagu. Every week, a few friends gathered and tried to understand Mankuthimmana Kagga.',
    mysuru: 'In Mysuru, the same was inaugurated in 2012 by Sri G S Natesh, famously known as Kaggada Natesh, at the residence of Sri Kanakaraju C. Every week, enthusiasts gathered and tried to understand the literature of DVG.',
    award: 'After completion of one year, it was felt that there is no award in the name of DVG and thus DVG Prashasti was born. The first award was conferred on Vidwan Dr. N Ranganatha Sharma, a great Sanskrit scholar and close associate of DVG.',
    growth: 'DVG Balaga went wherever Mr. Kanakaraju went. After Mysuru, he was transferred to Pune. DVG Balaga Pune was inaugurated by Vidwan G S Natesh on 14 Dec 2014. Again DVG Balaga moved along with Kanakaraju to Mangaluru, where Karnataka Bank provided patronage.',
    trust: 'The DVG Balaga was formally changed to DVG Balaga Prathisthana and registered as a trust. The Managing trustee was Mrs. H A Nandini, and Vidwan G S Natesh and Dr. Virupaksha Devaramane were the other trustees.',
    future: 'DVG Balaga Prathisthana carries various dreams of the future — a two-day DVG Sahitya Sammelana, a drama on DVG\'s life and works are some of them.',
  },
  kn: {
    foundingTitle: 'ನಮ್ಮ ಸ್ಥಾಪನೆಯ ಕಥೆ',
    founding: 'ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ, ಮೈಸೂರು ಸಾಹಿತ್ಯ ಉತ್ಸಾಹಿ ಶ್ರೀ ಕನಕರಾಜು ಸಿ ಅವರಿಂದ ಪ್ರಾರಂಭವಾದ ಸಾಹಿತ್ಯ ಸಂಸ್ಥೆ. ಡಿ.ವಿ.ಜಿ ಬಳಗವನ್ನು ಮಾರ್ಚ್ ೧೭, ೨೦೦೯ ರಂದು ಕೊಡಗಿನ ಕುಶಾಲನಗರದಲ್ಲಿ ಪ್ರಾರಂಭಿಸಲಾಯಿತು.',
    mysuru: 'ಮೈಸೂರಿನಲ್ಲಿ, ೨೦೧೨ ರಲ್ಲಿ ಕಗ್ಗದ ನಟೇಶ ಎಂದು ಪ್ರಸಿದ್ಧರಾದ ಶ್ರೀ ಜಿ.ಎಸ್. ನಟೇಶ ಅವರಿಂದ ಶ್ರೀ ಕನಕರಾಜು ಸಿ ಅವರ ಮನೆಯಲ್ಲಿ ಉದ್ಘಾಟಿಸಲಾಯಿತು.',
    award: 'ಒಂದು ವರ್ಷ ಪೂರ್ಣಗೊಂಡ ನಂತರ, ಡಿ.ವಿ.ಜಿ ಹೆಸರಿನಲ್ಲಿ ಯಾವುದೇ ಪ್ರಶಸ್ತಿ ಇಲ್ಲ ಎಂದು ಅನಿಸಿ ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿ ಹುಟ್ಟಿಕೊಂಡಿತು.',
    growth: 'ಡಿ.ವಿ.ಜಿ ಬಳಗ ಶ್ರೀ ಕನಕರಾಜು ಹೋದಲ್ಲೆಲ್ಲ ಹೋಯಿತು. ಮೈಸೂರಿನ ನಂತರ ಪುಣೆ, ನಂತರ ಮಂಗಳೂರು.',
    trust: 'ಡಿ.ವಿ.ಜಿ ಬಳಗವನ್ನು ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ ಎಂದು ಔಪಚಾರಿಕವಾಗಿ ಬದಲಾಯಿಸಿ ಟ್ರಸ್ಟ್ ಆಗಿ ನೋಂದಣಿ ಮಾಡಲಾಯಿತು.',
    future: 'ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ ಭವಿಷ್ಯದ ಹಲವಾರು ಕನಸುಗಳನ್ನು ಹೊಂದಿದೆ — ಎರಡು ದಿನಗಳ ಡಿ.ವಿ.ಜಿ ಸಾಹಿತ್ಯ ಸಮ್ಮೇಳನ, ಡಿ.ವಿ.ಜಿ ಜೀವನ ಮತ್ತು ಕೃತಿಗಳ ಕುರಿತ ನಾಟಕ.',
  },
};

export const navItems = {
  en: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Events', path: '/events' },
    { label: 'Publications', path: '/publications' },
    { label: 'Awards', path: '/awards' },
    { label: 'Contact', path: '/contact' },
  ],
  kn: [
    { label: 'ಮುಖಪುಟ', path: '/' },
    { label: 'ನಮ್ಮ ಬಗ್ಗೆ', path: '/about' },
    { label: 'ಕಾರ್ಯಕ್ರಮಗಳು', path: '/events' },
    { label: 'ಪ್ರಕಟಣೆಗಳು', path: '/publications' },
    { label: 'ಪ್ರಶಸ್ತಿಗಳು', path: '/awards' },
    { label: 'ಸಂಪರ್ಕ', path: '/contact' },
  ],
};
