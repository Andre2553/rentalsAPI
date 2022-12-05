import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import {UserRepository} from "../modules/accounts/repositories/implamentations/UserRepository";
interface IPayload{
   sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
   const authToken = request.headers.authorization;

   if(!authToken){
      throw new Error("Token missing");
   }

   const [_, token] = authToken.split(" ");

   try {
      const { sub: user_id } = verify(token, "d2d2f8a8f7c8b5a5d5d5d5d5d5d5d5d5") as IPayload;

      const usersRepository = new UserRepository();
      const user = await usersRepository.findById(user_id);

      if(!user){
         throw new Error("User does not exist");
      }

      return next();
   } catch (err) {
      throw new Error("Token invalid");
   }
}