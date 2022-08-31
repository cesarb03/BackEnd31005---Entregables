import { Router } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import User from '../../models/schema/user'

import {renderRegister, register, renderFailedRegister} from "../../controllers/session"

const sessionRegister = Router()

passport.use("register", new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
    async (email: string, password: string, done: any) => {
        const newUser = new User({
          email,
          password
        })
        try {
            await newUser.save()
            return done(null, newUser) //1)
        } catch (err:any) {
             if(err.code === 11000) {
                return done(null, false, { message: "User already exists" }) //2)
            }
            console.log(err)
            return done(err) //3) 
              
            }
        }
  
  ))
  

sessionRegister.get('/', renderRegister)///
sessionRegister.post('/', passport.authenticate('register', { failureRedirect: '/register/failed', failureFlash: true}), register)
sessionRegister.get('/failed', renderFailedRegister)//

/* FAILURE REDIRECT EXCPECTS: (err, user, info)
1) done(null, user) which means no error and successful authentication

2) done(null, false, {custom Message}) which means no error but either email or password didn't matched.

3)  done(err) which just returns if error occurs while processing. */

export default sessionRegister