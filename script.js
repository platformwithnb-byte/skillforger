let teamMode = "duo";

const timelineData = [
    "Feb–Mar 2026: Web Basics",
    "Apr–Jun 2026: Backend",
    "Jul–Aug 2026: AI Skills",
    "Jul–Sep 2026: Full Stack Build",
    "Oct 2026: UI/UX",
    "Oct–Dec 2026: Business",
    "Nov 2026–Jun 2027: Sales",
    "Jan–Mar 2027: APIs",
    "Apr–Dec 2027: SaaS Growth",
    "2028: Company Mode"
];

const roadmap = {
    phase1: {
        title: "Core Tech", roles: {
            A: ["Website planning", "Client research", "HTML/CSS/JS learning"],
            B: ["Backend development", "Database design"],
            C: ["Testing websites", "Tool research"]
        }
    },
    phase2: {
        title: "AI + Full Stack", roles: {
            A: ["AI marketing prompts", "Automation workflows"],
            B: ["Build full product", "Deploy system"],
            C: ["Test AI flows"]
        }
    },
    phase3: {
        title: "Product + Business", roles: {
            A: ["Sales communication", "Brand building"],
            B: ["UX improvements"],
            C: ["User feedback"]
        }
    },
    phase4: {
        title: "Sales Experience", roles: {
            A: ["Client closing"],
            B: ["Store tech setup"],
            C: ["Order handling"]
        }
    },
    phase5: {
        title: "Advanced Tech", roles: {
            A: ["System architecture"],
            B: ["API & automation"],
            C: ["Stress testing"]
        }
    },
    phase6: {
        title: "SaaS Growth", roles: {
            A: ["User acquisition", "Revenue"],
            B: ["Scaling infrastructure"],
            C: ["Support systems"]
        }
    },
    phase7: {
        title: "Company Mode", roles: {
            A: ["Leadership & vision"],
            B: ["Tech head"],
            C: ["Operations"]
        }
    }
};

function render() {
    let box = document.getElementById("phases");
    box.innerHTML = "";
    for (let p in roadmap) {
        box.innerHTML += `
<div class="phase" onclick="openPanel('${p}')">
<h3>${roadmap[p].title}</h3>
<div class="bar"><div class="fill" style="width:${getProgress(p)}%"></div></div>
${getProgress(p)}%
</div>`;
    }
}

function openPanel(p) {
    panel.classList.add("show");
    panelTitle.innerText = roadmap[p].title;

    let html = "";
    for (let r in roadmap[p].roles) {
        if (teamMode === "duo" && r === "B") continue;

        html += `<div class="role"><b>Role ${r}</b>`;
        roadmap[p].roles[r].forEach((t, i) => {
            let key = p + r + i;
            let done = localStorage.getItem(key) === "1";
            let note = localStorage.getItem(key + "n") || "";
            html += `
<label class="task">
<input type="checkbox" ${done ? "checked" : ""} onchange="save('${key}',this.checked)">
${t}
</label>
<textarea class="note" placeholder="Notes..." onkeyup="saveNote('${key}',this.value)">${note}</textarea>
`;
        });
        html += "</div>";
    }
    roleTasks.innerHTML = html;
}

function save(k, v) {
    localStorage.setItem(k, v ? "1" : "0");
    render();
}

function saveNote(k, v) {
    localStorage.setItem(k + "n", v);
}

function getProgress(p) {
    let total = 0, done = 0;
    for (let r in roadmap[p].roles) {
        if (teamMode === "duo" && r === "B") continue;
        roadmap[p].roles[r].forEach((_, i) => {
            total++;
            if (localStorage.getItem(p + r + i) === "1") done++;
        });
    }
    return total ? Math.round(done / total * 100) : 0;
}

function setTeam() {
    teamMode = teamModeSelect.value;
    render();
}

function showTimeline() {
    let box = document.getElementById("timeline");
    box.style.display = box.style.display === "block" ? "none" : "block";
    box.innerHTML = timelineData.map(t => `<div class="month">${t}</div>`).join("");
}

function searchTasks() {
    let q = searchBox.value.toLowerCase();
    document.querySelectorAll(".task").forEach(t => {
        t.style.display = t.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
}

render();
