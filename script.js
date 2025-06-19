// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskFeedback = document.getElementById('task-feedback'); // Element for displaying feedback messages

    /**
     * Displays a feedback message to the user.
     * @param {string} message - The message to display.
     * @param {string} type - The type of message ('success', 'error', 'info').
     */
    function showFeedback(message, type) {
        taskFeedback.textContent = message;
        taskFeedback.style.display = 'block'; // Make it visible

        // Remove previous styling classes
        taskFeedback.classList.remove('bg-green-100', 'text-green-700', 'border-green-300',
                                     'bg-red-100', 'text-red-700', 'border-red-300',
                                     'bg-blue-100', 'text-blue-700', 'border-blue-300', 'hidden'); // Also remove hidden
        taskFeedback.classList.remove('hidden');


        // Apply new styling based on message type
        if (type === 'success') {
            taskFeedback.classList.add('bg-green-100', 'text-green-700', 'border-green-300');
        } else if (type === 'error') {
            taskFeedback.classList.add('bg-red-100', 'text-red-700', 'border-red-300');
        } else if (type === 'info') {
            taskFeedback.classList.add('bg-blue-100', 'text-blue-700', 'border-blue-300');
        }

        // Hide the message after a few seconds
        setTimeout(() => {
            taskFeedback.style.display = 'hidden';
            taskFeedback.classList.add('hidden'); // Also hide using Tailwind
        }, 3000); // Message disappears after 3 seconds
    }

    /**
     * Adds a new task to the to-do list.
     * @param {string} taskText - The text content of the task.
     * @param {boolean} save - Whether to save the task to Local Storage (default is true).
     */
    function addTask(taskText, save = true) {
        // If taskText is provided by loadTasks, it won't be empty.
        // If it's called by user input, retrieve and trim the value.
        const currentTaskText = taskText || taskInput.value.trim();

        // Check if taskText is not empty
        if (currentTaskText === "") {
            showFeedback("Please enter a task.", "error");
            return; // Exit the function if input is empty
        }

        // Create a new list item (<li>) element
        const listItem = document.createElement('li');
        // Add Tailwind CSS classes for styling the list item
        listItem.className = 'flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200 shadow-sm';
        listItem.textContent = currentTaskText; // Set its text content to the task text

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set its text content
        removeButton.className = 'remove-btn'; // Assign the 'remove-btn' class for styling

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Get the text content of the task to be removed for Local Storage update
            const taskToRemove = listItem.textContent.replace('Remove', '').trim();
            taskList.removeChild(listItem); // Remove the list item from the unordered list

            // Update Local Storage after removing the task
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(task => task !== taskToRemove);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));

            showFeedback("Task removed successfully!", "success"); // Show success feedback
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the new list item to the unordered list (task-list)
        taskList.appendChild(listItem);

        // Clear the task input field only if it's a new task being added by the user
        if (save) {
            taskInput.value = "";
            // Save the new task to Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(currentTaskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            showFeedback("Task added successfully!", "success"); // Show success feedback
        }
    }

    /**
     * Loads tasks from Local Storage when the page loads.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }


    // Attach Event Listeners:

    // 1. Add an event listener to the addButton to call addTask when clicked
    addButton.addEventListener('click', () => addTask(null, true)); // Pass null for taskText as it will be read from input

    // 2. Add an event listener to the taskInput for the 'keypress' event
    // This allows tasks to be added by pressing the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            addTask(null, true); // Pass null for taskText as it will be read from input
        }
    });

    // Invoke loadTasks function when the DOM content is fully loaded
    loadTasks();
});
