
import { burgersService } from '../services/BurgersService.js'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class BurgersController extends BaseController {
  constructor() {
    super('api/burgers')
    this.router
      .get('', this.getAllBurgers)
      .post('', this.createBurger)
      .put('/:burgerId', this.editBurger)
      .delete('/:burgerId/eaten', this.deleteBurger)
  }

  async getAllBurgers(req, res, next) {
    try {
      logger.log('We have all the burgers!')
      const burgers = await burgersService.getAllBurgers()
      return res.send(burgers)
    } catch (error) {
      next(error)
    }
  }

  async createBurger(req, res, next) {
    try {
      const burgerData = req.body
      const burger = await burgersService.createBurger(burgerData)
      return res.send({ message: 'burger crafted!', result: burger })
    } catch (error) {
      next(error)
    }
  }

  async editBurger(req, res, next) {
    try {
      const id = req.params.burgerId
      const updatedBurger = req.body
      updatedBurger.id = id
      const burger = await burgersService.editBurger(id, updatedBurger)
      return res.send({ message: 'Burger customized!', results: burger })
    } catch (error) {
      next(error)
    }
  }

  async deleteBurger(req, res, next) {
    try {
      const id = req.params.burgerId
      const message = await burgersService.deleteBurger(id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
