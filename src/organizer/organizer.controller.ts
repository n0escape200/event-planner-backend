import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { OrganizerService } from './organizer.service';

@ApiTags('Organizers')
@Controller('organizer')
export class OrganizerController {
  constructor(private readonly organizerService: OrganizerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organizer', description: 'Register a new event organizer with access code' })
  @ApiBody({ schema: { example: { user: '507f1f77bcf86cd799439011', events: [], accessCode: 'ABC123' } } })
  @ApiResponse({ status: 201, description: 'Organizer created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() body: any) {
    return this.organizerService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizers', description: 'Retrieve a list of all organizers' })
  @ApiResponse({ status: 200, description: 'List of organizers' })
  findAll() {
    return this.organizerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an organizer by ID', description: 'Retrieve a specific organizer by their ID' })
  @ApiParam({ name: 'id', description: 'Organizer ID' })
  @ApiResponse({ status: 200, description: 'Organizer found' })
  @ApiResponse({ status: 404, description: 'Organizer not found' })
  findOne(@Param('id') id: string) {
    return this.organizerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an organizer', description: 'Update organizer events or access code' })
  @ApiParam({ name: 'id', description: 'Organizer ID' })
  @ApiBody({ schema: { example: { events: ['507f1f77bcf86cd799439012'], accessCode: 'XYZ789' } } })
  @ApiResponse({ status: 200, description: 'Organizer updated successfully' })
  @ApiResponse({ status: 404, description: 'Organizer not found' })
  update(@Param('id') id: string, @Body() body: any) {
    return this.organizerService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organizer', description: 'Delete an organizer by ID' })
  @ApiParam({ name: 'id', description: 'Organizer ID' })
  @ApiResponse({ status: 200, description: 'Organizer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Organizer not found' })
  remove(@Param('id') id: string) {
    return this.organizerService.remove(id);
  }
}
