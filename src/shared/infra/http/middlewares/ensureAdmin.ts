import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureAdmin(
   request: Request,
   response: Response,
   next: NextFunction
){
   try{
      const { id } = request.user;
      console.log('id: ', id);
      const userRepository = new UserRepository();
      const user = await userRepository.findById(id);
      console.log('user: ', user);
      if(!user?.is_admin){
         throw new AppError("User does not have permission", 401);
      }
      
      return next();

   }catch(err){
      throw new AppError("User does not have permission", 401);
   }


   
}