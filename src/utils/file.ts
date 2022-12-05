import fs from 'fs';
export const deleteFile = async(fileName: string) => {
   try {
      await fs.promises.stat
   } catch {
      return;
   }

   await fs.promises.unlink(fileName)

}