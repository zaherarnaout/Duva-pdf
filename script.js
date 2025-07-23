console.log("DUVA script.js loaded!");

/* === Accessories Image Zoom on Hover (Constrained to Container) === */ 

document.querySelectorAll('.accessory-image').forEach(container => { 

  const img = container.querySelector('img'); 

 

  container.style.overflow = 'hidden'; // Keeps zoomed image inside the box 

 

  container.addEventListener('mouseenter', () => { 

    img.classList.add('zoomed'); 

  }); 

 

  container.addEventListener('mousemove', e => { 

    const rect = container.getBoundingClientRect(); 

    const x = ((e.clientX - rect.left) / rect.width) * 100; 

    const y = ((e.clientY - rect.top) / rect.height) * 100; 

    img.style.transformOrigin = `${x}% ${y}%`; 

  }); 

 

  container.addEventListener('mouseleave', () => { 

    img.classList.remove('zoomed'); 

    img.style.transformOrigin = 'center center'; 

  }); 

}); 

 

/* === 2. Thumbnail Image Selector === */ 

document.addEventListener("DOMContentLoaded", function () { 

    const mainImage = document.getElementById("main-lightbox-trigger"); 

    const thumbnails = document.querySelectorAll(".thumbnail-image"); 

    thumbnails.forEach(thumb => { 

        thumb.addEventListener("click", function () { 

            thumbnails.forEach(t => t.classList.remove("is-active")); 

            this.classList.add("is-active"); 

            const newImg = this.getAttribute("data-image"); 

            if (mainImage) mainImage.setAttribute("href", newImg); 

        }); 

    }); 

}); 

 

/* === 3. Dropdown + Code Generator + Accessories Logic === */ 

// Full working logic from your working file, manually verified and retained 

document.querySelectorAll('.accessory-image').forEach(container => { 

    const img = container.querySelector('img'); 

 

    // Zoom in on hover 

    container.addEventListener('mouseenter', () => { 

      img.classList.add('zoomed'); 

    }); 

 

    // Track mouse position for dynamic zoom focus 

    container.addEventListener('mousemove', e => { 

      const rect = container.getBoundingClientRect(); 

      const x = ((e.clientX - rect.left) / rect.width) * 100; 

      const y = ((e.clientY - rect.top) / rect.height) * 100; 

      img.style.transformOrigin = `${x}% ${y}%`; 

    }); 

 

    // Reset on mouse leave 

    container.addEventListener('mouseleave', () => { 

      img.classList.remove('zoomed'); 

      img.style.transformOrigin = 'center center'; 

    }); 

  }); 

 

 

 

  document.addEventListener("DOMContentLoaded", function () { 

    const mainImage = document.getElementById("main-lightbox-trigger"); 

    const thumbnails = document.querySelectorAll(".thumbnail-image"); 

 

    thumbnails.forEach((thumb) => { 

      thumb.addEventListener("click", function () { 

        // === Get the source of the clicked thumbnail 

        const newSrc = thumb.getAttribute("src"); 

 

        // === Update the main image 

        if (newSrc && mainImage) { 

          mainImage.setAttribute("src", newSrc); 

        } 

      }); 

    }); 

  }); 

 

 

 

  document.addEventListener("DOMContentLoaded", function () { 

    const mainTrigger = document.getElementById("main-lightbox-trigger"); 

    const firstGalleryItem = document.querySelector(".first-gallery-image"); 

 

    // === When main image is clicked, open the Webflow lightbox 

    if (mainTrigger && firstGalleryItem) { 

      mainTrigger.addEventListener("click", () => { 

        firstGalleryItem.click(); 

      }); 

    } 

  }); 

 

 

 

