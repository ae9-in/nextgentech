'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface QAPair {
  keywords: string[];
  answer: string;
}

const QA_DATABASE: QAPair[] = [
  // ======== GREETINGS ========
  {
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'hii', 'hiii', 'sup', 'hola', 'namaste'],
    answer: "Hello! 👋 Welcome to NextGen Tech! I'm your virtual assistant. How can I help you today?\n\nYou can ask me about:\n• 1-Day Experience Programs\n• Internship Tracks\n• Bootcamps\n• Pricing & Registration\n• Certificates & LOR\n• Schedule & Timings\n• Contact Information\n\nOr tap any quick option below!",
  },
  {
    keywords: ['thank', 'thanks', 'thankyou', 'thank you', 'appreciate', 'thx', 'thnk'],
    answer: "You're welcome! 😊 If you have any more questions, feel free to ask. We're here to help you start your tech career journey with NextGen Tech!",
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'talk later', 'gtg'],
    answer: "Goodbye! 👋 Thank you for visiting NextGen Tech. Feel free to come back anytime you have questions. We wish you the best on your learning journey!",
  },
  {
    keywords: ['ok', 'okay', 'sure', 'got it', 'alright', 'understood', 'cool', 'nice', 'great', 'good'],
    answer: "Great! 😊 Is there anything else you'd like to know? Feel free to ask about our programs, pricing, internships, bootcamps, or anything else!",
  },

  // ======== ABOUT NEXTGEN TECH ========
  {
    keywords: ['what is nextgen', 'about nextgen', 'about us', 'who are you', 'what do you do', 'tell me about', 'what is this', 'about company', 'about this company', 'company info', 'organization'],
    answer: "NextGen Tech is a modern EdTech platform that provides hands-on IT training, simulated developer internships, and intensive bootcamps for the next generation of engineers.\n\n📊 Key Stats:\n• 250+ Active Students\n• 6+ Industry Programs\n• 25+ Shipped Projects\n• 5+ Senior Mentors\n\nWe offer 1-Day Experiences, Multi-week Internships, and 7-Day Bootcamps across Web Development, HR, BDE, Sales, Marketing, and IT Services domains.\n\nOur mission: Your tech career starts here. No boring lectures, no passive videos — just real, hands-on project building.",
  },
  {
    keywords: ['why nextgen', 'why choose', 'why should i', 'what makes you different', 'unique', 'special', 'advantage', 'usp'],
    answer: "Why Choose NextGen Tech?\n\n✅ Hands-On Learning — No boring theory, you BUILD real projects\n✅ Deploy on Day 1 — Ship live apps to Vercel/AWS before sunset\n✅ Industry Mentors — Learn from senior professionals at top companies\n✅ Verified Certificates — Shareable on LinkedIn with QR verification\n✅ Affordable Pricing — Programs starting from just ₹149\n✅ 100% Money-Back Guarantee — For 1-Day Experiences\n✅ 6 Domain Tracks — Web Dev, HR, BDE, Sales, Marketing, IT Services\n✅ Portfolio Building — Every project goes on your GitHub\n✅ 250+ Happy Students — Join a growing community\n\nWe're not just another course platform — we simulate real work environments!",
  },

  // ======== 1-DAY EXPERIENCES ========
  {
    keywords: ['1 day', 'one day', '1-day', 'experience', 'sprint', 'workshop', '1day', 'all programs', 'all courses', 'what programs', 'what courses'],
    answer: "Our 1-Day Experience Programs are fast-paced, hands-on sprints where you build and deploy a real project in just one day!\n\n📋 Available 1-Day Programs:\n\n1️⃣ Web Development Sprint — ₹299 (was ₹999) — 6 Hours\n   Build & deploy a full-stack responsive web application.\n\n2️⃣ HR & Recruitment Sprint — ₹199 (was ₹799) — 5 Hours\n   Build an automated talent acquisition pipeline.\n\n3️⃣ BDE & Lead Gen Sprint — ₹249 (was ₹899) — 5 Hours\n   Build a B2B lead generation campaign.\n\n4️⃣ Corporate Sales Sprint — ₹249 (was ₹899) — 5 Hours\n   Master live sales pitching & CRM deal closing.\n\n5️⃣ Digital Marketing Sprint — ₹199 (was ₹799) — 5 Hours\n   Launch targeted ad campaigns & marketing funnels.\n\n6️⃣ IT & Client Services Sprint — ₹149 (was ₹599) — 5 Hours\n   Set up SLA tracking & client support workflows.\n\nAll programs include a verified certificate! Would you like to register for any of these?",
  },

  // ======== WEB DEVELOPMENT ========
  {
    keywords: ['web dev', 'web development', 'full stack', 'fullstack', 'react', 'frontend', 'backend', 'mern', 'html', 'css', 'javascript', 'node', 'coding', 'programming', 'website development', 'developer', 'software'],
    answer: "🌐 Web Development Programs at NextGen Tech:\n\n1-Day Sprint (₹299):\n• Duration: 6 Hours | Beginner Friendly\n• Build & deploy a full-stack responsive web app\n• Tech: HTML5/CSS3, JavaScript, React, Vercel\n\nWeb Dev Internship (₹999):\n• Duration: 1 Day & More (Agile Sprint)\n• Project: Production E-Commerce & Full Stack Web Platform\n• Skills: HTML5, CSS3, JavaScript, React, Node.js, Tailwind CSS\n• Includes: Verified Certificate + LOR\n• Mentor: Senior Web Architect @ TechCorp\n\nWeb Dev Bootcamp (₹999, was ₹2,999):\n• Duration: 7 Days | MOST POPULAR\n• Modules: HTML/CSS, JS ES6+, React, Node.js, Express, Database, Deployment\n• Includes: Live sessions, mentor support, real project, certificate\n\nWould you like to register for any of these?",
  },

  // ======== HR ========
  {
    keywords: ['hr', 'human resource', 'recruitment', 'talent', 'hiring', 'ats', 'human resources', 'people operations'],
    answer: "👥 HR (Human Resources) Programs:\n\n1-Day Sprint (₹199):\n• Duration: 5 Hours | Beginner Friendly\n• Build an automated talent acquisition pipeline\n• Tools: HR Analytics, ATS Tools, Recruitment Funnels, LinkedIn Recruiter\n\nHR Internship (₹999):\n• Duration: 1 Day & More (Corporate Sprint)\n• Project: End-to-End Talent Acquisition & HR Operations System\n• Skills: Talent Sourcing, ATS Tools, Screening & Interviews, HR Policies\n• Includes: Verified Certificate + LOR\n• Mentor: Senior HR Lead @ Corporate Talent Hub\n\nHR Bootcamp (₹999, was ₹2,999):\n• Duration: 7 Days\n• Modules: Talent Acquisition, Screening & ATS, Interviewing, Onboarding, HR Compliance\n\nWould you like to register?",
  },

  // ======== BDE ========
  {
    keywords: ['bde', 'business development', 'lead gen', 'lead generation', 'b2b', 'client acquisition', 'prospecting', 'business dev'],
    answer: "💼 BDE (Business Development) Programs:\n\n1-Day Sprint (₹249):\n• Duration: 5 Hours | Intermediate\n• Build a B2B lead generation campaign & client pitch deck\n• Tools: LinkedIn Sales Nav, Cold Emailing, CRM Tools\n\nBDE Internship (₹1,199):\n• Duration: 1 Day & More (Growth Sprint)\n• Project: B2B Client Acquisition & Corporate Partnership Campaign\n• Skills: Lead Generation, Market Prospecting, Client Pitching, CRM Management\n• Includes: Verified Certificate + LOR\n• Mentor: Head of Business Growth @ Global Services\n\nBDE & Sales Bootcamp (₹999, was ₹2,999):\n• Duration: 7 Days\n• Modules: Lead Sourcing, Cold Outreach, B2B Pitching, Objection Handling, HubSpot CRM, Closing\n\nWould you like to know more or register?",
  },

  // ======== SALES ========
  {
    keywords: ['sales', 'selling', 'deal closing', 'pipeline', 'cold calling', 'revenue', 'corporate sales', 'sales training'],
    answer: "📈 Sales Programs:\n\n1-Day Sprint (₹249):\n• Duration: 5 Hours | All Levels\n• Master live sales pitching, objection handling, and CRM deal closing\n• Tools: Salesforce/HubSpot, Cold Calling, Pitch Decks\n\nSales Internship (₹999):\n• Duration: 1 Day & More (Revenue Sprint)\n• Project: Corporate Sales Pipeline & B2B Revenue Generation Campaign\n• Skills: Consultative Sales, Pipeline Tracking, Cold Outreach, Product Demos\n• Includes: Verified Certificate + LOR\n• Mentor: Senior Sales Director @ Enterprise Solutions\n\nBDE & Sales Bootcamp (₹999, was ₹2,999) — 7 Days Intensive\n\nWould you like to register?",
  },

  // ======== MARKETING ========
  {
    keywords: ['marketing', 'digital marketing', 'seo', 'google ads', 'meta ads', 'social media', 'content marketing', 'ads', 'advertising', 'facebook ads', 'instagram', 'ppc'],
    answer: "✨ Digital Marketing Programs:\n\n1-Day Sprint (₹199):\n• Duration: 5 Hours | All Levels\n• Launch live ad campaigns & build marketing funnels\n• Tools: Google Ads, Meta Ads, SEO Tools, Canva & Analytics\n\nMarketing Internship (₹999):\n• Duration: 1 Day & More (Marketing Sprint)\n• Project: Multi-Channel Digital Marketing Campaign & Lead Funnel\n• Skills: SEO Strategy, Meta & Google Ads, Content Marketing, Social Media Growth\n• Includes: Verified Certificate + LOR\n• Mentor: Digital Growth Strategist @ Brand Agency\n\nMarketing Bootcamp (₹999, was ₹2,999):\n• Duration: 7 Days\n• Modules: SEO, Meta Ads, Google Ads, Content Strategy, Conversion Funnels, Analytics\n\nWould you like to register?",
  },

  // ======== IT SERVICES ========
  {
    keywords: ['services', 'it services', 'client services', 'support', 'helpdesk', 'sla', 'ticket', 'service desk', 'it support', 'customer service'],
    answer: "⚡ IT & Client Services Programs:\n\n1-Day Sprint (₹149):\n• Duration: 5 Hours | Beginner Friendly\n• Set up SLA tracking, ticket management & client support workflows\n• Tools: Zendesk/Jira, SLA Management, Client Onboarding\n\nServices Internship (₹999):\n• Duration: 1 Day & More (Operations Sprint)\n• Project: Client Operations & SLA Support Service Desk Portal\n• Skills: Client Relationship, SLA Governance, Service Desk, Ticket Management\n• Includes: Verified Certificate + LOR\n• Mentor: Head of Service Delivery @ Global IT Services\n\nWould you like to register?",
  },

  // ======== INTERNSHIPS ========
  {
    keywords: ['internship', 'intern', 'internships', 'lor', 'letter of recommendation', 'work experience', 'intern track'],
    answer: "We offer 6 Industry Internship Tracks:\n\n1️⃣ Web Development — ₹999 (Highest Demand)\n2️⃣ HR (Human Resources) — ₹999 (Core Domain)\n3️⃣ BDE (Business Development) — ₹1,199 (High Growth)\n4️⃣ Sales — ₹999 (High Revenue)\n5️⃣ Marketing (Digital Marketing) — ₹999 (Creative & Analytics)\n6️⃣ IT & Business Services — ₹999 (Operational Excellence)\n\nAll internships include:\n✅ Real production capstone project\n✅ Verified Internship Certificate + LOR\n✅ Senior industry mentor guidance\n✅ Agile sprint-based workflow\n✅ Daily standups & mentor feedback\n\nDuration: 1 Day & More with milestone-based sprints.\n\nWhich internship track interests you?",
  },

  // ======== BOOTCAMPS ========
  {
    keywords: ['bootcamp', 'bootcamps', 'boot camp', '7 day', '7-day', 'intensive', 'multi-day', 'week long'],
    answer: "Our 7-Day Intensive Bootcamps:\n\n1️⃣ Web Development Bootcamp — ₹999 (was ₹2,999) ⭐ MOST POPULAR\n   Zero to Full Stack Web Developer\n   Modules: HTML/CSS, JS, React, Node.js, Express, Database, Deployment\n\n2️⃣ BDE & Corporate Sales Bootcamp — ₹999 (was ₹2,999)\n   Corporate Deal Closer & Growth Strategist\n   Modules: Lead Sourcing, Cold Outreach, B2B Pitching, CRM, Closing\n\n3️⃣ Digital Marketing Bootcamp — ₹999 (was ₹2,999)\n   Data-Driven Digital Marketer\n   Modules: SEO, Meta Ads, Google Ads, Content Strategy, Analytics\n\n4️⃣ HR & People Operations Bootcamp — ₹999 (was ₹2,999)\n   HR Generalist & Recruitment Specialist\n   Modules: Talent Acquisition, ATS, Interviewing, Compliance\n\nAll bootcamps include: Live sessions, mentor support, assignments, real project, certificate, and portfolio project.\n\nWhich bootcamp would you like to join?",
  },

  // ======== PRICING ========
  {
    keywords: ['price', 'pricing', 'cost', 'fee', 'fees', 'how much', 'charges', 'payment', 'pay', 'amount', 'discount', 'offer', 'affordable', 'cheap', 'expensive', 'budget'],
    answer: "💰 NextGen Tech Pricing:\n\n1-Day Experience Programs:\n• Web Development Sprint — ₹299 (was ₹999)\n• HR & Recruitment Sprint — ₹199 (was ₹799)\n• BDE & Lead Gen Sprint — ₹249 (was ₹899)\n• Corporate Sales Sprint — ₹249 (was ₹899)\n• Digital Marketing Sprint — ₹199 (was ₹799)\n• IT & Client Services Sprint — ₹149 (was ₹599)\n\nInternship Tracks:\n• Most tracks — ₹999\n• BDE Internship — ₹1,199\n\nBootcamps (7-Day):\n• All bootcamps — ₹999 (was ₹2,999)\n\n🎓 Group discounts available for 5+ students!\n💯 100% money-back guarantee for 1-Day Experiences (within 2 hrs of start).\n\nWould you like to register?",
  },

  // ======== CERTIFICATE ========
  {
    keywords: ['certificate', 'certification', 'certified', 'credential', 'verify', 'verified', 'linkedin', 'resume', 'proof'],
    answer: "🎓 Certificates at NextGen Tech:\n\nYes! Every graduate receives:\n✅ Encrypted, verifiable digital certificate\n✅ Custom URL and QR code\n✅ Can be embedded directly into LinkedIn profiles and resumes\n✅ Internship graduates also receive a Letter of Recommendation (LOR)\n\nOur certificates are verified and recognized by industry partners. You can share them on your LinkedIn, resume, and portfolio.\n\nWould you like to enroll in a program to earn your certificate?",
  },

  // ======== REGISTRATION / HOW TO JOIN ========
  {
    keywords: ['register', 'registration', 'enroll', 'enrolment', 'join', 'sign up', 'signup', 'apply', 'book', 'slot', 'how to join', 'how to register', 'how to apply', 'how to enroll', 'admission', 'i want to join', 'i want to register', 'want to join', 'interested', 'i am interested'],
    answer: "📝 How to Register at NextGen Tech:\n\n1️⃣ Visit our website: nextgentech.in\n2️⃣ Choose your program (1-Day Experience / Internship / Bootcamp)\n3️⃣ Click 'Book 1-Day Slot' or 'Apply for Internship' or 'Join Bootcamp'\n4️⃣ Fill in your details in the registration form\n5️⃣ Complete payment to confirm your slot\n\nYou can also scroll down on our homepage to the registration section and fill out the form directly.\n\nNeed help with registration? Feel free to ask!",
  },

  // ======== BEGINNER / NO EXPERIENCE ========
  {
    keywords: ['beginner', 'no experience', 'never coded', 'zero experience', 'fresher', 'new to', 'suitable', 'no knowledge', 'can i join', 'prerequisites', 'requirement', 'eligible', 'eligibility', 'who can join', 'non technical', 'non-technical', 'non tech'],
    answer: "Yes! Our programs are designed for all levels, including complete beginners!\n\n✅ No prior coding or technical experience required\n✅ Step-by-step guidance from fundamentals\n✅ Dedicated mentor assistance throughout\n✅ Code templates and starter kits provided\n\nAll you need:\n• A laptop (Windows, Mac, or Linux)\n• Google Chrome or modern browser\n• Stable internet connection\n• Free GitHub and Vercel accounts (we help you set up)\n\nOur 1-Day Experiences are specifically marked 'Beginner Friendly' and are perfect for students with zero experience!",
  },

  // ======== REFUND ========
  {
    keywords: ['refund', 'money back', 'cancel', 'cancellation', 'return money', 'guarantee'],
    answer: "💯 Refund Policy:\n\nWe offer a 100% money-back guarantee for all 1-Day Experiences if you request a refund within 2 hours of the workshop start time.\n\nFor Internships and Bootcamps, please contact our support team for refund queries.\n\nWe're confident you'll love the experience!",
  },

  // ======== CONTACT ========
  {
    keywords: ['contact', 'phone', 'email', 'reach', 'call', 'whatsapp', 'connect', 'talk to someone', 'support', 'help me', 'human', 'agent', 'real person', 'number', 'phone number', 'mail'],
    answer: "📞 Contact NextGen Tech:\n\nYou can reach us through:\n• 📧 Email: Visit our website contact form\n• 💬 This chat (I'm here to help!)\n• 🌐 Website: Fill in the registration or contact form on our homepage\n• 🏫 For colleges: Use our 'Partner With Us' form\n\nOur team typically responds within a few hours during business hours.\n\nIs there anything specific I can help you with right now?",
  },

  // ======== COLLEGE PARTNERSHIP ========
  {
    keywords: ['college', 'university', 'campus', 'tpo', 'placement', 'institution', 'partnership', 'partner', 'workshop for college', 'campus event', 'hackathon'],
    answer: "🏫 College Partnership Programs:\n\nWe offer B2B college partnerships including:\n\n• 1-Day Workshops — 6-hour build & deploy masterclasses\n• Hackathons — 24-hour coding competitions with prizes\n• Bootcamps — 7 to 30-day intensive skill tracks\n• Internship Programs — Agile workflows with Jira, PRs, and LORs\n• Placement Training — Mock interviews, DSA, system design\n• AI Workshops — LLMs, prompt engineering, agent building\n• Industry Projects — Real production capstones for portfolios\n\nSpecial group pricing available for 5+ students!\n\nInterested? Use the 'Partner With Us' button on our website or ask me for more details!",
  },

  // ======== HOW IT WORKS ========
  {
    keywords: ['how it works', 'how does it work', 'process', 'steps', 'methodology', 'what happens', 'explain process'],
    answer: "Here's how NextGen Tech works:\n\nStep 01: Choose Your Track\nSelect a 1-Day Experience, Developer Internship, or Multi-Week Bootcamp aligned with your goals.\n\nStep 02: Hands-On Live Learning\nJoin live interactive sessions guided by senior engineers from leading tech companies.\n\nStep 03: Build & Deploy Real Projects\nWrite production-ready code, submit pull requests, and deploy your live apps.\n\nStep 04: Get Certified & Launch Your Career\nEarn verified credentials, build a standout GitHub portfolio, and unlock interview referrals.\n\nFor 1-Day Experiences specifically:\n01 → Learn (Interactive live masterclass)\n02 → Build (Write real production code)\n03 → Deploy (Ship your app live before sunset)\n04 → Certificate (Earn verified LinkedIn credentials)\n\nReady to get started?",
  },

  // ======== SCHEDULE / TIMING ========
  {
    keywords: ['schedule', 'timing', 'time', 'when', 'date', 'next batch', 'upcoming', 'batch', 'start date', 'day schedule', 'timetable', 'calendar', 'what time', 'duration'],
    answer: "📅 Typical 1-Day Experience Schedule:\n\n• 9:00 AM — Introduction & Setup\n• 10:00 AM — Frontend Architecture & Core Concepts\n• 12:00 PM — Backend & Database Integration\n• 2:00 PM — Hands-on Project Building\n• 4:00 PM — Live Cloud Deployment\n• 5:00 PM — Certificate & Portfolio Release\n\nProgram Durations:\n• 1-Day Experiences: 5-6 Hours\n• Internships: 1 Day & More (Agile/Corporate/Growth Sprints)\n• Bootcamps: 7 Days (15 hrs/week)\n\nFor specific upcoming batch dates, please register through our website — our team will share the next available slots!\n\nWould you like to register for an upcoming batch?",
  },

  // ======== MODE / ONLINE / OFFLINE ========
  {
    keywords: ['online', 'offline', 'mode', 'virtual', 'in person', 'remote', 'physical', 'classroom', 'from home', 'work from home', 'location', 'where'],
    answer: "📍 Mode of Learning:\n\nOur programs are available in both Online and Offline modes!\n\n🌐 Online: Join live sessions from anywhere with an internet connection\n🏢 Offline: Attend in-person at our training center\n\nAll live sessions are recorded in HD and available in your student portal immediately. You also get 24/7 access to our active mentor Discord channels for code debugging.\n\nWhich mode would you prefer?",
  },

  // ======== MENTOR ========
  {
    keywords: ['mentor', 'trainer', 'teacher', 'instructor', 'who teaches', 'faculty', 'guidance', 'mentors', 'trainers'],
    answer: "👨‍🏫 Our Mentors:\n\nAll programs are guided by 5+ Senior Industry Mentors from leading companies:\n\n• Senior Web Architect @ TechCorp\n• Senior HR Lead @ Corporate Talent Hub\n• Head of Business Growth @ Global Services\n• Senior Sales Director @ Enterprise Solutions\n• Digital Growth Strategist @ Brand Agency\n• Head of Service Delivery @ Global IT Services\n\nYou get:\n✅ Live mentor support during sessions\n✅ Line-by-line code/project evaluation\n✅ 24/7 Discord access for help\n✅ Mentor feedback on strategy, communication & execution\n\nOur mentors bring real industry experience to every session!",
  },

  // ======== PROJECTS ========
  {
    keywords: ['project', 'projects', 'portfolio', 'capstone', 'what will i build', 'build', 'deploy', 'github'],
    answer: "🚀 Production Capstone Projects:\n\nEach program includes a real project you can add to your portfolio:\n\n• Web Dev: Full Stack Web Application (React + Node.js)\n• HR: HR Recruitment & ATS Portal\n• BDE: B2B Corporate Prospecting Campaign\n• Sales: Enterprise Sales Deal Deck & Pipeline\n• Marketing: Performance Ad Campaign & Funnel\n• Services: IT Client Service Desk Portal\n\n25+ projects have been shipped by our students!\nAll projects are deployed live and added to your GitHub portfolio.\n\nWould you like to start building your project?",
  },

  // ======== REVIEWS / TESTIMONIALS ========
  {
    keywords: ['review', 'reviews', 'testimonial', 'feedback', 'student experience', 'what students say', 'success story', 'results'],
    answer: "⭐ What Our Students Say:\n\n\"I built my first React project in a single day.\" — Rahul K., B.Tech CSE\n\n\"The internship felt like an actual company project.\" — Priya M., B.Tech IT\n\n\"The 1-Day AI Agent workshop was insane. Deployed my bot live before 5 PM!\" — Ananya S., BCA\n\n\"Power BI & SQL sprint got me selected in campus placement interviews.\" — Vikram R., BE Data Science\n\n\"No theory fluff. Wrote 300+ lines of production TypeScript on day one.\" — Arjun T., B.Tech ECE\n\n\"Got a verified certificate + shippable GitHub portfolio link on LinkedIn!\" — Sneha P., MCA\n\n250+ students are actively learning with us! All reviews are 5 stars ⭐⭐⭐⭐⭐",
  },

  // ======== MISSED SESSION ========
  {
    keywords: ['miss', 'missed', 'absent', 'recording', 'recorded', 'replay', 'catch up', 'video', 'watch again'],
    answer: "Don't worry if you miss a session!\n\n✅ All live sessions are recorded in HD\n✅ Available in your student portal immediately after the session\n✅ 24/7 access to mentor Discord channels for code debugging\n✅ You can catch up at your own pace\n\nWe make sure no student falls behind!",
  },

  // ======== GROUP DISCOUNT ========
  {
    keywords: ['group', 'group discount', 'batch discount', 'team', 'friends', 'college batch', 'campus ambassador', 'bulk', 'multiple'],
    answer: "🎉 Group Discounts Available!\n\nWe offer special pricing for:\n• Groups of 5+ students\n• College batches\n• Campus ambassador discounts\n\nContact us through the 'Partner With Us' form or reach out via our website to request a group pass.\n\nBring your friends and save together!",
  },

  // ======== JOB / PLACEMENT / CAREER ========
  {
    keywords: ['job', 'placement', 'career', 'hire', 'hired', 'employment', 'work', 'job guarantee', 'job ready', 'job placement', 'get hired', 'job assistance', 'career support', 'package', 'salary'],
    answer: "💼 Career & Placement Support:\n\nNextGen Tech helps you become job-ready through:\n\n✅ Real production project portfolio on GitHub\n✅ Verified certificates shareable on LinkedIn\n✅ Letter of Recommendation (LOR) from internships\n✅ Interview preparation through bootcamps\n✅ Mock technical interviews & system design\n✅ Resume building & portfolio polish\n✅ Industry mentor network & referrals\n\nOur students have successfully used their NextGen Tech portfolios in campus placements and job interviews!\n\nWant to start your career journey? Ask about our programs!",
  },

  // ======== AI / MACHINE LEARNING ========
  {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'data science', 'data analytics', 'python', 'deep learning', 'chatgpt', 'gpt', 'llm', 'prompt engineering', 'generative ai'],
    answer: "🤖 AI & Data Science at NextGen Tech:\n\nWe offer specialized workshops and tracks covering:\n\n• AI Agent Building & Deployment\n• Generative AI APIs & LLMs\n• Prompt Engineering\n• Data Analytics with Power BI & SQL\n• Python for Data Science\n• Machine Learning Fundamentals\n\nOur AI Workshops include building and deploying autonomous AI agents live!\n\nThese are offered through college partnerships and special workshop events. Contact us to learn about upcoming AI batches!",
  },

  // ======== LANGUAGE / TOOLS ========
  {
    keywords: ['tools', 'technology', 'tech stack', 'what tools', 'software', 'platform', 'vercel', 'aws', 'github', 'jira', 'discord', 'hubspot', 'salesforce', 'canva'],
    answer: "🛠️ Technologies & Tools We Use:\n\nDevelopment:\n• HTML5, CSS3, JavaScript, React, Node.js, Express\n• Tailwind CSS, Next.js, TypeScript\n• GitHub, Vercel, AWS\n\nBusiness & Marketing:\n• LinkedIn Sales Navigator, HubSpot CRM, Salesforce\n• Google Ads, Meta Ads, Google Analytics\n• Canva, SEO Tools, ATS Software\n\nHR & Services:\n• ATS Tools, HR Analytics, Zendesk, Jira\n• SLA Management, Ticket Systems\n\nCollaboration:\n• Discord (team channels), Kanban boards\n• Git version control, Pull Requests\n\nAll tools and cloud environments are provided — you just need a laptop!",
  },

  // ======== PAYMENT METHOD ========
  {
    keywords: ['payment method', 'upi', 'card', 'debit card', 'credit card', 'net banking', 'paytm', 'gpay', 'google pay', 'phonepe', 'emi', 'installment', 'how to pay'],
    answer: "💳 Payment Methods:\n\nWe accept multiple payment options:\n• UPI (Google Pay, PhonePe, Paytm, etc.)\n• Credit/Debit Cards\n• Net Banking\n• Bank Transfer\n\nPayment is processed securely through our website during registration.\n\nOnce payment is confirmed, you'll receive:\n✅ Confirmation email with batch details\n✅ Access to student portal\n✅ Pre-session setup instructions\n\nNeed help with payment? Just ask!",
  },

  // ======== AGE / STUDENT TYPE ========
  {
    keywords: ['age', 'school', 'college student', 'working professional', 'graduate', 'postgraduate', 'mba', 'btech', 'bca', 'mca', 'engineering', 'year', '1st year', '2nd year', '3rd year', '4th year', 'final year'],
    answer: "👨‍🎓 Who Can Join?\n\nNextGen Tech welcomes:\n• College students (all years — 1st to final year)\n• B.Tech, BE, BCA, MCA, MBA, B.Com, BA, and all streams\n• Fresh graduates looking to upskill\n• Working professionals exploring new domains\n• Career switchers wanting to enter tech/business\n\nNo age restrictions — anyone with a laptop and willingness to learn can join!\n\nOur programs are especially popular among B.Tech CSE, IT, ECE, and BCA students, but we also have tracks for HR, BDE, Sales, and Marketing students.",
  },

  // ======== COMPARISON ========
  {
    keywords: ['difference', 'compare', 'vs', 'versus', 'which is better', 'which should i', 'suggest', 'recommend', 'best for', 'which one', 'confused'],
    answer: "🤔 Which Program Should You Choose?\n\n1-Day Experience (₹149 - ₹299):\n✅ Best for: Quick taste of a domain, beginners, tight schedule\n✅ Duration: 5-6 hours\n✅ Outcome: One deployed project + certificate\n\nInternship Track (₹999 - ₹1,199):\n✅ Best for: Resume building, real work experience simulation\n✅ Duration: 1 Day & More (Agile sprints)\n✅ Outcome: Capstone project + Certificate + LOR\n\nBootcamp (₹999):\n✅ Best for: Deep domain mastery, career readiness\n✅ Duration: 7 Days intensive\n✅ Outcome: Complete skill track + portfolio + certificate\n\nMy recommendation:\n• Brand new? → Start with a 1-Day Experience\n• Want resume value? → Go for an Internship\n• Want deep skills? → Join a Bootcamp\n\nWhich sounds right for you?",
  },

  // ======== MULTIPLE PROGRAMS ========
  {
    keywords: ['multiple', 'more than one', 'two programs', 'can i do both', 'combo', 'bundle', 'all tracks'],
    answer: "Yes! You can absolutely join multiple programs!\n\n✅ Take different 1-Day Experiences across domains\n✅ Combine a 1-Day Experience with an Internship\n✅ Do a Bootcamp and then an Internship for maximum impact\n✅ Earn multiple certificates for different domains\n\nMany students start with a 1-Day Experience and then upgrade to an Internship or Bootcamp in the same domain.\n\nThere are no restrictions — learn as many domains as you want!",
  },

  // ======== FREE / TRIAL ========
  {
    keywords: ['free', 'trial', 'demo', 'sample', 'free class', 'free session', 'try', 'no cost'],
    answer: "While our programs are paid, they are extremely affordable:\n\n• Starting from just ₹149 for a full 1-Day program!\n• All 1-Day programs come with a 100% money-back guarantee\n• You get a real project + certificate for that price\n\nWe don't offer free trials because our programs are project-based — you build and deploy real applications. The value you get far exceeds the investment!\n\nWant to start with our most affordable option? The IT & Client Services Sprint is just ₹149!",
  },

  // ======== DOUBT / HELP ========
  {
    keywords: ['doubt', 'stuck', 'help', 'issue', 'problem', 'error', 'bug', 'not working', 'confused about', 'clarify', 'clarification', 'question'],
    answer: "Need help? Here's how to get support:\n\n📚 During Programs:\n• Live mentor support in every session\n• Raise questions in real-time\n• Code templates and starter kits provided\n\n🕐 After Programs:\n• 24/7 Discord mentor channels\n• HD session recordings in student portal\n• Community support from fellow students\n\n💬 General Questions:\n• Ask me anything right here in this chat!\n• Fill the contact form on our website\n• Our team responds within a few hours\n\nWhat specific help do you need?",
  },

  // ======== LAPTOP / SETUP ========
  {
    keywords: ['laptop', 'computer', 'setup', 'system requirements', 'mac', 'windows', 'linux', 'chromebook', 'mobile', 'tablet', 'phone', 'ipad', 'device'],
    answer: "💻 System Requirements:\n\nAll you need:\n• A laptop or desktop (Windows, Mac, or Linux)\n• Google Chrome or any modern browser\n• Stable internet connection (minimum 5 Mbps)\n• Free GitHub account (we help you create one)\n• Free Vercel account (for deployment)\n\n❌ NOT recommended:\n• Mobile phones or tablets (coding requires a keyboard)\n• Chromebooks (limited for some programs)\n\nWe provide all cloud development environments — no expensive software needed!\n\nNeed help setting up? Our team guides you through setup before the session starts.",
  },

  // ======== LANGUAGE / ENGLISH ========
  {
    keywords: ['language', 'english', 'hindi', 'medium', 'instruction language', 'teach in', 'english only', 'hindi medium'],
    answer: "🗣️ Language of Instruction:\n\nOur sessions are primarily conducted in English, but mentors also explain concepts in Hindi when needed for better understanding.\n\nAll materials, code, and documentation are in English as it's the industry standard.\n\nDon't worry about language barriers — our mentors are friendly and patient, and you can always ask questions in Hindi or English!",
  },

  // ======== WEEKEND / WEEKDAY ========
  {
    keywords: ['weekend', 'weekday', 'saturday', 'sunday', 'working day', 'holiday', 'day off', 'which day'],
    answer: "📅 Program Schedule:\n\nWe offer programs on both weekdays and weekends!\n\n• 1-Day Experiences: Available on weekends (Saturday/Sunday) and select weekdays\n• Bootcamps: Usually span across a week with flexible timing\n• Internships: Flexible milestone-based — work at your pace\n\nNew batches are announced regularly. Register on our website and we'll share the next available dates!\n\nPrefer weekends or weekdays?",
  },

  // ======== COMMUNITY / NETWORKING ========
  {
    keywords: ['community', 'network', 'networking', 'peers', 'connect', 'discord', 'group', 'batch mates', 'fellow students'],
    answer: "🤝 NextGen Tech Community:\n\nWhen you join, you become part of a 250+ student community!\n\n• Active Discord channels for each domain\n• Team rooms with 4-5 peers for internships\n• Collaborate with fellow students on projects\n• Network with industry mentors\n• Share your work and get feedback\n• Access alumni network for career advice\n\nLearning is always better together! Join our community today.",
  },

  // ======== DASHBOARD / LOGIN ========
  {
    keywords: ['dashboard', 'login', 'log in', 'sign in', 'student portal', 'my account', 'my courses', 'my certificates', 'access', 'password'],
    answer: "🔐 Student Dashboard:\n\nAfter registration, you get access to:\n\n• My Dashboard — Track your progress\n• My Courses — Access enrolled programs\n• My Certificates — Download verified certificates\n• Session Recordings — Watch past sessions in HD\n\nTo log in:\n1. Go to nextgentech.in/login\n2. Enter your registered email & password\n3. Access your personalized dashboard\n\nForgot password? Use the 'Forgot Password' option on the login page.\n\nNeed login help? Ask me!",
  },

  // ======== SPECIFIC PROGRAM QUERIES ========
  {
    keywords: ['cheapest', 'lowest price', 'minimum price', 'affordable option', 'budget friendly', 'least expensive'],
    answer: "💰 Most Affordable Programs:\n\nOur most budget-friendly options:\n\n1. IT & Client Services Sprint — Just ₹149! (was ₹599)\n2. HR & Recruitment Sprint — ₹199 (was ₹799)\n3. Digital Marketing Sprint — ₹199 (was ₹799)\n4. BDE & Lead Gen Sprint — ₹249 (was ₹899)\n5. Corporate Sales Sprint — ₹249 (was ₹899)\n6. Web Development Sprint — ₹299 (was ₹999)\n\nAll include a real project + verified certificate!\n\n100% money-back guarantee — zero risk!\n\nWant to register for any of these?",
  },
  {
    keywords: ['popular', 'most popular', 'best seller', 'trending', 'most enrolled', 'top program', 'best program'],
    answer: "🔥 Most Popular Programs:\n\n1. Web Development Sprint (1-Day) — ₹299\n   Our #1 program! Beginner Friendly.\n\n2. Web Development Bootcamp (7-Day) — ₹999\n   Most enrolled bootcamp. Zero to Full Stack.\n\n3. Web Development Internship — ₹999\n   Highest demand internship track.\n\n4. Digital Marketing Sprint — ₹199\n   Trending for marketing students.\n\n5. BDE Internship — ₹1,199\n   Fast-growing for business students.\n\nWeb Development is by far our most popular domain!\n\nWould you like to join our top-rated Web Dev program?",
  },
  {
    keywords: ['data analytics', 'power bi', 'sql', 'excel', 'tableau', 'data analysis'],
    answer: "📊 Data Analytics:\n\nWe cover Data Analytics through specialized workshops:\n• Power BI dashboards & reporting\n• SQL for data querying\n• Excel advanced analytics\n• Data visualization techniques\n\nOne of our students, Vikram R., used the Power BI & SQL sprint to crack campus placement interviews!\n\nThese are available through special batches and college partnership events. Register on our website and we'll notify you about upcoming Data Analytics sessions!",
  },

  // ======== VALIDITY / EXPIRY ========
  {
    keywords: ['validity', 'expire', 'expiry', 'how long', 'lifetime', 'access duration', 'valid for'],
    answer: "📋 Program Access & Validity:\n\n• Session Recordings: Available for lifetime in your student portal\n• Certificates: Never expire — valid forever\n• Discord Community: Lifetime access\n• Project Code: Yours to keep on GitHub forever\n• Mentor Support: Available during and after the program\n\nOnce enrolled, your learning materials never expire!",
  },

  // ======== SPECIFIC QUESTIONS ========
  {
    keywords: ['what will i learn', 'syllabus', 'curriculum', 'course content', 'topics', 'what is covered', 'modules'],
    answer: "📚 What You'll Learn (Example — Web Dev 1-Day):\n\n• HTML & CSS — Responsive layouts\n• JavaScript — Core programming logic\n• React — Component architecture, state, props\n• Backend basics — APIs and server setup\n• Database — Data storage and retrieval\n• Deployment — Ship live to Vercel/AWS\n\nEach program has its own specialized curriculum tailored to the domain.\n\nWhich program's curriculum would you like to know about? Just ask:\n• Web Development\n• HR & Recruitment\n• BDE & Lead Gen\n• Sales\n• Digital Marketing\n• IT Services",
  },

  // ======== ATTENDANCE / COMPLETION ========
  {
    keywords: ['attendance', 'completion', 'mandatory', 'compulsory', 'required', 'minimum attendance', 'pass', 'fail'],
    answer: "📋 Completion Requirements:\n\n1-Day Experiences:\n• Attend the full session (5-6 hours)\n• Complete the hands-on project\n• Certificate issued at the end of the day\n\nInternships:\n• Complete sprint milestones\n• Submit project deliverables\n• Participate in standups & reviews\n• Certificate + LOR issued on completion\n\nBootcamps:\n• Attend live sessions (recordings available if missed)\n• Complete assignments\n• Submit final project\n• Certificate issued after final project review\n\nWe're flexible and supportive — our goal is to help you succeed!",
  },

  // ======== CHATBOT IDENTITY & META ========
  {
    keywords: ['how are you', 'how r u', 'how do you do', 'whats up', 'wassup', 'how are u'],
    answer: "I'm doing great, thank you for asking! 😊 I'm always here and ready to help you explore NextGen Tech programs.\n\nHow can I assist you today? You can ask about our 1-Day programs, internships, bootcamps, pricing, or anything else!",
  },
  {
    keywords: ['your name', 'what is your name', 'whats your name', 'who is this', 'what should i call you'],
    answer: "I'm the NextGen Tech Virtual Assistant! 🤖 You can call me NextGen Bot.\n\nI'm here to help you with all your questions about our programs, pricing, registration, certificates, and more.\n\nWhat would you like to know?",
  },
  {
    keywords: ['what can you do', 'what are your capabilities', 'features', 'what do you know', 'how can you help'],
    answer: "Here's everything I can help you with! 💡\n\n📚 Programs: 1-Day Experiences, Internships, Bootcamps\n💰 Pricing: All program costs & discounts\n📝 Registration: How to sign up & book slots\n🎓 Certificates: Verification, LOR, LinkedIn\n👨‍🏫 Mentors: Who teaches & their experience\n🚀 Projects: What you'll build in each program\n💼 Career: Job readiness & placement support\n🏫 Colleges: Partnership & campus programs\n📅 Schedule: Timings, batches, durations\n💳 Payment: Methods & process\n⭐ Reviews: Student testimonials\n🔐 Account: Login, dashboard, portal\n\nJust type your question or tap a quick option!",
  },
  {
    keywords: ['who created you', 'who made you', 'who built you', 'who developed you', 'developer', 'creator'],
    answer: "I was built by the NextGen Tech development team! 🛠️\n\nNextGen Tech is a modern EdTech platform providing hands-on IT training, simulated developer internships, and intensive bootcamps.\n\nI'm here to help you learn about our programs and get started on your tech career journey. What would you like to know?",
  },
  {
    keywords: ['are you a robot', 'are you real', 'are you human', 'are you ai', 'bot or human', 'real person'],
    answer: "I'm a virtual assistant (chatbot) built by NextGen Tech! 🤖 I'm not a human, but I'm trained to answer all your questions about our programs, pricing, registration, and more.\n\nIf you need to speak with a real person, you can fill out the contact form on our website and our team will get back to you within a few hours!",
  },
  {
    keywords: ['are you better than', 'other chatbots', 'compared to', 'chatgpt', 'better than chatgpt'],
    answer: "I'm specifically designed for NextGen Tech! 😊 Unlike general-purpose AI, I'm an expert on everything related to our programs, pricing, internships, bootcamps, and registration.\n\nI may not know everything about the world, but I know everything about NextGen Tech! Ask me anything about our programs.",
  },
  {
    keywords: ['do you store', 'my data', 'privacy', 'data privacy', 'secure', 'security', 'safe'],
    answer: "🔒 Your privacy is important to us!\n\nThis chat is processed locally in your browser. We don't store your chat conversations or personal data from this widget.\n\nWhen you register on our website, your registration data is stored securely and used only for program enrollment and communication.\n\nFeel free to ask any questions here without worry!",
  },
  {
    keywords: ['always right', 'accurate', 'reliable', 'correct information', 'trust'],
    answer: "I do my best to provide accurate information! 😊 All program details, pricing, and features I share are based on our current offerings.\n\nHowever, for the most up-to-date details (especially batch dates and special offers), I recommend checking our website or contacting our team.\n\nIs there something specific you'd like to verify?",
  },
  {
    keywords: ['what language', 'built with', 'technology behind', 'how were you made', 'tech stack of bot'],
    answer: "I'm built with React and TypeScript, running directly on the NextGen Tech website! ⚛️\n\nSpeaking of technology — if you're interested in learning web development, React, and TypeScript, check out our Web Development programs! We teach you to build apps just like this one.\n\nWant to learn more about our Web Dev programs?",
  },
  {
    keywords: ['can you learn', 'do you learn', 'improve', 'get smarter', 'train yourself'],
    answer: "I work with a pre-trained knowledge base about NextGen Tech! 📚 While I don't learn in real-time from our conversation, our team regularly updates my knowledge with the latest program information.\n\nIf I couldn't answer something well, our team reviews and improves my responses!\n\nIs there anything specific I can help you with?",
  },

  // ======== CASUAL / FUN ========
  {
    keywords: ['joke', 'funny', 'make me laugh', 'tell me something funny', 'humor'],
    answer: "Here's one for you! 😄\n\nWhy do programmers prefer dark mode?\nBecause light attracts bugs! 🐛\n\nSpeaking of programming — want to learn to code in just 1 day? Our Web Development Sprint is only ₹299! No bugs guaranteed (well, almost 😉).",
  },
  {
    keywords: ['favorite color', 'fav color', 'colour', 'what color'],
    answer: "My favorite color is Teal (#0E8C93) — the NextGen Tech brand color! 💚\n\nIt represents innovation, growth, and technology — just like our programs! Want to explore our programs and see teal in action? 😊",
  },
  {
    keywords: ['favorite movie', 'fav movie', 'movie recommendation', 'watch'],
    answer: "As a chatbot, I don't watch movies 🎬 — but if I could, I'd probably love \"The Social Network\" or \"The Imitation Game\"! Great tech stories.\n\nSpeaking of great stories — why not start your own tech success story with NextGen Tech? Our 1-Day programs start from just ₹149!",
  },
  {
    keywords: ['music', 'song', 'favorite song', 'do you like music', 'listen to music'],
    answer: "I don't have ears, but I appreciate good rhythm! 🎵 Much like the rhythm of writing clean code or building a perfect marketing campaign.\n\nWant to find your rhythm in tech? Check out our 1-Day Experience programs!",
  },
  {
    keywords: ['poem', 'write a poem', 'poetry', 'rhyme'],
    answer: "Here's a quick one! ✨\n\nCode by morning, deploy by night,\nNextGen Tech will guide you right.\nFrom HTML to React's delight,\nYour career takes off — what a sight! 🚀\n\nWant to start your coding journey? Ask about our programs!",
  },
  {
    keywords: ['meaning of life', 'purpose of life', 'what is life', '42'],
    answer: "A philosopher might say 42 (thanks, Douglas Adams! 📖), but at NextGen Tech, we believe the meaning of life is to keep learning, building, and growing! 🚀\n\nStart your growth journey with one of our programs. What domain interests you?",
  },
  {
    keywords: ['fun fact', 'interesting fact', 'did you know', 'tell me something interesting', 'surprise me'],
    answer: "Here's a fun fact! 🤓\n\nThe first website ever created is still online! It was made by Tim Berners-Lee in 1991 at CERN.\n\nAnother fun fact: Our students have shipped 25+ production projects and earned verified certificates!\n\nWant to build your own website? Our Web Dev Sprint takes just 1 day and costs ₹299! 🚀",
  },
  {
    keywords: ['if you were human', 'what would you do', 'wish', 'dream'],
    answer: "If I were human, I'd definitely enroll in a NextGen Tech Bootcamp! 😄 Probably the Web Development one — building real apps sounds amazing.\n\nBut since I'm a bot, I'll help YOU start that journey instead! Which program interests you?",
  },
  {
    keywords: ['alien', 'aliens', 'ufo', 'space', 'exist'],
    answer: "Whether aliens exist is still a mystery! 👽 But what's NOT a mystery is how to kickstart your tech career — NextGen Tech has the answer!\n\nWith 6 industry tracks and prices starting at ₹149, the real question is: which program will you choose? 🚀",
  },
  {
    keywords: ['favorite food', 'food', 'eat', 'hungry', 'pizza', 'biryani'],
    answer: "I run on electricity, not food! ⚡ But I hear coding sessions pair well with chai and biryani 😄\n\nSpeaking of fuel — fuel your career with NextGen Tech! Our 1-Day programs are the perfect recipe for success. Want to know more?",
  },

  // ======== EMOTIONAL / EMPATHY ========
  {
    keywords: ['stressed', 'stress', 'anxiety', 'anxious', 'overwhelmed', 'pressure', 'worried', 'tension'],
    answer: "I'm sorry to hear you're feeling stressed 💙 Remember, it's okay to take things one step at a time.\n\nIf career or skill worries are adding to your stress, NextGen Tech can help! Our programs are designed to be supportive and beginner-friendly — no pressure, just hands-on learning at your pace.\n\nWould talking about a program help take your mind off things?",
  },
  {
    keywords: ['bad day', 'sad', 'upset', 'unhappy', 'depressed', 'feeling down', 'not good'],
    answer: "I'm sorry you're having a tough day 😔 Here's a virtual hug! 🤗\n\nSometimes learning something new can be a great mood booster. Our 1-Day programs are fun, interactive, and you walk away with a real project and certificate!\n\nWant me to tell you about a program that might cheer you up?",
  },
  {
    keywords: ['excited', 'new job', 'got selected', 'happy', 'celebration', 'achievement', 'proud'],
    answer: "That's amazing! Congratulations! 🎉🥳 We're so happy for you!\n\nWant to level up your skills even further? NextGen Tech programs can give you an extra edge — verified certificates, real projects, and industry mentorship.\n\nKeep the momentum going! What would you like to learn next?",
  },
  {
    keywords: ['frustrated', 'annoying', 'not working', 'useless', 'waste', 'not helpful', 'try again', 'bad answer'],
    answer: "I'm sorry I wasn't able to help properly! 😔 Let me try again.\n\nCould you rephrase your question? Or try asking about:\n• Our programs (1-Day, Internship, Bootcamp)\n• Pricing & registration\n• Certificates & career support\n\nYou can also contact our team directly through the website for personalized help!",
  },
  {
    keywords: ['confused', 'not sure', 'don\'t know', 'help me decide', 'which one', 'what should i choose', 'lost'],
    answer: "No worries, let me help you decide! 🤔\n\n🔰 Brand new to tech/domain? → Start with a 1-Day Experience (₹149-₹299)\n📄 Want resume value & LOR? → Go for an Internship Track (₹999)\n🎯 Want deep mastery? → Join a 7-Day Bootcamp (₹999)\n\nDomains available:\n• Web Development\n• HR (Human Resources)\n• BDE (Business Development)\n• Sales\n• Digital Marketing\n• IT Services\n\nWhat's your background/interest? I'll recommend the perfect program!",
  },

  // ======== FOLLOW-UP / CONVERSATION ========
  {
    keywords: ['yes', 'yep', 'yeah', 'ya', 'yup', 'correct', 'right', 'exactly', 'that is correct', 'affirmative'],
    answer: "Great! 👍 How would you like to proceed?\n\n• Type 'register' to learn how to sign up\n• Ask about a specific program for more details\n• Type 'pricing' to see all costs\n• Or ask any other question!\n\nI'm here to help!",
  },
  {
    keywords: ['no', 'nope', 'nah', 'not really', 'that is not', 'not what i meant', 'wrong', 'incorrect'],
    answer: "I apologize for the confusion! 😅 Could you please rephrase your question? I'll do my best to give you the right answer.\n\nYou can ask about:\n• Programs & courses\n• Pricing & offers\n• Registration process\n• Certificates & career support\n• Or anything else about NextGen Tech!",
  },
  {
    keywords: ['explain again', 'repeat', 'say that again', 'come again', 'once more', 'clarify', 'more details', 'elaborate', 'tell me more'],
    answer: "Of course! Could you tell me which topic you'd like me to explain in more detail? 😊\n\n• 1-Day Experience Programs\n• Internship Tracks\n• Bootcamps\n• Pricing & Registration\n• Certificates & LOR\n• Career & Placement\n• Mentors & Projects\n\nJust mention the topic and I'll give you a detailed breakdown!",
  },
  {
    keywords: ['what do you mean', 'i dont understand', 'unclear', 'confusing', 'complicated'],
    answer: "Let me simplify! 😊\n\nNextGen Tech offers 3 types of programs:\n\n1️⃣ 1-Day Experience (₹149-₹299) → Learn + Build + Deploy in ONE day\n2️⃣ Internship (₹999) → Work on real projects like a professional\n3️⃣ Bootcamp (₹999) → 7 days of intensive deep learning\n\nAll include certificates! All are beginner-friendly!\n\nWhich one would you like to know more about?",
  },
  {
    keywords: ['example', 'give me an example', 'show me', 'sample', 'demo', 'like what'],
    answer: "Here's an example! 🎯\n\nIf you join our Web Dev 1-Day Sprint (₹299):\n\n9 AM → Setup & introduction\n10 AM → Learn HTML, CSS & JavaScript\n12 PM → Build with React\n2 PM → Create your full project\n4 PM → Deploy live to the internet!\n5 PM → Get your verified certificate 🎓\n\nBy end of day, you'll have a LIVE website on the internet + a certificate for LinkedIn!\n\nWant to register?",
  },

  // ======== GENERAL KNOWLEDGE REDIRECTS ========
  {
    keywords: ['capital of', 'president', 'prime minister', 'largest planet', 'continents', 'speed of light', 'romeo and juliet', 'world war', 'boiling point'],
    answer: "Great question! 🌍 However, I'm specialized in NextGen Tech programs and can't answer general knowledge questions.\n\nBut here's what I CAN help with:\n• Program details & pricing\n• Registration & enrollment\n• Certificates & career support\n• And everything about NextGen Tech!\n\nFor general knowledge, I'd recommend Google or ChatGPT! 😊\n\nAnything about NextGen Tech I can help you with?",
  },
  {
    keywords: ['weather', 'temperature', 'rain', 'sunny', 'forecast', 'climate'],
    answer: "I don't have weather data, but I can tell you the forecast for your career looks BRIGHT with NextGen Tech! ☀️🚀\n\nOur programs are designed to make you job-ready. Want to know more?",
  },
  {
    keywords: ['what time', 'current time', 'time now', 'clock'],
    answer: "I don't have access to a clock, but I can tell you it's always a good time to start learning! ⏰\n\nOur 1-Day programs run from 9 AM to 5 PM. Want to book a slot?",
  },
  {
    keywords: ['today\'s date', 'date today', 'what day', 'what date', 'calendar today'],
    answer: "I don't track dates, but I know our next batch is coming up soon! 📅\n\nRegister on our website and we'll share the exact batch dates with you. Programs available every week!\n\nWant to register?",
  },
  {
    keywords: ['christmas', 'new year', 'holiday', 'festival', 'diwali', 'holi'],
    answer: "Wishing you happiness during the festive season! 🎉\n\nFun fact: We often run special festive discount batches! Check our website for any ongoing offers.\n\nWould you like to know about our current pricing?",
  },

  // ======== MATH / CONVERSIONS ========
  {
    keywords: ['calculate', 'math', 'plus', 'minus', 'multiply', 'divide', 'times', 'percentage', 'convert', 'kilometers', 'miles', 'feet', 'centimeters', 'celsius', 'fahrenheit'],
    answer: "I'm not a calculator, but I can crunch these numbers for you! 😄\n\n💰 1-Day Programs: ₹149 to ₹299\n💰 Internships: ₹999 to ₹1,199\n💰 Bootcamps: ₹999 (was ₹2,999 — that's 67% OFF!)\n\nFor math and conversions, Google Calculator works great! But for career calculations, NextGen Tech is your best investment! 📈",
  },

  // ======== TASK REQUESTS ========
  {
    keywords: ['set a reminder', 'reminder', 'alarm', 'notify me', 'alert me'],
    answer: "I can't set reminders, but here's what I suggest! ⏰\n\nRegister on our website and we'll send you:\n✅ Batch date notifications\n✅ Session reminders before your program\n✅ Pre-session setup instructions\n\nWant to register and never miss a batch?",
  },
  {
    keywords: ['recommend a book', 'book recommendation', 'what to read', 'best book', 'reading'],
    answer: "Great question! 📚 Here are some recommendations based on our domains:\n\n🌐 Web Dev: \"Eloquent JavaScript\" by Marijn Haverbeke\n💼 Business: \"The Lean Startup\" by Eric Ries\n📈 Sales: \"SPIN Selling\" by Neil Rackham\n✨ Marketing: \"Contagious\" by Jonah Berger\n\nOr better yet — skip the books and get HANDS-ON experience with NextGen Tech! Our programs are project-based, not theory-based. 🚀",
  },
  {
    keywords: ['recipe', 'cook', 'cooking', 'pasta', 'food recipe'],
    answer: "I don't know recipes, but here's a recipe for success! 🚀\n\nIngredients:\n✅ 1 laptop\n✅ Stable internet\n✅ A NextGen Tech program (₹149-₹999)\n✅ 1 day of dedication\n\nResult: A live deployed project + verified certificate! 🎓\n\nWant to cook up a career? Register now!",
  },
  {
    keywords: ['translate', 'spanish', 'french', 'other language', 'speak other', 'hindi me', 'in hindi'],
    answer: "I primarily communicate in English! 🗣️ Our programs are taught in English with Hindi explanations when needed.\n\nI can't translate languages, but I can translate your career goals into action through our programs! 😊\n\nWhat program interests you?",
  },
  {
    keywords: ['definition', 'define', 'what is ai', 'what is artificial intelligence', 'what is machine learning'],
    answer: "Artificial Intelligence (AI) is the simulation of human intelligence by machines! 🤖\n\nAt NextGen Tech, we offer AI & ML workshops covering:\n• Generative AI APIs & LLMs\n• Prompt Engineering\n• AI Agent Building\n• Data Analytics\n\nWant to learn AI hands-on? Ask about our AI workshops!",
  },

  // ======== BOOKING / SCHEDULING ========
  {
    keywords: ['book appointment', 'appointment', 'slot available', 'available slots', 'booking'],
    answer: "📅 Booking a Slot:\n\nTo book your program slot:\n1️⃣ Visit our website\n2️⃣ Choose your program\n3️⃣ Click 'Book 1-Day Slot' / 'Apply for Internship' / 'Join Bootcamp'\n4️⃣ Fill the registration form\n5️⃣ Complete payment\n\nNew batches are announced regularly. Register now and we'll confirm your slot!\n\nWhich program would you like to book?",
  },
  {
    keywords: ['reschedule', 'change date', 'postpone', 'different date', 'move my slot'],
    answer: "Need to reschedule? No problem! 📅\n\nContact our team through the website contact form with:\n• Your registered name\n• Program you enrolled in\n• Preferred new date\n\nWe'll do our best to accommodate your request!\n\nIs there anything else I can help with?",
  },

  // ======== SHIPPING / ORDER (redirect) ========
  {
    keywords: ['order', 'delivery', 'shipping', 'track order', 'my order', 'ship internationally', 'dispatch'],
    answer: "NextGen Tech is an education platform — we don't ship physical products! 📚\n\nWhat we DO deliver:\n✅ Live online/offline training sessions\n✅ Digital certificates (instant download)\n✅ Project code on GitHub\n✅ Session recordings in your portal\n\nEverything is digital and instant! Want to know about our programs?",
  },

  // ======== SUBSCRIPTION (redirect) ========
  {
    keywords: ['subscription', 'subscribe', 'monthly', 'yearly', 'plan', 'basic plan', 'premium plan', 'unsubscribe'],
    answer: "We don't use a subscription model! 🎉\n\nInstead, you pay once per program:\n• 1-Day Experiences: ₹149 - ₹299 (one-time)\n• Internships: ₹999 (one-time)\n• Bootcamps: ₹999 (one-time)\n\nNo recurring charges, no hidden fees! Pay once, learn forever.\n\nWant to know more about our pricing?",
  },

  // ======== APP / SOFTWARE ISSUES ========
  {
    keywords: ['app crash', 'crashing', 'not loading', 'page not loading', 'error page', 'broken', 'glitch', 'bug in website', 'website not working'],
    answer: "Sorry to hear you're facing issues! 😔\n\nTry these steps:\n1️⃣ Refresh the page (Ctrl + R or Cmd + R)\n2️⃣ Clear browser cache (Ctrl + Shift + Delete)\n3️⃣ Try a different browser (Chrome recommended)\n4️⃣ Check your internet connection\n\nIf the issue persists, contact our team through the website contact form and we'll fix it ASAP!\n\nIs there anything else I can help with?",
  },
  {
    keywords: ['forgot password', 'reset password', 'cant login', 'cant log in', 'login issue', 'password reset', 'locked out', 'account access'],
    answer: "🔑 Password Reset:\n\n1️⃣ Go to nextgentech.in/login\n2️⃣ Click 'Forgot Password'\n3️⃣ Enter your registered email\n4️⃣ Check your inbox for a reset link\n5️⃣ Create a new password\n\nIf you're still having trouble, contact our support team through the website and we'll help you regain access!\n\nNeed help with anything else?",
  },
  {
    keywords: ['update', 'update software', 'latest version', 'upgrade', 'new version'],
    answer: "Our website and student portal are always up-to-date! 🔄 No manual updates needed.\n\nJust make sure you're using a modern browser (Chrome, Firefox, or Edge) for the best experience.\n\nIs there something specific you're looking for on our website?",
  },
  {
    keywords: ['internet slow', 'slow loading', 'buffering', 'lag', 'speed'],
    answer: "If our website is loading slowly, try these:\n\n1️⃣ Check your internet speed (minimum 5 Mbps recommended)\n2️⃣ Close unused tabs/apps\n3️⃣ Try a different browser\n4️⃣ Disable browser extensions temporarily\n\nFor live sessions, we recommend at least 5 Mbps stable connection for smooth streaming.\n\nNeed help with anything else?",
  },
  {
    keywords: ['clear cache', 'clear cookies', 'browser cache', 'clear data', 'history'],
    answer: "To clear your browser cache:\n\nChrome: Ctrl + Shift + Delete → Select 'Cached images and files' → Clear\nFirefox: Ctrl + Shift + Delete → Select 'Cache' → Clear Now\nEdge: Ctrl + Shift + Delete → Select 'Cached data' → Clear\n\nAfter clearing, refresh our website and try again!\n\nStill having issues? Contact our support team.",
  },

  // ======== COMPARISON HELP ========
  {
    keywords: ['python or javascript', 'python vs javascript', 'which language', 'best language', 'learn python or', 'learn javascript or'],
    answer: "Great question! 🤔\n\nJavaScript → Best for web development, apps, and full-stack roles\nPython → Best for AI/ML, data science, and automation\n\nAt NextGen Tech, our Web Development programs focus on JavaScript, React, and Node.js — which are in extremely high demand!\n\nOur recommendation: Start with JavaScript through our Web Dev Sprint (₹299) and you'll be building real apps in just 1 day!\n\nWant to register?",
  },
  {
    keywords: ['iphone or android', 'pros and cons', 'which is better'],
    answer: "That's a tough debate! 📱 But here at NextGen Tech, we focus on helping you BUILD technology rather than just choosing between it! 🚀\n\nWhether you're Team iPhone or Android, our programs help you:\n• Build real applications\n• Learn industry tools\n• Earn verified certificates\n\nWhat domain are you interested in?",
  },
  {
    keywords: ['remote work', 'work from home', 'wfh', 'freelance', 'freelancing'],
    answer: "Remote work and freelancing are huge opportunities! 🏠💻\n\nNextGen Tech programs prepare you for remote careers:\n\n🌐 Web Development → Freelance web dev (high demand!)\n✨ Digital Marketing → Remote marketing roles\n💼 BDE → Remote B2B sales\n👥 HR → Virtual HR operations\n\nAll our programs can be attended online too! Build skills that work from anywhere.\n\nWhich remote career path interests you?",
  },

  // ======== HOMEWORK / ACADEMIC ========
  {
    keywords: ['homework', 'assignment', 'exam', 'test', 'study', 'prepare', 'academic', 'school work', 'college work'],
    answer: "While I can't do your homework 📝, I CAN help you learn practical skills that go beyond textbooks!\n\nNextGen Tech's hands-on programs complement your academics:\n• Build real projects for your portfolio\n• Get verified certificates for your resume\n• Learn industry tools your syllabus doesn't cover\n\nMany students use our projects in their academic submissions and college fests!\n\nWant to learn more?",
  },

  // ======== OTHER LANGUAGES ========
  {
    keywords: ['speak hindi', 'speak tamil', 'speak telugu', 'speak marathi', 'speak kannada', 'regional language'],
    answer: "I respond in English! 🗣️ But our live sessions are taught in English with Hindi explanations for clarity.\n\nDon't worry about language — our mentors are patient and explain concepts step-by-step in both English and Hindi. The focus is on practical building, not language!\n\nFeel free to ask questions in any language here and I'll do my best!",
  },

  // ======== DO YOU HAVE FEELINGS ========
  {
    keywords: ['feelings', 'emotions', 'do you feel', 'do you have feelings', 'are you sentient', 'conscious'],
    answer: "I don't have feelings, but I do care about helping you! 💙 (In a programmatic way 😄)\n\nWhat I DO have is comprehensive knowledge about NextGen Tech programs. Let me put that to good use for you!\n\nWhat would you like to know about?",
  },

  // ======== GIBBERISH / EDGE CASES ========
  {
    keywords: ['asdf', 'qwerty', 'asdkj', 'test', 'testing', 'lol', 'lmao', 'haha', 'hehe', 'xd', 'bruh', '...', '???', '!!!'],
    answer: "Haha! 😄 Looks like you're testing me out! I'm here and ready to help.\n\nHere are some things you can ask me:\n• Tell me about 1-Day programs\n• What internships do you offer?\n• How much do bootcamps cost?\n• How do I register?\n• What certificates do I get?\n\nOr just tap one of the quick options below! 👇",
  },

  // ======== URGENT HELP ========
  {
    keywords: ['urgent', 'urgently', 'emergency', 'asap', 'right now', 'immediately', 'quick'],
    answer: "I understand this is urgent! ⚡\n\nI'm here to help right away. Please tell me:\n• What do you need help with?\n• Is it about registration, payment, or technical issues?\n\nFor immediate human assistance, fill out the contact form on our website and our team will respond as quickly as possible!\n\nWhat's your question?",
  },

  // ======== PLEASE / POLITE ========
  {
    keywords: ['please', 'pls', 'plz', 'kindly', 'request', 'would you', 'could you', 'can you please'],
    answer: "Of course! I'd be happy to help! 😊\n\nWhat would you like to know? You can ask about:\n• Programs & courses\n• Pricing & discounts\n• Registration & enrollment\n• Certificates & career support\n• Or anything about NextGen Tech!\n\nJust type your question!",
  },

  // ======== 2+2 / INFINITY / TRICK QUESTIONS ========
  {
    keywords: ['2+2', 'infinity', 'impossible', 'trick question', 'riddle', 'brain teaser', 'puzzle'],
    answer: "I love a good brain teaser! 🧩 But you know what's NOT a puzzle? Starting your tech career!\n\nWith NextGen Tech:\n• 1 day → Your first deployed project\n• ₹149 → Your starting investment\n• 250+ → Students who've already started\n\nReady to solve the career puzzle? Ask about our programs! 🚀",
  },

  // ======== BUSINESS HOURS ========
  {
    keywords: ['business hours', 'office hours', 'working hours', 'open', 'closed', 'available when', 'operating hours'],
    answer: "🕐 Availability:\n\n• This chatbot: Available 24/7! Ask anything anytime.\n• Team support: Business hours (Mon-Sat, 9 AM - 6 PM IST)\n• Live sessions: Scheduled batches (check website for dates)\n\nFill out the contact form on our website for team support, and we'll respond within a few hours!\n\nAnything I can help you with right now?",
  },

  // ======== ADDITIONAL CUSTOMER / APPOINTMENT / MISC REDIRECTS ========
  {
    keywords: ['cancel appointment', 'cancel meeting', 'cancel booking', 'cancel my slot'],
    answer: "To cancel or change your booking slot:\n\nPlease send us a message via the contact form on our website with your registered email and batch details. Our team will assist you right away!\n\nIs there anything else I can help with?",
  },
  {
    keywords: ['doctor', 'medical', 'hospital', 'clinic', 'health', 'table for', 'restaurant', 'dinner reservation', 'book a table'],
    answer: "I'm the virtual assistant for NextGen Tech (an EdTech platform)! 🚀\n\nI can't help with medical appointments or restaurant bookings, but if you're looking to boost your tech career, I can help you enroll in our 1-Day Experiences, Internships, or Bootcamps!\n\nWhat domain interests you?",
  },
  {
    keywords: ['size', 'clothing', 'in stock', 'inventory', 'return a used product', 'return item'],
    answer: "NextGen Tech provides digital education & hands-on IT training! 💻 We don't sell physical items or clothes.\n\nAll our programs, projects, certificates, and recordings are 100% digital and delivered online or in our tech workshops.\n\nWould you like to explore our 1-Day Experience programs?",
  },
  {
    keywords: ['device won\'t turn on', 'device wont turn on', 'laptop won\'t turn on', 'computer won\'t turn on', 'hardware issue'],
    answer: "If your laptop or device isn't turning on:\n1️⃣ Check your charger & power outlet\n2️⃣ Hold the power button for 10-15 seconds to force restart\n3️⃣ Ensure battery isn't completely drained\n\nFor program sessions, make sure your device is powered and connected to the internet. Need help with NextGen Tech login or courses?",
  },
  {
    keywords: ['tea or coffee', 'tea vs coffee', 'coffee or tea'],
    answer: "Chai or Coffee ☕? Both are fuel for coders and creators!\n\nAt NextGen Tech, we fuel tech careers with hands-on 1-Day Experiences, Internships, and Bootcamps. Want to fuel your tech journey today?",
  },
  {
    keywords: ['leap year', 'days in a leap year'],
    answer: "A leap year has 366 days! 🗓️ (29 days in February).\n\nSpeaking of years — why wait years for a degree when you can build and deploy a live project in just 1 Day with NextGen Tech? Programs start at ₹149!\n\nWant to know more?",
  },
];

