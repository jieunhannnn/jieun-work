# 문서 역할 안내

이 레포의 문서가 각각 어떤 역할인지 정리한다.

| 경로 | 역할 |
| --- | --- |
| `logs/YYYY/MM/*.md` | 날짜별 날것 작업 기록 (하루 단위) |
| `templates/` | 매일 복사해서 쓰는 워크로그 틀 |
| `docs/<프로젝트>/NN-*.md` | 프로젝트별로 묶은, 반복 패턴을 정제한 주제 문서 |

## 폴더 규칙

- `docs/` 아래는 **프로젝트 단위 폴더**로 나눈다 (폴더명 = kebab-case, 번호 없음)
- 폴더 안 문서는 `NN-주제.md` (10/20/30… 식으로 띄워서 사이 끼워넣기 여유)
- 새 프로젝트가 생기면 폴더를 추가하고 이 표에 등록한다

## 승격 규칙

- 로그에서 같은 판단·실수가 반복되면 → 해당 프로젝트 폴더의 주제 문서로 정리
- 로그는 "그날 무슨 일이 있었나", 문서는 "다음에 어떻게 하면 되나"

## 프로젝트 목록

| 프로젝트 폴더 | 문서 | 내용 |
| --- | --- | --- |
| `thumbnail-automation/` | `10-pipeline.md` | 운영 썸네일 자동화 (드라이브→Apps Script→Figma) |
| `design-system/` | `10-component-naming.md` | 피그마 마스터 컴포넌트 네이밍 규칙 |
| `character-echo/` | `00-overview.md` | Echo 이미지 생성봇 프로젝트 개요 (문제정의·1·2차 시도·결론) — 대표 문서 |
| `character-echo/` | `20-echo-character-bible.md` | Echo 캐릭터 이미지 생성용 마스터 프롬프트 (캐릭터 바이블 v1.9) |
| `character-echo/` | `21-request-prompt-template.md` | Echo 생성 요청 프롬프트 템플릿 (복붙용 + 장면 샘플) |
| `character-echo/` | `echo-bot.html` | 브라우저용 Echo 생성 봇 (OpenAI gpt-image-1, 마스터 프롬프트·베이스 3장 내장) |