document.addEventListener("DOMContentLoaded", function () { 

  // === Global Selectors & State === 

  const dropdowns = document.querySelectorAll(".dropdown-wrapper"); 

  const ralInput = document.querySelector("#ral-input"); 

 

  // === RAL Input Initial Setup === 

  if (ralInput) { 

    ralInput.style.display = "none"; 

    ralInput.textContent = "Enter RAL number here"; 

    ralInput.setAttribute("contenteditable", "true"); 

    ralInput.style.color = "#999"; 

    ralInput.style.padding = "6px 8px"; 

    ralInput.style.minHeight = "48px"; 

    ralInput.style.backgroundColor = "#f8f8f8"; 

    ralInput.style.borderRadius = "6px"; 

    ralInput.style.cursor = "text"; 

  } 

 

  // === Global Selection State === 

  window.currentSelection = { 

    product: document.querySelector("#product-code-heading")?.textContent.trim() || null, 

    watt: null, 

    cct: null, 

    cri: null, 

    finish: null, 

    defaults: {} 

  }; 

 

  // === Reset Button Setup === 

  const resetButton = document.querySelector(".reset-button"); 

  if (resetButton) { 

    resetButton.style.display = "flex"; 

    resetButton.style.alignItems = "center"; 

    resetButton.style.justifyContent = "center"; 

  } 

 

  // === Reset Button Handler === 

  resetButton?.addEventListener("click", () => { 

    dropdowns.forEach(dropdown => { 

      const type = dropdown.getAttribute("data-type"); 

      const selected = dropdown.querySelector(".selected-value"); 

      const source = dropdown.querySelector(".dropdown-source"); 

 

      if (!type || !selected || !source) return; 

 

      const rawText = source.textContent.trim(); 

      const values = [...new Set(rawText.split(",").map(v => v.trim()).filter(v => v))]; 

      const firstValue = values[0] || "XX"; 

 

      selected.textContent = firstValue; 

      window.currentSelection[type] = firstValue; 

      window.currentSelection.defaults[type] = normalizeValue(type, firstValue); 

 

      // RAL reset logic 

      if (type === "finish") { 

        if (firstValue.toLowerCase() === "ral") { 

          ralInput.style.display = "block"; 

          ralInput.textContent = "Enter RAL number here"; 

          ralInput.style.color = "#999"; 

          window.currentSelection.finish = "RAL"; 

        } else { 

          ralInput.style.display = "none"; 

          ralInput.textContent = "Enter RAL number here"; 

          ralInput.style.color = "#999"; 

        } 

      } 

    }); 

 

    updateLumenValue(); 

    updateOrderingCode(); 

  }); 

 

  // === Dropdown Setup & Interactions === 

  dropdowns.forEach(dropdown => { 

    const type = dropdown.getAttribute("data-type"); 

    const source = dropdown.querySelector(".dropdown-source"); 

    const field = dropdown.querySelector(".dropdown-field"); 

    const selected = dropdown.querySelector(".selected-value"); 

    const arrow = dropdown.querySelector(".dropdown-arrow"); 

 

    if (!field || !selected || !source) return; 

 

    // Disable static dropdowns (e.g., lumen) 

    if (type === "lumen") { 

      dropdown.classList.add("disabled"); 

      arrow && (arrow.style.display = "none"); 

      return; 

    } 

 

    // Parse values 

    const rawText = source.textContent.trim(); 

    const values = [...new Set( 

      rawText.split(",") 

             .map(v => v.trim()) 

             .filter(v => v && !["na", "n/a", "none", "0", "--"].includes(v.toLowerCase())) 

    )]; 

 

    if (values.length === 0) { 

      dropdown.closest(".spec-row")?.remove(); 

      return; 

    } 

 

    // Set default selected value 

    selected.textContent = values[0] || "N/A"; 

    if (type) { 

      window.currentSelection[type] = values[0]; 

      window.currentSelection.defaults[type] = normalizeValue(type, values[0]); 

    } 

 

    if (values.length <= 1) { 

      dropdown.classList.add("disabled"); 

      arrow && (arrow.style.display = "none"); 

      return; 

    } 

 

    // Create dropdown options 

    const optionsBox = document.createElement("div"); 

    optionsBox.className = "dropdown-options"; 

    dropdown.appendChild(optionsBox); 

 

    values.forEach(value => { 

      const opt = document.createElement("div"); 

      opt.className = "dropdown-option"; 

      opt.textContent = value; 

      opt.addEventListener("click", () => { 

        if (selected.textContent === value) return; 

        selected.textContent = value; 

        optionsBox.style.display = "none"; 

        dropdown.classList.remove("open"); 

 

        if (type) { 

          // RAL logic 

          if (type === "finish" && value.toLowerCase() === "ral") { 

            if (ralInput) { 

              ralInput.style.display = "block"; 

              ralInput.textContent = "Enter RAL number here"; 

              ralInput.style.color = "#999"; 

              ralInput.addEventListener("focus", () => { 

                if (ralInput.textContent === "Enter RAL number here") { 

                  ralInput.textContent = ""; 

                  ralInput.style.color = "#111"; 

                } 

              }); 

              ralInput.addEventListener("input", () => { 

                const typedRAL = ralInput.textContent.trim(); 

                window.currentSelection.finish = typedRAL ? "RAL" + typedRAL : "RAL"; 

                updateLumenValue(); 

                updateOrderingCode(); 

              }); 

            } 

            window.currentSelection.finish = "RAL"; 

          } else { 

            if (ralInput) { 

              ralInput.style.display = "none"; 

              ralInput.textContent = "Enter RAL number here"; 

              ralInput.style.color = "#999"; 

            } 

            window.currentSelection[type] = value; 

          } 

        } 

        if (["watt", "cct", "cri"].includes(type)) {
          updateLumenValue();
        }
        updateOrderingCode(); 
      }); 

      optionsBox.appendChild(opt); 

    }); 

 

    // Toggle dropdown 

    arrow?.addEventListener("click", (e) => { 

      e.stopPropagation(); 

      const isOpen = optionsBox.style.display === "block"; 

      document.querySelectorAll(".dropdown-options").forEach(opt => opt.style.display = "none"); 

      document.querySelectorAll(".dropdown-wrapper").forEach(d => d.classList.remove("open")); 

      if (!isOpen) { 

        optionsBox.style.display = "block"; 

        dropdown.classList.add("open"); 

      } 

    }); 

 

    // Close on outside click 

    document.addEventListener("click", () => { 

      optionsBox.style.display = "none"; 

      dropdown.classList.remove("open"); 

    }); 

  }); 

 

  /* === Update Lumen Value Based on Dropdown Selections === */ 

  function updateLumenValue() {
    const { product, watt, cct, cri } = window.currentSelection;
    let match = null;
    const lumenData = Array.from(document.querySelectorAll('.lumen-cms-data'));
    for (const el of lumenData) {
      const matches =
        el.dataset.product === product &&
        el.dataset.watt === watt &&
        el.dataset.cct === cct &&
        (!el.dataset.cri || el.dataset.cri === cri);
      if (matches) {
        match = el;
        break;
      }
    }
    const lumenSelected = document.querySelector('[data-type="lumen"].selected-value, [data-type="lumen"] .selected-value');
    if (lumenSelected) {
      if (match) {
        const lumen = match.dataset.lumen || match.textContent.trim();
        lumenSelected.textContent = lumen;
        lumenSelected.style.color = "#111";
        lumenSelected.style.fontWeight = "bold";
        window.currentSelection.lumen = lumen;
      } else {
        lumenSelected.textContent = "Not Available";
        lumenSelected.style.color = "red";
        lumenSelected.style.fontWeight = "bold";
        window.currentSelection.lumen = null;
      }
    }
  }

  /* === End Update Lumen Value Based on Dropdown Selections === */ 

  // === Normalize Value for Code Generation === 

  function normalizeValue(type, val) { 

    val = val?.toLowerCase(); 

    if (!val) return "XX"; 

 

    if (type === "cct") return val.replace("k", "").substring(0, 2); 

    if (type === "beam") return val.replace("°", ""); 

    if (type === "ip-rating") return val.replace("ip", ""); 

    if (type === "finish") { 

      if (val.startsWith("ral")) { 

        return "RAL" + val.replace("ral", "").replace(/\s+/g, ""); 

      } 

      const colorMap = { 

        "white": "WH", 

        "black": "BK", 

        "grey": "GR", 

        "gray": "GR", 

        "silver": "SV", 

        "satin-nickel": "SN" 

      }; 

      return colorMap[val] || val.toUpperCase(); 

    } 

    return val; 

  } 

 

  // === Get Text Value for a Dropdown === 

  function getTextValue(type) { 

    const el = document.querySelector(`.dropdown-wrapper[data-type="${type}"] .selected-value`); 

    if (!el) return null; 

    if (type === "finish" && window.currentSelection.finish?.startsWith("RAL")) { 

      return window.currentSelection.finish; 

    } 

    return normalizeValue(type, el.textContent.trim()); 

  } 

 

  // === Generate & Display Ordering Code === 

  function updateOrderingCode() { 

    ensureProductCode();
    console.log("updateOrderingCode: product =", window.currentSelection.product);
    const baseCode = window.currentSelection.product || "CXXX"; 

    const keys = ["watt", "ip-rating", "beam", "cct", "cri", "finish"]; 

    const labels = ["Wattage", "IP Rating", "Beam", "CCT", "CRI", "Finish"]; 

    const codeElement = document.querySelector(".ordering-code-value"); 
    const pdfCodeElement = document.getElementById("pdf-code"); // <-- Add this

  if (codeElement) { 
    const styledParts = keys.map((key, i) => { 
      const val = getTextValue(key) || "XX"; 
      const defaultVal = window.currentSelection.defaults?.[key] || "XX"; 
      const isDefault = val === defaultVal; 
      const color = isDefault ? "#999" : "#C0392B"; 
      return `<span title="${labels[i]}" style="color:${color}; font-weight: bold;">${val}</span>`; 
    }); 

    // For on-screen display
    codeElement.innerHTML = `<span title="Product Code" style="color: #111; font-weight: bold;">${baseCode}</span>.` + styledParts.join(".");

    // For PDF filename (plain text, no HTML)
    if (pdfCodeElement) {
      // Build plain code string for filename
      const plainParts = keys.map(key => getTextValue(key) || "XX");
      pdfCodeElement.textContent = `${baseCode}.${plainParts.join(".")}`;
      console.log("updateOrderingCode: pdfCodeElement.textContent =", pdfCodeElement.textContent);
    }
  } 
} 

 

  // === Trigger Initial Update on Load === 

  setTimeout(() => { 

    updateLumenValue(); 

    updateOrderingCode(); 

  }, 300); 

}); 

 

 

 

