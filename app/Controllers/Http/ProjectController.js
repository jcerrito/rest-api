'use strict'

const Project = use('App/Models/Project')
const AuthService = use('App/Services/AuthServices')

class ProjectController {
    async index({auth}){
        const user = await auth.getUser()
        return await user.projects().fetch()
    }

    async create({auth, request}) {
        const user = await auth.getUser()
        const {name} = request.all()
        const project = new Project()
        project.fill({
            name
        })
        await user.projects().save(project)
        return project
    }

    async destroy({auth, response, params}) {
        const user = await auth.getUser()
        const { id } = params
        const project = await Project.find(id)
        AuthService.checkPermissions(project, user)
        await project.delete()
        return project
    }

    async update({auth, params, request}) {
        const user = await auth.getUser()
        const {id} = params
        const project = await Project.find(id)
        AuthService.checkPermissions(project, user)
        project.merge(request.only('name'))
        await project.save()
        return project
    }
}

module.exports = ProjectController
