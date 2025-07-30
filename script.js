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

    ralInput.textContent = "Enter RAL color number (e.g., 1015)"; 

    ralInput.setAttribute("contenteditable", "true"); 

    ralInput.style.color = "#999"; 

    ralInput.style.padding = "12px 16px"; 

    ralInput.style.minHeight = "48px"; 

    ralInput.style.backgroundColor = "#fff"; 

    ralInput.style.borderRadius = "20px"; 

    ralInput.style.cursor = "text"; 
    
    ralInput.style.border = "1px solid var(--border-main-shadow)";
    
    ralInput.style.width = "280px";
    
    ralInput.style.fontSize = "14px";
    
    ralInput.style.fontFamily = "inherit";
    
    ralInput.style.lineHeight = "1.4";
    
    ralInput.style.transition = "all 0.3s ease";
    
    ralInput.style.outline = "none";
    
    ralInput.style.resize = "none";
    
    ralInput.style.overflow = "hidden";

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

                if (ralInput.textContent === "Enter RAL color number (e.g., 1015)") { 

                  ralInput.textContent = ""; 

                  ralInput.style.color = "#111"; 

                } 
                
                // Focus effects
                ralInput.style.borderColor = "var(--duva-red)";
                ralInput.style.boxShadow = "0 0 0 3px rgba(192, 57, 43, 0.1)";

              });
              
              // Hover effects
              ralInput.addEventListener("mouseenter", () => {
                ralInput.style.borderColor = "var(--duva-red)";
              });
              
              ralInput.addEventListener("mouseleave", () => {
                if (document.activeElement !== ralInput) {
                  ralInput.style.borderColor = "var(--border-divider-light)";
                  ralInput.style.boxShadow = "none";
                }
              });
              
              ralInput.addEventListener("blur", () => {
                ralInput.style.borderColor = "var(--border-divider-light)";
                ralInput.style.boxShadow = "none";
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
    // Get current product code dynamically from CMS
    const baseCode = getCurrentProductCode();
    console.log("🔄 updateOrderingCode: product =", baseCode); 

    const keys = ["watt", "ip-rating", "beam", "cct", "cri", "finish"]; 

    const labels = ["Wattage", "IP Rating", "Beam", "CCT", "CRI", "Finish"]; 

    const codeElement = document.querySelector(".ordering-code-value"); 
    const pdfCodeElement = document.getElementById("pdf-code"); // <-- Add this

    console.log("🔍 updateOrderingCode: codeElement found =", !!codeElement);
    console.log("🔍 updateOrderingCode: pdfCodeElement found =", !!pdfCodeElement);

  if (codeElement) { 
    const styledParts = keys.map((key, i) => { 
      const val = getTextValue(key) || "XX"; 
      const defaultVal = window.currentSelection.defaults?.[key] || "XX"; 
      const isDefault = val === defaultVal; 
      const color = isDefault ? "#999" : "#C0392B"; 
      return `<span title="${labels[i]}" style="color:${color}; font-weight: bold;">${val}</span>`; 
    }); 

    const newOrderingCode = `<span title="Product Code" style="color: #111; font-weight: bold;">${baseCode}</span>.` + styledParts.join(".");
    console.log("🔄 updateOrderingCode: Setting new ordering code =", newOrderingCode);

    // For on-screen display
    codeElement.innerHTML = newOrderingCode;
    console.log("✅ updateOrderingCode: Ordering code updated successfully");

    // For PDF filename (plain text, no HTML)
    if (pdfCodeElement) {
      // Build plain code string for filename
      const plainParts = keys.map(key => getTextValue(key) || "XX");
      const plainCode = `${baseCode}.${plainParts.join(".")}`;
      pdfCodeElement.textContent = plainCode;
      console.log("📄 updateOrderingCode: PDF code set =", plainCode);
    }
  } else {
    console.log("⚠️ updateOrderingCode: No ordering-code-value element found!");
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

    ralInput.style.padding = "12px 16px"; 

    ralInput.style.minHeight = "48px"; 

    ralInput.style.backgroundColor = "#fff"; 

    ralInput.style.borderRadius = "20px"; 

    ralInput.style.cursor = "text"; 
    
    ralInput.style.border = "1px solid var(--border-main-shadow)";
    
    ralInput.style.width = "280px";
    
    ralInput.style.fontSize = "14px";
    
    ralInput.style.fontFamily = "inherit";
    
    ralInput.style.lineHeight = "1.4";
    
    ralInput.style.transition = "all 0.3s ease";
    
    ralInput.style.outline = "none";
    
    ralInput.style.resize = "none";
    
    ralInput.style.overflow = "hidden";

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

    // Get current product code dynamically from CMS
    const baseCode = getCurrentProductCode(); 

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

    // Get current product code dynamically from CMS
    const code = getCurrentProductCode(); 

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

// === Dynamic Product Code Functions ===

// Get current product code dynamically from CMS
function getCurrentProductCode() {
  console.log('🔍 Searching for current product code...');
  
  // PRIORITY 1: Check window.currentSelection first (most current)
  if (window.currentSelection && window.currentSelection.product) {
    console.log('✅ Using product code from window.currentSelection:', window.currentSelection.product);
    return window.currentSelection.product;
  }
  
  // PRIORITY 2: Check for visible product code elements (not hidden)
  const visibleSelectors = [
    '.product-code-heading:not([style*="display: none"])',
    '.product-code:not([style*="display: none"])',
    '[data-product-code]:not([style*="display: none"])',
    '.product-title-source:not([style*="display: none"])',
    'h1.product-code:not([style*="display: none"])',
    '.product-title:not([style*="display: none"])'
  ];
  
  for (const selector of visibleSelectors) {
    const element = document.querySelector(selector);
    console.log(`🔍 Checking visible selector "${selector}":`, element);
    if (element && element.textContent.trim()) {
      const code = element.textContent.trim();
      console.log(`✅ Found visible product code from ${selector}:`, code);
      return code;
    }
  }
  
  // PRIORITY 3: Check for any visible element containing a product code pattern
  const allElements = document.querySelectorAll('*:not([style*="display: none"])');
  for (const element of allElements) {
    if (element.textContent && element.textContent.match(/^C\d{3,4}$/)) {
      const code = element.textContent.trim();
      console.log(`✅ Found visible product code pattern in element:`, element, 'Code:', code);
      return code;
    }
  }
  
  // PRIORITY 4: Fallback to hidden elements (last resort)
  const hiddenSelectors = [
    '#product-code',
    '.product-code-heading',
    '.product-code',
    '[data-product-code]',
    '.product-title-source'
  ];
  
  for (const selector of hiddenSelectors) {
    const element = document.querySelector(selector);
    console.log(`🔍 Checking hidden selector "${selector}":`, element);
    if (element && element.textContent.trim()) {
      const code = element.textContent.trim();
      console.log(`⚠️ Using hidden product code from ${selector}:`, code);
      return code;
    }
  }
  
  console.log('⚠️ No product code found, using fallback: CXXX');
  return 'CXXX';
}

// Get current product family from CMS
function getCurrentProductFamily() {
  // This should pull from your CMS - adjust selector as needed
  const familyElement = document.querySelector('.product-title-source');
  return familyElement ? familyElement.textContent.trim() : null;
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
  
  // Set up observer to refresh ordering code when content changes
  setupOrderingCodeObserver();
});

// Manual refresh function for ordering code
function refreshOrderingCode() {
  console.log('🔄 Manually refreshing ordering code...');
  setTimeout(() => {
    updateOrderingCode();
    updateProductCodeInjection();
    updateGeneratedCodeInjection();
  }, 100);
}

// Global function that can be called from Webflow
window.refreshProductCode = function() {
  console.log('🌐 Global refresh called from Webflow');
  refreshOrderingCode();
};

// Debug function to test product code detection
window.debugProductCode = function() {
  console.log('🔍 Debugging product code detection...');
  console.log('Current product code:', getCurrentProductCode());
  console.log('Window currentSelection:', window.currentSelection);
  console.log('All elements with product code pattern:');
  document.querySelectorAll('*').forEach(el => {
    if (el.textContent && el.textContent.match(/^C\d{3,4}$/)) {
      console.log('Found:', el.tagName, el.className, el.textContent.trim());
    }
  });
};

// Force refresh function for testing
window.forceRefreshOrderingCode = function() {
  console.log('🔄 Force refreshing ordering code...');
  updateOrderingCode();
  updateProductCodeInjection();
  updateGeneratedCodeInjection();
};

// Test function to simulate product change
window.testProductChange = function(newProductCode) {
  console.log('🧪 Testing product change to:', newProductCode);
  
  // Find and update a product code element
  const selectors = ['#product-code', '.product-code-heading', '.product-code', '.product-title-source'];
  let updated = false;
  
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = newProductCode;
      console.log(`✅ Updated ${selector} to ${newProductCode}`);
      updated = true;
      break;
    }
  }
  
  if (!updated) {
    console.log('⚠️ No product code element found to update');
  }
  
  // Force refresh
  setTimeout(() => {
    forceRefreshOrderingCode();
  }, 100);
};