document.addEventListener("DOMContentLoaded", function () { 

 

  /* === Main Image Thumbnail Click Logic === */ 

  const mainImage = document.getElementById("main-lightbox-trigger"); 

  const thumbnails = document.querySelectorAll(".thumbnail-image"); 

 

  thumbnails.forEach((thumb) => { 

    thumb.addEventListener("click", function () { 

      const newSrc = this.getAttribute("src"); 

      if (mainImage && newSrc) { 

        mainImage.setAttribute("src", newSrc); 

      } 

 

      // Update active state 

      thumbnails.forEach(t => t.classList.remove("is-active")); 

      this.classList.add("is-active"); 

    }); 

  }); 

 

  /* === Trigger Hidden Webflow Lightbox Gallery === */ 

  const firstGalleryItem = document.querySelector(".first-gallery-image"); 

  if (mainImage && firstGalleryItem) { 

    mainImage.addEventListener("click", () => { 

      firstGalleryItem.click(); 

    }); 

  } 

 

  /* === Dropdown + Configurator Logic === */ 

  const dropdowns = document.querySelectorAll(".dropdown-wrapper"); 

  const ralInput = document.querySelector("#ral-input"); 

 

  // RAL input styling and default setup 

  if (ralInput) { 

    ralInput.style.display = "none"; 

    ralInput.textContent = "Enter RAL number here"; 

    ralInput.setAttribute("contenteditable", "true"); 

    ralInput.style.color = "#999"; 

    ralInput.style.padding = "6px 8px"; 

    ralInput.style.minHeight = "48px"; 

    ralInput.style.backgroundColor = "#f8f8f8"; 

    ralInput.style.borderRadius = "6px"; 

    ralInput.style.cursor = "text"; 

  } 

 

  // Global selection state 

  window.currentSelection = { 

    product: document.querySelector("#product-code-heading")?.textContent.trim() || null, 

    watt: null, 

    cct: null, 

    cri: null, 

    finish: null, 

    defaults: {} 

  }; 

 

  /* === Reset Button Logic === */ 

  const resetButton = document.querySelector(".reset-button"); 

  if (resetButton) { 

    resetButton.style.display = "flex"; 

    resetButton.style.alignItems = "center"; 

    resetButton.style.justifyContent = "center"; 

 

    resetButton.addEventListener("click", () => { 

      dropdowns.forEach(dropdown => { 

        const type = dropdown.getAttribute("data-type"); 

        const selected = dropdown.querySelector(".selected-value"); 

        const source = dropdown.querySelector(".dropdown-source"); 

        if (!type || !selected || !source) return; 

 

        const values = source.textContent.split(",").map(v => v.trim()).filter(Boolean); 

        const firstValue = values[0] || "XX"; 

 

        selected.textContent = firstValue; 

        window.currentSelection[type] = firstValue; 

        window.currentSelection.defaults[type] = normalizeValue(type, firstValue); 

 

        if (type === "finish") { 

          if (firstValue.toLowerCase() === "ral") { 

            ralInput.style.display = "block"; 

          } else { 

            ralInput.style.display = "none"; 

          } 

        } 

      }); 

 

      updateLumenValue(); 

      updateOrderingCode(); 

    }); 

  } 

 

  /* === Initialize Each Dropdown === */ 

  dropdowns.forEach(dropdown => { 

    const type = dropdown.getAttribute("data-type"); 

    const field = dropdown.querySelector(".dropdown-field"); 

    const selected = dropdown.querySelector(".selected-value"); 

    const source = dropdown.querySelector(".dropdown-source"); 

    const arrow = dropdown.querySelector(".dropdown-arrow"); 

 

    if (!field || !selected || !source) return; 

 

    const values = source.textContent.split(",").map(v => v.trim()).filter(v => 

      v && !["na", "n/a", "none", "0", "--"].includes(v.toLowerCase()) 

    ); 

 

    if (type === "lumen" || values.length === 0) { 

      dropdown.closest(".spec-row")?.remove(); 

      return; 

    } 

 

    selected.textContent = values[0] || "N/A"; 

    window.currentSelection[type] = values[0]; 

    window.currentSelection.defaults[type] = normalizeValue(type, values[0]); 

 

    if (values.length <= 1) { 

      dropdown.classList.add("disabled"); 

      arrow && (arrow.style.display = "none"); 

      return; 

    } 

 

    const optionsBox = document.createElement("div"); 

    optionsBox.className = "dropdown-options"; 

    dropdown.appendChild(optionsBox); 

 

    values.forEach(value => { 

      const opt = document.createElement("div"); 

      opt.className = "dropdown-option"; 

      opt.textContent = value; 

 

      opt.addEventListener("click", () => { 

        if (selected.textContent === value) return; 

 

        selected.textContent = value; 

        optionsBox.style.display = "none"; 

        dropdown.classList.remove("open"); 

 

        if (type === "finish" && value.toLowerCase() === "ral") { 

          ralInput.style.display = "block"; 

          ralInput.textContent = "Enter RAL number here"; 

          ralInput.style.color = "#999"; 

 

          ralInput.addEventListener("focus", () => { 

            if (ralInput.textContent === "Enter RAL number here") { 

              ralInput.textContent = ""; 

              ralInput.style.color = "#111"; 

            } 

          }); 

 

          ralInput.addEventListener("input", () => { 

            const typedRAL = ralInput.textContent.trim(); 

            window.currentSelection.finish = typedRAL ? "RAL" + typedRAL : "RAL"; 

            updateLumenValue(); 

            updateOrderingCode(); 

          }); 

 

          window.currentSelection.finish = "RAL"; 

        } else { 

          ralInput.style.display = "none"; 

          window.currentSelection[type] = value; 

        } 

 

        if (["watt", "cct", "cri"].includes(type)) {
          updateLumenValue();
        }
        updateOrderingCode(); 
      }); 

 

      optionsBox.appendChild(opt); 

    }); 

 

    // Arrow toggle 

    arrow?.addEventListener("click", (e) => { 

      e.stopPropagation(); 

      const isOpen = optionsBox.style.display === "block"; 

      document.querySelectorAll(".dropdown-options").forEach(opt => opt.style.display = "none"); 

      document.querySelectorAll(".dropdown-wrapper").forEach(d => d.classList.remove("open")); 

 

      if (!isOpen) { 

        optionsBox.style.display = "block"; 

        dropdown.classList.add("open"); 

      } 

    }); 

 

    // Close all dropdowns on outside click 

    document.addEventListener("click", () => { 

      optionsBox.style.display = "none"; 

      dropdown.classList.remove("open"); 

    }); 

  }); 

 

  /* === Update Lumen Value === */ 

  function updateLumenValue() {
    const { product, watt, cct, cri } = window.currentSelection;
    let match = null;
    const lumenData = Array.from(document.querySelectorAll('.lumen-cms-data'));
    for (const el of lumenData) {
      const matches =
        el.dataset.product === product &&
        el.dataset.watt === watt &&
        el.dataset.cct === cct &&
        (!el.dataset.cri || el.dataset.cri === cri);
      if (matches) {
        match = el;
        break;
      }
    }
    const lumenSelected = document.querySelector('[data-type="lumen"].selected-value, [data-type="lumen"] .selected-value');
    if (lumenSelected) {
      if (match) {
        const lumen = match.dataset.lumen || match.textContent.trim();
        lumenSelected.textContent = lumen;
        lumenSelected.style.color = "#111";
        lumenSelected.style.fontWeight = "bold";
        window.currentSelection.lumen = lumen;
      } else {
        lumenSelected.textContent = "Not Available";
        lumenSelected.style.color = "red";
        lumenSelected.style.fontWeight = "bold";
        window.currentSelection.lumen = null;
      }
    }
  }

 

  /* === Normalize Value for Code Generation === */ 

  function normalizeValue(type, val) { 

    val = val?.toLowerCase(); 

    if (!val) return "XX"; 

    if (type === "cct") return val.replace("k", "").substring(0, 2); 

    if (type === "beam") return val.replace("°", ""); 

    if (type === "ip-rating") return val.replace("ip", ""); 

    if (type === "finish") { 

      if (val.startsWith("ral")) return "RAL" + val.replace("ral", "").replace(/\s+/g, ""); 

      const map = { white: "WH", black: "BK", grey: "GR", gray: "GR", silver: "SV", "satin-nickel": "SN" }; 

      return map[val] || val.toUpperCase(); 

    } 

    return val; 

  } 

 

  /* === Get Normalized Value for Each Field === */ 

  function getTextValue(type) { 

    const el = document.querySelector(`.dropdown-wrapper[data-type="${type}"] .selected-value`); 

    if (!el) return null; 

    if (type === "finish" && window.currentSelection.finish?.startsWith("RAL")) { 

      return window.currentSelection.finish; 

    } 

    return normalizeValue(type, el.textContent.trim()); 

  } 

 

  /* === Update Ordering Code Display === */ 

  function updateOrderingCode() { 

    const baseCode = window.currentSelection.product || "CXXX"; 

    const keys = ["watt", "ip-rating", "beam", "cct", "cri", "finish"]; 

    const labels = ["Wattage", "IP Rating", "Beam", "CCT", "CRI", "Finish"]; 

    const codeEl = document.querySelector(".ordering-code-value"); 

 

    if (codeEl) { 

      const parts = keys.map((key, i) => { 

        const val = getTextValue(key) || "XX"; 

        const isDefault = val === window.currentSelection.defaults?.[key]; 

        const color = isDefault ? "#999" : "#C0392B"; 

        return `<span title="${labels[i]}" style="color:${color}; font-weight: bold;">${val}</span>`; 

      }); 

 

      codeEl.innerHTML = `<span title="Product Code" style="color: #111; font-weight: bold;">${baseCode}</span>.${parts.join(".")}`; 

    } 

  } 

 

  // Initial update after load 

  setTimeout(() => { 

    updateLumenValue(); 

    updateOrderingCode(); 

    updateProductCodeInjection();
    updateGeneratedCodeInjection();

  }, 300); 

 

}); 

 

 

 

