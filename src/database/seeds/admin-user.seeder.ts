import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export default class AdminUserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    // Hash de la contraseña para el primer administrador
    const passwordAdmin1 = await bcrypt.hash('admin123', 10);
    const adminUser1 = userRepository.create({
      email: 'admin1@example.com',
      passwordHash: passwordAdmin1,
      firstName: 'Admin',
      lastName: 'Uno',
      userType: 'SODEXO_OPERACION', // Ejemplo de tipo de usuario administrador
      status: 'ACTIVE',
    });

    const existingAdmin1 = await userRepository.findOneBy({
      email: adminUser1.email,
    });
    if (!existingAdmin1) {
      await userRepository.save(adminUser1);
    }

    // Hash de la contraseña para el segundo administrador
    const passwordAdmin2 = await bcrypt.hash('admin456', 10);
    const adminUser2 = userRepository.create({
      email: 'admin2@example.com',
      passwordHash: passwordAdmin2,
      firstName: 'Admin',
      lastName: 'Dos',
      userType: 'SODEXO_FINANZAS', // Ejemplo de otro tipo de usuario administrador
      status: 'ACTIVE',
    });

    const existingAdmin2 = await userRepository.findOneBy({
      email: adminUser2.email,
    });
    if (!existingAdmin2) {
      await userRepository.save(adminUser2);
    }
  }
}
