import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(
        private sessionService: SessionService
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        return this.validateRequest(request);
    }

    async validateRequest(request: Request) {
        const auth = request.headers['authorization'];
        const jwt = auth?.replace('bearer ', '');
        return await this.sessionService.checkIfTokenValid(jwt);
    }
}