document.addEventListener('DOMContentLoaded', function () { 

 

  /* === Get Product Code Based on Current Selection === */ 

  function getProductCode() { 

    const selection = window.currentSelection || {}; 

    const code = selection.code || 'C329'; 

    const watt = selection.watt || '12'; 

    const ip = selection.ip || '65'; 

    const beam = selection.beam || '30'; 

 

    const cctMap = { '2700K': '27', '3000K': '30', '4000K': '40', '5000K': '50' }; 

    const finishMap = { 'White': 'WH', 'Black': 'BK', 'Grey': 'GR', 'Silver': 'SV' }; 

 

    let cct = selection.cct || '30'; 

    let cri = selection.cri || '80'; 

    let finish = selection.finish || 'BK'; 

 

    cct = cctMap[cct] || cct.replace('K', ''); 

    finish = finishMap[finish] || finish; 

 

    return `${code}.${watt}.${ip}.${beam}.${cct}.${cri}.${finish}`; 

  } 

 

  /* === Inject PDF Datasheet URL into First Row === */ 

  const datasheetCode = getProductCode(); 

  const datasheetUrl = `https://duva-lighting.com/pdfs/${datasheetCode}.pdf`; 

 

  const firstRow = document.querySelector('.download-row'); 

  if (firstRow) { 

    const fileDiv = firstRow.querySelector('[data-file]'); 

    if (fileDiv) { 

      fileDiv.setAttribute('data-file', datasheetUrl); 

      firstRow.setAttribute('data-type', 'pdf'); 

    } 

  } 

 

  function updateDatasheetRow() { 

    const code = getProductCode(); 

    const newUrl = `https://duva-lighting.com/pdfs/${code}.pdf`; 

    const row = document.querySelector('.download-row'); 

    const fileDiv = row?.querySelector('[data-file]'); 

    if (fileDiv) { 

      fileDiv.setAttribute('data-file', newUrl); 

    } 

  } 

 

  /* === Watch for Selection Changes and Update File URL === */ 

  document.querySelectorAll('.selected-value').forEach(item => { 

    item.addEventListener('DOMSubtreeModified', () => { 

      updateDatasheetRow(); 

 

      const selection = window.currentSelection || {}; 

      const row = item.closest('.spec-row'); 

      if (!row) return; 

 

      const type = row.getAttribute('data-type'); 

      const value = item.textContent.trim(); 

 

      if (type) { 

        selection[type] = value; 

        window.currentSelection = selection; 

      } 

    }); 

  }); 

 

  /* === Generate PDF Datasheet Dynamically === */ 

  // This function is now handled by html2pdf.generatePDF()

 

  /* === Hide Rows with Missing Files === */ 

  document.querySelectorAll('.download-row').forEach(row => { 

    const fileDiv = row.querySelector('[data-file]'); 

    const fileUrl = fileDiv?.getAttribute('data-file'); 

    const divider = row.nextElementSibling?.classList.contains('download-divider') ? row.nextElementSibling : null; 

 

    if (!fileUrl || fileUrl === 'null' || fileUrl === '0') { 

      row.style.display = 'none'; 

      if (divider) divider.style.display = 'none'; 

    } else { 

      const fileExtension = fileUrl.split('.').pop().toLowerCase(); 

      row.setAttribute('data-type', fileExtension); 

    } 

  }); 

 

  /* === Toggle Checkbox Active Class === */ 

  document.querySelectorAll('.download-checkbox').forEach(box => { 

    box.addEventListener('click', function () { 

      this.classList.toggle('active'); 

    }); 

  }); 

 

  /* === Download Selected Files === */ 

  document.querySelector('#download-selected')?.addEventListener('click', function () { 

    const selectedBoxes = document.querySelectorAll('.download-checkbox.active'); 

    const selectedFiles = []; 

 

    selectedBoxes.forEach(box => { 

      const row = box.closest('.download-row'); 

      if (!row || row.offsetParent === null) return; 

 

      const fileDiv = row.querySelector('[data-file]'); 

      const fileUrl = fileDiv?.getAttribute('data-file'); 

      if (fileUrl) { 

        selectedFiles.push(fileUrl); 

      } 

    }); 

 

    if (selectedFiles.length === 0) { 

      alert('No files selected!'); 

      return; 

    } 

 

    selectedFiles.forEach(url => { 

      const a = document.createElement('a'); 

      a.href = url; 

      a.download = ''; 

      document.body.appendChild(a); 

      a.click(); 

      a.remove(); 

    }); 

  }); 

 

  /* === Download All Files === */ 

  document.querySelector('#download-all')?.addEventListener('click', () => { 

    document.querySelectorAll('.download-row').forEach(row => { 

      if (row.offsetParent === null) return; 

 

      const fileDiv = row.querySelector('[data-file]'); 

      const fileUrl = fileDiv?.getAttribute('data-file'); 

 

      if (fileUrl && fileUrl !== 'null' && fileUrl !== '0' && !fileUrl.includes('undefined')) { 

        const a = document.createElement('a'); 

        a.href = fileUrl; 

        a.download = ''; 

        document.body.appendChild(a); 

        a.click(); 

        a.remove(); 

      } 

    }); 

  }); 

 

  /* === Handle Arrow Download Buttons === */ 

  document.querySelectorAll('.download-arrow').forEach(icon => { 

    icon.addEventListener('click', function () { 

      const row = this.closest('.download-row'); 

      const isGenerated = row === document.querySelector('.download-row'); 

 

      if (isGenerated) { 

        return; // already handled by main export listener

      } 

 

      const fileUrl = this.getAttribute('data-file'); 

      if (fileUrl) { 

        const a = document.createElement('a'); 

        a.href = fileUrl; 

        a.download = ''; 

        document.body.appendChild(a); 

        a.click(); 

        a.remove(); 

      } 

    }); 

  }); 

 

  /* === Inject Accessories Divider (Max Width 2000px) === */ 

  const accessoriesSection = document.querySelector(".accessories-section"); 

  if (accessoriesSection) { 

    const wrapper = document.createElement("div"); 

    wrapper.style.display = "flex"; 

    wrapper.style.justifyContent = "center"; 

    wrapper.style.marginTop = "24px"; 

 

    const divider = document.createElement("div"); 

    divider.style.width = "100%"; 

    divider.style.maxWidth = "2000px"; 

    divider.style.height = "1px"; 

    divider.style.backgroundColor = "#e0e0e0"; 

 

    wrapper.appendChild(divider); 

    accessoriesSection.after(wrapper); 

  } 

 

}); 

 

 

 

  document.addEventListener("DOMContentLoaded", function () { 

    const toggle = document.querySelector(".accessories-toggle"); 

    const wrapper = document.querySelector(".accessories-wrapper"); 

    const arrow = document.querySelector(".accessories-arrow"); 

    const section = document.querySelector(".accessories-section"); 

 

    if (toggle && wrapper && arrow && section) { 

      toggle.addEventListener("click", function () { 

        const isOpen = section.classList.toggle("open"); 

        arrow.classList.toggle("rotated"); 

 

        if (isOpen) { 

          // Expand to actual scroll height 

          wrapper.style.maxHeight = wrapper.scrollHeight + "px"; 

        } else { 

          // Collapse 

          wrapper.style.maxHeight = "0px"; 

        } 

      }); 

    } 

  }); 

  // === 7. Accessories Checkbox Script === 

