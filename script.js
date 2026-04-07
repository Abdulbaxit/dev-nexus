document.addEventListener('DOMContentLoaded', () => {
    // 1. Greet User
    const greeting = document.getElementById('greeting');
    const hour = new Date().getHours();
    if (hour < 12) greeting.innerText = "Good morning, Dev.";
    else if (hour < 18) greeting.innerText = "Productive afternoon, Dev.";
    else greeting.innerText = "Good evening, Dev.";

    // 2. Mock News Feed
    const newsFeed = document.getElementById('news-feed');
    const mockNews = [
        "GitHub Universe 2026: Key Takeaways",
        "10 Ways to Optimize Your Node.js Pipeline",
        "CSS Container Queries are Now Baseline",
        "Understanding WebGPU Performance Metrics"
    ];

    setTimeout(() => {
        newsFeed.innerHTML = mockNews.map(news => `
            <div class="news-item" style="padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid var(--border)">
                <div style="font-size: 14px; color: var(--text-primary); cursor: pointer">${news}</div>
                <div style="font-size: 11px; color: var(--text-secondary)">Read more • 5 min read</div>
            </div>
        `).join('');
    }, 1200);

    // 3. Simple Task Tracker logic
    const taskInput = document.getElementById('new-task');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');

    let tasks = [
        "Configure CI/CD Pipeline",
        "Update API Documentation",
        "Review Pull Request #48"
    ];

    function renderTasks() {
        taskList.innerHTML = tasks.map((task, index) => `
            <li class="task-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05)">
                <span style="font-size: 14px; color: var(--text-secondary)">${task}</span>
                <span class="remove-task" data-index="${index}" style="cursor: pointer; color: var(--accent); font-size: 12px;">✕</span>
            </li>
        `).join('');
        taskCount.innerText = tasks.length;
    }

    addBtn.addEventListener('click', () => {
        if (taskInput.value.trim()) {
            tasks.push(taskInput.value.trim());
            taskInput.value = '';
            renderTasks();
        }
    });

    renderTasks();

    // 4. Mock Contribution Graph
    const graph = document.getElementById('contribution-graph');
    if (graph) {
        let graphHtml = '';
        for (let i = 0; i < 7; i++) {
            const height = Math.floor(Math.random() * 80) + 20;
            graphHtml += `<div style="flex: 1; min-width: 10px; background: linear-gradient(to top, var(--primary), var(--secondary)); height: ${height}%; border-radius: 4px; opacity: ${0.5 + (i * 0.08)};"></div>`;
        }
        graph.innerHTML = `<div style="display: flex; align-items: flex-end; gap: 8px; height: 100px; width: 100%">${graphHtml}</div>`;
    }
});
