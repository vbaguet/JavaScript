import { createHTMLElement } from "../functions/dom.js"

export class TodoListItem {

    #element

    /** @type {Todo} */
    constructor (todo) {
        const li = createHTMLElement('li', {
            class: 'todo list-group-item d-flex align-items-center'
        })
        this.#element = li
        const checkbox = createHTMLElement('input', {
            type: 'checkbox',
            class: 'form-check-input',
            id: `todo-${todo.id}`,
            checked: todo.completed ? '' : null
        })
        const label = createHTMLElement('label', {
            class: 'ms-2 form-check-label',
            for: `todo-${todo.id}`
        })
        label.innerText = todo.title
        const button =  createHTMLElement('button', {
            class: 'ms-auto btn btn-danger btn-sm',
        })
        button.innerHTML = '<i class="bi bi-trash3"></i>'
        li.append(checkbox)
        li.append(label)
        li.append(button)
        this.checkToggle(checkbox)

        button.addEventListener('click', (e) => this.removeTodo(e))
        checkbox.addEventListener('change', (e) => this.checkToggle(e.currentTarget))
    }

    /**
     * Return the Todo HTMLElement
     * @returns {HTMLElement} 
     */
    get element() {
        return this.#element
    }

    /**
     * Remove a Todo from the list
     * @param {PointerEvent} e 
     */
    removeTodo(e) {
        e.preventDefault()
        this.#element.remove()
    }

    /**
     * Toggle Todo checkbox status
     * @param {HTMLInputElement} e 
     */
    checkToggle(checkbox) {
        if(checkbox.checked) {
            this.#element.classList.add('is-done')
        }
        else {
            this.#element.classList.remove('is-done')
        }
    }
}