// === Related Items Mouse Wheel Scroll Logic ===
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector(".collection-list-6");

  if (scrollContainer) {
    console.log('✅ Related items mouse wheel scroll logic initialized');
    console.log('📦 Related scroll container found:', scrollContainer);
    
    // Improved smooth mouse wheel scrolling with momentum
    let scrollVelocity = 0;
    let isScrolling = false;
    let scrollAnimationId = null;
    
    // Always active wheel scroll (not just on hover)
    scrollContainer.addEventListener('wheel', function(e) {
      console.log('🔄 Related section wheel event triggered');
      
      // Only prevent default if we're actually scrolling the container
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        e.preventDefault(); // Prevent default vertical scrolling
        e.stopPropagation(); // Stop event from bubbling up
        
        // Get scroll direction and amount with improved sensitivity
        const delta = e.deltaY || e.deltaX;
        const scrollSpeed = Math.abs(delta) * 0.5; // Dynamic speed based on wheel delta
        const direction = delta > 0 ? 1 : -1;
        
        // Add to velocity for momentum effect
        scrollVelocity += direction * scrollSpeed;
        
        // Smooth scroll with momentum
        if (!isScrolling) {
          isScrolling = true;
          smoothScrollWithMomentum();
        }
        
        console.log('🔄 Mouse wheel scrolling:', direction > 0 ? 'right' : 'left', 'speed:', scrollSpeed);
      }
    }, { passive: false }); // Required for preventDefault to work
    
    // Also add wheel listener to the parent section for better coverage
    const relatedSection = document.querySelector('.related-section');
    if (relatedSection) {
      relatedSection.addEventListener('wheel', function(e) {
        // Only handle if we're over the scroll container
        const rect = scrollContainer.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        if (mouseX >= rect.left && mouseX <= rect.right && 
            mouseY >= rect.top && mouseY <= rect.bottom) {
          console.log('🔄 Related section wheel event triggered (from parent)');
          
          if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
            e.preventDefault();
            e.stopPropagation();
            
            const delta = e.deltaY || e.deltaX;
            const scrollSpeed = Math.abs(delta) * 0.5;
            const direction = delta > 0 ? 1 : -1;
            
            scrollVelocity += direction * scrollSpeed;
            
            if (!isScrolling) {
              isScrolling = true;
              smoothScrollWithMomentum();
            }
          }
        }
      }, { passive: false });
    }
  } else {
    console.log('⚠️ Related items scroll container not found');
  }
});

// Observer to refresh ordering code when page content changes
function setupOrderingCodeObserver() {
  console.log('🔧 Setting up ordering code observer...');
  
  // Watch for changes in the product code element
  const selectors = ['#product-code', '.product-code-heading', '.product-code', '.product-title-source'];
  let productCodeElement = null;
  
  for (const selector of selectors) {
    productCodeElement = document.querySelector(selector);
    if (productCodeElement) {
      console.log(`✅ Found element to observe: ${selector}`);
      break;
    }
  }
  
  if (productCodeElement) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          console.log('🔄 Product code changed, refreshing ordering code...');
          setTimeout(() => {
            updateOrderingCode();
            updateProductCodeInjection();
            updateGeneratedCodeInjection();
          }, 100);
        }
      });
    });
    
    observer.observe(productCodeElement, {
      childList: true,
      characterData: true,
      subtree: true
    });
    
    console.log('✅ Ordering code observer set up for:', productCodeElement);
  } else {
    console.log('⚠️ No product code element found for observer, setting up periodic check');
    // Set up periodic check as backup
    setInterval(() => {
      const currentCode = getCurrentProductCode();
      if (currentCode !== 'CXXX' && currentCode !== window.lastProductCode) {
        console.log('🔄 Product code changed via periodic check:', currentCode);
        window.lastProductCode = currentCode;
        updateOrderingCode();
        updateProductCodeInjection();
        updateGeneratedCodeInjection();
      }
    }, 2000); // Check every 2 seconds
  }
  
  // Also watch for URL changes (for SPA navigation)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      console.log('🔄 URL changed, refreshing ordering code...');
      setTimeout(() => {
        updateOrderingCode();
        updateProductCodeInjection();
        updateGeneratedCodeInjection();
      }, 500);
    }
  }).observe(document, {subtree: true, childList: true});
}

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

// === Scroll-triggered Fade-in Animations ===
function initializeScrollAnimations() {
  console.log('✨ Initializing scroll animations...');
  
  // Create a single observer for all sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        console.log(`🎬 ${entry.target.className} fade-in triggered`);
      }
    });
  }, {
    threshold: 0.3, // Trigger when 30% of section is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before section comes into view
  });
  
  // Observe specific product page elements (NOT the wrapper)
  const productVisuals = document.querySelector('.product-visuals');
  const productInfoBlock = document.querySelector('.product-info-block');
  const downloadPanel = document.querySelector('.download-panel');
  
  if (productVisuals) {
    observer.observe(productVisuals);
    console.log('✅ Product visuals observer set up');
  }
  
  if (productInfoBlock) {
    observer.observe(productInfoBlock);
    console.log('✅ Product info block observer set up');
  }
  
  if (downloadPanel) {
    observer.observe(downloadPanel);
    console.log('✅ Download panel observer set up');
  }
  
  // Observe Related Items section
  const relatedSection = document.querySelector('.related-section');
  if (relatedSection) {
    observer.observe(relatedSection);
    console.log('✅ Related section observer set up');
  }
  
  // Observe Gallery section
  const gallerySection = document.querySelector('.gallery-section');
  if (gallerySection) {
    observer.observe(gallerySection);
    console.log('✅ Gallery section observer set up');
  }
  
  // Enhanced accessories dropdown animation
  const accessoriesToggle = document.querySelector('.accessories-toggle');
  if (accessoriesToggle) {
    accessoriesToggle.addEventListener('click', function() {
      const accessoriesSection = this.closest('.accessories-section');
      const accessoriesItems = accessoriesSection.querySelectorAll('.accessories-item');
      
      // Add staggered animation delays to accessories items
      accessoriesItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
      });
      
      console.log('🎬 Accessories dropdown animation triggered');
    });
  }
}

// === Smooth Scroll to Related Section ===
function scrollToRelatedSection() {
  const relatedSection = document.querySelector('.related-section');
  if (relatedSection) {
    relatedSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    console.log('📜 Smooth scrolling to related section');
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollAnimations();
  
  // Add smooth scroll button if needed (optional)
  const scrollToRelatedBtn = document.querySelector('.scroll-to-related');
  if (scrollToRelatedBtn) {
    scrollToRelatedBtn.addEventListener('click', scrollToRelatedSection);
  }
  
  // Initialize menu panel functionality
  initializeMenuPanel();
});

