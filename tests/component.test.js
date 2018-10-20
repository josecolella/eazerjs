const { Component } = require('../lib/eazer')

test('return a full component', () => {

  const Title = {
    type: 'h1'
  }

  const Paragraph = {
    type: 'p'
  }

  const aliases = {
    MyComponentTitle: Title,
    MyComponentParagraph: Paragraph
  }   

  const content = {
    MyComponentTitle: 'Super component',
    MyComponentParagraph: 'Super paragraph'
  }

  const component = new Component('MySuperComponent', content, aliases)
  expect(component.render()).toBe(`<div class='MySuperComponent' ><h1   style="">Super component</h1></div>`)
})
