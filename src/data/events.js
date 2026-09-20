// All E-Summit DCRUST'26 events. Content sourced from the official proposal
// and events-overview documents. Venues intentionally read "To be announced".

export const SUMMIT = {
  name: "E-Summit DCRUST'26",
  theme: 'Entrepreneurs for Viksit Bharat',
  dates: '28 – 29 September 2026',
  campus: 'DCRUST University Campus, Murthal (Sonepat)',
  organisers: 'E-Cell DCRUST × Incubation Center DCRUST',
  registration: 'Free to attend and open to students across INDIA',
}

export const events = [
  {
    id: 'advertising-competition',
    title: 'Advertising Competition',
    tagline: 'Creativity meets marketing strategy',
    type: 'competition',
    day: 'Day 1',
    date: '28 Sep 2026',
    time: '11:30 AM – 1:30 PM',
    venue: 'To be announced',
    icon: 'megaphone',
    accent: '#ff7a1a',
    prizes: ['₹3,100', '₹2,100', '₹1,100'],
    eventType: 'Team',
    teamSize: '1–4 participants',
    format: 'Completely Offline',
    short:
      'Get an assigned product/idea via a chit and build an ad around it — then sell it to the judges. Understand → Create → Advertise → Sell.',
    long: [
      'Each team receives an assigned idea, product, service or concept through a chit/brief from the organizers — different teams may get different concepts. Your task is to build an advertisement around it and sell it to the judges.',
      'This is not merely a graphic-design competition. You are expected to show market understanding, advertising strategy, creativity, execution and persuasive selling ability. Judges evaluate how effectively you market the assigned concept — not the inherent popularity of the concept itself.',
      'The central challenge is: UNDERSTAND → CREATE → ADVERTISE → SELL. Preparation time and working resources are provided by the organizers at the venue.',
    ],
    highlights: ['Team of 1–4', 'Completely offline', 'Assigned concept (chit)', 'Understand → Create → Advertise → Sell'],
    rules: [
      'Each team is assigned a product/idea/service/concept via a chit; concepts may differ between teams.',
      'Build an advertising approach that communicates its value and convinces judges to buy/adopt/support it.',
      'Preparation time is provided as decided by the organizers.',
      'Teams work under the conditions and resources provided at the venue.',
      'The advertisement must function as a genuine sales effort — show audience understanding, positioning and persuasion.',
    ],
    evaluation: [
      { criterion: 'Market Understanding', weight: 30, detail: 'Target market, customer needs, positioning, relevance of the approach' },
      { criterion: 'Overall Pitch', weight: 30, detail: 'Persuasiveness, clarity, confidence, ability to convince the judges' },
      { criterion: 'Execution', weight: 25, detail: 'Turning the concept into a delivery — performance, coordination, effectiveness' },
      { criterion: 'Creativity', weight: 15, detail: 'Originality, novelty and memorability of the advertisement' },
    ],
  },
  {
    id: 'startup-supply',
    title: 'Startup Supply',
    tagline: 'A knockout negotiation simulation',
    type: 'competition',
    day: 'Day 1',
    date: '28 Sep 2026',
    time: '11:30 AM – 4:30 PM',
    venue: 'To be announced',
    icon: 'handshake',
    accent: '#a855f7',
    prizes: ['₹3,100', '₹2,100', '₹1,100'],
    eventType: 'Negotiation',
    teamSize: '1 Startup vs 1 Supplier per round',
    format: 'Offline',
    short:
      'A head-to-head negotiation: Startup vs Supplier, each with a secret price chit. Reach a mutually agreed price — or both are out.',
    long: [
      'Startup Supply is, at its core, a negotiation competition. Each round pairs a Startup against a Supplier, and each participant receives a chit with a private monetary limit — the only hidden information in the round.',
      'Negotiate privately using offers, counteroffers, persuasion and strategy; you may reveal or withhold your chit value. If progress stalls, a private discussion period of up to 2 minutes may be granted where both sides can talk and, if they wish, reveal their values.',
      'A deal succeeds only when both sides agree on one common final price. If no agreement is reached, both participants are eliminated from that round. If the final price lands exactly halfway between both positions, the tie goes to whoever proposed that exact price first.',
    ],
    highlights: ['Startup vs Supplier', 'Secret price chit', 'Reach a common price', 'No deal = both out'],
    rules: [
      'Each participant gets a chit with a private price/monetary limit — the only secret in the round.',
      'Negotiate with offers, counteroffers, persuasion and strategy; revealing your chit is optional.',
      'A private discussion period of up to 2 minutes may be granted if talks stall.',
      'A deal is valid only when both sides agree on one common final price.',
      'If no agreement is reached, both participants are eliminated from that round.',
      'Exact-midpoint tie-break: whoever first proposed that exact final price wins.',
    ],
  },
  {
    id: 'pitching-competition',
    title: 'Pitching Competition',
    tagline: 'The centerpiece — pitch your startup',
    type: 'competition',
    day: 'Day 2',
    date: '29 Sep 2026',
    time: '10:00 AM – 1:00 PM',
    venue: 'To be announced',
    icon: 'rocket',
    accent: '#ff2fa4',
    prizes: ['₹3,100', '₹2,100', '₹1,100'],
    featured: true,
    // Pitching needs startup-specific details beyond the base form.
    extraFields: [
      { name: 'startupName', label: 'Startup / Business Name', type: 'text', placeholder: 'e.g. NovaPay', full: true },
      { name: 'businessIdea', label: 'Business Idea (one-liner)', type: 'textarea', placeholder: 'Describe your idea in a sentence or two', full: true },
      { name: 'sector', label: 'Sector / Category', type: 'text', placeholder: 'e.g. Fintech, HealthTech, D2C' },
      { name: 'teamSize', label: 'Team Size', type: 'select', placeholder: 'Select team size', options: ['Solo', '2 members', '3 members', '4 members', '5+ members'] },
      { name: 'pitchVideo', label: 'Pitch Video — Google Drive link (max 5 min)', type: 'url', placeholder: 'https://drive.google.com/…', full: true },
    ],
    eventType: 'Team',
    format: 'Round 1 online video · Final round offline at DCRUST',
    short:
      'Two rounds: submit a 5-minute pitch video (Round 1), then selected teams pitch live at DCRUST. Existing startups or new ideas welcome.',
    long: [
      'Round 1 is an online submission — upload a 5-minute pitch video via the Google Drive link in this form, clearly presenting your startup or business idea.',
      'Selected teams (approximately 20–25) advance to the physical final round at DCRUST for a live pitch. You may present an existing startup or a brand-new idea, and a working prototype is not mandatory.',
      'You may use AI while preparing, but you remain responsible for the originality of your work, the accuracy of your information, your understanding of your business and the quality of your final presentation.',
    ],
    highlights: ['Round 1: 5-min video', 'Final: live at DCRUST', '~20–25 finalists', 'Prototype optional'],
    rules: [
      'Round 1: submit a 5-minute pitch video via the Google Drive link in this form.',
      'Final round: selected teams (~20–25) pitch live at DCRUST.',
      'Present an existing startup or a new idea — a prototype is not required.',
      'AI may be used in preparation, but originality and accuracy remain your responsibility.',
    ],
    evaluation: [
      { criterion: 'Feasibility & Scalability', weight: 25, detail: 'Practical feasibility, resources, execution and expansion potential' },
      { criterion: 'Market Potential', weight: 20, detail: 'Target market, demand, growth and commercial potential' },
      { criterion: 'Business Model', weight: 15, detail: 'Revenue model, value creation, commercial logic, sustainability' },
      { criterion: 'Originality', weight: 15, detail: 'Novelty, differentiation and original thinking' },
      { criterion: 'Problem Clarity & Solution', weight: 10, detail: 'Clarity/importance of the problem and effectiveness of the solution' },
      { criterion: 'Q&A', weight: 10, detail: 'Understanding of the business, defending the proposal, confidence' },
      { criterion: 'Social Cause Bonus', weight: 5, detail: 'Genuine, meaningful social or environmental impact' },
    ],
  },
  {
    id: 'corporate-stocks',
    title: 'Corporate Stocks',
    tagline: 'Live simulated stock-market showdown',
    type: 'competition',
    day: 'Day 2',
    date: '29 Sep 2026',
    time: '9:00 AM – 3:00 PM',
    venue: 'To be announced',
    icon: 'chart',
    accent: '#22d3ee',
    prizes: ['₹3,100', '₹2,100', '₹1,100'],
    eventType: 'Individual',
    format: 'Remote / Online',
    short:
      'A live online stock-market simulation (no real money). Trade until the market closes at 3:00 PM — highest final profit wins.',
    long: [
      'Corporate Stocks is a live online stock-market simulation run through an online trading-simulation platform. All trading is simulated — there is no real-money investment at any point.',
      'The market stays open until 3:00 PM and you may trade as often as you like — buying, selling, short-selling and any other mechanisms the platform allows. Since it runs remotely, you are free to use online information and resources; no artificial internet restrictions apply.',
      'The participant with the highest final profit recorded at the 3:00 PM close is ranked first — profit is the sole decisive criterion. If two participants tie on profit, whoever holds positions in fewer companies ranks higher. The exact platform will be shared by the organizers before the event.',
    ],
    highlights: ['Individual', 'Online / remote', 'Market closes 3:00 PM', 'Highest profit wins'],
    rules: [
      'Simulated trading only — no real money is involved.',
      'Market stays open until 3:00 PM; trade as many times as you like.',
      'Buying, selling, short-selling and other platform mechanisms are allowed.',
      'Online information and internet use are permitted (remote event).',
      'Winner: highest final profit at the 3:00 PM close.',
      'Tie-break: the participant holding positions in fewer companies ranks higher.',
      'The stock-simulation platform will be announced by the organizers before the event.',
    ],
  },
  {
    id: 'turn-the-court',
    title: 'Turn the COAT',
    tagline: 'Argue both sides — debate reimagined',
    type: 'competition',
    day: 'Day 2',
    date: '29 Sep 2026',
    time: '10:30 AM – 1:00 PM',
    venue: 'To be announced',
    icon: 'scale',
    accent: '#22d3ee',
    prizes: ['₹3,100', '₹2,100', '₹1,100'],
    eventType: 'Individual',
    format: 'Offline',
    short:
      'Argue one side of a topic, then flip to the opposite side on the judges’ buzzer. Topic revealed at the venue — no notes.',
    long: [
      'Turn the COAT tests your ability to argue both sides of an assigned topic. The defining challenge is personally switching your position and reasoning mid-competition.',
      'The topic is provided at the venue — not beforehand — and no notes or external resources are allowed during your performance. You argue one side, and when the judges press the buzzer you must instantly switch to the opposing side and keep going.',
      'The judges control when, how often and how fast you switch. Refusing or failing to switch when instructed can get you removed, and running out of meaningful arguments or stopping early can cost you marks.',
    ],
    highlights: ['Individual', 'Argue both sides', 'Buzzer = switch', 'Topic at venue · no notes'],
    rules: [
      'The topic is revealed at the venue — not shared beforehand.',
      'Argue one side, then the opposing side of the same topic.',
      'A buzzer signals when to switch; judges control timing and frequency.',
      'No notes or external resources during your performance.',
      'Failing to switch when instructed may lead to removal; stopping early may lose marks.',
    ],
    evaluation: [
      { criterion: 'Personal / Position Switching', weight: 50, detail: 'Switching sides, adapting reasoning, performing under changing instructions' },
      { criterion: 'Creativity', weight: 25, detail: 'Originality of arguments and creative reasoning' },
      { criterion: 'Effective Communication', weight: 25, detail: 'Clarity, confidence, persuasiveness and delivery' },
    ],
  },
  {
    id: 'panel-discussions',
    title: 'Panel Discussions I & II',
    tagline: 'Founders, entrepreneurs & industry voices',
    type: 'info',
    day: 'Day 1 & Day 2',
    date: '28–29 Sep 2026',
    time: 'Day 1 · 11:30 AM – 1:30 PM · Day 2 · 10:30 AM – 12:30 PM',
    venue: 'To be announced',
    icon: 'mic',
    accent: '#a855f7',
    short:
      'Two sessions with founders and industry professionals on entrepreneurship, startup building, innovation and opportunities for young founders.',
    long: [
      'Running alongside the competitions, Panel Discussion I brings together individuals from startups, entrepreneurship and related business backgrounds for a conversation on entrepreneurship, startup building, innovation and the opportunities open to young founders today.',
      'Panel Discussion II on Day 2 continues the conversation with a fresh set of perspectives from the startup and entrepreneurship community, positioned to complement rather than repeat the first session.',
      'Both sessions give participants — whether between events or simply there to listen and learn — a chance to hear directly from people building in the startup ecosystem.',
    ],
    highlights: ['Two sessions', 'Founder insights', 'Open to all', 'Day 1 & Day 2'],
  },
  {
    id: 'cultural-evening',
    title: 'Cultural Evening',
    tagline: 'Unwind with campus culture',
    type: 'info',
    day: 'Day 1',
    date: '28 Sep 2026',
    time: '4:30 PM – 6:00 PM',
    venue: 'To be announced',
    icon: 'music',
    accent: '#ff7a1a',
    short:
      'Day 1 closes with performances by student societies and university groups — a chance to socialise and experience DCRUST’s campus culture.',
    long: [
      'Day 1 closes on a lighter note with a cultural evening featuring performances from students and university societies.',
      'It gives participants a chance to unwind, socialise and experience DCRUST’s campus culture before the second day of competition.',
    ],
    highlights: ['Student societies', 'Live performances', 'Networking', 'Open to all'],
  },
  {
    id: 'closing-ceremony',
    title: 'Prize Distribution & Closing',
    tagline: 'Winners crowned, summit sealed',
    type: 'info',
    day: 'Day 2',
    date: '29 Sep 2026',
    time: '3:00 PM – 4:30 PM',
    venue: 'To be announced',
    icon: 'trophy',
    accent: '#ff2fa4',
    short:
      'The summit concludes with the prize distribution ceremony recognising winners across all five competitions, followed by closing remarks.',
    long: [
      'E-Summit DCRUST’26 concludes with the prize distribution ceremony, where winners across all five competitive events are recognised.',
      'Closing remarks bring the two-day summit to a formal close in the University / Main Auditorium.',
    ],
    highlights: ['Five events awarded', 'Total ₹31,000+ pool', 'Closing remarks', 'Main Auditorium'],
  },
]

