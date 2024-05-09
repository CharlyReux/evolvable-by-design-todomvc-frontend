import axios from 'axios'



export default class TodoService {
  constructor(baseApiUrl) {
    this.todos = []
    this.baseApiUrl = baseApiUrl
  }

  getTodos() {
    return this.todos
  }

  async fetch(filter) {
    const response = await axios.get(`${this.baseApiUrl}/todos`, { params: { status:filter } })
    this.todos = response.data.todos
    return this.todos
  }

  async add(title,tag,author) {
    const response = await axios.post(`${this.baseApiUrl}/todo`, { title,tag,"authorName":author })
    const todo = response.data
    this.todos = [...this.todos, todo]
    return this.todos
  }

  async updateTodo(todo, newValue) {
    const response = await axios.put(`${this.baseApiUrl}/todo/${newValue.id}`, {
      title: newValue.title,
      completed: newValue.completed
    })
    const indexOfTodo = this.todos.findIndex(todo => todo.id === newValue.id)
    const temporaryTodos = [...this.todos]
    temporaryTodos[indexOfTodo] = newValue
    this.todos = temporaryTodos
    return this.todos
  }

  async delete(todo) {
    const response = await axios.delete(`${this.baseApiUrl}/todo/${todo.id}`)
    const indexOfTodo = this.todos.findIndex(curTodo => curTodo.id === todo.id)

    const temporaryTodos = [...this.todos]
    temporaryTodos.splice(indexOfTodo, 1)
    this.todos = temporaryTodos
    return this.todos
  }

  async deleteMany(filter) {
    const response = await axios.delete(`${this.baseApiUrl}/todos`, { params: { status: filter }})
    this.todos = []
    return this.todos
  }

  async switchTodoCompletedStatus(todo) {
    const newTodo = { ...todo }
    newTodo.completed = !newTodo.completed
    return this.updateTodo(todo,newTodo)
  }

  async getAuthorAndTag(todo){
    const authorResponse = await axios.get(`${this.baseApiUrl}/todo/${todo.id}/author`)
    const tagResponse = await axios.get(`${this.baseApiUrl}/todo/${todo.id}/tag`)

    return [authorResponse.data.name, tagResponse.data.name]
  }


}
