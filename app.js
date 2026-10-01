// Data source for our dynamic table component
const componentRecords = [
    { name: "Design Tokens", category: "Foundation", status: "Stable" },
    { name: "Navigation Header", category: "Layout", status: "Stable" },
    { name: "Executive Card", category: "Surfaces", status: "Updated" },
    { name: "Data Grid Table", category: "Data Display", status: "Stable" }
];

document.addEventListener("DOMContentLoaded", () => {
    console.log("Modular Component Library Initialized.");
    renderTableRows();
    setupButtonInteractions();
    setupTokenCopyFeature();
});


function renderTableRows() {
    const tbody = document.getElementById("tableBody");
    if (!tbody) return;

    tbody.innerHTML = componentRecords.map(item => `
        <tr class="hover:bg-slate-50/80 transition">
            <td class="px-6 py-4 font-medium text-slate-900">${item.name}</td>
            <td class="px-6 py-4 text-slate-600">${item.category}</td>
            <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'Stable' ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'
                }">
                    ${item.status}
                </span>
            </td>
            <td class="px-6 py-4 text-right">
                <button onclick="inspectComponent('${item.name}')" class="text-indigo-600 hover:text-indigo-900 font-medium text-xs cursor-pointer">Inspect</button>
            </td>
        </tr>
    `).join('');
}


function setupButtonInteractions() {
    const primaryBtn = document.getElementById("primaryBtn");
    const secondaryBtn = document.getElementById("secondaryBtn");
    const dangerBtn = document.getElementById("dangerBtn");

    if (primaryBtn) {
        primaryBtn.addEventListener("click", () => {
            showNotification("Primary Action Triggered! Tailwind Class: bg-indigo-600 hover:bg-indigo-700");
        });
    }

    if (secondaryBtn) {
        secondaryBtn.addEventListener("click", () => {
            showNotification("Secondary Action Triggered! Tailwind Class: bg-white border border-slate-300");
        });
    }

    if (dangerBtn) {
        dangerBtn.addEventListener("click", () => {
            showNotification("Destructive Action Triggered! Tailwind Class: bg-rose-600 hover:bg-rose-700");
        });
    }
}


function setupTokenCopyFeature() {
    
    const tokenCards = document.querySelectorAll("#tokens .grid > div");
    
    tokenCards.forEach(card => {
       
        card.classList.add("cursor-pointer", "transition-transform", "active:scale-95");
        
        card.addEventListener("click", () => {
            const tokenTitle = card.querySelector("p.font-semibold").innerText;
            const tokenClass = card.querySelector("p.text-xs").innerText;
            
            
            const snippet = `class="${tokenClass.includes('slate-900') ? 'bg-slate-900 text-white' : tokenClass.includes('slate-100') ? 'bg-slate-100 text-slate-800' : 'bg-' + tokenClass}"`;
            
            navigator.clipboard.writeText(snippet).then(() => {
                showNotification(`Copied token snippet for [${tokenTitle}] to clipboard!`);
            });
        });
    });
}


function inspectComponent(componentName) {
    showNotification(`Inspecting component module: ${componentName} — Ready for implementation.`);
}


function showNotification(message) {
    
    const existingBanner = document.getElementById("liveNotificationBanner");
    if (existingBanner) existingBanner.remove();

    
    const banner = document.createElement("div");
    banner.id = "liveNotificationBanner";
    banner.className = "fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium z-50 flex items-center space-x-3 transition-all animate-bounce-short";
    banner.innerHTML = `
        <span>⚡ ${message}</span>
    `;

    document.body.appendChild(banner);

    
    setTimeout(() => {
        if (banner) {
            banner.style.opacity = "0";
            setTimeout(() => banner.remove(), 300);
        }
    }, 3500);
}