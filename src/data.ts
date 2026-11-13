export type Source = {
  id: string;
  title: string;
  date: string;
  pages: string;
  kind: string;
  url: string;
};
const court =
  "https://files.cand.uscourts.gov/files/18-CR-00258_USA_v_Balwani/";
// Exhibit 2623, pages 1 and 2. Keep the original values, including assumptions.
export const financialColumns = [
  "Year",
  "Revenue",
  "COS %",
  "G&A increase",
  "R&D increase",
  "Cost per device",
  "Price per test",
  "Tests per day per machine",
  "Devices needed",
  "Tests per day",
  "OPEX",
];
export const financialModels = [
  {
    date: "July 16, 2015",
    page: 1,
    rows: [
      [
        "2015",
        "$53M",
        "35%",
        "30%",
        "10%",
        "$40K",
        "$35",
        "8",
        "531",
        "4,184",
        "$136M",
      ],
      [
        "2016",
        "$153M",
        "32%",
        "30%",
        "10%",
        "$35K",
        "$35",
        "8",
        "992",
        "12,012",
        "$155M",
      ],
      [
        "2017",
        "$253M",
        "32%",
        "30%",
        "10%",
        "$30K",
        "$35",
        "8",
        "992",
        "19,840",
        "$178M",
      ],
      [
        "2018",
        "$503M",
        "30%",
        "30%",
        "10%",
        "$25K",
        "$35",
        "8",
        "3,011",
        "39,409",
        "$205M",
      ],
    ],
  },
  {
    date: "June 27, 2015",
    page: 2,
    rows: [
      [
        "2015",
        "$113M",
        "35%",
        "30%",
        "10%",
        "$40K",
        "$35",
        "8",
        "1,126",
        "8,845",
        "$136M",
      ],
      [
        "2016",
        "$223M",
        "32%",
        "30%",
        "10%",
        "$35K",
        "$35",
        "8",
        "1,091",
        "17,455",
        "$155M",
      ],
      [
        "2017",
        "$323M",
        "32%",
        "30%",
        "10%",
        "$30K",
        "$35",
        "8",
        "1,000",
        "25,284",
        "$178M",
      ],
      [
        "2018",
        "$503M",
        "30%",
        "30%",
        "10%",
        "$25K",
        "$35",
        "8",
        "2,912",
        "39,374",
        "$205M",
      ],
    ],
  },
];
export const clueDebriefs = [
  {
    title: "An absolute promise",
    element: "False or misleading representations",
    explanation:
      "You found “ALL.” That makes the testing claim sound like it has no limits. An investor might rely on that promise when deciding whether to invest. This email shows that someone inside the company was already questioning the wording.",
    context:
      "This starts the claims part of the case. It gives investigators a specific promise to compare with the company’s internal records.",
    sourceIds: [0],
  },
  {
    title: "What the QC report shows",
    element: "False or misleading representations",
    explanation:
      "TT3 had the highest QC failure rate at 51.3%. That gives investigators something specific to compare with the company’s claims about reliable testing.",
    context:
      "These were failed quality-control runs, not a patient error rate. Read alongside the marketing review, they help show the gap between the company’s promises and its internal results.",
    sourceIds: [1],
  },
  {
    title: "A warning reached leadership",
    element: "Knowledge / intent",
    explanation:
      "“SEVERAL” was the second replacement the reviewer suggested for “all.” The reviewer was warning against making the tests sound more capable than they were. Holmes forwarded those comments, so the email helps show that leadership received the warning.",
    context:
      "This supports the knowledge part of the case. Comparing the warning with what leadership later told investors helps investigators assess whether misleading claims were made knowingly.",
    sourceIds: [2],
  },
  {
    title: "Two different financial claims",
    element: "Materiality",
    explanation:
      "Your 60-108 answer connects two different numbers. The 2015 forecast dropped by $60 million. Separately, the SEC said an investor was shown $108 million as revenue already earned in 2014, even though recorded revenue was only a little more than $100,000. That difference could affect someone’s decision to invest.",
    context:
      "Past revenue helps investors judge whether a business is working. That is why the discrepancy alleged in the SEC complaint matters to the materiality part of the case.",
    sourceIds: [3, 4],
  },
  {
    title: "A revision is not enough",
    element: "Evaluating the evidence",
    explanation:
      "You correctly answered “No.” Forecasts are estimates, so changing one is not automatically fraud. The bigger issue here is the allegation that an investor was given a false number for revenue the company had already earned.",
    context:
      "A changed estimate and a false statement about the past are different things. That difference matters when deciding what the evidence actually shows.",
    sourceIds: [3, 4],
  },
  {
    title: "Following the investor’s money",
    element: "Interstate wire communications",
    explanation:
      "You linked Count 6 to the earlier records. On February 6, 2014, $38,336,632 moved from Investor #3’s Citibank account to Theranos’s Comerica account. The marketing warnings came before this payment. The filing places the transfer within the alleged investor-fraud scheme.",
    context:
      "The July 2015 model came later, so it could not have caused this 2014 payment. The bank row also does not tell us which claims this investor received. The filing supplies the alleged scheme connection; the earlier records add context about claims and knowledge. You have now connected the wire part to the rest of the case.",
    sourceIds: [5],
  },
];
export const wireConclusions = [
  {
    id: "B",
    text: "The payment was prompted by the revised July 2015 financial model.",
  },
  {
    id: "A",
    text: "The payment came after the marketing concerns had been circulated to leadership.",
  },
  {
    id: "D",
    text: "The bank entry identifies the specific claims this investor was shown.",
  },
  {
    id: "C",
    text: "The charging paragraph places this investor payment within an alleged scheme to obtain money through misleading claims.",
  },
];
export const sources: Source[] = [
  {
    id: "SRC-3965",
    title: "Exhibit 3965 · Website marketing review",
    date: "September 4, 2013",
    pages: "Page 1",
    kind: "Contemporaneous internal email",
    url: court + "3965.pdf",
  },
  {
    id: "SRC-1633",
    title: "Exhibit 1633 · Failed QC",
    date: "March 28, 2014",
    pages: "Pages 1–2",
    kind: "Contemporaneous email + laboratory report",
    url: court + "Trial%20Exh.%201633%20Email.pdf",
  },
  {
    id: "SRC-3981",
    title: "Exhibit 3981 · Forwarded legal comments",
    date: "September 6, 2013",
    pages: "Pages 1–2",
    kind: "Contemporaneous internal email chain",
    url: court + "3981.pdf",
  },
  {
    id: "SRC-2623",
    title: "Exhibit 2623 · Revised financial projections",
    date: "June–July 2015",
    pages: "Pages 1–2",
    kind: "Contemporaneous internal forecasts",
    url:
      court +
      "Trial%20Exh.%202623%20Email%20From%20D.Y.%20To%20Elizabeth%20Holmes;%207.16.2015_Redacted.pdf",
  },
  {
    id: "SRC-SEC2018",
    title: "SEC v. Holmes and Theranos · Civil complaint",
    date: "March 14, 2018",
    pages: "PDF page 19 · ¶¶ 83–89, especially 85–87",
    kind: "2018 / SEC allegations",
    url: "https://www.sec.gov/files/litigation/complaints/2018/comp-pr2018-41-theranos-holmes.pdf",
  },
  {
    id: "SRC-DOJ2020",
    title: "U.S. v. Holmes and Balwani · Document 391",
    date: "May 8, 2020",
    pages: "PDF page 9 · Counts three through eight",
    kind: "2020 / Federal charging document (allegations)",
    url: "https://regmedia.co.uk/2020/05/11/theranos-superceding-injunction.pdf",
  },
  {
    id: "SRC-VERDICT",
    title: "DOJ · Holmes found guilty of investor fraud",
    date: "January 4, 2022",
    pages: "Official verdict report",
    kind: "Adjudicated outcomes",
    url: "https://www.justice.gov/usao-ndca/pr/theranos-founder-elizabeth-holmes-found-guilty-investor-fraud",
  },
  {
    id: "SRC-DOJCASE",
    title: "DOJ · U.S. v. Elizabeth Holmes, et al.",
    date: "Official case chronology",
    pages: "Case overview",
    kind: "Official case record",
    url: "https://www.justice.gov/usao-ndca/us-v-elizabeth-holmes-et-al",
  },
];
export const files = [
  {
    name: "The claim",
    tag: "RESTRICTED",
    element: "F",
    label: "False / misleading claims",
    fragment: "51",
    sourceIds: [0, 1],
    summary:
      "The marketing promised broad testing capabilities, while internal QC records showed problems. TT3 had the highest failure rate.",
    why: "The marketing review identifies the promise. The QC report supplies internal results to test it against. Together they support the false-claims part of the case. QC failures are not patient error rates.",
    message: "CLAIM VERIFIED AGAINST INTERNAL QC. Evidence fragment recovered.",
  },
  {
    name: "The warning",
    tag: "CONFIDENTIAL",
    element: "I",
    label: "Knowledge / intent",
    fragment: "07",
    sourceIds: [2],
    summary:
      "Leadership forwarded specific warnings about the testing claims. That helps show who knew about the concerns.",
    why: "The forwarded warning helps show what leadership knew. Compare it with later investor representations to assess whether misleading statements were made knowingly. This connects knowledge to the claims already examined.",
    message: "LEADERSHIP WARNING LOCATED. Evidence fragment recovered.",
  },
  {
    name: "The money story",
    tag: "EXECUTIVE ACCESS",
    element: "M",
    label: "Materiality",
    fragment: "108",
    sourceIds: [3, 4],
    summary:
      "Changing a forecast is different from giving an investor a false number for revenue already earned.",
    why: "The SEC’s allegation about past revenue concerns money supposedly already earned. Connecting that claim to investors’ decisions helps explain materiality. A changed forecast is a different kind of statement.",
    message:
      "FINANCIAL DISCREPANCY CONFIRMED IN REGULATORY ALLEGATIONS. Forecasts are not booked revenue.",
  },
  {
    name: "The transfer",
    tag: "INVESTIGATIVE RECORD",
    element: "W",
    label: "Interstate wire",
    fragment: "38",
    sourceIds: [5],
    summary:
      "Count 6 alleged a February 6, 2014 electronic transfer of $38,336,632 from Citibank to Comerica.",
    why: "The filing connects the investor payment to the alleged scheme. The earlier records add context about claims and leadership’s knowledge, while the transfer supplies the interstate-wire connection. The dates help rule out a link to the later 2015 forecast.",
    message: "INVESTOR FUNDS TRACED. The last credential is offline.",
  },
];
export const qc = [
  ["Vitamin D", 11, 3, 77, "18.2"],
  ["TT4", 6, 5, 47, "23.4"],
  ["TT3", 11, 9, 39, "51.3"],
  ["fT4", 4, 4, 40, "20.0"],
  ["tPSA", 4, 11, 51, "29.4"],
  ["TSH", 0, 2, 43, "4.7"],
  ["TST", 4, 10, 31, "45.2"],
  ["TOTAL", 40, 44, 328, "25.6"],
];
export const wires = [
  ["3", "12/30/2013", "$99,990", "Investor #1 · Charles Schwab/Wells Fargo"],
  ["4", "12/31/2013", "$5,349,900", "Investor #6 · Pacific Western Bank"],
  ["5", "12/31/2013", "$4,875,000", "Investor #2 · Texas Capital Bank"],
  ["6", "2/6/2014", "$38,336,632", "Investor #3 · Citibank"],
  ["7", "10/31/2014", "$99,999,984", "Investor #4 · Northern Chicago Bank"],
  ["8", "10/31/2014", "$5,999,997", "Investor #5 · JP Morgan Chase"],
];
