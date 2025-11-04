let currentSegments = [];
const videoPlayer = document.getElementById('videoPlayer');
const segmentsList = document.getElementById('segmentsList');
const movieButtons = document.querySelectorAll('.movie-btn');

// Load segments data
async function loadSegments() {
    try {
        const response = await fetch('dce72890-aa19-49fa-9289-49ca5cd511e4_segments.json');
        const data = await response.json();
        currentSegments = data.segments;
        renderSegments();
    } catch (error) {
        console.error('Error loading segments:', error);
    }
}

// Format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Render segments list
function renderSegments() {
    segmentsList.innerHTML = '';
    
    currentSegments.forEach((segment, index) => {
        const segmentItem = document.createElement('div');
        segmentItem.className = 'segment-item';
        segmentItem.onclick = () => jumpToSegment(segment);
        
        segmentItem.innerHTML = `
            <div class="segment-header">
                <div class="segment-title">Scene ${segment.segment_id + 1}</div>
                <div class="segment-time">${formatTime(segment.start_time)} - ${formatTime(segment.end_time)}</div>
            </div>
            <div class="segment-reasoning">${segment.reasoning}</div>
        `;
        
        segmentsList.appendChild(segmentItem);
    });
}

// Jump to segment (5 seconds before end)
function jumpToSegment(segment) {
    const jumpTime = Math.max(0, segment.end_time - 5);
    videoPlayer.currentTime = jumpTime;
    videoPlayer.play();
}

// Handle movie selection
movieButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        movieButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // For now, all movies use the same demo file
        videoPlayer.src = 'https://github.com/nimrodberman/seg-vlm/releases/download/demo1/demo-movie.mp4';
        loadSegments();
    });
});

// Initialize
loadSegments();
