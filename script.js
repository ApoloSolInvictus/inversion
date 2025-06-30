document.addEventListener('DOMContentLoaded', () => {
    // Tabs functionality
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = document.getElementById(tab.dataset.target);
            panels.forEach(panel => {
                panel.classList.add('hidden');
            });
            
            target.classList.remove('hidden');
        });
    });

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // ROI Chart.js
    const roiCtx = document.getElementById('roiChart');
    if(roiCtx) {
        new Chart(roiCtx, {
            type: 'doughnut',
            data: {
                labels: ['Ahorro Directo (Energía, Mantenimiento)', 'Ahorro Social (Menor costo carcelario)', 'Retorno de Marca y ESG'],
                datasets: [{
                    data: [40, 35, 25],
                    backgroundColor: ['#00A99D', '#3b82f6', '#818cf8'],
                    borderColor: '#f8fafc',
                    borderWidth: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#475569', font: { size: 14 } } },
                    tooltip: { callbacks: { label: (c) => `${c.label}: ${c.raw}%` } }
                },
                cutout: '60%'
            }
        });
    }

    // Audio Player
    const audioPlayer = document.getElementById('audio-player');
    const audioButton = document.getElementById('audio-toggle-button');
    const audioIcon = document.getElementById('audio-icon');

    if (audioPlayer && audioButton && audioIcon) {
        const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
        const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
        audioIcon.innerHTML = playIcon;

        audioButton.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                audioIcon.innerHTML = pauseIcon;
            } else {
                audioPlayer.pause();
                audioIcon.innerHTML = playIcon;
            }
        });
        audioPlayer.addEventListener('ended', () => { audioIcon.innerHTML = playIcon; });
    }
});
