import axios from 'axios'
import Pivo from '@evolvable-by-design/pivo'


export default class TodoService {
  /**
   * 
   * @param {string} baseApiUrl the url of the api
   */
  constructor(documentation) {
    this.todos = []
    this.pivo = new Pivo(documentation)
    this.todoCollectionOperation = this.pivo
    .get("http://evolvable-by-design.github.io/vocabs/todomvc#TodoCollection")
    .getOrThrow(()=>new Error("No todoCollection operation"))
    this.todoCollectionResponse = null
    this.currentFilter = null
  }

  static async forApiAtUrl(url) {
    const response = await axios.options(url)
    const documentationString = await response.data
    return new TodoService(documentationString)
  }

  getTodos() {
    return this.todos
  }

  /**
   * 
   * @param {String} filter : a filter to fetch todos either 'all', 'active' or 'completed'
   * @returns {Array} : a list of todos
   */
  async fetch(filter) {
    this.todoCollectionResponse = await this.todoCollectionOperation
    .invoke({["http://evolvable-by-design.github.io/vocabs/todomvc#status"]:filter})
    this.filter = filter
    this.todos = await this.todoCollectionResponse.data.getArray("http://evolvable-by-design.github.io/vocabs/todomvc#Todos")

    return this.getTodos()
    //TODO fetch todos from the server
  }
  /**
   * @param {string} title : the title of the todo to add
   * @param {string} author : the name of the author of the todo
   * @param {string} tag : the name of the tag of the todo
   * @returns the list of all todos
   */
  async add(title, author, tag) {
    const creationOperation =  await this.todoCollectionResponse.data.
    getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/create")
    .map(relation => {
      return relation[0].operation
    })
    .getOrThrow(()=>new Error("no relation available to create a todo"))
    await creationOperation.invoke({ ["http://schema.org/name"]: title ,["http://schema.org/givenName"]:author,["http://schema.org/DefinedTerm"]:tag})
    return this.fetch(this.filter)
    //TODO create the method to add a todo
  }

  /**
   * 
   * @param {any} todo : the former todo to update 
   * @param {*} newValue : the new value of the todo
   * @returns all the todos, after the update
   */
  async updateTodo(todo, newValue) {
    const updateOperation = await todo.
    getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/update")
    .map(relation => {
      return relation[0].operation
    }).getOrThrow(()=>new Error("no relation available to update a todo"))
    await updateOperation.invoke({...newValue})
    return this.fetch(this.filter)
    //TODO implement the update of a todo
  }

  /**
   * deletes a todo
   * @param {any} todo : the todo to delete 
   * @returns all the todos, after the deletion
   */
  async delete(todo) {
    const deleteOperation = await todo.
    getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/delete")
    .map(relation => {
      return relation[0].operation
    }).getOrThrow(()=>new Error("no relation available to update a todo"))

    await deleteOperation.invoke()
    return this.fetch(this.filter)
    //TODO implement the deletion of a todo
  }

  /**
   * @param {string} filter : the filter to apply to the deletion
   * @returns all the todos, after the deletion of all completed todos
   */
  async deleteMany(filter) {
    const deletemanyOperation = this.todoCollectionResponse.data
    .getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/deleteMany")
    .map(relation => {
      return relation[0].operation
    }).getOrThrow(()=>new Error("no relation available to update a todo"))

    await deletemanyOperation.invoke({["http://evolvable-by-design.github.io/vocabs/todomvc#status"]:filter})
    return this.fetch(filter)
  }

  /**
   * switch the status of the current todo
   * @param {*} todo the todo to switch the status
   * @returns all the todos, after the switch of the specified todo
   */
  async switchTodoCompletedStatus(todo) {
    const newTodo = { ...todo.data }
    newTodo.completed = !newTodo.completed
    return this.updateTodo(todo, newTodo)
  }

  /**
   * gets the author and the tag of the specified todo
   * @param {*} todo the todo to get the author and tag from
   * @returns a tuple with the author and the tag in the form [author, tag]
   */
  async getAuthorAndTag(todo) {
    const authorOperation = todo
    .getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/getAuthor")
    .map(relation => {
      return relation[0].operation
    }).getOrThrow(()=>new Error("no relation available to get an author"))

    const authorResponse = (await authorOperation.invoke()).data

    const tagOperation = todo
    .getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/getTag")
    .map(relation => {
      return relation[0].operation
    }).getOrThrow(()=>new Error("no relation available to get a tag"))

    const tagResponse = (await tagOperation.invoke()).data

    console.log(tagResponse)
    
    return [await authorResponse.getOneValue("http://schema.org/givenName"),await tagResponse.getOneValue("http://schema.org/DefinedTerm")]
  }


}