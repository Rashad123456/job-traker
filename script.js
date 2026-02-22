
let jobs = [
    { id: 1, companyName: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$100k - $120k", description: "Build high-performant mobile applications using React Native for our global client base.", status: "none" },
    { id: 2, companyName: "WebFlow Agency", position: "Front-End Developer", location: "Los Angeles, CA", type: "Contract", salary: "$80k - $100k", description: "Convert stunning designs into functional code using modern web technologies.", status: "none" },
    { id: 3, companyName: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA", type: "Full-time", salary: "$110k - $140k", description: "Create interactive and insightful data dashboards using D3.js and React.", status: "none" },
    { id: 4, companyName: "Cloud First Inc", position: "Backend Developer", location: "Seattle, WA", type: "Remote", salary: "$130k - $160k", description: "Design and maintain complex server-side architectures using Python and AWS.", status: "none" },
    { id: 5, companyName: "Innovative Labs", position: "UI/UX Designer", location: "Austin, TX", type: "Full-time", salary: "$90k - $110k", description: "Create intuitive user interfaces and user experiences for our suite of products.", status: "none" },
    { id: 6, companyName: "MegaCorp Solutions", position: "JavaScript Developer", location: "New York, NY", type: "Full-time", salary: "$120k - $150k", description: "Build scalable applications with TypeScript and Node.js in a fast-paced environment.", status: "none" },
    { id: 7, companyName: "StartupXYZ", position: "Full Stack Engineer", location: "Remote", type: "Full-time", salary: "$100k - $130k", description: "Join our early-stage startup and help us build the future of collaborative software.", status: "none" },
    { id: 8, companyName: "TechGear Industries", position: "Senior Frontend Engineer", location: "San Francisco, CA", type: "Full-time", salary: "$150k - $180k", description: "Lead our frontend team in building robust and accessible web applications.", status: "none" }
];

let currentTab = 'all';


function init() {
    renderJobs();
    updateStats();
}

function renderJobs() {
    const container = document.getElementById('jobs-container');
    const filteredJobs = jobs.filter(job => {
        if (currentTab === 'all') return true;
        return job.status === currentTab;
    });

    document.getElementById('job-list-count').innerText = filteredJobs.length;

    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <i data-lucide="file-text" class="w-16 h-16 text-blue-400 mb-4"></i>
                <h4 class="text-xl font-bold text-slate-800">No jobs available</h4>
                <p class="text-slate-500">Check back later for new opportunities.</p>
            </div>
        `;
        lucide.createIcons(); 
        return;
    }

    container.innerHTML = filteredJobs.map(job => `
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start gap-4">
            <div class="flex-1">
                <div class="flex justify-between">
                    <h4 class="font-bold text-lg text-slate-800">${job.companyName}</h4>
                    <button onclick="deleteJob(${job.id})" class="text-slate-400 hover:text-red-500 cursor-pointer">
                        <i data-lucide="trash-2" class="w-5 h-5"></i>
                    </button>
                </div>
                <p class="text-blue-600 font-medium mb-2">${job.position}</p>
                <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mb-3">
                    <span>${job.location}</span>
                    <span> ${job.type}</span>
                    <span> ${job.salary}</span>
                </div>
                <p class="text-slate-600 text-sm leading-relaxed mb-4">${job.description}</p>
                <div class="flex gap-3">
                    <button onclick="updateStatus(${job.id}, 'interview')" 
                        class="px-4 py-1.5 rounded text-sm font-semibold transition-all cursor-pointer border 
                        ${job.status === 'interview' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'text-emerald-600 border-emerald-600 hover:bg-emerald-50'}">
                        Interview
                    </button>
                    <button onclick="updateStatus(${job.id}, 'rejected')" 
                        class="px-4 py-1.5 rounded text-sm font-semibold transition-all cursor-pointer border 
                        ${job.status === 'rejected' ? 'bg-red-100 text-red-700 border-red-200' : 'text-red-500 border-red-500 hover:bg-red-50'}">
                        Rejected
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function updateStatus(id, newStatus) {
    jobs = jobs.map(job => {
        if (job.id === id) {
            
            return { ...job, status: newStatus };
        }
        return job;
    });
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

    ['all', 'interview', 'rejected'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (t === tab) {
            btn.classList.add('bg-blue-600', 'text-white');
            btn.classList.remove('bg-white', 'text-slate-600');
        } else {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-white', 'text-slate-600');
        }
    });
    renderJobs();
}

function updateStats() {
    const total = jobs.length;
    const interview = jobs.filter(j => j.status === 'interview').length;
    const rejected = jobs.filter(j => j.status === 'rejected').length;

    document.getElementById('total-count').innerText = total;
    document.getElementById('interview-count').innerText = interview;
    document.getElementById('rejected-count').innerText = rejected;
}


init();