    // --- CSV parse + stringify (keeps textarea in sync) ---

    function parseCSV(text) {
      const rows = [];
      let row = [];
      let field = "";
      let i = 0;
      let inQuotes = false;

      while (i < text.length) {
        const ch = text[i];

        if (inQuotes) {
          if (ch === '"') {
            const next = text[i + 1];
            if (next === '"') { field += '"'; i += 2; continue; }
            inQuotes = false; i++; continue;
          } else {
            field += ch; i++; continue;
          }
        } else {
          if (ch === '"') { inQuotes = true; i++; continue; }
          if (ch === ',') { row.push(field); field = ""; i++; continue; }
          if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ""; i++; continue; }
          if (ch === '\r') {
            const next = text[i + 1];
            row.push(field); rows.push(row); row = []; field = "";
            i += (next === '\n') ? 2 : 1; continue;
          }
          field += ch; i++;
        }
      }

      row.push(field);
      const hasNonEmpty = row.some(v => v !== "");
      if (hasNonEmpty || rows.length === 0) rows.push(row);

      return { rows, warning: inQuotes ? "Warning: CSV has an unclosed quote." : "" };
    }

    function csvEscapeCell(value) {
      const s = String(value ?? "");
      // Quote if it contains special chars
      if (/[",\r\n]/.test(s)) return '"' + s.replaceAll('"', '""') + '"';
      return s;
    }

    function rowsToCSV(rows) {
      return rows.map(r => r.map(csvEscapeCell).join(",")).join("\n");
    }

    function escapeHTML(s) {
      return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    // --- App state ---
    let currentRows = []; // includes header row if toggle on

    // --- Render ---
    function renderTable(rows, firstRowHeader = true) {
      const host = document.getElementById("tableHost");
      host.innerHTML = "";

      // Remove trailing fully-empty rows
      const cleaned = rows.slice();
      while (cleaned.length > 0 && cleaned[cleaned.length - 1].every(c => c === "")) cleaned.pop();

      if (cleaned.length === 0) {
        host.innerHTML = `<div class="hint">No data to display.</div>`;
        return { rowCount: 0, colCount: 0 };
      }

      let colCount = 0;
      for (const r of cleaned) colCount = Math.max(colCount, r.length);

      const padded = cleaned.map(r => {
        const rr = r.slice();
        while (rr.length < colCount) rr.push("");
        return rr;
      });

      const table = document.createElement("table");

      if (firstRowHeader) {
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        for (let c = 0; c < colCount; c++) {
          const th = document.createElement("th");
          th.innerHTML = escapeHTML(padded[0][c] ?? "");
          tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        for (let r = 1; r < padded.length; r++) {
          const trb = document.createElement("tr");
          trb.dataset.rowIndex = String(r); // index in `currentRows`

          for (let c = 0; c < colCount; c++) {
            const td = document.createElement("td");
            td.innerHTML = escapeHTML(padded[r][c] ?? "");
            trb.appendChild(td);
          }

          // Add "Delete" action cell overlay (doesn't add a new column)
          const actions = document.createElement("td");
          actions.style.borderRight = "0";
          actions.style.background = "transparent";
          actions.style.width = "1px";
          actions.style.padding = "0 8px 0 0";
          actions.style.position = "sticky";
          actions.style.right = "0";
          actions.style.textAlign = "right";

          const btn = document.createElement("button");
          btn.className = "delete-btn";
          btn.type = "button";
          btn.textContent = "Delete";
          btn.title = "Delete this row";
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const idx = Number(trb.dataset.rowIndex);
            deleteRow(idx);
          });

          actions.appendChild(btn);
          trb.appendChild(actions);

          tbody.appendChild(trb);
        }
        table.appendChild(tbody);
      } else {
        const tbody = document.createElement("tbody");
        for (let r = 0; r < padded.length; r++) {
          const trb = document.createElement("tr");
          trb.dataset.rowIndex = String(r);

          for (let c = 0; c < colCount; c++) {
            const td = document.createElement("td");
            td.innerHTML = escapeHTML(padded[r][c] ?? "");
            trb.appendChild(td);
          }

          const actions = document.createElement("td");
          actions.style.borderRight = "0";
          actions.style.background = "transparent";
          actions.style.width = "1px";
          actions.style.padding = "0 8px 0 0";
          actions.style.position = "sticky";
          actions.style.right = "0";
          actions.style.textAlign = "right";

          const btn = document.createElement("button");
          btn.className = "delete-btn";
          btn.type = "button";
          btn.textContent = "Delete";
          btn.title = "Delete this row";
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const idx = Number(trb.dataset.rowIndex);
            deleteRow(idx);
          });

          actions.appendChild(btn);
          trb.appendChild(actions);

          tbody.appendChild(trb);
        }
        table.appendChild(tbody);
      }

      host.appendChild(table);
      return { rowCount: padded.length, colCount };
    }

    // --- UI wiring ---
    const csvInput = document.getElementById("csvInput");
    const renderBtn = document.getElementById("renderBtn");
    const clearBtn = document.getElementById("clearBtn");
    const sampleBtn = document.getElementById("sampleBtn");
    const stats = document.getElementById("stats");
    const errorEl = document.getElementById("error");
    const headerToggle = document.getElementById("headerToggle");
    const fileInput = document.getElementById("fileInput");

    function setStatus(rowCount, colCount, msg = "") {
      stats.textContent = `kə́'βanθ 'rɛn: ${rowCount} • ɛ́'θaɪk: ${colCount}`;
      errorEl.textContent = msg || "";
    }

    function doRenderFromTextarea() {
      const text = csvInput.value ?? "";
      if (text.trim() === "") {
        document.getElementById("tableHost").innerHTML =
          `<div class="hint">Paste CSV above, then click “Render table”.</div>`;
        currentRows = [];
        setStatus(0, 0, "");
        return;
      }
      const { rows, warning } = parseCSV(text);
      currentRows = rows;
      const { rowCount, colCount } = renderTable(currentRows, headerToggle.checked);
      setStatus(rowCount, colCount, warning);
    }

    function syncTextareaToState() {
      csvInput.value = rowsToCSV(currentRows);
    }

    function deleteRow(rowIndex) {
      // If first row is header, we usually don't want to delete header accidentally.
      // We'll still allow it if headerToggle is OFF. If ON and user tries to delete 0, ignore.
      if (headerToggle.checked && rowIndex === 0) return;

      if (rowIndex < 0 || rowIndex >= currentRows.length) return;

      currentRows.splice(rowIndex, 1);
      syncTextareaToState();
      const { rowCount, colCount } = renderTable(currentRows, headerToggle.checked);
      setStatus(rowCount, colCount, "");
    }

    renderBtn.addEventListener("click", doRenderFromTextarea);

    headerToggle.addEventListener("change", () => {
      // Keep same underlying rows; just re-render based on header mode
      const { rowCount, colCount } = renderTable(currentRows, headerToggle.checked);
      setStatus(rowCount, colCount, errorEl.textContent);
    });

    clearBtn.addEventListener("click", () => {
      csvInput.value = "";
      currentRows = [];
      document.getElementById("tableHost").innerHTML =
        `<div class="hint">Paste CSV above, then click “Render table”.</div>`;
      setStatus(0, 0, "");
      csvInput.focus();
    });

    sampleBtn.addEventListener("click", () => {
      csvInput.value =
`name,age,notes
"Alice",30,"Likes commas, like this: a, b, c"
"Bob",28,"Has a quote: ""wow"""
"Charlie",25,"Multi-line note:
Line 2
Line 3"`;
      doRenderFromTextarea();
    });

    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const text = await file.text();
      csvInput.value = text;
      doRenderFromTextarea();
      fileInput.value = "";
    });

    // Initial
    document.getElementById("tableHost").innerHTML =
      `<div class="hint">Paste CSV above, then click “Render table”.</div>`;