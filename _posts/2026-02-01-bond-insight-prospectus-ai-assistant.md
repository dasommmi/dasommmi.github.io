---
layout: post
title: "BondInsight AI Agent"
date: 2026-02-01 16:00:00 +0900
tags:
  - AI
  - Solar
  - Upstage
---

# "BondInsight AI Agent" 요약
채권/채권 펀드 Prospectus를 자동 분석해 요약, 조건 추출, Q&A를 제공하는 AI Agent

### 기대 효과
- 문서 이해 시간을 단축해 업무 효율 향상
- 조건 누락이나 오해를 줄여 리스크 관리에 기여


### 핵심 기술
- Upstage Solar: AI Agent 플로우 및 대화형 인터페이스
- Document Parse API: PDF를 텍스트로 변환
- Information Extract API: 핵심 정보 추출 및 요약

---

# "BondInsight AI Agent" 프로젝트 

### 실습
대상 문서는 아래 2개를 사용합니다.
- [Hammerson prospectus for bond tap issued in 2023 due 2028]()
- [Vanguard Bond Index Funds Prospectus]()


### 왜 이 프로젝트를 만들었나? (Problem Statement)
저는 금융권에서 프론트 시스템을 개발하면서
딜러들이 문서를 보고 판단하는 과정을 옆에서 많이 지켜봤습니다.
그 과정에서 느낀 가장 큰 문제는 문서 자체가 너무 길고 복잡해서 핵심 리스크를 빠르게 파악하기 어렵다는 점이었습니다.

채권/펀드 관련 문서들은 대개 100~200페이지 이상이고,
리스크는 문서 전체에 흩어져 있습니다.
예를 들어 “만기 구조”, “콜/풋 조건”, “신용 리스크”, “유동성 리스크”,
“손실 시나리오” 같은 중요한 내용이 여러 섹션에 분산되어 있어
딜러들은 문서를 읽는 것만으로도 큰 부담을 느낍니다.

그리고 더 큰 문제는 사람마다 중요하다고 생각하는 리스크가 다르다는 것입니다.
딜러는 빠르게 판단해야 하고, 리서치는 깊게 분석해야 하는데
같은 문서를 보고도 결과가 다르게 나올 수밖에 없습니다.

그래서 저는 “문서 요약”이 아니라 리스크를 중심으로 문서를 구조화하고,
딜러 관점의 분석을 자동화하는 AI Agent가 필요하다고 생각했습니다.

### 해결 방안: 문서 분석을 “AI Agent 구조”로 만들다
이 프로젝트는 단순히 “PDF 요약”을 하는 것이 아니라
문서를 구조화된 데이터로 바꾸고,
그 데이터를 기반으로 리스크 중심의 분석을 수행하는 AI Agent를 구현했습니다.

핵심 구성은 아래와 같습니다.

### 시스템 구성 (전체 구조)
#### 1) PDF → 텍스트 (문서 파싱)
/parse API는 업스테이지 문서 파싱 API를 사용해
PDF를 텍스트로 변환합니다.

