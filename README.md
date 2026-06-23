# jieun-work

지은(jieunhannnn)의 **회사 작업 워크로그**입니다.
날짜별 작업 기록, 시도와 시행착오, 결정 전 고민을 날것 그대로 보존하고,
반복되는 패턴은 `docs/`로 정제해 올립니다.

## What Belongs Here

- 날짜별 worklog (`logs/YYYY/MM/YYYY-MM-DD.md`)
- 그날의 시도·막힌 지점·결정과 근거·다음 할 일
- 반복 가능한 패턴을 정제한 주제별 문서 (`docs/`)

## What Does Not Belong Here

- 회사 내부 전용 데이터·API 키·비공개 자산 (절대 올리지 않기)
- 원본 디자인 파일 (Figma) / 원본 이미지 (Google Drive)

> ⚠️ 이 레포는 **public**입니다. 민감한 내용은 올리지 말고, 문서엔
> `[내부 전용]` 같은 플레이스홀더만 남기세요. 한 번 올린 내용은
> 지워도 커밋 히스토리에 남습니다.

## 폴더 구조

```text
README.md
templates/
  daily-worklog-template.md   # 매일 복사해서 쓰는 틀
logs/
  YYYY/MM/YYYY-MM-DD.md        # 날짜별 작업 기록
docs/
  00-document-role-map.md      # 문서 역할 안내
  10-figma-thumbnail-automation.md  # 피그마 썸네일 자동화 정제 문서
```

## Worklog Rule

1. 하루의 날것 기록은 `logs/`에 날짜별로 남긴다.
2. 반복되는 판단·실수 방지 패턴이 보이면 `docs/`로 승격한다.
3. 미완 항목은 다음 날짜 로그의 `## Today`로 이월한다.
