"use strict";

let readline = require('readline-sync');
const tasks = [];

function listTasks() {
    const list = [];
    for (let i = 0; i < tasks.length; i++) {
        let taskNow = tasks[i];
        list.push([
            taskNow.id,
            taskNow.title,
            taskNow.description,
            taskNow.completed ? "Completo" : "Pendente"
        ]);

    };
    return list;
};

function taskCreate() {
    console.clear();
    let question = readline.question("Digite 'S/s' se deseja continuar: ");
    if(question === 'S' || question === 's'){
        let taskName = readline.question("Tarefa: ");
        let taskDescription = readline.question("Descricao: ");
        if (taskName.length === 0 && taskDescription.length === 0) {
            console.log("O campo tarefa e o campo descrição se encontram vazios.");
            console.log("Para criar uma tarefa todos os campos devem estar preechidos.");
            console.log("");
            console.log("");
            readline.question("<ENTER - TENTAR NOVAMENTE ");
            taskCreate();
        } else {
            tasks.push({
                id: tasks.length + 1,
                title: taskName,
                description: taskDescription,
                completed: false,
            });
    
            console.clear();
            console.log(`A TAREFA FOI ADICIONADA A LISTA!`);
        };
    };
};

function completedTask() {
    if (tasks.length > 0) {
        let key = false;
        let list = listTasks();
        listFormatting(list);
        for (let i = 0; i < 2; i++)console.log("");
        let idTask = Number(readline.question("ID da tarefa: "));
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]["id"] === idTask) {
                key = true;
                tasks[i]["completed"] = key;
                console.log("A TAREFA FOI MARCADA COM CONCLUÍDA!");
                break;
            };
        };
        if (!key) console.log("O id fornecido nao foi encontrado!");
    } else console.log("Lista vazia.");
};

function deleteTask() {
    if (tasks.length > 0) {
        let key = false;
        let list = listTasks();
        listFormatting(list);
        for (let i = 0; i < 2; i++)console.log("");
        let idTask = Number(readline.question("ID da tarefa: "));
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]["id"] === idTask) {
                key = true;
                let index = tasks[i];
                for (let j = i + 1; j < tasks.length; j++) {
                    if (index !== tasks.length - 1) {
                        const temp = tasks[j];
                        tasks[j] = index;
                        tasks[i] = temp;
                    };
                };
                tasks.pop();
                for (let i = 0; i < tasks.length; i++) {
                    if (tasks[i].id !== i + 1) {
                        tasks[i]["id"] = i + 1;
                    }
                };
                console.log("A TAREFA FOI EXCLUÍDA!");
                break;
            };
        };
        if (!key) console.log("O Id fornecido nao foi encontrado!")
    } else console.log("Lista vazia.")
};

function listFormatting(list) {
    for (let i = 0; i < list.length; i++) {
        console.log("");
        console.log("");
        for (let j = 1; j < list[i].length; j++) {
            if (list[i][j - 1] === Number(list[i][j - 1])) {
                console.log(`${list[i][j - 1]}) ${list[i][j]}`);
            } else {
                console.log("   " + list[i][j]);
            };
        };
    };
};

function menu() {

    let loopKey = true;
    do {
        console.clear();
        console.log("_____________________________________");
        console.log("|                                   |");
        console.log("|           TASK MANAGER            |");
        console.log("|               Menu                |");
        console.log("|___________________________________|");
        console.log(" ");

        console.log("1) Criar tarefa");
        console.log("2) Listar tarefas");
        console.log("3) Concluir tarefas");
        console.log("4) Excluir tarefas");
        console.log("0) Sair");

        console.log(" ");
        console.log(" ");

        let taskNumber = readline.question("-> ");
        if (taskNumber.split('').length < 2) {
            if (taskNumber || taskNumber === '0') taskNumber = Number(taskNumber);
        } else {
            taskNumber = null;
        };

        switch (taskNumber) {
            case 1:
                taskCreate();
                break;
            case 2:
                console.clear();
                if (tasks.length === 0) console.log("Lista vazia")
                let list = listTasks();
                listFormatting(list);
                break;
            case 3:
                console.clear();
                completedTask();
                break;
            case 4:
                console.clear();
                deleteTask();
                break;
            case 0:
                loopKey = false;
                break;
            default:
                console.log("ESTÁ OPCAO NAO EXISTE! TENTE NOVAMENTE.");
                break;
        };
        if (loopKey) {
            for (let i = 0; i < 2; i++) console.log("");
            readline.question("<ENTER - VOLTAR AO MENU> ");
        };
    } while (loopKey);
};
menu();