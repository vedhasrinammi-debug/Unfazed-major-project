const bcrypt = require('bcryptjs');

const getHashedPassword = (pw) => {
  return bcrypt.hashSync(pw, 10);
};

const defaultTherapistId = '6620f4c01234567890abcdef';

const therapist = {
  _id: defaultTherapistId,
  name: 'Dr. Sarah Mitchell, Psy.D.',
  email: 'sarah.mitchell@unfazed.health',
  password: getHashedPassword('Password123!'),
  role: 'therapist',
  specialization: 'Cognitive Behavioral Therapy (CBT), Trauma & Anxiety',
  licenseNumber: 'PSY-NY-849201',
  practiceName: 'Mindful Horizons Clinical Psychology',
  phone: '+1 (555) 234-5678',
  bio: 'Licensed Clinical Psychologist with 12+ years of clinical experience specializing in CBT, stress reduction, and evidence-based psychotherapy.',
  avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
  subscription: {
    plan: 'Pro',
    status: 'active',
    billingCycle: 'monthly',
    renewsAt: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString()
  },
  settings: {
    emailNotifications: true,
    appointmentReminders: true,
    sessionBufferMinutes: 15,
    currency: 'USD',
    defaultSessionFee: 150
  },
  createdAt: new Date('2024-01-15T09:00:00Z')
};

