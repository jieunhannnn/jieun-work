// Image Starter 설정 — 여기만 고치면 됩니다.
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// 자동 첨부할 기준(베이스) 이미지 — base/ 폴더 안의 파일들
export const BASE_IMAGES = [
  join(__dirname, "base", "echo-base-front.png"),
  join(__dirname, "base", "echo-base-run.png"),
  join(__dirname, "base", "echo-base-cheer.png"),
];

// 채팅에 자동 입력될 마스터 프롬프트. 맨 끝 "Action: " 뒤에 커서가 놓입니다.
// 너는 여기서 "웃는 모습"처럼 장면만 타이핑하고 엔터 치면 됨.
export const MASTER_PROMPT = `이 캐릭터 'Echo'의 상세 가이드를 먼저 읽어줘:
https://github.com/jieunhannnn/jieun-work/blob/main/docs/character-echo/20-echo-character-bible.md

그리고 첨부한 이미지 3장이 이 캐릭터의 절대 기준(모델시트)이야.
새 토끼를 만들지 말고, 첨부 이미지와 100% 동일한 Echo가 다른 자세/표정을 연기하는 모습을 그려줘.
글 설명과 첨부 이미지가 충돌하면 무조건 첨부 이미지를 따라. (가이드 링크의 비율·컬러·금지사항을 모두 지킬 것)

아래 Action으로 그려줘.

Action: `;
