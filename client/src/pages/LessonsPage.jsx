import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css";
import "./LessonsPage.css";

/* ─── static demo lessons ─────────────────────────────── */
const DEMO_LESSONS = [
  {
    id: 1,
    title: "Introduction to Photosynthesis",
    assets: 3,
    analysis: "Ready",
    statusClass: "status-ready",
    created: "2025-06-01",
  },
  {
    id: 2,
    title: "Newton's Laws of Motion",
    assets: 2,
    analysis: "Draft",
    statusClass: "status-draft",
    created: "2025-05-28",
  },
  {
    id: 3,
    title: "The Water Cycle",
    assets: 4,
    analysis: "In progress",
    statusClass: "status-progress",
    created: "2025-05-26",
  },
  {
    id: 4,
    title: "Shakespeare's Sonnets",
    assets: 5,
    analysis: "Ready",
    statusClass: "status-ready",
    created: "2025-04-30",
  },
];

export default function LessonsPage() {
  const navigate = useNavigate();

  const [selectedIds, setSelected] = useState(new Set());
  const [rowsPerPage, setRpp] = useState(10);
  const [page, setPage] = useState(0);

  const lessons = DEMO_LESSONS;
  const start = page * rowsPerPage;
  const end = Math.min(start + rowsPerPage, lessons.length);
  const pageData = lessons.slice(start, end);
  const allChecked =
    pageData.length && pageData.every((l) => selectedIds.has(l.id));

  const toggle = (id, checked) => {
    setSelected((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };
  const toggleAll = (checked) => {
    setSelected((prev) => {
      const next = new Set(prev);
      checked
        ? pageData.forEach((l) => next.add(l.id))
        : pageData.forEach((l) => next.delete(l.id));
      return next;
    });
  };

  return (
    <>
      <header className="app-bar">
        <span className="app-title">M-Powering Teachers</span>
        <div className="user-info">
          <span>Hello, Anantrao Chinta</span>
          <span className="material-icons" aria-hidden="true">
            account_circle
          </span>
        </div>
      </header>

      <main>
        <div className="page-header">
          <h1>Lessons</h1>
          <button className="btn-primary" onClick={() => navigate("/upload")}>
            <span className="material-icons" aria-hidden="true">
              add
            </span>
            &nbsp;ADD NEW LESSON
          </button>
        </div>

        <div className="storage">
          <span>Used 34.47 kB</span>
          <div className="storage-bar" />
          <span>125.00 MB</span>
        </div>

        <section className="card">
          <div className="toolbar">
            <input
              type="text"
              placeholder="Search by title or content"
              disabled
            />
            <button
              className="icon-btn material-icons"
              title="Search"
              disabled
            >
              search
            </button>
            <button
              className="icon-btn material-icons"
              title="Export"
              disabled={!selectedIds.size}
            >
              download
            </button>
            <button
              className="icon-btn material-icons"
              title="Delete"
              disabled={!selectedIds.size}
            >
              delete
            </button>
            <button className="icon-btn material-icons" title="Refresh" disabled>
              refresh
            </button>
          </div>

          <table id="lessonsTable">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={(e) => toggleAll(e.target.checked)}
                  />
                </th>
                <th>Title</th>
                <th>Assets</th>
                <th>Analysis</th>
                <th style={{ textAlign: "right" }}>Created at</th>
              </tr>
            </thead>
            <tbody>
              {!pageData.length && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "24px" }}>
                    No lessons
                  </td>
                </tr>
              )}

              {pageData.map((r) => (
                <tr key={r.id} className="row-hoverable">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(r.id)}
                      onChange={(e) => toggle(r.id, e.target.checked)}
                    />
                  </td>
                  <td>
                    <a href={`/analysis/${r.id}`}>{r.title}</a>
                  </td>
                  <td>{r.assets}</td>
                  <td className={r.statusClass}>{r.analysis}</td>
                  <td style={{ textAlign: "right" }}>{r.created}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <label>
              Rows&nbsp;per&nbsp;page:&nbsp;
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRpp(+e.target.value);
                  setPage(0);
                }}
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </label>
            <span>
              {lessons.length ? `${start + 1}-${end} of ${lessons.length}` : "0 of 0"}
            </span>
            <button
              className="material-icons"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              chevron_left
            </button>
            <button
              className="material-icons"
              disabled={end >= lessons.length}
              onClick={() => setPage((p) => p + 1)}
            >
              chevron_right
            </button>
          </div>
        </section>
      </main>
    </>
  );
}