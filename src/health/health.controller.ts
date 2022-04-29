import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator, DiskHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';

@Controller('health-api')
export class HealthApiController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.http.pingCheck('notary-api', 'http://localhost:3000'),
        ]);
    }
}

@Controller('health-db')
export class HealthDbController {
    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            async () => this.db.pingCheck('database')
        ]);
    }
}



@Controller('health-disk')
export class HealthDiskController {
    constructor(
        private health: HealthCheckService,
        private disk: DiskHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            // The used disk storage should not exceed 50% of the full disk size
            () =>
                this.disk.checkStorage("disk health", {
                    thresholdPercent: 0.5,
                    path: "/",
                }),
            // The used disk storage should not exceed 250 GB
            () =>
                this.disk.checkStorage("disk health", {
                    threshold: 250 * 1024 * 1024 * 1024,
                    path: "/",
                })
        ]);
    }
}

@Controller('health-memory')
export class HealthMemoryController {
    constructor(
        private health: HealthCheckService,
        private memory: MemoryHealthIndicator
    ) { }

    @Get()
    @HealthCheck()
    healthCheck() {
        return this.health.check([
            async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
            async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
        ]);
    }
}