// ---- Per-event registration form field definitions ----
const BRANCH = {
  name: 'branch', label: 'Branch', type: 'select', placeholder: 'Select branch',
  options: ['CSE', 'IT', 'ECE', 'Electrical', 'Mechanical', 'Civil', 'Biotechnology', 'Chemical', 'Other'],
}
const YEAR = {
  name: 'year', label: 'Year', type: 'select', placeholder: 'Select year',
  options: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
}
const COLLEGE = { name: 'college', label: 'College Name', type: 'text', placeholder: 'e.g. DCRUST, Murthal', full: true }
const COURSE = { name: 'course', label: 'Course', type: 'text', placeholder: 'e.g. B.Tech CSE, MBA, BBA' }

// Standard individual form (Corporate Stocks, Turn the COAT)
const individualForm = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. Aarav Sharma' },
  { name: 'rollNo', label: 'Roll Number', type: 'text', placeholder: 'e.g. 21001234' },
  COLLEGE, COURSE, BRANCH, YEAR,
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '10-digit mobile' },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
]

// Team form base (Advertising, Startup Supply, Pitching)
const teamBase = [
  { name: 'teamName', label: 'Team Name', type: 'text', placeholder: 'Your team name' },
  { name: 'leaderName', label: 'Team Leader Name', type: 'text', placeholder: 'e.g. Aarav Sharma' },
  COLLEGE, COURSE, BRANCH, YEAR,
  { name: 'phone', label: 'Leader Phone Number', type: 'tel', placeholder: '10-digit mobile' },
  { name: 'email', label: 'Leader Email Address', type: 'email', placeholder: 'leader@example.com' },
]
const membersField = (max) => ({
  name: 'members', label: 'Number of Members', type: 'select', placeholder: 'Select number of members',
  options: Array.from({ length: max }, (_, i) => String(i + 1)),
})
const teamForm = (max) => [...teamBase, membersField(max)]

