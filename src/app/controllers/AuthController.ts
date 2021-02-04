import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import { User } from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthController {

    async authenticate(req: Request, res: Response){

        const repository = getRepository(User)
        const { email, password } = req.body

        const user = await repository.findOne({where: { email }})

        if(!user){
            console.log('User not found')
            return res.sendStatus(401)
        }


        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword){
            console.log('Invalid password')
            return res.sendStatus(401)
        }

        const token = jwt.sign({id: user.id}, 'secret', {expiresIn: '1d'})

        return res.json({user, token})
    }
}

export default new AuthController()