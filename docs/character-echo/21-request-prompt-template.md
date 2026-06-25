# Echo 생성 요청 프롬프트 템플릿

마스터 프롬프트([[20-echo-character-bible]])를 바탕으로, 실제 이미지 생성 봇/에이전트에 **복붙해서 보내는 요청문**.
`[이번에 그릴 장면]` 4줄만 매번 바꿔 쓴다.

> 캐릭터 일관성을 위해 **기준 이미지 3장은 직접 첨부**하는 것이 가장 확실하다.
> (URL 링크만 주면 이미지를 못 읽고 엉뚱하게 그리는 경우가 많음 — 텍스트 가이드만 링크로 줘도 됨)

---

## 복붙용 요청문

```
이 캐릭터 'Echo'의 가이드를 먼저 읽어줘:
https://github.com/jieunhannnn/jieun-work/blob/main/docs/character-echo/20-echo-character-bible.md

그리고 내가 첨부한 이미지 3장이 이 캐릭터의 절대 기준(모델시트)이야.
새 토끼를 만들지 말고, 첨부 이미지와 100% 동일한 Echo가 다른 자세/표정을
연기하는 모습을 그려줘. 글과 이미지가 충돌하면 무조건 이미지를 따라.

[이번에 그릴 장면]
행동: 두 손을 번쩍 들고 만세하며 폴짝 점프
표정: 눈 감고 입 벌려 활짝 웃음
시점: 정면
배경: 연한 파스텔 민트색 단색
```

---

## 기준 이미지 (첨부용)

`assets/` 의 3장을 첨부한다.

| 파일 | 내용 |
| --- | --- |
| `assets/echo-base-front.png` | 정면 서있는 기본 포즈 |
| `assets/echo-base-run.png` | 달리는 포즈 |
| `assets/echo-base-cheer.png` | 눈 감고 웃는 응원 포즈 |

raw 링크(이미지 직접 접근이 필요할 때):

- `https://raw.githubusercontent.com/jieunhannnn/jieun-work/main/docs/character-echo/assets/echo-base-front.png`
- `https://raw.githubusercontent.com/jieunhannnn/jieun-work/main/docs/character-echo/assets/echo-base-run.png`
- `https://raw.githubusercontent.com/jieunhannnn/jieun-work/main/docs/character-echo/assets/echo-base-cheer.png`

---

## 장면 샘플 (`[이번에 그릴 장면]`만 교체)

**차분한 인사**
```
행동: 한 손 들어 가볍게 인사
표정: 잔잔한 미소(입 닫힘)
시점: 정면
배경: 흰색
```

**고민하는 모습**
```
행동: 한 손을 턱에 대고 갸웃
표정: 눈썹 살짝 올리고 생각하는 표정(입 닫힘)
시점: 3/4 측면
배경: 연한 베이지
```

**신나서 달리기**
```
행동: 두 팔 흔들며 힘차게 달리기
표정: 입 벌려 신난 웃음
시점: 측면
배경: 하늘색에 구름 살짝
```
