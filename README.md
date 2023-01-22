# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

- [Light](./Solution/solution-light.png)
- [dark](./Solution/solution-dark.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid
- Mobile-first workflow
- SASS/SCSS
- Vanilla JavaScript

### What I learned

What I learned today is, you can't change the src of the img in JavaScript if you declare the src attribute first and then the class name. I thought it doesn't make sense, but it actually is... I spent a lot of time trying this, trying that and all I have to do is change the order of attributes...

```html
<!-- This is right -->
<img class="theme-icon" src="./src/assets/icons/icon-moon.svg" alt="">

<!-- This is wrong -->
<img src="./src/assets/icons/icon-moon.svg" alt="" class="theme-icon" >
```
```js
toggleThemeBtn.addEventListener('click', () => {
    theme = localStorage.getItem('themeDark') 

    if(theme === 'enabled') { 
        disableDarkMode()
    } else {
        enableDarkMode()
    }
    
    if(!themeIcon.src.match("icon-moon")) { // <-- here, you will have an error if you declare the src first.
        themeIcon.src = "./src/assets/icons/icon-moon.svg" 
    } else {
        themeIcon.src = "./src/assets/icons/icon-sun.svg" 
    }
})
```

### Continued development

I shall focus on different kinds of event listener. In this project I used a lot of event listener that I don't know that existed.

### Useful resources

- [setting data-attr without a value](https://makersaid.com/set-attribute-without-value-in-javascript/#:~:text=To%20set%20an%20attribute%20without%20a%20value%20in%20JavaScript%2C%20use,attribute%20if%20it%20already%20exists.) - This is helped me how to set an data-attribute without a value
- [Drag and Drop w Vanilla JS](https://www.youtube.com/watch?v=jfYWwQrtzzY) - This video is from Kyle or also known as 'Web Dev Simplified', his video helped me how to do the drag and drop function of this project
- [To Do List](https://www.youtube.com/watch?v=-pRg_daFjfk) - I had a lot of problem when selecting all the todo list items, but in this video I learned that you can just add an event listener in a newly created elements.

## Author

- Github - [j-tomajin](https://github.com/j-tomajin)
- Frontend Mentor - [@AsukalDePapa](https://www.frontendmentor.io/home)

## Acknowledgments
