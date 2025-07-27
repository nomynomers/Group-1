INSERT INTO [DrugPrevention].[dbo].[Roles] (
roleName)
VALUES
('ADMIN'),
('USER')

-------------------------Courses---------------------------------------

INSERT INTO [DrugPrevention].[dbo].[Courses] (
    courseName,
    description,
    targetAudience,
    durationMinutes,
    creationDate,
    imageCover,
    author
)
VALUES
('Drug Awareness and Prevention', 
'This course helps learners understand the dangers of drug use and methods of prevention.', 
'Adults', 
11, 
'2025-06-15 16:51:56.547', 
'https://res.cloudinary.com/ddtm7dvwo/image/upload/v1749462769/drug_thumnail_cm8vxl.webp', 
'John Nguyen'),

('Refusal Skills for Youth', 
'Equips young people with strategies and confidence to say no to drugs in various situations.', 
'Youth', 
6, 
'2025-06-15 16:52:13.647', 
'https://res.cloudinary.com/ddtm7dvwo/image/upload/v1749479149/9ffa446ea8fb0c6591f9ffc0e0eff7b2_z46jx8.jpg', 
'Mai Tran'),

('Counseling and Support for Drug Addicts', 
'A course for social workers and educators on how to support individuals recovering from addiction.', 
'Teachers', 
12, 
'2025-06-15 16:52:14.157', 
'https://res.cloudinary.com/ddtm7dvwo/image/upload/v1749479278/drug_oldman_cqfcmr.jpg', 
'Hung Le');

INSERT INTO [DrugPrevention].[dbo].[CourseModules] 
([courseID], [moduleName], [description], [durationMinutes], [content], [videoUrl], [moduleOrder])
VALUES 
-- Module 1
(1, 
 'Understanding Drug Abuse and Its Consequences',
 'This module explores the fundamental concepts of drug abuse, its causes, and its effects on individuals and society.',
 6,
 'Drug abuse refers to the misuse of legal or illegal substances for non-medical purposes, often leading to addiction, health complications, and social problems. Many people fall into drug use due to curiosity, peer pressure, emotional distress, or exposure to environments where drugs are easily accessible. The consequences of drug abuse are far-reaching. On a personal level, it can damage the brain, heart, liver, and other organs. It also severely impacts mental health, leading to anxiety, depression, or psychosis. Socially, drug abuse can lead to broken relationships, unemployment, crime, and homelessness. Communities suffer as the demand for healthcare, law enforcement, and rehabilitation rises. Understanding these consequences is essential in developing empathy and awareness, especially among youth. Preventing drug abuse starts with education, open communication, and strong support systems.',
 'https://www.youtube.com/embed/b6Dte96WdqM',
 1
),

-- Module 2
(3, 
 'Common Types of Drugs and Their Effects',
 'This module provides an overview of commonly abused drugs, their classifications, and their physical and psychological effects.',
 30,
 'Drugs can be classified into several categories based on their effects on the body. Stimulants, such as cocaine and methamphetamine, increase alertness and energy but can cause heart problems, paranoia, and addiction. Depressants, like alcohol and benzodiazepines, slow down brain function, leading to drowsiness and impaired judgment. Overuse can result in overdose or death. Opioids, including heroin and prescription painkillers like oxycodone, are highly addictive and commonly responsible for overdose deaths. Hallucinogens, such as LSD and psilocybin mushrooms, alter perception and can lead to unpredictable behavior or psychological distress. Understanding the effects of these drugs helps individuals make informed choices and recognize the dangers of experimentation. It also supports efforts in early intervention and harm reduction strategies.',
 'https://www.youtube.com/embed/OYDAfCicH4w',
 2
),

-- Module 3
(2, 
 'Prevention Strategies and How to Say No',
 'This module teaches effective strategies for preventing drug use and equips learners with practical ways to resist peer pressure.',
 20,
 'Preventing drug use starts with education, strong personal values, and a supportive environment. Schools, families, and communities play a vital role in guiding youth toward healthy choices. Encouraging involvement in sports, arts, and other extracurricular activities can reduce the temptation to use drugs. One of the most critical skills is learning how to say “no” confidently. Assertive communication, body language, and the ability to walk away from risky situations are powerful tools. Role-playing and real-life scenarios help individuals practice these skills. Moreover, building a circle of supportive friends and mentors can make a significant difference. When people feel valued and understood, they are less likely to seek escape through drugs. Empowering individuals with knowledge and resilience is key to long-term prevention.',
 'https://www.youtube.com/embed/WQEatyCe7ZY',
 3
);