// === Auto-scroll Fullscreen Image Gallery ===
function initializeGalleryAutoScroll() {
  console.log('🎠 Initializing gallery auto-scroll...');
  
  const gallery = document.querySelector('.gallery-section-cms');
  
  if (!gallery) {
    console.log('⚠️ Gallery section not found');
    return;
  }

  console.log('📏 Gallery found:', gallery);
  
  // Check for collection items
  const collectionItems = gallery.querySelectorAll('.w-dyn-item');
  console.log('📦 Number of collection items:', collectionItems.length);
  
  // Check if gallery has any images and hide section if empty
  const gallerySection = document.querySelector('.gallery-section');
  if (collectionItems.length === 0) {
    console.log('⚠️ No images found in gallery - hiding gallery section');
    if (gallerySection) {
      gallerySection.style.display = 'none';
      gallerySection.style.visibility = 'hidden';
      gallerySection.style.opacity = '0';
      gallerySection.style.height = '0';
      gallerySection.style.overflow = 'hidden';
    }
    return; // Exit the function early
  } else {
    console.log(`✅ Gallery has ${collectionItems.length} images - showing gallery section`);
    if (gallerySection) {
      gallerySection.style.display = 'block';
      gallerySection.style.visibility = 'visible';
      gallerySection.style.opacity = '1';
      gallerySection.style.height = 'auto';
      gallerySection.style.overflow = 'visible';
    }
  }

  // Gallery state management
  let currentIndex = 0;
  let isAutoScrolling = true;
  let scrollInterval;
  const scrollSpeed = 4000; // time between slides (ms)
  const transitionDuration = 800; // ms for smooth transitions
  
  // Get total number of images
  const totalImages = collectionItems.length;
  const viewportWidth = window.innerWidth;
  
  console.log(`📊 Gallery stats: ${totalImages} images, viewport: ${viewportWidth}px`);

  // Smooth scroll to specific image index
  function scrollToImage(index, duration = transitionDuration) {
    if (index < 0 || index >= totalImages) return;
    
    const targetScroll = index * viewportWidth;
    
    console.log(`🎯 Scrolling to image ${index + 1}/${totalImages} at position ${targetScroll}px`);
    
    // Use custom smooth scroll for better control
    smoothScrollTo(gallery, targetScroll, duration);
    
    currentIndex = index;
  }

  // Custom smooth scroll function with easing
  function smoothScrollTo(element, target, duration) {
    const start = element.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();
    
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      element.scrollLeft = start + (distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }

  // Next image with seamless looping
  function scrollToNext() {
    if (currentIndex >= totalImages - 1) {
      // At the end - loop seamlessly by duplicating first image
      currentIndex = 0;
      console.log('🔄 Looping to first image seamlessly');
    } else {
      currentIndex++;
      console.log(`🔄 Moving to next image: ${currentIndex + 1}/${totalImages}`);
    }
    
    scrollToImage(currentIndex);
  }

  // Previous image with seamless looping
  function scrollToPrevious() {
    if (currentIndex <= 0) {
      // At the beginning - loop seamlessly to last image
      currentIndex = totalImages - 1;
      console.log('🔄 Looping to last image seamlessly');
    } else {
      currentIndex--;
      console.log(`🔄 Moving to previous image: ${currentIndex + 1}/${totalImages}`);
    }
    
    scrollToImage(currentIndex);
  }

  // Auto-scroll function
  function startAutoScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
    }
    scrollInterval = setInterval(scrollToNext, scrollSpeed);
    isAutoScrolling = true;
    console.log('▶️ Auto-scroll started');
  }

  function stopAutoScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
    isAutoScrolling = false;
    console.log('⏸️ Auto-scroll paused');
  }

  // Enhanced mouse wheel scroll handler with momentum
  let wheelVelocity = 0;
  let wheelAnimationId = null;
  
  function handleWheelScroll(event) {
    event.preventDefault();
    event.stopPropagation();
    
    // Calculate velocity based on wheel delta
    const delta = event.deltaY || event.deltaX;
    const direction = delta > 0 ? 1 : -1;
    const speed = Math.abs(delta) * 0.01;
    
    wheelVelocity += direction * speed;
    
    // Stop any ongoing auto-scroll
    stopAutoScroll();
    
    // Apply momentum scrolling
    if (!wheelAnimationId) {
      wheelAnimationId = requestAnimationFrame(applyWheelMomentum);
    }
    
    console.log(`🎯 Wheel scroll: direction=${direction}, speed=${speed}`);
  }
  
  function applyWheelMomentum() {
    if (Math.abs(wheelVelocity) > 0.1) {
      if (wheelVelocity > 0) {
        scrollToNext();
      } else {
        scrollToPrevious();
      }
      
      // Apply friction
      wheelVelocity *= 0.8;
      
      wheelAnimationId = requestAnimationFrame(applyWheelMomentum);
    } else {
      wheelVelocity = 0;
      wheelAnimationId = null;
      
      // Restart auto-scroll after a delay
      setTimeout(() => {
        if (isAutoScrolling) {
          startAutoScroll();
        }
      }, 2000);
    }
  }

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchStartTime = 0;
  let touchVelocity = 0;
  
  gallery.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].pageX;
    touchStartTime = Date.now();
    touchVelocity = 0;
    
    // Stop auto-scroll during touch
    stopAutoScroll();
    
    console.log('📱 Gallery touch start');
  });
  
  gallery.addEventListener('touchmove', function(e) {
    e.preventDefault();
    const currentX = e.touches[0].pageX;
    const deltaX = touchStartX - currentX;
    
    // Calculate velocity
    const currentTime = Date.now();
    const timeDiff = currentTime - touchStartTime;
    if (timeDiff > 0) {
      touchVelocity = deltaX / timeDiff;
    }
    
    // Direct scroll during touch
    gallery.scrollLeft += deltaX * 0.5;
    touchStartX = currentX;
    touchStartTime = currentTime;
  });
  
  gallery.addEventListener('touchend', function() {
    console.log('📱 Gallery touch end');
    
    // Apply momentum based on velocity
    if (Math.abs(touchVelocity) > 0.5) {
      if (touchVelocity > 0) {
        scrollToNext();
      } else {
        scrollToPrevious();
      }
    }
    
    // Restart auto-scroll after a delay
    setTimeout(() => {
      if (isAutoScrolling) {
        startAutoScroll();
      }
    }, 2000);
  });

  // Always active wheel scroll for gallery (not just on hover)
  gallery.addEventListener('wheel', handleWheelScroll, { passive: false });
  console.log('🎯 Gallery mouse wheel always active');
  
  // Also add wheel listener to the gallery section wrapper for broader coverage
  const gallerySectionWrapper = document.querySelector('.gallery-section-wrapper') || 
                               document.querySelector('.gallery-section');
  if (gallerySectionWrapper) {
    gallerySectionWrapper.addEventListener('wheel', handleWheelScroll, { passive: false });
    console.log('✅ Added wheel listener to gallery section wrapper');
  }
  
  // Hover pause functionality
  gallery.addEventListener('mouseenter', function() {
    stopAutoScroll();
    console.log('🎯 Gallery auto-scroll paused on hover');
  });
  
  gallery.addEventListener('mouseleave', function() {
    if (isAutoScrolling) {
      startAutoScroll();
    }
    console.log('🎯 Gallery auto-scroll resumed');
  });
}

// Initialize gallery auto-scroll when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeGalleryAutoScroll();
});

