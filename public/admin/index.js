// Simple GitHub Direct Access
// This script provides a direct interface to manage content on GitHub

document.addEventListener('DOMContentLoaded', function() {
  // Set up basic editor
  const editor = document.getElementById('content-editor');
  const fileSelector = document.getElementById('file-selector');
  const saveButton = document.getElementById('save-button');
  const loginSection = document.getElementById('login-section');
  const editorSection = document.getElementById('editor-section');
  const loginStatusMessage = document.getElementById('login-status-message');
  const editorStatusMessage = document.getElementById('status-message');
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
    console.log("Login button clicked");
    try {
      githubToken = tokenInput.value.trim();
      if (!githubToken) {
        showStatus('Please enter a GitHub token', 'error');
        console.log("No token entered");
        return;
      }
      
      console.log("Attempting to verify token with GitHub API...");
      showStatus('Verifying token...', 'info');
      
      // Verify token
      fetch(`https://api.github.com/repos/${currentRepo}`, {
        headers: {
          'Authorization': `Bearer ${githubToken}`
        }
      })
      .then(response => {
        console.log("GitHub API response received", response.status);
        if (response.ok) {
          loginSection.style.display = 'none';
          editorSection.style.display = 'block';
          populateFileSelector();
          showStatus('Logged in successfully!', 'success');
          console.log("Login successful");
        } else {
          console.error("GitHub API error:", response.status, response.statusText);
          response.text().then(text => {
            console.error("Error response:", text);
            showStatus(`GitHub API error (${response.status}): ${response.statusText}`, 'error');
          });
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        showStatus('Error connecting to GitHub: ' + error.message, 'error');
      });
    } catch (ex) {
      console.error("Exception in login process:", ex);
      showStatus('Exception: ' + ex.message, 'error');
    }
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
    console.log("Loading file:", path);
    
    fetch(`https://api.github.com/repos/${currentRepo}/contents/${path}?ref=${currentBranch}`, {
      headers: {
        'Authorization': `Bearer ${githubToken}`
      }
    })
    .then(response => {
      console.log("File load response:", response.status);
      if (!response.ok) {
        console.error("File load error:", response.status, response.statusText);
        throw new Error(`GitHub API error (${response.status}): ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("File data received:", data.name);
      currentSha = data.sha;
      // GitHub returns base64 encoded content
      const content = atob(data.content);
      editor.value = content;
      showStatus('File loaded successfully', 'success');
    })
    .catch(error => {
      console.error("File load error:", error);
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
    console.log("Saving file:", currentPath);
    
    const content = editor.value;
    const encodedContent = btoa(content);
    
    fetch(`https://api.github.com/repos/${currentRepo}/contents/${currentPath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
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
  
  // Show status messages - uses the right status element based on context
  function showStatus(message, type) {
    console.log("Status message:", message, type);
    
    // Determine which status element to use - login or editor
    const statusElement = loginSection.style.display === 'none' ? 
                           editorStatusMessage : loginStatusMessage;
    
    statusElement.textContent = message;
    statusElement.className = 'status ' + type;
    
    // Clear success/info messages after a delay
    if (type === 'success' || type === 'info') {
      setTimeout(() => {
        if (statusElement.textContent === message) {
          statusElement.textContent = '';
          statusElement.className = 'status';
        }
      }, 3000);
    }
  }
});
