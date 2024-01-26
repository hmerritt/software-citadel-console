/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ForgotPasswordController from '#controllers/auth/forgot_password_controller'
import GithubController from '#controllers/auth/github_controller'
import ResetPasswordController from '#controllers/auth/reset_password_controller'
import SignInController from '#controllers/auth/sign_in_controller'
import SignUpController from '#controllers/auth/sign_up_controller'
import SettingsController from '#controllers/settings_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import SignOutController from '#controllers/auth/sign_out_controller'
import ProjectsController from '#controllers/projects_controller'

router.get('/', async ({ auth, response }) => {
  if (auth.isAuthenticated) {
    return response.redirect().toPath('/dashboard')
  }
  return response.redirect().toPath('/auth/sign_in')
})

router.get('/auth/sign_up', [SignUpController, 'show'])
router.post('/auth/sign_up', [SignUpController, 'handle'])

router.get('/auth/sign_in', [SignInController, 'show'])
router.post('/auth/sign_in', [SignInController, 'handle'])

router.get('/auth/forgot_password', [ForgotPasswordController, 'show'])
router.post('/auth/forgot_password', [ForgotPasswordController, 'handle'])

router.get('/auth/reset_password/:email', [ResetPasswordController, 'show'])
router.post('/auth/reset_password/:email', [ResetPasswordController, 'handle'])

router.post('/auth/sign_out', [SignOutController, 'handle'])

router.get('/auth/github/redirect', [GithubController, 'redirect'])
router.get('/auth/github/callback', [GithubController, 'callback'])

router.get('/settings', [SettingsController, 'edit']).use(middleware.auth())
router.patch('/settings', [SettingsController, 'update']).use(middleware.auth())
router.delete('/settings', [SettingsController, 'destroy']).use(middleware.auth())

router
  .resource('projects', ProjectsController)
  .params({ projects: 'id' })
  .use('*', middleware.auth())
  .use('edit', middleware.loadProjects())
