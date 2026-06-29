# Image Starter 만들기 — AI에게 그대로 시키는 빌드 명세서

> **사용법:** 이 파일 전체를 복사해서 본인의 AI 코딩 도구(Claude Code, Codex, Cursor 등)에 붙여넣고
> "이 명세대로 만들어줘"라고 하면 된다. 그러면 아래 파일들이 그대로 생성된다.
> 캐릭터/이미지/프롬프트는 `config.js`만 바꾸면 본인 것으로 교체 가능하다.

---

## 무엇을 만드는가

ChatGPT(무료 웹) 새 채팅을 자동으로 열고 **기준 이미지 첨부 + 마스터 프롬프트 입력까지** 자동으로 해주는 도구.
그 다음 사용자는 입력칸 끝의 `Action:` 뒤에 장면 한 줄(예: `웃는 모습`)만 입력하면 캐릭터가 일관되게 생성된다.

**왜?** 유료 이미지 API 없이 무료 ChatGPT 웹을 그대로 쓰되, 매번 이미지를 손으로 첨부·프롬프트를 복붙하던 번거로움만 제거한다.
**방식:** OpenAI 공식 기능이 아니라 **브라우저 자동화(Playwright)** — 스크립트가 실제 크롬을 조작한다.

---

## 사전 준비 (사람이 1회)

```bash
mkdir image-starter && cd image-starter
npm init -y
npm pkg set type=module
npm install playwright
npx playwright install chromium
```

그리고 `base/` 폴더에 기준 이미지 1~4장을 넣는다.

---

## 파일 1: `config.js`

> 여기만 본인 캐릭터에 맞게 바꾸면 된다. (이미지 경로 + 마스터 프롬프트)

```js
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// 자동 첨부할 기준(베이스) 이미지 — base/ 폴더 안의 파일들
export const BASE_IMAGES = [
  join(__dirname, "base", "ref-1.png"),
  join(__dirname, "base", "ref-2.png"),
  join(__dirname, "base", "ref-3.png"),
];

// 채팅에 자동 입력될 마스터 프롬프트. 맨 끝 "Action: " 뒤에 커서가 놓인다.
export const MASTER_PROMPT = `(여기에 캐릭터 가이드/규칙을 적는다. 상세 가이드가 깃 등에 있으면 링크로 줘도 됨 — AI는 텍스트 링크는 읽는다.)

첨부한 이미지들이 이 캐릭터의 절대 기준(모델시트)이야.
새 캐릭터를 만들지 말고, 첨부 이미지와 100% 동일한 캐릭터가 다른 자세/표정을 연기하는 모습을 그려줘.
글 설명과 첨부 이미지가 충돌하면 무조건 첨부 이미지를 따라.

아래 Action으로 그려줘.

Action: `;
```

---

## 파일 2: `start.js`

```js
import { chromium } from "playwright";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { BASE_IMAGES, MASTER_PROMPT } from "./config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const USER_DATA_DIR = join(__dirname, "user-data"); // 로그인 세션 저장 위치

const log = (m) => console.log(`\x1b[36m[Image Starter]\x1b[0m ${m}`);

for (const p of BASE_IMAGES) {
  if (!existsSync(p)) {
    console.error(`기준 이미지가 없습니다: ${p}`);
    process.exit(1);
  }
}

const ctx = await chromium.launchPersistentContext(USER_DATA_DIR, {
  headless: false,
  viewport: { width: 1280, height: 900 },
  args: ["--disable-blink-features=AutomationControlled"],
});

const page = ctx.pages()[0] ?? (await ctx.newPage());

log("ChatGPT 여는 중...");
await page.goto("https://chatgpt.com/", { waitUntil: "domcontentloaded" });

const composerSel = "#prompt-textarea";
log("로그인 확인 중... (처음이면 크롬에서 직접 로그인하세요. 최대 5분 대기)");
try {
  await page.waitForSelector(composerSel, { timeout: 5 * 60 * 1000 });
} catch {
  console.error("입력칸을 찾지 못했어요. 로그인이 안 됐거나 UI가 바뀌었을 수 있어요.");
  process.exit(1);
}
log("로그인 확인됨.");

try {
  await page.goto("https://chatgpt.com/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector(composerSel, { timeout: 30000 });
} catch {}

log(`기준 이미지 ${BASE_IMAGES.length}장 첨부 중...`);
const fileInput = page.locator('input[type="file"]').first();
await fileInput.setInputFiles(BASE_IMAGES);
await page.waitForTimeout(4000);
log("이미지 첨부 완료.");

log("마스터 프롬프트 입력 중...");
const composer = page.locator(composerSel);
await composer.click();
// 이전에 남아있던 입력 비우기 (중복 방지)
const mod = process.platform === "darwin" ? "Meta" : "Control";
await page.keyboard.press(`${mod}+A`);
await page.keyboard.press("Backspace");
await page.keyboard.insertText(MASTER_PROMPT);

log("준비 완료! 'Action:' 뒤에 장면만 입력하고 엔터 치세요.");
log("이 창을 닫지 마세요. 끝나면 터미널에서 Ctrl+C.");

await new Promise(() => {});
```

---

## 파일 3: `Echo 시작.command` (맥에서 더블클릭 실행용 — 선택)

```bash
#!/bin/bash
cd "$(dirname "$0")"
pkill -f "node start.js" 2>/dev/null
sleep 1
rm -f user-data/Singleton* 2>/dev/null
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
node start.js
```

만든 뒤 실행권한 부여: `chmod +x "Echo 시작.command"`
(윈도우면 이 파일 대신 `node start.js`로 실행)

---

## 실행

- 맥: `Echo 시작.command` 더블클릭 (또는 `node start.js`)
- **첫 실행 시** 크롬에서 ChatGPT에 직접 로그인 → 세션이 `user-data/`에 저장되어 다음부턴 자동.

---

## 동작 흐름

1. 로그인된 크롬으로 chatgpt.com 새 채팅 열기
2. `base/`의 기준 이미지 자동 첨부
3. `config.js`의 마스터 프롬프트 자동 입력 (끝의 `Action: `에 커서)
4. 사용자가 `웃는 모습` 같은 장면 한 줄 입력 → 엔터 → 생성

---

## 주의 / 한계

- ChatGPT UI(`#prompt-textarea`, `input[type=file]`)가 바뀌면 셀렉터가 깨질 수 있다 → `start.js`에서 수정.
- 브라우저 자동화는 OpenAI 공식 지원이 아니다(개인 계정 본인 사용 권장).
- `node_modules/`, `user-data/`(로그인 세션)는 공유/커밋하지 말 것.
- 팀 배포·상시 서비스가 목적이면 유료 이미지 API가 더 안정적.
