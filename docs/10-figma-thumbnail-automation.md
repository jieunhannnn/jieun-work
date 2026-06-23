# 피그마 썸네일 자동화

## 목표

디자이너 도움 없이, 비디자이너가 **Google Drive에 이미지를 업로드하는 것만으로**
운영 보상 썸네일을 제작·갱신할 수 있게 한다.

## 전체 흐름

Google Drive 폴더 5종 → Google Apps Script(중계) → Figma 플러그인(동기화 버튼)

| 단계 | 역할 |
| --- | --- |
| 1. Drive 업로드 | 비디자이너가 5종 폴더에 이미지 업로드 |
| 2. Apps Script | Drive 변경을 읽어 Figma로 중계 |
| 3. Figma 플러그인 | 동기화 버튼으로 썸네일 생성/업데이트/삭제 |

## Drive 폴더 5종

| 폴더 | 용도 |
| --- | --- |
| `star` | 별 보상 |
| `attendance` | 출석 |
| `excellence-diary` | 우수 다이어리 |
| `excellence-gv` | 우수 GV |
| `excellence-live` | 우수 라이브 |

## 동기화 규칙

- **생성**: Drive에 새 이미지 → 썸네일 신규 생성
- **업데이트**: 기존 이미지 교체 → 해당 썸네일 갱신
- **삭제**: Drive에서 제거 → 썸네일 삭제

## Figma 구조

플러그인은 Figma 안의 컴포넌트 세트 2개 + 프레임 1개로 동작한다.

| 요소 | 역할 |
| --- | --- |
| `Product` 컴포넌트 세트 | 업로드 이미지가 들어가는 원본. variant 이름 = `Property 1=폴더-파일명` |
| `Reward` 컴포넌트 세트 | 보상 디자인 틀 (variant: star / attendance / diary / gv / live) |
| `Generated` 프레임 | 실제 썸네일이 생성되는 가로 오토레이아웃 영역 |

### 폴더 → Reward variant 매핑

| Drive 폴더 | Reward variant |
| --- | --- |
| `star` | star |
| `attendance` | attendance |
| `excellence-diary` | diary |
| `excellence-gv` | gv |
| `excellence-live` | live |

### 동작 방식

- 각 이미지마다 `Product` variant(`Property 1=폴더-파일명`)를 생성/업데이트
- 매칭되는 `Reward` variant를 복제해 `Generated` 프레임에 썸네일 생성
- 이미지는 **Product 인스턴스 내부의 이미지 노드에만** 적용(`scaleMode: FIT`) — 배경에 이미지가 들어가는 오염 방지
- `Generated`·`Product`는 폴더 순서(star→attendance→diary→gv→live) + 이름순으로 정렬
- Drive에 없는 항목은 Product·썸네일에서 삭제

## 남은 작업 (Backlog)

- [ ] 제품명 텍스트 자동화
- [ ] 이미지 적용 버그 수정 (배경에 들어가는 문제)
- [ ] remove.bg 연동해 배경 자동 제거
- [ ] 이미지 크기 표준화 (265×226px)
