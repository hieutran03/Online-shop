import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import JwtAuthGuard from './jwt-auth.guard';
import { UserRole } from 'src/modules/users/entities/users.entity';

const RBACGuard = (requiredRoles: UserRole[]): Type<CanActivate> => {
  class RBACGuardMixin extends JwtAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      if (!request.user.role) {
        return false;
      }
      // return request.user.role.includes(requiredRole);
      return requiredRoles.includes(request.user.role)
    }
  }
  return mixin(RBACGuardMixin);
}

export default RBACGuard;