// ============================================================
// MOCK DATA — Frontend phase only
// These files will be replaced with real API calls (fetch) in a
// later phase. Each file exports named data arrays so the swap
// is straightforward.
// ============================================================

// ---------- Weather ----------
export const currentWeather = {
  location: 'Nashik, Maharashtra',
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 62,
  windSpeed: 12,
  rainfall: 0,
  feelsLike: 29,
  sunrise: '6:12 AM',
  sunset: '6:45 PM',
  updatedAt: 'Today, 2:00 PM',
};

export const weatherForecast = [
  { day: 'Tue', date: 'Aug 19', high: 31, low: 22, condition: 'Sunny', rainfall: 0 },
  { day: 'Wed', date: 'Aug 20', high: 29, low: 21, condition: 'Rain Showers', rainfall: 8 },
  { day: 'Thu', date: 'Aug 21', high: 27, low: 20, condition: 'Thunderstorm', rainfall: 15 },
  { day: 'Fri', date: 'Aug 22', high: 28, low: 21, condition: 'Cloudy', rainfall: 3 },
  { day: 'Sat', date: 'Aug 23', high: 30, low: 22, condition: 'Partly Cloudy', rainfall: 0 },
  { day: 'Sun', date: 'Aug 24', high: 32, low: 23, condition: 'Sunny', rainfall: 0 },
  { day: 'Mon', date: 'Aug 25', high: 31, low: 23, condition: 'Partly Cloudy', rainfall: 1 },
];

export const weatherAlerts = [
  {
    id: 1,
    type: 'Rain Alert',
    severity: 'Moderate',
    message: 'Heavy rainfall expected on Thursday (Aug 21). Delay pesticide spraying if possible.',
    date: 'Aug 21, 2026',
  },
  {
    id: 2,
    type: 'Irrigation Advisory',
    severity: 'Low',
    message: 'Soil moisture is adequate. No irrigation needed for the next 2 days.',
    date: 'Aug 18, 2026',
  },
];

// ---------- Mandi Prices ----------
export const mandiPrices = [
  { id: 1, crop: 'Wheat', market: 'Nashik APMC', current: 2450, previous: 2400, change: 50, changePercent: 2.1, unit: '₹/quintal', date: 'Aug 18' },
  { id: 2, crop: 'Soybean', market: 'Nashik APMC', current: 4650, previous: 4700, change: -50, changePercent: -1.1, unit: '₹/quintal', date: 'Aug 18' },
  { id: 3, crop: 'Onion', market: 'Lasalgaon APMC', current: 1850, previous: 1750, change: 100, changePercent: 5.7, unit: '₹/quintal', date: 'Aug 18' },
  { id: 4, crop: 'Cotton', market: 'Nashik APMC', current: 7100, previous: 7050, change: 50, changePercent: 0.7, unit: '₹/quintal', date: 'Aug 18' },
  { id: 5, crop: 'Grapes', market: 'Malegaon APMC', current: 3200, previous: 3100, change: 100, changePercent: 3.2, unit: '₹/quintal', date: 'Aug 18' },
  { id: 6, crop: 'Tomato', market: 'Nashik APMC', current: 1200, previous: 1350, change: -150, changePercent: -11.1, unit: '₹/quintal', date: 'Aug 18' },
];

export const cropOptions = ['Wheat', 'Rice', 'Soybean', 'Onion', 'Cotton', 'Grapes', 'Tomato', 'Maize', 'Sugarcane', 'Tur (Arhar)'];
export const marketOptions = ['Nashik APMC', 'Lasalgaon APMC', 'Malegaon APMC', 'Pune APMC', 'Mumbai APMC'];

export const priceHistory = [
  { date: 'Jun 20', price: 2100 },
  { date: 'Jun 27', price: 2150 },
  { date: 'Jul 04', price: 2200 },
  { date: 'Jul 11', price: 2180 },
  { date: 'Jul 18', price: 2300 },
  { date: 'Jul 25', price: 2350 },
  { date: 'Aug 01', price: 2400 },
  { date: 'Aug 08', price: 2380 },
  { date: 'Aug 15', price: 2420 },
  { date: 'Aug 18', price: 2450 },
];

export const marketComparison = [
  { market: 'Nashik APMC', current: 2450, previous: 2400 },
  { market: 'Lasalgaon APMC', current: 2420, previous: 2390 },
  { market: 'Malegaon APMC', current: 2480, previous: 2410 },
  { market: 'Pune APMC', current: 2510, previous: 2430 },
];

// ---------- Crops / Farm ----------
export const farmProfile = {
  location: 'Village: Dindori, Taluka: Dindori, Nashik, Maharashtra',
  landArea: '5.2 acres',
  soilType: 'Black Soil (Vertisol)',
  soilPh: 7.1,
  nitrogen: 42,
  phosphorus: 38,
  potassium: 45,
  waterSource: 'Borewell + Canal',
  activeSince: '2012',
};

