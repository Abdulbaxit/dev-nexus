document.addEventListener('DOMContentLoaded', () => {
    const achievements = document.querySelectorAll('.achievement-item');
    
    // Add hover effects and tooltips
    achievements.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.id;
            const info = getAchievementInfo(id);
            alert(`${info.name}\n\nTo unlock: ${info.desc}\n\nStatus: ${item.classList.contains('locked') ? 'Locked' : 'Unlocked'}`);
        });
    });

    // Mock data for activity feed
    const activityFeed = document.getElementById('activity-feed');
    const mockActivity = [
        { repo: 'github-achievements', event: 'Push Shark tier 1 unlocked', time: '2h ago' },
        { repo: 'awesome-portfolio', event: 'Quickdraw badge earned', time: '5h ago' },
        { repo: 'react-dashboard', event: 'Merged PR #24 (YOLO)', time: 'Yesterday' }
    ];

    setTimeout(() => {
        activityFeed.innerHTML = mockActivity.map(act => `
            <div class="activity-item" style="padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid var(--border)">
                <div style="font-size: 14px; font-weight: 600">${act.repo}</div>
                <div style="font-size: 12px; color: var(--text-secondary)">${act.event} • ${act.time}</div>
            </div>
        `).join('');
    }, 1500);

    // Initial greeting based on time
    const greeting = document.getElementById('greeting');
    const hour = new Date().getHours();
    if (hour < 12) greeting.innerText = "Good Morning, Hunter!";
    else if (hour < 18) greeting.innerText = "Focus Mode On!";
    else greeting.innerText = "Evening Grind!";
});

function getAchievementInfo(id) {
    switch(id) {
        case 'pull-shark': return { name: 'Pull Shark', desc: 'Have 2 or more pull requests merged in public repositories.' };
        case 'quickdraw': return { name: 'Quickdraw', desc: 'Close an issue or a pull request within 5 minutes of opening it.' };
        case 'yolo': return { name: 'YOLO', desc: 'Merge a pull request without any code review.' };
        case 'pair-extraordinaire': return { name: 'Pair Extraordinaire', desc: 'Co-author a commit in a pull request that gets merged.' };
        default: return { name: 'Unknown', desc: 'Keep contributing to find out!' };
    }
}
