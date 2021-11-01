import { BadRequest } from '../utils/Errors'

const FakeDB = {
  burgers: [
    {
      name: 'Cowboy',
      id: '0'
    },
    {
      name: 'Western',
      id: '1'
    },
    {
      name: 'Hawaiian',
      id: '2'
    },
    {
      name: 'Classic',
      id: '3'
    },
    {
      name: 'Double',
      id: '4'
    },
    {
      name: 'Single',
      id: '5'
    }
  ]
}

class BurgersService {
  async createBurger(burgerData) {
    burgerData.id = FakeDB.burgers.length.toString()
    await FakeDB.burgers.push(burgerData)
    return burgerData
  }

  async getAllBurgers() {
    const burgers = await FakeDB.burgers
    return burgers
  }

  async editBurger(id, updatedBurger) {
    const burgerIndex = await FakeDB.burgers.findIndex(b => b.id === id)
    if (burgerIndex === -1) {
      throw new BadRequest('Uh theres no such burger!')
    }
    FakeDB.burgers.splice(burgerIndex, 1, updatedBurger)
    return updatedBurger
  }

  async deleteBurger(id) {
    const burgerIndex = await FakeDB.burgers.findIndex(b => b.id === id)
    if (burgerIndex === -1) {
      throw new BadRequest("Can't delete a burger that doesnt exist!")
    }
    FakeDB.burgers.splice(burgerIndex, 1)
    return 'Eaten!'
  }
}

export const burgersService = new BurgersService()
