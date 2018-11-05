/***
 * @author Shiming Chen <chen@lemontv.me>
 */

import React from 'react';
import { Stories } from 'containers';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Hacker news top 10 stories</h1>
        <Stories />
      </div>
    );
  }
}
