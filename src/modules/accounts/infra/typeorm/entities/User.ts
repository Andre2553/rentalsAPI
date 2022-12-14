import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';
@Entity("users")
class User {
   @Column()
   @PrimaryColumn()
   id: string;

   @Column()
   name: string;
   
   @Column()
   email: string;
   
   @Column()
   password: string;
   
   @Column()
   driver_license: string;
   
   @Column()
   is_admin: boolean;

   @Column()
   avatar: string;
   
   
   @CreateDateColumn()
   created_at: Date;

   constructor() {
      if (!this.id) {
         this.id = uuidV4();
      }
   }
}


export { User }