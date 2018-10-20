const { Component } = require('../lib/eazer')

test('return a styled component', () => {
  const Title = {
    type: 'h1',
    style: 'color: blue'
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

  const component = new Component('MySuperComponent', content, aliases, `font-family: Arial`)
  expect(component.render()).toBe(`<div class='MySuperComponent' style="font-family: Arial"><h1   style="color: blue">Super component</h1></div>`)
})
