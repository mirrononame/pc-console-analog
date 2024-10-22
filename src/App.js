import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCommand, clearConsole, setColor } from './redux/actions';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(null); // Track command history position
  const history = useSelector((state) => state.history);
  const currentColor = useSelector((state) => state.color); // Track current color from Redux
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const handleCommand = (event) => {
    if (event.key === 'Enter') {
      if (input.trim()) {
        let output = '';

        // Split the input into command and arguments
        const [command, ...args] = input.trim().split(' ');

        switch (command.toLowerCase()) {
          case 'help':
            output = 'Available commands: clear, help, echo, color';
            break;
          case 'clear':
            dispatch(clearConsole());
            setInput('');
            return;
          case 'echo':
            output = args.join(' '); // Echo back the arguments
            break;
          case 'color':
            const colorCode = args[0];
            if (colorCode && colorCode !== 'black' && colorCode !== '#000000') {
              dispatch(setColor(colorCode));
              output = `Text color changed to ${colorCode}`;
            } else if(colorCode === undefined){
              dispatch(setColor('#ffffff'));
              output = `Text color changed to default`;
            } 
            else {
              console.log(colorCode)
              output = 'Usage: color <color-code>';
            }
            break;
          default:
            output = `Unknown command: ${command}`;
        }

        // Dispatch the command to Redux
        dispatch(addCommand(input, output));
        setInput(''); // Clear input after command execution
        setHistoryIndex(null); // Reset history index after command execution
      }
    } else if (event.key === 'ArrowUp') {
      // Navigate through command history
      if (history.length > 0 && (historyIndex === null || historyIndex > 0)) {
        const newIndex = historyIndex === null ? history.length - 1 : historyIndex - 1;
        setInput(history[newIndex].input);
        setHistoryIndex(newIndex);
      }
    } else if (event.key === 'ArrowDown') {
      // Navigate forward in command history
      if (historyIndex !== null && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setInput(history[newIndex].input);
        setHistoryIndex(newIndex);
      } else if (historyIndex !== null && historyIndex === history.length - 1) {
        setInput('');
        setHistoryIndex(null);
      }
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-scroll to the bottom on new output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="console-container" onClick={focusInput}>
      <div className="console-output" ref={outputRef}>
        {history.map((item, index) => (
          <p key={index} style={{ color: currentColor }}>
            <strong>{`C:\\Users\\User>`} {item.input}</strong>
            <br />
            {item.output}
          </p>
        ))}
        {/* Active command line */}
        <div className="command-line">
          <span className="prompt" style={{color: currentColor}}>C:\Users\User{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="console-input"
            style={{color: currentColor}}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

export default App;
