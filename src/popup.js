// Test backend connection
function testConnection() {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Testing connection...';
    statusDiv.className = 'status';

    fetch(`${window.BASE_BACKEND}/health`)
        .then(response => response.json())
        .then(data => {
            statusDiv.textContent = 'Backend connected ✓';
            statusDiv.className = 'status connected';
        })
        .catch(error => {
            statusDiv.textContent = 'Backend disconnected ✗';
            statusDiv.className = 'status disconnected';
        });
}

// Test connection on popup open
document.addEventListener('DOMContentLoaded', testConnection);
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("backend-footer");
    if (footer) {
        footer.textContent = `Backend: ${window.BASE_BACKEND}`;
    }
});


// Test connection button
document.getElementById('testConnection').addEventListener('click', testConnection);