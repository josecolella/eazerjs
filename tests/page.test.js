const { Component, Group, Page } = require('../lib/eazer')

test('return a page', () => {

  const Types = {

    Paragraph: {
      type: 'p'
    }

  }

  const MyFirstComponent = {

    Alisases: {

      p: Types.Paragraph

    },

    Content: {

      p: 'Component 1'

    }
  }

  const MySecondComponent = {

    Alisases: {

      p: Types.Paragraph

    },

    Content: {

      p: 'Component 2'

    }
  }

  const component1 = new Component('component1', MyFirstComponent.Content, MyFirstComponent.Alisases)
  const component2 = new Component('component2', MySecondComponent.Content, MySecondComponent.Alisases)
  const container = new Group('container', 'container')
  container.include([component1, component2])

  const page = new Page('MySuperPage', 'A super page made with Eazer', 'utf-8')
  page.require([container])

  expect(page.render()).toBe(`<!DOCTYPE html><html><head><title>MySuperPage</title><meta type="description" content="A super page made with Eazer" /></head><body><div class="container" id="" style=""><div class='component1' ><p   style="">Component 1</p></div><div class='component2' ><p   style="">Component 2</p></div></div></body></html>`)

})
