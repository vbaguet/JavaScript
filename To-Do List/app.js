import { TodoListItem } from "./components/todolist.js";
import { fetchJSON } from "./functions/api.js";
import { createHTMLElement } from "./functions/dom.js";

try {
    const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const list = document.querySelector('.list-group')
    for(let todo of todos) {
        const item = new TodoListItem(todo)
        list.append(item.element)
    }

    const form = document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        const title = new FormData(e.currentTarget).get('title').toString().trim()
        if (title === '') {
            return
        }
        const todo = {
            id: Date.now(),
            title: title,
            completed:  false
        }

        const item = new TodoListItem(todo)
        list.prepend(item.element)
        e.currentTarget.reset()
    })

    const filters = document.querySelectorAll('.filters button').forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault
            const filter = e.currentTarget.getAttribute('data-filter')
            e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
            e.currentTarget.classList.add('active')

            switch(filter) {
                case 'todo':
                    list.classList.add('hide-done')
                    list.classList.remove('hide-todo')
                    break
                case 'done':
                    list.classList.add('hide-todo')
                    list.classList.remove('hide-done')
                    break
                default:
                    list.classList.remove('hide-todo')
                    list.classList.remove('hide-done')
            }
        })
    })

} catch (e) {
    const alert = createHTMLElement('div', {class: 'alert alert-danger m-3', role : 'alert'})
    alert.innerText = 'Tasks cannot be loaded'
    document.body.prepend(alert)
    console.error(e)
}