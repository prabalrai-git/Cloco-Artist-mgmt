import { useMemo } from "react";
import { permissionsList } from "../config/permissions";

const usePermissions = (roleName) => {
  const permissions = useMemo(() => {
    return permissionsList[roleName.toLowerCase()] || {};
  }, [roleName]);

  return permissions;
};

export default usePermissions;
