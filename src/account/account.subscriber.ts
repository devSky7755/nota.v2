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
import { AccountEntity } from "./entity/account.entity";

@EventSubscriber()
export class AccountSubscriber implements EntitySubscriberInterface<AccountEntity> {
  constructor(connection: Connection, private readonly auditService: AuditService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return AccountEntity;
  }

  beforeInsert(event: InsertEvent<AccountEntity>) {
    console.log("BEFORE ACCOUNT INSERTED: ", event.entity);
    const dto: CreateAuditDto = {
      path: 'accounts',
      action: 'create',
      accountId: 0,
      pathId: null
    }
    this.auditService.createAudit(dto);
  }

  beforeUpdate(event: UpdateEvent<AccountEntity>) {
    console.log("BEFORE ACCOUNT UPDATED: ", event.entity);
    const dto: CreateAuditDto = {
      path: 'accounts',
      action: 'update',
      accountId: 0,
      pathId: event.entity.id
    }
    this.auditService.createAudit(dto);
  }

  beforeRemove(event: RemoveEvent<AccountEntity>) {
    console.log(
      `BEFORE ACCOUNT WITH ID ${event.entityId} REMOVED: `,
      event.entity
    );
    const dto: CreateAuditDto = {
      path: 'accounts',
      action: 'remove',
      accountId: 0,
      pathId: event.entity.id
    }
    this.auditService.createAudit(dto);
  }
}
