INSERT INTO [DrugPrevention].[dbo].[Roles] (
roleName)
VALUES
('ADMIN'),
('USER')

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
VALUES (1, 1, 1, 'During the PAST 12 MONTHS, on how many days did you drink more than a few sips of beer, wine, or any drink containing alcohol?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (1, 4, 1, '0', 0), (1, 5, 2, 'More than 0', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (1, 2, 1, 'During the PAST 12 MONTHS, on how many days did you use any marijuana (weed, oil, or hash, by smoking, vaping, or in food) or  synthetic marijuana  (like  K2,   Spice ) or  vaping  THC oil?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (2, 4, 1, '0', 0), (2, 5, 2, 'More than 0', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (1, 3, 1, 'During the PAST 12 MONTHS, on how many days did you use anything else to get high (like other illegal drugs, prescription or over-the-counter medications, and things that you sniff, huff, or vape )?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (3, 4, 1, '0', 0), (3, 5, 2, 'More than 0', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (1, 4, 1, 'Have you ever ridden in a CAR driven by someone (including yourself) who was  high  or had been using alcohol or drugs?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (4, NULL, 1, 'No', 0), (4, NULL, 2, 'Yes', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (1, 5, 0, 'Do you ever use alcohol or drugs to RELAX, feel better about yourself, or fit in?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (5, 6, 1, 'No', 0), (5, 6, 2, 'Yes', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (1, 6, 0,  'Do you ever use alcohol or drugs while you are by yourself, or ALONE?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (6, 7, 1, 'No', 0), (6, 7, 2, 'Yes', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (1, 7, 0, 'Do you ever FORGET things you did while using alcohol or drugs?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (7, 8, 1, 'No', 0), (7, 8, 2, 'Yes', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (1, 8, 0, 'Do your FAMILY or FRIENDS ever tell you that you should cut down on your drinking or drug use? ');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (8, 9, 1, 'No', 0), (8, 9, 2, 'Yes', 1);
GO

INSERT INTO [AssessmentQuestions] ([assessmentID], [questionOrder], [isInitialQuestion], [questionText]) 
VALUES (1, 9, 0, 'Have you ever gotten into TROUBLE while you were using alcohol or drugs?');
GO
INSERT INTO [QuestionOptions] ([questionID], [nextQuestionID], [optionOrder], [optionText], [score]) 
VALUES (9, NULL, 1, 'No', 0), (9, NULL, 2, 'Yes', 1);
GO
