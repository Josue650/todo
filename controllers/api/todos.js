// controllers/api/todos
const Todo = require('../../models/todo')

module.exports = {
  create,
  indexComplete,
  indexNotComplete,
  show,
  update,
  destroy,
  jsonTodos,
  jsonTodo
}

// jsonTodos, jsonTodo

function jsonTodo (req, res){
  res.json(res.locals.data.todo)
}

function jsonTodos (req, res){
  res.json(res.locals.data.todos)
}

// create
async function create(req, res, next) {
  try {
      const todo = await Todo.create(req.body)
      console.log(todo)
      res.locals.data.todo = todo
      next()
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

// read
async function indexComplete(req,res, next){
  try {
      const todos = await Todo.find({ complete: true })
      res.locals.data.todos = todos
      next()
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

async function indexNotComplete(req,res, next){
  try {
      const todos = await Todo.find({ complete: false })
      res.locals.data.todos = todos
      next()
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

async function show(req,res, next){
  try {
      const todo = await Todo.findById(req.params.id)
      res.locals.data.todo = todo
      next()
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

// update

async function update(req,res, next){
  try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
      res.locals.data.todo = todo
      next()
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

// destroy

async function destroy(req,res, next){
  try {
      const todo = await Todo.findByIdAndDelete(req.params.id)
      res.locals.data.todo = todo
      next()
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}



//---------------------------------------------
// const dataController = {
//   // Index,
//   index (req, res, next) {
//     Todo.find({}, (err, foundTodos) => {
//       if (err) {
//         res.status(400).send({
//           msg: err.message
//         })
//       } else {
//         res.locals.data.todos = foundTodos
//         next()
//       }
//     })
//   },
//   // Destroy
//   destroy (req, res, next) {
//     Todo.findByIdAndDelete(req.params.id, (err, deletedTodo) => {
//       if (err) {
//         res.status(400).send({
//           msg: err.message
//         })
//       } else {
//         res.locals.data.todo = deletedTodo
//         next()
//       }
//     })
//   },
//   // Update
//   update (req, res, next) {
//     Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTodo) => {
//       if (err) {
//         res.status(400).send({
//           msg: err.message
//         })
//       } else {
//         res.locals.data.todo = updatedTodo
//         next()
//       }
//     })
//   },
//   // Create
//   create (req, res, next) {
//     req.body.complete = req.body.complete === 'on' || req.body.complete === true ? true : false
//     Todo.create(req.body, (err, createdTodo) => {
//       if (err) {
//         res.status(400).send({
//           msg: err.message
//         })
//       } else {
//         res.locals.data.todo = createdTodo
//         next()
//       }
//     })
//   },
//   // Edit
//   // Show
//   show (req, res, next) {
//     Todo.findById(req.params.id, (err, foundTodo) => {
//       if (err) {
//         res.status(404).send({
//           msg: err.message,
//           output: 'Could not find a todo with that ID'
//         })
//       } else {
//         res.locals.data.todo = foundTodo
//         next()
//       }
//     })
//   }
// }

// const apiController = {
//     index (req, res, next) {
//       res.json(res.locals.data.todos)
//     },
//     show (req, res, next) {
//       res.json(res.locals.data.todo)
//     }
//   }

// module.exports = { dataController, apiController }