document.querySelectorAll('.accessory-checkbox').forEach(box => { 

  box.addEventListener('click', function () { 

    this.classList.toggle('active'); 

  }); 

}); 

// === PDF Export Logic for DUVA ===
let isExporting = false; // Guard to prevent double export
function showPDFContainer() {
  const pdfContainer = document.querySelector('#pdf-container');
  if (pdfContainer) {
    pdfContainer.classList.remove('hidden');
    pdfContainer.style.display = 'block';
    pdfContainer.style.visibility = 'visible';
    pdfContainer.style.opacity = '1';
    pdfContainer.style.position = 'relative';
    pdfContainer.style.left = '0';
    pdfContainer.style.width = '100vw';
  }
}
function hidePDFContainer() {
  const pdfContainer = document.querySelector('#pdf-container');
  if (pdfContainer) {
    pdfContainer.classList.add('hidden');
    pdfContainer.style.display = 'none';
    pdfContainer.style.visibility = 'hidden';
    pdfContainer.style.opacity = '0';
    pdfContainer.style.position = '';
    pdfContainer.style.top = '';
    pdfContainer.style.left = '';
    pdfContainer.style.width = '';
  }
}

function waitForImagesToLoad(container, callback) {
  if (!container) return callback(); // If container is null, just proceed
  const images = container.querySelectorAll('img');
  let loaded = 0;
  if (images.length === 0) return callback();
  images.forEach(img => {
    if (img.complete) {
      loaded++;
      if (loaded === images.length) callback();
    } else {
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === images.length) callback();
      };
    }
  });
}

function injectPdfOrderingCode() {
  // === Inject Generated Ordering Code into PDF ===
  const orderingCode = document.querySelector('#ordering-code-value');
  const pdfCodeTarget = document.querySelector('#pdf-container .generated-code');
  if (orderingCode && pdfCodeTarget) {
    pdfCodeTarget.textContent = orderingCode.textContent.trim();
  }
}

function injectPdfContent() {
  // === Inject Family Name - Updated for vertical layout ===
  const familyName = document.querySelector('.product-title-source');
  const pdfFamilyNameContainer = document.querySelector('#pdf-container .family-name');
  
  if (familyName && pdfFamilyNameContainer) {
    const familyText = familyName.textContent.trim();
    
    // Clear existing family name elements
    pdfFamilyNameContainer.innerHTML = '';
    
    // Create vertical family name elements based on the family name
    // For "ELDORA", we'll create vertical text elements
    const familyWords = familyText.split(' ');
    familyWords.forEach(word => {
      const verticalElement = document.createElement('div');
      verticalElement.className = 'family-name-vertical';
      verticalElement.textContent = word;
      pdfFamilyNameContainer.appendChild(verticalElement);
    });
  }

  // === Inject Product Description - Updated for Webflow template structure ===
  const desc = document.querySelector('.product-description-source');
  const pdfDesc = document.querySelector('#pdf-container .text-block-14');
  if (desc && pdfDesc) {
    pdfDesc.textContent = desc.textContent.trim();
  }

  // === Inject Feature Key / Key Features - Updated for Webflow template structure ===
  const featuresSource = document.querySelector('.product-features');
  const featuresTarget = document.querySelector('#pdf-container .key-features');
  if (featuresSource && featuresTarget) {
    featuresTarget.innerHTML = featuresSource.innerHTML;
  }
  injectPdfIcons();
  injectPdfImages();
  injectSelectedAccessories();
}

