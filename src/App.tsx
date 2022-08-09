import React from 'react';
import Example from './components/Example';
import ExampleComponent from './components/ExampleComponent';

function App() {
  return (
    <>
      <h1 style={{ color: 'green' }}>Example Hook</h1>
      <Example />
      <h1 style={{ color: 'orange' }}>Example Component</h1>
      <ExampleComponent />
    </>
  );
}

export default App;
