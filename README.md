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
    
    %% Registration
    LoginCheck -- No --> Register[Register API]
    Register --> CreateAcc[NestJS: Create User]
    CreateAcc --> InputProfile[Input Profile]
    
    %% Login
    LoginCheck -- Yes --> Login[Login API]
    Login --> AuthGuard[NestJS: Validate]
    
    AuthGuard -- Valid --> CheckProfile{Profile Completed?}
    CheckProfile -- No --> InputProfile
    InputProfile --> ValidateDTO[Validate DTO]
    ValidateDTO -- Pass --> SaveDB[(DB: Save Profile)]
    CheckProfile -- Yes --> Dashboard
    SaveDB --> Dashboard
    
    %% Matching
    Dashboard --> BrowsePartners
    BrowsePartners --> MatchAlgo[Matching Algo]
    MatchAlgo --> DisplayCards
    DisplayCards --> SwipeAction{User Action}
    
    SwipeAction -- Right --> LikeAction
    LikeAction --> CheckMutual{Mutual Like?}
    CheckMutual -- Yes --> MatchSuccess[🎉 It's a Match!]
    
    %% Interaction
    MatchSuccess --> MatchedFlow
    MatchedFlow --> ActionChoice{Chat or Video?}
    ActionChoice -- Chat --> ChatAPI[WebSocket]
    ActionChoice -- Video --> CallOptions{Select Option}
    CallOptions -- Custom WebRTC --> InitWebRTC[Signaling Server]
```

## 📂 Cấu trúc dự án (Project Structure)

Dự án áp dụng kiến trúc **Modular** của NestJS:

```plaintext
src/
├── common/                 # Shared Guards, Filters, Decorators
├── database/               # Database Configuration
├── modules/
│   ├── auth/               # Login, Register, JWT Strategy
│   ├── users/              # User Profile, DTO Validation
│   ├── matching/           # Matching Algorithm, Swipe Logic
│   ├── chat/               # WebSocket Gateway, Message Store
│   ├── video-call/         # Signaling Server, Meet API, SDK Integration
│   ├── scheduling/         # Calendar Integration
│   └── notifications/      # Push Notification Service
├── app.module.ts
└── main.ts
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