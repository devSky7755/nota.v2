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
import { DocEntity } from "./entity/doc.entity";

@EventSubscriber()
export class DocSubscriber implements EntitySubscriberInterface<DocEntity> {
  constructor(connection: Connection, private readonly auditService: AuditService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return DocEntity;
  }

  beforeInsert(event: InsertEvent<DocEntity>) {
    console.log("BEFORE ENTITY INSERTED: ", event.entity);
    const dto: CreateAuditDto = {
      path: 'docs',
      action: 'create',
      accountId: 0,
      pathId: null
    }
    this.auditService.createAudit(dto);
  }

  beforeUpdate(event: UpdateEvent<DocEntity>) {
    console.log("BEFORE ENTITY UPDATED: ", event.entity);
    const dto: CreateAuditDto = {
      path: 'docs',
      action: 'update',
      accountId: 0,
      pathId: event.entity.id
    }
    this.auditService.createAudit(dto);
  }

  beforeRemove(event: RemoveEvent<DocEntity>) {
    console.log(
      `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity
    );
    const dto: CreateAuditDto = {
      path: 'docs',
      action: 'remove',
      accountId: 0,
      pathId: event.entity.id
    }
    this.auditService.createAudit(dto);
  }
}
