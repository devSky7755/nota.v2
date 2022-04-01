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
import { AccTypeEntity } from "./entity/acc_type.entity";

@EventSubscriber()
export class AccTypeSubscriber implements EntitySubscriberInterface<AccTypeEntity> {
  constructor(connection: Connection, private readonly auditService: AuditService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return AccTypeEntity;
  }

  beforeInsert(event: InsertEvent<AccTypeEntity>) {
    console.log("BEFORE ENTITY INSERTED: ", event.entity);
    const dto: CreateAuditDto = {
      path: 'acc_types',
      action: 'create',
      accountId: 0,
      pathId: null
    }
    this.auditService.createAudit(dto);
  }

  beforeUpdate(event: UpdateEvent<AccTypeEntity>) {
    console.log("BEFORE ENTITY UPDATED: ", event.entity);
    const dto: CreateAuditDto = {
      path: 'acc_types',
      action: 'update',
      accountId: 0,
      pathId: event.entity.id
    }
    this.auditService.createAudit(dto);
  }

  beforeRemove(event: RemoveEvent<AccTypeEntity>) {
    console.log(
      `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity
    );
    const dto: CreateAuditDto = {
      path: 'acc_types',
      action: 'remove',
      accountId: 0,
      pathId: event.entity.id
    }
    this.auditService.createAudit(dto);
  }
}
