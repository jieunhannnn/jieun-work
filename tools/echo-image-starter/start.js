// Image Starter — ChatGPT 새 채팅을 열고, 기준 이미지 자동 첨부 + 마스터 프롬프트 자동 입력까지.
// 그 다음 너는 "웃는 모습"처럼 장면만 타이핑하면 됨.
//
// 첫 실행: 크롬이 뜨면 ChatGPT에 직접 로그인 (1회만 — 세션이 저장됨).
// 사용:  node start.js
//
import { chromium } from "playwright";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { BASE_IMAGES, MASTER_PROMPT } from "./config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const USER_DATA_DIR = join(__dirname, "user-data"); // 로그인 세션 저장 위치

const log = (m) => console.log(`\x1b[36m[Image Starter]\x1b[0m ${m}`);

// 베이스 이미지 존재 확인
for (const p of BASE_IMAGES) {
  if (!existsSync(p)) {
    console.error(`\x1b[31m기준 이미지가 없습니다:\x1b[0m ${p}`);
    process.exit(1);
  }
}

import { homedir } from "os";
const DOWNLOAD_DIR = join(homedir(), "Downloads"); // 다운로드 저장 위치

const ctx = await chromium.launchPersistentContext(USER_DATA_DIR, {
  headless: false,
  viewport: { width: 1280, height: 900 },
  acceptDownloads: true,
  downloadsPath: DOWNLOAD_DIR,
  args: ["--disable-blink-features=AutomationControlled"],
});

// 페이지에서 다운로드가 일어나면 실제 Downloads 폴더에 저장
ctx.on("page", (p) => {
  p.on("download", async (d) => {
    const dest = join(DOWNLOAD_DIR, d.suggestedFilename());
    await d.saveAs(dest);
    console.log(`\x1b[32m[저장됨]\x1b[0m ${dest}`);
  });
});

const page = ctx.pages()[0] ?? (await ctx.newPage());

// 현재 페이지의 다운로드도 Downloads 폴더에 저장
page.on("download", async (d) => {
  const dest = join(DOWNLOAD_DIR, d.suggestedFilename());
  await d.saveAs(dest);
  console.log(`\x1b[32m[저장됨]\x1b[0m ${dest}`);
});

log("ChatGPT 여는 중...");
await page.goto("https://chatgpt.com/", { waitUntil: "domcontentloaded" });

// 입력칸(작성기)이 보이면 로그인된 상태. 없으면 로그인 대기.
const composerSel = "#prompt-textarea";
log("로그인 확인 중... (처음이면 크롬에서 직접 로그인하세요. 최대 5분 대기)");
try {
  await page.waitForSelector(composerSel, { timeout: 5 * 60 * 1000 });
} catch {
  console.error("입력칸을 찾지 못했어요. 로그인이 안 됐거나 UI가 바뀌었을 수 있어요.");
  process.exit(1);
}
log("로그인 확인됨.");

// 새 채팅으로 (이미 새 채팅이면 그대로)
try {
  await page.goto("https://chatgpt.com/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector(composerSel, { timeout: 30000 });
} catch {}

// 1) 기준 이미지 자동 첨부 — 숨겨진 file input에 직접 주입
log(`기준 이미지 ${BASE_IMAGES.length}장 첨부 중...`);
const fileInput = page.locator('input[type="file"]').first();
await fileInput.setInputFiles(BASE_IMAGES);

// 업로드 썸네일이 뜰 때까지 잠깐 대기
await page.waitForTimeout(4000);
log("이미지 첨부 완료 (썸네일을 확인하세요).");

// 2) 마스터 프롬프트 자동 입력 — 커서는 끝(Action: 뒤)에 위치
log("마스터 프롬프트 입력 중...");
const composer = page.locator(composerSel);
await composer.click();
// 이전에 남아있던 입력 내용 비우기 (중복 방지)
const mod = process.platform === "darwin" ? "Meta" : "Control";
await page.keyboard.press(`${mod}+A`);
await page.keyboard.press("Backspace");
await page.keyboard.insertText(MASTER_PROMPT);

log("준비 완료! 이제 'Action:' 뒤에 장면만 입력하고 엔터 치세요. (예: 웃는 모습)");
log("이 창을 닫지 마세요. 끝나면 터미널에서 Ctrl+C.");

// 브라우저를 열어둔 채 유지
await new Promise(() => {});
