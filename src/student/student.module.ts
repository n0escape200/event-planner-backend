import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './student.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService],
})
export class StudentModule {}
