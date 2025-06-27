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