function generatePDF() {
  if (isExporting) return; // Prevent double export
  isExporting = true;
  
  // --- Accessories block temporarily removed for testing ---
  // const pdfAccessories = document.querySelector('.pdf-accessories');
  // if (pdfAccessories) {
  //   pdfAccessories.innerHTML = '';
  // }
  // document.querySelectorAll('.accessory-checkbox.active').forEach(box => {
  //   const accessoryItem = box.closest('.accessory-item');
  //   if (!accessoryItem) return;
  //   const imageEl = accessoryItem.querySelector('.accessory-image img, img.accessory-image');
  //   const titleEl = accessoryItem.querySelector('.accessory-title');
  //   const descEl  = accessoryItem.querySelector('.accessory-desc');
  //   if (imageEl?.src && !imageEl.src.includes('undefined') && titleEl) {
  //     const wrapper = document.createElement('div');
  //     wrapper.className = 'accessory-item';
  //     wrapper.innerHTML = `
  //       <img src="${imageEl.src}" class="accessory-image">
  //       <div class="accessory-title">${titleEl.textContent}</div>
  //       <div class="accessory-desc">${descEl?.textContent || ''}</div>
  //     `;
  //     pdfAccessories.appendChild(wrapper);
  //   }
  // });
  // --- End accessories block ---
  // 3. Show the PDF container (off-screen but rendered)
  showPDFContainer();
  // 4. Prepare PDF export
  const element = document.querySelector('#pdf-container');
  
  // Get the generated code for filename
  const orderingCodeElement = document.querySelector('.ordering-code-value');
  let code = 'file'; // default fallback
  
  if (orderingCodeElement) {
    // Get the plain text content (without HTML styling)
    const plainText = orderingCodeElement.textContent || orderingCodeElement.innerText;
    code = plainText.trim();
    
    // Sanitize filename for file system compatibility
    code = code.replace(/[<>:"/\\|?*]/g, '_'); // Replace invalid characters
    code = code.replace(/\s+/g, '_'); // Replace spaces with underscores
    code = code.replace(/\.+/g, '.'); // Replace multiple dots with single dot
    
    console.log('📄 PDF filename will be:', code);
  } else {
    console.log('⚠️ Ordering code element not found, using default filename');
  }
  
  if (!element) {
    hidePDFContainer();
    alert('PDF container not found!');
    isExporting = false;
    return;
  }
  // === Inject Product Image Dynamically ===
  const imageElement = document.querySelector('#product-image img'); // or your actual main image selector
  const pdfImageContainer = document.querySelector('#pdf-container .main-product-pdf-img');
  if (imageElement && pdfImageContainer) {
    const imageUrl = imageElement.src;
    pdfImageContainer.innerHTML = `<img src="${imageUrl}" style="max-width: 100%; height: auto;">`;
  }
  // === Inject Product, Dimension, and Photometric Images into PDF ===
  injectPdfImages();
  // === Inject Generated Ordering Code into PDF ===
  injectPdfOrderingCode();
  // === Inject Product Code into PDF ===
  updateProductCodeInjection();
  // === Inject Generated Code into PDF ===
  updateGeneratedCodeInjection();
  // === Update Specifications Table ===
  updateSpecsTable();
  // === Inject Family Name, Subtitle, Description, and Features into PDF ===
  injectPdfContent();
  // 5. Export PDF
  waitForImagesToLoad(document.querySelector('#pdf-container .header-right-wrapper'), function() {
    injectPdfIcons(); // Inject icons into PDF container
    html2pdf()
      .from(element)
      .set({
        margin: 0,
        filename: `${code}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          width: 794,
          height: 1123,
          useCORS: true
        },
        jsPDF: { 
          unit: 'px', 
          format: [794, 1123], 
          orientation: 'portrait' 
        }
      })
      .save()
      .then(() => {
        // 6. Cleanup after export
        // if (pdfAccessories) {
        //   pdfAccessories.innerHTML = '';
        // }
        hidePDFContainer();
        isExporting = false;
      })
      .catch(() => {
        isExporting = false;
      });
  });
}
// === PDF Download Button Binding by Class ===
document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.querySelector(".download-arrow");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      generatePDF(); // Make sure this function exists
    });
  } else {
    console.warn("Download arrow button not found!");
  }
});
// === End PDF Download Button Binding ===

// === Utility: Ensure Product Code is Set from DOM ===
function ensureProductCode() {
  const code = document.querySelector("#product-code-heading")?.textContent.trim();
  console.log("ensureProductCode: found code =", code);
  if (code) {
    window.currentSelection.product = code;
  }
  console.log("window.currentSelection.product =", window.currentSelection.product);
}

// Removed duplicate icon injection - using injectPdfIcons() function instead

function updateSpecsTable() {
  // Get current dropdown values from the DOM
  const getDropdownValue = (type) => {
    const dropdown = document.querySelector(`.dropdown-wrapper[data-type="${type}"] .selected-value`);
    return dropdown ? dropdown.textContent.trim() : null;
  };

  // Get current values from dropdowns or use defaults
  const currentValues = {
    watt: getDropdownValue('watt') || window.currentSelection?.watt || '12',
    lumen: window.currentSelection?.lumen || '1900',
    cct: getDropdownValue('cct') || window.currentSelection?.cct || '3000K',
    cri: getDropdownValue('cri') || window.currentSelection?.cri || '80',
    beam: getDropdownValue('beam') || window.currentSelection?.beam || '24',
    'ip-rating': getDropdownValue('ip-rating') || window.currentSelection?.['ip-rating'] || '65',
    finish: getDropdownValue('finish') || window.currentSelection?.finish || 'White'
  };

  console.log('📊 Current specification values:', currentValues);

  // Update both the main page specs and PDF container specs
  const selectors = [
    '.wattage .text-block-16',
    '#pdf-container .wattage .text-block-16'
  ];

  // Wattage
  selectors.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      const wattValue = currentValues.watt;
      element.innerHTML = `Wattage<br>${wattValue}${wattValue.includes('W') ? '' : 'W'}`;
    }
  });

  // Lumen
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'lumen'));
    if (element) {
      const lumenValue = currentValues.lumen;
      element.innerHTML = `Lumen<br>${lumenValue}${lumenValue.includes('lm') ? '' : 'lm'}`;
    }
  });

  // CCT
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'cct'));
    if (element) {
      element.innerHTML = `CCT<br>${currentValues.cct}`;
    }
  });

  // CRI
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'cri'));
    if (element) {
      const criValue = currentValues.cri;
      element.innerHTML = `CRI<br>&gt;${criValue}`;
    }
  });

  // Beam
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'beam-angle'));
    if (element) {
      const beamValue = currentValues.beam;
      element.innerHTML = `Beam<br>${beamValue}${beamValue.includes('°') ? '' : '°'}`;
    }
  });

  // IP Rating
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'ip-rating'));
    if (element) {
      element.innerHTML = `IP<br>${currentValues['ip-rating']}`;
    }
  });

  // Finish
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'finish-volor'));
    if (element) {
      let finishValue = currentValues.finish;
      if (finishValue && finishValue.toLowerCase().startsWith('ral')) {
        finishValue = 'RAL ' + finishValue.replace(/ral/i, '').trim();
      }
      element.innerHTML = `Finish<br>${finishValue}`;
    }
  });

  console.log('✅ Specifications table updated with current values');
}

// Call updateSpecsTable at the end of updateLumenValue and updateOrderingCode
const origUpdateLumenValue = typeof updateLumenValue === 'function' ? updateLumenValue : null;
window.updateLumenValue = function() {
  if (origUpdateLumenValue) origUpdateLumenValue.apply(this, arguments);
  updateSpecsTable();
  updateProductCodeInjection();
  updateGeneratedCodeInjection();
  updatePdfImages();
};
const origUpdateOrderingCode = typeof updateOrderingCode === 'function' ? updateOrderingCode : null;
window.updateOrderingCode = function() {
  if (origUpdateOrderingCode) origUpdateOrderingCode.apply(this, arguments);
  updateSpecsTable();
  updateProductCodeInjection();
  updateGeneratedCodeInjection();
  updatePdfImages();
};

// === Update PDF Images Function ===
function updatePdfImages() {
  // This function can be called to update images when CMS data changes
  // For now, we'll just call the main injection function
  injectPdfImages();
}

// === Product Code Injection Function ===
function updateProductCodeInjection() {
  // Get the current CMS product code (dynamically updated)
  const cmsProductCode = document.querySelector("#product-code-heading")?.textContent.trim();
  const codeTarget = document.querySelector(".product-code");
  
  if (cmsProductCode && codeTarget) {
    codeTarget.innerHTML = `<span style='color: #C0392B !important;'>${cmsProductCode}</span>`;
    console.log("Product code injected from CMS:", cmsProductCode);
  } else if (codeTarget) {
    // Fallback to static source if CMS element not found
    const codeSource = document.getElementById("product-code");
    if (codeSource) {
      codeTarget.innerHTML = `<span style='color: #C0392B !important;'>${codeSource.textContent}</span>`;
      console.log("Product code injected from static source:", codeSource.textContent);
    }
  }
}

// === Generated Code Injection Function ===
function updateGeneratedCodeInjection() {
  // Get the current dynamically generated ordering code
  const orderingCodeElement = document.querySelector(".ordering-code-value");
  const genTarget = document.querySelector(".generated-code");
  
  if (orderingCodeElement && genTarget) {
    // Get the plain text content (without HTML styling)
    const plainText = orderingCodeElement.textContent || orderingCodeElement.innerText;
    genTarget.textContent = plainText;
    console.log("Generated code injected from dynamic source:", plainText);
  } else if (genTarget) {
    // Fallback to static source if dynamic element not found
    const genSource = document.getElementById("ordering-code-value");
    if (genSource) {
      genTarget.textContent = genSource.textContent;
      console.log("Generated code injected from static source:", genSource.textContent);
    }
  }
}

function updateAccessoriesSectionVisibility() {
  // Find all accessories sections
  const accessoriesSections = document.querySelectorAll('.accessories-pdf-section');
  // Find all selected accessories (customize selector as needed)
  const selectedAccessories = document.querySelectorAll('.accessory-checkbox.active, .accessory-selected, .accessory-item.selected');
  // If none selected, hide all accessories sections
  if (selectedAccessories.length === 0) {
    accessoriesSections.forEach(section => section.style.display = 'none');
  } else {
    accessoriesSections.forEach(section => section.style.display = '');
  }
}

// Call this after any accessory selection change
// Example: document.querySelectorAll('.accessory-checkbox').forEach(cb => cb.addEventListener('change', updateAccessoriesSectionVisibility));
// Or call after updating accessories dynamically

document.addEventListener('DOMContentLoaded', function() {
  updateAccessoriesSectionVisibility();
  // If you have accessory checkboxes, add listeners:
  document.querySelectorAll('.accessory-checkbox').forEach(cb => {
    cb.addEventListener('change', updateAccessoriesSectionVisibility);
  });
});

// === Inject PDF Icons from CMS to #pdf-container ===
function injectPdfIcons() {
  // Find all CMS icons for this product (from the main page, not PDF container)
  const cmsIcons = document.querySelectorAll('#pdf-icons .pdf-cms-icon');
  const targetContainer = document.querySelector('#pdf-container .header-icons-wrapper');

  if (!cmsIcons.length) {
    console.log('⚠️ No CMS icons found in #pdf-icons for this product.');
    return;
  }
  if (!targetContainer) {
    console.log('⚠️ PDF icon target container not found.');
    return;
  }

  // Clear existing icons
  targetContainer.innerHTML = '';

  // Inject all icons into the icons wrapper
  cmsIcons.forEach((icon, i) => {
    const clone = icon.cloneNode(true);
    clone.removeAttribute('id');
    targetContainer.appendChild(clone);
    console.log(`✅ Injected icon #${i+1}:`, clone);
  });

  console.log(`✅ Injected ${cmsIcons.length} icons into PDF container.`);
}

// === Inject Product, Dimension, and Photometric Images into PDF ===
function injectPdfImages() {
  // Product Image
  const productSource = document.querySelector('#main-lightbox-trigger.product-image');
  const pdfImageContainer = document.querySelector('#pdf-container .main-product-pdf-img');
  if (productSource && pdfImageContainer) {
    pdfImageContainer.innerHTML = `<img src="${productSource.src}" style="max-width: 100%; height: auto; width: 180px; height: 180px; object-fit: contain;">`;
    console.log('✅ Product image injected:', productSource.src);
  } else {
    console.log('⚠️ Product image source or container not found');
  }

  // Dimension Image
  const dimensionSource = document.querySelector('#diagram.dimension');
  const pdfDimContainer = document.querySelector('#pdf-container .diagram-pdf-img');
  if (dimensionSource && pdfDimContainer) {
    pdfDimContainer.innerHTML = `<img src="${dimensionSource.src}" style="max-width: 100%; height: auto; width: 180px; height: 180px; object-fit: contain;">`;
    console.log('✅ Dimension image injected:', dimensionSource.src);
  } else {
    console.log('⚠️ Dimension image source or container not found');
  }

  // Photometric Image
  const photometricSource = document.querySelector('#Photometric.photometric');
  const pdfPhotoContainer = document.querySelector('#pdf-container .photometric-pdf-img');
  if (photometricSource && pdfPhotoContainer) {
    pdfPhotoContainer.innerHTML = `<img src="${photometricSource.src}" style="max-width: 100%; height: auto; width: 180px; height: 180px; object-fit: contain;">`;
    console.log('✅ Photometric image injected:', photometricSource.src);
  } else {
    console.log('⚠️ Photometric image source or container not found');
  }
}

function styleSpecLabelsAndValues() {
  const specBlocks = document.querySelectorAll('#pdf-container .specifications-full-width .text-block-16');
  specBlocks.forEach(block => {
    // Split by <br> or line break
    const html = block.innerHTML.trim();
    const parts = html.split(/<br\s*\/?>(.*)/i);
    if (parts.length >= 2) {
      const label = parts[0].replace(/<[^>]+>/g, '').trim();
      const value = parts[1].replace(/<[^>]+>/g, '').trim();
      block.innerHTML = `<span class='label'>${label}</span><br><span class='value'>${value}</span>`;
    }
  });
}
// Call this after PDF content is injected
if (typeof injectPdfContent === 'function') {
  const originalInjectPdfContent = injectPdfContent;
  injectPdfContent = function() {
    originalInjectPdfContent.apply(this, arguments);
    styleSpecLabelsAndValues();
  };
}

// === Accessory Injection for PDF ===
function injectSelectedAccessories() {
  // Find the PDF accessories container
  const pdfAccessoriesContainer = document.querySelector('#pdf-container .accessories-pdf-section');
  if (!pdfAccessoriesContainer) {
    console.log('⚠️ PDF accessories container not found');
    return;
  }

  // Find all selected accessories (checkboxes that are active/checked)
  const selectedAccessories = document.querySelectorAll('.accessory-checkbox.active, .accessory-checkbox.checked, .accessory-checkbox[data-selected="true"]');
  
  console.log('🔍 Found selected accessories:', selectedAccessories.length);
  selectedAccessories.forEach((acc, i) => {
    console.log(`  ${i + 1}. Checkbox:`, acc);
    console.log(`     Classes:`, acc.className);
    console.log(`     Parent item:`, acc.closest('.accessory-item'));
  });
  
  if (selectedAccessories.length === 0) {
    // Hide accessories section if none selected
    pdfAccessoriesContainer.style.display = 'none';
    console.log('ℹ️ No accessories selected, hiding accessories section');
    return;
  }

  // Show accessories section
  pdfAccessoriesContainer.style.display = 'block';
  
  // Clear existing accessories in PDF
  const existingAccessories = pdfAccessoriesContainer.querySelectorAll('.accessory-item');
  console.log('🧹 Clearing existing accessories:', existingAccessories.length);
  existingAccessories.forEach(item => item.remove());

  // Inject each selected accessory
  selectedAccessories.forEach((checkbox, index) => {
    const accessoryItem = checkbox.closest('.accessory-item');
    if (!accessoryItem) {
      console.log(`⚠️ No accessory item found for checkbox ${index + 1}`);
      return;
    }

    // Collect accessory data
    const code = accessoryItem.querySelector('.acc-code')?.textContent?.trim() || '';
    const title = accessoryItem.querySelector('.acc-title')?.textContent?.trim() || '';
    const description = accessoryItem.querySelector('.acc-description')?.textContent?.trim() || '';
    
    console.log(`📋 Accessory ${index + 1} data:`, { code, title, description });
    
    // Get image - try multiple selectors
    const image = accessoryItem.querySelector('.accessory-image .acc-img, .accessory-image img, .acc-img');
    const imageSrc = image?.src || image?.getAttribute('src') || '';
    
    console.log(`🔍 Accessory ${index + 1} image src:`, imageSrc);

    // Create accessory HTML for PDF
    const accessoryHTML = `
      <div class="accessory-item">
        <div class="accessory-image">
          ${imageSrc ? `<img src="${imageSrc}" alt="${title}" style="width: 80px; height: 60px; object-fit: contain; border: 1px solid #ddd; border-radius: 4px; display: block;">` : ''}
        </div>
        <div class="accessory-details">
          <div class="accessory-code">${code}</div>
          <div class="accessory-title">${title}</div>
          <div class="accessory-description">${description}</div>
        </div>
      </div>
    `;

    // Add to PDF container
    pdfAccessoriesContainer.insertAdjacentHTML('beforeend', accessoryHTML);
    console.log(`✅ Injected accessory ${index + 1}: ${title}`);
  });

  console.log(`✅ Total accessories injected: ${selectedAccessories.length}`);
}

// === Lightbox Scroll Prevention ===
document.addEventListener('DOMContentLoaded', function() {
  // Watch for lightbox opening
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.classList && node.classList.contains('w-lightbox-backdrop')) {
            // Lightbox opened - prevent scroll
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
            document.body.style.top = '0';
            document.body.style.left = '0';
            
            // Set up lightbox image and arrows
            setTimeout(function() {
              setupLightboxLayout();
              
              // Continuous monitoring for icons
              const iconMonitor = setInterval(() => {
                const lightboxStillOpen = document.querySelector('.w-lightbox-backdrop');
                if (lightboxStillOpen) {
                  ensureIconsVisible();
                } else {
                  clearInterval(iconMonitor);
                }
              }, 300);
            }, 100);
          }
        });
        
        mutation.removedNodes.forEach(function(node) {
          if (node.classList && node.classList.contains('w-lightbox-backdrop')) {
            // Lightbox closed - restore scroll
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.top = '';
            document.body.style.left = '';
          }
        });
      }
    });
  });
  
  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});

