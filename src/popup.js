// Test backend connection
function testConnection() {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Testing connection...';
    statusDiv.className = 'status';
    
    fetch('http://localhost:8000/health')
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

// Test connection button
document.getElementById('testConnection').addEventListener('click', testConnection);