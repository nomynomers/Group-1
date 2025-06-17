-- Create the database
CREATE DATABASE DrugPrevent;
GO

-- Use the database
USE DrugPrevent;
GO

-- Create Role table
CREATE TABLE Role (
    role_id INT PRIMARY KEY IDENTITY(1,1),
    role_name VARCHAR(100) NOT NULL
);

-- Create User table
CREATE TABLE [Users] (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(255) UNIQUE NOT NULL,
    [password] VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    phone_number VARCHAR(20),
    registration_date DATETIME DEFAULT GETDATE(),
    role_id INT FOREIGN KEY REFERENCES Role(role_id)
);

-- Create Assessment table
CREATE TABLE Assessment (
    assessmentID INT PRIMARY KEY IDENTITY(1,1),
    assessmentName VARCHAR(255),
    description TEXT,
    targetAudience VARCHAR(50),
    estimatedTimeMinutes INT,
    createdDate DATETIME DEFAULT GETDATE()
);

-- Create AssessmentQuestion table
CREATE TABLE AssessmentQuestion (
    questionID INT PRIMARY KEY IDENTITY(1,1),
    assessmentID INT FOREIGN KEY REFERENCES Assessment(assessmentID),
    questionText TEXT
);

-- Create QuestionOption table
CREATE TABLE QuestionOption (
    optionID INT PRIMARY KEY IDENTITY(1,1),
    questionID INT FOREIGN KEY REFERENCES AssessmentQuestion(questionID),
    optionValue VARCHAR(255),
    score INT
);

-- Create UserAssessment table
CREATE TABLE UserAssessment (
    userAssessmentID INT PRIMARY KEY IDENTITY(1,1),
    userID INT FOREIGN KEY REFERENCES [Users](user_id),
    assessmentID INT FOREIGN KEY REFERENCES Assessment(assessmentID),
    completionDate DATETIME,
    riskLevel VARCHAR(50),
    totalScore INT,
    recommendationProvided TEXT
);

-- Create UserAssessmentResponse table
CREATE TABLE UserAssessmentResponse (
    responseID INT PRIMARY KEY IDENTITY(1,1),
    userAssessmentID INT FOREIGN KEY REFERENCES UserAssessment(userAssessmentID),
    questionID INT FOREIGN KEY REFERENCES AssessmentQuestion(questionID),
    optionID INT FOREIGN KEY REFERENCES QuestionOption(optionID)
);

-- Create Consultant table
CREATE TABLE Consultant (
    consultantID INT PRIMARY KEY IDENTITY(1,1),
    specialization VARCHAR(255),
    qualification VARCHAR(255),
    yearsExperience INT
);

-- Create Appointment table
CREATE TABLE Appointment (
    appointmentID INT PRIMARY KEY IDENTITY(1,1),
    userID INT FOREIGN KEY REFERENCES [Users](user_id),
    consultantID INT FOREIGN KEY REFERENCES Consultant(consultantID),
    appointmentDate DATE,
    startTime TIME,
    endTime TIME,
    status VARCHAR(50),
    meetingLink VARCHAR(255)
);

-- Create Course table
CREATE TABLE Course (
    courseID INT PRIMARY KEY IDENTITY(1,1),
    evaluationID INT,
    moduleID INT,
    courseName VARCHAR(255),
    description TEXT,
    targetAudience VARCHAR(50),
    durationMinutes INT,
    createdBy INT FOREIGN KEY REFERENCES [Users](user_id),
    creationDate DATETIME DEFAULT GETDATE(),
    certificateAvailable BIT
);

-- Create CourseModule table
CREATE TABLE CourseModule (
    moduleID INT PRIMARY KEY IDENTITY(1,1),
    courseID INT FOREIGN KEY REFERENCES Course(courseID),
    moduleName VARCHAR(255),
    description TEXT,
    durationMinutes INT
);

