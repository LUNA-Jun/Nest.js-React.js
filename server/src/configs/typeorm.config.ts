import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// typeORM 설정
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1q2w3e4r!@#',
  database: 'boardproject',
  entities: [__dirname + '/../**/*.entity{.js, .ts}'],
  synchronize: true
}
