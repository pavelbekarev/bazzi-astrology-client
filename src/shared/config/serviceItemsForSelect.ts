import { StoreService } from "#shared/lib/services/StoreService";

/**
 *
 */
export function getServiceItems() {
  const storeService = StoreService.getInstance("mainStorage");
  const services = storeService.getServiceList();

  return [...services.map((item) => item.name)];
}
