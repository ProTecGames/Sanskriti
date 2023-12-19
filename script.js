// script.js

// Dictionary to store variables
const variables = {};

function runCode() {
  const code = document.getElementById('code').value;
  const outputDiv = document.getElementById('output');
  
  try {
    const lines = code.split('\n');
    let output = '';

    lines.forEach(line => {
      // Ignore lines starting with #
      if (line.trim().startsWith('#')) {
        return;
      }

      // Variable declaration syntax
      if (line.trim().includes('=')) {
        const [variable, value] = line.split('=').map(part => part.trim());
        variables[variable] = evaluateValue(value);
      }

      if (line.trim().startsWith('mudranam(')) {
        const data = line.match(/mudranam\((.*)\)/)[1];
        output += mudranam(evaluateValue(data));
      }
      // Add more logic for other Sanskrit commands as needed
    });

    // Display the final output
    outputDiv.innerHTML = output;

    // Switch to the "Output" tab after running the code
    switchTab('output-tab', 'Output');

  } catch (error) {
    outputDiv.innerHTML = `<p style="color: red;">Syntax Error: ${error.message}</p>`;
  }
}

function mudranam(data) {
  return data;
}

function evaluateValue(value) {
  // Evaluate the value if it's a variable or an expression
  if (variables.hasOwnProperty(value)) {
    return variables[value];
  } else if (value.startsWith('"') && value.endsWith('"')) {
    return value.substring(1, value.length - 1); // Print data as a string
  } else {
    return eval(value); // Try printing data from variable
  }
}

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