export const currentCrops = [
  {
    id: 1,
    name: 'Soybean',
    variety: 'JS-9560',
    area: '2.5 acres',
    plantedDate: 'Jun 18, 2026',
    expectedHarvest: 'Oct 05, 2026',
    status: 'Growing — Vegetative',
    health: 'Good',
    soilType: 'Black Soil',
    progress: 45,
  },
  {
    id: 2,
    name: 'Onion',
    variety: 'N-2-4-1',
    area: '1.5 acres',
    plantedDate: 'Jul 05, 2026',
    expectedHarvest: 'Jan 20, 2027',
    status: 'Growing — Bulb Formation',
    health: 'Good',
    soilType: 'Black Soil',
    progress: 25,
  },
  {
    id: 3,
    name: 'Cotton',
    variety: 'Ankur-3028',
    area: '1.2 acres',
    plantedDate: 'Jun 05, 2026',
    expectedHarvest: 'Nov 15, 2026',
    status: 'Growing — Flowering',
    health: 'Fair',
    soilType: 'Black Soil',
    progress: 60,
  },
];

// ---------- Crop Recommendations ----------
export const cropRecommendationResult = {
  recommendedCrop: 'Soybean',
  confidence: 92,
  reasons: [
    'Black soil with pH 7.1 is highly suitable for soybean cultivation',
    'Current N-P-K levels (42-38-45) are within the ideal range for soybean',
    'July-August sowing window fits the kharif season in Nashik region',
    'Expected rainfall of 800-900mm matches soybean water requirements',
  ],
  alternatives: [
    { crop: 'Cotton', confidence: 84, note: 'Requires higher phosphorus (40+) and good drainage' },
    { crop: 'Tur (Arhar)', confidence: 78, note: 'Suitable for black soil, requires less irrigation' },
    { crop: 'Groundnut', confidence: 74, note: 'Good option for later sowing in August' },
  ],
  cultivationTips: [
    'Use treated seeds (carbendazim 2g/kg seeds) before sowing',
    'Maintain row spacing of 45cm and plant-to-plant distance of 10-12cm',
    'Apply 20:60:40 NPK as basal dose at sowing time',
    'Plan first irrigation at 30-35 days after sowing',
  ],
  disclaimer: 'This is a sample recommendation shown for UI demonstration. Connect the ML API to receive actual predictions.',
};

// ---------- Fertilizer Recommendation ----------
export const fertilizerResult = {
  recommendedFertilizers: [
    { name: 'DAP (18-46-0)', dose: '120 kg/acre', timing: 'At sowing (Basal dose)', purpose: 'Phosphorus requirement for root development' },
    { name: 'Urea (46-0-0)', dose: '65 kg/acre', timing: '30-35 days after sowing (Top dressing)', purpose: 'Nitrogen for vegetative growth' },
    { name: 'MOP (0-0-60)', dose: '30 kg/acre', timing: 'At sowing (Basal dose)', purpose: 'Potassium for disease resistance' },
  ],
  organicAmendment: {
    name: 'Farm Yard Manure (FYM)',
    dose: '4-5 ton/acre',
    timing: '2-3 weeks before sowing',
    purpose: 'Improve soil structure and organic carbon',
  },
  micronutrient: {
    name: 'Zinc Sulphate (ZnSO₄)',
    dose: '10-12 kg/acre',
    timing: 'Mixed with soil at sowing',
    purpose: 'Soil zinc deficiency common in black soils',
  },
  disclaimer: 'This is a sample recommendation shown for UI demonstration. Connect the backend/ML system for actual analysis.',
};

