# Echo Image Starter

ChatGPT 새 채팅을 열고 **기준 이미지 3장 자동 첨부 + 마스터 프롬프트 자동 입력**까지 해주는 브라우저 자동화 도구.
그 다음 사용자는 `Action:` 뒤에 장면 한 줄(예: `회의 중 고민하는 표정`)만 입력하면 일관된 Echo가 생성된다.

> 별도 이미지 생성 API 없이 쓰던 ChatGPT 웹을 그대로 활용하면서, 매번 이미지를 손으로 첨부하던 번거로움만 없앤 도구.

## 설치 (최초 1회)

```bash
cd tools/echo-image-starter
npm install
npx playwright install chromium
```

## 실행

- **간편**: `Echo 시작.command` 더블클릭 (터미널 불필요)
- 또는 터미널: `npm run echo`

처음 실행 시 크롬에서 ChatGPT에 **직접 로그인**하면 세션이 `user-data/`에 저장되어 다음부터 자동 로그인된다.

## 커스터마이즈

`config.js`만 수정하면 된다.
- `BASE_IMAGES` — 자동 첨부할 기준 이미지 (`base/` 폴더)
- `MASTER_PROMPT` — 자동 입력할 마스터 프롬프트 (끝의 `Action: ` 뒤에 커서가 놓임)

## 주의

- 브라우저 자동화(Playwright)라 ChatGPT UI가 바뀌면 셀렉터(`#prompt-textarea`, `input[type=file]`)가 깨질 수 있다 → 그때 `start.js` 수정 필요.
- `node_modules/`, `user-data/`(로그인 세션)는 git에 올리지 않는다 (`.gitignore`).
