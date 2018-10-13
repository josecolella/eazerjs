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
     * @function render - Render the page
     */
    render() {

        for (let property in this.content) {

            console.log(this)

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

/*let Style = `
box-sizing: border-box;
font-family: Arial;
`

let Title = {
    type: "h1",
    class: "titre-class"
}

let SubTitle = {
    type: "h2",

}

let Paragraphe = {
    type: "p",
    id: "paragraphe"
}

let Image = {
    type: "img",
    style: "width: 100px; height: 100px"
}

let Link = {
    type: "link"
}
const aliases = {
    titre: Title,
    text: Paragraphe
}
const menucontent = {
    titre: 'Hello',
}
const maincontent = {
    text: 'World'
}
const menu = new Component('menu', menucontent, aliases)
const main = new Component('main', maincontent, aliases)
const page = `<div>${menu.render()}${main.render()}</div>`
console.log(page)*/