# BoardRest

**BoardRest**는 JSONL 파일을 로컬 데이터베이스로 사용하는 간단한 게시판(게시글) REST API 서버입니다. Node.js와 Express를 이용하여 빠르게 게시판 기능을 구축할 수 있습니다.

## 디렉토리 구조

```
.
├── README.md          # 프로젝트 설명 문서
├── index.js           # 메인 애플리케이션 코드
├── package-lock.json  # 종속성 잠금 파일
├── package.json       # Node.js 패키지 설정 파일
└── posts.jsonl        # 로컬 데이터 저장 파일 (JSONL 형식)
```

---

## 주요 기능

- **GET /posts**: 모든 게시글 조회
- **POST /posts**: 새 게시글 작성
- **GET /posts/:id**: 특정 게시글 조회
- **PUT /posts/:id**: 게시글 수정
- **DELETE /posts/:id**: 게시글 삭제

---

## 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/username/BoardRest.git
cd BoardRest
```

### 2. 패키지 설치
```bash
npm install
```

### 3. 서버 실행
```bash
node index.js
```
기본 포트는 `3000`으로 설정되어 있습니다.

---

## API 사용 예시

### 1. 모든 게시글 조회
```bash
curl -X GET http://localhost:3000/posts
```

### 2. 새 게시글 작성
```bash
curl -X POST http://localhost:3000/posts \
-H "Content-Type: application/json" \
-d '{"title": "새 글 제목", "content": "새 글 내용"}'
```

### 3. 특정 게시글 조회
```bash
curl -X GET http://localhost:3000/posts/ID_HERE
```

### 4. 게시글 수정
```bash
curl -X PUT http://localhost:3000/posts/ID_HERE \
-H "Content-Type: application/json" \
-d '{"title": "수정된 제목", "content": "수정된 내용"}'
```

### 5. 게시글 삭제
```bash
curl -X DELETE http://localhost:3000/posts/ID_HERE
```

---

## 개발 환경

- Node.js (v14 이상 권장)
- Express (최신 버전 권장)

---

## 라이센스

MIT