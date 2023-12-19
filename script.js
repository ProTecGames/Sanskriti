// script.js

function switchTab(tabId, section) {
  // Remove 'active' class from all tabs
  document.getElementById('editor-tab').classList.remove('active');
  document.getElementById('output-tab').classList.remove('active');

  // Add 'active' class to the clicked tab
  document.getElementById(tabId).classList.add('active');

  // Toggle visibility of the corresponding section
  document.getElementById('code').classList.toggle('hidden', section !== 'Editor');
  document.getElementById('output').classList.toggle('hidden', section !== 'Output');
}

function runCode() {
  // Your code execution logic goes here

  // For now, let's just display a message in the output area
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '<p>Code executed successfully!</p>';
}
