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
export const demonstrationConclusions = [
  {
    id: "A",
    text: "Investors were led to believe the Theranos device was testing their samples.",
  },
  { id: "B", text: "Guests provided blood samples during the demonstration." },
  {
    id: "C",
    text: "Some samples were secretly tested on other companies’ machines.",
  },
  { id: "D", text: "The presentation involved prospective investors." },
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
    title: "How the demonstration worked",
    element: "Scheme to defraud",
    explanation:
      "You identified the misleading impression and the hidden testing method. Investors were led to believe the Theranos device was testing their samples, while some samples were secretly tested on other companies’ machines.",
    context:
      "Together, those actions show how the presentation was arranged to mislead prospective investors about the technology. This connects the testing claims to a method of seeking investment. The court’s 2025 opinion describes employee and investor testimony about these demonstrations.",
    sourceIds: [3],
  },
  {
    title: "Why the revenue claim mattered",
    element: "Material misrepresentation",
    explanation:
      "Your answer, 108, identifies the $108 million presented as revenue already earned in 2014. The SEC alleged that Theranos had actually recorded only a little more than $100,000 that year. That difference could affect an investor’s decision to put money into the company.",
    context:
      "The demonstration record shows a method of gaining investors’ confidence. The revenue allegation adds a specific financial claim that would matter to someone deciding whether to invest. These connect the scheme and materiality parts of the case.",
    sourceIds: [4],
  },
  {
    title: "Following the investor’s money",
    element: "Interstate wire communications",
    explanation:
      "You linked Count 6 to the earlier records. On February 6, 2014, $38,336,632 moved from Investor #3’s Citibank account to Theranos’s Comerica account. The marketing warnings came before this payment. The filing places the transfer within the alleged investor-fraud scheme.",
    context:
      "The SEC complaint was filed in 2018, after this 2014 payment. The bank row also does not tell us which claims this investor received. The filing supplies the alleged scheme connection; the earlier records add context about claims and knowledge. You have now connected the wire part to the rest of the case.",
    sourceIds: [5],
  },
];
export const wireConclusions = [
  {
    id: "B",
    text: "The SEC complaint had already been filed when this payment was made.",
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
    id: "SRC-APPEAL2025",
    title: "U.S. v. Holmes · Investor demonstrations",
    date: "February 24, 2025",
    pages: "PDF page 12 · Employee and investor testimony",
    kind: "2025 / Court opinion summarizing trial testimony",
    url: "https://cdn.ca9.uscourts.gov/datastore/opinions/2025/02/24/23-1167.pdf#page=12",
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
    name: "The pitch",
    tag: "EXECUTIVE ACCESS",
    element: "M",
    label: "Scheme / materiality",
    fragment: "108",
    sourceIds: [3, 4],
    summary:
      "The demonstration record describes concealed testing arrangements. The SEC complaint describes a financial claim made to an investor.",
    why: "The court’s account of the demonstrations connects a misleading impression with a concealed testing method. The SEC’s revenue allegation adds a specific financial representation. Together they connect the scheme to information that would matter to investors.",
    message:
      "INVESTOR PITCH EXAMINED. Scheme and materiality records connected.",
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
    why: "The filing connects the investor payment to the alleged scheme. The earlier records add context about claims and leadership’s knowledge, while the transfer supplies the interstate-wire connection. The dates place the payment after the marketing warnings and before the SEC complaint.",
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
