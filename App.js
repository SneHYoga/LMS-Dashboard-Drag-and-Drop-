document.addEventListener("DOMContentLoaded", () => {
    const dataPoints = [
        { label: "Course 1", y: 90 },
        { label: "Course 2", y: 85 },
        { label: "Course 3", y: 75 },
        { label: "Course 4", y: 95 },
        { label: "Course 5", y: 80 }
    ];

    function renderChart(containerId, data) {
        const chart = new CanvasJS.Chart(containerId, {
            theme: "light2",
            animationEnabled: true,
            title: {
                text: "Chart Title"
            },
            data: [{
                type: "column",
                dataPoints: data
            }]
        });
        chart.render();
    }

    renderChart("chartContainer1", dataPoints);

    // Bar chart 
    const ctxBar = document.getElementById('barGraphContainer').getContext('2d');
    const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Dotted graph
    const ctxDotted = document.getElementById('dottedGraphContainer').getContext('2d');
    const dottedChart = new Chart(ctxDotted, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                data: [
                    { x: -10, y: 0 },
                    { x: 0, y: 10 },
                    { x: 10, y: 5 },
                    { x: 0.5, y: 5.5 }
                ],
                backgroundColor: 'rgba(255, 99, 132, 1)'
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });

    const widgetsContainer = document.getElementById('widgetsContainer');
    let dragged;

    document.addEventListener('dragstart', (event) => {
        dragged = event.target;
        event.target.classList.add('dragging');
    });

    document.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging');
    });

    widgetsContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
        const afterElement = getDragAfterElement(widgetsContainer, event.clientY);
        if (afterElement == null) {
            widgetsContainer.appendChild(dragged);
        } else {
            widgetsContainer.insertBefore(dragged, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.widget:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