// ---------- Government Schemes ----------
export const governmentSchemes = [
  {
    id: 1,
    name: 'PM-KISAN Samman Nidhi',
    category: 'Income Support',
    state: 'All India',
    summary: 'Direct income support of ₹6,000/year to all farmer families in 3 equal instalments.',
    benefits: ['₹2,000 every 4 months', 'Direct transfer to bank account', 'Available to all landholding farmers'],
    eligibility: ['Must be a citizen of India', 'Must own cultivable land', 'Not eligible if paying income tax (except agriculture)', 'Not for government/PSU employees'],
    documents: ['Aadhaar Card', 'Land Records / Khatauni', 'Bank Account Details (linked to Aadhaar)', 'Passport-size photo'],
    application: 'Apply online at pmkisan.gov.in or through local CSC (Common Service Centre) centres.',
    officialSource: 'https://pmkisan.gov.in/',
    deadline: 'Ongoing — Applications always open',
    icon: 'handCoins',
  },
  {
    id: 2,
    name: 'PM Fasal Bima Yojana (PMFBY)',
    category: 'Crop Insurance',
    state: 'All India',
    summary: 'Comprehensive crop insurance against natural calamities, pests and diseases.',
    benefits: ['Insurance cover for all stages of crop', 'Premium only 2% for kharif crops', '1.5% for rabi food crops', '5% for commercial crops'],
    eligibility: ['All farmers growing notified crops', 'Sharecroppers and tenant farmers eligible', 'Must provide land record / lease document'],
    documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Crop sowing details'],
    application: 'Visit nearest bank branch or PMFBY portal during crop season. Insurance company empanelled surveyors assess losses.',
    officialSource: 'https://pmfby.gov.in/',
    deadline: 'Kharif: 31 July | Rabi: 31 December (for Nashik)',
    icon: 'shieldCheck',
  },
  {
    id: 3,
    name: 'PM Kaushal Vikas Yojana (Agriculture Sector)',
    category: 'Training & Skill Development',
    state: 'All India',
    summary: 'Free skill training programs for farmers in modern agriculture techniques.',
    benefits: ['Free training in modern farm practices', 'Certificate recognized by industry', 'Stipend during training', 'Placement assistance in agri-sector'],
    eligibility: ['Farmers aged 15-59 years', 'Interest in modern farming techniques', 'Educational qualification: 5th pass or higher'],
    documents: ['Aadhaar Card', 'Educational certificates', 'Bank account (for stipend)'],
    application: 'Register on pmkvy official portal or visit nearest training centre. Batch allocation within 30 days.',
    officialSource: 'https://www.pmkvyofficial.org/',
    deadline: 'Applications reviewed on rolling basis',
    icon: 'graduationCap',
  },
  {
    id: 4,
    name: 'Kisan Credit Card (KCC) Scheme',
    category: 'Credit & Loan',
    state: 'All India',
    summary: 'Affordable credit for farmers at 4% interest rate for timely repayment.',
    benefits: ['Credit limit based on land holding', 'Interest subvention of 3%', '4% interest for timely repayment', 'Flexible withdrawal & repayment'],
    eligibility: ['All farmers including sharecroppers', 'Must have 1+ year farming experience', 'Ownership of cultivable land'],
    documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Passport-size photo', 'Crop production plan'],
    application: 'Visit your nearest nationalized bank branch or cooperative bank. Loan sanctioned within 15 days.',
    officialSource: 'https://www.nabard.org/',
    deadline: 'Ongoing',
    icon: 'creditCard',
  },
  {
    id: 5,
    name: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)',
    category: 'Irrigation',
    state: 'All India',
    summary: 'Subsidy support for micro-irrigation systems like drip and sprinkler.',
    benefits: ['45-55% subsidy on drip/sprinkler systems', 'Support for farm ponds & water harvesting', 'Solar pump assistance', 'Improved water use efficiency'],
    eligibility: ['Individual farmers', 'Farmer groups / cooperatives', 'Must own land where irrigation system will be installed'],
    documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Project proposal / cost estimate'],
    application: 'Apply through district agriculture office or online at pmksy.gov.in. Physical inspection before approval.',
    officialSource: 'https://pmksy.gov.in/',
    deadline: 'Scheme open year-round (state-wise budget dependent)',
    icon: 'droplets',
  },
  {
    id: 6,
    name: 'Soil Health Card (SHC) Scheme',
    category: 'Soil Testing',
    state: 'All India',
    summary: 'Free soil testing and recommendations every 3 years for every farm.',
    benefits: ['Free soil sample testing', 'Detailed soil health report', 'Fertilizer recommendations based on soil', 'Digital card accessible anytime'],
    eligibility: ['All farmers with cultivable land', 'No registration fee', 'Sample can be given at any soil testing lab'],
    documents: ['Aadhaar Card', 'Land Records'],
    application: 'Visit nearest soil testing lab or agriculture help centre with soil sample (500g from 15cm depth).',
    officialSource: 'https://soilhealth.dac.gov.in/',
    deadline: 'Ongoing',
    icon: 'flaskConical',
  },
  {
    id: 7,
    name: 'National Agriculture Market (e-NAM)',
    category: 'Market Access',
    state: 'All India (selected mandis)',
    summary: 'Online trading platform connecting farmers directly to buyers in mandis across India.',
    benefits: ['Transparent price discovery', 'Larger buyer base beyond local mandi', 'Quality-based pricing', 'No middleman commission'],
    eligibility: ['Farmers with any produce', 'Must register at a mandi linked with e-NAM', 'Valid Aadhaar and bank account'],
    documents: ['Aadhaar Card', 'Bank Account', 'Land Records', 'Crop produce details'],
    application: 'Register at your nearest e-NAM linked mandi or online at enam.gov.in.',
    officialSource: 'https://enam.gov.in/',
    deadline: 'Ongoing',
    icon: 'store',
  },
  {
    id: 8,
    name: 'Maharashtra State Agricultural Marketing Board (Transfer Subsidy)',
    category: 'Equipment Subsidy',
    state: 'Maharashtra',
    summary: 'Subsidy for farm machinery and equipment purchase in Maharashtra.',
    benefits: ['Up to 50% subsidy on tractors', '40-50% on power tillers', 'Subsidy on harvesters & planters', 'Diesel pump assistance'],
    eligibility: ['Farmers of Maharashtra state', 'Small & marginal farmers priority', 'Must contribute minimum 10% of cost'],
    documents: ['Aadhaar Card', 'Sapta / Land Records', 'Bank Account', 'Registration certificate (7/12 extract)'],
    application: 'Apply through District Agriculture Office or Maharashtra government agriculture portal.',
    officialSource: 'https://mahaagri.gov.in/',
    deadline: 'Applications close when annual allocation depletes',
    icon: 'tractor',
  },
];

