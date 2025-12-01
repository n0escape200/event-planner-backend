import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admins')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new admin', description: 'Register a new admin account linked to a user' })
  @ApiBody({ schema: { example: { user: '507f1f77bcf86cd799439011' } } })
  @ApiResponse({ status: 201, description: 'Admin created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() body: any) {
    return this.adminService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admins', description: 'Retrieve a list of all admins' })
  @ApiResponse({ status: 200, description: 'List of admins' })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an admin by ID', description: 'Retrieve a specific admin by their ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiResponse({ status: 200, description: 'Admin found' })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an admin', description: 'Update admin information' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiBody({ schema: { example: { user: '507f1f77bcf86cd799439011' } } })
  @ApiResponse({ status: 200, description: 'Admin updated successfully' })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  update(@Param('id') id: string, @Body() body: any) {
    return this.adminService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an admin', description: 'Delete an admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiResponse({ status: 200, description: 'Admin deleted successfully' })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
