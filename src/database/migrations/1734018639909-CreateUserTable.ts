import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1734018639909 implements MigrationInterface {
  name = 'CreateUserTable1734018639909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT gen_random_uuid(),
            "email" varchar(255) NOT NULL UNIQUE,
            "password_hash" varchar(255) NOT NULL,
            "first_name" varchar(100) NOT NULL,
            "last_name" varchar(100) NOT NULL,
            "phone" varchar(20),
            "profession" varchar(100),
            "user_type" varchar(20) NOT NULL DEFAULT 'CONTRATISTA',
            "status" varchar(20) NOT NULL DEFAULT 'ACTIVE',
            "company_id" uuid,
            "profile_id" uuid,
            "department_id" uuid,
            "last_login" TIMESTAMP,
            "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "deleted_at" TIMESTAMP,
            "created_by" uuid,
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(
      `COMMENT ON COLUMN "users"."user_type" IS 'SODEXO_OPERACION, SODEXO_FINANZAS, CONTRATISTA, MANDANTE'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users"."status" IS 'ACTIVE, INACTIVE, BLOCKED'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
