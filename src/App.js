import React, { Component } from 'react';
import './App.css';
import {getTransformedSkills} from './skillStuff.js';

class App extends Component {
  constructor () {
    super();
    this.state = {
      foundSkills: {},
      resume: 'This is the resume'
    };
  }
  async componentDidMount () {
    this.setState({
      skills: await getTransformedSkills()
    });
  }
  processResume = ({target: {value: resume}}) => {
    var foundSkills = {};

  	this.state.skills.forEach(skill => {
  	  if (skill.regex.test(resume)){
  	    if (!foundSkills[skill.type]) foundSkills[skill.type] = [];
  		  foundSkills[skill.type].push(skill);
  	  }
  	});

    this.setState({foundSkills, resume});
  }
  render() {
    const {foundSkills, resume} = this.state;
    return (
      <>
        <h1>Skill Grid Creator</h1>

        <textarea
          className="resume"
          onChange={this.processResume}
          value={resume}
        ></textarea>

        {
          Object.keys(foundSkills).map(typeName => (
            <div key={typeName}>
              <div className="typeName">{ typeName }</div>
              {
                foundSkills[typeName].map((skill, i, arr) =>
                  <span key={skill.name} className="skillList">
                    { skill.name + (i === arr.length - 1 ? ' ' : ', ') }
                  </span>
                )
              }
              <br/>
              <br/>
            </div>
          ))
        }

      </>
    );
  }
}

export default App;
