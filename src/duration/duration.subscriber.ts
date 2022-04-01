import { AuditService } from "src/audit/audit.service";
import { CreateAuditDto } from "src/audit/dto/audit.create-dto";
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from "typeorm";
import { DurationEntity } from "./entity/duration.entity";

@EventSubscriber()
export class DurationSubscriber implements EntitySubscriberInterface<DurationEntity> {
  constructor(connection: Connection, private readonly auditService: AuditService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return DurationEntity;
  }

  beforeInsert(event: InsertEvent<DurationEntity>) {
    console.log("BEFORE ENTITY INSERTED: ", event.entity);
    const dto: CreateAuditDto = {
      path: 'durations',
      action: 'create',
      accountId: 0,
      pathId: null
    }
    this.auditService.createAudit(dto);
  }

  beforeUpdate(event: UpdateEvent<DurationEntity>) {
    console.log("BEFORE ENTITY UPDATED: ", event.entity);
    const dto: CreateAuditDto = {
      path: 'durations',
      action: 'update',
      accountId: 0,
      pathId: event.entity.id
    }
    this.auditService.createAudit(dto);
  }

  beforeRemove(event: RemoveEvent<DurationEntity>) {
    console.log(
      `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity
    );
    const dto: CreateAuditDto = {
      path: 'durations',
      action: 'remove',
      accountId: 0,
      pathId: event.entity.id
    }
    this.auditService.createAudit(dto);
  }
}