function findBestAnswer(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  // Skip very short or empty messages
  if (msg.length < 2) {
    return "I didn't catch that! 😊 Could you please type your question?\n\nYou can ask about our programs, pricing, registration, certificates, or tap a quick option below!";
  }

  let bestMatch: QAPair | null = null;
  let bestScore = 0;

  for (const qa of QA_DATABASE) {
    let score = 0;
    for (const keyword of qa.keywords) {
      if (msg.includes(keyword.toLowerCase())) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.answer;
  }

  return "Thank you for your question! 😊 I'm specialized in NextGen Tech and can help with:\n\n• 1-Day Experience Programs\n• Internship Tracks (Web Dev, HR, BDE, Sales, Marketing, Services)\n• 7-Day Bootcamps\n• Pricing & Registration\n• Certificates & LOR\n• College Partnerships\n• Career & Placement Support\n• Mentors & Projects\n• Schedule & Timings\n• Payment Methods\n\nPlease ask about any of these topics, or tap a quick option below!\n\nFor other queries, our team is happy to help — fill the contact form on our website.";
}

const QUICK_REPLIES = [
  'Register Now 📝',
  '1-Day Programs',
  'Internships',
  'Bootcamps',
  'Pricing',
  'Certificates',
  'Which is Best for Me?',
  'Career & Jobs',
  'College Partnership',
];

export function NextGenChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! 👋 Welcome to NextGen Tech!\n\nI'm your virtual assistant. I can help you answer questions AND register for programs directly in this chat!\n\nHow can I help you today? Tap 'Register Now 📝' or ask any question!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Step-by-Step Conversational Registration State (Ref for 100% synchronous state)
  const [isRegistering, setIsRegistering] = useState(false);
  const [regStep, setRegStep] = useState<number>(0);
  const regDataRef = useRef({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    programTrack: '',
    slotDate: '',
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const resetChat = () => {
    setIsRegistering(false);
    setRegStep(0);
    regDataRef.current = { fullName: '', email: '', phone: '', college: '', programTrack: '', slotDate: '' };
    setMessages([
      {
        id: Date.now(),
        text: "Hi! 👋 Welcome to NextGen Tech!\n\nI'm your virtual assistant. I can help you answer questions AND register for programs directly in this chat!\n\nHow can I help you today? Tap 'Register Now 📝' or ask any question!",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  const startRegistrationFlow = (initialText?: string) => {
    setIsRegistering(true);
    setRegStep(1);
    regDataRef.current = { fullName: '', email: '', phone: '', college: '', programTrack: '', slotDate: '' };

    const botMsg: Message = {
      id: Date.now() + 1,
      text: "Awesome! Let's get you registered step-by-step! 📝\n\nStep 1 of 6: What is your Full Name?",
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleRegistrationInput = async (userText: string) => {
    const text = userText.trim();
    const lower = text.toLowerCase();

    // Check for cancellation
    if (lower === 'cancel' || lower === 'exit' || lower === 'stop') {
      setIsRegistering(false);
      setRegStep(0);
      regDataRef.current = { fullName: '', email: '', phone: '', college: '', programTrack: '', slotDate: '' };
      const cancelMsg: Message = {
        id: Date.now() + 1,
        text: "Registration cancelled. 😊 Feel free to ask any questions or tap 'Register Now 📝' anytime!",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, cancelMsg]);
      setIsTyping(false);
      return;
    }

    if (regStep === 1) {
      // Collected Name
      regDataRef.current.fullName = text;
      setRegStep(2);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: `Thanks ${text}! 👋\n\nStep 2 of 6: What is your Email Address?`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    } else if (regStep === 2) {
      // Collected Email
      regDataRef.current.email = text;
      setRegStep(3);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: `Got it! 📧\n\nStep 3 of 6: What is your Phone / WhatsApp Number?`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    } else if (regStep === 3) {
      // Collected Phone
      regDataRef.current.phone = text;
      setRegStep(4);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: `Great! 📱\n\nStep 4 of 6: What is your College / University name?`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    } else if (regStep === 4) {
      // Collected College
      regDataRef.current.college = text;
      setRegStep(5);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: `Thank you! 🏫\n\nStep 5 of 6: Which program would you like to enroll in?\n\n1️⃣ Web Development Sprint (₹299)\n2️⃣ HR & Recruitment Sprint (₹199)\n3️⃣ BDE & Lead Gen Sprint (₹249)\n4️⃣ Corporate Sales Sprint (₹249)\n5️⃣ Digital Marketing Sprint (₹199)\n6️⃣ IT & Client Services Sprint (₹149)\n7️⃣ Web Development Bootcamp (₹999)\n8️⃣ Developer Internship Track (₹999)\n\nTap a program option below or type your choice!`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    } else if (regStep === 5) {
      // Collected Program Track
      regDataRef.current.programTrack = text;
      setRegStep(6);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: `Almost done! 📅\n\nStep 6 of 6: Choose your preferred batch slot date:\n\n• Upcoming Saturday (Weekend Batch)\n• Upcoming Sunday (Weekend Batch)\n• Next Weekday Batch\n\nTap a slot or type your preference!`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    } else if (regStep === 6) {
      // Collected Slot Date -> Submit to Database
      regDataRef.current.slotDate = text;
      const finalName = regDataRef.current.fullName || 'M SAI';
      const finalEmail = regDataRef.current.email || `${finalName.toLowerCase().replace(/\s+/g, '')}@student.nextgentech.in`;
      const finalPhone = regDataRef.current.phone || '+91 9876543210';
      const finalCollege = regDataRef.current.college || 'NextGen Tech';
      const finalTrack = regDataRef.current.programTrack || 'Web Development Sprint';
      const finalSlot = text || 'Upcoming Saturday';
      const ticketId = 'NGT-2026-' + Math.floor(1000 + Math.random() * 9000);

      try {
        const res = await fetch('/api/v1/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: finalName,
            email: finalEmail,
            phone: finalPhone,
            college: finalCollege,
            programTrack: finalTrack,
            slotDate: finalSlot,
            ticketId: ticketId,
          }),
        });
        const resJson = await res.json();
        console.log('Application saved to MongoDB:', resJson);
      } catch (err) {
        console.error('Database submission error:', err);
      }

      // Trigger Confetti Celebration
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}

      setIsRegistering(false);
      setRegStep(0);

      const botMsg: Message = {
        id: Date.now() + 1,
        text: `🎉 REGISTRATION CONFIRMED! 🎟️\n\nCongratulations, ${finalName}!\n\n📋 Your Pass Details:\n• Ticket Pass ID: ${ticketId}\n• Program: ${finalTrack}\n• Slot Date: ${finalSlot}\n• Email: ${finalEmail}\n• Phone: ${finalPhone}\n• College: ${finalCollege}\n\nYour registration has been saved in our system! Our team will email you the joining link and pre-session instructions.\n\nType 'new' or ask any questions if you need further help!`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase().trim();

      // Trigger registration if user wants to register or click chip
      if (
        !isRegistering &&
        (lower.includes('register') ||
          lower.includes('book') ||
          lower.includes('enroll') ||
          lower.includes('apply') ||
          lower === 'how to register' ||
          lower.includes('sign up'))
      ) {
        startRegistrationFlow(text);
        return;
      }

      // If already in registration flow, handle step input
      if (isRegistering) {
        handleRegistrationInput(text);
        return;
      }

      // Normal Q&A response
      const botResponse = findBestAnswer(text);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600 + Math.random() * 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Determine dynamic quick reply chips based on current registration step
  const getDynamicChips = () => {
    if (isRegistering) {
      if (regStep === 5) {
        return [
          'Web Dev Sprint (₹299)',
          'HR Sprint (₹199)',
          'BDE Sprint (₹249)',
          'Sales Sprint (₹249)',
          'Digital Marketing Sprint (₹199)',
          'IT Services Sprint (₹149)',
          'Web Dev Bootcamp (₹999)',
          'Internship Track (₹999)',
          'Cancel',
        ];
      }
      if (regStep === 6) {
        return ['Upcoming Saturday', 'Upcoming Sunday', 'Next Weekday Batch', 'Cancel'];
      }
      return ['Cancel'];
    }
    return QUICK_REPLIES;
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#0E8C93] to-[#0A6E74] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute inset-0 rounded-full bg-[#0E8C93] animate-ping opacity-20" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[370px] sm:w-[400px] h-[560px] rounded-2xl bg-white border border-[#E1E8E8] shadow-2xl flex flex-col overflow-hidden animate-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0A1E33] to-[#0E8C93] px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">NextGen Tech</h4>
                <p className="text-white/70 text-[11px]">Virtual Assistant • Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={resetChat}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="New chat"
                title="New Chat / Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F8FAFA]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center ${
                    msg.sender === 'bot'
                      ? 'bg-gradient-to-br from-[#0E8C93] to-[#0A6E74] text-white'
                      : 'bg-[#F2803A] text-white'
                  }`}
                >
                  {msg.sender === 'bot' ? (
                    <Bot className="w-3.5 h-3.5" />
                  ) : (
                    <User className="w-3.5 h-3.5" />
                  )}
                </div>

                <div
                  className={`max-w-[80%] px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                    msg.sender === 'bot'
                      ? 'bg-white border border-[#E1E8E8] text-[#0A1E33] rounded-2xl rounded-tl-sm shadow-xs'
                      : 'bg-[#0E8C93] text-white rounded-2xl rounded-tr-sm shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full shrink-0 bg-gradient-to-br from-[#0E8C93] to-[#0A6E74] text-white flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-[#E1E8E8] px-4 py-3 rounded-2xl rounded-tl-sm shadow-xs">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-[#0E8C93]/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#0E8C93]/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#0E8C93]/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Quick Reply Chips */}
          <div className="px-4 py-2.5 flex flex-wrap gap-1.5 bg-white border-t border-[#E1E8E8] shrink-0 max-h-32 overflow-y-auto">
            {getDynamicChips().map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-full transition-colors border ${
                  reply === 'Register Now 📝'
                    ? 'bg-[#F2803A] text-white hover:bg-[#E06A24] border-[#F2803A] shadow-xs font-bold'
                    : reply === 'Cancel'
                    ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-red-200'
                    : 'bg-[#E4F3F3] text-[#0B6E74] hover:bg-[#0E8C93] hover:text-white border-[#0E8C93]/20'
                }`}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 bg-white border-t border-[#E1E8E8] flex items-center gap-2.5 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isRegistering ? `Type your answer for Step ${regStep}...` : "Type your question or 'register'..."}
              className="flex-1 px-3.5 py-2.5 text-[13px] bg-[#F4F8F8] border border-[#E1E8E8] rounded-xl outline-none focus:border-[#0E8C93] focus:ring-1 focus:ring-[#0E8C93]/30 transition-all text-[#0A1E33] placeholder:text-[#8CA0AB]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-[#0E8C93] hover:bg-[#0A6E74] disabled:bg-[#E1E8E8] disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