export const schemeCategories = ['All', 'Income Support', 'Crop Insurance', 'Training & Skill Development', 'Credit & Loan', 'Irrigation', 'Soil Testing', 'Market Access', 'Equipment Subsidy'];
export const schemeStates = ['All India', 'Maharashtra', 'Gujarat', 'Punjab', 'Karnataka'];

// ---------- Crop Calendar ----------
export const cropCalendarData = {
  Soybean: [
    { stage: 'Land Preparation', period: 'May 1 - Jun 15', activities: ['Deep ploughing', 'Pre-sowing irrigation', 'Apply FYM 4-5 ton/acre'], icon: 'tractor' },
    { stage: 'Sowing', period: 'Jun 10 - Jul 15', activities: ['Seed treatment with Rhizobium', 'Sowing at 45×10 cm spacing', 'Apply DAP 100 kg/acre'], icon: 'sprout' },
    { stage: 'Vegetative Growth', period: 'Jul 15 - Aug 30', activities: ['Weeding at 20-25 days', 'Top dressing urea 20 kg/acre', 'Need-based irrigation'], icon: 'leaf' },
    { stage: 'Flowering', period: 'Sep 1 - Sep 25', activities: ['Monitor for yellow mosaic', 'Pest scouting twice weekly', 'Spray neem oil if needed'], icon: 'flower' },
    { stage: 'Pod Formation', period: 'Sep 25 - Oct 20', activities: ['Stop nitrogen application', 'Irrigation at pod filling', 'Monitor for pod borer'], icon: 'circleDot' },
    { stage: 'Harvest', period: 'Oct 10 - Nov 15', activities: ['Harvest when leaves yellow', 'Dry on clean floor for 2-3 days', 'Thresh and clean seeds'], icon: 'package' },
  ],
  Cotton: [
    { stage: 'Land Preparation', period: 'Apr 15 - Jun 10', activities: ['Deep ploughing', 'Soil solarization', 'Apply neem cake 100 kg/acre'], icon: 'tractor' },
    { stage: 'Sowing', period: 'Jun 1 - Jul 15', activities: ['Seed treatment with imidacloprid', 'Sowing at 90×60 cm spacing', 'Line sowing recommended'], icon: 'sprout' },
    { stage: 'Vegetative Growth', period: 'Jul 15 - Aug 25', activities: ['Thinning at 15-20 days', 'Weeding and intercultivation', 'Fertigation weekly'], icon: 'leaf' },
    { stage: 'Flowering & Bolling', period: 'Aug 25 - Nov 10', activities: ['Monitor pink bollworm', 'Trap crop for pink bollworm', 'Spray when threshold crossed'], icon: 'flower' },
    { stage: 'Boll Maturation', period: 'Nov 10 - Dec 20', activities: ['Stop pesticide application', 'Pick mature bolls', 'Avoid irrigation at maturity'], icon: 'circleDot' },
    { stage: 'Harvest', period: 'Dec 1 - Jan 15', activities: ['Harvest at full boll burst', 'Dry seed cotton', 'Separate grade-wise picking'], icon: 'package' },
  ],
  Onion: [
    { stage: 'Nursery Raising', period: 'May 15 - Jun 30', activities: ['Raise nursery on raised beds', 'Apply FYM to nursery', 'Water daily'], icon: 'sprout' },
    { stage: 'Transplanting', period: 'Jul 1 - Aug 15', activities: ['Transplant at 6-8 weeks age', 'Spacing 15×10 cm', 'Irrigate after planting'], icon: 'transplant' },
    { stage: 'Vegetative Growth', period: 'Aug 15 - Oct 30', activities: ['Top dress urea', 'Weeding critical', 'Maintain moisture'], icon: 'leaf' },
    { stage: 'Bulb Formation', period: 'Nov 1 - Dec 31', activities: ['Reduce irrigation', 'Top dress potash', 'Stop nitrogen'], icon: 'circleDot' },
    { stage: 'Bulb Maturity', period: 'Jan 1 - Jan 31', activities: ['Stop irrigation 2 weeks before', 'Bend tops when 30% fall', 'Cure bulbs 3-5 days'], icon: 'circleDot' },
    { stage: 'Harvest', period: 'Jan 15 - Feb 28', activities: ['Harvest when tops dry', 'Cure for 7-10 days', 'Sort and grade bulbs'], icon: 'package' },
  ],
  Wheat: [
    { stage: 'Land Preparation', period: 'Oct 20 - Nov 30', activities: ['Plough with disc harrow', 'Level field', 'Apply FYM 5 ton/acre'], icon: 'tractor' },
    { stage: 'Sowing', period: 'Nov 15 - Dec 20', activities: ['Seed treatment with fungicide', 'Sowing at 20cm row spacing', 'Sowing depth 5-6 cm'], icon: 'sprout' },
    { stage: 'Crown Root Initiation', period: 'Dec 20 - Jan 10', activities: ['First irrigation at 21 days', 'Weed control with 2,4-D', 'Top dress urea'], icon: 'leaf' },
    { stage: 'Tillering', period: 'Jan 10 - Feb 15', activities: ['Irrigation every 20-25 days', 'Top dress nitrogen split dose', 'Monitor for rust'], icon: 'flower' },
    { stage: 'Booting & Heading', period: 'Feb 15 - Mar 5', activities: ['Last top dressing', 'Irrigation critical', 'Disease scouting'], icon: 'flower' },
    { stage: 'Harvest', period: 'Mar 20 - Apr 30', activities: ['Harvest at full maturity', 'Machine or manual harvesting', 'Clean and bag grain'], icon: 'package' },
  ],
  Sugarcane: [
    { stage: 'Land Preparation', period: 'Jan 1 - Feb 28', activities: ['Deep ploughing', 'Apply trash compost', 'Soil treatment for termites'], icon: 'tractor' },
    { stage: 'Planting (setts)', period: 'Feb 15 - Apr 15', activities: ['Select 8-10 month old canes', 'Treat setts with fungicide', 'Row spacing 90-120 cm'], icon: 'sprout' },
    { stage: 'Germination', period: 'Mar 1 - May 15', activities: ['Irrigate at 7-day intervals', 'Gap filling at 30 days', 'Weed control'], icon: 'leaf' },
    { stage: 'Tillering', period: 'May 15 - Jul 15', activities: ['Drainage after monsoon rain', 'Earthing-up operation', 'Top dress nitrogen'], icon: 'leaf' },
    { stage: 'Grand Growth Phase', period: 'Jul 15 - Oct 31', activities: ['Intercropping options', 'Monitor borer & red rot', 'Fertigation weekly'], icon: 'flower' },
    { stage: 'Maturity & Harvest', period: 'Nov 1 - Mar 31', activities: ['Test juice brix', 'Harvest at 12-14 months', 'Ratoon management'], icon: 'package' },
  ],
};

