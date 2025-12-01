import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { EventService } from './event.service';

@ApiTags('Events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event', description: 'Create a new event with all details' })
  @ApiBody({ schema: { example: { title: 'Tech Conference', description: 'A conference about tech', eventType: 'Conference', capacity: 100, ticketPrice: 50, startDate: '2025-12-15T09:00:00Z', endDate: '2025-12-15T17:00:00Z', format: 'offline', venueName: 'Convention Center', address: '123 Main St', photos: [], files: [], registeredUsers: [] } } })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() body: any) {
    return this.eventService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events', description: 'Retrieve a list of all events' })
  @ApiResponse({ status: 200, description: 'List of events' })
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID', description: 'Retrieve a specific event by its ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event found' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event', description: 'Update event details, capacity, or registered users' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiBody({ schema: { example: { title: 'Tech Summit 2025', capacity: 150, ticketPrice: 75, registeredUsers: ['507f1f77bcf86cd799439011'] } } })
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  update(@Param('id') id: string, @Body() body: any) {
    return this.eventService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event', description: 'Delete an event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