// === Setup Lightbox Layout ===
function setupLightboxLayout() {
  // Find the lightbox image container
  const lightboxImage = document.querySelector('.w-lightbox-image img, .w-lightbox-image, .w-lightbox-frame, .w-lightbox-img');
  if (lightboxImage) {
    // Set fixed dimensions
    lightboxImage.style.width = '400px';
    lightboxImage.style.height = '400px';
    lightboxImage.style.objectFit = 'contain';
    lightboxImage.style.borderRadius = '8px';
    lightboxImage.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    lightboxImage.style.position = 'relative';
    lightboxImage.style.maxWidth = '90vw';
    lightboxImage.style.maxHeight = '90vh';
    
    // Force create visible navigation icons
    createVisibleIcons();
    
    // Ensure icons stay visible
    ensureIconsVisible();
  }
}

// === Ensure Icons Always Visible ===
function ensureIconsVisible() {
  const icons = document.querySelectorAll('.w-lightbox-close, .w-lightbox-left, .w-lightbox-right');
  
  icons.forEach(icon => {
    // Force visibility
    icon.style.display = 'flex';
    icon.style.opacity = '1';
    icon.style.visibility = 'visible';
    icon.style.pointerEvents = 'auto';
    
    // Remove any hiding classes
    icon.classList.remove('w-hidden');
    icon.classList.remove('w-invisible');
    
    // Ensure click events work
    if (icon.classList.contains('w-lightbox-close')) {
      icon.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const lightbox = document.querySelector('.w-lightbox-overlay');
        if (lightbox) {
          lightbox.style.display = 'none';
        }
      };
    } else if (icon.classList.contains('w-lightbox-left')) {
      icon.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const prevButton = document.querySelector('.w-lightbox-prev');
        if (prevButton) {
          prevButton.click();
        }
      };
    } else if (icon.classList.contains('w-lightbox-right')) {
      icon.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const nextButton = document.querySelector('.w-lightbox-next');
        if (nextButton) {
          nextButton.click();
        }
      };
    }
  });
}

