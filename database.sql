CREATE DATABASE DrugPrevention;
GO

USE DrugPrevention;
GO

CREATE TABLE Roles (
  roleID INT IDENTITY(1,1) PRIMARY KEY,
  roleName VARCHAR(100) UNIQUE,
);

CREATE TABLE Users (
  userID INT IDENTITY(1,1) PRIMARY KEY,
  roleID INT,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  dateOfBirth DATE,
  phoneNumber VARCHAR(20),
  registrationDate DATETIME DEFAULT GETDATE(),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  accountStatus BIT,
  FOREIGN KEY (roleID) REFERENCES Roles(roleID)
);

CREATE TABLE Courses (
  courseID INT IDENTITY(1,1) PRIMARY KEY,
  courseName VARCHAR(255),
  description VARCHAR(MAX),
  targetAudience VARCHAR(50),
  durationMinutes INT,
  creationDate DATETIME DEFAULT GETDATE(),
  imageCover VARCHAR(500),
  author VARCHAR(50)
);

CREATE TABLE Enrollments (
  enrollmentID INT IDENTITY(1,1) PRIMARY KEY,
  userID INT,
  courseID INT,
  enrolledAt DATETIME DEFAULT GETDATE(),
  progressPercentage INT,
  completeDate DATETIME,
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (courseID) REFERENCES Courses(courseID)
);

CREATE TABLE Assessments (
  assessmentID INT IDENTITY(1,1) PRIMARY KEY,
  assessmentName VARCHAR(255),
  description VARCHAR(MAX),
  targetAudience VARCHAR(50),
  estimatedTimeMinutes INT,
  createdDate DATETIME DEFAULT GETDATE(),
  imageCover VARCHAR(255)
);

CREATE TABLE CourseModules (
  moduleID INT IDENTITY(1,1) PRIMARY KEY,
  courseID INT,
  moduleName VARCHAR(255),
  description VARCHAR(MAX),
  durationMinutes INT,
  content NVARCHAR(MAX),
  videoUrl VARCHAR(500),
  moduleOrder INT,
  FOREIGN KEY (courseID) REFERENCES Courses(courseID)
);

CREATE TABLE AssessmentQuestions (
  questionID INT IDENTITY(1,1) PRIMARY KEY,
  assessmentID INT,
  questionText VARCHAR(MAX),
  FOREIGN KEY (assessmentID) REFERENCES Assessments(assessmentID)
);

CREATE TABLE UserAssessments (
  userAssessmentID INT IDENTITY(1,1) PRIMARY KEY,
  userID INT,
  assessmentID INT,
  completionDate DATETIME DEFAULT GETDATE(),
  riskLevel VARCHAR(50),
  totalScore INT,
  recommendationProvided VARCHAR(MAX),
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (assessmentID) REFERENCES Assessments(assessmentID)
);

CREATE TABLE Articles (
  articleID INT IDENTITY(1,1) PRIMARY KEY,
  createdBy INT,
  articleName VARCHAR(255),
  description VARCHAR(MAX),
  category VARCHAR(50),
  durationMinutes INT,
  creationDate DATETIME DEFAULT GETDATE(),
  imageCover VARCHAR(500),
  content VARCHAR(MAX),
  FOREIGN KEY (createdBy) REFERENCES Users(userID)
);

CREATE TABLE Consultants (
  consultantID INT IDENTITY(1,1) PRIMARY KEY,
  userID INT,
  specialization VARCHAR(255),
  qualification VARCHAR(255),
  yearsExperience INT,
  available BIT,
  imageCover VARCHAR(255)
);

CREATE TABLE Appointments (
  appointmentID INT IDENTITY(1,1) PRIMARY KEY,
  userID INT,
  consultantID INT,
  appointmentDate DATE,
  startTime TIME,
  endTime TIME,
  status VARCHAR(50),
  meetingLink VARCHAR(255),
  note NVARCHAR(MAX),
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (consultantID) REFERENCES Consultants(consultantID)
);

CREATE TABLE QuestionOptions (
  optionID INT IDENTITY(1,1) PRIMARY KEY,
  questionID INT,
  optionValue VARCHAR(255),
  score INT,
  nextQuestionID INT,
  FOREIGN KEY (questionID) REFERENCES AssessmentQuestions(questionID)
);

CREATE TABLE UserAssessmentResponses (
  responseID INT IDENTITY(1,1) PRIMARY KEY,
  userAssessmentID INT,
  questionID INT,
  optionID INT,
  FOREIGN KEY (userAssessmentID) REFERENCES UserAssessments(userAssessmentID),
  FOREIGN KEY (optionID) REFERENCES QuestionOptions(optionID),
  FOREIGN KEY (questionID) REFERENCES AssessmentQuestions(questionID)
);

CREATE TABLE CourseEvaluations (
  evaluationID INT IDENTITY(1,1) PRIMARY KEY,
  courseID INT,
  userID INT,
  rating INT,
  comments VARCHAR(MAX),
  submissionDate DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (courseID) REFERENCES Courses(courseID),
  FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE ModuleCompletions (
  progressID INT IDENTITY(1,1) PRIMARY KEY,
  enrollmentID INT,
  moduleID INT,
  completionStatus BIT,
  FOREIGN KEY (enrollmentID) REFERENCES Enrollments(enrollmentID),
  FOREIGN KEY (moduleID) REFERENCES CourseModules(moduleID)
);

