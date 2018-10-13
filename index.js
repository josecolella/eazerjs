/**
 * @class Page - The Page class
 * @param {Object} content - The page content
 * @param {Object[]} aliases - The components aliases
 */
class Page {

    constructor(content, aliases, style = '') {

        this.content = content

        this.aliases = aliases

        this.style = style

    }

    /**
     * @function render - Render the page
     */
    render() {

        let body = `<div class='page' ${globalStyle ? `style="${globalStyle}"` : ""}>`

        for (property in this.content) {

            const alias = this.aliases[property]

            switch (alias.type) {

                case 'link':
                    
                    body += `<a href="${this.content[property].href}" ${alias.class ? `class="${alias.class}"` : ""} ${alias.id ? `id="${alias.id}"` : ""} style="${alias.style}">${this.content[property].content}</a>`;

                    break;
            
                default:

                    body += `<${alias.type} ${alias.class ? `class="${alias.class}"` : ""} ${alias.id ? `id="${alias.id}"` : ""} style="${alias.style}">${this.content[property]}</${alias.type}>`;
                    
                    break;
            }

        }
    }
}