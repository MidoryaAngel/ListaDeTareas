const { createApp } = Vue;

createApp({
    data() {
        return {
            newTask: "",
            tasks: [],
            showFarewellMessage: false,
            /*newTask: Almacena el texto de la nueva tarea a añadir.
            tasks: Un arreglo de tareas, donde cada tarea es un objeto con propiedades text (nombre de la tarea) y completed (si está completada).
            showFarewellMessage: Controla si se muestra el mensaje de despedida o no.*/
        };
    },
    computed: {
        progressPercentage() {//Calcula el porcentaje de progreso basado en las tareas completadas.
            const completedTasks = this.tasks.filter(task => task.completed).length;
            return (completedTasks / this.tasks.length) * 100;
        },
        progressClass() {//Define el color de la barra de progreso según el porcentaje (progress-red para menos
            // del 50%, progress-yellow hasta el 99%, y progress-green al 100%).
            if (this.progressPercentage <= 50) return 'progress-red';
            else if (this.progressPercentage < 100) return 'progress-yellow';
            else return 'progress-green';
        },
        allTasksCompleted() {//Devuelve true si todas las tareas están completadas,
            // false en caso contrario.
            return this.tasks.length > 0 && this.tasks.every(task => task.completed);
        }
    },
    methods: {
        addTask() {// Añade una nueva tarea al arreglo tasks solo si newTask no está vacío.
            // Luego limpia el valor de newTask.
            if (this.newTask.trim()) {
                this.tasks.push({ text: this.newTask, completed: false });
                this.newTask = "";
            }
        },
        toggleTask(index) {//Cambia el estado de completado de la tarea seleccionada
            // (de true a false o viceversa).
            this.tasks[index].completed = !this.tasks[index].completed;
        },
        deleteTask(index) {//Elimina la tarea en la posición index del arreglo tasks.
            this.tasks.splice(index, 1);
        },
        deleteLastTask() {
            if (this.tasks.length > 0) {
                this.tasks.pop();
            }
        },
        restartTasks(confirm) {//Reinicia la lista de tareas dependiendo de la confirmación
            if (confirm) {
                this.tasks = [];//muestra el mensaje de despedida, oculta las tareas, 
                //y mantiene visible solo el botón "Empezar de nuevo".
                this.showFarewellMessage = false;
            } else {
                this.showFarewellMessage = true;
                this.tasks = []; // Oculta las tareas completadas al mostrar mensaje de despedida
            }
        }
    }
}).mount("#app");//montaje de la app
