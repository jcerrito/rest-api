'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('user/register', 'UserController.store')
  Route.post('user/login', 'UserController.login')
  //Rutas para los proyectos
  Route.get('project', 'ProjectController.index').middleware('auth')
  Route.post('project', 'ProjectController.create').middleware('auth')
  Route.delete('project/:id','ProjectController.destroy').middleware('auth')
  Route.patch('project/:id','ProjectController.update').middleware('auth')
  //Rutas de las tareas
  Route.get('project/:id/tasks', 'TaskController.index').middleware('auth')
  Route.post('project/:id/tasks', 'TaskController.create').middleware('auth')
}).prefix('api');
