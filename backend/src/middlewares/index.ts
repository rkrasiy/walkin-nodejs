
import { validateJWT } from "./validate-jwt";
import { fieldsValidator } from "./fileds-validator";
import { hasPermissions } from "./validate-role";

export default {
  fieldsValidator,
  validateJWT,
  hasPermissions
}