INSERT INTO Courses (courseName, description, targetAudience, durationMinutes, imageCover, author)
VALUES 
(
  'Effective Communication with Teens',
  'Teaches parents how to communicate effectively with teenagers about drugs and risky behaviors.',
  'Parents',
  10,
  'https://example.com/images/communication_teens.png',
  'Lisa Pham'
),
(
  'Substance Abuse in the Workplace',
  'Educates adults on recognizing and addressing substance abuse among colleagues and employees.',
  'Adults',
  9,
  'https://example.com/images/workplace_abuse.png',
  'David Tran'
),
(
  'Digital Tools for Drug Education',
  'Guides teachers in using modern digital tools to deliver engaging drug education lessons.',
  'Teachers',
  8,
  'https://example.com/images/digital_education.png',
  'Thu Nguyen'
),
(
  'Peer Pressure and How to Handle It',
  'Helps youth identify and resist peer pressure situations involving drugs.',
  'Youth',
  7,
  'https://example.com/images/peer_pressure.png',
  'Long Ho'
),
(
  'Supporting Children of Addicted Parents',
  'Provides support strategies for parents and caregivers of children in addicted households.',
  'Parents',
  12,
  'https://example.com/images/support_children.png',
  'Minh Ha'
),
(
  'Community Initiatives to Prevent Drug Use',
  'Outlines programs and initiatives communities can undertake to prevent substance abuse.',
  'Teachers',
  11,
  'https://example.com/images/community_initiative.png',
  'Quang Le'
);

INSERT INTO CourseModules (courseID, moduleName, description, durationMinutes, content, videoUrl, moduleOrder)
VALUES 
(2, 'Understanding Peer Pressure', 'Recognize common pressure tactics.', 2, N'See how peer influence works in teen environments.', 'https://example.com/videos/refusal-1.mp4', 1),
(2, 'Refusal Techniques', 'Ways to confidently say no.', 2, N'Techniques like assertive communication and role play.', 'https://example.com/videos/refusal-2.mp4', 2),
(2, 'Building Confidence', 'Stay strong in tough situations.', 2, N'Strategies to build self-esteem and resilience.', 'https://example.com/videos/refusal-3.mp4', 3);
INSERT INTO CourseModules (courseID, moduleName, description, durationMinutes, content, videoUrl, moduleOrder)
VALUES 
(3, 'Therapeutic Approaches', 'Overview of common counseling techniques.', 4, N'CBT, group therapy, and more.', 'https://example.com/videos/counseling-1.mp4', 1),
(3, 'Recovery Support Systems', 'Support networks and their importance.', 4, N'Role of family, peers, and professionals.', 'https://example.com/videos/counseling-2.mp4', 2),
(3, 'Preventing Relapse', 'Techniques to avoid returning to drug use.', 4, N'Recognizing triggers and having a recovery plan.', 'https://example.com/videos/counseling-3.mp4', 3);
INSERT INTO CourseModules (courseID, moduleName, description, durationMinutes, content, videoUrl, moduleOrder)
VALUES 
(1004, 'Foundations of Communication', 'Basic skills for listening and speaking.', 3, N'Learn the do’s and don’ts of talking with teens.', 'https://example.com/videos/parenting-1.mp4', 1),
(1004, 'Drug Topics for Discussion', 'What to say and how to say it.', 3, N'Conversation starters around drugs and health.', 'https://example.com/videos/parenting-2.mp4', 2),
(1004, 'Keeping Communication Open', 'Creating a safe space.', 4, N'Make teens feel heard and supported.', 'https://example.com/videos/parenting-3.mp4', 3);
	INSERT INTO CourseModules (courseID, moduleName, description, durationMinutes, content, videoUrl, moduleOrder)
