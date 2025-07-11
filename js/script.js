// Global List
let tasks = [];
let currentFilter = 'all'; // all | completed

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');

    // Validate inputs
    if (taskInput.value === '' || dueDateInput.value === '') {
        alert('Please fill in both task and due date.');
    } else {
        // Create a new task object
        const newTask = {
            id: Date.now(), // Unique ID based on current timestamp
            task: taskInput.value,
            dueDate: dueDateInput.value,
            completed: false
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Clear the input fields
        taskInput.value = '';
        dueDateInput.value = '';

        // Log the new task (for demonstration purposes)
        displayTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    // Filter task sesuai kondisi: 'completed' atau 'all'
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'completed') return task.completed;
        return true; // for 'all'
    });

     // Jika tidak ada hasil, tampilkan pesan
    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<p class=" text-center text-gray-500">Task is Empty!</p>`;
        return;
    }

    filteredTasks.forEach(element => {
        const taskItem = `
        <div class="flex justify-between items-center p-2 border bg-white shadow-sm rounded mb-2">
            <div class="flex flex-col ${element.completed ? 'line-through text-gray-400' : ''}">
                <span class="text-lg">${element.task}</span>
                <span class="text-sm text-gray-500">${element.dueDate}</span>
            </div>
            <div class="flex gap-2">
                <button class="bg-green-500 text-white px-2 py-1 rounded text-sm" onclick="toggleTaskCompletion(${element.id})">
                    ${element.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="bg-red-500 text-white px-2 py-1 rounded text-sm" onclick="deleteTask(${element.id})">
                    Delete
                </button>
            </div>
        </div>
        `;
        taskList.innerHTML += taskItem;
    });
}

// Function to delete a specific task
function deleteTask(id) {
    // Find the index of the task to delete
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        // Remove the task from the tasks array
        tasks.splice(taskIndex, 1);
        displayTasks(); // Refresh the displayed task list
    }
}

// Function to delete all task
function deleteAllTasks() {
    tasks = []; // Clear the tasks array
    displayTasks(); // Refresh the displayed task list
}

//functoin toggle task completion
function toggleTaskCompletion(id) {
    // Find the task by ID
    const task = tasks.find(task => task.id === id);
    if (task) {
        // Toggle the completed status
        task.completed = !task.completed;
        displayTasks(); // Refresh the displayed task list
    }
}

// Function to filter tasks
function filterTasks(filterType) {
    currentFilter = filterType;
    updateFilterButtons(); // Update the filter button styles
    displayTasks(); // Refresh the displayed task list
}


function updateFilterButtons() {
    const btnCompleted = document.getElementById('btn-completed');
    const btnAll = document.getElementById('btn-all');

    if (currentFilter === 'completed') {
        btnCompleted.className = 'p-[4px] rounded bg-green-500 text-white';
        btnAll.className = 'p-[4px] rounded bg-gray-200';
    } else {
        btnAll.className = 'p-[4px] rounded bg-green-500 text-white';
        btnCompleted.className = 'p-[4px] rounded bg-gray-200';
    }
}

updateFilterButtons();
displayTasks();