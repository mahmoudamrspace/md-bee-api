import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1748966194388 implements MigrationInterface {
    name = 'CreateTables1748966194388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."encounters_status_enum" AS ENUM('Ready', 'Recording', 'In Progress', 'Not Started')`);
        await queryRunner.query(`CREATE TABLE "encounters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."encounters_status_enum" NOT NULL DEFAULT 'Not Started', "notesStatus" character varying NOT NULL, "location" character varying NOT NULL, "encounterDate" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roomsId" uuid, "userId" integer, CONSTRAINT "PK_b2e596be58aabc4ccc8f8458b53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "encounters_doctors_doctors" ("encountersId" uuid NOT NULL, "doctorsId" uuid NOT NULL, CONSTRAINT "PK_0d789d6ef446cac8b626c890942" PRIMARY KEY ("encountersId", "doctorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a372d0494bee8d96108df4d661" ON "encounters_doctors_doctors" ("encountersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_25cd46a6dc834b6cc78e9f75cb" ON "encounters_doctors_doctors" ("doctorsId") `);
        await queryRunner.query(`ALTER TABLE "encounters" ADD CONSTRAINT "FK_adc769ff5a58a2f1cc5ba419065" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "encounters" ADD CONSTRAINT "FK_eb1ada7afd9245678a12522f466" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "encounters_doctors_doctors" ADD CONSTRAINT "FK_a372d0494bee8d96108df4d6612" FOREIGN KEY ("encountersId") REFERENCES "encounters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "encounters_doctors_doctors" ADD CONSTRAINT "FK_25cd46a6dc834b6cc78e9f75cbb" FOREIGN KEY ("doctorsId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "encounters_doctors_doctors" DROP CONSTRAINT "FK_25cd46a6dc834b6cc78e9f75cbb"`);
        await queryRunner.query(`ALTER TABLE "encounters_doctors_doctors" DROP CONSTRAINT "FK_a372d0494bee8d96108df4d6612"`);
        await queryRunner.query(`ALTER TABLE "encounters" DROP CONSTRAINT "FK_eb1ada7afd9245678a12522f466"`);
        await queryRunner.query(`ALTER TABLE "encounters" DROP CONSTRAINT "FK_adc769ff5a58a2f1cc5ba419065"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25cd46a6dc834b6cc78e9f75cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a372d0494bee8d96108df4d661"`);
        await queryRunner.query(`DROP TABLE "encounters_doctors_doctors"`);
        await queryRunner.query(`DROP TABLE "encounters"`);
        await queryRunner.query(`DROP TYPE "public"."encounters_status_enum"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
    }

}
