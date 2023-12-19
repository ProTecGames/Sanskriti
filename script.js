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
  const code = document.getElementById('code').value;
  const outputDiv = document.getElementById('output');
  
  try {
    // Add Sanskrit code interpretation and execution logic here

    // Split lines and execute each line
    const lines = code.split('\n');
    lines.forEach(line => {
      if (line.trim().startsWith('mudranam(')) {
        const data = line.match(/mudranam\((.*)\)/)[1];
        print(eval(data)); // Using eval for simplicity (consider other approaches in a real implementation)
      }
      // Add more logic for other Sanskrit commands as needed
    });

  } catch (error) {
    // Display error if code has a syntax error
    outputDiv.innerHTML = `<p style="color: red;">Syntax Error: ${error.message}</p>`;
  }
}

function print(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML += '<p>' + data + '</p>';
}

  // For now, let's just display a message in the output area
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '<p>Code executed successfully!</p>';
}