const FORMS = {
  'corporate-stocks': individualForm,
  'turn-the-court': individualForm,
  'advertising-competition': teamForm(4),
  'startup-supply': teamForm(2),
  'pitching-competition': teamBase, // startup details are in extraFields
}
events.forEach((e) => {
  if (FORMS[e.id]) e.form = FORMS[e.id]
})

export const getEvent = (id) => events.find((e) => e.id === id)

// Tentative programme schedule (from the official brochure).
export const schedule = {
  'Day 1 · 28 Sep 2026': [
    { time: '09:00 – 11:30 AM', activity: 'Inauguration / Opening Ceremony' },
    { time: '11:30 AM – 1:30 PM', activity: 'Advertising Competition' },
    { time: '11:30 AM – 1:30 PM', activity: 'Panel Discussion I' },
    { time: '11:30 AM – 4:30 PM', activity: 'Startup Supply' },
    { time: '04:30 – 6:00 PM', activity: 'Cultural Evening' },
  ],
  'Day 2 · 29 Sep 2026': [
    { time: '09:30 – 10:00 AM', activity: 'Reporting & Morning Briefing' },
    { time: '10:00 AM – 1:00 PM', activity: 'Pitching Competition' },
    { time: '09:00 AM – 3:00 PM', activity: 'Corporate Stocks (parallel)' },
    { time: '10:30 AM – 12:30 PM', activity: 'Panel Discussion II' },
    { time: '10:30 AM – 1:00 PM', activity: 'Turn the COAT' },
    { time: '03:00 – 4:30 PM', activity: 'Prize Distribution & Closing' },
  ],
}
