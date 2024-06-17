```js
import { SemanticResource } from '@evolvable-by-design/pivo'

export default class TodoService {
  /**
   * 
   * @param {string} baseApiUrl the url of the api
   */
  constructor(baseApiUrl) {
    this.todos = []
    this.todos = []
    //TODO
    //- Instantiate a pivo object
    //- Retrieve the todo collection Operation
  }

  getTodos() {
    return this.todos
  }

  /**
   * 
   * @param {String} filter : a filter to fetch todos either 'all', 'active' or 'completed'
   * @returns {Array<SemanticResource>} : a list of todos
   */
  async fetch(filter){
    //TODO fetch todos from the server
    // - invoke the todo collection Operation with the filter as a parameter, to get a response object
    // - Get the array of todos from the response object
    // - Assign the todos
    // - return getTodos()
  }
  /**
   * @param {string} title : the title of the todo to add
   * @param {string} author : the name of the author of the todo
   * @param {string} tag : the name of the tag of the todo
   * @returns {Array<SemanticResource>} the list of all todos
   */
  async add(title, author, tag) {
    //TODO create the method to add a todo
    // - Get the creation Operation from the relation in the the response from the todo Collection operation
    // - Invoke the creation operation with the appropriate parameters
    // - Update all the todos just by returning the fetch method (It is the easier way, even tho it makes another request)
  }

  /**
   * 
   * @param {SemanticResource} todo : the former todo to update 
   * @param {*} newValue : the new value of the todo
   * @returns {Array<SemanticResource>} all the todos, after the update
   */
  async updateTodo(todo, newValue) {
    //TODO implement the update of a todo
  }

  /**
   * deletes a todo
   * @param {SemanticResource} todo : the todo to delete 
   * @returns {Array<SemanticResource>} all the todos, after the deletion
   */
  async delete(todo) {
    //TODO implement the deletion of a todo
  }

  /**
   * @param {string} filter : the filter to apply to the deletion
   * @returns {Array<SemanticResource>} all the todos, after the deletion of all completed todos
   */
  async deleteMany(filter) {
  }

  /**
   * switch the status of the current todo
   * @param {SemanticResource} todo the todo to switch the status
   * @returns {Array<SemanticResource>} all the todos, after the switch of the specified todo
   */
  async switchTodoCompletedStatus(todo) {
    const newTodo = { ...todo }
    newTodo.completed = !newTodo.completed
    return this.updateTodo(todo, newTodo)
  }

  /**
   * gets the author and the tag of the specified todo
   * @param {SemanticResource} todo the todo to get the author and tag from
   * @returns {Array<SemanticResource>} a tuple with the author and the tag in the form [author, tag]
   */
  async getAuthorAndTag(todo) {
    //TODO: implement getAuthorAndTag Method
  }


}

```