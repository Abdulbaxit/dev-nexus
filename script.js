document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.innerText = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeIcon.innerText = isLight ? '☀️' : '🌙';
    });

    // --- 2. Greet User & GitHub Sync ---
    const greeting = document.getElementById('greeting');
    const userAvatar = document.getElementById('user-avatar');
    const syncBtn = document.querySelector('.secondary-btn');
    
    const updateGreeting = (name = "Developer") => {
        const hour = new Date().getHours();
        let timeMsg = "Good evening";
        if (hour < 12) timeMsg = "Good morning";
        else if (hour < 18) timeMsg = "Productive afternoon";
        greeting.innerText = `${timeMsg}, ${name}.`;
    };

    // Load saved profile
    const savedProfile = JSON.parse(localStorage.getItem('gh-profile'));
    if (savedProfile) {
        updateGreeting(savedProfile.name || savedProfile.login);
        userAvatar.style.backgroundImage = `url(${savedProfile.avatar_url})`;
        userAvatar.style.backgroundSize = 'cover';
    } else {
        updateGreeting();
    }

    syncBtn.addEventListener('click', async () => {
        const username = prompt("Enter your GitHub username to sync profile:");
        if (!username) return;

        syncBtn.innerText = "Syncing...";
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) throw new Error("User not found");
            const data = await response.json();
            
            localStorage.setItem('gh-profile', JSON.stringify(data));
            updateGreeting(data.name || data.login);
            userAvatar.style.backgroundImage = `url(${data.avatar_url})`;
            userAvatar.style.backgroundSize = 'cover';
            syncBtn.innerText = "Synced ✓";
            setTimeout(() => syncBtn.innerText = "Sync GitHub", 2000);
        } catch (err) {
            alert(err.message);
            syncBtn.innerText = "Sync Failed";
            setTimeout(() => syncBtn.innerText = "Sync GitHub", 2000);
        }
    });

    // --- 3. News Feed (More realistic mocks with links) ---
    const newsFeed = document.getElementById('news-feed');
    const mockNews = [
        { title: "GitHub Universe 2026: Key Takeaways", tag: "GitHub" },
        { title: "10 Ways to Optimize Your Node.js Pipeline", tag: "Performance" },
        { title: "CSS Container Queries are Now Baseline", tag: "Design" },
        { title: "Understanding WebGPU Performance Metrics", tag: "Web" }
    ];

    setTimeout(() => {
        newsFeed.innerHTML = mockNews.map(news => `
            <div class="news-item" style="padding: 12px; margin-bottom: 8px; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); cursor: pointer; transition: 0.2s">
                <div style="font-size: 14px; color: var(--text-primary); margin-bottom: 4px">${news.title}</div>
                <div style="display: flex; gap: 8px; align-items: center">
                    <span style="font-size: 10px; background: var(--primary); padding: 2px 6px; border-radius: 4px; color: white; opacity: 0.8">${news.tag}</span>
                    <span style="font-size: 11px; color: var(--text-secondary)">5 min read</span>
                </div>
            </div>
        `).join('');
    }, 1200);

    // --- 4. Task Tracker Logic with Persistence ---
    const taskInput = document.getElementById('new-task');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');

    let tasks = JSON.parse(localStorage.getItem('dev-tasks')) || [
        "Configure CI/CD Pipeline",
        "Update API Documentation",
        "Review Pull Request #48"
    ];

    function renderTasks() {
        taskList.innerHTML = tasks.map((task, index) => `
            <li class="task-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; margin-bottom: 6px; border-radius: 10px; background: rgba(0,0,0,0.1)">
                <span style="font-size: 14px; color: var(--text-secondary)">${task}</span>
                <span class="remove-task" data-index="${index}" style="cursor: pointer; color: var(--accent); font-size: 12px; padding: 4px;">✕</span>
            </li>
        `).join('');
        taskCount.innerText = tasks.length;
        localStorage.setItem('dev-tasks', JSON.stringify(tasks));
    }

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-task')) {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            renderTasks();
        }
    });

    addBtn.addEventListener('click', () => {
        const val = taskInput.value.trim();
        if (val) {
            tasks.unshift(val);
            taskInput.value = '';
            renderTasks();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addBtn.click();
    });

    renderTasks();

    // --- 5. Dynamic Contribution Graph (More randomized/organic look) ---
    const graph = document.getElementById('contribution-graph');
    if (graph) {
        let graphHtml = '';
        for (let i = 0; i < 12; i++) {
            const height = Math.floor(Math.random() * 60) + 20;
            const delay = i * 0.1;
            graphHtml += `
                <div style="
                    flex: 1; 
                    min-width: 8px; 
                    background: linear-gradient(to top, var(--primary), var(--secondary)); 
                    height: ${height}%; 
                    border-radius: 4px; 
                    opacity: ${0.4 + (i * 0.05)};
                    animation: barGrow 1s ease-out forwards ${delay}s;
                    transform: scaleY(0);
                    transform-origin: bottom;
                "></div>`;
        }
        graph.innerHTML = `<div style="display: flex; align-items: flex-end; gap: 6px; height: 100px; width: 100%">${graphHtml}</div>`;
    }
});