// === Menu Panel Functionality ===
function initializeMenuPanel() {
  const menuWrapper = document.querySelector('.menu-wrapper');
  const menuPanel = document.querySelector('.menu-panel');
  const menuClose = document.querySelector('.menu-close');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  console.log('📋 Menu elements found:', {
    menuWrapper: !!menuWrapper,
    menuPanel: !!menuPanel,
    menuClose: !!menuClose,
    menuOverlay: !!menuOverlay
  });
  
  if (menuWrapper && menuPanel) {
    // Open menu
    menuWrapper.addEventListener('click', function(e) {
      console.log('📋 Menu wrapper clicked!');
      e.preventDefault();
      e.stopPropagation();
      openMenu();
    });
    
    // Close menu
    if (menuClose) {
      console.log('📋 Close button found:', menuClose);
      menuClose.addEventListener('click', function(e) {
        console.log('📋 Close button clicked!');
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      });
    } else {
      console.log('⚠️ Close button not found!');
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menuPanel.classList.contains('active')) {
        closeMenu();
      }
    });
    
    // Prevent wheel scrolling when menu is open
    document.addEventListener('wheel', function(e) {
      if (menuPanel.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, { passive: false });
    
    // Prevent touch scrolling when menu is open (mobile)
    document.addEventListener('touchmove', function(e) {
      if (menuPanel.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, { passive: false });
    
    // Close menu on overlay click
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
      
      // Prevent scroll on overlay
      menuOverlay.addEventListener('wheel', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, { passive: false });
      
      menuOverlay.addEventListener('touchmove', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, { passive: false });
    }
    
    // Close menu on outside click (backup method)
    document.addEventListener('click', function(e) {
      if (menuPanel.classList.contains('active') && 
          !menuPanel.contains(e.target) && 
          !menuWrapper.contains(e.target) &&
          !menuOverlay.contains(e.target)) {
        closeMenu();
      }
    });
    
    // Prevent menu panel clicks from closing the menu
    menuPanel.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
    // Close menu when menu links are clicked
    const menuLinks = menuPanel.querySelectorAll('a[href]');
    menuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        console.log('📋 Menu link clicked, closing menu...');
        closeMenu();
      });
    });
  }
  
  function openMenu() {
    console.log('📋 Opening menu...');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
    
    // Calculate header height to position menu panel at bottom of header
    const headerSection = document.querySelector('.header-section');
    const headerHeight = headerSection ? headerSection.offsetHeight : 0;
    
    console.log('📋 Header height:', headerHeight);
    
    // Position menu panel at bottom of header
    menuPanel.style.top = headerHeight + 'px';
    
    // Show overlay first
    if (menuOverlay) {
      menuOverlay.style.display = 'block';
      setTimeout(() => {
        menuOverlay.classList.add('active');
      }, 10);
    }
    
    // Show menu panel
    menuPanel.style.display = 'flex';
    menuPanel.style.visibility = 'visible';
    menuPanel.style.opacity = '1';
    
    console.log('📋 Menu panel display set to flex');
    console.log('📋 Menu panel visibility:', menuPanel.style.visibility);
    console.log('📋 Menu panel opacity:', menuPanel.style.opacity);
    
    // Trigger animation after display change
    setTimeout(() => {
      menuPanel.classList.add('active');
      console.log('📋 Menu panel active class added');
      
      // Check close button visibility
      const closeBtn = menuPanel.querySelector('.menu-close');
      if (closeBtn) {
        console.log('📋 Close button found in active menu:', closeBtn);
        console.log('📋 Close button display:', closeBtn.style.display);
        console.log('📋 Close button visibility:', closeBtn.style.visibility);
        console.log('📋 Close button opacity:', closeBtn.style.opacity);
      } else {
        console.log('⚠️ Close button not found in active menu');
      }
    }, 50);
    
    // Update ARIA state
    menuWrapper.setAttribute('aria-expanded', 'true');
    
    console.log('📋 Menu opened at header bottom:', headerHeight + 'px');
  }
  
  function closeMenu() {
    console.log('📋 Closing menu...');
    
    // Restore body scrolling
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
    
    // Remove active class from menu panel
    menuPanel.classList.remove('active');
    
    // Remove active class from overlay
    if (menuOverlay) {
      menuOverlay.classList.remove('active');
    }
    
    // Hide elements after animation
    setTimeout(() => {
      menuPanel.style.display = 'none';
      if (menuOverlay) {
        menuOverlay.style.display = 'none';
      }
    }, 400); // Match CSS transition duration
    
    // Update ARIA state
    menuWrapper.setAttribute('aria-expanded', 'false');
    
    console.log('📋 Menu closed');
  }
}

/* === Skeleton Loader Functionality === */

// Initialize skeleton loaders for all images
function initializeSkeletonLoaders() {
  const images = document.querySelectorAll('img[src]');
  
  images.forEach(img => {
    // Add skeleton class initially
    img.classList.add('skeleton');
    
    // Create a wrapper if it doesn't exist
    let wrapper = img.parentElement;
    if (!wrapper.classList.contains('skeleton-wrapper')) {
      wrapper.classList.add('skeleton-wrapper');
    }
    
    // Handle image load
    if (img.complete) {
      handleImageLoad(img);
    } else {
      img.addEventListener('load', () => handleImageLoad(img));
      img.addEventListener('error', () => handleImageError(img));
    }
  });
}

// Handle successful image load
function handleImageLoad(img) {
  img.classList.remove('skeleton');
  img.classList.add('loaded');
  
  // Add fade-in effect
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';
  
  setTimeout(() => {
    img.style.opacity = '1';
  }, 50);
}

