import axios from 'axios'


import Pivo from '@evolvable-by-design/pivo'

export default class TodoService {
  constructor(documentation) {
    this.pivo = new Pivo(documentation)
    this.todos = []
    this.todosResources = undefined
    this.currentFilter = undefined

    this.fetchOperation = this.pivo
      .get("http://evolvable-by-design.github.io/vocabs/todomvc#TodoCollection")
      .getOrThrow(() => new Error('REST API operation not available'))
  }

  static async forApiAtUrl(url) {
    const response = await axios.options(url)

    if (response.status === 200) {
      return new TodoService(response.data)
    } else {
      const errorMessage = `Impossible to get the documentation of the API at ${url}.`
      alert(errorMessage)
      throw new Error(errorMessage)
    }
  }

  getTodos() {
    return this.todos
  }

  async fetch(filter) {
    this.currentFilter = filter ? filter : this.currentFilter
    const parameters = this.currentFilter ? { ["http://evolvable-by-design.github.io/vocabs/todomvc#status"]: this.currentFilter } : {}
    const response = await this.fetchOperation.invoke(parameters)
    this.todosResources = response.data
    this.todos = await this.todosResources.getArray("http://evolvable-by-design.github.io/vocabs/todomvc#Todos")
    return this.todos
  }

  async add(title, tag, author) {
    const addOperation = this.todosResources.getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/create", 1)
      .map(relation => relation.operation)
      .getOrThrow(() => new Error('Impossible to get the add operation'))
    const result = await addOperation.invoke({ ["http://schema.org/name"]: title,["http://schema.org/DefinedTerm"]:tag,["http://schema.org/givenName"]:author  })
    const newTodoValue = result.data
    this.todos = [...this.todos].concat([newTodoValue])
    return this.todos
  }

  async updateTodo(todo, newValue) {

    const operation = todo
      .getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/update", 1)
      .map(relation => relation.operation)
      .getOrThrow(() => new Error('REST API operation not available'))

    await operation.invoke({ ...todo.data, ...newValue })
    
    return this.fetch()
  }

  async delete(todo) {
    const deleteOperation = todo
      .getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/delete", 1)
      .map(relation => relation.operation)
      .getOrThrow(() => new Error('REST API operation not available'))

    await deleteOperation.invoke()
    this.todos = [...this.todos.filter(t => t !== todo)]
    return this.todos
  }

  // status must be 'all' or 'completed' or 'active'
  async deleteMany(filter) {
    const operation = this.todosResources
    .getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/deleteMany",1)
    .map(relation => relation.operation)
    .getOrThrow(() => new Error('REST API operation not available'))

    operation.invoke({ ["http://evolvable-by-design.github.io/vocabs/todomvc#status"]: filter })

    return this.fetch(filter)
  }

  async switchTodoCompletedStatus(todo) {
    const formerStatus = await todo.get("http://evolvable-by-design.github.io/vocabs/todomvc#completed") 
    const newStatus = {["http://evolvable-by-design.github.io/vocabs/todomvc#completed"]: !formerStatus.data}
    
    return this.updateTodo(todo, newStatus)
  }

  async getAuthorAndTag(todo){
    const authorOperation = todo
    .getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/getAuthor",1)
    .map(relation => relation.operation)
    .getOrThrow(() => new Error('REST API operation not available'))
    const authorResponse = await authorOperation.invoke()
    const authorResource = authorResponse.data
    const author = await authorResource.getOne("http://schema.org/givenName")

    const tagOperation = todo
    .getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/getTag",1)
    .map(relation => relation.operation)
    .getOrThrow(() => new Error('REST API operation not available'))
    const tagResponse = await tagOperation.invoke()
    const tagResource = tagResponse.data
    const tag = await tagResource.getOne("http://schema.org/DefinedTerm")
    return [author.data,tag.data]
  }

}