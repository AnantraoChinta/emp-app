/*
 * Simple in-memory data & table rendering — swap this for real
 * API calls once your backend is ready.
 */
const lessons = [
    {
      id: 1,
      title: "ncte_excerpt_2119",
      assets: "1 asset(s) / 34.47 kB",
      analysis: "Ready",
      created: "05/22/2025",
    },
  ];
  
  let currentPage = 0;
  let rowsPerPage = 10;
  
  function renderTable() {
    const tbody = document.querySelector("#lessonsTable tbody");
    tbody.innerHTML = "";
  
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = lessons.slice(start, end);
  
    pageData.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="checkbox" class="rowCheckbox" data-id="${item.id}"
                   onchange="updateToolbar()" /></td>
        <td><a href="#">${item.title}</a></td>
        <td>${item.assets}</td>
        <td class="status-ready">${item.analysis}</td>
        <td style="text-align:right;">${item.created}</td>`;
      tbody.appendChild(tr);
    });
  
    // Pagination info + buttons
    document.getElementById("pageInfo").textContent =
      `${start + 1}–${Math.min(end, lessons.length)} of ${lessons.length}`;
    document.getElementById("prevPage").disabled = currentPage === 0;
    document.getElementById("nextPage").disabled = end >= lessons.length;
  
    // Reset master checkbox & toolbar
    document.getElementById("masterCheckbox").checked = false;
    updateToolbar();
  }
  
  function toggleAll(master) {
    document
      .querySelectorAll(".rowCheckbox")
      .forEach((cb) => (cb.checked = master.checked));
    updateToolbar();
  }
  
  function updateToolbar() {
    const anyChecked = [...document.querySelectorAll(".rowCheckbox")].some(
      (cb) => cb.checked
    );
    document.getElementById("exportBtn").disabled = !anyChecked;
    document.getElementById("deleteBtn").disabled = !anyChecked;
  }
  
  function applySearch() {
    alert("🔍 Search is stubbed in this prototype — wire it to your API call 🛠️");
  }
  
  function refreshTable() {
    alert("🔄 Refresh triggered — replace with real data fetch ✨");
    // e.g., fetch('/api/lessons').then(...)
  }
  
  function changeRowsPerPage(val) {
    rowsPerPage = parseInt(val, 10);
    currentPage = 0;
    renderTable();
  }
  
  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      renderTable();
    }
  }
  
  function nextPage() {
    const maxPage = Math.floor((lessons.length - 1) / rowsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      renderTable();
    }
  }
  
  // Initial paint
  renderTable();
  