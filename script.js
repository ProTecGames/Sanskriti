// script.js

// Dictionary to store variables
const variables = {};

// New function to find the length of a string, list, or tuple
function ayamah(data) {
  if (typeof data === 'string' || Array.isArray(data) || data instanceof Set || data instanceof Map) {
    return data.length;
  } else {
    throw new Error('Invalid argument type for ayamah()');
  }
}

// New function to add as many numbers as entered
function kulam() {
  const numbers = Array.from(arguments);
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// New function to subtract as many numbers as entered
function ghatah() {
  const numbers = Array.from(arguments);
  return numbers.reduce((acc, curr) => acc - curr);
}

// New function to multiply as many numbers as entered
function gunanam() {
  const numbers = Array.from(arguments);
  return numbers.reduce((acc, curr) => acc * curr, 1);
}

// New function to divide as many numbers as entered
function bhajah() {
  const numbers = Array.from(arguments);
  return numbers.reduce((acc, curr) => acc / curr);
}

function runCode() {
  const code = document.getElementById('code').innerText;
  const outputDiv = document.getElementById('output');
  
  try {
    const lines = code.split('\n');
    let output = '';

    lines.forEach(line => {
      // Ignore lines starting with #
      if (line.trim().startsWith('#')) {
        return;
      }

      // Variable declaration syntax with input
      if (line.trim().includes('=')) {
        const [variable, value] = line.split('=').map(part => part.trim());
        variables[variable] = evaluateValue(value);
      }

      // If-else statement syntax
      if (line.trim().startsWith('yadi')) {
        const condition = line.match(/yadi (.+):/)[1];
        const blockStartIndex = lines.indexOf(line) + 1;
        const blockEndIndex = findBlockEndIndex(lines, blockStartIndex);
        
        if (evaluateCondition(condition)) {
          const ifBlock = lines.slice(blockStartIndex, blockEndIndex);
          ifBlock.forEach(ifLine => {
            if (ifLine.trim().startsWith('mudranam(')) {
              const data = ifLine.match(/mudranam\((.*)\)/)[1];
              output += mudranam(evaluateValue(data));
            }
            // Add more logic for other Sanskrit commands inside if block
          });
        } else {
          const elseBlock = lines.slice(blockEndIndex + 1);
          elseBlock.forEach(elseLine => {
            if (elseLine.trim().startsWith('mudranam(')) {
              const data = elseLine.match(/mudranam\((.*)\)/)[1];
              output += mudranam(evaluateValue(data));
            }
            // Add more logic for other Sanskrit commands inside else block
          });
        }
      }

      // mudranam() function syntax
      if (line.trim().startsWith('mudranam(')) {
        const data = line.match(/mudranam\((.*)\)/)[1];
        output += mudranam(evaluateValue(data));
      }

      // New function calls
      if (line.trim().startsWith('ayamah(') || line.trim().startsWith('kulam(') ||
          line.trim().startsWith('ghatah(') || line.trim().startsWith('gunanam(') ||
          line.trim().startsWith('bhajah(')) {
        const data = line.match(/\((.*)\)/)[1];
        output += mudranam(evaluateValue(`${line.trim().split('(')[0]}(${data})`));
      }
      // Add more logic for other Sanskrit commands as needed
    });

    // Display the final output
    outputDiv.innerHTML = output;

    // Switch to the "Output" tab after running the code
    switchTab('output-tab', 'Output');

  } catch (error) {
    outputDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}

function mudranam(data) {
  return data;
}

function evaluateValue(value) {
  // Evaluate the value if it's a variable or an expression
  if (variables.hasOwnProperty(value)) {
    return variables[value];
  } else if (value.startsWith('{') && value.endsWith('}')) {
    // Parse and return dictionary
    return JSON.parse(value.replace(/'/g, '"'));
  } else if (value.startsWith('[') && value.endsWith(']')) {
    // Parse and return list
    return JSON.parse(value.replace(/'/g, '"'));
  } else if (value.startsWith('(') && value.endsWith(')')) {
    // Parse and return tuple
    return value.replace(/[()]/g, '').split(',').map(item => item.trim());
  } else if (value.startsWith('"') && value.endsWith('"')) {
    return value.substring(1, value.length - 1); // Print data as a string
  } else if (value.startsWith('abhivinmuln("') && value.endsWith('")')) {
    // Input string
    return prompt(value.substring(14, value.length - 2));
  } else if (value.startsWith('purnanka(abhivinmuln("') && value.endsWith('"))')) {
    // Input integer
    const input = prompt(value.substring(21, value.length - 3));
    return parseInt(input);
  } else {
    return eval(value); // Try printing data from variable
  }
}

function evaluateCondition(condition) {
  return eval(condition);
}

function findBlockEndIndex(lines, startIndex) {
  let stack = 0;

  for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].includes(':')) {
      stack++;
    }
    if (lines[i].includes('anyatra')) {
      stack--;
      if (stack === 0) {
        return i;
      }
    }
  }

  throw new Error('Unterminated block');
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

// Initial code to handle input and line numbers
document.getElementById('code').addEventListener('input', handleInput);
handleInput();