// Handle image load error
function handleImageError(img) {
  img.classList.remove('skeleton');
  img.classList.add('error');
  
  // Show error placeholder
  img.style.display = 'none';
  const errorPlaceholder = document.createElement('div');
  errorPlaceholder.className = 'image-error-placeholder';
  errorPlaceholder.innerHTML = '<span>Image not available</span>';
  errorPlaceholder.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    color: #999;
    font-size: 12px;
  `;
  img.parentElement.appendChild(errorPlaceholder);
}

// Initialize skeleton loaders when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeSkeletonLoaders();
});

// Handle dynamically added images (for CMS content)
function handleDynamicImages() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          const images = node.querySelectorAll ? node.querySelectorAll('img[src]') : [];
          images.forEach(img => {
            if (!img.classList.contains('skeleton')) {
              img.classList.add('skeleton');
              if (img.complete) {
                handleImageLoad(img);
              } else {
                img.addEventListener('load', () => handleImageLoad(img));
                img.addEventListener('error', () => handleImageError(img));
              }
            }
          });
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Initialize dynamic image handling
document.addEventListener('DOMContentLoaded', function() {
  handleDynamicImages();
});

// Preload critical images
function preloadCriticalImages() {
  const criticalImages = [
    'main-lightbox-trigger',
    'thumbnail-image',
    'gallery-image'
  ];
  
  criticalImages.forEach(selector => {
    const images = document.querySelectorAll(selector);
    images.forEach(img => {
      if (img.src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
      }
    });
  });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', function() {
  preloadCriticalImages();
});

/* === Arrow Hover Effects === */
document.addEventListener('DOMContentLoaded', function() {
  
  // Download arrow hover effects
  document.querySelectorAll('.download-arrow').forEach(arrow => {
    arrow.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    arrow.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Dropdown arrow hover effects
  document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
    arrow.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    arrow.addEventListener('mouseleave', function() {
      // Only reset scale if dropdown is not open (to preserve rotation)
      const dropdown = this.closest('.dropdown-wrapper');
      if (!dropdown || !dropdown.classList.contains('open')) {
        this.style.transform = 'scale(1)';
      } else {
        // If dropdown is open, maintain rotation but reset scale
        this.style.transform = 'rotate(180deg) scale(1)';
      }
    });
  });
});

// Initialize gallery auto-scroll when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeGalleryAutoScroll();
});

// === Gallery Subscribe Wrapper Parallax Enhancement ===
function initializeGalleryParallax() {
  console.log('🎨 Initializing gallery parallax effect...');
  
  // Try multiple selectors for the gallery subscribe wrapper
  const gallerySubscribeWrapper = document.querySelector('.gallery-subscribe-wrapper') || 
                                  document.querySelector('[class*="gallery-subscribe"]') ||
                                  document.querySelector('[class*="subscribe-wrapper"]');
  
  // Try multiple selectors for the gallery section
  const gallerySection = document.querySelector('.gallery-section-wrapper') || 
                         document.querySelector('.gallery-section') ||
                         document.querySelector('[class*="gallery-section"]');
  
  if (!gallerySubscribeWrapper || !gallerySection) {
    console.log('⚠️ Gallery subscribe wrapper or section not found');
    console.log('🔍 Gallery subscribe wrapper:', !!gallerySubscribeWrapper);
    console.log('🔍 Gallery section:', !!gallerySection);
    return;
  }
  
  console.log('✅ Gallery parallax elements found');
  console.log('🎨 Gallery subscribe wrapper:', gallerySubscribeWrapper.className);
  console.log('🎨 Gallery section:', gallerySection.className);
  
  // Set initial opacity and ensure proper styling
  gallerySubscribeWrapper.style.opacity = '0.3';
  gallerySubscribeWrapper.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  gallerySubscribeWrapper.style.willChange = 'opacity, transform';
  gallerySubscribeWrapper.style.transform = 'translateZ(0)';
  
  // Add hover effect for full opacity
  gallerySubscribeWrapper.addEventListener('mouseenter', function() {
    gallerySubscribeWrapper.style.opacity = '1';
    gallerySubscribeWrapper.style.transform = 'translateZ(10px) scale(1.02)';
  });
  
  gallerySubscribeWrapper.addEventListener('mouseleave', function() {
    // Return to scroll-based opacity
    updateParallax();
  });
  
  // Parallax scroll effect
  function updateParallax() {
    const rect = gallerySection.getBoundingClientRect();
    const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    
    // Apply parallax effect based on scroll position
    if (scrollProgress > 0 && scrollProgress < 1) {
      const parallaxDepth = scrollProgress * 30; // 0-30px depth
      const opacity = 0.3 + (scrollProgress * 0.7); // 30% to 100% opacity
      
      gallerySubscribeWrapper.style.transform = `translateZ(${parallaxDepth}px) scale(${1 + scrollProgress * 0.03})`;
      gallerySubscribeWrapper.style.opacity = opacity;
      
      console.log(`🎨 Parallax: depth=${parallaxDepth}px, opacity=${opacity.toFixed(2)}`);
    } else if (scrollProgress <= 0) {
      // Above the section - fade out
      gallerySubscribeWrapper.style.opacity = '0.1';
      gallerySubscribeWrapper.style.transform = 'translateZ(0) scale(1)';
    } else {
      // Below the section - full opacity
      gallerySubscribeWrapper.style.opacity = '1';
      gallerySubscribeWrapper.style.transform = 'translateZ(30px) scale(1.03)';
    }
  }
  
  // Throttled scroll handler for performance
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  // Add scroll listener
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // Initial update
  updateParallax();
  
  console.log('✅ Gallery parallax effect initialized');
}

// Initialize parallax when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeGalleryParallax();
});

// === Related Items Mouse Wheel Scroll Logic ===
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector(".collection-list-6");

  if (scrollContainer) {
    console.log('✅ Related items mouse wheel scroll logic initialized');
    console.log('📦 Related scroll container found:', scrollContainer);
    
    // Improved smooth mouse wheel scrolling with momentum
    let scrollVelocity = 0;
    let isScrolling = false;
    let scrollAnimationId = null;
    
    // Always active wheel scroll (not just on hover)
    scrollContainer.addEventListener('wheel', function(e) {
      console.log('🔄 Related section wheel event triggered');
      
      // Only prevent default if we're actually scrolling the container
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        e.preventDefault(); // Prevent default vertical scrolling
        e.stopPropagation(); // Stop event from bubbling up
        
        // Get scroll direction and amount with improved sensitivity
        const delta = e.deltaY || e.deltaX;
        const scrollSpeed = Math.abs(delta) * 0.5; // Dynamic speed based on wheel delta
        const direction = delta > 0 ? 1 : -1;
        
        // Add to velocity for momentum effect
        scrollVelocity += direction * scrollSpeed;
        
        // Smooth scroll with momentum
        if (!isScrolling) {
          isScrolling = true;
          smoothScrollWithMomentum();
        }
        
        console.log('🔄 Mouse wheel scrolling:', direction > 0 ? 'right' : 'left', 'speed:', scrollSpeed);
      }
    }, { passive: false }); // Required for preventDefault to work
    
    // Also add wheel listener to the parent section for better coverage
    const relatedSection = document.querySelector('.related-section');
    if (relatedSection) {
      relatedSection.addEventListener('wheel', function(e) {
        // Only handle if we're over the scroll container
        const rect = scrollContainer.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        if (mouseX >= rect.left && mouseX <= rect.right && 
            mouseY >= rect.top && mouseY <= rect.bottom) {
          console.log('🔄 Related section wheel event triggered (from parent)');
          
          if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
            e.preventDefault();
            e.stopPropagation();
            
            const delta = e.deltaY || e.deltaX;
            const scrollSpeed = Math.abs(delta) * 0.5;
            const direction = delta > 0 ? 1 : -1;
            
            scrollVelocity += direction * scrollSpeed;
            
            if (!isScrolling) {
              isScrolling = true;
              smoothScrollWithMomentum();
            }
          }
        }
      }, { passive: false });
    }
  } else {
    console.log('⚠️ Related items scroll container not found');
  }
});

// Observer to refresh ordering code when page content changes
function setupOrderingCodeObserver() {
  console.log('🔧 Setting up ordering code observer...');
  
  // Watch for changes in the product code element
  const selectors = ['#product-code', '.product-code-heading', '.product-code', '.product-title-source'];
  let productCodeElement = null;
  
  for (const selector of selectors) {
    productCodeElement = document.querySelector(selector);
    if (productCodeElement) {
      console.log(`✅ Found element to observe: ${selector}`);
      break;
    }
  }
  
  if (productCodeElement) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          console.log('🔄 Product code changed, refreshing ordering code...');
          setTimeout(() => {
            updateOrderingCode();
            updateProductCodeInjection();
            updateGeneratedCodeInjection();
          }, 100);
        }
      });
    });
    
    observer.observe(productCodeElement, {
      childList: true,
      characterData: true,
      subtree: true
    });
    
    console.log('✅ Ordering code observer set up for:', productCodeElement);
  } else {
    console.log('⚠️ No product code element found for observer, setting up periodic check');
    // Set up periodic check as backup
    setInterval(() => {
      const currentCode = getCurrentProductCode();
      if (currentCode !== 'CXXX' && currentCode !== window.lastProductCode) {
        console.log('🔄 Product code changed via periodic check:', currentCode);
        window.lastProductCode = currentCode;
        updateOrderingCode();
        updateProductCodeInjection();
        updateGeneratedCodeInjection();
      }
    }, 2000); // Check every 2 seconds
  }
  
  // Also watch for URL changes (for SPA navigation)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      console.log('🔄 URL changed, refreshing ordering code...');
      setTimeout(() => {
        updateOrderingCode();
        updateProductCodeInjection();
        updateGeneratedCodeInjection();
      }, 500);
    }
  }).observe(document, {subtree: true, childList: true});
}

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

// === Scroll-triggered Fade-in Animations ===
function initializeScrollAnimations() {
  console.log('✨ Initializing scroll animations...');
  
  // Create a single observer for all sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        console.log(`🎬 ${entry.target.className} fade-in triggered`);
      }
    });
  }, {
    threshold: 0.3, // Trigger when 30% of section is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before section comes into view
  });
  
  // Observe specific product page elements (NOT the wrapper)
  const productVisuals = document.querySelector('.product-visuals');
  const productInfoBlock = document.querySelector('.product-info-block');
  const downloadPanel = document.querySelector('.download-panel');
  
  if (productVisuals) {
    observer.observe(productVisuals);
    console.log('✅ Product visuals observer set up');
  }
  
  if (productInfoBlock) {
    observer.observe(productInfoBlock);
    console.log('✅ Product info block observer set up');
  }
  
  if (downloadPanel) {
    observer.observe(downloadPanel);
    console.log('✅ Download panel observer set up');
  }
  
  // Observe Related Items section
  const relatedSection = document.querySelector('.related-section');
  if (relatedSection) {
    observer.observe(relatedSection);
    console.log('✅ Related section observer set up');
  }
  
  // Observe Gallery section
  const gallerySection = document.querySelector('.gallery-section');
  if (gallerySection) {
    observer.observe(gallerySection);
    console.log('✅ Gallery section observer set up');
  }
  
  // Enhanced accessories dropdown animation
  const accessoriesToggle = document.querySelector('.accessories-toggle');
  if (accessoriesToggle) {
    accessoriesToggle.addEventListener('click', function() {
      const accessoriesSection = this.closest('.accessories-section');
      const accessoriesItems = accessoriesSection.querySelectorAll('.accessories-item');
      
      // Add staggered animation delays to accessories items
      accessoriesItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
      });
      
      console.log('🎬 Accessories dropdown animation triggered');
    });
  }
}

// === Smooth Scroll to Related Section ===
function scrollToRelatedSection() {
  const relatedSection = document.querySelector('.related-section');
  if (relatedSection) {
    relatedSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    console.log('📜 Smooth scrolling to related section');
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollAnimations();
  
  // Add smooth scroll button if needed (optional)
  const scrollToRelatedBtn = document.querySelector('.scroll-to-related');
  if (scrollToRelatedBtn) {
    scrollToRelatedBtn.addEventListener('click', scrollToRelatedSection);
  }
  
  // Initialize menu panel functionality
  initializeMenuPanel();
});

// === Auto-scroll Fullscreen Image Gallery ===
function initializeGalleryAutoScroll() {
  console.log('🎠 Initializing gallery auto-scroll...');
  
  const gallery = document.querySelector('.gallery-section-cms');
  
  if (!gallery) {
    console.log('⚠️ Gallery section not found');
    return;
  }

  console.log('📏 Gallery found:', gallery);
  
  // Check for collection items
  const collectionItems = gallery.querySelectorAll('.w-dyn-item');
  console.log('📦 Number of collection items:', collectionItems.length);
  
  // Check if gallery has any images and hide section if empty
  const gallerySection = document.querySelector('.gallery-section');
  if (collectionItems.length === 0) {
    console.log('⚠️ No images found in gallery - hiding gallery section');
    if (gallerySection) {
      gallerySection.style.display = 'none';
      gallerySection.style.visibility = 'hidden';
      gallerySection.style.opacity = '0';
      gallerySection.style.height = '0';
      gallerySection.style.overflow = 'hidden';
    }
    return; // Exit the function early
  } else {
    console.log(`✅ Gallery has ${collectionItems.length} images - showing gallery section`);
    if (gallerySection) {
      gallerySection.style.display = 'block';
      gallerySection.style.visibility = 'visible';
      gallerySection.style.opacity = '1';
      gallerySection.style.height = 'auto';
      gallerySection.style.overflow = 'visible';
    }
  }

  // Gallery state management
  let currentIndex = 0;
  let isAutoScrolling = true;
  let scrollInterval;
  const scrollSpeed = 4000; // time between slides (ms)
  const transitionDuration = 800; // ms for smooth transitions
  
  // Get total number of images
  const totalImages = collectionItems.length;
  const viewportWidth = window.innerWidth;
  
  console.log(`📊 Gallery stats: ${totalImages} images, viewport: ${viewportWidth}px`);

  // Smooth scroll to specific image index
  function scrollToImage(index, duration = transitionDuration) {
    if (index < 0 || index >= totalImages) return;
    
    const targetScroll = index * viewportWidth;
    
    console.log(`🎯 Scrolling to image ${index + 1}/${totalImages} at position ${targetScroll}px`);
    
    // Use custom smooth scroll for better control
    smoothScrollTo(gallery, targetScroll, duration);
    
    currentIndex = index;
  }

  // Custom smooth scroll function with easing
  function smoothScrollTo(element, target, duration) {
    const start = element.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();
    
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      element.scrollLeft = start + (distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }

  // Next image with seamless looping
  function scrollToNext() {
    if (currentIndex >= totalImages - 1) {
      // At the end - loop seamlessly by duplicating first image
      currentIndex = 0;
      console.log('🔄 Looping to first image seamlessly');
    } else {
      currentIndex++;
      console.log(`🔄 Moving to next image: ${currentIndex + 1}/${totalImages}`);
    }
    
    scrollToImage(currentIndex);
  }

  // Previous image with seamless looping
  function scrollToPrevious() {
    if (currentIndex <= 0) {
      // At the beginning - loop seamlessly to last image
      currentIndex = totalImages - 1;
      console.log('🔄 Looping to last image seamlessly');
    } else {
      currentIndex--;
      console.log(`🔄 Moving to previous image: ${currentIndex + 1}/${totalImages}`);
    }
    
    scrollToImage(currentIndex);
  }

  // Auto-scroll function
  function startAutoScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
    }
    scrollInterval = setInterval(scrollToNext, scrollSpeed);
    isAutoScrolling = true;
    console.log('▶️ Auto-scroll started');
  }

  function stopAutoScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
    isAutoScrolling = false;
    console.log('⏸️ Auto-scroll paused');
  }

  // Enhanced mouse wheel scroll handler with momentum
  let wheelVelocity = 0;
  let wheelAnimationId = null;
  
  function handleWheelScroll(event) {
    event.preventDefault();
    event.stopPropagation();
    
    // Calculate velocity based on wheel delta
    const delta = event.deltaY || event.deltaX;
    const direction = delta > 0 ? 1 : -1;
    const speed = Math.abs(delta) * 0.01;
    
    wheelVelocity += direction * speed;
    
    // Stop any ongoing auto-scroll
    stopAutoScroll();
    
    // Apply momentum scrolling
    if (!wheelAnimationId) {
      wheelAnimationId = requestAnimationFrame(applyWheelMomentum);
    }
    
    console.log(`🎯 Wheel scroll: direction=${direction}, speed=${speed}`);
  }
  
  function applyWheelMomentum() {
    if (Math.abs(wheelVelocity) > 0.1) {
      if (wheelVelocity > 0) {
        scrollToNext();
      } else {
        scrollToPrevious();
      }
      
      // Apply friction
      wheelVelocity *= 0.8;
      
      wheelAnimationId = requestAnimationFrame(applyWheelMomentum);
    } else {
      wheelVelocity = 0;
      wheelAnimationId = null;
      
      // Restart auto-scroll after a delay
      setTimeout(() => {
        if (isAutoScrolling) {
          startAutoScroll();
        }
      }, 2000);
    }
  }

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchStartTime = 0;
  let touchVelocity = 0;
  
  gallery.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].pageX;
    touchStartTime = Date.now();
    touchVelocity = 0;
    
    // Stop auto-scroll during touch
    stopAutoScroll();
    
    console.log('📱 Gallery touch start');
  });
  
  gallery.addEventListener('touchmove', function(e) {
    e.preventDefault();
    const currentX = e.touches[0].pageX;
    const deltaX = touchStartX - currentX;
    
    // Calculate velocity
    const currentTime = Date.now();
    const timeDiff = currentTime - touchStartTime;
    if (timeDiff > 0) {
      touchVelocity = deltaX / timeDiff;
    }
    
    // Direct scroll during touch
    gallery.scrollLeft += deltaX * 0.5;
    touchStartX = currentX;
    touchStartTime = currentTime;
  });
  
  gallery.addEventListener('touchend', function() {
    console.log('📱 Gallery touch end');
    
    // Apply momentum based on velocity
    if (Math.abs(touchVelocity) > 0.5) {
      if (touchVelocity > 0) {
        scrollToNext();
      } else {
        scrollToPrevious();
      }
    }
    
    // Restart auto-scroll after a delay
    setTimeout(() => {
      if (isAutoScrolling) {
        startAutoScroll();
      }
    }, 2000);
  });

  // Event listeners
  gallery.addEventListener('mouseenter', function() {
    gallery.addEventListener('wheel', handleWheelScroll, { passive: false });
    stopAutoScroll();
    console.log('🎯 Gallery mouse wheel enabled, auto-scroll paused');
  });
  
  gallery.addEventListener('mouseleave', function() {
    gallery.removeEventListener('wheel', handleWheelScroll);
    if (isAutoScrolling) {
      startAutoScroll();
    }
    console.log('🎯 Gallery mouse wheel disabled, auto-scroll resumed');
  });

  // Initialize gallery
  function initializeGallery() {
    // Set initial scroll position
    gallery.scrollLeft = 0;
    currentIndex = 0;
    
    console.log('📍 Gallery initialized at first image');
    
    // Start auto-scroll after a delay
    setTimeout(() => {
      startAutoScroll();
    }, 3000); // 3 second delay
  }

  // Initialize when DOM is ready
  initializeGallery();
  
  console.log('✅ Gallery initialized with smooth scrolling and seamless looping');
  console.log('💡 Features: Auto-scroll, mouse wheel, touch gestures, seamless looping');
}

// Initialize gallery auto-scroll when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeGalleryAutoScroll();
});

// === Menu Panel Functionality ===
function initializeMenuPanel() {
  const menuWrapper = document.querySelector('.menu-wrapper');
  const menuPanel = document.querySelector('.menu-panel');
  const menuClose = document.querySelector('.menu-close');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  console.log('📋 Menu elements found:', {
    menuWrapper: !!menuWrapper,
    menuPanel: !!menuPanel,
    menuClose: !!menuClose,
    menuOverlay: !!menuOverlay
  });
  
  if (menuWrapper && menuPanel) {
    // Open menu
    menuWrapper.addEventListener('click', function(e) {
      console.log('📋 Menu wrapper clicked!');
      e.preventDefault();
      e.stopPropagation();
      openMenu();
    });
    
    // Close menu
    if (menuClose) {
      console.log('📋 Close button found:', menuClose);
      menuClose.addEventListener('click', function(e) {
        console.log('📋 Close button clicked!');
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      });
    } else {
      console.log('⚠️ Close button not found!');
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menuPanel.classList.contains('active')) {
        closeMenu();
      }
    });
    
    // Prevent wheel scrolling when menu is open
    document.addEventListener('wheel', function(e) {
      if (menuPanel.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, { passive: false });
    
    // Prevent touch scrolling when menu is open (mobile)
    document.addEventListener('touchmove', function(e) {
      if (menuPanel.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, { passive: false });
    
    // Close menu on overlay click
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
      
      // Prevent scroll on overlay
      menuOverlay.addEventListener('wheel', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, { passive: false });
      
      menuOverlay.addEventListener('touchmove', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, { passive: false });
    }
    
    // Close menu on outside click (backup method)
    document.addEventListener('click', function(e) {
      if (menuPanel.classList.contains('active') && 
          !menuPanel.contains(e.target) && 
          !menuWrapper.contains(e.target) &&
          !menuOverlay.contains(e.target)) {
        closeMenu();
      }
    });
    
    // Prevent menu panel clicks from closing the menu
    menuPanel.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
    // Close menu when menu links are clicked
    const menuLinks = menuPanel.querySelectorAll('a[href]');
    menuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        console.log('📋 Menu link clicked, closing menu...');
        closeMenu();
      });
    });
  }
  
  function openMenu() {
    console.log('📋 Opening menu...');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
    
    // Calculate header height to position menu panel at bottom of header
    const headerSection = document.querySelector('.header-section');
    const headerHeight = headerSection ? headerSection.offsetHeight : 0;
    
    console.log('📋 Header height:', headerHeight);
    
    // Position menu panel at bottom of header
    menuPanel.style.top = headerHeight + 'px';
    
    // Show overlay first
    if (menuOverlay) {
      menuOverlay.style.display = 'block';
      setTimeout(() => {
        menuOverlay.classList.add('active');
      }, 10);
    }
    
    // Show menu panel
    menuPanel.style.display = 'flex';
    menuPanel.style.visibility = 'visible';
    menuPanel.style.opacity = '1';
    
    console.log('📋 Menu panel display set to flex');
    console.log('📋 Menu panel visibility:', menuPanel.style.visibility);
    console.log('📋 Menu panel opacity:', menuPanel.style.opacity);
    
    // Trigger animation after display change
    setTimeout(() => {
      menuPanel.classList.add('active');
      console.log('📋 Menu panel active class added');
      
      // Check close button visibility
      const closeBtn = menuPanel.querySelector('.menu-close');
      if (closeBtn) {
        console.log('📋 Close button found in active menu:', closeBtn);
        console.log('📋 Close button display:', closeBtn.style.display);
        console.log('📋 Close button visibility:', closeBtn.style.visibility);
        console.log('📋 Close button opacity:', closeBtn.style.opacity);
      } else {
        console.log('⚠️ Close button not found in active menu');
      }
    }, 50);
    
    // Update ARIA state
    menuWrapper.setAttribute('aria-expanded', 'true');
    
    console.log('📋 Menu opened at header bottom:', headerHeight + 'px');
  }
  
  function closeMenu() {
    console.log('📋 Closing menu...');
    
    // Restore body scrolling
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
    
    // Remove active class from menu panel
    menuPanel.classList.remove('active');
    
    // Remove active class from overlay
    if (menuOverlay) {
      menuOverlay.classList.remove('active');
    }
    
    // Hide elements after animation
    setTimeout(() => {
      menuPanel.style.display = 'none';
      if (menuOverlay) {
        menuOverlay.style.display = 'none';
      }
    }, 400); // Match CSS transition duration
    
    // Update ARIA state
    menuWrapper.setAttribute('aria-expanded', 'false');
    
    console.log('📋 Menu closed');
  }
}

/* === Skeleton Loader Functionality === */

// Initialize skeleton loaders for all images
function initializeSkeletonLoaders() {
  const images = document.querySelectorAll('img[src]');
  
  images.forEach(img => {
    // Add skeleton class initially
    img.classList.add('skeleton');
    
    // Create a wrapper if it doesn't exist
    let wrapper = img.parentElement;
    if (!wrapper.classList.contains('skeleton-wrapper')) {
      wrapper.classList.add('skeleton-wrapper');
    }
    
    // Handle image load
    if (img.complete) {
      handleImageLoad(img);
    } else {
      img.addEventListener('load', () => handleImageLoad(img));
      img.addEventListener('error', () => handleImageError(img));
    }
  });
}

// Handle successful image load
function handleImageLoad(img) {
  img.classList.remove('skeleton');
  img.classList.add('loaded');
  
  // Add fade-in effect
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';
  
  setTimeout(() => {
    img.style.opacity = '1';
  }, 50);
}

// Handle image load error
function handleImageError(img) {
  img.classList.remove('skeleton');
  img.classList.add('error');
  
  // Show error placeholder
  img.style.display = 'none';
  const errorPlaceholder = document.createElement('div');
  errorPlaceholder.className = 'image-error-placeholder';
  errorPlaceholder.innerHTML = '<span>Image not available</span>';
  errorPlaceholder.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    color: #999;
    font-size: 12px;
  `;
  img.parentElement.appendChild(errorPlaceholder);
}