// ---------- Farm Expenses ----------
export const expenses = [
  { id: 1, date: 'Aug 15, 2026', category: 'Fertilizers', description: 'DAP 50 kg', amount: 1450 },
  { id: 2, date: 'Aug 12, 2026', category: 'Pesticides', description: 'Imidacloprid 100g', amount: 420 },
  { id: 3, date: 'Aug 10, 2026', category: 'Labor', description: 'Soybean weeding (2 laborers, 1 day)', amount: 800 },
  { id: 4, date: 'Aug 05, 2026', category: 'Seeds', description: 'Onion seeds (1 kg)', amount: 6500 },
  { id: 5, date: 'Jul 28, 2026', category: 'Irrigation', description: 'Electricity bill - water pump', amount: 950 },
  { id: 6, date: 'Jul 20, 2026', category: 'Equipment', description: 'Sprayer repairs', amount: 600 },
  { id: 7, date: 'Jul 15, 2026', category: 'Fertilizers', description: 'Urea 2 bags', amount: 1100 },
  { id: 8, date: 'Jul 08, 2026', category: 'Labor', description: 'Transplanting onion crop', amount: 1800 },
];

export const expenseCategories = ['Seeds', 'Fertilizers', 'Pesticides', 'Labor', 'Irrigation', 'Equipment', 'Transport', 'Other'];

export const estimatedRevenue = {
  Soybean: { area: '2.5 acres', expectedYield: '11 ton', marketPrice: 4650, expectedRevenue: 51150 },
  Onion: { area: '1.5 acres', expectedYield: '9 ton', marketPrice: 1850, expectedRevenue: 16650 },
  Cotton: { area: '1.2 acres', expectedYield: '4.8 ton', marketPrice: 7100, expectedRevenue: 34080 },
};

