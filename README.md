# Experiment Statement

Each one of the participants will have a slightly different experiment, but everyone will implement using both approaches.

## Experiment Prerequisites

If you have done the tutorial, this should be straightforward, as the requirements are exactly the same.

The two easiest ways are either **remotely**, in a GitHub CodeSpace via this [link](https://github.com/codespaces/new?template_repository=CharlyReux/evolvable-by-design-todomvc-frontend), with it, you will be able to start instantly (It is free, unless you go over 60 hours of runtime). Or **locally**, by using a Dev Container (you will need Docker, VS Code and the extension `ms-vscode-remote.remote-containers`). As this application is slightly bigger than the tutorial one, it should take a bit more time to set up your environment.
#### Using a Dev Container
If using a Dev Container, in VS Code, you will first have to clone this repository, then press F1 and run `Dev Containers: Reopen in container`    
The repository should load, and you are ready to go.


## Getting Started

The app you will be working on is a simple todo app. 

The objective is to have an app that will look like this.  
<img src="images/main_app.png" style="width:50rem">

Upon clicking on the information button of the individual todos, you have access to the details of that todo.   
<img src="images/details.png" style="width:50rem">

An initial skeleton of the app is already provided, all you will have to do is to fill in some methods and replace some comments in specific places.

### Details
The app is composed of multiple parts, with the most important ones being:
- Components
  - TodoListPage: contains the main application
  - TodoList: contains the list of todos
  - DetailDialog: contains the dialog component displaying the author and tag information of a todo
- Service
  - TodoService: contains the methods used to call the backend

You will mainly have to modify the TodoService, and slightly the TodoListPage and the TodoList.  
> [!WARNING] 
> the TodoService needs to be implemented in a functional manner, each method must return the full list of todos.

## Procedure
There are two sets of 5 evolutions, you will start by making the front-end implementation either with the Classical approach or the Pivo approach, and then apply each set of evolutions consecutively. Once done, you will do the same with the other approach.

At the beginning of the experiment, you were provided with a number from 1 to 8, which will dictate how the experiment will unfold for you. 

When you are ready run the command:
```sh
./experiment -s <YOUR_NUMBER>
```

The script assigned you a type of approach to start with, below are all the evolution, you can start by going to the corresponding approach and to follow the **First implementation** steps.

> [!CAUTION]
> In all the cases, the longer step is the first implementation, as you will have to get familiar with the application, and the approach(in the case of Pivo). Remember that a Documentation for Pivo that covers all the use-cases you will encounter is available [here](https://github.com/CharlyReux/evolvable-by-design-research/blob/master/experiments/crossover-developers-study/Pivo-documentation.md)

> [!NOTE]
> The script that you will use does everything not relevant for you for the experiment. It automatically runs the backend version that you need to conform to in your frontend, and replaces the `openapi.yml` file situated in the root of the repository with the one that is relevant.  
> The only thing that you will need to do is to run `npm run dev` in order to start developing, and access `http://localhost:5173`  
> When you will get to the end of a set or an approach, your front-end will automatically reset either to your first implementation, or to the initial empty implementation.  
> If running this experiment in a github codeSpace **you will probably have to make the backend public in order to access it**(the same as with the tutorial) with `gh codespace ports visibility 8080:public -c $CODESPACE_NAME`


> [!WARNING]
> If you ever notice that the backend stopped, either because your codespace restarted, or because of an unknown error, you can restart it with the command:
> ```sh
>  ./experiment -r
>```


## Classical Approach
To make things easier, you can check the swagger UI while coding(An extension is provided in the devcontainer: `OpenAPI: show preview using Swagger UI`) or the openApi specification directly, which is in the root of the repository.  

### First implementation
1. Instantiate the service in the todolistpage
2. Implement the methods in the TodoService
3. Once done, run the following command: `./experiment -n` 

**Between each evolution, run `./experiment -n`**
| Evolution Number | Task                                                                                    | Details                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 1                | Add a required `dueDate` body parameter of type string to POST /todo.                   |                                                                                                          |
| 2                | Move `dueDate` attributes of Todo inside a new element `infos`.                         | The easier way is to modify the todoService to modify the content of the todo back to its original form. |
| 3                | Move the `completed` element inside the existing `infos`.                               | The fix is similar to the previous one.                                                                  |
| 4                | Completely Remove the `dueDate` return value from the infos response.                   |                                                                                                          |
| 5                | Move the location of the id parameter from the path to the query in the GET tag method. |                                                                                                          |

### Set n°2

| Evolution Number | Task                                                                                                       | Details |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| 1                | Rename GET /todos into GET /todo.                                                                          |         |
| 2                | Rename `title` into `text` in the todo creation POST method.                                               |         |
| 3                | Combine method GET `/todo/{todoId}/author` and GET `/todo/{todoId}/tag` into GET `/todo/{todoId}/details`. |         |
| 4                | Change PUT /todo/{todoId} into POST /todo/{todoId}.                                                        |         |
| 5                | To delete a todo, first complete it and then run delete. Before it was possible to delete right away.      |         | For this evolution, change the todoList component to display the "deleteMany" button only when the filter is set to "completed". |



## Pivo Approach

>![WARNING] 
>In order to simplify the usage of pivo, you can replace the content of the content of the todoService with the content in [todoServicePivo](src/utils/TodoServicePivo.md), which adds type hinting.

### First implementation
1. Instantiate the service in the TodolistPage(You will have to modify The todoService and the TodoList component, you can get inspiration from the [tutorial](https://github.com/CharlyReux/evolvable-by-design-tutorial/tree/main#setting-up-pivo-in-our-application) we did earlier), note that the openAPI specification is available at /rest with the OPTIONS http verb.
2. Modify the TodoList component to use semantic data(You can use the utility component `with-semantic-data-required.jsx`)
3. Implement the methods in the TodoService (you will have to modify the switchTodoStatus method as well)
4. Once done, run the following command: `./experiment -n` 

**Between each evolution, run `./experiment -n`**
##### Set n°1  
1. Add a required `dueDate` body parameter of type string to POST /todo.
2. Move `dueDate` attributes of Todo inside a new element `infos`.
3. Move the `completed` element inside the existing `infos`
4. Completely Remove the `dueDate` return value from the infos response.
5. move the location of the id parameter from the path to the query in the GET tag method 

##### Set n°2 
1. Renamed GET /todos into GET /todo
2. Renamed `title` into `text` in the todo creation POST method
3. combine method GET `/todo/{todoId}/author` and GET `/todo/{todoId}/tag` to GET `/todo/{todoId}/details`
4. Change PUT /todo/{todoId} into POST /todo/{todoId}
5. To delete a todo, first complete it and then run delete, before it was possible to delete right away.
   1. For this evolution, you will have to change the todoList component to display the "deleteMany" button only when the filter is set to "completed"


### Set n°1

| Evolution Number | Task                                                                                    | Details                                                        |
| ---------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 1                | Add a required `dueDate` body parameter of type string to POST /todo.                   |                                                                |
| 2                | Move `dueDate` attributes of Todo inside a new element `infos`.                         |                                                                |
| 3                | Move the `completed` element inside the existing `infos`.                               |                                                                |
| 4                | Completely Remove the `dueDate` return value from the infos response.                   | This evolution will not be handle automatically by the library |
| 5                | Move the location of the id parameter from the path to the query in the GET tag method. |                                                                |

### Set n°2

| Evolution Number | Task                                                                                                       | Details                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 1                | Rename GET /todos into GET /todo.                                                                          |                                                                                                                                  |
| 2                | Rename `title` into `text` in the todo creation POST method.                                               |                                                                                                                                  |
| 3                | Combine method GET `/todo/{todoId}/author` and GET `/todo/{todoId}/tag` into GET `/todo/{todoId}/details`. | This evolution will not be handle automatically by the library                                                                   |
| 4                | Change PUT /todo/{todoId} into POST /todo/{todoId}.                                                        |                                                                                                                                  |
| 5                | To delete a todo, first complete it and then run delete. Before it was possible to delete right away.      | For this evolution, change the todoList component to display the "deleteMany" button only when the filter is set to "completed". |