// Initialize skeleton loaders when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeSkeletonLoaders();
});

// Handle dynamically added images (for CMS content)
function handleDynamicImages() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          const images = node.querySelectorAll ? node.querySelectorAll('img[src]') : [];
          images.forEach(img => {
            if (!img.classList.contains('skeleton')) {
              img.classList.add('skeleton');
              if (img.complete) {
                handleImageLoad(img);
              } else {
                img.addEventListener('load', () => handleImageLoad(img));
                img.addEventListener('error', () => handleImageError(img));
              }
            }
          });
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Initialize dynamic image handling
document.addEventListener('DOMContentLoaded', function() {
  handleDynamicImages();
});

// Preload critical images
function preloadCriticalImages() {
  const criticalImages = [
    'main-lightbox-trigger',
    'thumbnail-image',
    'gallery-image'
  ];
  
  criticalImages.forEach(selector => {
    const images = document.querySelectorAll(selector);
    images.forEach(img => {
      if (img.src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
      }
    });
  });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', function() {
  preloadCriticalImages();
});

/* === Arrow Hover Effects === */
document.addEventListener('DOMContentLoaded', function() {
  
  // Download arrow hover effects
  document.querySelectorAll('.download-arrow').forEach(arrow => {
    arrow.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    arrow.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Dropdown arrow hover effects
  document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
    arrow.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    arrow.addEventListener('mouseleave', function() {
      // Only reset scale if dropdown is not open (to preserve rotation)
      const dropdown = this.closest('.dropdown-wrapper');
      if (!dropdown || !dropdown.classList.contains('open')) {
        this.style.transform = 'scale(1)';
      } else {
        // If dropdown is open, maintain rotation but reset scale
        this.style.transform = 'rotate(180deg) scale(1)';
      }
    });
  });
});