// ---------- Farm Activities Journal ----------
export const activities = [
  {
    id: 1,
    date: 'Aug 18, 2026',
    crop: 'Soybean',
    activity: 'Weeding — First intercultivation',
    notes: 'Manual weeding between rows completed. Spotted a few yellow mosaic virus symptoms on 3-4 plants. Monitoring closely.',
    time: '8:00 AM - 11:30 AM',
  },
  {
    id: 2,
    date: 'Aug 15, 2026',
    crop: 'Onion',
    activity: 'Fertilizer Application',
    notes: 'Applied DAP top dressing (25 kg/acre) after light rain. Good soil moisture for nutrient uptake.',
    time: '4:30 PM - 6:00 PM',
  },
  {
    id: 3,
    date: 'Aug 12, 2026',
    crop: 'Cotton',
    activity: 'Pest Scouting',
    notes: 'Found pink bollworm infestation at 8% (above threshold). Applied recommended pesticide on affected rows.',
    time: '7:00 AM - 9:00 AM',
  },
  {
    id: 4,
    date: 'Aug 08, 2026',
    crop: 'All Crops',
    activity: 'Field Inspection',
    notes: 'General inspection after monsoon rain. Drainage working well. No waterlogging observed.',
    time: '5:00 PM - 6:30 PM',
  },
  {
    id: 5,
    date: 'Aug 03, 2026',
    crop: 'Soybean',
    activity: 'Seed Treatment & Sowing',
    notes: 'Sowed JS-9560 variety after treating seeds with Rhizobium culture. Row spacing maintained at 45 cm.',
    time: '9:00 AM - 12:00 PM',
  },
];

// ---------- Experts ----------
export const experts = [
  {
    id: 1,
    name: 'Dr. Rajesh Patil',
    specialty: 'Agronomy & Soil Science',
    experience: '18 years',
    location: 'Nasik, Maharashtra',
    rating: 4.8,
    consultations: 342,
    available: true,
    languages: ['Marathi', 'Hindi', 'English'],
    bio: 'PhD in Agronomy from IARI, New Delhi. Specialist in Kharif crops, soil health management and organic farming techniques for black soil regions.',
    availability: 'Mon - Sat, 10 AM - 6 PM',
    price: '₹300 / consultation',
  },
  {
    id: 2,
    name: 'Dr. Sunita Deshmukh',
    specialty: 'Plant Pathology',
    experience: '14 years',
    location: 'Pune, Maharashtra',
    rating: 4.9,
    consultations: 287,
    available: true,
    languages: ['Marathi', 'Hindi', 'English'],
    bio: 'Plant pathologist with expertise in fungal and viral diseases of major crops including cotton, soybean and vegetables. Known for practical IPM solutions.',
    availability: 'Mon - Fri, 9 AM - 5 PM',
    price: '₹350 / consultation',
  },
  {
    id: 3,
    name: 'Dr. Anand More',
    specialty: 'Horticulture & Vegetable Crops',
    experience: '12 years',
    location: 'Nashik, Maharashtra',
    rating: 4.7,
    consultations: 215,
    available: false,
    languages: ['Marathi', 'Hindi', 'English'],
    bio: 'Horticulture expert focused on onion, tomato and grape cultivation. Extensive experience with drip irrigation and protected cultivation.',
    availability: 'Wed - Sun, 8 AM - 2 PM',
    price: '₹250 / consultation',
  },
  {
    id: 4,
    name: 'Dr. Kavita Jadhav',
    specialty: 'Crop Nutrition & Fertilizers',
    experience: '10 years',
    location: 'Sangli, Maharashtra',
    rating: 4.6,
    consultations: 198,
    available: true,
    languages: ['Marathi', 'English'],
    bio: 'Specialist in soil fertility and balanced fertilizer management. Works closely with small and marginal farmers on cost optimization.',
    availability: 'Mon - Sat, 11 AM - 4 PM',
    price: '₹280 / consultation',
  },
];

export const previousQueries = [
  {
    id: 1,
    expertName: 'Dr. Rajesh Patil',
    topic: 'Soybean leaves turning yellow',
    date: 'Aug 10, 2026',
    status: 'Answered',
    statusType: 'completed',
    answerSummary: 'Yellowing likely due to nitrogen deficiency. Recommended top dressing of urea 15-20 kg/acre and soil test for confirmation.',
  },
  {
    id: 2,
    expertName: 'Dr. Sunita Deshmukh',
    topic: 'Cotton pink bollworm control',
    date: 'Aug 12, 2026',
    status: 'Answered',
    statusType: 'completed',
    answerSummary: 'Confirmed pink bollworm. Advised complete crop residue destruction and pheromone trap installation for next season.',
  },
  {
    id: 3,
    expertName: 'Dr. Kavita Jadhav',
    topic: 'Fertilizer dose for onion after transplanting',
    date: 'Aug 14, 2026',
    status: 'Pending',
    statusType: 'pending',
    answerSummary: null,
  },
];

