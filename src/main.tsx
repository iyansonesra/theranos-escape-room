import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Check,
  ChevronRight,
  FileText,
  Folder,
  LockKeyhole,
  ShieldCheck,
  Terminal,
  Fingerprint,
  ExternalLink,
  Printer,
  Lightbulb,
  RotateCcw,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  clock,
  completedCount,
  durationSetting,
  Game,
  loadGame,
  newGame,
  SETTINGS_KEY,
  stageForStep,
  STORAGE_KEY,
  submit,
  takeHint,
  wireFinding,
} from "./game";
import {
  clueDebriefs,
  financialColumns,
  financialModels,
  files,
  qc,
  sources,
  wires,
  wireConclusions,
} from "./data";
import "./style.css";

function SourceMeta({ index }: { index: number }) {
  const s = sources[index];
  return (
    <div className="source-meta">
      <span className="eyebrow">{s.kind}</span>
      <strong>{s.title}</strong>
      <span>
        {s.date} · {s.pages} · {s.id}
      </span>
      <a href={s.url} target="_blank" rel="noreferrer">
        View original source <ExternalLink size={12} />
      </a>
    </div>
  );
}
const documentNames = [
  ["website_comments_2013.eml", "march_elisa_qc_2014.csv"],
  ["forwarded_website_comments_2013.eml"],
  ["revenue_model_2015.csv", "sec_complaint_2018.record"],
  ["superseding_information_2020.record"],
];
function Directory({
  selected,
  current,
  step,
  onFolder,
  onDocument,
}: {
  selected: number;
  current: number;
  step: number;
  onFolder: (n: number) => void;
  onDocument: (n: number) => void;
}) {
  const root = selected === -1;
  const rows = root
    ? [
        ...files.map((f, i) => ({
          name: `0${i + 1}_${f.name.toLowerCase().replaceAll(" ", "_")}`,
          locked: i > current,
          kind: "Directory",
          date: i < 2 ? "2013–2014" : i === 2 ? "2015 / 2018" : "2020",
        })),
        {
          name: "executive_override",
          locked: current < 4,
          kind: "Credential",
          date: "Offline",
        },
      ]
    : documentNames[selected].map((name, i) => ({
        name,
        locked: selected === 0 && i === 1 && step < 1,
        kind: name.endsWith(".eml")
          ? "Email record"
          : name.endsWith(".csv")
            ? "Data record"
            : "Investigative record",
        date: sources[files[selected].sourceIds[i]].date,
      }));
  return (
    <section
      className="directory-view"
      aria-label={root ? "Archive root directory" : "Folder contents"}
    >
      <div className="directory-path">
        <Terminal size={14} />
        <span>/archive/{root ? "" : `0${selected + 1}/`}</span>
        <span>{rows.length} items</span>
      </div>
      <div className="directory-columns">
        <span>Name</span>
        <span>Type / date</span>
        <span>Access</span>
      </div>
      {rows.map((row, i) => (
        <button
          key={row.name}
          className="directory-row"
          disabled={row.locked}
          onClick={() => (root ? onFolder(i) : onDocument(i))}
        >
          {row.locked ? (
            <LockKeyhole size={18} />
          ) : root ? (
            <Folder size={18} />
          ) : (
            <FileText size={18} />
          )}
          <span className="entry-name">{row.name}</span>
          <span className="entry-meta">
            {row.kind}
            <small>{row.date}</small>
          </span>
          <span className={"entry-access " + (row.locked ? "" : "available")}>
            {row.locked ? "Restricted" : "Read access"}
          </span>
          {!row.locked && <ChevronRight size={14} />}
        </button>
      ))}
    </section>
  );
}
function Document({
  stage,
  tab,
  onZoom,
}: {
  stage: number;
  tab: number;
  onZoom: (path: string) => void;
}) {
  if (stage === 0 && tab === 0)
    return (
      <>
        <SourceMeta index={0} />
        <article className="paper email">
          <div className="paper-label">AUTHENTIC EXCERPTS · TRANSCRIPTION</div>
          <h2>Website comments</h2>
          <dl>
            <dt>From</dt>
            <dd>Jeffrey Blickman</dd>
            <dt>To</dt>
            <dd>Elizabeth Holmes</dd>
            <dt>Cc</dt>
            <dd>Sunny Balwani and others</dd>
            <dt>Date</dt>
            <dd>September 4, 2013</dd>
          </dl>
          <hr />
          <p className="annotation">
            Excerpt from the website review, exhibit page 1. Punctuation and
            emphasis have been normalized for readability.
          </p>
          <div className="source-excerpt">
            <p>
              Elizabeth, here’s the PDF screenshots of latest .COM to send to
              counsel, along with Jim’s (abridged) feedback from today, removed
              anything based on personal opinion
            </p>
            <ol>
              <li>
                What is the source/backup data for “At Theranos, we can perform
                all lab tests on a sample 1/1,000 the size of a typical blood
                draw.”
              </li>
              <li>
                Our Revolution/Our Technology - “A tiny drop is all it takes” -
                we often use MORE than one drop; we should say:
                <ol type="a">
                  <li>“A few drops is all it takes” or</li>
                  <li>“As little as one drop is all it takes” or</li>
                  <li>Some other phrase not limited to a single drop.</li>
                </ol>
              </li>
              <li>
                States several times that “Theranos Software Products will ...”
                <ol type="a">
                  <li>
                    Should be “Theranos Software Products will be designed
                    to...”
                  </li>
                </ol>
              </li>
              <li>
                On pages 7 and 23 we show specific prices, which might be
                interpreted as a price quote:
              </li>
            </ol>
          </div>
          <p className="annotation">
            Internal feedback on the proposed website language.
          </p>
          <div className="paper-footer">
            GOVERNMENT TRIAL EXHIBIT 3965 <span>01 / 01</span>
          </div>
        </article>
      </>
    );
  if (stage === 0)
    return (
      <>
        <SourceMeta index={1} />
        <article className="paper lab">
          <div className="paper-label">
            AUTHENTIC REPORT · FAITHFUL DATA REPRODUCTION
          </div>
          <h2>March ELISA QC failures</h2>
          <p className="annotation">
            March 28, 2014 email chain · Langly Gee, Erika Cheung, Mark Pandori
            and others.
          </p>
          <blockquote>
            “For March, 26% runs failed.” <small>Langly Gee, page 1</small>
          </blockquote>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {[
                    "Assay",
                    "Failed, low level",
                    "Failed, high level",
                    "Total runs",
                    "% failures",
                  ].map((v) => (
                    <th key={v}>{v}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {qc.map((row) => (
                  <tr key={row[0]}>
                    {row.map((v, i) => (
                      <td key={i}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">
            QC means quality control. An assay is a laboratory test. These
            figures describe failed QC runs, not the percentage of patient
            results that were wrong.
          </p>
          <div className="paper-footer">
            GOVERNMENT TRIAL EXHIBIT 1633 <span>REPORT / PAGE 2</span>
          </div>
        </article>
      </>
    );
  if (stage === 1)
    return (
      <>
        <SourceMeta index={2} />
        <article className="paper email">
          <div className="paper-label">
            AUTHENTIC EMAIL CHAIN · EXCERPT + ORIGINAL SCANS
          </div>
          <h2>Fwd: Website comments</h2>
          <dl>
            <dt>Forwarded by</dt>
            <dd>Elizabeth Holmes</dd>
            <dt>To</dt>
            <dd>Christian Holmes</dd>
            <dt>Cc</dt>
            <dd>Sunny Balwani</dd>
            <dt>Date</dt>
            <dd>September 6, 2013</dd>
          </dl>
          <p className="annotation">
            Paraphrased metadata above; original exhibit pages below. Select a
            page to read at full size.
          </p>
          <div className="scans">
            {[1, 2].map((n) => (
              <button
                key={n}
                className="scan"
                onClick={() => onZoom(`source-previews/3981-${n}.png`)}
              >
                <img
                  src={`source-previews/3981-${n}.png`}
                  alt={`Original Exhibit 3981 page ${n}: ${n === 1 ? "forwarding metadata and email chain" : "legal reviewer’s surrounding bullet-point comments"}`}
                />
                <span>EXHIBIT 3981 / PAGE {n} ↗</span>
              </button>
            ))}
          </div>
        </article>
      </>
    );
  if (stage === 2 && tab === 0)
    return (
      <>
        <SourceMeta index={3} />
        <article className="paper">
          <div className="paper-label">
            INTERNAL EMAIL · REPRODUCED MODEL TABLES
          </div>
          <h2>RE: 409A</h2>
          <dl>
            <dt>From</dt>
            <dd>Danise Yam</dd>
            <dt>To</dt>
            <dd>Elizabeth Holmes; Sunny Balwani</dd>
            <dt>Sent</dt>
            <dd>July 16, 2015, 2:42 AM</dd>
          </dl>
          <blockquote>
            “Revised the revenue numbers per discussion and updated the model.”
          </blockquote>
          <p className="annotation">
            Email context, paraphrased: Yam says the updated model will go to
            Aranca and asks how many options will be granted at the new value.
            The thread also includes an earlier model sent to Holmes and
            Balwani.
          </p>
          {financialModels.map((model) => (
            <section className="financial-model" key={model.page}>
              <h3>
                {model.date} · Exhibit page {model.page}
              </h3>
              <div
                className="table-scroll"
                role="region"
                aria-label={`Financial model from ${model.date}`}
                tabIndex={0}
              >
                <table className="financial-table">
                  <thead>
                    <tr>
                      {financialColumns.map((column) => (
                        <th key={column} scope="col">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {model.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((value, i) => (
                          <td key={i}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
          <p className="note">
            These tables show forecasts and model assumptions, not revenue
            already earned. M means millions; K means thousands. The device
            counts and testing volumes are results based on the model's
            assumptions. Scroll sideways to see all columns.
          </p>
        </article>
      </>
    );
  if (stage === 2)
    return (
      <>
        <SourceMeta index={4} />
        <article className="paper legal">
          <div className="paper-label">
            2018 / SEC ALLEGATIONS · PARAPHRASED FACTUAL CONTEXT
          </div>
          <h2>
            Securities and Exchange Commission
            <br />
            v. Elizabeth Holmes & Theranos
          </h2>
          <hr />
          <p>
            <b>¶ 85</b> The SEC alleged that in August 2015 Holmes supplied a
            potential investor financials listing $108 million as historical
            2014 net revenue.
          </p>
          <p>
            <b>¶ 86–87</b> The complaint alleged that actual recorded 2014
            revenue was a little more than $100,000.
          </p>
          <p className="note">
            Filed March 14, 2018. Financial context paraphrased from the civil
            complaint, PDF page 19.
          </p>
          <div className="paper-footer">
            SEC CIVIL COMPLAINT <span>PAGE 19</span>
          </div>
        </article>
      </>
    );
  return (
    <>
      <SourceMeta index={5} />
      <article className="paper legal">
        <div className="paper-label">
          2020 / FEDERAL CHARGING DOCUMENT · TABLE REPRODUCTION
        </div>
        <h2>Counts three through eight</h2>
        <p>
          U.S. v. Holmes and Balwani · Superseding Information, Document 391
        </p>
        <p className="annotation">
          Paragraph 24, paraphrased: prosecutors alleged that the defendants
          used interstate electronic transfers from investor accounts to
          Theranos to obtain money through materially false or misleading
          representations. The table below lists the payments included in that
          allegation.
        </p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {["Count", "Date", "Item wired", "Wired from", "Wired to"].map(
                  (v) => (
                    <th key={v}>{v}</th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {wires.map((row) => (
                <tr key={row[0]}>
                  {row.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                  <td>Theranos · Comerica Bank account</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          May 8, 2020 · The table lists bank accounts for each investor and
          Theranos.
        </p>
        <div className="paper-footer">
          CASE 5:18-CR-00258-EJD <span>PAGE 9 OF 14</span>
        </div>
      </article>
    </>
  );
}
function Notebook({ game, full = false }: { game: Game; full?: boolean }) {
  const count = completedCount(game.step);
  return (
    <section className={"notebook " + (full ? "full" : "")}>
      <div className="panel-heading">
        <span className="eyebrow">YOUR INVESTIGATION</span>
        <h2>
          Case evidence <span>{count}/4</span>
        </h2>
      </div>
      <div
        className="progress"
        aria-label={`${count} of 4 case elements secured`}
      >
        <i style={{ width: `${count * 25}%` }} />
      </div>
      {files.map((f, i) => (
        <div
          className={"evidence " + (i < count ? "collected" : "")}
          key={f.element}
        >
          <div className="element">
            {i < count ? f.element : <LockKeyhole size={15} />}
          </div>
          <div>
            <strong>{f.label}</strong>
            {i < count ? (
              <>
                <p>{f.summary}</p>
                <span className="fragment">FRAGMENT {f.fragment}</span>
                {f.sourceIds.map((n) => (
                  <a
                    key={n}
                    href={sources[n].url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {sources[n].title} · {sources[n].id} · {sources[n].pages} ↗
                  </a>
                ))}
              </>
            ) : (
              <p>Evidence not yet recovered</p>
            )}
          </div>
        </div>
      ))}
      <p className="fine">
        Claims, knowledge, materiality, and wires: follow how the records
        connect.
      </p>
      {full && (
        <p>
          Team: {game.team} · Members: {game.members || "Not provided"} ·{" "}
          {game.completedAt
            ? `Completed: ${new Date(game.completedAt).toLocaleString()} · elapsed ${clock(Math.floor((game.completedAt - game.startedAt) / 1000))}`
            : "Investigation in progress"}
        </p>
      )}
    </section>
  );
}
function printSection(section: string) {
  const selectors: Record<string, string> = {
    card: ".override-card",
    blank: ".blank-worksheet",
  };
  const source = document.querySelector(selectors[section]);
  if (!source) return;
  const printRoot = document.createElement("div");
  printRoot.id = "print-root";
  printRoot.append(source.cloneNode(true));
  document.body.append(printRoot);
  try {
    window.print();
  } finally {
    printRoot.remove();
  }
}
const questions = [
  "Find the word that makes the company’s testing claim sound unlimited.",
  "Which assay raises the biggest concern when you compare its share of failed QC runs? Record its identifier.",
  "What was the last alternative suggested for the testing claim in the forwarded legal comments?",
  "Compare the 2015 outlook in the two emails with the SEC’s account of what an investor was told about 2014. Record the forecast drop and the claimed past revenue, both in millions.",
  "Is changing the forecast enough, on its own, to prove fraud?",
  "Find the Citibank investor payment that came after the marketing warnings but before the model emails. Record the count, then select only the conclusions supported by the records.",
  "Enter the token and arrange your evidence fragments in the order printed on the physical card.",
];

function App() {
  const [game, setGame] = useState<Game | null>(loadGame);
  const [entered, setEntered] = useState(false);
  const [team, setTeam] = useState("");
  const [members, setMembers] = useState("");
  const [duration, setDuration] = useState(durationSetting);
  const [route, setRoute] = useState(location.hash);
  const [presenter, setPresenter] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [tab, setTab] = useState(-1);
  const [answer, setAnswer] = useState("");
  const [selectedConclusions, setSelectedConclusions] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [now, setNow] = useState(Date.now());
  const [zoom, setZoom] = useState("");
  const [worksheet, setWorksheet] = useState(false);
  const [moneyTabs, setMoneyTabs] = useState<number[]>([]);
  const [storageError, setStorageError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const briefingDialog = useRef<HTMLDialogElement>(null);
  const evidenceDialog = useRef<HTMLDialogElement>(null);
  const debrief =
    typeof game?.pendingDebrief === "number"
      ? clueDebriefs[game.pendingDebrief]
      : null;
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const fn = () => setRoute(location.hash);
    window.addEventListener("hashchange", fn);
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      window.removeEventListener("hashchange", fn);
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    if (game)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
      } catch {
        setStorageError(true);
      }
  }, [game]);
  useEffect(() => {
    if (zoom) {
      dialog.current?.showModal();
      closeButton.current?.focus();
    } else if (dialog.current?.open) dialog.current.close();
  }, [zoom]);
  useEffect(() => {
    if (entered && game?.briefingSeen === false && route !== "#/presenter") {
      briefingDialog.current?.showModal();
    } else if (briefingDialog.current?.open) briefingDialog.current.close();
  }, [entered, game?.briefingSeen, route]);
  function acknowledgeBriefing() {
    setGame((prev) => (prev ? { ...prev, briefingSeen: true } : prev));
  }
  useEffect(() => {
    if (entered && debrief && route !== "#/presenter")
      evidenceDialog.current?.showModal();
    else if (evidenceDialog.current?.open) evidenceDialog.current.close();
  }, [entered, debrief, route]);
  function acknowledgeEvidence() {
    setGame((prev) => (prev ? { ...prev, pendingDebrief: null } : prev));
  }
  function reset() {
    if (
      window.confirm(
        "Start over? This permanently clears this browser’s team progress, hints, and timer.",
      )
    ) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      setGame(null);
      setEntered(false);
      setSelected(0);
      setAnswer("");
      setMessage("");
      setWorksheet(false);
    }
  }
  function choose(n: number) {
    if (n > stageForStep(game?.step || 0)) return;
    setSelected(n);
    setTab(-1);
    setAnswer("");
    setSelectedConclusions([]);
    setMessage("");
  }
  function start() {
    if (!team.trim()) return;
    setMoneyTabs([]);
    setGame(newGame(team, members, duration));
    setEntered(true);
    choose(-1);
  }
  function verify(value = answer) {
    if (!game) return;
    if (game.step === 3 && moneyTabs.length < 2) {
      setMessage(
        "Open both the internal forecast and the later SEC complaint before verifying the comparison.",
      );
      return;
    }
    const updated = submit(game, value, selected);
    if (updated === game) {
      setMessage(
        selected === 4
          ? "ACCESS DENIED. Credential does not match the physical backup key."
          : "Finding not verified. Check the record or ask for a hint.",
      );
      return;
    }
    setGame(updated);
    setAnswer("");
    setMessage(
      game.step === 0
        ? "Clearance updated. An additional record is now accessible in this directory."
        : "Finding saved. Your file access has been updated.",
    );
  }
  const step = game?.step || 0;
  const count = completedCount(step);
  const remaining = game
    ? Math.min(
        game.duration * 60,
        Math.max(
          0,
          Math.ceil(
            (game.startedAt +
              game.duration * 60000 -
              (game.completedAt || now)) /
              1000,
          ),
        ),
      )
    : duration * 60;
  const current = stageForStep(step);
  const isPresenter = route === "#/presenter";
  const top = (
    <header className="topbar">
      <a href="#/" className="brand">
        <span className="brand-mark">
          t<span>h</span>
        </span>
        <div>
          THERANOS<small>INTERNAL FILE ARCHIVE</small>
        </div>
      </a>
      <div className="top-right">
        <span className="secure">
          <span className="status-dot" /> EMPLOYEE FILE ACCESS
        </span>
        {game && entered && !isPresenter && (
          <div className={"timer " + (remaining <= 120 ? "urgent" : "")}>
            <span>
              {game.completedAt
                ? "EVIDENCE SECURED"
                : remaining === 0
                  ? "AUDIT WINDOW EXPIRED"
                  : "SECURITY AUDIT IN"}
            </span>
            <strong>{clock(remaining)}</strong>
          </div>
        )}
      </div>
    </header>
  );
  const footer = (
    <footer>
      <span>INTERNAL ARCHIVE / ACCESS LOGGED</span>
      <a href="#/presenter">
        Presenter access <ChevronRight size={12} />
      </a>
    </footer>
  );
  if (isPresenter)
    return (
      <>
        {top}
        <main className="presenter">
          <a href="#/" className="text-button">
            ← Student archive
          </a>
          <span className="eyebrow">CLASSROOM FACILITATION</span>
          <h1>
            Presenter view <span className="badge">SPOILERS</span>
          </h1>
          {!presenter ? (
            <section className="panel">
              <h2>Answer key & physical override</h2>
              <p>
                This area contains the game’s solutions. Open it away from
                students. This confirmation is an accidental-access gate, not
                secure authentication.
              </p>
              <button className="primary" onClick={() => setPresenter(true)}>
                I’m the presenter. Show tools <ArrowRight size={16} />
              </button>
            </section>
          ) : (
            <Presenter
              duration={duration}
              setDuration={setDuration}
              reset={reset}
            />
          )}
        </main>
        {footer}
      </>
    );
  if (!entered || !game)
    return (
      <>
        {top}
        <main className="welcome">
          <div className="welcome-copy">
            <span className="eyebrow">
              <span className="status-dot" /> NEW-HIRE ORIENTATION / 2015
            </span>
            <h1>
              One drop.
              <br />A world of <em>secrets.</em>
            </h1>
            <p className="lead">
              Welcome to Theranos.
              <br />
              You have a new employee account with limited access.
            </p>
            <p>
              Your account opens the Theranos archive. It contains internal
              records from 2013–2015 and later investigative filings.
            </p>
            <div className="mission">
              <ShieldCheck size={21} />
              <div>
                <strong>Your assignment has changed.</strong>
                <p>
                  Work with your whistleblower contacts. Look through the
                  records, recover four case elements, and secure the archive
                  before the security audit.
                </p>
              </div>
            </div>
            <div className="welcome-stats">
              <div>
                <strong>04</strong>
                <span>CASE FILES</span>
              </div>
              <div>
                <strong>{duration}:00</strong>
                <span>AUDIT WINDOW</span>
              </div>
              <div>
                <strong>4–5</strong>
                <span>PEOPLE / TEAM</span>
              </div>
            </div>
          </div>
          <section className="login panel">
            <div className="login-icon">
              <Fingerprint size={32} />
            </div>
            <span className="eyebrow">EMPLOYEE ACCESS TERMINAL</span>
            <h2>Begin your investigation.</h2>
            {game ? (
              <>
                <div className="resume">
                  <strong>{game.team}</strong>
                  <span>
                    {count} / 4 elements recovered · timer continues while away
                  </span>
                </div>
                <button
                  className="primary"
                  onClick={() => {
                    setEntered(true);
                    choose(-1);
                  }}
                >
                  Continue existing investigation <ArrowRight size={16} />
                </button>
                <button className="text-button" onClick={reset}>
                  <RotateCcw size={14} /> Start over
                </button>
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  start();
                }}
              >
                <label htmlFor="team">
                  TEAM NAME <span>REQUIRED</span>
                </label>
                <input
                  id="team"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  maxLength={60}
                  required
                  placeholder="e.g. The Red Flags"
                  autoComplete="off"
                />
                <label htmlFor="members">
                  TEAM MEMBERS <span>OPTIONAL</span>
                </label>
                <input
                  id="members"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  maxLength={200}
                  placeholder="Who’s on your investigation?"
                />
                <div className="briefing">
                  <LockKeyhole size={15} />
                  <span>
                    Wait for your presenter’s “Go.” Starting opens your{" "}
                    {duration}-minute audit window. Two hint credits included.
                    The last clue is physically in the classroom.
                  </span>
                </div>
                <button className="primary" type="submit">
                  Enter database / start <ArrowRight size={16} />
                </button>
              </form>
            )}
            <p className="fine">
              Local browser storage only. No accounts. No database.
            </p>
          </section>
        </main>
        {footer}
      </>
    );
  return (
    <>
      {top}
      {storageError && (
        <div role="alert" className="security-alert">
          Browser storage is unavailable. Keep this tab open; refresh may lose
          progress.
        </div>
      )}
      <div className="app-layout">
        <nav className="explorer" aria-label="Case files">
          <div className="identity">
            <div className="avatar">{game.team.slice(0, 2).toUpperCase()}</div>
            <div>
              <strong>{game.team}</strong>
              <span>EMPLOYEE / TEMPORARY ACCESS</span>
            </div>
          </div>
          <div className="nav-title">
            EVIDENCE DIRECTORY <span>04</span>
          </div>
          <button
            className={"file-nav root-nav " + (selected === -1 ? "active" : "")}
            onClick={() => choose(-1)}
          >
            <Folder size={18} />
            <span>
              <small>FILE SYSTEM</small>
              <strong>Archive root</strong>
            </span>
          </button>
          {files.map((f, i) => (
            <button
              key={f.name}
              disabled={i > current}
              className={"file-nav " + (selected === i ? "active" : "")}
              onClick={() => choose(i)}
            >
              <span className="folder-icon">
                {i < count ? (
                  <CheckCircle2 size={18} />
                ) : i > current ? (
                  <LockKeyhole size={18} />
                ) : (
                  <Folder size={18} />
                )}
              </span>
              <span>
                <small>CASE FILE 0{i + 1}</small>
                <strong>{f.name}</strong>
                <em>{i < count ? "EVIDENCE RECOVERED" : f.tag}</em>
              </span>
              {i <= current && <ChevronRight size={13} />}
            </button>
          ))}
          <div className="nav-divider" />
          <button
            className={"file-nav " + (selected === 4 ? "active" : "")}
            disabled={current < 4}
            onClick={() => choose(4)}
          >
            <LockKeyhole size={18} />
            <span>
              <small>OFFLINE CREDENTIAL</small>
              <strong>Final override</strong>
            </span>
          </button>
          <div className="nav-bottom">
            <ShieldCheck size={20} />
            <p>
              READ CAREFULLY.
              <br />
              QUESTION EVERYTHING.
            </p>
            <button className="text-button" onClick={reset}>
              <RotateCcw size={13} /> Start over
            </button>
          </div>
        </nav>
        <main className="reader">
          <div className="breadcrumb">
            <button onClick={() => choose(-1)}>Archive</button>
            {selected >= 0 && <ChevronRight size={12} />}
            <span>
              {selected === -1
                ? "Root directory"
                : selected < 4
                  ? `Case file 0${selected + 1}`
                  : "Executive override"}
            </span>
            <span className="live-dot">● LIVE SESSION</span>
          </div>
          {remaining <= 360 && !game.completedAt && (
            <div className="security-alert" role="status">
              {remaining === 0
                ? "AUDIT WINDOW EXPIRED. Your evidence is retained. A presenter may allow you to continue or ask you to review."
                : remaining <= 120
                  ? "Employee access permissions will be audited shortly."
                  : "IT has detected unusual file activity."}{" "}
              <small>SECURITY MONITOR</small>
            </div>
          )}
          {selected === -1 ? (
            <>
              <div className="case-title">
                <div>
                  <span className="eyebrow">
                    THERANOS / INTERNAL FILE SYSTEM
                  </span>
                  <h1>
                    Internal archive<span>.</span>
                  </h1>
                </div>
                <Folder size={34} />
              </div>
              <Directory
                selected={-1}
                current={current}
                step={step}
                onFolder={choose}
                onDocument={() => {}}
              />
              <p className="directory-note">
                SESSION: {game.team} · {count} / 4 case elements secured ·
                Permissions are updated as findings are verified.
              </p>
            </>
          ) : game.completedAt && selected === 4 ? (
            <section className="success">
              <div className="success-seal">
                <ShieldCheck size={45} />
              </div>
              <span className="eyebrow">ACCESS GRANTED | EVIDENCE SECURED</span>
              <h1>
                You escaped
                <br />
                Theranos.
              </h1>
              <p>
                You recovered the evidence and escaped the archive.
                <br />
                Report to your whistleblower contact.
              </p>
              <div className="success-stats">
                <div>
                  <span>ELAPSED TIME</span>
                  <strong>
                    {clock(
                      Math.floor((game.completedAt - game.startedAt) / 1000),
                    )}
                  </strong>
                </div>
                <div>
                  <span>CASE ELEMENTS</span>
                  <strong>4 / 4</strong>
                </div>
              </div>
              <p className="fine">
                {game.team} · Completed{" "}
                {new Date(game.completedAt).toLocaleString()}
              </p>
              <p>
                You connected what Theranos claimed, what leadership knew, why
                the information mattered to investors, and how their money
                reached the company. Each finding builds a different part of the
                case.
              </p>
              <details className="completed-case-context">
                <summary>How the evidence fits together</summary>
                <p>
                  A jury considers the evidence together. The prosecution must
                  prove every required element beyond a reasonable doubt, but
                  each document does not have to prove every element by itself.
                  In the actual trial, the evidence supported convictions for
                  Holmes on one investor-fraud conspiracy count and three
                  investor wire-fraud counts. That trial included additional
                  documents and testimony beyond the records in this archive.
                </p>
                <a href={sources[6].url} target="_blank" rel="noreferrer">
                  DOJ verdict report <ExternalLink size={11} />
                </a>
              </details>
              <button
                className="primary"
                onClick={() => setWorksheet(!worksheet)}
              >
                Show evidence worksheet <FileText size={16} />
              </button>
              <p>
                <b>Show this success screen to a presenter.</b> The first
                verified team can be announced as the winner.
              </p>
            </section>
          ) : selected === 4 ? (
            <>
              <span className="eyebrow">
                EXECUTIVE SECURITY / PHYSICAL BACKUP
              </span>
              <h1>
                The last key
                <br />
                is offline.
              </h1>
              <section className="panel override">
                <LockKeyhole size={30} />
                <h2>All four case files recovered.</h2>
                <p>
                  The final executive credential is not stored in the network.
                  IT’s audit note points to a physical override card secured{" "}
                  <b>under the podium at the front of the classroom.</b>
                </p>
                <p>
                  Send <b>ONE runner</b> to retrieve or read the clue, return to
                  your team, and enter the complete credential. Do not move the
                  podium or touch electronics.
                </p>
                <span className="eyebrow">
                  EXECUTIVE CREDENTIAL / PHYSICAL BACKUP
                </span>
              </section>
            </>
          ) : (
            <>
              <div className="case-title">
                <div>
                  <span className="eyebrow">
                    CASE FILE 0{selected + 1} / {files[selected].tag}
                  </span>
                  <h1>
                    {files[selected].name}
                    <span>.</span>
                  </h1>
                </div>
                <FileText size={34} />
              </div>
              {selected === 2 && (
                <div className="timeline">
                  <span>POST-EXPOSÉ INVESTIGATIVE RECORDS</span>
                  <p>
                    This folder includes a 2015 financial model and a later SEC
                    complaint. The complaint was filed in 2018.
                  </p>
                </div>
              )}
              {selected === 3 && (
                <div className="timeline">
                  <span>POST-EXPOSÉ INVESTIGATIVE RECORDS / 2020</span>
                  <p>
                    This charging document was filed in 2020. It was not part of
                    the company’s internal records in 2015.
                  </p>
                </div>
              )}
              {tab < 0 ? (
                <Directory
                  selected={selected}
                  current={current}
                  step={step}
                  onFolder={choose}
                  onDocument={(n) => {
                    setTab(n);
                    if (selected === 2)
                      setMoneyTabs((prev) => Array.from(new Set([...prev, n])));
                  }}
                />
              ) : (
                <>
                  <button className="text-button" onClick={() => setTab(-1)}>
                    ← Folder contents
                  </button>
                  <div
                    className="document-tabs"
                    role="tablist"
                    aria-label="Evidence documents"
                  >
                    {documentNames[selected].map((t, i) => (
                      <button
                        role="tab"
                        aria-selected={tab === i}
                        key={t}
                        disabled={selected === 0 && i === 1 && step < 1}
                        onClick={() => {
                          setTab(i);
                          if (selected === 2)
                            setMoneyTabs((prev) =>
                              Array.from(new Set([...prev, i])),
                            );
                        }}
                        className={tab === i ? "active" : ""}
                      >
                        {t}
                        {selected === 0 && i === 1 && step < 1 && (
                          <LockKeyhole size={12} />
                        )}
                      </button>
                    ))}
                  </div>
                  <Document stage={selected} tab={tab} onZoom={setZoom} />
                </>
              )}
            </>
          )}
          {!game.completedAt &&
            selected === current &&
            (tab >= 0 || selected === 4) &&
            (selected !== 0 || tab === (step === 0 ? 0 : 1)) && (
              <section className="verification">
                <div className="verification-title">
                  <span className="eyebrow">
                    {selected === 4
                      ? "EXECUTIVE OVERRIDE"
                      : "EVIDENCE VERIFICATION"}
                  </span>
                  <span>0{Math.min(step + 1, 7)} / 07</span>
                </div>
                <h2>{questions[step]}</h2>
                {step === 5 ? (
                  <form
                    className="wire-analysis"
                    onSubmit={(e) => {
                      e.preventDefault();
                      verify(wireFinding(answer, selectedConclusions));
                    }}
                  >
                    <label htmlFor="transfer-count">Transfer count</label>
                    <input
                      id="transfer-count"
                      inputMode="numeric"
                      value={answer}
                      onChange={(e) => {
                        setAnswer(e.target.value);
                        setMessage("");
                      }}
                      required
                      autoComplete="off"
                      placeholder="Count number"
                    />
                    <fieldset>
                      <legend>
                        Which conclusions belong in the case file?
                      </legend>
                      {wireConclusions.map((option) => (
                        <label className="conclusion-option" key={option.id}>
                          <input
                            type="checkbox"
                            checked={selectedConclusions.includes(option.id)}
                            onChange={(e) => {
                              setSelectedConclusions((prev) =>
                                e.target.checked
                                  ? [...prev, option.id]
                                  : prev.filter((id) => id !== option.id),
                              );
                              setMessage("");
                            }}
                          />
                          <span>{option.text}</span>
                        </label>
                      ))}
                    </fieldset>
                    <button type="submit" className="primary">
                      Verify finding <ArrowRight size={16} />
                    </button>
                  </form>
                ) : step === 4 ? (
                  <div className="judgment">
                    <button
                      onClick={() => {
                        setAnswer("YES");
                        verify("YES");
                      }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        setAnswer("NO");
                        verify("NO");
                      }}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      verify();
                    }}
                  >
                    <label className="sr-only" htmlFor="answer">
                      {step === 3
                        ? "Projection reduction and historical revenue, separated by a hyphen"
                        : step === 6
                          ? "Complete executive credential"
                          : "Your evidence answer"}
                    </label>
                    <input
                      id="answer"
                      value={answer}
                      onChange={(e) => {
                        setAnswer(e.target.value);
                        setMessage("");
                      }}
                      placeholder={
                        step === 3
                          ? "Decrease-historical revenue"
                          : step === 6
                            ? "Enter complete credential"
                            : "Enter your finding"
                      }
                      autoComplete="off"
                      required
                    />
                    <button type="submit" className="primary">
                      {step === 6 ? "Unlock archive" : "Verify finding"}{" "}
                      <ArrowRight size={16} />
                    </button>
                  </form>
                )}
                <p className="feedback" role="status">
                  {message}
                </p>
                <div className="hint-row">
                  <button
                    className="text-button"
                    disabled={game.hints === 0}
                    onClick={() => setGame(takeHint(game))}
                  >
                    <Lightbulb size={15} /> Request hint ({game.hints} left)
                  </button>
                  {game.hints === 0 && (
                    <span className="fine">
                      Ask a presenter for assistance.
                    </span>
                  )}
                </div>
                {game.hintLog.length > 0 && (
                  <details className="hints" open>
                    <summary>
                      Whistleblower notes ({game.hintLog.length})
                    </summary>
                    {game.hintLog.map((h, i) => (
                      <p key={i}>{h}</p>
                    ))}
                  </details>
                )}
              </section>
            )}
          {selected >= 0 && selected < count && selected < 4 && (
            <section className="unlock">
              <span className="eyebrow">
                <Check size={14} /> {files[selected].message}
              </span>
              <h2>
                Fragment secured:{" "}
                <code>
                  {files[selected].element} / {files[selected].fragment}
                </code>
              </h2>
              <details>
                <summary>Evidence context</summary>
                <p>{files[selected].why}</p>
              </details>
              <button className="text-button" onClick={() => choose(-1)}>
                Return to archive root <Folder size={15} />
              </button>
            </section>
          )}
          {worksheet && (
            <div id="full-worksheet">
              <Notebook game={game} full />
            </div>
          )}
          <div className="audit">
            <span>
              <Terminal size={13} /> ACCESS LOG / SYSTEM EVENTS
            </span>
            {game.events.slice(-3).map((e, i) => (
              <p key={i}>
                <span>›</span> {e}
              </p>
            ))}
          </div>
        </main>
        <aside className="evidence-sidebar">
          <Notebook game={game} />
          <div className="contact">
            <span className="eyebrow">SECURE CHANNEL</span>
            <p>
              “We need to assemble the case. The archive will show you what
              investigators eventually uncovered.”
            </p>
            <span>Your whistleblower contact</span>
          </div>
        </aside>
      </div>
      {footer}
      <dialog
        ref={evidenceDialog}
        className="whistleblower-dialog evidence-debrief"
        aria-labelledby="evidence-note-title"
        aria-describedby="evidence-note-explanation"
        onCancel={acknowledgeEvidence}
        onClose={acknowledgeEvidence}
      >
        {debrief && (
          <>
            <span className="eyebrow">
              <CheckCircle2 size={14} /> FINDING ACCEPTED / CASE CONTEXT
            </span>
            <h2 id="evidence-note-title">{debrief.title}</h2>
            <span className="eyebrow">{debrief.element}</span>
            <p id="evidence-note-explanation">{debrief.explanation}</p>
            <p className="fine">{debrief.context}</p>
            <div className="debrief-sources">
              {debrief.sourceIds.map((i) => (
                <a
                  key={i}
                  href={sources[i].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {sources[i].id} · {sources[i].date} · {sources[i].pages}{" "}
                  <ExternalLink size={10} />
                </a>
              ))}
            </div>
            <button className="primary" autoFocus onClick={acknowledgeEvidence}>
              Return to files <ArrowRight size={16} />
            </button>
          </>
        )}
      </dialog>
      <dialog
        ref={briefingDialog}
        className="whistleblower-dialog"
        aria-labelledby="briefing-title"
        onCancel={acknowledgeBriefing}
        onClose={acknowledgeBriefing}
      >
        <span className="eyebrow">
          <span className="status-dot" /> INCOMING MESSAGE / WHISTLEBLOWER
          CHANNEL
        </span>
        <h2 id="briefing-title">You’re in. Look closer.</h2>
        <p>
          The company’s story and its records don’t match. We’ve opened a way
          into the file system, but your clearance is limited.
        </p>
        <p>
          Look through the files. Submit your findings to unlock the next
          directory. Collect the four evidence fragments and secure the archive
          before the audit. The last credential is kept offline.
        </p>

        <button className="primary" autoFocus onClick={acknowledgeBriefing}>
          Close channel <ArrowRight size={16} />
        </button>
      </dialog>
      <dialog
        ref={dialog}
        onCancel={() => setZoom("")}
        onClose={() => setZoom("")}
        className="zoom-dialog"
      >
        <button
          ref={closeButton}
          className="close"
          aria-label="Close document preview"
          onClick={() => setZoom("")}
        >
          <X />
        </button>
        <p>
          Original exhibit page · Scroll to read. Use browser zoom to enlarge.
        </p>
        {zoom && (
          <img
            src={zoom}
            alt="Enlarged original government trial exhibit page"
          />
        )}
      </dialog>
    </>
  );
}

function Presenter({
  duration,
  setDuration,
  reset,
}: {
  duration: number;
  setDuration: (n: number) => void;
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const studentUrl = new URL(location.href);
  studentUrl.hash = "";
  studentUrl.search = `?duration=${duration}`;
  return (
    <>
      <div className="presenter-grid">
        <section className="panel">
          <h2>01 / Set the room</h2>
          <p>
            Make teams of 4–5. Print the physical card and tape copies
            underneath the front lip of the podium, reachable without touching
            electronics. Send one runner per team.
          </p>
          <label htmlFor="duration">NEW SESSION AUDIT WINDOW</label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => {
              const n = Number(e.target.value);
              setDuration(n);
              try {
                localStorage.setItem(SETTINGS_KEY, String(n));
              } catch {}
            }}
          >
            {[10, 12, 15].map((n) => (
              <option key={n} value={n}>
                {n} minutes
              </option>
            ))}
          </select>
          <p>
            Settings apply on this device only. Share this link to set the
            duration on student devices. It does not change an ongoing
            investigation.
          </p>
          <input
            aria-label="Student session link"
            readOnly
            value={studentUrl.href}
          />
          <button
            className="text-button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(studentUrl.href);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? "Link copied" : "Copy student link"}
          </button>
          <p>
            Deliver the theatrical introduction first. Ask all teams to press
            START on “Go.” Timers run locally; choose the first team to show a
            success screen. At expiry, verbally stop the round or allow
            finishing.
          </p>
          <button className="text-button" onClick={reset}>
            <RotateCcw size={14} /> Reset demo / this browser
          </button>
        </section>
        <section className="panel">
          <h2>02 / Physical override</h2>
          <p>
            Print this card before class. The token and order are deliberately
            absent from student screens.
          </p>
          <div className="override-card">
            <strong>THERANOS | EXECUTIVE SECURITY OVERRIDE</strong>
            <p>CLASSIFIED: PHYSICAL BACKUP KEY</p>
            <p>
              The archive requires the four evidence fragments in this order:
            </p>
            <ol>
              <li>FALSE / MISLEADING CLAIMS (F)</li>
              <li>MATERIALITY (M)</li>
              <li>KNOWLEDGE / INTENT (I)</li>
              <li>INTERSTATE WIRE (W)</li>
            </ol>
            <p>PREPEND THIS SECURITY TOKEN:</p>
            <b className="token">K7Q</b>
            <p>Final input format: TOKEN-F-M-I-W</p>
          </div>
          <button className="primary" onClick={() => printSection("card")}>
            <Printer size={16} /> Print override card
          </button>
        </section>
      </div>
      <section className="panel">
        <h2>03 / Answer key & pacing</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Case</th>
                <th>Answers</th>
                <th>Fragment</th>
                <th>Time / facilitation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The claim</td>
                <td>ALL → TT3</td>
                <td>F / 51</td>
                <td>
                  2–3 min. Contrast absolutes with QC data; 51.3 rounds to 51.
                </td>
              </tr>
              <tr>
                <td>The warning</td>
                <td>SEVERAL</td>
                <td>I / 07</td>
                <td>
                  1–2 min. Second replacement; seven letters. Receipt is
                  relevant to knowledge.
                </td>
              </tr>
              <tr>
                <td>The money story</td>
                <td>60-108 → No</td>
                <td>M / 108</td>
                <td>
                  2–3 min. 113 − 53 = 60. Historical revenue and forecasts are
                  different.
                </td>
              </tr>
              <tr>
                <td>The transfer</td>
                <td>Count 6 + timeline and charging-paragraph conclusions</td>
                <td>W / 38</td>
                <td>
                  About 2 min. Select the conclusions that the payment followed
                  the marketing warnings and that the charging paragraph links
                  it to the alleged scheme. Reject the 2015-model cause and the
                  claim that the bank row identifies what the investor was told.
                </td>
              </tr>
              <tr>
                <td>Final override</td>
                <td colSpan={2}>
                  <code>K7Q-51-108-07-38</code>
                </td>
                <td>Physical card supplies token and F–M–I–W order.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Give teams a minute to inspect before suggesting hints. Each team has
          two digital hint credits; presenters can give additional verbal help.
          At six minutes remaining the audit alert appears, with a stronger
          warning at two minutes.
        </p>
        <p>
          Rehearsal: open the student link, enter a team, complete each answer
          above, refresh mid-round to check persistence, then enter the final
          code only at the final stage. Use “Start over” with confirmation for a
          fresh run.
        </p>
      </section>
      <section className="panel">
        <h2>04 / Paper evidence worksheet</h2>
        <div className="blank-worksheet">
          <h2>Theranos: Evidence worksheet</h2>
          <p>Team: ____________________ &nbsp; Members: ____________________</p>
          <table>
            <thead>
              <tr>
                <th>Document name / source ID</th>
                <th>Fraud-related element</th>
                <th>Why it matters</th>
                <th>Fragment</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((n) => (
                <tr key={n}>
                  <td>Case file 0{n}</td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            These are simplified classroom categories, not complete jury
            instructions. Consider the evidence together.
          </p>
        </div>
        <button className="text-button" onClick={() => printSection("blank")}>
          <Printer size={16} /> Print blank worksheet
        </button>
      </section>
      <section className="panel">
        <h2>05 / Debrief · 3–5 minutes</h2>
        <ol className="debrief">
          <li>
            <b>Claims and QC (45 seconds).</b> Ask which language made the
            marketing claim absolute. Internal quality-control failures
            challenge sweeping technological representations. They do not
            measure the patient error rate.
          </li>
          <li>
            <b>Knowledge and intent (45 seconds).</b> Ask who received the
            warnings. The forwarded comments are relevant to knowledge; intent
            requires the totality of the evidence, not receipt of one email.
          </li>
          <li>
            <b>Forecast versus history (60 seconds).</b> A changing forecast is
            not inherently fraud. Ask why an allegedly inaccurate statement of
            revenue already earned could matter to a reasonable investor. The
            SEC’s 2018 complaint contains allegations.
          </li>
          <li>
            <b>Wires (30 seconds).</b> Prosecutors traced interstate transfers
            connected to investor-fraud allegations. The 2020 charging document
            is not a verdict. The wire element concerns communications in
            furtherance of a scheme.
          </li>
          <li>
            <b>Actual outcome (60 seconds).</b> In January 2022, a federal jury
            convicted Holmes on one investor-fraud conspiracy count and three
            investor wire-fraud counts. She was acquitted of the patient-related
            conspiracy and three patient-related substantive counts. There was
            no unanimous verdict on three additional investor counts. Do not
            claim each game exhibit individually caused the conviction.{" "}
            <a href={sources[6].url}>DOJ verdict report ↗</a>
          </li>
        </ol>
        <p>
          The F, M, I, W categories help organize the evidence. They are not
          complete jury instructions. No individual record has to establish
          every element of fraud. At trial, the jury considers the evidence
          together and the prosecution must prove every required element beyond
          a reasonable doubt. The game covers selected records; the actual trial
          included additional documents and testimony.
        </p>
      </section>
      <section className="panel">
        <h2>06 / Primary-source registry</h2>
        {sources.map((s, i) => (
          <SourceMeta key={s.id} index={i} />
        ))}
      </section>
      <p className="fine">
        No database, authentication service, or cross-device leaderboard. Static
        answers can be inspected in source code; classroom gating is not
        tamper-proof security.
      </p>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