```js
app.post("/parse", upload.single("file"), async (req, res) => {
  const file = req.file;

  const response = await axios.post(
    "https://api.upstage.ai/document/parse",
    fs.createReadStream(file.path),
    {
      headers: {
        Authorization: `Bearer ${process.env.UPSTAGE_API_KEY}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );

  res.json({ text: response.data.text });
});
```

📌 포인트:
딜러가 문서를 복사해서 붙여넣는 방식은 너무 비효율적이기 때문에
PDF 업로드만으로 텍스트를 얻을 수 있게 만들었습니다.

#### 2) 텍스트 → 구조화된 데이터 (정보 추출)
/extract API는 업스테이지 정보 추출 API를 이용해
문서에서 핵심 항목을 구조화된 데이터로 뽑습니다.
```js
app.post("/extract", async (req, res) => {
  const { text } = req.body;

  const response = await axios.post(
    "https://api.upstage.ai/information-extract",
    {
      text,
      tasks: [
        {
          name: "bond_terms",
          prompt:
            "Extract maturity, coupon, call/put conditions, credit risk, loss scenarios."
        },
        {
          name: "fund_terms",
          prompt:
            "Extract fund strategy, duration risk, fees, benchmark, key risks."
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.UPSTAGE_API_KEY}`
      }
    }
  );

  res.json(response.data);
});
```

📌 포인트:
이 부분이 핵심입니다.
문서를 “읽기 쉬운 텍스트”로 바꾸는 것에서 끝나는 게 아니라
딜러가 실제로 필요로 하는 항목을 구조화해서 제공합니다.

#### 3) 문서 유형 분류 (Bond vs Fund)
/solar/classify는 Solar LLM을 이용해 문서 유형을 분류합니다.
```js
app.post("/solar/classify", async (req, res) => {
  const { text } = req.body;

  const systemPrompt = `
You are a financial AI agent.
Classify the document type.
Return ONLY one:
- Bond Prospectus
- Bond Index Fund Prospectus
`;

  const userPrompt = `
Document:
${text.slice(0, 3000)}
`;

  const result = await callSolar(systemPrompt, userPrompt);
  res.json({ documentType: result.trim() });
});
```

📌 포인트:
문서가 채권인지 펀드인지에 따라 분석 포인트가 달라지기 때문에
문서 유형 분류는 필수적입니다.

#### 4) 리스크 중심 요약 (Risk-first Summary)
/solar/summary는 딜러 관점에서 리스크 중심 요약을 생성합니다.
```js
app.post("/solar/summary", async (req, res) => {
  const { extracted, documentType } = req.body;

  const systemPrompt = `
You are BondInsight Solar Agent.
Summarize from a FRONT-OFFICE DEALER perspective.

Rules:
- Risks first
- No marketing tone
- Focus on downside
`;

  const userPrompt = `
Document Type: ${documentType}

Bond Terms:
${JSON.stringify(extracted.bond_terms, null, 2)}

Fund Terms:
${JSON.stringify(extracted.fund_terms, null, 2)}

Format:
1. Key Risks
2. Key Terms
3. Special Conditions
4. Dealer Notes
`;

  const summary = await callSolar(systemPrompt, userPrompt);
  res.json({ summary });
});

```

📌 포인트:
“요약”이 아니라 딜러가 실제로 필요한 리스크 중심 요약을 제공합니다.

마케팅 톤이 아니라 “하방 리스크” 중심으로 작성되도록 규칙을 명확히 했습니다.

#### 5) Worst Case 시나리오 생성
/solar/worst-case는 최악의 상황을 가정해 시나리오를 생성합니다.
```js
app.post("/solar/worst-case", async (req, res) => {
  const { extracted, documentType } = req.body;

  const systemPrompt = `
You are a financial risk analysis AI Agent.
Simulate worst-case scenarios.
Do NOT recommend investments.
`;

  const userPrompt = `
Document Type: ${documentType}

Bond Terms:
${JSON.stringify(extracted.bond_terms, null, 2)}

Fund Terms:
${JSON.stringify(extracted.fund_terms, null, 2)}

Scenario:
- Rapid interest rate hike
- Credit spread widening
- Liquidity stress

Explain:
1. What breaks first
2. Potential loss drivers
3. Who should be cautious
`;

  const result = await callSolar(systemPrompt, userPrompt);
  res.json({ worstCase: result });
});

```

📌 포인트:
리스크 관리는 “현재 리스크 파악”만으로 끝나지 않습니다.
최악의 상황에서 무엇이 먼저 깨지는지를 아는 것이 중요합니다.
이 부분은 딜러 업무에서 매우 핵심적인 요소입니다.

#### 6) Q&A (데이터 기반 질문 응답)
/solar/chat은 사용자 질문을 받아
추출된 데이터만으로 답변합니다.

```js
app.post("/solar/chat", async (req, res) => {
  const { extracted, documentType, question } = req.body;

  const systemPrompt = `
You are BondInsight Solar Agent.

Steps:
1. Classify question:
- Term Check
- Risk Assessment
- Investment Judgment

2. Answer using ONLY provided data.
If Investment Judgment:
- No recommendation
- Explain risks only

If missing info:
"해당 정보는 문서에 명시되어 있지 않습니다."
`;

  const userPrompt = `
Document Type: ${documentType}

Bond Terms:
${JSON.stringify(extracted.bond_terms, null, 2)}

Fund Terms:
${JSON.stringify(extracted.fund_terms, null, 2)}

Question:
${question}
`;

  const answer = await callSolar(systemPrompt, userPrompt);
  res.json({ answer });
});

```

📌 포인트:
“AI가 알아서 추측하는 답변”이 아니라
문서에 명시된 정보만 기반으로 답변하도록 제한했습니다.
투자 추천은 하지 않고, 리스크만 설명하도록 규칙을 강하게 설정했습니다.

![img.png](/assets/images/260201/mermaid.svg)



### 4. 이 프로젝트를 만들면서 느낀 점 (개발자 관점)
프론트 개발자로서 이런 요구사항을 받으면
보통 “요약 기능” 정도로 끝내는 경우가 많습니다.
하지만 딜러들이 실제로 필요한 건 요약이 아니라 판단에 필요한 구조화된 정보입니다.

그래서 저는 다음을 고려했습니다.

✅ 딜러가 진짜 원하는 것은 무엇인가?

- 핵심 리스크가 무엇인지
- 어떤 조건이 리스크를 키우는지
- 최악의 상황에서 무엇이 먼저 깨지는지

✅ 개발자가 요구사항을 받았을 때도 이해해야 할 부분

- 단순한 요약이 아니라 데이터 추출 + 리스크 분석이 필요하다는 점
- “문서 유형 분류”가 없으면 분석 포인트가 달라진다는 점
- AI가 답을 막 만들어내면 안 되고, 문서 기반으로만 답변해야 한다는 점

이런 요구사항을 개발자가 미리 이해하고 설계하지 않으면
결국 “그럴듯한 요약”만 나오는 시스템이 되기 쉽습니다.

### 5. 결론: 이 프로젝트의 가치
이 프로젝트는 단순한 PDF 요약이 아닙니다.
문서를 구조화된 데이터로 바꾸고,
그 데이터를 기반으로 리스크 중심의 분석과 시나리오를 자동 생성하는 AI Agent입니다.

프론트 개발자로서 딜러들의 업무를 관찰하면서
“이 부분은 AI가 반드시 도와줘야 한다”라고 느낀 지점을
그대로 시스템에 반영한 결과물입니다.