// ---------- Notifications ----------
export const notifications = [
  {
    id: 1,
    type: 'weather',
    title: 'Heavy Rainfall Alert',
    message: 'Expect heavy rain in your area on Aug 21. Delay pesticide spraying and ensure field drainage.',
    date: 'Aug 18, 2:30 PM',
    read: false,
    icon: 'cloudRain',
    color: 'blue',
  },
  {
    id: 2,
    type: 'mandi',
    title: 'Mandi Price Change',
    message: 'Onion price increased by 5.7% (₹100/quintal) at Lasalgaon APMC. Current price: ₹1,850/quintal.',
    date: 'Aug 18, 11:00 AM',
    read: false,
    icon: 'trendingUp',
    color: 'green',
  },
  {
    id: 3,
    type: 'reminder',
    title: 'Farming Reminder',
    message: 'Upcoming: Soybean urea top dressing due between Aug 20-25. View crop calendar for details.',
    date: 'Aug 17, 8:00 AM',
    read: false,
    icon: 'calendarClock',
    color: 'amber',
  },
  {
    id: 4,
    type: 'scheme',
    title: 'Scheme Alert: PMFBY',
    message: 'Last date to apply for Kharif crop insurance is July 31. Apply soon at pmfby.gov.in.',
    date: 'Aug 15, 10:00 AM',
    read: true,
    icon: 'shieldCheck',
    color: 'earth',
  },
  {
    id: 5,
    type: 'expert',
    title: 'Expert Response Received',
    message: 'Dr. Sunita Deshmukh answered your query about cotton pink bollworm. View response in Expert Consultation.',
    date: 'Aug 13, 4:45 PM',
    read: true,
    icon: 'userCheck',
    color: 'orange',
  },
  {
    id: 6,
    type: 'weather',
    title: 'Temperature Update',
    message: 'Temperatures expected to rise to 32°C by Sunday. Increase irrigation frequency for sensitive crops.',
    date: 'Aug 13, 9:00 AM',
    read: true,
    icon: 'thermometerSun',
    color: 'red',
  },
];

// ---------- Admin Data ----------
export const adminStats = {
  totalFarmers: 2847,
  activeFarmers: 2315,
  totalExperts: 42,
  activeExperts: 35,
  schemesListed: 24,
  totalReportsGenerated: 158,
  mandisMonitored: 12,
  avgResponseTime: '4.2 hrs',
};

export const adminFarmers = [
  { id: 'F-1001', name: 'Ramesh Yadav', village: 'Dindori', district: 'Nashik', landSize: '3.5 acres', crops: ['Soybean', 'Onion'], joined: 'Jan 2025', status: 'Active', phone: '98765 43210' },
  { id: 'F-1002', name: 'Suresh Pawar', village: 'Niphad', district: 'Nashik', landSize: '5.0 acres', crops: ['Grapes', 'Tomato'], joined: 'Mar 2025', status: 'Active', phone: '97654 32109' },
  { id: 'F-1003', name: 'Anita Gaikwad', village: 'Yeola', district: 'Nashik', landSize: '2.0 acres', crops: ['Onion', 'Wheat'], joined: 'Feb 2025', status: 'Active', phone: '96543 21098' },
  { id: 'F-1004', name: 'Vijay Shinde', village: 'Chandwad', district: 'Nashik', landSize: '7.5 acres', crops: ['Sugarcane', 'Cotton'], joined: 'May 2025', status: 'Inactive', phone: '95432 10987' },
  { id: 'F-1005', name: 'Mangesh Sonawane', village: 'Igatpuri', district: 'Nashik', landSize: '1.2 acres', crops: ['Vegetables'], joined: 'Jun 2025', status: 'Active', phone: '94321 09876' },
  { id: 'F-1006', name: 'Sunita Kamble', village: 'Trimbak', district: 'Nashik', landSize: '4.0 acres', crops: ['Maize', 'Tur'], joined: 'Apr 2025', status: 'Pending', phone: '93210 98765' },
];

export const adminExperts = [
  { id: 'E-201', name: 'Dr. Rajesh Patil', specialty: 'Agronomy', experience: '18 yrs', consultations: 342, rating: 4.8, status: 'Active', joined: 'Nov 2024' },
  { id: 'E-202', name: 'Dr. Sunita Deshmukh', specialty: 'Plant Pathology', experience: '14 yrs', consultations: 287, rating: 4.9, status: 'Active', joined: 'Dec 2024' },
  { id: 'E-203', name: 'Dr. Anand More', specialty: 'Horticulture', experience: '12 yrs', consultations: 215, rating: 4.7, status: 'On Leave', joined: 'Jan 2025' },
  { id: 'E-204', name: 'Dr. Kavita Jadhav', specialty: 'Crop Nutrition', experience: '10 yrs', consultations: 198, rating: 4.6, status: 'Active', joined: 'Feb 2025' },
  { id: 'E-205', name: 'Dr. Prakash Ghule', specialty: 'Entomology', experience: '15 yrs', consultations: 165, rating: 4.5, status: 'Pending', joined: 'Jul 2026' },
];

