import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { StudentService } from './student.service';

@ApiTags('Students')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student', description: 'Register a new student linked to a user' })
  @ApiBody({ schema: { example: { user: '507f1f77bcf86cd799439011', saved: [], registered: [] } } })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() body: any) {
    return this.studentService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students', description: 'Retrieve a list of all students' })
  @ApiResponse({ status: 200, description: 'List of students' })
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID', description: 'Retrieve a specific student by their ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student found' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a student', description: 'Update student saved or registered events' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiBody({ schema: { example: { saved: ['507f1f77bcf86cd799439012'], registered: ['507f1f77bcf86cd799439013'] } } })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  update(@Param('id') id: string, @Body() body: any) {
    return this.studentService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student', description: 'Delete a student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
