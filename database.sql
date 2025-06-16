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



--===================================================================

INSERT INTO Role (role_name)
VALUES 
('Admin'),
('Member');

INSERT INTO [Users] (email, [password], first_name, last_name, date_of_birth, phone_number, role_id)
VALUES 
('a@a.com', 'a', 'Alice', 'Wonderland', '1990-05-10', '1234567890', 1)

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