export const adminReports = [
  { id: 'R-501', name: 'Farmer Registration Summary', type: 'Farmers', period: 'Jul 2026', generated: 'Aug 1, 2026', size: '1.2 MB', status: 'Ready' },
  { id: 'R-502', name: 'Crop Production Report — Kharif', type: 'Crops', period: 'Kharif 2026', generated: 'Aug 5, 2026', size: '3.8 MB', status: 'Ready' },
  { id: 'R-503', name: 'Mandi Price Analysis', type: 'Mandi', period: 'Jul 2026', generated: 'Aug 2, 2026', size: '2.1 MB', status: 'Ready' },
  { id: 'R-504', name: 'Scheme Applications Summary', type: 'Schemes', period: 'Q2 2026', generated: 'Jul 15, 2026', size: '890 KB', status: 'Ready' },
  { id: 'R-505', name: 'Expert Consultation Analytics', type: 'Consultations', period: 'Jul 2026', generated: 'Aug 3, 2026', size: '1.5 MB', status: 'Processing' },
];

// ---------- Crop Information (Admin) ----------
export const cropInformation = [
  { id: 1, name: 'Soybean', varieties: 'JS-9560, MAUS-158, MACS-1407', season: 'Kharif', sowingWindow: 'Jun - Jul', harvestWindow: 'Oct - Nov', duration: '90-110 days', soilType: 'Black, Alluvial', waterRequirement: '450-600 mm' },
  { id: 2, name: 'Cotton', varieties: 'Ankur-3028, NCS-207, RCH-659', season: 'Kharif', sowingWindow: 'Apr - Jul', harvestWindow: 'Dec - Jan', duration: '140-180 days', soilType: 'Black (well-drained)', waterRequirement: '700-900 mm' },
  { id: 3, name: 'Onion', varieties: 'N-2-4-1, Agri Found, Phule Suvarna', season: 'Kharif/Rabi', sowingWindow: 'May - Aug', harvestWindow: 'Jan - Apr', duration: '110-140 days', soilType: 'Sandy loam, Black', waterRequirement: '500-750 mm' },
  { id: 4, name: 'Wheat', varieties: 'GW-496, Lok-1, MP-3288', season: 'Rabi', sowingWindow: 'Nov - Dec', harvestWindow: 'Mar - Apr', duration: '110-130 days', soilType: 'Alluvial, Loam', waterRequirement: '350-500 mm' },
  { id: 5, name: 'Sugarcane', varieties: 'Co-86032, Co-265, MS-96-7', season: 'Perennial', sowingWindow: 'Feb - Apr', harvestWindow: 'Nov - Mar', duration: '12-14 months', soilType: 'Black, Deep alluvial', waterRequirement: '1800-2200 mm' },
  { id: 6, name: 'Rice', varieties: 'MTU-1010, Indrayani, Jaya', season: 'Kharif', sowingWindow: 'Jun - Jul', harvestWindow: 'Oct - Nov', duration: '100-130 days', soilType: 'Clay, Clay loam', waterRequirement: '1200-1500 mm' },
];

// ---------- Dashboard upcoming activities ----------
export const upcomingActivities = [
  { id: 1, date: 'Aug 20', text: 'Soybean — Urea top dressing (20 kg/acre)', type: 'fertilizer', crop: 'Soybean' },
  { id: 2, date: 'Aug 21', text: 'Avoid pesticide spraying — heavy rain expected', type: 'weather', crop: 'All crops' },
  { id: 3, date: 'Aug 24', text: 'Cotton — Pest scouting for pink bollworm', type: 'pest', crop: 'Cotton' },
  { id: 4, date: 'Aug 28', text: 'Onion — Weeding in designated rows', type: 'weeding', crop: 'Onion' },
  { id: 5, date: 'Sep 02', text: 'Soybean — Second fertilization (MOP 20 kg/acre)', type: 'fertilizer', crop: 'Soybean' },
];

export const cropHealthStatus = [
  { crop: 'Soybean', health: 'Good', color: 'green', note: 'Healthy growth, minor yellowing on few plants' },
  { crop: 'Cotton', health: 'Fair', color: 'amber', note: 'Pink bollworm observed at 8% in some rows' },
  { crop: 'Onion', health: 'Good', color: 'green', note: 'Satisfactory bulb formation progress' },
];
