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