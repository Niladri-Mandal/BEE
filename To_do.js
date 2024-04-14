const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');

const click = document.getElementById('btn');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
}

function addTask(text) {
    const li = document.createElement('li');
   const b1=
    li.innerHTML = `
    <span>
    <span class="right-test">&#10003</span>
    </span>
        <span class="task-text">${text}</span>
        <span class="task-actions">
            <span class="edit-icon">&#9998;</span>
            <span class="delete-icon">&#10007;</span>
        </span>
        <input class="edit-input" type="text">
    `;
    taskList.appendChild(li);

    const taskText = li.querySelector('.task-text');
    const editIcon = li.querySelector('.edit-icon');
    const deleteIcon = li.querySelector('.delete-icon');
    const editInput = li.querySelector('.edit-input');
    const rightpress = li.querySelector('.right-test');

    
    

    editIcon.addEventListener('click', () => {
        editInput.value = taskText.textContent;
        taskText.style.display = 'none';
        editInput.style.display = 'block';
        editInput.focus();
    });

    rightpress.addEventListener('click',()=>{
       
        var textvalue = taskText.textContent;
        textvalue.style ="text-decoration:  red  wavy underline;"
        
        taskText.style="Text-decoration:line-through;"
      

    })

    editInput.addEventListener('blur', () => {
        taskText.textContent = editInput.value;
        taskText.style.display = 'block';
        editInput.style.display = 'none';
        updateLocalStorage();
    });

    deleteIcon.addEventListener('click', () => {
        li.remove();
        updateLocalStorage();
    });

    updateLocalStorage();
}

function updateLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('.task-text')).map(task => task.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskInput.addEventListener('keydown', event => {
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        addTask(taskInput.value);
        taskInput.value = '';
    }
});



click.addEventListener('click',()=>{
    addTask(taskInput.value);
})

loadTasks();



