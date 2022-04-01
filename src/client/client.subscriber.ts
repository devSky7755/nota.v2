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
import { ClientEntity } from "./entity/client.entity";

@EventSubscriber()
export class ClientSubscriber implements EntitySubscriberInterface<ClientEntity> {
  constructor(connection: Connection, private readonly auditService: AuditService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return ClientEntity;
  }

  beforeInsert(event: InsertEvent<ClientEntity>) {
    console.log("BEFORE ENTITY INSERTED: ", event.entity);
    const dto: CreateAuditDto = {
      path: 'clients',
      action: 'create',
      accountId: 0,
      pathId: null
    }
    this.auditService.createAudit(dto);
  }

  beforeUpdate(event: UpdateEvent<ClientEntity>) {
    console.log("BEFORE ENTITY UPDATED: ", event.entity);
    const dto: CreateAuditDto = {
      path: 'clients',
      action: 'update',
      accountId: 0,
      pathId: event.entity.id
    }
    this.auditService.createAudit(dto);
  }

  beforeRemove(event: RemoveEvent<ClientEntity>) {
    console.log(
      `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity
    );
    const dto: CreateAuditDto = {
      path: 'clients',
      action: 'remove',
      accountId: 0,
      pathId: event.entity.id
    }
    this.auditService.createAudit(dto);
  }
}
