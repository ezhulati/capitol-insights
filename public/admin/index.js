// Simple GitHub Direct Access
// This script provides a direct interface to manage content on GitHub

document.addEventListener('DOMContentLoaded', function() {
  // Set up basic editor
  const editor = document.getElementById('content-editor');
  const fileSelector = document.getElementById('file-selector');
  const saveButton = document.getElementById('save-button');
  const loginSection = document.getElementById('login-section');
  const editorSection = document.getElementById('editor-section');
  const statusMessage = document.getElementById('status-message');
  const tokenInput = document.getElementById('github-token');
  const loginButton = document.getElementById('login-button');
  
  let githubToken = null;
  let currentRepo = 'ezhulati/capitol-insights';
  let currentBranch = 'main';
  let currentPath = '';
  let currentSha = '';
  
  // Simple file list based on what you likely care about most
  const fileList = [
    'content/home/index.mdx',
    'content/services/index.mdx',
    'content/team/index.mdx',
    'content/approach/index.mdx',
    'content/results/index.mdx',
    'content/contact/index.mdx',
    'content/posts/coalition-building-case-study.mdx',
    'content/posts/healthcare-regulatory-changes-impact.mdx',
    'content/posts/municipal-advocacy-strategies.mdx',
    'content/posts/telecommunications-regulatory-outlook.mdx',
    'content/posts/texas-legislative-session-2025-preview.mdx',
    'content/posts/transportation-funding-outlook.mdx'
  ];
  
  // Log in with GitHub token
  loginButton.addEventListener('click', function() {
    githubToken = tokenInput.value.trim();
    if (!githubToken) {
      showStatus('Please enter a GitHub token', 'error');
      return;
    }
    
    // Verify token
    fetch(`https://api.github.com/repos/${currentRepo}`, {
      headers: {
        'Authorization': `token ${githubToken}`
      }
    })
    .then(response => {
      if (response.ok) {
        loginSection.style.display = 'none';
        editorSection.style.display = 'block';
        populateFileSelector();
        showStatus('Logged in successfully!', 'success');
      } else {
        showStatus('Invalid token or repository not found', 'error');
      }
    })
    .catch(error => {
      showStatus('Error connecting to GitHub: ' + error.message, 'error');
    });
  });
  
  // Populate file selector
  function populateFileSelector() {
    fileSelector.innerHTML = '';
    fileList.forEach(file => {
      const option = document.createElement('option');
      option.value = file;
      option.textContent = file;
      fileSelector.appendChild(option);
    });
    
    // Load the first file by default
    loadFile(fileList[0]);
  }
  
  // Load file when selected
  fileSelector.addEventListener('change', function() {
    loadFile(this.value);
  });
  
  // Load file content from GitHub
  function loadFile(path) {
    currentPath = path;
    showStatus('Loading file...', 'info');
    
    fetch(`https://api.github.com/repos/${currentRepo}/contents/${path}?ref=${currentBranch}`, {
      headers: {
        'Authorization': `token ${githubToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      currentSha = data.sha;
      // GitHub returns base64 encoded content
      const content = atob(data.content);
      editor.value = content;
      showStatus('File loaded successfully', 'success');
    })
    .catch(error => {
      showStatus('Error loading file: ' + error.message, 'error');
    });
  }
  
  // Save file to GitHub
  saveButton.addEventListener('click', function() {
    if (!currentPath || !githubToken) {
      showStatus('Please select a file and ensure you are logged in', 'error');
      return;
    }
    
    showStatus('Saving file...', 'info');
    
    const content = editor.value;
    const encodedContent = btoa(content);
    
    fetch(`https://api.github.com/repos/${currentRepo}/contents/${currentPath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Update ${currentPath} via Simple Admin`,
        content: encodedContent,
        sha: currentSha,
        branch: currentBranch
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.content) {
        currentSha = data.content.sha;
        showStatus('File saved successfully!', 'success');
      } else {
        showStatus('Error saving file: ' + (data.message || 'Unknown error'), 'error');
      }
    })
    .catch(error => {
      showStatus('Error saving file: ' + error.message, 'error');
    });
  });
  
  // Show status messages
  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = 'status ' + type;
    
    // Clear success/info messages after a delay
    if (type === 'success' || type === 'info') {
      setTimeout(() => {
        statusMessage.textContent = '';
        statusMessage.className = 'status';
      }, 3000);
    }
  }
});
