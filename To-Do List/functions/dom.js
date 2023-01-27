/**
 * Create an HTML element dynamically
 * @param {string} tagName
 * @param {object} attributes
 * @returns {HTMLElement}
 */
export function createHTMLElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    for(const [attribute, value] of Object.entries(attributes)) {
        if(value !== null) {
            element.setAttribute(attribute, value)
        }
    }
    return element
}