// Initialize gallery auto-scroll when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeGalleryAutoScroll();
});

// === Gallery Subscribe Wrapper Parallax Enhancement ===
function initializeGalleryParallax() {
  console.log('🎨 Initializing gallery parallax effect...');
  
  const gallerySubscribeWrapper = document.querySelector('.gallery-subscribe-wrapper');
  const gallerySection = document.querySelector('.gallery-section-wrapper');
  
  if (!gallerySubscribeWrapper || !gallerySection) {
    console.log('⚠️ Gallery subscribe wrapper or section not found');
    return;
  }
  
  console.log('✅ Gallery parallax elements found');
  
  // Parallax scroll effect
  function updateParallax() {
    const rect = gallerySection.getBoundingClientRect();
    const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    
    // Apply parallax effect based on scroll position
    if (scrollProgress > 0 && scrollProgress < 1) {
      const parallaxDepth = scrollProgress * 20; // 0-20px depth
      const opacity = 0.3 + (scrollProgress * 0.7); // 30% to 100% opacity
      
      gallerySubscribeWrapper.style.transform = `translateZ(${parallaxDepth}px) scale(${1 + scrollProgress * 0.02})`;
      gallerySubscribeWrapper.style.opacity = opacity;
      
      console.log(`🎨 Parallax: depth=${parallaxDepth}px, opacity=${opacity.toFixed(2)}`);
    }
  }
  
  // Throttled scroll handler for performance
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  // Add scroll listener
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // Initial update
  updateParallax();
  
  console.log('✅ Gallery parallax effect initialized');
}

