let jobs = [
    { id: 1, companyName: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$100k - $120k", description: "Build high-performant mobile applications using React Native.", status: "none" },
    { id: 2, companyName: "WebFlow Agency", position: "Front-End Developer", location: "Los Angeles", type: "Contract", salary: "$80k - $100k", description: "Convert modern UI designs into functional code.", status: "none" },
    { id: 3, companyName: "DataViz Solutions", position: "Data Specialist", location: "Boston", type: "Full-time", salary: "$110k - $140k", description: "Create powerful interactive dashboards.", status: "none" },
    { id: 4, companyName: "Cloud First Inc", position: "Backend Developer", location: "Seattle", type: "Remote", salary: "$130k - $160k", description: "Design scalable backend systems.", status: "none" },
    { id: 5, companyName: "Innovative Labs", position: "UI/UX Designer", location: "Austin", type: "Full-time", salary: "$90k - $110k", description: "Craft modern user experiences.", status: "none" },
    { id: 6, companyName: "MegaCorp", position: "JavaScript Developer", location: "New York", type: "Full-time", salary: "$120k - $150k", description: "Build scalable web applications.", status: "none" },
    { id: 7, companyName: "StartupXYZ", position: "Full Stack Engineer", location: "Remote", type: "Full-time", salary: "$100k - $130k", description: "Develop collaborative software solutions.", status: "none" },
    { id: 8, companyName: "TechGear", position: "Senior Frontend Engineer", location: "San Francisco", type: "Full-time", salary: "$150k - $180k", description: "Lead frontend architecture development.", status: "none" }
];

let currentTab = "all";

function renderJobs() {
    const container = document.getElementById("jobs-container");
    let filteredJobs;

    if (currentTab === "all") {
        filteredJobs = jobs;
    } else {
        filteredJobs = jobs.filter(job => job.status === currentTab);
    }

    document.getElementById("job-list-count").innerText = filteredJobs.length;

    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <i data-lucide="briefcase" class="w-16 h-16 text-blue-400 mb-4"></i>
                <h4 class="text-xl font-bold text-slate-800">No jobs Available</h4>
                <p class="text-slate-500">There are no jobs in this category.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    container.innerHTML = filteredJobs.map(job => `
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            
            <div class="flex justify-between items-start mb-1">
                <h4 class="font-bold text-xl text-slate-900">${job.companyName}</h4>
                <button onclick="deleteJob(${job.id})" class="text-slate-300 hover:text-red-500 transition-colors">
                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>
            </div>

            <p class="text-blue-600 font-semibold text-lg mb-1">${job.position}</p>

            <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400 mb-2">
                <span>${job.location}</span>
                <span>${job.type}</span>
                <span>${job.salary}</span>
            </div>

            <div class="mb-3">
                ${
                    job.status === "interview"
                    ? `<span class="px-3 py-0.5 text-[10px] font-bold tracking-wider rounded-md bg-emerald-100 text-emerald-600 uppercase">INTERVIEW</span>`
                    : job.status === "rejected"
                    ? `<span class="px-3 py-0.5 text-[10px] font-bold tracking-wider rounded-md bg-red-100 text-red-500 uppercase">REJECTED</span>`
                    : ""
                }
            </div>

            <p class="text-slate-600 text-sm mb-6 leading-relaxed">${job.description}</p>

            <div class="flex gap-3">
                <button onclick="updateStatus(${job.id}, 'interview')" 
                    class="px-5 py-2 rounded-lg text-sm font-bold border transition-all cursor-pointer
                    ${job.status === "interview" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                        : "text-emerald-600 border-emerald-200 hover:bg-emerald-50"}">
                    Interview
                </button>

                <button onclick="updateStatus(${job.id}, 'rejected')" 
                    class="px-5 py-2 rounded-lg text-sm font-bold border transition-all cursor-pointer
                    ${job.status === "rejected" 
                        ? "bg-red-50 text-red-500 border-red-200" 
                        : "text-red-500 border-red-200 hover:bg-red-50"}">
                    Rejected
                </button>
            </div>
        </div>
    `).join("");

    lucide.createIcons();
}

function updateStatus(id, status) {
    jobs = jobs.map(job =>
        job.id === id ? { ...job, status } : job
    );
    updateStats();
    renderJobs();
}

function deleteJob(id) {
    jobs = jobs.filter(job => job.id !== id);
    updateStats();
    renderJobs();
}

function switchTab(tab) {
    currentTab = tab;

    ["all", "interview", "rejected"].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (t === tab) {
            btn.classList.add("bg-blue-600", "text-white");
            btn.classList.remove("bg-white", "text-slate-600");
        } else {
            btn.classList.remove("bg-blue-600", "text-white");
            btn.classList.add("bg-white", "text-slate-600");
        }
    });

    renderJobs();
}

function updateStats() {
    document.getElementById("total-count").innerText = jobs.length;
    document.getElementById("interview-count").innerText =
        jobs.filter(j => j.status === "interview").length;
    document.getElementById("rejected-count").innerText =
        jobs.filter(j => j.status === "rejected").length;
}

updateStats();
renderJobs();