-- Create CourseEvaluation table
CREATE TABLE CourseEvaluation (
    evaluationID INT PRIMARY KEY IDENTITY(1,1),
    courseID INT FOREIGN KEY REFERENCES Course(courseID),
    rating INT,
    comments TEXT,
    submissionDate DATETIME DEFAULT GETDATE()
);

-- Create UserCourse table
CREATE TABLE UserCourse (
    userCourseID INT PRIMARY KEY IDENTITY(1,1),
    userID INT FOREIGN KEY REFERENCES [Users](user_id),
    progressID INT,
    registrationDate DATETIME,
    completionDate DATETIME,
    progressPercentage DECIMAL(5, 2),
    certificateIssued BIT,
    lastAccessDate DATETIME
);

-- Create UserCourseProgress table
CREATE TABLE UserCourseProgress (
    progressID INT PRIMARY KEY IDENTITY(1,1),
    userCourseID INT FOREIGN KEY REFERENCES UserCourse(userCourseID),
    moduleID INT FOREIGN KEY REFERENCES CourseModule(moduleID),
    completionStatus VARCHAR(50),
    completionDate DATETIME
);

ALTER TABLE [DrugPrevent].[dbo].[Course]
ADD imageCover VARCHAR(500);

ALTER TABLE [DrugPrevent].[dbo].[Course]
ADD author VARCHAR(50);

ALTER TABLE Appointment
ALTER COLUMN startTime TIME;

ALTER TABLE Appointment
ALTER COLUMN endTime TIME;

CREATE TABLE Enrollment (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    courseId INT NOT NULL,
    enrolledAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Enrollment_User FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT FK_Enrollment_Course FOREIGN KEY (courseId) REFERENCES Course(courseID)
);

ALTER TABLE CourseModule
ADD content NVARCHAR(MAX);

ALTER TABLE Assessment
ADD imageCover VARCHAR(255) NULL;
GO

--===================================================================

INSERT INTO Role (role_name)
VALUES 
('ADMIN'),
('MEMBER'),
('USER');

INSERT INTO [DrugPrevent].[dbo].[Course] (
    [evaluationID],
    [moduleID],
    [courseName],
    [description],
    [targetAudience],
    [durationMinutes],
    [createdBy],
    [creationDate],
    [certificateAvailable],
    [imageCover],
    [author]
)
VALUES
( 1, 1, 'Introduction to Health & Wellness', 'Learn the fundamentals of maintaining a healthy lifestyle.', 'Beginner', 8, 1, '2025-06-08 20:22:58.590', 1, 'https://res.cloudinary.com/ddtm7drwo/image/upload/v1717869764/health_wellness.jpg', 'Dr. Sarah Johnson'),
( 0, 0, 'Advanced Nutrition Planning', 'Master the art of creating personalized nutrition plans.', 'Intermediate', 5, 1, '2025-06-08 20:22:58.590', 0, 'https://res.cloudinary.com/ddtm7drwo/image/upload/v1717869764/nutrition_planning.jpg', 'Dr. Sarah Johnson'),
( 0, 0, 'Mental Health First Aid', 'Essential skills for recognizing and responding to mental health issues.', 'Advanced', 12, 1, '2025-06-09 13:47:10.353', 1, 'https://res.cloudinary.com/ddtm7drwo/image/upload/v1717869764/mental_health_first_aid.jpg', 'Dr. Sarah Johnson');