const clients = [
  {
    _id: '6620f4c11234567890000001',
    therapistId: defaultTherapistId,
    name: 'Elena Vance',
    email: 'elena.vance@example.com',
    phone: '+1 (555) 782-9012',
    dateOfBirth: '1996-04-12',
    gender: 'Female',
    status: 'Active',
    primaryDiagnosis: 'Generalized Anxiety Disorder (GAD)',
    secondaryDiagnosis: 'Workplace Burnout',
    tags: ['CBT', 'Anxiety', 'Weekly'],
    intakeDate: '2024-02-10',
    emergencyContact: {
      name: 'Thomas Vance',
      relationship: 'Spouse',
      phone: '+1 (555) 782-9099'
    },
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BCBS-89302194',
      copay: 30
    },
    preferredSessionType: 'Video session',
    treatmentGoals: [
      'Reduce acute panic symptoms using 5-4-3-2-1 grounding techniques',
      'Establish workplace boundaries to mitigate emotional exhaustion',
      'Challenge catastrophic thinking patterns regarding performance evaluations'
    ],
    notesCount: 8,
    sessionsCompleted: 8,
    totalBilled: 1200,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date('2024-02-10T10:00:00Z')
  },
  {
    _id: '6620f4c11234567890000002',
    therapistId: defaultTherapistId,
    name: 'Marcus Thorne',
    email: 'marcus.thorne@example.com',
    phone: '+1 (555) 431-8921',
    dateOfBirth: '1989-11-23',
    gender: 'Male',
    status: 'Active',
    primaryDiagnosis: 'Major Depressive Disorder (Mild, Recurrent)',
    secondaryDiagnosis: 'Insomnia Disorder',
    tags: ['Depression', 'Behavioral Activation', 'Bi-Weekly'],
    intakeDate: '2024-01-22',
    emergencyContact: {
      name: 'Claire Thorne',
      relationship: 'Sister',
      phone: '+1 (555) 431-8990'
    },
    insurance: {
      provider: 'Aetna Health',
      policyNumber: 'AET-49102831',
      copay: 25
    },
    preferredSessionType: 'In-person',
    treatmentGoals: [
      'Increase weekly physical activity and scheduled social engagements',
      'Develop structured sleep hygiene protocol',
      'Identify and reframe persistent feelings of worthlessness'
    ],
    notesCount: 6,
    sessionsCompleted: 6,
    totalBilled: 900,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date('2024-01-22T14:30:00Z')
  },
  {
    _id: '6620f4c11234567890000003',
    therapistId: defaultTherapistId,
    name: 'Chloe Patel',
    email: 'chloe.patel@example.com',
    phone: '+1 (555) 902-3481',
    dateOfBirth: '1999-08-04',
    gender: 'Female',
    status: 'Active',
    primaryDiagnosis: 'Social Anxiety Disorder',
    secondaryDiagnosis: '',
    tags: ['Exposure Therapy', 'Young Adult', 'Weekly'],
    intakeDate: '2024-03-01',
    emergencyContact: {
      name: 'Anil Patel',
      relationship: 'Father',
      phone: '+1 (555) 902-3400'
    },
    insurance: {
      provider: 'Self-Pay / Superbill',
      policyNumber: 'N/A',
      copay: 0
    },
    preferredSessionType: 'Video session',
    treatmentGoals: [
      'Engage in graduated exposure hierarchy for public speaking in meetings',
      'Decrease post-event ruminative analysis',
      'Practice assertive communication strategies with peers'
    ],
    notesCount: 5,
    sessionsCompleted: 5,
    totalBilled: 750,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date('2024-03-01T11:15:00Z')
  },
  {
    _id: '6620f4c11234567890000004',
    therapistId: defaultTherapistId,
    name: 'David Kim',
    email: 'david.kim@example.com',
    phone: '+1 (555) 674-1234',
    dateOfBirth: '1982-03-19',
    gender: 'Male',
    status: 'Active',
    primaryDiagnosis: 'Adjustment Disorder with Depressed Mood',
    secondaryDiagnosis: 'Grief & Bereavement',
    tags: ['Grief Counseling', 'Monthly'],
    intakeDate: '2023-11-14',
    emergencyContact: {
      name: 'Grace Kim',
      relationship: 'Spouse',
      phone: '+1 (555) 674-9988'
    },
    insurance: {
      provider: 'UnitedHealthcare',
      policyNumber: 'UHC-10928340',
      copay: 40
    },
    preferredSessionType: 'In-person',
    treatmentGoals: [
      'Process unresolved grief related to parental loss',
      'Build sustainable emotional coping mechanisms during anniversary dates',
      'Strengthen marital communication through active emotional disclosure'
    ],
    notesCount: 11,
    sessionsCompleted: 11,
    totalBilled: 1650,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date('2023-11-14T16:00:00Z')
  },
  {
    _id: '6620f4c11234567890000005',
    therapistId: defaultTherapistId,
    name: 'Sophia Rossi',
    email: 'sophia.rossi@example.com',
    phone: '+1 (555) 321-7654',
    dateOfBirth: '1993-07-29',
    gender: 'Female',
    status: 'Active',
    primaryDiagnosis: 'Panic Disorder with Mild Agoraphobia',
    secondaryDiagnosis: 'Health Anxiety',
    tags: ['Panic', 'Interoceptive Exposure', 'Weekly'],
    intakeDate: '2024-02-18',
    emergencyContact: {
      name: 'Marco Rossi',
      relationship: 'Brother',
      phone: '+1 (555) 321-0000'
    },
    insurance: {
      provider: 'Cigna Health',
      policyNumber: 'CIG-90482910',
      copay: 35
    },
    preferredSessionType: 'Video session',
    treatmentGoals: [
      'De-escalate panic loop through somatic tracking and diaphragmatic breathing',
      'Desensitize fear of physical heart palpitations during exercise',
      'Expand comfort perimeter for independent transit and shopping'
    ],
    notesCount: 7,
    sessionsCompleted: 7,
    totalBilled: 1050,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date('2024-02-18T09:30:00Z')
  },
  {
    _id: '6620f4c11234567890000006',
    therapistId: defaultTherapistId,
    name: 'James Henderson',
    email: 'james.h@example.com',
    phone: '+1 (555) 881-2390',
    dateOfBirth: '1976-12-05',
    gender: 'Male',
    status: 'On-Hold',
    primaryDiagnosis: 'Chronic Stress & Executive Burnout',
    secondaryDiagnosis: '',
    tags: ['Executive Coaching', 'Stress', 'On-Hold'],
    intakeDate: '2023-09-10',
    emergencyContact: {
      name: 'Linda Henderson',
      relationship: 'Spouse',
      phone: '+1 (555) 881-9999'
    },
    insurance: {
      provider: 'Self-Pay / Corporate Stipend',
      policyNumber: 'N/A',
      copay: 0
    },
    preferredSessionType: 'Phone check-in',
    treatmentGoals: [
      'Maintain work-life boundaries post sabbatical',
      'Prevent relapse into 70+ hour work weeks'
    ],
    notesCount: 9,
    sessionsCompleted: 9,
    totalBilled: 1350,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date('2023-09-10T15:00:00Z')
  },
  {
    _id: '6620f4c11234567890000007',
    therapistId: defaultTherapistId,
    name: 'Maya Lin',
    email: 'maya.lin@example.com',
    phone: '+1 (555) 765-4321',
    dateOfBirth: '1995-10-14',
    gender: 'Female',
    status: 'Completed',
    primaryDiagnosis: 'Relationship Transition & Separation Adjustment',
    secondaryDiagnosis: '',
    tags: ['Completed', 'CBT', 'Maintenance'],
    intakeDate: '2023-05-12',
    emergencyContact: {
      name: 'Kevin Lin',
      relationship: 'Brother',
      phone: '+1 (555) 765-8888'
    },
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BCBS-11223344',
      copay: 30
    },
    preferredSessionType: 'Video session',
    treatmentGoals: [
      'Achieve emotional closure and establish independent living routine (Achieved)',
      'Develop adaptive dating standards based on core values (Achieved)'
    ],
    notesCount: 16,
    sessionsCompleted: 16,
    totalBilled: 2400,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date('2023-05-12T13:00:00Z')
  }
];

