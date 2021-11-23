'use strict'

const Project = use('App/Models/Project')

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
        if (project.user_id !== user.id) {
            return response.status(403).json({
                message:"Error! Usted NO tiene los permisos necesarios"
            })
        }
        await project.delete()
        return project
    }
}

module.exports = ProjectController