INSERT INTO Assessment (
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
    'https://example.com/images/assist.jpg'
),
(
    'CRAFFT Test',
    'The CRAFFT screening tool is designed specifically for adolescents to assess high-risk alcohol and drug behaviors.',
    'Adolescents, Teens',
    8,
    GETDATE(),
    'https://example.com/images/crafft.jpg'
);

  INSERT INTO [DrugPrevent].[dbo].[Course] (

    evaluationID,
    moduleID,
    courseName,
    description,
    targetAudience,
    durationMinutes,
    createdBy,
    creationDate,
    certificateAvailable,
    imageCover,
    author
)
VALUES
(0, 0, 'Drug Awareness and Prevention', 'This course helps learners understand the dangers of drug use and methods of prevention.', 'Students', 8, 1, '2025-06-15 16:51:56.547', 1, 'https://res.cloudinary.com/ddtm7dvwo/image/upload/v1749462769/drug_thumnail_cm8vxl.webp', 'John Nguyen'),
(0, 0, 'Refusal Skills for Youth', 'Equips young people with strategies and confidence to say no to drugs in various situations.', 'Teenagers', 6, 1, '2025-06-15 16:52:13.647', 1, 'https://res.cloudinary.com/ddtm7dvwo/image/upload/v1749479149/9ffa446ea8fb0c6591f9ffc0e0eff7b2_z46jx8.jpg', 'Mai Tran'),
(0, 0, 'Counseling and Support for Drug Addicts', 'A course for social workers and educators on how to support individuals recovering from addiction.', 'Teachers', 12, 1, '2025-06-15 16:52:14.157', 1, 'https://res.cloudinary.com/ddtm7dvwo/image/upload/v1749479278/drug_oldman_cqfcmr.jpg', 'Hung Le');

INSERT INTO [DrugPrevent].[dbo].[CourseModule] 
([courseID], [moduleName], [description], [durationMinutes], [content])
VALUES 
-- Module 1
(1, 
 'Understanding Drug Abuse and Its Consequences',
 'This module explores the fundamental concepts of drug abuse, its causes, and its effects on individuals and society.',
 25,
 'Drug abuse refers to the misuse of legal or illegal substances for non-medical purposes, often leading to addiction, health complications, and social problems. Many people fall into drug use due to curiosity, peer pressure, emotional distress, or exposure to environments where drugs are easily accessible. The consequences of drug abuse are far-reaching. On a personal level, it can damage the brain, heart, liver, and other organs. It also severely impacts mental health, leading to anxiety, depression, or psychosis. Socially, drug abuse can lead to broken relationships, unemployment, crime, and homelessness. Communities suffer as the demand for healthcare, law enforcement, and rehabilitation rises. Understanding these consequences is essential in developing empathy and awareness, especially among youth. Preventing drug abuse starts with education, open communication, and strong support systems.'
),

-- Module 2
(1, 
 'Common Types of Drugs and Their Effects',
 'This module provides an overview of commonly abused drugs, their classifications, and their physical and psychological effects.',
 30,
 'Drugs can be classified into several categories based on their effects on the body. Stimulants, such as cocaine and methamphetamine, increase alertness and energy but can cause heart problems, paranoia, and addiction. Depressants, like alcohol and benzodiazepines, slow down brain function, leading to drowsiness and impaired judgment. Overuse can result in overdose or death. Opioids, including heroin and prescription painkillers like oxycodone, are highly addictive and commonly responsible for overdose deaths. Hallucinogens, such as LSD and psilocybin mushrooms, alter perception and can lead to unpredictable behavior or psychological distress. Understanding the effects of these drugs helps individuals make informed choices and recognize the dangers of experimentation. It also supports efforts in early intervention and harm reduction strategies.'
),

-- Module 3
(1, 
 'Prevention Strategies and How to Say No',
 'This module teaches effective strategies for preventing drug use and equips learners with practical ways to resist peer pressure.',
 20,
 'Preventing drug use starts with education, strong personal values, and a supportive environment. Schools, families, and communities play a vital role in guiding youth toward healthy choices. Encouraging involvement in sports, arts, and other extracurricular activities can reduce the temptation to use drugs. One of the most critical skills is learning how to say �no� confidently. Assertive communication, body language, and the ability to walk away from risky situations are powerful tools. Role-playing and real-life scenarios help individuals practice these skills. Moreover, building a circle of supportive friends and mentors can make a significant difference. When people feel valued and understood, they are less likely to seek escape through drugs. Empowering individuals with knowledge and resilience is key to long-term prevention.'
);
