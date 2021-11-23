const ForbiddenAccessException = use('App/Exceptions/ForbiddenAccessException')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')

class AuthService {
    checkPermissions(resource, user) {
        if (!resource) {
            throw new ResourceNotFoundException()
        }

        if (resource.user_id !== user.id) {
            throw new ForbiddenAccessException()
        }
    }
}

module.exports = new AuthService