import {getMockSkills} from './mockData.js';

export const getTransformedSkills = async () => {
  const data = await getMockSkills();
  return data.map(skill => ({
    ...skill,
    regex: new RegExp('\\b' +
      skill.regex
        .replace(/ /g, '\\s*')
        .replace(/\./g, '\\s*\\.\\s*'),
    'i')
  }));
};
