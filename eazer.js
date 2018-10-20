/**
 * Eazerjs - The next generation templating engine
 * @module eazerjs
 */

/**
 * @class Component - The Page class
 * @param {string} name - The component name
 * @param {Object} content - The component content
 * @param {Object[]} aliases - The types aliases
 */
class Component {

  constructor(name, content, aliases, style) {

    this.name = name

    this.content = content

    this.aliases = aliases

    this.style = style

    this.body = `<div class='${this.name}' ${this.style ? `style="${this.style}"` : ""}>`

  }

  /**
   * Render the page
   * @return {string} Page
   */
  render() {

    for (let property in this.content) {

      const alias = this.aliases[property]

      this.type(alias, property)

      this.body += `</div>`

      this.body = this.body.replace(/:n/g, '<br>')

      this.body = this.body.replace('undefined', '')

      return this.body

    }
  }

  /**
   * Check the type of property and generate html
   * @param {Object} alias - The alias name
   * @param {string} property - The property name
   */
  type(alias, property) {

    switch (alias) {

      case 'link':

        this.body += `<a href="${this.content[property].href}" ${alias.class ? `class="${alias.class}"` : ""} ${alias.id ? `id="${alias.id}"` : ""} style="${alias.style}">${this.content[property].content}</a>`

        break

      case 'img':

        this.body += `<img src="${this.content[property]}" ${alias.class ? `class="${alias.class}"` : ""} ${alias.id ? `id="${alias.id}"` : ""} style="${alias.style}"/>`

        break

      default:

        this.body += `<${alias.type} ${alias.class ? `class="${alias.class}"` : ""} ${alias.id ? `id="${alias.id}"` : ""} style="${alias.style}">${this.content[property]}</${alias.type}>`

        break
    }

  }
}

/**
 * @class Group - The group class
 * @param {string} name - Name
 * @param {string} classname - Class name
 * @param {string} id - Id
 * @param {string} style - Style
 */
class Group {

  constructor(name, classname, id, style) {

    this.name = name

    this.classname = classname

    this.id = id

    this.style = style

  }

  /**
   * Create a div
   * @param {Component[]} components 
   */
  include(components) {

    this.components = components

  }

  /**
   * Render the Group
   * @return {string} Div
   */
  render() {

    let content

    for (let component of this.components) {

      content += component.render()

    }

    content = content.replace('undefined', '')

    return `<div class="${this.classname ? this.classname : ''}" id="${this.id ? this.id : ''}" style="${this.style ? this.style : ''}">${content}</div>`

  }

}

/**
 * @class Page - The page class
 * @param {string} title - The Page title
 * @param {string} description - The Page decription (meta)
 * @param {string} charset - The page charset (meta)
 * @param {string[]} styles - Stylesheets (link)
 * @param {string[]} javascripts - Scripts (scripts)
 */
class Page {

  constructor(title, description, charset, styles, javascripts) {

    if (!title || !description || !charset) throw 'You have to use a title, a description and a charset'

    else {

      this.title = title

      this.description = description

      this.charset = charset

      this.styles = styles ? styles : []

      this.javascripts = javascripts ? javascripts : []

    }

  }
  
  /**
   * Give the groups to the page body
   * @param {Group[]} groups 
   */
  require(groups) {

    this.groups = groups

  }

  /**
   * Render the page
   * @return {string} HTML Page
   */
  render () {

    let body = `<!DOCTYPE html><html><head><title>${this.title}</title><meta type="description" content="${this.description}" />`

    for (let style of this.styles) {

      body += `<link rel="stylesheet" href="${style}"/>`

    }

    for (let script of this.javascripts) {

      body += `<script src="${script}">`

    }

    body += `</head><body>`

    for (let group of this.groups) {

      body += `${group.render()}`

    }

    body += `</body></html>`

    return body

  }

}

module.exports = {
  Component,
  Group,
  Page
}
