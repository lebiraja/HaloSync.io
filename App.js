import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Welcome to HaloSync</h1>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
      <p>You've clicked {count} times!</p>
    </div>
  );
}

export default App;
