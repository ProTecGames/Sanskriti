const variables = {};

function ayamah(data) {
  if (typeof data === 'string' || Array.isArray(data) || data instanceof Set || data instanceof Map) {
    return data.length;
  } else {
    throw new Error('Invalid argument type for ayamah()');
  }
}

function kulam() {
  const numbers = Array.from(arguments);
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function ghatah() {
  const numbers = Array.from(arguments);
  return numbers.reduce((acc, curr) => acc - curr);
}

function gunanam() {
  const numbers = Array.from(arguments);
  return numbers.reduce((acc, curr) => acc * curr, 1);
}

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
      if (line.trim().startsWith('#')) {
        return;
      }

      if (line.trim().includes('=')) {
        const [variable, value] = line.split('=').map(part => part.trim());
        variables[variable] = evaluateValue(value);
      }

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
          });
        } else {
          const elseBlock = lines.slice(blockEndIndex + 1);
          elseBlock.forEach(elseLine => {
            if (elseLine.trim().startsWith('mudranam(')) {
              const data = elseLine.match(/mudranam\((.*)\)/)[1];
              output += mudranam(evaluateValue(data));
            }
          });
        }
      }

      if (line.trim().startsWith('mudranam(')) {
        const data = line.match(/mudranam\((.*)\)/)[1];
        output += mudranam(evaluateValue(data));
      }

      if (line.trim().startsWith('ayamah(') || line.trim().startsWith('kulam(') ||
          line.trim().startsWith('ghatah(') || line.trim().startsWith('gunanam(') ||
          line.trim().startsWith('bhajah(')) {
        const data = line.match(/\((.*)\)/)[1];
        output += mudranam(evaluateValue(`${line.trim().split('(')[0]}(${data})`));
      }
    });

    outputDiv.innerHTML = output;
    switchTab('output-tab', 'Output');

  } catch (error) {
    outputDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}

function mudranam(data) {
  console.log(data); // Modify this line to display the output
}

function evaluateValue(value) {
  if (variables.hasOwnProperty(value)) {
    return variables[value];
  } else if (value.startsWith('{') && value.endsWith('}')) {
    return JSON.parse(value.replace(/'/g, '"'));
  } else if (value.startsWith('[') && value.endsWith(']')) {
    return JSON.parse(value.replace(/'/g, '"'));
  } else if (value.startsWith('(') && value.endsWith(')')) {
    return value.replace(/[()]/g, '').split(',').map(item => item.trim());
  } else if (value.startsWith('"') && value.endsWith('"')) {
    return value.substring(1, value.length - 1);
  } else if (value.startsWith('abhivinmuln("') && value.endsWith('")')) {
    return prompt(value.substring(14, value.length - 2));
  } else if (value.startsWith('purnanka(abhivinmuln("') && value.endsWith('"))')) {
    const input = prompt(value.substring(21, value.length - 3));
    return parseInt(input);
  } else {
    return eval(value);
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
  document.getElementById('editor-tab').classList.remove('active');
  document.getElementById('output-tab').classList.remove('active');

  document.getElementById(tabId).classList.add('active');

  document.getElementById('code').classList.toggle('hidden', section !== 'Editor');
  document.getElementById('output').classList.toggle('hidden', section !== 'Output');
}

document.getElementById('code').addEventListener('input', handleInput);
handleInput();
