
import { createConnection } from '..';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcryptjs';

async function create() {
   const connection = await createConnection("localhost");
   const id = uuidV4();
   const password = await hash('admin', 8);
   await connection.query(
      `INSERT INTO users(id, name, email, password, "is_admin", driver_license, created_at)
      values('${id}', 'admin', 'admin@admin.com.au', '${password}', true, 12213232414,now())`
   );
   await connection.destroy();
}
create().then(() => console.log('Admin user created'));

