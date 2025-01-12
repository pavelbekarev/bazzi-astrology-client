import { services } from "#widgets/ServicesApp/api/mockData";

export const ServiceItems = [...services.map((item) => item.name)];
