import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Farm from '../models/Farm.js';
import Crop from '../models/Crop.js';
import Expense from '../models/Expense.js';
import FarmActivity from '../models/FarmActivity.js';
import Expert from '../models/Expert.js';
import GovernmentScheme from '../models/GovernmentScheme.js';
import MandiPrice from '../models/MandiPrice.js';
import Notification from '../models/Notification.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      User.deleteMany(),
      Farm.deleteMany(),
      Crop.deleteMany(),
      Expense.deleteMany(),
      FarmActivity.deleteMany(),
      Expert.deleteMany(),
      GovernmentScheme.deleteMany(),
      MandiPrice.deleteMany(),
      Notification.deleteMany(),
    ]);

    console.log('Cleared existing data...');

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@agrisathi.com',
      password: 'admin123',
      phone: '9876543210',
      role: 'admin',
      location: { state: 'Maharashtra', district: 'Nashik' },
    });

    // Create farmer
    const farmer = await User.create({
      name: 'Ramesh Yadav',
      email: 'farmer@agrisathi.com',
      password: 'farmer123',
      phone: '9876543211',
      role: 'farmer',
      location: { village: 'Dindori', taluka: 'Dindori', district: 'Nashik', state: 'Maharashtra' },
    });

    // Create expert user
    const expertUser = await User.create({
      name: 'Dr. Rajesh Patil',
      email: 'expert@agrisathi.com',
      password: 'expert123',
      phone: '9876543212',
      role: 'expert',
      location: { district: 'Nashik', state: 'Maharashtra' },
    });

    // Create expert profile
    const expert = await Expert.create({
      user: expertUser._id,
      specialty: 'Agronomy & Soil Science',
      experience: '18 years',
      location: 'Nashik, Maharashtra',
      rating: 4.8,
      consultations: 342,
      available: true,
      languages: ['Marathi', 'Hindi', 'English'],
      bio: 'PhD in Agronomy from IARI, New Delhi. Specialist in Kharif crops, soil health management and organic farming techniques for black soil regions.',
      availability: 'Mon - Sat, 10 AM - 6 PM',
      price: '₹300 / consultation',
    });

    // Create farm
    const farm = await Farm.create({
      farmer: farmer._id,
      name: 'Yadav Family Farm',
      location: { village: 'Dindori', taluka: 'Dindori', district: 'Nashik', state: 'Maharashtra' },
      landArea: 5.2,
      landUnit: 'acres',
      soilType: 'Black Soil (Vertisol)',
      soilPh: 7.1,
      nitrogen: 42,
      phosphorus: 38,
      potassium: 45,
      waterSource: 'Borewell + Canal',
      activeSince: '2012',
    });

    // Create crops
    const crops = await Crop.create([
      {
        farmer: farmer._id,
        farm: farm._id,
        name: 'Soybean',
        variety: 'JS-9560',
        area: 2.5,
        plantedDate: new Date('2026-06-18'),
        expectedHarvestDate: new Date('2026-10-05'),
        status: 'Growing — Vegetative',
        health: 'Good',
        soilType: 'Black Soil',
        progress: 45,
        season: 'Kharif',
      },
      {
        farmer: farmer._id,
        farm: farm._id,
        name: 'Onion',
        variety: 'N-2-4-1',
        area: 1.5,
        plantedDate: new Date('2026-07-05'),
        expectedHarvestDate: new Date('2027-01-20'),
        status: 'Growing — Bulb Formation',
        health: 'Good',
        soilType: 'Black Soil',
        progress: 25,
        season: 'Kharif',
      },
      {
        farmer: farmer._id,
        farm: farm._id,
        name: 'Cotton',
        variety: 'Ankur-3028',
        area: 1.2,
        plantedDate: new Date('2026-06-05'),
        expectedHarvestDate: new Date('2026-11-15'),
        status: 'Growing — Flowering',
        health: 'Fair',
        soilType: 'Black Soil',
        progress: 60,
        season: 'Kharif',
      },
    ]);

    // Create expenses
    await Expense.create([
      { farmer: farmer._id, farm: farm._id, date: new Date('2026-08-15'), category: 'Fertilizers', description: 'DAP 50 kg', amount: 1450 },
      { farmer: farmer._id, farm: farm._id, date: new Date('2026-08-12'), category: 'Pesticides', description: 'Imidacloprid 100g', amount: 420 },
      { farmer: farmer._id, farm: farm._id, date: new Date('2026-08-10'), category: 'Labor', description: 'Soybean weeding (2 laborers, 1 day)', amount: 800 },
      { farmer: farmer._id, farm: farm._id, date: new Date('2026-08-05'), category: 'Seeds', description: 'Onion seeds (1 kg)', amount: 6500 },
      { farmer: farmer._id, farm: farm._id, date: new Date('2026-07-28'), category: 'Irrigation', description: 'Electricity bill - water pump', amount: 950 },
    ]);

    // Create activities
    await FarmActivity.create([
      { farmer: farmer._id, farm: farm._id, crop: crops[0]._id, date: new Date('2026-08-18'), title: 'Weeding — First intercultivation', activityType: 'Weeding', cropName: 'Soybean', notes: 'Manual weeding between rows completed. Spotted a few yellow mosaic virus symptoms on 3-4 plants. Monitoring closely.', timeSpent: '8:00 AM - 11:00 AM' },
      { farmer: farmer._id, farm: farm._id, crop: crops[1]._id, date: new Date('2026-08-15'), title: 'Fertilizer Application', activityType: 'Fertilizer', cropName: 'Onion', notes: 'Applied DAP top dressing (25 kg/acre) after light rain. Good soil moisture for nutrient uptake.', timeSpent: '4:30 PM - 6:00 PM' },
      { farmer: farmer._id, farm: farm._id, crop: crops[2]._id, date: new Date('2026-08-12'), title: 'Pest Scouting', activityType: 'Pesticide', cropName: 'Cotton', notes: 'Found pink bollworm infestation at 8% (above threshold). Applied recommended pesticide on affected rows.', timeSpent: '7:00 AM - 9:00 AM' },
    ]);

    // Create government schemes
    await GovernmentScheme.create([
      {
        name: 'PM-KISAN Samman Nidhi',
        category: 'Income Support',
        state: 'All India',
        summary: 'Direct income support of ₹6,000/year to all farmer families in 3 equal instalments.',
        benefits: ['₹2,000 every 4 months', 'Direct transfer to bank account', 'Available to all landholding farmers'],
        eligibility: ['Must be a citizen of India', 'Must own cultivable land', 'Not eligible if paying income tax (except agriculture)'],
        documents: ['Aadhaar Card', 'Land Records / Khatauni', 'Bank Account Details'],
        application: 'Apply online at pmkisan.gov.in or through local CSC centres.',
        officialSource: 'https://pmkisan.gov.in/',
        deadline: 'Ongoing — Applications always open',
        icon: 'handCoins',
      },
      {
        name: 'PM Fasal Bima Yojana (PMFBY)',
        category: 'Crop Insurance',
        state: 'All India',
        summary: 'Comprehensive crop insurance against natural calamities, pests and diseases.',
        benefits: ['Insurance cover for all stages of crop', 'Premium only 2% for kharif crops', '1.5% for rabi food crops'],
        eligibility: ['All farmers growing notified crops', 'Sharecroppers and tenant farmers eligible'],
        documents: ['Aadhaar Card', 'Land Records', 'Bank Account'],
        application: 'Visit nearest bank branch or PMFBY portal during crop season.',
        officialSource: 'https://pmfby.gov.in/',
        deadline: 'Kharif: 31 July | Rabi: 31 December',
        icon: 'shieldCheck',
      },
      {
        name: 'Kisan Credit Card (KCC) Scheme',
        category: 'Credit & Loan',
        state: 'All India',
        summary: 'Affordable credit for farmers at 4% interest rate for timely repayment.',
        benefits: ['Credit limit based on land holding', 'Interest subvention of 3%', '4% interest for timely repayment'],
        eligibility: ['All farmers including sharecroppers', 'Must have 1+ year farming experience'],
        documents: ['Aadhaar Card', 'Land Records', 'Bank Account'],
        application: 'Visit your nearest nationalized bank branch or cooperative bank.',
        officialSource: 'https://www.nabard.org/',
        deadline: 'Ongoing',
        icon: 'creditCard',
      },
    ]);

    // Create mandi prices (sample data)
    await MandiPrice.create([
      { crop: 'Wheat', market: 'Nashik APMC', current: 2450, previous: 2400, change: 50, changePercent: 2.1, unit: '₹/quintal', isSample: true },
      { crop: 'Soybean', market: 'Nashik APMC', current: 4650, previous: 4700, change: -50, changePercent: -1.1, unit: '₹/quintal', isSample: true },
      { crop: 'Onion', market: 'Lasalgaon APMC', current: 1850, previous: 1750, change: 100, changePercent: 5.7, unit: '₹/quintal', isSample: true },
      { crop: 'Cotton', market: 'Nashik APMC', current: 7100, previous: 7050, change: 50, changePercent: 0.7, unit: '₹/quintal', isSample: true },
      { crop: 'Grapes', market: 'Malegaon APMC', current: 3200, previous: 3100, change: 100, changePercent: 3.2, unit: '₹/quintal', isSample: true },
      { crop: 'Tomato', market: 'Nashik APMC', current: 1200, previous: 1350, change: -150, changePercent: -11.1, unit: '₹/quintal', isSample: true },
    ]);

    // Create notifications
    await Notification.create([
      { user: farmer._id, type: 'weather', title: 'Heavy Rainfall Alert', message: 'Expect heavy rain in your area on Aug 21. Delay pesticide spraying and ensure field drainage.', icon: 'cloudRain', color: 'blue' },
      { user: farmer._id, type: 'mandi', title: 'Mandi Price Change', message: 'Onion price increased by 5.7% (₹100/quintal) at Lasalgaon APMC.', icon: 'trendingUp', color: 'green' },
      { user: farmer._id, type: 'reminder', title: 'Farming Reminder', message: 'Upcoming: Soybean urea top dressing due between Aug 20-25.', icon: 'calendarClock', color: 'amber' },
    ]);

    console.log('✅ Seed data created successfully!');
    console.log('Admin login: admin@agrisathi.com / admin123');
    console.log('Farmer login: farmer@agrisathi.com / farmer123');
    console.log('Expert login: expert@agrisathi.com / expert123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();