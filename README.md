# 🎓 Study Partner Matching Platform (Backend)

> Một nền tảng kết nối người học dựa trên môn học, vị trí, lịch trình và phong cách học tập, tích hợp Chat Real-time và Video Call.

![NestJS](https://img.shields.io/badge/backend-NestJS-red)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![Socket.io](https://img.shields.io/badge/realtime-Socket.io-black)
![WebRTC](https://img.shields.io/badge/video-WebRTC-green)

## 📖 Giới thiệu

Dự án này là Backend API được xây dựng bằng **NestJS**, cung cấp logic nghiệp vụ cho ứng dụng tìm bạn học (Study Partner). Hệ thống bao gồm: Authentication, Quản lý Profile, Thuật toán Matching (Vuốt trái/phải), Chat thời gian thực và Video Call đa nền tảng.

## 🧩 Luồng hoạt động (User Flow)

```mermaid
graph TB
    Start((Start)) --> LoginCheck{Has Account?}
    
    %% Registration Flow
    LoginCheck -- No --> Register[Register API]
    Register --> CreateAcc[NestJS: Create User Record]
    CreateAcc --> InputProfile
    
    %% Login Flow
    LoginCheck -- Yes --> Login[Login API]
    Login --> AuthGuard[NestJS: Validate Credentials]
    AuthGuard -- Invalid --> Error((Error 401))
    
    AuthGuard -- Valid --> CheckProfile{Profile Completed?}
    
    %% Profile Completion
    CheckProfile -- No --> InputProfile[Update Profile Info]
    InputProfile --> ValidateDTO[NestJS: Validate DTO<br/>Subjects, Location, Schedule]
    ValidateDTO -- Fail --> InputProfile
    ValidateDTO -- Pass --> SaveDB[(DB: Save Profile)]
    
    CheckProfile -- Yes --> Dashboard[Dashboard]
    SaveDB --> Dashboard
    
    %% Dashboard Actions
    Dashboard --> BrowsePartners[Browse Study Partners]
    Dashboard --> ViewMatches[View My Matches]
    Dashboard --> EditProfile[Edit Profile]
    
    %% Browsing & Matching
    BrowsePartners --> MatchAlgo[NestJS: Matching Algorithm<br/>Filter by: Subjects, Location,<br/>Schedule, Learning Style]
    MatchAlgo --> DisplayCards[Display Partner Cards<br/>Swipe UI]
    
    DisplayCards --> SwipeAction{User Action}
    SwipeAction -- Swipe Left --> NextCard[Next Card]
    SwipeAction -- Swipe Right --> LikeAction[Send Like]
    
    LikeAction --> CheckMutual{Partner Liked Back?}
    CheckMutual -- No --> StoreDB[(Store Like in DB)]
    StoreDB --> NextCard
    
    CheckMutual -- Yes --> MatchSuccess[🎉 It's a Match!]
    MatchSuccess --> NotifyBoth[Send Push Notification<br/>to Both Users]
    NotifyBoth --> MatchedFlow
    
    NextCard --> DisplayCards
    
    %% Matched Partners View
    ViewMatches --> MatchList[Display Matched Partners List]
    MatchList --> SelectMatch{Select a Match}
    SelectMatch --> MatchedFlow
    
    %% Post-Match Interaction
    MatchedFlow[Match Detail Screen]
    MatchedFlow --> ActionChoice{Choose Action}
    
    %% Chat Flow
    ActionChoice -- Chat --> OpenChat[Open Chat Room]
    OpenChat --> ChatAPI[NestJS: WebSocket/Socket.io]
    ChatAPI --> ChatDB[(Store Messages in DB)]
    ChatDB --> ChatUI[Real-time Chat Interface]
    ChatUI --> SendMsg{Send Message/File}
    SendMsg --> ChatAPI
    
    %% Video Call Options
    ActionChoice -- Video Call --> CallOptions{Select Video Option}
    
    %% Option 1: Custom WebRTC (Default)
    CallOptions -- Custom WebRTC<br/>Primary --> InitWebRTC[Initialize WebRTC Connection]
    InitWebRTC --> SignalingServer[NestJS: Signaling Server<br/>Socket.io for SDP/ICE]
    SignalingServer --> P2PConnection[Establish P2P Connection]
    P2PConnection --> VideoUI[Custom Video Call UI<br/>Mute, Camera, Screen Share]
    
    %% Option 2: Third-party SDK (Backup)
    CallOptions -- Agora/Twilio SDK<br/>Backup 1 --> InitSDK[Initialize SDK]
    InitSDK --> SDKToken[NestJS: Generate Access Token]
    SDKToken --> JoinSDKRoom[Join Video Room]
    JoinSDKRoom --> VideoUI
    
    %% Option 3: Google Meet (Backup)
    CallOptions -- Google Meet<br/>Backup 2 --> CreateMeet[NestJS: Google Calendar API]
    CreateMeet --> MeetLink[Generate Meet Link]
    MeetLink --> OpenMeet[Open Google Meet in Browser]
    
    %% Post Call Actions
    VideoUI --> EndCall{End Call}
    EndCall --> CallLog[(Store Call History in DB)]
    CallLog --> Feedback[Rate Partner & Session]
    Feedback --> FeedbackDB[(Store Feedback)]
    
    %% Additional Actions
    MatchedFlow --> ScheduleSession[Schedule Study Session]
    ScheduleSession --> CalendarAPI[NestJS: Calendar Integration]
    CalendarAPI --> SessionDB[(Store Session in DB)]
    
    MatchedFlow --> UnmatchOption[Unmatch Partner]
    UnmatchOption --> ConfirmUnmatch{Confirm?}
    ConfirmUnmatch -- Yes --> RemoveMatch[(Remove Match from DB)]
    ConfirmUnmatch -- No --> MatchedFlow
    
    %% Return to Dashboard
    ChatUI --> BackDash[Back to Dashboard]
    VideoUI --> BackDash
    Feedback --> BackDash
    RemoveMatch --> BackDash
    BackDash --> Dashboard
    
    EditProfile --> InputProfile
    
    style MatchSuccess fill:#90EE90
    style VideoUI fill:#87CEEB
    style ChatUI fill:#FFB6C1
    style Dashboard fill:#FFE4B5
```

```mermaid
graph LR
    Dashboard((Dashboard)) --> ClickFind[User: Click 'Find Partner']
    
    ClickFind --> InitParams[Initialize Search:\nMin Score = 70\nTarget = 20 candidates]
    
    InitParams --> QueryDB[Query Database:\nFilter by criteria\nCalculate match scores]
    
    QueryDB --> CheckCount{Count >= 20?}
    
    CheckCount -- Yes --> ReturnList[Return Top 20\nSorted by Score]
    
    CheckCount -- No --> CheckMinScore{Min Score > 50?}
    
    CheckMinScore -- Yes --> LowerThreshold[Lower Min Score:\nScore -= 10]
    LowerThreshold --> QueryDB
    
    CheckMinScore -- No --> ReturnAvailable[Return All Available\nSorted by Score]
    
    ReturnList --> ViewProfile[User: View Candidate Profile]
    ReturnAvailable --> ViewProfile
    
    ViewProfile --> SendReq{Send Request?}
    
    SendReq -- No --> ViewProfile
    SendReq -- Yes --> CreateReq[NestJS: Create Request\nStatus: PENDING]
    
    CreateReq --> Notify[Socket: Notify Receiver]
    Notify --> ReceiverAction{Receiver Action}
    
    ReceiverAction -- Reject --> UpdateStatusRej[(DB: Update REJECTED)]
    UpdateStatusRej --> EndFlow((End))
    
    ReceiverAction -- Accept --> UpdateStatusAcc[(DB: Update ACCEPTED)]
    UpdateStatusAcc --> CreateRoom[NestJS: Create Chat Room]
    CreateRoom --> Connected((Connected))
```

```mermaid
graph TB
    Start((Start)) --> Dashboard[Dashboard]
    
    %% Main Menu
    Dashboard --> ChooseFeature{Choose Feature}
    ChooseFeature -- Resource Sharing --> ResourceFlow
    ChooseFeature -- Auto Quiz --> QuizFlow
    
    %% ============ RESOURCE SHARING FLOW ============
    ResourceFlow[Resource Sharing Hub]
    ResourceFlow --> ResourceAction{Select Action}
    
    %% Upload Resource
    ResourceAction -- Upload Resource --> SelectFile[Select File/Link]
    SelectFile --> FileType{Resource Type}
    
    FileType -- PDF/DOC --> UploadFile[Upload File<br/>Max 50MB]
    FileType -- Video Link --> AddLink[Add YouTube/Drive Link]
    FileType -- Study Note --> CreateNote[Create Text Note]
    
    UploadFile --> AddMetadata[Add Metadata]
    AddLink --> AddMetadata
    CreateNote --> AddMetadata
    
    AddMetadata --> FillInfo[Fill Information:<br/>- Title<br/>- Subject<br/>- Tags<br/>- Description]
    FillInfo --> ValidateResource[NestJS: Validate Input]
    ValidateResource -- Fail --> FillInfo
    ValidateResource -- Pass --> ScanFile{Scan File Safety}
    
    ScanFile -- Malware Detected --> RejectFile[❌ File Rejected]
    RejectFile --> SelectFile
    
    ScanFile -- Safe --> SaveResource[(DB: Store Resource)]
    SaveResource --> AIAnalyze[AI: Analyze Content<br/>Extract Keywords & Topics]
    AIAnalyze --> UploadSuccess[✅ Upload Successful]
    UploadSuccess --> NotifyFollowers[Notify Followers/Matches]
    NotifyFollowers --> ResourceFlow
    
    %% Browse Resources
    ResourceAction -- Browse Resources --> FilterResource[Filter Resources]
    FilterResource --> ApplyFilter[Apply Filters:<br/>- Subject<br/>- Type<br/>- Rating<br/>- Date]
    ApplyFilter --> SearchAPI[NestJS: Search API<br/>Full-text Search]
    SearchAPI --> DisplayList[Display Resource List<br/>with Preview]
    
    DisplayList --> SelectResource{Select Resource}
    SelectResource --> ViewDetail[View Resource Detail]
    
    ViewDetail --> ResourceOptions{Choose Action}
    ResourceOptions -- Download/View --> AccessFile[Access File]
    ResourceOptions -- Save to Library --> SaveLibrary[(Save to My Library)]
    ResourceOptions -- Share --> ShareResource[Share with Matches]
    ResourceOptions -- Rate --> RateResource[Rate & Review]
    
    AccessFile --> TrackView[(Track View Count)]
    RateResource --> UpdateRating[(Update Rating in DB)]
    ShareResource --> SendNotif[Send Notification]
    
    SaveLibrary --> MyLibrary[My Library]
    TrackView --> MyLibrary
    UpdateRating --> ResourceFlow
    SendNotif --> ResourceFlow
    
    %% My Library
    ResourceAction -- My Library --> MyLibrary
    MyLibrary --> LibraryView[View Saved Resources]
    LibraryView --> OrganizeLib[Organize by:<br/>- Subject<br/>- Date<br/>- Custom Folders]
    OrganizeLib --> ResourceFlow
    
    %% ============ AUTO-GENERATED QUIZZES FLOW ============
    QuizFlow[Quiz Generator]
    QuizFlow --> QuizOption{Select Option}
    
    %% Generate New Quiz
    QuizOption -- Generate New Quiz --> SelectSource{Choose Source}
    
    SelectSource -- From Uploaded Resource --> PickResource[Select Resource from Library]
    SelectSource -- From Topic/Subject --> InputTopic[Input Topic/Subject]
    SelectSource -- Paste Content --> PasteText[Paste Text/Notes]
    
    PickResource --> ConfigQuiz
    InputTopic --> ConfigQuiz
    PasteText --> ConfigQuiz
    
    ConfigQuiz[Configure Quiz Settings]
    ConfigQuiz --> SetParams[Set Parameters:<br/>- Number of Questions<br/>- Difficulty Level<br/>- Question Types<br/>- Time Limit]
    SetParams --> GenerateAPI[NestJS: Call AI Service<br/>OpenAI/Gemini API]
    
    GenerateAPI --> AIProcess[AI Processing:<br/>1. Extract Key Concepts<br/>2. Generate Questions<br/>3. Create Distractors<br/>4. Add Explanations]
    
    AIProcess --> QuizReady[✅ Quiz Generated]
    QuizReady --> PreviewQuiz[Preview Questions]
    
    PreviewQuiz --> EditOption{Want to Edit?}
    EditOption -- Yes --> EditQuiz[Edit Questions:<br/>- Modify Question<br/>- Change Options<br/>- Update Answer<br/>- Add Explanation]
    EditQuiz --> PreviewQuiz
    
    EditOption -- No --> SaveQuiz[(Save Quiz to DB)]
    SaveQuiz --> QuizActions{Choose Action}
    
    QuizActions -- Take Quiz Now --> StartQuiz
    QuizActions -- Schedule Quiz --> ScheduleQuiz[Set Reminder]
    QuizActions -- Share Quiz --> ShareQuiz[Share with Study Partners]
    QuizActions -- Save for Later --> QuizLibrary
    
    ScheduleQuiz --> NotifySchedule[Push Notification at Scheduled Time]
    ShareQuiz --> SendQuizLink[Send Quiz Link]
    NotifySchedule --> QuizFlow
    SendQuizLink --> QuizFlow
    
    %% Take Quiz
    QuizOption -- My Quizzes --> QuizLibrary[Quiz Library]
    QuizLibrary --> FilterQuiz[Filter by:<br/>- Subject<br/>- Difficulty<br/>- Date Created<br/>- Completed/Pending]
    FilterQuiz --> SelectQuiz[Select Quiz]
    SelectQuiz --> StartQuiz[Start Quiz]
    
    StartQuiz --> QuizUI[Quiz Interface<br/>Timer, Progress Bar]
    QuizUI --> AnswerQ{Answer Question}
    AnswerQ -- Next --> NextQuestion[Load Next Question]
    AnswerQ -- Flag --> FlagQuestion[Flag for Review]
    AnswerQ -- Submit --> SubmitQuiz[Submit Quiz]
    
    NextQuestion --> QuizUI
    FlagQuestion --> QuizUI
    
    SubmitQuiz --> GradeQuiz[AI: Auto-grade Quiz]
    GradeQuiz --> ShowResults[Show Results:<br/>- Score<br/>- Correct/Incorrect<br/>- Explanations<br/>- Time Taken]
    
    ShowResults --> SaveScore[(Store Score in DB)]
    SaveScore --> Analytics[Generate Analytics:<br/>- Performance Trends<br/>- Weak Areas<br/>- Improvement Suggestions]
    
    Analytics --> ResultOptions{Choose Action}
    ResultOptions -- Review Answers --> ReviewMode[Review Mode<br/>See Explanations]
    ResultOptions -- Retake Quiz --> StartQuiz
    ResultOptions -- View Stats --> StatsView[View Performance Stats]
    ResultOptions -- Generate Similar --> AIRecommend[AI: Recommend Similar Quizzes]
    
    ReviewMode --> QuizFlow
    StatsView --> QuizFlow
    AIRecommend --> QuizFlow
    
    %% Shared Quizzes
    QuizOption -- Shared with Me --> SharedQuizzes[View Shared Quizzes]
    SharedQuizzes --> SelectShared[Select Quiz]
    SelectShared --> StartQuiz
    
    %% Challenge Friends
    QuizOption -- Challenge Mode --> ChallengeSetup[Setup Challenge]
    ChallengeSetup --> InvitePlayers[Invite Study Partners]
    InvitePlayers --> LiveQuiz[Live Quiz Battle<br/>Real-time Leaderboard]
    LiveQuiz --> BattleResult[Battle Results<br/>Winner Announcement]
    BattleResult --> Leaderboard[(Update Global Leaderboard)]
    Leaderboard --> QuizFlow
    
    %% Return to Dashboard
    ResourceFlow --> BackDash[Back to Dashboard]
    QuizFlow --> BackDash
    BackDash --> Dashboard
    
    style UploadSuccess fill:#90EE90
    style QuizReady fill:#90EE90
    style ShowResults fill:#FFD700
    style LiveQuiz fill:#FF69B4
    style ResourceFlow fill:#87CEEB
    style QuizFlow fill:#DDA0DD
    style Dashboard fill:#FFE4B5
```

```mermaid
graph LR
    Start((Start)) --> InitCall[Actor A: Click Video Call]
    InitCall --> ServerCheck[NestJS Server: Check Partner Online]
    
    ServerCheck --> IsOnline{Is Partner Online?}
    
    IsOnline -- No --> SaveNotif[Save Missed Call Notification]
    SaveNotif --> End((End))
    
    IsOnline -- Yes --> EmitSignal[Socket: Emit 'incoming-call']
    EmitSignal --> UserBAction{Partner B Response}
    
    UserBAction -- Reject/Busy --> EmitReject[Socket: Emit 'call-rejected']
    EmitReject --> End
    
    UserBAction -- Accept --> Handshake[WebRTC Handshake: Offer/Answer/ICE]
    
    Handshake --> P2P[P2P Connection Established]
    P2P --> InCall{In-Call Actions}
    
    %% Loop Logic cho các hành động trong cuộc gọi
    InCall -- Chat Message --> SocketChat[Socket: Send Message]
    SocketChat --> InCall
    
    InCall -- Click Share Screen --> GetMedia[Get Display Media Stream]
    GetMedia --> ReplaceTrack[WebRTC: Replace Camera Track with Screen Track]
    ReplaceTrack --> InCall
    
    InCall -- Stop Sharing --> GetCam[Get Camera Stream]
    GetCam --> RevertTrack[WebRTC: Revert to Camera Track]
    RevertTrack --> InCall
    
    InCall -- Hang up --> CloseConn[Close PeerConnection]
    CloseConn --> End
```

## 📂 Cấu trúc dự án (Project Structure)

Dự án áp dụng kiến trúc **Modular** của NestJS:

```plaintext
apps/server
├── src
│   ├── app.module.ts
│   ├── main.ts
│   │
│   ├── common/                  # Các tiện ích chung
│   │   ├── decorators/          # @CurrentUser()
│   │   ├── filters/             # Global Exception Filters
│   │   └── guards/              # AuthGuard (Flow: Login -> AuthGuard)
│   │
│   ├── modules/                 # CHIA THEO FLOW CHART
│   │   │
│   │   ├── auth/                # (Flow: LoginCheck, Register, Login)
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts  # Xử lý logic đăng nhập/đăng ký
│   │   │   └── strategies/      # JWT Strategy
│   │   │
│   │   ├── users/               # (Flow: CreateAcc, InputProfile, ValidateDTO)
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts # CRUD Profile
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   └── update-profile.dto.ts # Validate: Subjects, Location, Schedule
│   │   │   └── entities/        # User Entity
│   │   │
│   │   ├── matching/            # (Flow: BrowsePartners, MatchAlgo, SwipeAction)
│   │   │   ├── matching.controller.ts # API: Get Recommendations, Swipe
│   │   │   ├── matching.service.ts    # Logic: Matching Algorithm (Filter logic)
│   │   │   ├── events/          # Xử lý sự kiện "It's a Match!"
│   │   │   └── entities/        # Like, Match Record
│   │   │
│   │   ├── chat/                # (Flow: OpenChat, WebSocket, StoreDB)
│   │   │   ├── chat.gateway.ts  # WebSocket Gateway (Socket.io)
│   │   │   ├── chat.service.ts  # Lưu/Lấy tin nhắn từ DB
│   │   │   └── entities/        # Message, ChatRoom
│   │   │
│   │   ├── video-call/          # (Flow: Video Call Options)
│   │   │   ├── video-call.controller.ts
│   │   │   ├── gateways/
│   │   │   │   └── signaling.gateway.ts # (Option 1: Custom WebRTC Signaling)
│   │   │   └── strategies/      # Strategy Pattern cho các loại Call
│   │   │       ├── webrtc.strategy.ts   # P2P logic
│   │   │       ├── agora.strategy.ts    # (Option 2: SDK Token Gen)
│   │   │       └── google-meet.strategy.ts # (Option 3: Google Calendar API)
│   │   │
│   │   ├── scheduling/          # (Flow: ScheduleSession, CalendarAPI)
│   │   │   ├── scheduling.service.ts   # Tích hợp Calendar
│   │   │   └── entities/               # StudySession
│   │   │
│   │   └── notifications/       # (Flow: NotifyBoth)
│   │       └── notifications.service.ts # Push Notification (Firebase/OneSignal)
│   │
│   └── database/                # Config kết nối DB
│
├── .env                         # Chứa API Keys (Google, Agora, DB)
└── package.json
```

## 🛠 Tech Stack

*   **Framework:** NestJS (Node.js)
*   **Language:** TypeScript
*   **Database:** PostgreSQL (User/Match) & MongoDB (Message/Logs)
*   **Real-time:** Socket.io
*   **API Docs:** Swagger UI

## 🚀 Cài đặt và Chạy ứng dụng

### 1. Yêu cầu (Prerequisites)
*   Node.js (v16+)
*   Docker (để chạy Database)

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình môi trường (.env)
Tạo file `.env` tại thư mục gốc:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_NAME=study_partner
JWT_SECRET=my_super_secret
```

### 4. Chạy ứng dụng
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 📚 API Documentation

Truy cập Swagger UI để xem tài liệu API:
👉 **URL:** `http://localhost:3000/api`

## 💡 Chi tiết các Modules chính

1.  **Matching Engine:** Filter user dựa trên `Subjects`, `Location` (GeoSpatial), và `Schedule`.
2.  **Video Call Strategies:** Hỗ trợ Strategy Pattern cho WebRTC (P2P), Agora SDK, hoặc Google Meet.
3.  **Chat:** Sử dụng Socket.io Namespace/Room để quản lý phòng chat riêng tư.

## 📄 License
Distributed under the MIT License.