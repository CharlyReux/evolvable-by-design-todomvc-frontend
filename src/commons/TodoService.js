import axios from 'axios'



export default class TodoService {
  /**
   * 
   * @param {string} baseApiUrl the url of the api
   */
  constructor(baseApiUrl) {
    this.todos = []
    this.baseApiUrl = baseApiUrl
  }

  getTodos() {
    return this.todos
  }

  /**
   * 
   * @param {String} filter : a filter to fetch todos either 'all', 'active' or 'completed'
   * @returns {Array} : a list of todos
   */
  async fetch(filter){
    const response = await axios.get(this.baseApiUrl + "/todos", {"params": {"status": filter} })
    this.todos = response.data.todos
    return this.getTodos()
  }
  /**
   * @param {string} title : the title of the todo to add
   * @param {string} author : the name of the author of the todo
   * @param {string} tag : the name of the tag of the todo
   * @returns the list of all todos
   */
  async add(title, author, tag) {
    const response = await axios.post(this.baseApiUrl +"/todo",{
      title:title,
      "authorName":author,
      "tagName":tag
    })
    this.todos = [...this.todos].concat([response.data])
    return this.getTodos()
    //TODO create the method to add a todo
  }

  /**
   * 
   * @param {any} todo : the former todo to update 
   * @param {*} newValue : the new value of the todo
   * @returns all the todos, after the update
   */
  async updateTodo(todo, newValue) {
    const response = await axios.put(this.baseApiUrl+"/todo/"+todo.id,newValue)

    this.todos = this.todos.filter(curTodo => todo.id != curTodo.id)
    this.todos = [...this.todos].concat([await response.data])
    return this.getTodos()
    //TODO implement the update of a todo
  }

  /**
   * deletes a todo
   * @param {any} todo : the todo to delete 
   * @returns all the todos, after the deletion
   */
  async delete(todo) {
    const response = axios.delete(this.baseApiUrl+"/todo/"+todo.id)
    this.todos = [...this.todos.filter(curTodo => todo.id != curTodo.id)]
    return this.getTodos()
    //TODO implement the deletion of a todo
  }

  /**
   * @param {string} filter : the filter to apply to the deletion
   * @returns all the todos, after the deletion of all completed todos
   */
  async deleteMany(filter) {
    const response = await axios.delete(this.baseApiUrl + "/todos", {"params": {"status": filter} })
    this.todos=[]
    return this.getTodos()
  }

  /**
   * switch the status of the current todo
   * @param {*} todo the todo to switch the status
   * @returns all the todos, after the switch of the specified todo
   */
  async switchTodoCompletedStatus(todo) {
    const newTodo = { ...todo }
    newTodo.completed = !newTodo.completed
    return this.updateTodo(todo, newTodo)
  }

  /**
   * gets the author and the tag of the specified todo
   * @param {*} todo the todo to get the author and tag from
   * @returns a tuple with the author and the tag in the form [author:str, tag:str]
   */
  async getAuthorAndTag(todo) {
    const authorResponse = await axios.get(this.baseApiUrl+"/todo/"+todo.id+"/author")
    const tagResponse = await axios.get(this.baseApiUrl+"/todo/"+todo.id+"/tag")
    console.log(authorResponse,tagResponse)
    return [authorResponse.data.authorName,tagResponse.data.tagName]
  }


}