VALUES 
(1005, 'Recognizing Signs', 'How to identify substance abuse.', 3, N'Behavioral and performance indicators in the workplace.', 'https://example.com/videos/workplace-1.mp4', 1),
(1005, 'Responding Professionally', 'Steps to take as a manager or coworker.', 3, N'Balancing empathy and responsibility.', 'https://example.com/videos/workplace-2.mp4', 2),
(1005, 'Building a Drug-Free Policy', 'Policy and support programs.', 3, N'Creating a safe and supportive work culture.', 'https://example.com/videos/workplace-3.mp4', 3);
INSERT INTO CourseModules (courseID, moduleName, description, durationMinutes, content, videoUrl, moduleOrder)
VALUES 
(1006, 'Digital Resources Overview', 'Tools and platforms for teaching.', 3, N'Videos, interactive quizzes, VR tools.', 'https://example.com/videos/edtech-1.mp4', 1),
(1006, 'Lesson Planning with Tech', 'How to integrate tech into the classroom.', 2, N'Example lesson structures using multimedia.', 'https://example.com/videos/edtech-2.mp4', 2),
(1006, 'Assessing Student Engagement', 'Track learning progress.', 3, N'Monitoring and feedback with technology.', 'https://example.com/videos/edtech-3.mp4', 3);
INSERT INTO CourseModules (courseID, moduleName, description, durationMinutes, content, videoUrl, moduleOrder)
VALUES 
(1007, 'What is Peer Pressure?', 'Types and effects.', 2, N'Direct, indirect, and self-imposed pressure explained.', 'https://example.com/videos/peer-1.mp4', 1),
(1007, 'Practice Saying No', 'Realistic refusal scenarios.', 3, N'Scripts and responses for high-pressure moments.', 'https://example.com/videos/peer-2.mp4', 2),
(1007, 'Support Systems', 'Finding your allies.', 2, N'Surrounding yourself with people who respect your choices.', 'https://example.com/videos/peer-3.mp4', 3);
INSERT INTO CourseModules (courseID, moduleName, description, durationMinutes, content, videoUrl, moduleOrder)
VALUES 
(1008, 'Understanding Trauma in Children', 'Psychological effects explained.', 4, N'How addiction affects childhood development.', 'https://example.com/videos/child-support-1.mp4', 1),
(1008, 'Building Safe Environments', 'Creating structure and trust.', 4, N'Practical parenting advice for stability.', 'https://example.com/videos/child-support-2.mp4', 2),
(1008, 'Connecting with Resources', 'Where to find help.', 4, N'School counselors, therapy, and support groups.', 'https://example.com/videos/child-support-3.mp4', 3);
INSERT INTO CourseModules (courseID, moduleName, description, durationMinutes, content, videoUrl, moduleOrder)
VALUES 
(1009, 'Types of Community Programs', 'Different models for prevention.', 4, N'Youth centers, afterschool programs, and campaigns.', 'https://example.com/videos/community-1.mp4', 1),
(1009, 'Engaging Stakeholders', 'Working with parents, schools, and leaders.', 3, N'Collaboration between sectors for stronger impact.', 'https://example.com/videos/community-2.mp4', 2),
(1009, 'Measuring Program Success', 'Using data to improve impact.', 4, N'Surveys, interviews, and long-term tracking methods.', 'https://example.com/videos/community-3.mp4', 3);


------------------------------ASSESSMENTS----------------------------