// Helper to format dynamic dates relative to today
const getRelativeDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const appointments = [
  {
    _id: '6620f4c21234567890000001',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000001',
    clientName: 'Elena Vance',
    date: getRelativeDate(0), // Today!
    startTime: '02:00 PM',
    endTime: '02:50 PM',
    durationMinutes: 50,
    type: 'Video session',
    status: 'Scheduled',
    locationOrRoom: 'UNFAZED Telehealth Room A-1',
    meetingLink: 'https://telehealth.unfazed.health/room/dr-sarah-m-elena-vance',
    sessionFee: 150,
    paymentStatus: 'Paid',
    notesCompleted: false,
    clientGoalsSummary: 'Review week 4 panic log and practice 4-7-8 regulation'
  },
  {
    _id: '6620f4c21234567890000002',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000002',
    clientName: 'Marcus Thorne',
    date: getRelativeDate(0), // Today!
    startTime: '04:00 PM',
    endTime: '04:50 PM',
    durationMinutes: 50,
    type: 'In-person',
    status: 'Scheduled',
    locationOrRoom: 'Suite 402 - Consultation Room 2',
    meetingLink: '',
    sessionFee: 150,
    paymentStatus: 'Pending',
    notesCompleted: false,
    clientGoalsSummary: 'Behavioral activation schedule check & morning routine setup'
  },
  {
    _id: '6620f4c21234567890000003',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000003',
    clientName: 'Chloe Patel',
    date: getRelativeDate(1), // Tomorrow
    startTime: '10:00 AM',
    endTime: '10:50 AM',
    durationMinutes: 50,
    type: 'Video session',
    status: 'Scheduled',
    locationOrRoom: 'UNFAZED Telehealth Room B-2',
    meetingLink: 'https://telehealth.unfazed.health/room/dr-sarah-m-chloe-patel',
    sessionFee: 150,
    paymentStatus: 'Paid',
    notesCompleted: false,
    clientGoalsSummary: 'Debrief presentation exposure exercise & somatic tension scan'
  },
  {
    _id: '6620f4c21234567890000004',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000004',
    clientName: 'David Kim',
    date: getRelativeDate(2),
    startTime: '11:30 AM',
    endTime: '12:20 PM',
    durationMinutes: 50,
    type: 'In-person',
    status: 'Scheduled',
    locationOrRoom: 'Suite 402 - Consultation Room 1',
    meetingLink: '',
    sessionFee: 150,
    paymentStatus: 'Paid',
    notesCompleted: false,
    clientGoalsSummary: 'Grief milestone processing & partner communication check-in'
  },
  {
    _id: '6620f4c21234567890000005',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000005',
    clientName: 'Sophia Rossi',
    date: getRelativeDate(3),
    startTime: '03:00 PM',
    endTime: '03:50 PM',
    durationMinutes: 50,
    type: 'Video session',
    status: 'Scheduled',
    locationOrRoom: 'UNFAZED Telehealth Room C-1',
    meetingLink: 'https://telehealth.unfazed.health/room/dr-sarah-m-sophia-rossi',
    sessionFee: 150,
    paymentStatus: 'Pending',
    notesCompleted: false,
    clientGoalsSummary: 'Graduated highway driving exposure review'
  },
  {
    _id: '6620f4c21234567890000006',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000001',
    clientName: 'Elena Vance',
    date: getRelativeDate(-7), // 7 days ago
    startTime: '02:00 PM',
    endTime: '02:50 PM',
    durationMinutes: 50,
    type: 'Video session',
    status: 'Completed',
    locationOrRoom: 'UNFAZED Telehealth Room A-1',
    meetingLink: '',
    sessionFee: 150,
    paymentStatus: 'Paid',
    notesCompleted: true,
    clientGoalsSummary: 'Cognitive reframing of quarterly review feedback'
  },
  {
    _id: '6620f4c21234567890000007',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000002',
    clientName: 'Marcus Thorne',
    date: getRelativeDate(-14),
    startTime: '04:00 PM',
    endTime: '04:50 PM',
    durationMinutes: 50,
    type: 'In-person',
    status: 'Completed',
    locationOrRoom: 'Suite 402',
    meetingLink: '',
    sessionFee: 150,
    paymentStatus: 'Paid',
    notesCompleted: true,
    clientGoalsSummary: 'Identifying behavioral avoidance loops'
  }
];

