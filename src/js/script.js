const todo_list = document.querySelector('.todo__list')
const item_left = document.querySelector('.item-left')
const menu = document.querySelectorAll('.show__btn')

const clearCompleted = document.querySelector('[data-button-clear]')
const activeBtn = document.querySelector('[data-active-btn]')
const completeBtn = document.querySelector('[data-completed-btn]')
const showAllBtn = document.querySelector('[data-show-all]')

// INPUT NEW TODO FUNCTION HERE
const input = document.querySelector('[data-input]')
const inputBtn = document.querySelector('.input__button')
const error = document.querySelector('.error')
let inputVal

// input.addEventListener('input', () => {
//     if(input.value === '') {
//         error.classList.add('error-display')
//     } else {
//         error.classList.remove('error-display')
//     }
// })
input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if(input.value === '') {
        error.classList.add('error-display')
        } else {
            inputVal = input.value
            input.value = ''
            newListItem()
            error.classList.remove('error-display')
        }
    }
})
inputBtn.addEventListener('click', function(e) {
    if(input.value === '') {
        error.classList.add('error-display')
    } else {
        inputVal = input.value
        input.value = ''
        newListItem()
        error.classList.remove('error-display')
    }
})

let remaining_task = 0

function newListItem() {
    const li = document.createElement('li')
    const checkBtn = document.createElement('button')
    const span = document.createElement('span')
    const removeBtn = document.createElement('button')
    const img = document.createElement('img')

    li.classList.add('todo__items')
    li.setAttribute('data-status', 'active')
    li.setAttribute('draggable', 'true')

    checkBtn.classList.add('todo__button')
    checkBtn.setAttribute('data-button', '')
    
    span.classList.add('todo__item')
    span.innerText = inputVal

    removeBtn.classList.add('todo__remove')
    img.src = './src/assets/icons/icon-cross.svg'
    removeBtn.appendChild(img)

    span.addEventListener('click', function(){
        span.classList.toggle('task-complete')
        checkBtn.classList.toggle('btn-complete')

        if(span.classList.contains('task-complete')) {
            li.setAttribute('data-status', 'complete')
            remaining_task = remaining_task - 1
            item_left.innerText = remaining_task
        } else {
            li.setAttribute('data-status', 'active')
            remaining_task = remaining_task + 1
            item_left.innerText = remaining_task
        }
    })
    checkBtn.addEventListener('click', function(){
        span.classList.toggle('task-complete')
        checkBtn.classList.toggle('btn-complete')

        if(span.classList.contains('task-complete')) {
            li.setAttribute('data-status', 'complete')
            remaining_task = remaining_task - 1
            item_left.innerText = remaining_task
        } else {
            li.setAttribute('data-status', 'active')
            remaining_task = remaining_task + 1
            item_left.innerText = remaining_task
        }
    })

    li.appendChild(checkBtn)
    li.appendChild(span)
    li.appendChild(removeBtn)

    todo_list.appendChild(li)

    li.addEventListener('dragstart', () => {
        dragStart(li)
    })
    li.addEventListener('dragend', () => {
        dragEnd(li)
    })

    todo_list.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(todo_list, e.clientY)
        dragOver(todo_list, afterElement)
    })

    removeBtn.addEventListener('click', function() {
        todo_list.removeChild(li)
        remaining_task = remaining_task - 1
        item_left.innerText = remaining_task
        
        if(remaining_task < 0) {
            remaining_task = 0
            item_left.innerText = remaining_task
        }
    })

    remaining_task = remaining_task + 1
    item_left.innerText = remaining_task
}

function dragStart(li) {
    li.classList.add('dragging')
}
function dragEnd(li) {
    li.classList.remove('dragging')
}
function dragOver(todo_list, afterElement) {
    const draggable = document.querySelector('.dragging')

    if(afterElement == null) {
        todo_list.appendChild(draggable)
    } else {
        todo_list.insertBefore(draggable, afterElement)
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.todo__items:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const item = child.getBoundingClientRect()
        const offset = y - item.top - item.height / 2

        if(offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

menu.forEach(function(val) {
    val.addEventListener('click', activeFunction)
})

function activeFunction(event) {
    menu.forEach(function(val) {
        val.classList.remove('active')

        if(event.target.innerText == val.innerText) {
            val.classList.add('active')
        }
    })
}

clearCompleted.addEventListener('click', clearAllCompleted)

function clearAllCompleted() {
    const completeTask = document.querySelectorAll("[data-status='complete']")

    completeTask.forEach(task => {
        todo_list.removeChild(task)
    })
}

activeBtn.addEventListener('click', showActive)

function showActive() {
    const completeTask = document.querySelectorAll("[data-status='complete']")
    const activeTask = document.querySelectorAll("[data-status='active']")

    completeTask.forEach(task => {
        task.classList.add('unshow')
    })

    activeTask.forEach(task => {
        task.classList.remove('unshow')
    })
}

completeBtn.addEventListener('click', showComplete)

function showComplete() {
    const activeTask = document.querySelectorAll("[data-status='active']")
    const completeTask = document.querySelectorAll("[data-status='complete']")

    activeTask.forEach(task => {
        task.classList.add('unshow')
    })
    completeTask.forEach(task => {
        task.classList.remove('unshow')
    })
}

showAllBtn.addEventListener('click', showAll)

function showAll() {
    const activeTask = document.querySelectorAll("[data-status='active']")
    const completeTask = document.querySelectorAll("[data-status='complete']")

    activeTask.forEach(task => {
        task.classList.remove('unshow')
    })
    completeTask.forEach(task => {
        task.classList.remove('unshow')
    })
}

let theme = localStorage.getItem('themeDark')

const toggleThemeBtn = document.querySelector('.toggleTheme')
const themeIcon = document.querySelector('.theme-icon')

const enableDarkMode = () => {
    document.body.classList.add('darkmode')

    localStorage.setItem('themeDark', 'enabled')
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode')

    localStorage.setItem('themeDark', null)
}

if(theme === 'enabled') {
    enableDarkMode()
} else {
    disableDarkMode()
}

toggleThemeBtn.addEventListener('click', () => {
    theme = localStorage.getItem('themeDark') 

    if(theme === 'enabled') {
        disableDarkMode()
    } else {
        enableDarkMode()
    }
    
    if(!themeIcon.src.match("icon-moon")) {
        themeIcon.src = "./src/assets/icons/icon-moon.svg" 
    } else {
        themeIcon.src = "./src/assets/icons/icon-sun.svg" 
    }
})