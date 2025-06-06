# MD Bee REST API Test

[Full documentation here](/docs/readme.md)

## Table of Contents <!-- omit in toc -->

- [Features](#features)
  - [Entities \& Relationships](#entities--relationships)
    - [`DoctorEntity`](#doctorentity)
    - [`RoomEntity`](#roomentity)
    - [`EncounterEntity`](#encounterentity)

## Features

- [x] Database. Support [TypeORM](https://www.npmjs.com/package/typeorm) and [Mongoose](https://www.npmjs.com/package/mongoose).
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Sign in and sign up via email.
- [x] Social sign in (Apple, Facebook, Google).
- [x] Admin and User roles.
- [x] Internationalization/Translations (I18N) ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions)

### Entities & Relationships

The project currently includes the following entities:

#### `DoctorEntity`

- Represents doctors in the system.

#### `RoomEntity`

- Represents rooms where encounters happen.

#### `EncounterEntity`

- Represents patient encounters/visits.
