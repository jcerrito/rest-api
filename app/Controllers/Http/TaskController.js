'use strict'

const Project = use('App/Models/Project')
const Task = use('App/Models/Task')
const AuthServices = use('App/Services/AuthServices')

class TaskController {

    async index ({auth, request, params}) {
        const user = await auth.getUser()
        const {id} = params
        const project = await Project.find(id)
        AuthServices.checkPermissions(project, user)
        return await project.tasks().fetch()
    }

    async create ({auth, request, params}) {
        const user = await auth.getUser()
        const {description} = request.all()
        const {id} = params
        const project = await Project.find(id)
        AuthServices.checkPermissions(project, user)
        const task = new Task()
        task.fill({
            description
        })
        await project.tasks().save(task)
        return task
    }

}

module.exports = TaskController
