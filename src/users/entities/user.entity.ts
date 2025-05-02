// src/users/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'password_hash',
  })
  passwordHash: string;

  @Column({ type: 'varchar', length: 100, nullable: false, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  profession: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    default: 'CONTRATISTA',
    name: 'user_type',
    comment: 'SODEXO_OPERACION, SODEXO_FINANZAS, CONTRATISTA, MANDANTE',
  })
  userType: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    default: 'ACTIVE',
    name: 'status',
    comment: 'ACTIVE, INACTIVE, BLOCKED',
  })
  status: string;

  @Column({ type: 'uuid', nullable: true, name: 'company_id' })
  companyId: string;

  @Column({ type: 'uuid', nullable: true, name: 'profile_id' })
  profileId: string;

  @Column({ type: 'uuid', nullable: true, name: 'department_id' })
  departmentId: string;

  @Column({ type: 'timestamp', nullable: true, name: 'last_login' })
  lastLogin: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, name: 'deleted_at' })
  deletedAt: Date;

  @Column({ type: 'uuid', nullable: true, name: 'created_by' })
  createdBy: string;
}