// === Force Create Visible Icons ===
function createVisibleIcons() {
  // Remove existing icons first
  const existingIcons = document.querySelectorAll('.duva-lightbox-icon');
  existingIcons.forEach(icon => icon.remove());
  
  // Create close button
  const closeButton = document.querySelector('.w-lightbox-close');
  if (closeButton) {
    closeButton.innerHTML = ''; // Clear any existing content
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.width = '36px';
    closeButton.style.height = '36px';
    closeButton.style.background = '#bf3b2b';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.zIndex = '99999';
    closeButton.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    closeButton.style.transition = 'all 0.3s ease';
    closeButton.style.opacity = '1';
    closeButton.style.visibility = 'visible';
    closeButton.style.pointerEvents = 'auto';
    
    // Ensure click functionality
    closeButton.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      // Trigger the original close functionality
      if (window.Webflow && window.Webflow.destroy) {
        window.Webflow.destroy();
      }
      // Close lightbox
      const lightbox = document.querySelector('.w-lightbox-overlay');
      if (lightbox) {
        lightbox.style.display = 'none';
      }
    };
    
    // Create X using CSS
    const xLine1 = document.createElement('div');
    xLine1.style.width = '16px';
    xLine1.style.height = '2px';
    xLine1.style.background = 'white';
    xLine1.style.position = 'absolute';
    xLine1.style.transform = 'rotate(45deg)';
    
    const xLine2 = document.createElement('div');
    xLine2.style.width = '16px';
    xLine2.style.height = '2px';
    xLine2.style.background = 'white';
    xLine2.style.position = 'absolute';
    xLine2.style.transform = 'rotate(-45deg)';
    
    closeButton.appendChild(xLine1);
    closeButton.appendChild(xLine2);
  }
  
  // Create left arrow
  const leftArrow = document.querySelector('.w-lightbox-left');
  if (leftArrow) {
    leftArrow.innerHTML = ''; // Clear any existing content
    leftArrow.style.position = 'absolute';
    leftArrow.style.left = '20px';
    leftArrow.style.top = '50%';
    leftArrow.style.transform = 'translateY(-50%)';
    leftArrow.style.width = '48px';
    leftArrow.style.height = '48px';
    leftArrow.style.background = '#bf3b2b';
    leftArrow.style.color = 'white';
    leftArrow.style.border = 'none';
    leftArrow.style.borderRadius = '4px';
    leftArrow.style.cursor = 'pointer';
    leftArrow.style.display = 'flex';
    leftArrow.style.alignItems = 'center';
    leftArrow.style.justifyContent = 'center';
    leftArrow.style.zIndex = '99999';
    leftArrow.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    leftArrow.style.transition = 'all 0.3s ease';
    leftArrow.style.opacity = '1';
    leftArrow.style.visibility = 'visible';
    leftArrow.style.pointerEvents = 'auto';
    
    // Ensure click functionality
    leftArrow.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      // Trigger previous image
      const prevButton = document.querySelector('.w-lightbox-prev');
      if (prevButton) {
        prevButton.click();
      }
    };
    
    // Create left arrow using CSS
    const leftArrowShape = document.createElement('div');
    leftArrowShape.style.width = '0';
    leftArrowShape.style.height = '0';
    leftArrowShape.style.borderTop = '8px solid transparent';
    leftArrowShape.style.borderBottom = '8px solid transparent';
    leftArrowShape.style.borderRight = '12px solid white';
    leftArrowShape.style.marginLeft = '4px';
    
    leftArrow.appendChild(leftArrowShape);
  }
  
  // Create right arrow
  const rightArrow = document.querySelector('.w-lightbox-right');
  if (rightArrow) {
    rightArrow.innerHTML = ''; // Clear any existing content
    rightArrow.style.position = 'absolute';
    rightArrow.style.right = '20px';
    rightArrow.style.top = '50%';
    rightArrow.style.transform = 'translateY(-50%)';
    rightArrow.style.width = '48px';
    rightArrow.style.height = '48px';
    rightArrow.style.background = '#bf3b2b';
    rightArrow.style.color = 'white';
    rightArrow.style.border = 'none';
    rightArrow.style.borderRadius = '4px';
    rightArrow.style.cursor = 'pointer';
    rightArrow.style.display = 'flex';
    rightArrow.style.alignItems = 'center';
    rightArrow.style.justifyContent = 'center';
    rightArrow.style.zIndex = '99999';
    rightArrow.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    rightArrow.style.transition = 'all 0.3s ease';
    rightArrow.style.opacity = '1';
    rightArrow.style.visibility = 'visible';
    rightArrow.style.pointerEvents = 'auto';
    
    // Ensure click functionality
    rightArrow.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      // Trigger next image
      const nextButton = document.querySelector('.w-lightbox-next');
      if (nextButton) {
        nextButton.click();
      }
    };
    
    // Create right arrow using CSS
    const rightArrowShape = document.createElement('div');
    rightArrowShape.style.width = '0';
    rightArrowShape.style.height = '0';
    rightArrowShape.style.borderTop = '8px solid transparent';
    rightArrowShape.style.borderBottom = '8px solid transparent';
    rightArrowShape.style.borderLeft = '12px solid white';
    rightArrowShape.style.marginRight = '4px';
    
    rightArrow.appendChild(rightArrowShape);
  }
}