// Initialize parallax when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeGalleryParallax();
});

// === SVG Background Tracing Animation ===
function initializeSVGTracingAnimation() {
  console.log('🎨 Initializing SVG tracing animation...');
  
  // Find the background SVG
  const backgroundSVG = document.querySelector('svg[class*="duva-main-background"], svg[class*="background"], svg[id*="background"], svg[data-background="true"]');
  
  if (!backgroundSVG) {
    console.log('⚠️ Background SVG not found, creating demo animation');
    createDemoSVGAnimation();
    return;
  }
  
  console.log('✅ Background SVG found:', backgroundSVG);
  
  // Get all paths in the SVG
  const paths = backgroundSVG.querySelectorAll('path');
  console.log(`📊 Found ${paths.length} paths to trace`);
  
  if (paths.length === 0) {
    console.log('⚠️ No paths found in SVG');
    return;
  }
  
  // Create tracing dot
  const tracingDot = createTracingDot();
  backgroundSVG.appendChild(tracingDot);
  
  // Create stroke overlay for drawing effect
  const strokeOverlay = createStrokeOverlay();
  backgroundSVG.appendChild(strokeOverlay);
  
  // Start the tracing animation
  startTracingAnimation(paths, tracingDot, strokeOverlay);
}

function createTracingDot() {
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('cx', '0');
  dot.setAttribute('cy', '0');
  dot.setAttribute('r', '3');
  dot.setAttribute('fill', '#C0392B');
  dot.setAttribute('class', 'tracing-dot');
  dot.style.filter = 'drop-shadow(0 0 4px #C0392B)';
  dot.style.opacity = '0';
  dot.style.transition = 'opacity 0.3s ease';
  
  return dot;
}

function createStrokeOverlay() {
  const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  overlay.setAttribute('class', 'stroke-overlay');
  overlay.style.pointerEvents = 'none';
  
  return overlay;
}

function startTracingAnimation(paths, tracingDot, strokeOverlay) {
  let currentPathIndex = 0;
  let currentProgress = 0;
  const animationSpeed = 0.02; // Adjust for speed
  const pathDelay = 500; // Delay between paths in ms
  
  function animatePath() {
    if (currentPathIndex >= paths.length) {
      console.log('✅ Tracing animation complete');
      return;
    }
    
    const path = paths[currentPathIndex];
    const pathLength = path.getTotalLength();
    
    console.log(`🎨 Tracing path ${currentPathIndex + 1}/${paths.length}`);
    
    function tracePath() {
      if (currentProgress >= 1) {
        // Path complete, move to next
        currentPathIndex++;
        currentProgress = 0;
        
        if (currentPathIndex < paths.length) {
          setTimeout(animatePath, pathDelay);
        } else {
          console.log('✅ All paths traced');
        }
        return;
      }
      
      // Get point along path
      const point = path.getPointAtLength(currentProgress * pathLength);
      
      // Update tracing dot position
      tracingDot.setAttribute('cx', point.x);
      tracingDot.setAttribute('cy', point.y);
      tracingDot.style.opacity = '1';
      
      // Create stroke segment
      createStrokeSegment(path, currentProgress, strokeOverlay);
      
      // Update progress
      currentProgress += animationSpeed;
      
      // Continue animation
      requestAnimationFrame(tracePath);
    }
    
    // Start tracing this path
    tracePath();
  }
  
  // Start the animation
  setTimeout(animatePath, 1000); // Initial delay
}

function createStrokeSegment(path, progress, strokeOverlay) {
  const pathLength = path.getTotalLength();
  const segmentLength = pathLength * 0.02; // Segment size
  
  // Create a stroke segment
  const strokePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  strokePath.setAttribute('d', path.getAttribute('d'));
  strokePath.setAttribute('fill', 'none');
  strokePath.setAttribute('stroke', '#C0392B');
  strokePath.setAttribute('stroke-width', '2');
  strokePath.setAttribute('stroke-linecap', 'round');
  strokePath.setAttribute('stroke-linejoin', 'round');
  strokePath.style.strokeDasharray = `${segmentLength} ${pathLength}`;
  strokePath.style.strokeDashoffset = pathLength - (progress * pathLength);
  strokePath.style.opacity = '0.8';
  
  strokeOverlay.appendChild(strokePath);
  
  // Remove old segments to prevent memory issues
  setTimeout(() => {
    if (strokePath.parentNode) {
      strokePath.parentNode.removeChild(strokePath);
    }
  }, 5000);
}

function createDemoSVGAnimation() {
  console.log('🎨 Creating demo SVG animation...');
  
  // Create a demo SVG if no background SVG is found
  const demoContainer = document.createElement('div');
  demoContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.1;
  `;
  
  const demoSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  demoSVG.setAttribute('width', '100%');
  demoSVG.setAttribute('height', '100%');
  demoSVG.setAttribute('viewBox', '0 0 1000 600');
  
  // Create demo paths
  const paths = [
    'M 100,300 Q 200,100 300,300 T 500,300',
    'M 500,300 Q 600,100 700,300 T 900,300',
    'M 100,400 L 300,400 L 300,200 L 500,200',
    'M 500,200 L 700,200 L 700,400 L 900,400'
  ];
  
  paths.forEach((pathData, index) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#333');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('opacity', '0.3');
    demoSVG.appendChild(path);
  });
  
  demoContainer.appendChild(demoSVG);
  document.body.appendChild(demoContainer);
  
  // Start animation with demo paths
  const demoPaths = demoSVG.querySelectorAll('path');
  const tracingDot = createTracingDot();
  const strokeOverlay = createStrokeOverlay();
  
  demoSVG.appendChild(tracingDot);
  demoSVG.appendChild(strokeOverlay);
  
  startTracingAnimation(demoPaths, tracingDot, strokeOverlay);
}

// Initialize SVG tracing animation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeSVGTracingAnimation();
});
