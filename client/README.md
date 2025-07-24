# Drug Prevention Support Website

A comprehensive web platform for drug prevention education and support, providing assessments, educational courses, and professional consultations.

## System Overview

This platform serves multiple user types with different access levels and capabilities, focusing on three core functionalities: assessment tools, online learning, and professional consultation services.

## User Roles

- **Guests**: Anonymous users who can take assessments and browse courses
- **Users**: Registered individuals with full access to all features
- **Consultants**: Licensed professionals providing consultation services
- **Staff**: Content managers responsible for course creation and management
- **Managers**: Account administrators managing user accounts and system operations
- **Admins**: Full system access with complete administrative privileges

## Main System Flows

### 1. Assessment Flow

**Purpose**: Standardized drug risk assessment using validated tools like ASSIST (Alcohol, Smoking and Substance Involvement Screening Test) and CRAFFT (Car, Relax, Alone, Forget, Friends, Trouble).

**Key Features**:
- **Branching Logic**: Dynamic question flow based on previous responses
- **Guest Support**: Anonymous users can complete assessments without registration
- **Scoring System**: Automated risk level calculation with personalized recommendations
- **Multiple Assessment Types**: Support for different assessment tools with varying question structures

**Flow Process**:
1. User selects an assessment (ASSIST, CRAFFT, etc.)
2. System displays first question based on assessment structure
3. User answers questions with branching logic determining next questions
4. System calculates total score and determines risk level
5. Personalized recommendations provided based on results
6. Results stored for registered users or made available via session for guests

**Technical Implementation**:
- Questions have defined order and branching rules
- Each option can specify the next question to display
- Support for both linear and conditional question flows
- Real-time score calculation and risk assessment

### 2. Course Flow

**Purpose**: Self-paced online learning modules covering drug prevention, education, and recovery topics.

**Key Features**:
- **Modular Structure**: Courses divided into sequential modules
- **Progress Tracking**: Individual module completion and overall course progress
- **Guest Access**: Anonymous browsing and enrollment capabilities
- **Content Management**: Staff-controlled course creation and maintenance
- **Evaluation System**: User feedback and rating collection

**Flow Process**:
1. User browses available courses by category or target audience
2. Enrollment in selected courses (automatic for guests, tracked for registered users)
3. Sequential module completion with content including text, videos, and resources
4. Progress tracking with completion percentages
5. Course evaluation and feedback submission
6. Certificate or completion acknowledgment (for registered users)

**Technical Implementation**:
- Hierarchical course-module structure
- Enrollment tracking with status management
- Module completion timestamps and progress calculation
- Content versioning and active status management
- User evaluation linked to specific enrollments

### 3. Consultation Booking Flow

**Purpose**: Professional consultation scheduling with qualified specialists.

**Key Features**:
- **Consultant Profiles**: Detailed specialist information including qualifications and experience
- **Flexible Scheduling**: Real-time availability and booking management
- **Virtual Meetings**: Integrated video conferencing links
- **Appointment Management**: Booking confirmation, rescheduling, and cancellation
- **Specialization Matching**: Connect users with appropriate specialists

**Flow Process**:
1. User searches for consultants by specialization or availability
2. View consultant profiles with qualifications and experience details
3. Select available time slots from consultant's schedule
4. Book appointment with automatic confirmation
5. Receive meeting details and video conference links
6. Attend scheduled consultation
7. Follow-up and rescheduling options available

**Technical Implementation**:
- Consultant availability management system
- Appointment scheduling with conflict prevention
- Integration with video conferencing platforms
- Status tracking (scheduled, completed, cancelled, rescheduled)
- Notification system for appointment reminders

## Data Architecture Highlights

**Assessment System**:
- Flexible question-option-scoring structure
- Support for complex branching logic
- Anonymous and registered user response tracking
- Multiple assessment type support

**Course Management**:
- Hierarchical content organization
- Progress tracking at module and course levels
- Enrollment management for different user types
- Content versioning and management controls

**Consultation Platform**:
- Professional credential tracking
- Availability and scheduling management
- Appointment lifecycle management
- Communication integration

## Security and Privacy

- **Guest Privacy**: Anonymous assessment completion without data retention requirements
- **User Authentication**: Secure login system with role-based access control
- **Data Protection**: Encrypted storage of sensitive assessment results and personal information
- **Professional Standards**: Consultant verification and credential management

## System Benefits

- **Accessibility**: Multiple access levels accommodate different user comfort levels
- **Comprehensive Support**: Complete prevention-to-treatment resource ecosystem
- **Evidence-Based**: Utilizes validated assessment tools and proven educational methods
- **Professional Integration**: Direct access to qualified consultation services
- **Progress Tracking**: Detailed analytics for individual progress and system effectiveness

## Target Audiences

- **Individuals**: Personal risk assessment and education
- **Educational Institutions**: Student screening and education programs
- **Healthcare Providers**: Screening tool integration and patient resources
- **Prevention Programs**: Community-based intervention and education initiatives