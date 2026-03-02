export interface ISchemaExtensionProperty {
  name: string;
  type: 'Binary' | 'Boolean' | 'DateTime' | 'Integer' | 'String';
}

export interface ISchemaExtension {
  id?: string;
  description: string;
  targetTypes: string[];
  properties: ISchemaExtensionProperty[];
  status?: 'InDevelopment' | 'Available' | 'Deprecated';
  owner?: string;
}

export interface ICreateSchemaExtensionRequest {
  id: string;
  description: string;
  targetTypes: string[];
  properties: ISchemaExtensionProperty[];
  owner: string;
}