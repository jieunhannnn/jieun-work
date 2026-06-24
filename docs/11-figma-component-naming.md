# 피그마 마스터 컴포넌트 네이밍 규칙

에코런 PAGE-UI(🐰 COM_에코런_PAGE-UI) 파일의 마스터 컴포넌트 네이밍 컨벤션을 정리한다. `Frame` / `Component` / `Vector` 처럼 기본값으로 방치된 이름을 의미 기반으로 재정비하면서 정한 규칙이다.

---

## 기본 규칙

- **`타입_이름` 구조** — 타입을 맨 앞에 둔다. (에셋 패널이 이름 알파벳순 정렬이라 같은 타입끼리 모여 관리가 쉬움)
- **영문 + 언더바(`_`)** — 띄어쓰기 대신 언더바. 각 단어 첫 글자 대문자.
- **슬래시(`/`) 사용 금지** — 슬래시는 에셋 패널에서 폴더로 그룹핑되는데, 그룹이 묶이면 개별 수정이 번거로워서 쓰지 않는다.
- 이름은 "보이는 그대로" 직관적으로. 어려운 단어(심볼/스와치 등) 지양.

---

## 약어 사전

이름에 쓰는 약어는 아래로 통일한다. 새 약어를 만들면 반드시 이 표에 추가한다.

| 약어 | 풀이 | 의미 |
| --- | --- | --- |
| `IP` | Intellectual Property | 영화/외부 캐릭터 (슈렉, 마리오 등) |
| `Echo` | — | 서비스 자체 마스코트(토끼) |
| `Stats` | Statistics | 통계·기록 수치 (세션 수, 거리, 단어 등) |
| `MO` | Mobile | 모바일 |
| `TA` | Tablet | 태블릿 |

- 디바이스별 변형(`MO`/`TA`)은 이름 **끝**에 붙인다. 예: `Thumbnail_IP_MO` / `Thumbnail_IP_TA`, `Stats_Summary_MO` / `Stats_Summary_TA`

---

## 타입 접두어 목록

`Card_` `Avatar_` `Profile_` `Node_` `Icon_` `Logo_` `Background_` `Map_` `Dashboard_` `Face_` `Badge_` `Row_` `Header_` `Ring_` `Collection_` `Bar_` `Thumbnail_` `Stats_` `Billboard`

---

## 적용 예시

| 변경 전 | 변경 후 |
| --- | --- |
| `Component` | `Card_Challenge_Distance` |
| `Frame 4` | `Node_Map` |
| `Frame 15` | `Node_Map_Red` |
| `Vector` | `Logo_R` |
| `MO` | `Thumbnail_IP_MO` (모바일 IP 썸네일) |
| `TA` | `Thumbnail_IP_TA` (태블릿 IP 썸네일) |
| `Avatar_IP` | `Thumbnail_IP_Circle` (리스트 원형) |
| `Card_Stats` | `Stats_Summary_MO` |
| `Bar_Stats_Summary` | `Stats_Summary_TA` |
| `전광판` | `Billboard` |
| `shape-22` | `Badge_Word_Practice` |
| `Rectangle 13506` | `Ring_Circular_Progress` |

---

## 다음에 적용할 때

- 새 컴포넌트 생성/리네이밍 시 위 규칙·접두어·약어를 그대로 사용한다.
- variant 속성명도 `Property 1` 기본값 대신 의미 있는 이름으로 정리 권장. 예: `Thumbnail_IP_Circle`의 `Property 1=피너츠 / Property 2=ON` → `IP=피너츠 / State=ON`
