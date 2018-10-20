/**
 * @class Component - The Page class
 * @param {string} name - The component name
 * @param {Object} content - The component content
 * @param {Object[]} aliases - The types aliases
 */
class Component {

  constructor (name, content, aliases, style) {

    this.name = name

    this.content = content

    this.aliases = aliases

    this.style = style

    this.body = `<div class='${this.name}' ${this.style ? `style="${this.style}"` : ""}>`

  }

  /**
   * @function render - Render the page
   * @returns {string} - Page
   */
  render () {

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
   * @function type - Check the type of property and generate html
   * @param {Object} alias - The alias name
   * @param {string} property - The property name
   */
  type (alias, property) {

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
 */
class Group {

  constructor (name, classname, id, style) {

    this.name = name

    this.classname = classname

    this.id = id

    this.style = style

  }

  /**
   * @function include - Create a div
   * @param {Component[]} components 
   * @returns {string} - Div
   */
  include (components) {

    let content

    for (let component of components) {
      content += component.render()
    }

    content = content.replace('undefined', '')

    return `<div class="${this.classname ? this.classname : ''}" id="${this.id ? this.id : ''}" style="${this.style ? this.style : ''}">${content}</div>`

  }

}

module.exports = {Component, Group}
