// src/pages/LessonsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css";          // global design tokens & utilities
import "./LessonsPage.css";    // page-specific tweaks

// ─── DEMO DATA ─────────────────────────────────────────────────────
const INITIAL_LESSONS = [
  {
    id: 1,
    title: "ncte_excerpt_2119",
    assets: "1 asset(s) / 34.47 kB",
    analysis: "Ready",
    created: "05/22/2025",
  },
];

export default function LessonsPage() {
  const navigate = useNavigate();

  // state
  const [lessons, setLessons]       = useState(INITIAL_LESSONS); // replace w/ fetch
  const [selectedIds, setSelected]  = useState(new Set());
  const [rowsPerPage, setRpp]       = useState(10);
  const [page, setPage]             = useState(0);

  // derived paging
  const start = page * rowsPerPage;
  const end   = Math.min(start + rowsPerPage, lessons.length);
  const pageData = lessons.slice(start, end);

  /* ── helpers ─────────────────────────────────────────── */
  const toggleSelect = (id, checked) => {
    setSelected(prev => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const toggleSelectAll = (checked) => {
    setSelected(prev => {
      const next = new Set(prev);
      checked
        ? pageData.forEach(l => next.add(l.id))
        : pageData.forEach(l => next.delete(l.id));
      return next;
    });
  };

  const allChecked = pageData.length && pageData.every(l => selectedIds.has(l.id));

  /* ── side-effect: fetch lessons list (stub) ───────────── */
  useEffect(() => {
    // (async () => {
    //   const res = await fetch("/api/lessons");
    //   setLessons(await res.json());
    // })();
  }, []);

  return (
    <>
      {/* ─── Header Bar ─────────────────────────────────── */}
      <header className="app-bar">
        <span className="app-title">M-Powering Teachers</span>
        <div className="user-info">
          <span>Hello, Anantrao Chinta</span>
          <span className="material-icons" aria-hidden="true">account_circle</span>
        </div>
      </header>

      {/* ─── Page Content ───────────────────────────────── */}
      <main>
        {/* Page title + CTA */}
        <div className="page-header">
          <h1>Lessons</h1>
          <button
            className="btn-primary"
            onClick={() => navigate("/upload")}
          >
            <span className="material-icons" aria-hidden="true">add</span>
            &nbsp;ADD NEW LESSON
          </button>
        </div>

        {/* Storage quota bar */}
        <div className="storage">
          <span>Used 34.47&nbsp;kB</span>
          <div className="storage-bar"></div>
          <span>125.00&nbsp;MB</span>
        </div>

        {/* Card with toolbar + table + pagination */}
        <section className="card">
          {/* Toolbar */}
          <div className="toolbar">
            <input type="text" placeholder="Search by title or content" disabled />
            <button className="icon-btn material-icons" title="Search" disabled>search</button>
            <button
              className="icon-btn material-icons"
              title="Export"
              disabled={!selectedIds.size}
            >download</button>
            <button
              className="icon-btn material-icons"
              title="Delete"
              disabled={!selectedIds.size}
            >delete</button>
            <button
              className="icon-btn material-icons"
              title="Refresh"
              onClick={() => window.location.reload()}
            >refresh</button>
          </div>

          {/* Data table */}
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={e => toggleSelectAll(e.target.checked)}
                  />
                </th>
                <th>Title</th>
                <th>Assets</th>
                <th>Analysis</th>
                <th style={{textAlign:"right"}}>Created at</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map(row => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(row.id)}
                      onChange={e => toggleSelect(row.id, e.target.checked)}
                    />
                  </td>
                  <td><a href="#">{row.title}</a></td>
                  <td>{row.assets}</td>
                  <td className="status-ready">{row.analysis}</td>
                  <td style={{textAlign:"right"}}>{row.created}</td>
                </tr>
              ))}
              {!pageData.length && (
                <tr>
                  <td colSpan={5} style={{padding:"24px", textAlign:"center"}}>
                    No lessons
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <label>
              Rows per page:&nbsp;
              <select
                value={rowsPerPage}
                onChange={e => { setRpp(+e.target.value); setPage(0); }}
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
              onClick={() => setPage(p => p - 1)}
              disabled={page === 0}
            >chevron_left</button>
            <button
              className="material-icons"
              onClick={() => setPage(p => p + 1)}
              disabled={end >= lessons.length}
            >chevron_right</button>
          </div>
        </section>
      </main>
    </>
  );
}
