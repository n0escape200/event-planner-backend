import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizerService } from './organizer.service';
import { OrganizerController } from './organizer.controller';
import { Organizer, OrganizerSchema } from './organizer.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Organizer.name, schema: OrganizerSchema }])],
  providers: [OrganizerService],
  controllers: [OrganizerController],
  exports: [OrganizerService],
})
export class OrganizerModule {}