INSERT INTO Assessments (
    assessmentName,
    description,
    targetAudience,
    estimatedTimeMinutes,
    createdDate,
    imageCover
) VALUES
(
    'ASSIST Test',
    'The Alcohol, Smoking and Substance Involvement Screening Test (ASSIST) helps identify substance use and related risks among youth and adults.',
    'Youth, Adults',
    10,
    GETDATE(),
    'https://res.cloudinary.com/ddtm7dvwo/image/upload/v1750134176/assist_liry9n.webp'
),
(
    'CRAFFT Test',
    'The CRAFFT screening tool is designed specifically for adolescents to assess high-risk alcohol and drug behaviors.',
    'Adolescents, Teens',
    8,
    GETDATE(),
    'https://res.cloudinary.com/ddtm7dvwo/image/upload/v1750138728/craftt_tq1f8d.jpg'
);

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText])
VALUES (2, 1, 1, 'During the PAST 12 MONTHS, on how many days did you drink more than a few sips of beer, wine, or any drink containing alcohol?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (1, 4, 1, '0', 0), (1, 5, 2, 'More than 0', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (2, 2, 1, 'During the PAST 12 MONTHS, on how many days did you use any marijuana (weed, oil, or hash, by smoking, vaping, or in food) or  synthetic marijuana  (like  K2,   Spice ) or  vaping  THC oil?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (2, 4, 1, '0', 0), (2, 5, 2, 'More than 0', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (2, 3, 1, 'During the PAST 12 MONTHS, on how many days did you use anything else to get high (like other illegal drugs, prescription or over-the-counter medications, and things that you sniff, huff, or vape )?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (3, 4, 1, '0', 0), (3, 5, 2, 'More than 0', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (2, 4, 1, 'Have you ever ridden in a CAR driven by someone (including yourself) who was  high  or had been using alcohol or drugs?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (4, NULL, 1, 'No', 0), (4, NULL, 2, 'Yes', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (2, 5, 0, 'Do you ever use alcohol or drugs to RELAX, feel better about yourself, or fit in?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (5, 6, 1, 'No', 0), (5, 6, 2, 'Yes', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (2, 6, 0,  'Do you ever use alcohol or drugs while you are by yourself, or ALONE?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (6, 7, 1, 'No', 0), (6, 7, 2, 'Yes', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (2, 7, 0, 'Do you ever FORGET things you did while using alcohol or drugs?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (7, 8, 1, 'No', 0), (7, 8, 2, 'Yes', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (2, 8, 0, 'Do your FAMILY or FRIENDS ever tell you that you should cut down on your drinking or drug use? ');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (8, 9, 1, 'No', 0), (8, 9, 2, 'Yes', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (2, 9, 0, 'Have you ever gotten into TROUBLE while you were using alcohol or drugs?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (9, NULL, 1, 'No', 0), (9, NULL, 2, 'Yes', 1);
GO

INSERT INTO AssessmentQuestions (assessmentID, questionOrder, isInitialQuestion, questionText)
VALUES 
(1, 1, 1, '1. In your life, which of the following substances have you ever used?'),
(1, 2, 0, '2. In the past three months, how often have you used [SUBSTANCE]?'),
(1, 3, 0, '3. During the past three months, how often have you had a strong desire or urge to use [SUBSTANCE]?'),
(1, 4, 0, '4. During the past three months, how often has your use of [SUBSTANCE] led to health, social, legal, or financial problems?'),
(1, 5, 0, '5. During the past three months, how often have you failed to do what was normally expected of you because of your use of [SUBSTANCE]?'),
(1, 6, 0, '6. Has a friend or relative or anyone else ever expressed concern about your use of [SUBSTANCE]?'),
(1, 7, 0, '7. Have you ever tried and failed to control, cut down, or stop using [SUBSTANCE]?'),
(1, 8, 0, '8. Have you ever used any drug by injection? (NON-MEDICAL USE ONLY)');

INSERT INTO QuestionOptions (questionID, optionText, score, nextQuestionID, optionOrder)
VALUES 
(1003, 'Never', 0, 1004, 1),
(1003, 'Once or twice', 2, 1004, 2),
(1003, 'Monthly', 3, 1004, 3),
(1003, 'Weekly', 4, 1004, 4),
(1003, 'Daily or almost daily', 6, 1004, 5),

(1004, 'Never', 0, 1005, 6),
(1004, 'Once or twice', 3, 1005, 7),
(1004, 'Monthly', 4, 1005, 8),
(1004, 'Weekly', 5, 1005, 9),
(1004, 'Daily or almost daily', 6, 1005, 10),

(1005, 'Never', 0, 1006, 11),
(1005, 'Once or twice', 4, 1006, 12),
(1005, 'Monthly', 5, 1006, 13),
(1005, 'Weekly', 6, 1006, 14),
(1005, 'Daily or almost daily', 7, 1006, 15),

(1006, 'Never', 0, 1007, 16),
(1006, 'Once or twice', 5, 1007, 17),
(1006, 'Monthly', 6, 1007, 18),
(1006, 'Weekly', 7, 1007, 19),
(1006, 'Daily or almost daily', 8, 1007, 20),

(1007, 'No, never', 0, 1008, 21),
(1007, 'Yes, but not in the past 3 months', 3, 1008, 22),
(1007, 'Yes, in the past 3 months', 6, 1008, 23),

(1008, 'No, never', 0, 2002, 24),
(1008, 'Yes, but not in the past 3 months', 3, 2002, 25),
(1008, 'Yes, in the past 3 months', 6, 2002, 26),

-- Q1 Substances list
(1002, 'Tobacco products - Q1', 3, 1003, 27),
(1002, 'Alcoholic beverages - Q1', 3, 1003, 28),
(1002, 'Cannabis - Q1', 3, 1003, 29),
(1002, 'Cocaine - Q1', 3, 1003, 30),
(1002, 'Amphetamine type stimulants - Q1', 3, 1003, 31),
(1002, 'Inhalants - Q1', 3, 1003, 32),
(1002, 'Sedatives or Sleeping Pills - Q1', 3, 1003, 33),
(1002, 'Hallucinogens - Q1', 3, 1003, 34),
(1002, 'Opioids - Q1', 3, 1003, 35),
(1002, 'Other (specify) - Q1', 3, 1003, 36),

-- Q8 options
(2002, 'No, never', 0, 0, 37),
(2002, 'Yes, but not in the past 3 months', 1, 0, 38),
(2002, 'Yes, in the past 3 months', 2, 0, 39);

-------------------------------------------------Articles---------------------------------------------------------------

-- Blog 1: The Power of Education in Preventing Drug Abuse
INSERT INTO Articles (createdBy, articleName, description, category, durationMinutes, imageCover, content)
VALUES (
  1,
  'The Power of Education in Preventing Drug Abuse',
  'Exploring how education plays a vital role in drug prevention, especially among youth.',
  'Drug Prevention',
  5,
  'https://res.cloudinary.com/ddtm7dvwo/image/upload/v1752656308/a602396d52ecc607b1f6fb26707b3b96_wf05pk.jpg',
  'Drug prevention begins with awareness. By educating youth about the dangers of drug use, we can reduce curiosity and experimentation. Schools, parents, and communities must collaborate to deliver age-appropriate, factual information. When young people understand the real consequences of drug abuse — both physical and social — they are better equipped to make healthy choices. Programs that include life skills training, peer support, and open discussions often have the most lasting impact.'
);

-- Blog 2: Community Involvement: A Key to Drug-Free Living
INSERT INTO Articles (createdBy, articleName, description, category, durationMinutes, imageCover, content)
VALUES (
  1,
  'Community Involvement: A Key to Drug-Free Living',
  'How community action and support can help prevent substance abuse.',
  'Drug Prevention',
  4,
  'https://res.cloudinary.com/ddtm7dvwo/image/upload/v1752656416/549fba5bfda220c0e15a08e7bd17c357_wd3nrc.jpg',
  'Communities are the front line in the fight against drug abuse. From neighborhood watch groups to local health centers, everyone has a role. Events like drug-free campaigns, sports tournaments, and workshops help spread awareness. Moreover, when at-risk individuals feel supported and valued by their community, they’re less likely to turn to substances for comfort or escape. Community-driven initiatives can make a lasting difference in building a drug-free environment.'
);

-- Blog 3: Early Signs of Drug Use and How to Respond
INSERT INTO Articles (createdBy, articleName, description, category, durationMinutes, imageCover, content)
VALUES (
  1,
  'Early Signs of Drug Use and How to Respond',
  'Identifying early warning signs of drug use and steps to take for early intervention.',
  'Drug Prevention',
  6,
  'https://res.cloudinary.com/ddtm7dvwo/image/upload/v1752656471/d4008b3a2c4da496afce0ef69abd640e_wxctrf.jpg',
  'Recognizing the early signs of drug use can prevent long-term harm. These signs include sudden behavior changes, withdrawal from family, declining academic performance, and changes in appearance. If you notice these symptoms, act with compassion — not anger. Start with an open conversation and express your concern. Involve professionals such as school counselors or healthcare providers when necessary. Early intervention often leads to more successful outcomes.'
);

INSERT INTO Articles (createdBy, articleName, description, category, durationMinutes, imageCover, content)
VALUES 
(1, 'The Impact of Drugs on Mental Health',
 'An in-depth look at how substance abuse affects psychological well-being.',
 'Mental Health', 8,
 'https://example.com/images/drug-mental-health.jpg',
 'This article explores the connection between drug use and mental health issues such as anxiety, depression, and psychosis.'),
 
(1, 'How to Talk to Teenagers About Drugs',
 'Tips and strategies for parents to have honest conversations about drugs with their teens.',
 'Parenting', 6,
 'https://example.com/images/talk-teens-drugs.jpg',
 'Discover practical advice for initiating conversations, building trust, and answering tough questions about substance use.'),

(1, 'Why Early Education Prevents Drug Abuse',
 'The role of early intervention and school-based programs in reducing drug use.',
 'Education', 7,
 'https://example.com/images/drug-prevention-school.jpg',
 'Learn how educators and communities can equip children with skills to avoid risky behaviors from a young age.'),

(1, 'Supporting Friends Through Recovery',
 'Ways to be a helpful ally to someone recovering from addiction.',
 'Support', 5,
 'https://example.com/images/support-recovery.jpg',
 'Find out what to say, what not to say, and how to maintain a supportive relationship with someone in recovery.'),

(1, 'Understanding Prescription Drug Abuse',
 'Explore how legal medications can become dangerous when misused.',
 'Awareness', 6,
 'https://example.com/images/prescription-abuse.jpg',
 'This article sheds light on the dangers of prescription drug misuse and how to prevent it.'),

(1, 'Community Programs that Make a Difference',
 'Successful community-led drug prevention programs around the world.',
 'Community', 9,
 'https://example.com/images/community-programs.jpg',
 'Case studies and examples of local programs that have significantly reduced drug-related problems in their areas.');