const notes = [
  {
    _id: '6620f4c31234567890000001',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000001',
    clientName: 'Elena Vance',
    sessionDate: getRelativeDate(-7),
    sessionNumber: 8,
    title: 'Session 8: Cognitive Distortions & Somatic De-escalation',
    isSharedWithClient: true,
    soap: {
      subjective: 'Client Elena arrived on time for video session. Reported moderate anxiety (6/10) over the past week due to restructuring at work. Noted improved sleep following 10-minute progressive muscle relaxation, but experienced one nocturnal panic awakening on Tuesday.',
      objective: 'Client was well-groomed, cooperative, and engaged throughout the 50-minute telehealth session. Affect was slightly tense initially, congruent with reported mood, softening noticeably following the mid-session grounding exercise. Speech was clear, normal rate and prosody.',
      assessment: 'Client demonstrates steady progress in identifying catastrophic thinking ("all-or-nothing" and "mind reading"). Successfully utilized the thought record during high-stress team meeting. GAD symptoms remain moderate but significantly more self-manageable compared to intake baseline.',
      plan: '1. Continue daily thought records when anxiety exceeds 5/10. 2. Implement the 5-4-3-2-1 sensory method at first sign of chest tightness. 3. Client agreed to schedule 15-minute transitional wind-down periods between ending remote work and evening family time.'
    },
    clientSharedSummary: {
      takeaways: 'Great work catching the automatic thought "If I don\'t answer immediately, they\'ll assume I\'m failing." Remember thoughts are internal hypotheses, not proven facts.',
      actionItems: [
        'Complete 2 thought-reframing entries in your journal',
        'Practice the 5-4-3-2-1 sensory grounding exercise at least 3 times',
        'Protect your 15-minute workday cutoff buffer'
      ],
      copingTools: ['5-4-3-2-1 Grounding', 'Box Breathing (4-4-4-4)', 'Thought Record Table']
    },
    riskAssessment: {
      level: 'None / Low Risk',
      safetyPlanDiscussed: false
    },
    tags: ['CBT', 'Anxiety', 'Thought Records', 'Shared'],
    isSigned: true,
    signedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    _id: '6620f4c31234567890000002',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000002',
    clientName: 'Marcus Thorne',
    sessionDate: getRelativeDate(-14),
    sessionNumber: 6,
    title: 'Session 6: Behavioral Activation & Reward Savoring',
    isSharedWithClient: false, // Private therapist-only note!
    soap: {
      subjective: 'Marcus stated: "Getting out of bed on weekends still feels like moving through wet concrete." However, he completed 2 out of 3 planned walks with his sister. Appetite has stabilized, though intermittent morning fatigue persists.',
      objective: 'Client presented in casual attire. Flat affect with occasional spontaneous smile when recalling walking his sister\'s dog. Thought process was linear and goal-directed. No psychomotor agitation or retardation observed today.',
      assessment: 'Major Depressive Disorder showing mild improvement under structured behavioral scheduling. Marcus responds well to mastery-and-pleasure tracking. Private clinician note: Watch for passive emotional withdrawal if upcoming project deadline creates stress.',
      plan: 'Encouraged client to maintain baseline physical activation. Target: 3 morning walks (20 mins each) and 1 social coffee meetup. Next session will focus on values clarification.'
    },
    clientSharedSummary: {
      takeaways: 'N/A - Confidential Clinical Record',
      actionItems: [],
      copingTools: []
    },
    riskAssessment: {
      level: 'None / Low Risk',
      safetyPlanDiscussed: false
    },
    tags: ['Depression', 'Behavioral Activation', 'Confidential', 'Private'],
    isSigned: true,
    signedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  },
  {
    _id: '6620f4c31234567890000003',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000003',
    clientName: 'Chloe Patel',
    sessionDate: getRelativeDate(-5),
    sessionNumber: 5,
    title: 'Session 5: In-Vivo Exposure Debrief & Pre-Presentation Anchoring',
    isSharedWithClient: true,
    soap: {
      subjective: 'Chloe reported speaking up during Monday departmental standup. SUDS rating began at 80/100 and decreased to 45/100 after 2 minutes. Expressed pride in completing the exposure without fleeing.',
      objective: 'Client was upbeat and animated. Eye contact maintained throughout video session. Clear vocal volume with minimal hesitation.',
      assessment: 'Excellent engagement with exposure therapy protocols. Habituation observed. Client is building self-efficacy around public dialogue.',
      plan: 'Step 4 of hierarchy: Asking an unscripted question during the cross-functional seminar next week.'
    },
    clientSharedSummary: {
      takeaways: 'You proved that anxiety naturally crests and falls on its own without needing to escape! Your brain is rewiring safety.',
      actionItems: [
        'Write down 1 discussion prompt before Thursday\'s cross-functional team meeting',
        'Notice your physical sensations without labeling them as danger'
      ],
      copingTools: ['Physiological Sigh', 'SUDS Tracking Chart', 'Courage Anchor Word']
    },
    riskAssessment: {
      level: 'None / Low Risk',
      safetyPlanDiscussed: false
    },
    tags: ['Social Anxiety', 'Exposure', 'Shared'],
    isSigned: true,
    signedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

const payments = [
  {
    _id: '6620f4c41234567890000001',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000001',
    clientName: 'Elena Vance',
    appointmentId: '6620f4c21234567890000001',
    invoiceNumber: 'INV-2026-081',
    description: '50-minute Telehealth Psychotherapy Session (CPT 90837)',
    amount: 150,
    status: 'Paid',
    paymentMethod: 'Stripe / Credit Card',
    dateIssued: getRelativeDate(0),
    datePaid: getRelativeDate(0),
    dueDate: getRelativeDate(14),
    receiptUrl: '#',
    notes: 'Auto-charged via Stripe connected card ending in 4242'
  },
  {
    _id: '6620f4c41234567890000002',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000002',
    clientName: 'Marcus Thorne',
    appointmentId: '6620f4c21234567890000002',
    invoiceNumber: 'INV-2026-082',
    description: '50-minute In-Person Clinical Session (CPT 90837)',
    amount: 150,
    status: 'Pending',
    paymentMethod: 'Insurance Copay',
    dateIssued: getRelativeDate(0),
    datePaid: null,
    dueDate: getRelativeDate(7),
    receiptUrl: '',
    notes: 'Aetna Copay $25 balance plus non-covered balance'
  },
  {
    _id: '6620f4c41234567890000003',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000003',
    clientName: 'Chloe Patel',
    appointmentId: '6620f4c21234567890000003',
    invoiceNumber: 'INV-2026-079',
    description: '50-minute Individual Psychotherapy Session',
    amount: 150,
    status: 'Paid',
    paymentMethod: 'Stripe / Credit Card',
    dateIssued: getRelativeDate(-5),
    datePaid: getRelativeDate(-5),
    dueDate: getRelativeDate(9),
    receiptUrl: '#',
    notes: 'Paid via Apple Pay / Stripe card ending in 8910'
  },
  {
    _id: '6620f4c41234567890000004',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000004',
    clientName: 'David Kim',
    appointmentId: null,
    invoiceNumber: 'INV-2026-075',
    description: 'Monthly Psychotherapy Retainer (2 Sessions)',
    amount: 300,
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    dateIssued: getRelativeDate(-12),
    datePaid: getRelativeDate(-11),
    dueDate: getRelativeDate(2),
    receiptUrl: '#',
    notes: 'ACH Direct Deposit Verified'
  },
  {
    _id: '6620f4c41234567890000005',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000006',
    clientName: 'James Henderson',
    appointmentId: null,
    invoiceNumber: 'INV-2026-068',
    description: 'Executive Stress Consultation - Follow-up Review',
    amount: 200,
    status: 'Overdue',
    paymentMethod: 'Stripe / Credit Card',
    dateIssued: getRelativeDate(-25),
    datePaid: null,
    dueDate: getRelativeDate(-11),
    receiptUrl: '',
    notes: 'Reminder notice dispatched 3 days ago'
  }
];

const messages = [
  {
    _id: '6620f4c51234567890000001',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000001',
    sender: 'client',
    senderName: 'Elena Vance',
    text: 'Hi Dr. Mitchell! Just confirming our video appointment today at 2:00 PM. I have my weekly thought journal ready to review.',
    read: true,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    _id: '6620f4c51234567890000002',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000001',
    sender: 'therapist',
    senderName: 'Dr. Sarah Mitchell',
    text: 'Good morning Elena! Yes, looking forward to our session at 2:00 PM. We will dive straight into your thought journal and explore the grounding techniques that felt most supportive this week.',
    read: true,
    timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000)
  },
  {
    _id: '6620f4c51234567890000003',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000002',
    sender: 'client',
    senderName: 'Marcus Thorne',
    text: 'Hello Dr. Mitchell, regarding our in-person session today at 4 PM, is there parking available in front of Suite 402?',
    read: true,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
  },
  {
    _id: '6620f4c51234567890000004',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000002',
    sender: 'therapist',
    senderName: 'Dr. Sarah Mitchell',
    text: 'Hi Marcus, yes! Visitor parking is open on Level 1 of the courtyard garage, and we validate tickets in the clinic reception.',
    read: true,
    timestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000)
  },
  {
    _id: '6620f4c51234567890000005',
    therapistId: defaultTherapistId,
    clientId: '6620f4c11234567890000003',
    sender: 'client',
    senderName: 'Chloe Patel',
    text: 'Dr. Mitchell, I spoke up in our cross-team sprint review today! My heart raced for about a minute, but I didn\'t stutter and I didn\'t apologize for speaking. Thank you so much for the courage anchor exercise!',
    read: false,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
  }
];

