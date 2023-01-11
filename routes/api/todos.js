const express = require('express')
const router = express.Router()
const todoCtrl = require('../../controllers/api/todos')
// const { dataController, apiController } = require('../../controllers/api/todos')

// add routes
// Index /api/todos
router.get('/', todoCtrl.indexNotComplete, todoCtrl.jsonTodos)
// Index /api/todos/complete
router.get('/completed', todoCtrl.indexComplete, todoCtrl.jsonTodos)
// Delete /api/todos/:id
router.delete('/:id', todoCtrl.destroy, todoCtrl.jsonTodo)
// Update /api/todos/:id
router.put('/:id',todoCtrl.update, todoCtrl.jsonTodo)
// Create /api/todos
router.post('/', todoCtrl.create, todoCtrl.jsonTodo)
// Show /api/todos/:id
router.get('/:id', todoCtrl.show, todoCtrl.jsonTodo)


module.exports = router
