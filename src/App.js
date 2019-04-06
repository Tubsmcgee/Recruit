import React, {Component} from 'react';
import './App.css';
import {getTransformedSkills} from './skillStuff.js';
import {getCategories} from './mockData.js';

const CategorySelect = ({categories, value, onChange}) => (
  <select value={value} onChange={onChange}>
    {categories.map(({name}) => (
      <option key={name} value={name}>
        {name}
      </option>
    ))}
  </select>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      skills: [],
      resume: localStorage.resume || '',
      categories: [],
      category: ''
    };
  }
  async componentDidMount() {
    this.setState({
      skills: await getTransformedSkills(),
      categories: await getCategories()
    });
  }
  changeResume = ({target: {value: resume}}) => {
    localStorage.resume = resume;
    this.setState({resume});
  };
  changeCategory = ({target: {value: category}}) => {
    this.setState({category});
  };
  render() {
    const {resume, categories, category, skills} = this.state;
    const foundSkills = {};

    skills
      .filter(skill => skill.regex.test(resume))
      .forEach(skill => {
        if (!foundSkills[skill.type]) foundSkills[skill.type] = [];
        foundSkills[skill.type].push(skill);
      });

    return (
      <>
        <div style={{float: 'right'}}>
          <CategorySelect
            value={category}
            categories={categories}
            onChange={this.changeCategory}
          />
        </div>

        <h1>Skill Grid Creator</h1>

        <textarea
          className="resume"
          onChange={this.changeResume}
          value={resume}
        />

        {Object.keys(foundSkills).map(typeName => (
          <div key={typeName}>
            <div className="typeName">{typeName}</div>
            {foundSkills[typeName].map((skill, i, arr) => (
              <span key={skill.name} className="skillList">
                {skill.name + (i === arr.length - 1 ? ' ' : ', ')}
              </span>
            ))}
            <br />
            <br />
          </div>
        ))}
      </>
    );
  }
}

export default App;