const plans = [
  {
    id: 'free',
    name: 'Free Starter',
    tagline: 'Ideal for independent solo therapists starting their clinical journey.',
    monthlyPrice: 0,
    annualPrice: 0,
    badge: 'Free Forever',
    features: [
      'Up to 3 active clients',
      'Basic session scheduling',
      'Standard clinical notes',
      'Secure client messaging',
      'Standard email support'
    ],
    limitations: [
      'No HD video telehealth',
      'No automated billing & Stripe',
      'No advanced clinical analytics'
    ],
    recommended: false,
    cta: 'Current Plan'
  },
  {
    id: 'pro',
    name: 'Pro Clinician',
    tagline: 'Complete practice management for thriving licensed private practitioners.',
    monthlyPrice: 49,
    annualPrice: 39,
    badge: 'Most Popular',
    features: [
      'Unlimited active clients',
      'HIPAA-compliant HD Video Telehealth room',
      'Private & Client-Shared SOAP Notes',
      'Stripe & Insurance Invoicing & Receipts',
      'Real-time Client Chat & Canned Responses',
      'Practice Growth & Retention Analytics',
      'Appointment Reminders via Email/SMS'
    ],
    limitations: [
      'Single therapist clinician seat'
    ],
    recommended: true,
    cta: 'Upgrade to Pro'
  },
  {
    id: 'premium',
    name: 'Practice Premium',
    tagline: 'For group practices, psychological clinics, and multi-therapist teams.',
    monthlyPrice: 99,
    annualPrice: 79,
    badge: 'Multi-Clinician',
    features: [
      'Everything in Pro Clinician',
      'Up to 10 Clinician / Supervisor seats',
      'Custom White-Label Client Portal & Branding',
      'Advanced Practice P&L & Revenue Forecasting',
      'Automated Superbill Generation & Batch Claims',
      'Priority 24/7 Clinical Support Hotline',
      'Audit Trail & Dedicated Compliance Officer'
    ],
    limitations: [],
    recommended: false,
    cta: 'Upgrade to Premium'
  }
];

module.exports = {
  therapist,
  clients,
  appointments,
  notes,
  payments,
  messages,
  plans,
  defaultTherapistId
};
