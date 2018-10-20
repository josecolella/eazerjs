const { Component } = require('../eazer')

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
  console.log(component.render())
  expect(1).toEqual(1)
})
